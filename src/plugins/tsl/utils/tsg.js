import {
	MeshBasicNodeMaterial,
	MeshStandardNodeMaterial,
	MeshPhongNodeMaterial,
	MeshPhysicalNodeMaterial,
	LineDashedNodeMaterial,
	SpriteNodeMaterial,
	NodeMaterial,
	UniformNode,
	Texture,
} from 'three/webgpu';
import * as THREE from 'three/webgpu';
import * as tsl from 'three/tsl'

export const getImageTexture = (src) => {
	const img = new Image();
	const texture = new Texture(img);
	img.onload = () => {
		texture.needsUpdate = true;
	}
	img.src = src;
	return texture;
}

export const DEFAULT_SETTING = (template = 'MeshBasicNodeMaterial') => ({
	template,
	Preview: "2d",
	surfaceType: 'Transparent',
	blendingMode: 'NormalBlending',
	renderFace: 'FrontSide',
	depthWrite: 'enable',
	depthTest: 'enable',
	depthTestFunc: 'LessEqualDepth',
	castShadows: true,
});

const defaultSetting = DEFAULT_SETTING();

const getTSLJson = (tsl) => {
	const match = tsl.replace(/\r\n/g, "\n").match(/\/\/\/\/ view \/\/\/\/ (.*)\n/);
	if (!match) return null;

	const json = JSON.parse(match[1]);
	return json;
}

const materialMap = {
	lit: MeshBasicNodeMaterial,
	unlit: MeshBasicNodeMaterial,
	subgraph: MeshBasicNodeMaterial,
	MeshBasicNodeMaterial: MeshBasicNodeMaterial,
	MeshStandardNodeMaterial: MeshStandardNodeMaterial,
	MeshPhongNodeMaterial: MeshPhongNodeMaterial,
	MeshPhysicalNodeMaterial: MeshPhysicalNodeMaterial,
	LineDashedNodeMaterial: LineDashedNodeMaterial,
	SpriteNodeMaterial: SpriteNodeMaterial,
};

// 混合模式映射
const blendingModeMap = {
	'NoBlending': THREE.NoBlending,
	'NormalBlending': THREE.NormalBlending,
	'AdditiveBlending': THREE.AdditiveBlending,
	'SubtractiveBlending': THREE.SubtractiveBlending,
	'MultiplyBlending': THREE.MultiplyBlending,
};

// 渲染面映射
const renderFaceMap = {
	'FrontSide': THREE.FrontSide,
	'BackSide': THREE.BackSide,
	'DoubleSide': THREE.DoubleSide,
};

// 深度测试函数映射
const depthTestFuncMap = {
	'NeverDepth': THREE.NeverDepth,
	'AlwaysDepth': THREE.AlwaysDepth,
	'EqualDepth': THREE.EqualDepth,
	'LessDepth': THREE.LessDepth,
	'LessEqualDepth': THREE.LessEqualDepth,
	'GreaterDepth': THREE.GreaterDepth,
	'GreaterEqualDepth': THREE.GreaterEqualDepth,
	'NotEqualDepth': THREE.NotEqualDepth,
};

// 应用 SGSetting 到材质的函数
const applySGSettingToMaterial = (material, settings) => {
	// 应用表面类型（透明度）
	material.transparent = settings.surfaceType === 'Transparent';

	if (settings.surfaceType === 'Transparent') {
		material.blending = blendingModeMap[settings.blendingMode] || THREE.NormalBlending;
	} else {
		material.blending = THREE.NormalBlending;
	}

	// 应用渲染面
	material.side = renderFaceMap[settings.renderFace] || THREE.FrontSide;

	// 应用深度写入和测试
	material.depthWrite = settings.depthWrite === 'enable';
	material.depthTest = settings.depthTest === 'enable';

	// 应用深度测试函数
	material.depthFunc = depthTestFuncMap[settings.depthTestFunc] || THREE.LessEqualDepth;
};

/**
 * 
 * @param {*} tsgString 
 * @param {*} defaultUniforms 
 * @param {any} [textureMap] 可选
 * @returns {{ 
 *   material, 
 *   uniforms: { [key: string]: { value: any } },
 *   settings
 * }}
 */
export const tsg = (tsgString, defaultUniforms = {}, textureMap = {}) => {
	const tslResultMaterial = {};

	const tslJson = getTSLJson(tsgString);

	if (tslJson) {
		tslJson.textures?.forEach(i => {
			const varName = i.binding.varName;
			if (!textureMap?.[varName]) {
				const base64 = tsgString.match(new RegExp(`\/\/\/\/ ${varName} \/\/\/\/ (.*)\\n`))?.[1];
				if (base64) {
					if (textureMap) {
						textureMap[varName] = getImageTexture(base64);
					}
				}
			}
		})
	}

	const settings = Object.assign({}, defaultSetting, tslJson?.setting);

	const template = materialMap[settings.template];
	const material = new template();
	const uniforms = {};

	// 应用 SGSetting 配置到材质
	applySGSettingToMaterial(material, settings);

	if (tsgString) {
		try {
			new Function(
				"material",
				"default_uniforms",
				"__textures__",
				"uniforms",
				"tsl",
				"THREE",
				tsgString
			)(
				tslResultMaterial,
				defaultUniforms || {},
				textureMap,
				uniforms,
				tsl,
				THREE,
			);
		} catch (error) {
			throw new Error('Invalid TSL format: ' + error);
		}
	}

	if (settings.surfaceType === 'Transparent') {
		if (typeof tslResultMaterial.opacityNode === 'undefined') {
			material.colorNode = tslResultMaterial.colorNode || null;
		} else {
			material.colorNode = tslResultMaterial.colorNode?.xyz || null;
			material.opacityNode = tslResultMaterial.opacityNode || null;
		}
	} else {
		material.colorNode = tslResultMaterial.colorNode?.xyz || null;
	}

	material.vertexNode = tslResultMaterial.vertexNode || null;
	material.positionNode = tslResultMaterial.positionNode || null;
	material.normalNode = tslResultMaterial.normalNode || null;

	material.alphaTestNode = tslResultMaterial.alphaTestNode || null;
	material.depthNode = tslResultMaterial.depthNode || null;
	// @ts-ignore
	material.emissiveNode = tslResultMaterial.emissiveNode || null;
	material.envNode = tslResultMaterial.envNode || null;
	material.aoNode = tslResultMaterial.aoNode || null;
	material.backdropNode = tslResultMaterial.backdropNode || null;
	material.backdropAlphaNode = tslResultMaterial.backdropAlphaNode || null;

	if (settings.castShadows) {
		material.castShadowNode = tslResultMaterial.castShadowNode || null;
	}

	// 强制更新材质
	material.needsUpdate = true;

	return { material: material, uniforms, settings };
}