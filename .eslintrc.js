/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-02 11:04:43
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-04-17 18:17:42
 */
module.exports = {
    // parser: 'babel-eslint',
    extends: ['@webank/eslint-config-webank/vue.js'],
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
        },
    ],
    env: {
        jest: true,
    },
    //add by 地虎降天龙
    // settings: {
    //     'import/resolver': {
    //         alias: {
    //             map: [
    //                 // 这里参照别名配置映射
    //                 ['@', './src'],
    //                 ['PLS', './src/plugins'],
    //             ],
    //         },
    //     },
    // },
    rules: {
        'prettier/prettier': 'off',
        'vue/space-unary-ops': 'off',
        'vue/comma-dangle': 'off',
        'no-debugger': 'error', // 重新开启 no-debugger 规则，防止调试语句被提交到生产环境
        'guard-for-in': 'off',
        semi: ['error', 'never'],
        // "init-declarations": "off",
        // "space-unary-ops": "off",
        'import/no-unresolved': [
            2,
            {
                ignore: ['^@/', 'PLS'], // 设置的路径别名
            },
        ],
    },
}
