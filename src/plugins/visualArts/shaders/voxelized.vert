// define object position in space

uniform float time;
varying vec3 vNormal;
uniform float triScale;
uniform float progress;
uniform float mosaic;
attribute vec3 center;
#include noise.glsl;
float PI = 3.141592653589793238;

float backout(float progress, float swing)
	{
		float p = progress - 1.;
		return (p * p * ((swing + 1.) * p + swing) + 1.);
	}


void main(){
  vNormal = normal;

  vec3 pos = position;

  float transformStart = -(position.y*0.1+0.5 )*4.;
  float transformProgress = backout(clamp(progress*10. + transformStart, 0., 1.), 10.);

  // TRIANGLE
  pos = (pos - center) * triScale + center;

  // PIXELATED
  vec3 posPixelated = floor(pos * mosaic +0.5) / mosaic;
  pos = mix(pos, posPixelated, transformProgress);

  float noise = cnoise(vec4(pos, time*0.4)*0.1);

  float rotation = noise * PI * 0.1;
  pos = rotate(pos, vec3(1.,0.,0.), rotation);
  pos = rotate(pos, vec3(0.,1.,0.), rotation);
  pos = rotate(pos, vec3(0.,1.,1.), rotation);

  float scale = 1.0 + noise*0.05;
  pos *= scale;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}