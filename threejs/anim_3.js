function MarioAnimation() { }

Object.assign(MarioAnimation.prototype, {

	init: function () {
		let torsoTween = new TWEEN.Tween({ y: 0 })
			.to({ y: 5 }, 650)
			.onUpdate(function () {
				let torso = robot.getObjectByName("torso");
				torso.matrix.makeTranslation(0, this._object.y, 0);

				// Updating final world matrix (with parent transforms) - mandatory
				torso.updateMatrixWorld(true);
				// Updating screen
				stats.update();
				renderer.render(scene, camera);
			});

		let limbsTween = new TWEEN.Tween({ theta: 0 })
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

				let left_upper_arm = robot.getObjectByName("left_upper_arm");
				left_upper_arm.matrix.makeRotationZ(-this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(-2.6, 1.2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1.2, 0));

				let left_lower_arm = left_upper_arm.getObjectByName("lower_arm");
				left_lower_arm.matrix.makeRotationZ(this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -2, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1, 0));

				let right_upper_leg = robot.getObjectByName("right_upper_leg");
				right_upper_leg.matrix.makeRotationZ(this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(1, -3.8, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1.2, 0));

				let right_lower_leg = right_upper_leg.getObjectByName("lower_leg");
				right_lower_leg.matrix.makeRotationZ(-this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -2.5, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1, 0));

				let left_upper_leg = robot.getObjectByName("left_upper_leg");
				let left_lower_leg = left_upper_leg.getObjectByName("lower_leg");
				left_lower_leg.matrix.makeRotationZ(-this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -2.5, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -1, 0));

				// Updating final world matrix (with parent transforms) - mandatory
				robot.updateMatrixWorld(true);
				// Updating screen
				stats.update();
				renderer.render(scene, camera);
			});
		// Here you may include animations for other parts

		let extremityTween = new TWEEN.Tween({ theta: 0 })
			.to({ theta: Math.PI / 6 }, 500)
			.onUpdate(function () {
				let head = robot.getObjectByName("head");
				head.matrix.makeRotationZ(this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, 4.3, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

				let right_upper_arm = robot.getObjectByName("right_upper_arm");
				let right_lower_arm = right_upper_arm.getObjectByName("lower_arm");
				let right_hand = right_lower_arm.getObjectByName("hand");
				right_hand.matrix.makeRotationZ(this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -1.1, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -0.4, 0));

				let left_upper_arm = robot.getObjectByName("left_upper_arm");
				let left_lower_arm = left_upper_arm.getObjectByName("lower_arm");
				let left_hand = left_lower_arm.getObjectByName("hand");
				left_hand.matrix.makeRotationZ(this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -1.1, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -0.4, 0));

				let right_upper_leg = robot.getObjectByName("right_upper_leg");
				let right_lower_leg = right_upper_leg.getObjectByName("lower_leg");
				let right_foot = right_lower_leg.getObjectByName("foot");
				right_foot.matrix.makeRotationZ(this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -1.4, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -0.6, 0));

				let left_upper_leg = robot.getObjectByName("left_upper_leg");
				let left_lower_leg = left_upper_leg.getObjectByName("lower_leg");
				let left_foot = left_lower_leg.getObjectByName("foot");
				left_foot.matrix.makeRotationZ(-this._object.theta)
					.premultiply(new THREE.Matrix4().makeTranslation(0, -1.4, 0))
					.multiply(new THREE.Matrix4().makeTranslation(0, -0.6, 0));

				// Updating final world matrix (with parent transforms) - mandatory
				robot.updateMatrixWorld(true);
				// Updating screen
				stats.update();
				renderer.render(scene, camera);
			});

		//  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
		torsoTween.yoyo(true).repeat(1).start();
		limbsTween.yoyo(true).delay(150).repeat(1).start();
		extremityTween.yoyo(true).delay(150).repeat(1).start();
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
