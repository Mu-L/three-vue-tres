export const SHAPE_METADATA = {
  Box: {
    params: [
      { key: "width", label: "width", type: "number", default: 1 },
      { key: "height", label: "height", type: "number", default: 1 },
      { key: "depth", label: "depth", type: "number", default: 1 },
      { key: "widthSegments", label: "widthSegments", type: "number", default: 1, min: 1, max: 6, step: 1 },
      { key: "heightSegments", label: "heightSegments", type: "number", default: 1, min: 1, max: 6, step: 1 },
      { key: "depthSegments", label: "depthSegments", type: "number", default: 1, min: 1, max: 6, step: 1 },
    ],
  },

  Circle: {
    params: [
      { key: "radius", label: "radius", type: "number", default: 1, min: 0 },
      { key: "segments", label: "segments", type: "number", default: 32, min: 3, max: 64, step: 1 },
      { key: "thetaStart", label: "thetaStart", type: "number", default: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      { key: "thetaLength", label: "thetaLength", type: "number", default: Math.PI * 2, min: 0.1, max: Math.PI * 2, step: 0.01 },
    ],
  },

  Cone: {
    params: [
      { key: "radius", label: "radius", type: "number", default: 1, min: 0 },
      { key: "height", label: "height", type: "number", default: 2, min: 0 },
      { key: "radialSegments", label: "radialSegments", type: "number", default: 8, min: 3, max: 64, step: 1 },
      { key: "heightSegments", label: "heightSegments", type: "number", default: 1, min: 1, max: 32, step: 1 },
      { key: "openEnded", label: "openEnded", type: "boolean", default: false },
      { key: "thetaStart", label: "thetaStart", type: "number", default: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      { key: "thetaLength", label: "thetaLength", type: "number", default: Math.PI * 2, min: 0.1, max: Math.PI * 2, step: 0.01 },
    ],
  },

  Cylinder: {
    params: [
      { key: "radiusTop", label: "radiusTop", type: "number", default: 1, min: 0 },
      { key: "radiusBottom", label: "radiusBottom", type: "number", default: 1, min: 0 },
      { key: "height", label: "height", type: "number", default: 2, min: 0 },
      { key: "radialSegments", label: "radialSegments", type: "number", default: 8, min: 3, max: 64, step: 1 },
      { key: "heightSegments", label: "heightSegments", type: "number", default: 1, min: 1, max: 32, step: 1 },
      { key: "openEnded", label: "openEnded", type: "boolean", default: false },
      { key: "thetaStart", label: "thetaStart", type: "number", default: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      { key: "thetaLength", label: "thetaLength", type: "number", default: Math.PI * 2, min: 0.1, max: Math.PI * 2, step: 0.01 },
    ],
  },

  Dodecahedron: {
    params: [
      { key: "radius", label: "radius", type: "number", default: 1, min: 0 },
      { key: "detail", label: "detail", type: "number", default: 0, min: 0, max: 5, step: 1 },
    ],
  },

  Icosahedron: {
    params: [
      { key: "radius", label: "radius", type: "number", default: 1, min: 0 },
      { key: "detail", label: "detail", type: "number", default: 0, min: 0, max: 5, step: 1 },
    ],
  },

  Octahedron: {
    params: [
      { key: "radius", label: "radius", type: "number", default: 1, min: 0 },
      { key: "detail", label: "detail", type: "number", default: 0, min: 0, max: 5, step: 1 },
    ],
  },

  Plane: {
    params: [
      { key: "width", label: "width", type: "number", default: 1, min: 0 },
      { key: "height", label: "height", type: "number", default: 1, min: 0 },
      { key: "widthSegments", label: "widthSegments", type: "number", default: 1, min: 1, max: 64, step: 1 },
      { key: "heightSegments", label: "heightSegments", type: "number", default: 1, min: 1, max: 64, step: 1 },
    ],
  },

  Ring: {
    params: [
      { key: "innerRadius", label: "innerRadius", type: "number", default: 0.5, min: 0 },
      { key: "outerRadius", label: "outerRadius", type: "number", default: 1, min: 0 },
      { key: "thetaSegments", label: "thetaSegments", type: "number", default: 8, min: 3, max: 64, step: 1 },
      { key: "phiSegments", label: "phiSegments", type: "number", default: 1, min: 1, max: 16, step: 1 },
      { key: "thetaStart", label: "thetaStart", type: "number", default: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      { key: "thetaLength", label: "thetaLength", type: "number", default: Math.PI * 2, min: 0.1, max: Math.PI * 2, step: 0.01 },
    ],
  },

  RoundedBox: {
    params: [
      { key: "width", label: "width", type: "number", default: 1, min: 0 },
      { key: "height", label: "height", type: "number", default: 1, min: 0 },
      { key: "depth", label: "depth", type: "number", default: 1, min: 0 },
      { key: "segments", label: "segments", type: "number", default: 2, min: 0, max: 8, step: 0.1 },
      { key: "radius", label: "radius", type: "number", default: 0.1, min: 0, max: 1, step: 0.01 },
    ],
  },

  Sphere: {
    params: [
      { key: "radius", label: "radius", type: "number", default: 1, min: 0 },
      { key: "widthSegments", label: "widthSegments", type: "number", default: 32, min: 3, max: 128, step: 1 },
      { key: "heightSegments", label: "heightSegments", type: "number", default: 16, min: 2, max: 128, step: 1 },
      { key: "phiStart", label: "phiStart", type: "number", default: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      { key: "phiLength", label: "phiLength", type: "number", default: Math.PI * 2, min: 0.1, max: Math.PI * 2, step: 0.01 },
      { key: "thetaStart", label: "thetaStart", type: "number", default: 0, min: 0, max: Math.PI, step: 0.01 },
      { key: "thetaLength", label: "thetaLength", type: "number", default: Math.PI, min: 0.1, max: Math.PI, step: 0.01 },
    ],
  },

  Tetrahedron: {
    params: [
      { key: "radius", label: "radius", type: "number", default: 1, min: 0 },
      { key: "detail", label: "detail", type: "number", default: 0, min: 0, max: 5, step: 1 },
    ],
  },

  Torus: {
    params: [
      { key: "radius", label: "radius", type: "number", default: 1, min: 0 },
      { key: "tube", label: "tube", type: "number", default: 0.4, min: 0 },
      { key: "radialSegments", label: "radialSegments", type: "number", default: 8, min: 3, max: 64, step: 1 },
      { key: "tubularSegments", label: "tubularSegments", type: "number", default: 64, min: 3, max: 256, step: 1 },
      { key: "arc", label: "arc", type: "number", default: Math.PI * 2, min: 0.1, max: Math.PI * 2, step: 0.01 },
    ],
  },

  TorusKnot: {
    params: [
      { key: "radius", label: "radius", type: "number", default: 1, min: 0 },
      { key: "tube", label: "tube", type: "number", default: 0.4, min: 0 },
      { key: "tubularSegments", label: "tubularSegments", type: "number", default: 64, min: 3, max: 256, step: 1 },
      { key: "radialSegments", label: "radialSegments", type: "number", default: 8, min: 3, max: 128, step: 1 },
      { key: "p", label: "p", type: "number", default: 2, min: 1, max: 10, step: 0.1 },
      { key: "q", label: "q", type: "number", default: 3, min: 1, max: 10, step: 0.1 },
    ],
  },
};
