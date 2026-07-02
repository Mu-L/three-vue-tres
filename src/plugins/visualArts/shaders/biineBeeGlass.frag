uniform sampler2D u_sceneTexture;
uniform sampler2D u_reflectionTexture;
uniform sampler2D u_normalMap;
uniform sampler2D u_ormMap;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_baseColor;
uniform float u_ior;
uniform float u_refractionStrength;
uniform float u_reflectionStrength;
uniform float u_refractionRoughness;
uniform float u_reflectionRoughness;
uniform float u_normalStrength;
uniform float u_saturation;
uniform float u_fresnelPower;
uniform float u_specularIntensity;
uniform vec3 u_volumeColor;
uniform float u_volumeDensity;
uniform float u_dispersion;
uniform float u_sssIntensity;
uniform vec3 u_sssColor;
uniform vec3 u_edgeTint;
uniform float u_edgeTintPower;
uniform float u_aoIntensity;
uniform vec3 u_lightDir;

varying vec2 v_uv;
varying vec3 v_worldPos;
varying vec3 v_worldNormal;
varying vec3 v_viewDir;

vec3 perturbNormal(vec3 N, vec3 worldPos, vec2 uv) {
    vec3 dp1 = dFdx(worldPos);
    vec3 dp2 = dFdy(worldPos);
    vec2 duv1 = dFdx(uv);
    vec2 duv2 = dFdy(uv);
    vec3 dp2perp = cross(dp2, N);
    vec3 dp1perp = cross(N, dp1);
    vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;
    float invmax = inversesqrt(max(dot(T, T), dot(B, B)));
    mat3 TBN = mat3(T * invmax, B * invmax, N);
    vec3 mapN = texture2D(u_normalMap, uv).rgb * 2.0 - 1.0;
    mapN.xy *= u_normalStrength;
    return normalize(TBN * mapN);
}

float fresnel(float cosTheta, float power, float f0) {
    return f0 + (1.0 - f0) * pow(1.0 - cosTheta, power);
}

float ggxSpecular(vec3 light, vec3 viewDir, vec3 normal, float roughness) {
    vec3 lightVec = normalize(-light);
    vec3 halfVec = normalize(viewDir + lightVec);
    float NdotH = max(dot(normal, halfVec), 0.0);
    float a2 = max(roughness * roughness, 0.001);
    float d = NdotH * NdotH * (a2 - 1.0) + 1.0;
    return a2 / (3.14159 * d * d);
}

vec3 sat(vec3 rgb, float intensity) {
    vec3 L = vec3(0.2126, 0.7152, 0.0722);
    vec3 grayscale = vec3(dot(rgb, L));
    return mix(grayscale, rgb, intensity);
}

void main() {
    vec3 N = normalize(v_worldNormal);
    vec3 V = normalize(v_viewDir);
    vec3 eyeVec = -V;
    vec2 screenUV = gl_FragCoord.xy / u_resolution;
    vec3 orm = texture2D(u_ormMap, v_uv).rgb;
    float ao = orm.r;
    float texRoughness = orm.b;
    float refrRoughness = texRoughness * u_refractionRoughness;
    float reflRoughness = texRoughness * u_reflectionRoughness;
    vec3 perturbedN = perturbNormal(N, v_worldPos, v_uv);
    float cosTheta = max(dot(V, perturbedN), 0.0);
    float geoThickness = clamp(1.0 - cosTheta, 0.0, 1.0);
    float thickness = mix(geoThickness, 1.0 - ao, 0.3);
    float iorR = 1.0 / (u_ior - u_dispersion);
    float iorG = 1.0 / u_ior;
    float iorB = 1.0 / (u_ior + u_dispersion);
    float maxMip = log2(max(u_resolution.x, u_resolution.y)) * 0.5;
    float refrMip = refrRoughness * maxMip;
    float reflMip = reflRoughness * maxMip;
    vec3 refractG = refract(eyeVec, perturbedN, iorG);
    vec3 reflectDir = reflect(eyeVec, perturbedN);
    vec3 refrColor;

    if (u_dispersion > 0.0) {
        vec3 refractR = refract(eyeVec, perturbedN, iorR);
        vec3 refractB = refract(eyeVec, perturbedN, iorB);
        if (dot(refractR, refractR) < 0.001) refractR = reflectDir;
        if (dot(refractG, refractG) < 0.001) refractG = reflectDir;
        if (dot(refractB, refractB) < 0.001) refractB = reflectDir;
        float dispSpread = u_dispersion * (1.0 - cosTheta);
        refrColor.r = textureLod(u_sceneTexture, clamp(screenUV + refractR.xy * (u_refractionStrength - dispSpread), 0.001, 0.999), refrMip).r;
        refrColor.g = textureLod(u_sceneTexture, clamp(screenUV + refractG.xy * u_refractionStrength, 0.001, 0.999), refrMip).g;
        refrColor.b = textureLod(u_sceneTexture, clamp(screenUV + refractB.xy * (u_refractionStrength + dispSpread), 0.001, 0.999), refrMip).b;
    } else {
        if (dot(refractG, refractG) < 0.001) refractG = reflectDir;
        vec2 refrUV = clamp(screenUV + refractG.xy * u_refractionStrength, 0.001, 0.999);
        refrColor = textureLod(u_sceneTexture, refrUV, refrMip).rgb;
    }

    vec3 baseAbsorption = exp(log(max(u_baseColor, 0.001)) * thickness);
    refrColor *= baseAbsorption;

    if (u_volumeDensity > 0.0) {
        float volumeTransmittance = exp(-u_volumeDensity * thickness);
        refrColor = mix(u_volumeColor, refrColor, volumeTransmittance);
    }

    refrColor = sat(refrColor, u_saturation);
    refrColor *= 1.3;

    vec2 reflectedUV = clamp(screenUV + reflectDir.xy * u_reflectionStrength, 0.001, 0.999);
    vec3 reflColor = textureLod(u_reflectionTexture, reflectedUV, reflMip).rgb;
    float f0 = pow((1.0 - u_ior) / (1.0 + u_ior), 2.0);
    float fresnelFactor = fresnel(cosTheta, u_fresnelPower, f0);
    vec3 color = mix(refrColor, reflColor, fresnelFactor);
    float spec = ggxSpecular(u_lightDir, V, perturbedN, reflRoughness);
    color += spec * fresnelFactor * u_specularIntensity;

    if (u_sssIntensity > 0.0) {
        vec3 L = normalize(-u_lightDir);
        vec3 sssLightDir = normalize(L + N * 0.3);
        float sssDot = pow(clamp(dot(V, -sssLightDir), 0.0, 1.0), 3.0);
        float sssWeight = 1.0 - fresnelFactor;
        color += u_sssColor * sssDot * u_sssIntensity * sssWeight * thickness;
    }

    float edgeFactor = pow(1.0 - cosTheta, u_edgeTintPower);
    vec3 edgeTintResult = mix(vec3(1.0), u_edgeTint, edgeFactor);
    color *= edgeTintResult;
    float aoFinal = mix(1.0, ao, u_aoIntensity);
    color = mix(color * aoFinal, color * mix(1.0, aoFinal, 0.3), fresnelFactor);
    gl_FragColor = vec4(color, 1.0);
}
