#include <common>
#include <packing>

bool receiveShadow = true;

#include <shadowmap_pars_fragment>

uniform vec3 u_majorLineColor;
uniform vec3 u_minorLineColor;
uniform vec3 u_bgColor;
uniform float u_majorLineWidth;
uniform float u_minorLineWidth;
uniform float u_gridScale;
uniform float u_majorGridDiv;
uniform vec3 u_dotColor;
uniform float u_dotRadius;
uniform vec3 u_shadowColor;
uniform float u_shadowIntensity;
uniform float u_time;
uniform sampler2D u_blueNoise;
uniform vec2 u_scrollOffset;
uniform float u_fadeStart;
uniform float u_fadeEnd;

varying vec2 v_worldPos;

float pristineGrid(vec2 uv, float lineWidth) {
    vec4 uvDDXY = vec4(dFdx(uv), dFdy(uv));
    vec2 uvDeriv = vec2(length(uvDDXY.xz), length(uvDDXY.yw));
    bool invertLine = lineWidth > 0.5;
    float targetWidth = invertLine ? 1.0 - lineWidth : lineWidth;
    vec2 drawWidth = clamp(vec2(targetWidth), uvDeriv, vec2(0.5));
    vec2 lineAA = uvDeriv * 1.5;
    vec2 gridUV = abs(fract(uv) * 2.0 - 1.0);
    gridUV = invertLine ? gridUV : 1.0 - gridUV;
    vec2 grid2 = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);
    grid2 *= clamp(vec2(targetWidth) / drawWidth, 0.0, 1.0);
    grid2 = mix(grid2, vec2(targetWidth), clamp(uvDeriv * 2.0 - 1.0, 0.0, 1.0));
    grid2 = invertLine ? 1.0 - grid2 : grid2;
    return mix(grid2.x, 1.0, grid2.y);
}

float gridDots(vec2 uv, float radius) {
    vec2 uvDeriv = fwidth(uv);
    vec2 nearest = fract(uv + 0.5) - 0.5;
    float dist = length(nearest);
    float drawRadius = max(radius, length(uvDeriv) * 0.5);
    float aa = length(uvDeriv);
    float dotMask = smoothstep(drawRadius + aa, drawRadius, dist);
    dotMask *= clamp(radius / drawRadius, 0.0, 1.0);
    return dotMask;
}

float getDitheredShadowMask() {
    float shadow = 1.0;

    #ifdef USE_SHADOWMAP
        #if NUM_DIR_LIGHT_SHADOWS > 0
            DirectionalLightShadow dirLight = directionalLightShadows[0];
            vec3 noise = texture2D(u_blueNoise, gl_FragCoord.xy / 128.0 + u_time).rgb;
            shadow = getShadow(
                directionalShadowMap[0],
                dirLight.shadowMapSize,
                dirLight.shadowIntensity,
                dirLight.shadowBias + noise.z * 0.001,
                dirLight.shadowRadius,
                vDirectionalShadowCoord[0] + vec4((noise.xy - 0.5) / dirLight.shadowMapSize, 0.0, 0.0)
            );
        #endif
    #endif

    return shadow;
}

void main() {
    float majorDiv = max(2.0, floor(u_majorGridDiv + 0.5));
    vec2 gridCoord = (v_worldPos + u_scrollOffset) * u_gridScale;
    float minorGrid = pristineGrid(gridCoord, u_minorLineWidth);
    float majorGrid = pristineGrid(gridCoord / majorDiv, u_majorLineWidth);
    float majorDots = gridDots(gridCoord / majorDiv, u_dotRadius);
    vec3 color = u_bgColor;
    color = mix(color, u_minorLineColor, minorGrid);
    color = mix(color, u_majorLineColor, majorGrid);
    color = mix(color, u_dotColor, majorDots);
    float shadowMask = getDitheredShadowMask();
    float adjustedShadowMask = mix(1.0, shadowMask, u_shadowIntensity);
    color = mix(u_shadowColor * color, color, adjustedShadowMask);
    float dist = length(v_worldPos);
    float alpha = 1.0 - smoothstep(u_fadeStart, u_fadeEnd, dist);
    gl_FragColor = vec4(color, alpha);
}
