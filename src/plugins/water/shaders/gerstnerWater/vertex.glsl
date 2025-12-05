  uniform mat4 textureMatrix;
            uniform float time;

            varying vec4 mirrorCoord;
            varying vec4 worldPosition;

            #include <common>
            #include <fog_pars_vertex>
            #include <shadowmap_pars_vertex>
            #include <logdepthbuf_pars_vertex>

            uniform vec4 waveA;
            uniform vec4 waveB;
            uniform vec4 waveC;

            vec3 GerstnerWave (vec4 wave, vec3 p) {
            	float steepness = wave.z;
            	float wavelength = wave.w;
            	float k = 2.0 * PI / wavelength;
            	float c = sqrt(9.8 / k);
            	vec2 d = normalize(wave.xy);
            	float f = k * (dot(d, p.xy) - c * time);
            	float a = steepness / k;

            	return vec3(
            		d.x * (a * cos(f)),
            		d.y * (a * cos(f)),
            		a * sin(f)
            	);
            }

            void main() {
            	mirrorCoord = modelMatrix * vec4( position, 1.0 );
            	worldPosition = mirrorCoord.xyzw;
            	mirrorCoord = textureMatrix * mirrorCoord;

            	vec3 p = position.xyz;
            	p += GerstnerWave(waveA, position.xyz);
            	p += GerstnerWave(waveB, position.xyz);
            	p += GerstnerWave(waveC, position.xyz);
            	gl_Position = projectionMatrix * modelViewMatrix * vec4( p.x, p.y, p.z, 1.0);

            	#include <beginnormal_vertex>
            	#include <defaultnormal_vertex>
            	#include <logdepthbuf_vertex>
            	#include <fog_vertex>
            	#include <shadowmap_vertex>
            }