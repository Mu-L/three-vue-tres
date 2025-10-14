
function fixSpritesForMirror(root, isf = true) {
    root.traverse((obj) => {
        if (obj.isSprite) {
            // 垂直镜像反射时翻转Y轴
            if (isf) {
                obj.material.rotation = (obj.material.rotation || 0) + Math.PI
            } else {
                obj.material.rotation = obj.material.rotation - Math.PI
            }
        }
    });
}

export { fixSpritesForMirror }
