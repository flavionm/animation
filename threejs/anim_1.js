function WaveAnimation() { }

Object.assign(WaveAnimation.prototype, {

    init: function () {
        let upperArmTween = new TWEEN.Tween({ theta: 0 })
            .to({ theta: Math.PI / 2 }, 500)
            .onUpdate(function () {
                // This is an example of rotation of the right_upper_arm
                // Notice that the transform is M = T * R
                let right_upper_arm = robot.getObjectByName("right_upper_arm");
                right_upper_arm.matrix.makeRotationZ(this._object.theta)
                    .premultiply(new THREE.Matrix4().makeTranslation(2.6, 1.2, 0))
                    .multiply(new THREE.Matrix4().makeTranslation(0, -1.2, 0));

                let right_lower_arm = right_upper_arm.getObjectByName("lower_arm");
                right_lower_arm.matrix.makeRotationZ(this._object.theta)
                    .premultiply(new THREE.Matrix4().makeTranslation(0, -2, 0))
                    .multiply(new THREE.Matrix4().makeTranslation(0, -1, 0));

                let right_hand = right_lower_arm.getObjectByName("hand");
                right_hand.matrix.makeRotationZ(this._object.theta / 3)
                    .premultiply(new THREE.Matrix4().makeTranslation(0, -1.1, 0))
                    .multiply(new THREE.Matrix4().makeTranslation(0, -0.4, 0));

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            });
        // Here you may include animations for other parts

        let handTween = new TWEEN.Tween({ theta: Math.PI / 6 })
            .to({ theta: -Math.PI / 6 }, 300)
            .onUpdate(function () {
                let right_upper_arm = robot.getObjectByName("right_upper_arm");
                let right_lower_arm = right_upper_arm.getObjectByName("lower_arm");
                let right_hand = right_lower_arm.getObjectByName("hand");
                right_hand.matrix.makeRotationZ(this._object.theta)
                    .premultiply(new THREE.Matrix4().makeTranslation(0, -1.1, 0))
                    .multiply(new THREE.Matrix4().makeTranslation(0, -0.4, 0));

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            });

        let headTween = new TWEEN.Tween({ theta: 0 })
            .to({ theta: Math.PI / 6 }, 300)
            .onUpdate(function () {
                let head = robot.getObjectByName("head");
                head.matrix.makeRotationZ(this._object.theta)
                    .premultiply(new THREE.Matrix4().makeTranslation(0, 4.3, 0))
                    .multiply(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

                // Updating final world matrix (with parent transforms) - mandatory
                head.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            });

        let otherArmTween = new TWEEN.Tween({ theta: 0 })
            .to({ theta: -Math.PI / 12 }, 300)
            .onUpdate(function () {
                let left_upper_arm = robot.getObjectByName("left_upper_arm");

                let left_lower_arm = left_upper_arm.getObjectByName("lower_arm");
                left_lower_arm.matrix.makeRotationZ(this._object.theta)
                    .premultiply(new THREE.Matrix4().makeTranslation(0, -2, 0))
                    .multiply(new THREE.Matrix4().makeTranslation(0, -1, 0));

                let left_hand = left_lower_arm.getObjectByName("hand");
                left_hand.matrix.makeRotationZ(this._object.theta)
                    .premultiply(new THREE.Matrix4().makeTranslation(0, -1.1, 0))
                    .multiply(new THREE.Matrix4().makeTranslation(0, -0.4, 0));

                // Updating final world matrix (with parent transforms) - mandatory
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        handTween.yoyo(true).repeat(Infinity);
        upperArmTween.chain(handTween).start();
        headTween.start();
        otherArmTween.start();
    },
    animate: function (time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function () {
        this.init();
        this.animate(0);
    }
});
