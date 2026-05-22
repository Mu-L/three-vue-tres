/*
 * @Description:
 * @Version: 1.668
 * @Autor: Codex
 * @Date: 2026-05-22 09:40:00
 * @LastEditors: Codex
 * @LastEditTime: 2026-05-22 09:40:00
 */

const kMaterialShaderUtils = /* glsl */ `
float jbSaturate(float value) {
    return clamp(value, 0.0, 1.0);
}

float jbLuminance(vec3 value) {
    return dot(value, vec3(0.2126, 0.7152, 0.0722));
}

vec4 jbPremultiplyAlpha(vec4 value) {
    return vec4(value.rgb * value.a, value.a);
}

vec4 jbTripSampler1(vec3 uv, vec3 normalValue, sampler2D mapValue) {
    vec3 weight = max(vec3(0.00001), normalValue * normalValue);
    weight /= max(weight.x + weight.y + weight.z, 0.00001);

    vec4 colorValue = vec4(0.0);

    if (weight.z > 0.001) {
        vec2 faceUv = (normalValue.z > 0.0 ? vec2(-1.0, -1.0) : vec2(1.0, -1.0)) * uv.xy;
        colorValue += texture2D(mapValue, faceUv) * weight.z;
    }

    if (weight.y > 0.001) {
        vec2 faceUv = (normalValue.y > 0.0 ? vec2(1.0, -1.0) : vec2(-1.0, -1.0)) * uv.xz;
        colorValue += texture2D(mapValue, faceUv) * weight.y;
    }

    if (weight.x > 0.001) {
        vec2 faceUv = (normalValue.x > 0.0 ? vec2(1.0, -1.0) : vec2(-1.0, -1.0)) * uv.zy;
        colorValue += texture2D(mapValue, faceUv) * weight.x;
    }

    return max(vec4(0.0), colorValue);
}

float jbLinearBlackWhiteBlackGradient(float positionValue) {
    float clampedValue = clamp(positionValue, 0.0, 1.0);
    float insideValue = step(0.0, positionValue) * step(positionValue, 1.0);
    return (1.0 - abs(clampedValue * 2.0 - 1.0)) * insideValue;
}

vec3 jbThreeStopPalette(float value, vec3 colorA, vec3 colorB, vec3 colorC) {
    float t = fract(value);

    if (t <= 0.14) {
        return colorA;
    }

    if (t <= 0.506) {
        return mix(colorA, colorB, clamp((t - 0.14) / (0.506 - 0.14), 0.0, 1.0));
    }

    if (t <= 0.985) {
        return mix(colorB, colorC, clamp((t - 0.506) / (0.985 - 0.506), 0.0, 1.0));
    }

    return colorC;
}

vec3 jbPaletteByScheme(float value, float schemeValue) {
    if (schemeValue < 0.5) {
        return jbThreeStopPalette(value, vec3(0.0078, 1.0, 0.8157), vec3(1.0, 0.0392, 1.0), vec3(1.0));
    }

    if (schemeValue < 1.5) {
        return jbThreeStopPalette(value, vec3(0.0196, 0.9608, 0.8314), vec3(0.2627, 0.4706, 1.0), vec3(0.9608, 1.0, 0.6549));
    }

    if (schemeValue < 2.5) {
        return jbThreeStopPalette(value, vec3(0.1686, 0.8275, 1.0), vec3(1.0, 0.2196, 0.7529), vec3(1.0, 0.8902, 0.3059));
    }

    return jbThreeStopPalette(value, vec3(0.3451, 0.9725, 1.0), vec3(0.7333, 0.4078, 1.0), vec3(1.0));
}
`

export const jumpingBlockVertexShader = /* glsl */ `
varying vec3 vJbObjectPosition;
varying vec3 vJbObjectNormal;
varying vec3 vJbWorldPosition;

void main() {
    vJbObjectPosition = csm_Position;
    vJbObjectNormal = normalize(csm_Normal);
    vJbWorldPosition = (modelMatrix * vec4(csm_Position, 1.0)).xyz;
}
`

export const jumpingBlockFragmentShader = /* glsl */ `
varying vec3 vJbObjectPosition;
varying vec3 vJbObjectNormal;
varying vec3 vJbWorldPosition;

uniform sampler2D uMaskMap;
uniform sampler2D uGridMap;
uniform float uTime;
uniform float uChannelAmount;
uniform float uMaskAmount;
uniform float uScanDuration;
uniform float uScanStart;
uniform float uScanEnd;
uniform float uScanYOffset;
uniform float uScanIntensity;
uniform float uGridAmount;
uniform float uTempMaskAmount;
uniform float uTempGridAmount;
uniform float uTriplanarScale;
uniform float uPaletteScheme;
uniform float uPaletteFlow;
uniform float uPaletteContrast;
uniform float uEmissiveBoost;
uniform float uDiffuseMix;
uniform float uAlphaCutoff;

${kMaterialShaderUtils}

void main() {
    vec3 jbTripPosition = vJbObjectPosition * uTriplanarScale;
    vec3 jbTripNormal = normalize(vJbObjectNormal);

    vec4 jbMaskTexture = jbPremultiplyAlpha(jbTripSampler1(jbTripPosition, jbTripNormal, uMaskMap));
    vec4 jbGridTexture = jbPremultiplyAlpha(jbTripSampler1(jbTripPosition, jbTripNormal, uGridMap));
    float jbMaskValue = jbLuminance(jbMaskTexture.rgb);
    float jbGridValue = jbLuminance(jbGridTexture.rgb);

    vec4 jbAlphaStage = mix(vec4(1.0), jbMaskTexture, uMaskAmount);
    float jbChannelAlpha = jbLuminance(jbAlphaStage.rgb);

    float jbDuration = max(uScanDuration, 0.001);
    float jbScanProgress = fract(uTime / jbDuration);
    float jbScanOffset = mix(uScanStart, uScanEnd, jbScanProgress) + uScanYOffset;
    float jbScanPosition = vJbWorldPosition.y + jbScanOffset;
    float jbScanGradient = jbLinearBlackWhiteBlackGradient(jbScanPosition) * uScanIntensity;

    jbChannelAlpha = jbScanGradient - jbChannelAlpha;
    jbChannelAlpha += jbGridValue * uGridAmount;
    jbChannelAlpha = max(jbChannelAlpha, 0.0);

    vec4 jbTemp0 = mix(vec4(1.0), jbMaskTexture, uTempMaskAmount);
    vec4 jbInvertedGrid = vec4(1.0 - jbGridTexture.rgb, jbGridTexture.a) * uTempGridAmount;
    jbTemp0 = jbInvertedGrid - jbTemp0;

    float jbFlow = uTime * uPaletteFlow;
    float jbScanLocal = clamp(jbScanPosition, 0.0, 1.0);
    float jbDiagonal = vJbWorldPosition.x * 0.18 - vJbWorldPosition.z * 0.13;
    float jbWave = sin((vJbObjectPosition.x * 3.8 + vJbObjectPosition.y * 1.7 + vJbObjectPosition.z * 2.9) + jbFlow * 6.28318530718) * 0.5 + 0.5;
    float jbPaletteIndex = jbTemp0.r * 0.22 + jbScanLocal * 0.46 + jbGridValue * 0.36 + jbMaskValue * 0.14 + jbDiagonal + jbWave * 0.18 + jbFlow * 0.12;
    jbPaletteIndex = fract((jbPaletteIndex - 0.5) * uPaletteContrast + 0.5);

    vec3 jbSweepColor = jbPaletteByScheme(jbPaletteIndex, uPaletteScheme);
    float jbWhiteSpark = smoothstep(0.52, 1.0, jbGridValue * jbScanGradient + jbWave * 0.24);
    jbSweepColor = mix(jbSweepColor, vec3(1.0), jbWhiteSpark * 0.28);

    float jbEffectStrength = jbChannelAlpha * uChannelAmount;
    float jbEffectAlpha = jbSaturate(jbEffectStrength);
    jbEffectAlpha *= step(uAlphaCutoff, jbEffectAlpha);

    csm_DiffuseColor.rgb = mix(csm_DiffuseColor.rgb, jbSweepColor, jbEffectAlpha * uDiffuseMix);
    csm_Emissive += jbSweepColor * jbEffectStrength * uEmissiveBoost;
}
`
