function HappyAnimation() { }

Object.assign(HappyAnimation.prototype, {

	init: function () {
		let armsTween = new TWEEN.Tween({ theta: 0 })
			.to({ theta: Math.PI / 4 }, 400)
			.onUpdate(function () {
				// This is an example of rotation of the right_upper_arm
				// Notice that the transform is M = T * R
				let right_upper_arm = robot.getObjectByName("right_upper_arm");
				right_upper_arm.matrix.makeRotationZ(this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(2.6, 1.2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1.2, 0));

				let right_lower_arm = right_upper_arm.getObjectByName("lower_arm");
				right_lower_arm.matrix.makeRotationZ(3 * this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1, 0));

				let left_upper_arm = robot.getObjectByName("left_upper_arm");
				left_upper_arm.matrix.makeRotationZ(-this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(-2.6, 1.2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1.2, 0));

				let left_lower_arm = left_upper_arm.getObjectByName("lower_arm");
				left_lower_arm.matrix.makeRotationZ(-3 * this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1, 0));

				// Updating final world matrix (with parent transforms) - mandatory
				robot.updateMatrixWorld(true);
				// Updating screen
				stats.update();
				renderer.render(scene, camera);
			});

		let upperArmsTween = new TWEEN.Tween({ theta: Math.PI / 4 })
			.to({ theta: 5 * Math.PI / 6 }, 400)
			.onUpdate(function () {
				let right_upper_arm = robot.getObjectByName("right_upper_arm");
				right_upper_arm.matrix.makeRotationZ(this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(2.6, 1.2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1.2, 0));

				let right_lower_arm = right_upper_arm.getObjectByName("lower_arm");
				right_lower_arm.matrix.makeRotationZ(Math.PI - this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1, 0));

				let left_upper_arm = robot.getObjectByName("left_upper_arm");
				left_upper_arm.matrix.makeRotationZ(-this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(-2.6, 1.2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1.2, 0));

				let left_lower_arm = left_upper_arm.getObjectByName("lower_arm");
				left_lower_arm.matrix.makeRotationZ(-(Math.PI - this._object.theta))
					.premultiply(new THREE.Matrix4().makeTranslation(0, -2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1, 0));

				// Updating final world matrix (with parent transforms) - mandatory
				robot.updateMatrixWorld(true);
				// Updating screen
				stats.update();
				renderer.render(scene, camera);
			});

		let headTween = new TWEEN.Tween({ y: 0 })
			.to({ y: 0.5 }, 400)
			.onUpdate(function () {
				let head = robot.getObjectByName("head");
				head.matrix.makeTranslation(0, 4.8 - this._object.y, 0);

				// Updating final world matrix (with parent transforms) - mandatory
				head.updateMatrixWorld(true);
				// Updating screen
				stats.update();
				renderer.render(scene, camera);
			});

		//  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
		upperArmsTween.yoyo(true).delay(400).repeatDelay(0).repeat(3).start();
		armsTween.yoyo(true).repeatDelay(1600).repeat(1).start();
		headTween.yoyo(true).repeat(3).start();
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
