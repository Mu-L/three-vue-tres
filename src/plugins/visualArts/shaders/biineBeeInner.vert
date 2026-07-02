#include <common>
#include <shadowmap_pars_vertex>

varying vec2 v_uv;
varying vec3 v_worldNormal;
varying vec3 v_worldPos;

#include <skinning_pars_vertex>

void main() {
    v_uv = uv;
    vec3 transformed = position - normal;
    vec3 objectNormal = normal;

    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <skinning_vertex>

    vec3 transformedNormal = normalMatrix * objectNormal;
    vec4 worldPos = modelMatrix * vec4(transformed, 1.0);
    v_worldPos = worldPos.xyz;
    v_worldNormal = normalize((modelMatrix * vec4(objectNormal, 0.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    vec4 worldPosition = worldPos;

    #include <shadowmap_vertex>
}
