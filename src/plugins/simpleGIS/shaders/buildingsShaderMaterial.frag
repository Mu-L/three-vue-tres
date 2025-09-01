varying vec3 vPosition; // 模型空间坐标
uniform vec3 uMax;      // 模型包围盒最大值
uniform vec3 uMin;      // 模型包围盒最小值
uniform float uOpacity;
uniform float uBorderWidth;
uniform vec3 uLightColor;
uniform vec3 uColor;
uniform float uCircleTime;
uniform float uTime;
uniform vec3 uTopColor; // 顶部颜色
uniform bool uGradient;

void main() {
  vec3 distColor = uColor;

  // 光带流动计算
  float residue = mod(uTime, uCircleTime);
  float rate = residue / uCircleTime;
  float lightOffset = rate * (uMax.z - uMin.z);

  if (uMin.z + lightOffset < vPosition.z &&
      uMin.z + lightOffset + uBorderWidth > vPosition.z) {
    csm_DiffuseColor = vec4(uLightColor, uOpacity);
  } else {
    csm_DiffuseColor = vec4(distColor, uOpacity);
  }

  // 渐变计算
  if (uGradient) {
    float rateHeight = (vPosition.z - uMin.z) / (uMax.z - uMin.z);
    float mixNumber = clamp(rateHeight * 2.3 - 1.5, 0.1, 1.);
    vec3 outColor = mix(csm_DiffuseColor.xyz, uTopColor, mixNumber);
    csm_DiffuseColor = vec4(outColor, uOpacity);
  }
}
