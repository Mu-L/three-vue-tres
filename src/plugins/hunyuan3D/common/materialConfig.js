/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-29 09:33:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-30 10:58:11
 */
const mConfig = {
    MeshBasicMaterial: {
        default: {
            color: '#161cff',
            wireframe: false,
            opacity: 1,
        },
        config: {
            color: {
                name: '颜色',
                com: 'ColorPicker',
            },
            wireframe: {
                name: '线框',
                com: 'Switch',
            },
            opacity: {
                name: '透明度',
                com: 'Slider',
                min: 0,
                max: 1,
                step: 0.01,
            },
        },
    },
    MeshLambertMaterial: {
        default: {
            color: '#3ef561',
            wireframe: false,
            opacity: 1,
        },
        config: {
            color: {
                name: '颜色',
                com: 'ColorPicker',
            },
            wireframe: {
                name: '线框',
                com: 'Switch',
            },
            opacity: {
                name: '透明度',
                com: 'Slider',
                min: 0,
                max: 1,
                step: 0.01,
            },
        },
    },
    MeshPhysicalMaterial: {
        default: {
            color: '#e75ff5',
            metalness: 0.45,
            roughness: 0.36,
            transmission: 0.33,
            reflectivity: 0.5,
            ior: 1.5,
            opacity: 1,
        },
        config: {
            color: {
                name: '颜色',
                com: 'ColorPicker',
            },
            metalness: {
                name: '金属度',
                com: 'Slider',
                min: 0,
                max: 1,
                step: 0.01,
            },
            roughness: {
                name: '粗糙度',
                com: 'Slider',
                min: 0,
                max: 1,
                step: 0.01,
            },
            reflectivity: {
                name: '反射率',
                com: 'Slider',
                min: 0,
                max: 1,
                step: 0.01,
            },
            ior: {
                name: '折射率',
                com: 'Slider',
                min: 1,
                max: 2.33,
                step: 0.01,
            },
            transmission: {
                name: '透光率',
                com: 'Slider',
                min: 0,
                max: 1,
                step: 0.01,
            },
            opacity: {
                name: '透明度',
                com: 'Slider',
                min: 0,
                max: 1,
                step: 0.01,
            },
        },
    },
}
export default mConfig
