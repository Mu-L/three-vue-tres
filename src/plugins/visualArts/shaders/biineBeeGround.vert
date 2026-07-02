#include <common>
#include <shadowmap_pars_vertex>

varying vec2 v_worldPos;

void main() {
    vec3 transformed = position;
    vec3 transformedNormal = normalMatrix * normal;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
    v_worldPos = worldPosition.xz;

    #include <shadowmap_vertex>
}
