#include <common>
#include <packing>

bool receiveShadow = true;

#include <shadowmap_pars_fragment>

uniform vec3 u_color;
uniform vec3 u_lightDir;
uniform sampler2D u_ormMap;
uniform float u_aoIntensity;

varying vec2 v_uv;
varying vec3 v_worldNormal;
varying vec3 v_worldPos;

void main() {
    vec3 N = normalize(v_worldNormal);
    vec3 L = normalize(u_lightDir);
    float NdotL = max(dot(N, L), 0.0);
    float diffuse = mix(0.3, 1.0, NdotL);
    float ao = mix(1.0, texture2D(u_ormMap, v_uv).g, u_aoIntensity);
    float shadow = 1.0;

    #ifdef USE_SHADOWMAP
        #if NUM_DIR_LIGHT_SHADOWS > 0
            DirectionalLightShadow dirLight = directionalLightShadows[0];
            shadow = getShadow(directionalShadowMap[0], dirLight.shadowMapSize, dirLight.shadowIntensity, dirLight.shadowBias, dirLight.shadowRadius, vDirectionalShadowCoord[0]);
        #endif
    #endif

    gl_FragColor = vec4(u_color * diffuse * ao * mix(0.7, 1.0, shadow), 1.0);
}
