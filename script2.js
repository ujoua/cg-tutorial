// 05_transform_auto 참고
const h_scr = window.innerWidth;
const v_scr = window.innerHeight; 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, h_scr/v_scr, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({canvas: HelloCanvas}); 
renderer.setSize(h_scr, v_scr); 

// 15_texture_cube 참고
const path = 'https://threejs.org/examples/textures/cube/SwedishRoyalCastle/';
const urls = [
				path+'px.jpg', path+'nx.jpg', 
				path+'py.jpg', path+'ny.jpg', 
				path+'pz.jpg', path+'nz.jpg'
			];
const reflectionCube = new THREE.CubeTextureLoader().load(urls);
scene.background = reflectionCube;

const light1 = new THREE.DirectionalLight(0xffffff, 1.0); 
light1.position.set (2,2,2); 
scene.add(light1);

const geometry = new THREE.OctahedronGeometry();
const material1 = new THREE.MeshPhongMaterial({color: 0xffd400, shininess : 90.0 });
const material2 = new THREE.MeshPhongMaterial({color: 0xff0000, shininess : 90.0 });
const mesh1 = new THREE.Mesh( geometry, material1 );
const mesh2 = new THREE.Mesh( geometry, material2 );
scene.add(mesh1); 
scene.add(mesh2); 
mesh2.position.set(-2, 0, -2);

// https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame 참고
var start = null;
function animate(timestamp) {
	if (!start) start = timestamp;
	var progress = timestamp - start;

	renderer.render(scene, camera);
	mesh1.rotation.y += 0.01;
	mesh2.rotation.y += 0.01;
	console.log(camera.position);
	if (progress < 1000) {
		animate1();
		requestAnimationFrame(animate);
	} else if (progress < 3000) {
		animate2();
		requestAnimationFrame(animate);
	} else if (progress < 5000) {
		animate3();
		if (progress > 4500)
			animate3_1();
		requestAnimationFrame(animate);
	} else if (progress < 7000) {
		animate4();
		requestAnimationFrame(animate);
	} else if (progress < 9000) {
		animate5();
		requestAnimationFrame(animate);
	} else if (progress < 11000) {
		animate6();
		requestAnimationFrame(animate);
	} else if (progress < 13000) {
		animate7(timestamp);
		requestAnimationFrame(animate);
	}
};
requestAnimationFrame(animate);

// 암 온 더
const animate1 = function() {
	camera.position.z -= 0.03;
}

// 넥스트 레벨
const animate2 = function() {
	camera.position.x = camera.position.x + 0.1 <= 1.0 ? camera.position.x + 0.1 : 1.0;
	camera.position.y = camera.position.y + 0.2 <= 2.0 ? camera.position.y + 0.2 : 2.0;
	camera.lookAt(0, 0, 0);
}

// 저 너머의 문을 열어
const animate3 = function() {
	camera.position.x = camera.position.x - 0.01 >= 0.1 ? camera.position.x - 0.01 : 0.1;
	camera.position.y = camera.position.y - 0.01 >= 1.1 ? camera.position.y - 0.01 : 1.1;
	camera.position.z = camera.position.z + 0.02 <= 3.5 ? camera.position.z + 0.02 : 3.5;
	camera.lookAt(0, 0, 0);
}
const animate3_1 = function() {
	mesh2.position.x += 0.1;
}

// 넥스트 레벨
const animate4 = function() {
	camera.position.x = camera.position.x + 0.1 <= 0.5 ? camera.position.x + 0.1 : 0.5;
	camera.position.y = camera.position.y + 0.2 <= 2.0 ? camera.position.y + 0.2 : 2.0;
	camera.lookAt(0, 0, 0);
}

// 널 결국엔 내가 부셔
const animate5 = function() {
	camera.position.x = camera.position.x - 0.04 >= -1 ? camera.position.x - 0.04 : -1;
	camera.position.y = camera.position.y - 0.03 >= -0.2 ? camera.position.y - 0.03 : -0.2;
	camera.position.z = camera.position.z + 0.03 <= 4 ? camera.position.z + 0.03 : 4;
	camera.lookAt(0, 0, 0);
}

// 넥스트 레벨
// https://stackoverflow.com/questions/27095251/how-to-rotate-a-three-perspectivecamera-around-on-object 참고
var radius = 6; 
var radians = Math.PI / 180 * 45;
const animate6 = function() {
	camera.position.x = radius * Math.cos(radians);  
	camera.position.z = radius * Math.sin(radians);
	camera.lookAt(0,0,0);
	radians += 0.01;
}

// 코스모에 닿을 때까지 넥스트 레벨 제껴라 제껴라 제껴라
const animate7 = function(timestamp) {	
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z -= Math.random() / 20;
	camera.lookAt(0,0,0);
}

