varying vec2 v_uv;
varying vec3 v_worldPos;
varying vec3 v_worldNormal;
varying vec3 v_viewDir;

#include <skinning_pars_vertex>

void main() {
    v_uv = uv;
    vec3 transformed = position;
    vec3 objectNormal = normal;

    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <skinning_vertex>

    vec4 worldPos = modelMatrix * vec4(transformed, 1.0);
    v_worldPos = worldPos.xyz;
    v_worldNormal = normalize((modelMatrix * vec4(objectNormal, 0.0)).xyz);
    v_viewDir = normalize(cameraPosition - worldPos.xyz);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
