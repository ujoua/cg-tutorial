// 05_transform_auto ����
const h_scr = window.innerWidth;
const v_scr = window.innerHeight; 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, h_scr/v_scr, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({canvas: HelloCanvas}); 
renderer.setSize(h_scr, v_scr); 

// 15_texture_cube ����
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

const geometry = new THREE.ConeGeometry();
const material1 = new THREE.MeshPhongMaterial({color: 0xff0000, shininess : 90.0 });
const box1 = new THREE.Mesh( geometry, material1 );
scene.add(box1); 

// https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame ����
var start = null;
function animate(timestamp) {
	if (!start) start = timestamp;
	var progress = timestamp - start;

	renderer.render(scene, camera);
	if (progress < 1000) {
		animate1();
		requestAnimationFrame(animate);
		console.log(camera.position.z);
	} else if (progress < 2000) {
		animate2();
		requestAnimationFrame(animate);
	} else if (progress < 3000) {
		animate3();
		requestAnimationFrame(animate);
	} else if (progress < 4000) {
		animate4();
		requestAnimationFrame(animate);
	} else if (progress < 5000) {
		animate5();
		requestAnimationFrame(animate);
	} else if (progress < 6000) {
		animate6();
		requestAnimationFrame(animate);
	} else if (progress < 7000) {
		animate7();
		requestAnimationFrame(animate);
	}
};
requestAnimationFrame(animate);

// �� �� ��
const animate1 = function() {
	camera.position.z -= 0.03;
}

// �ؽ�Ʈ ����
const animate2 = function() {
	camera.position.x = 1.0;
	camera.position.y = 2.0;
	camera.lookAt(0, 0, 0);
}

// �� �ʸ��� ���� ����
const animate3 = function() {
	camera.position.x = 0;
	camera.position.y = 0.2;
	camera.position.z = 3.5;
	camera.lookAt(0, 0, 0);
}

// �ؽ�Ʈ ����
const animate4 = function() {
	camera.position.x = 0.5;
	camera.position.y = 2.0;
	camera.lookAt(0, 0, 0);
}

// �� �ᱹ�� ���� �μ�
const animate5 = function() {
	camera.position.x = -1;
	camera.position.y = -0.3;
	camera.position.z = 4;
	camera.lookAt(0, 0, 0);
}

// �ؽ�Ʈ ����
// https://stackoverflow.com/questions/27095251/how-to-rotate-a-three-perspectivecamera-around-on-object ����
var radius = 6; 
var radians = Math.PI / 180 * 45;
const animate6 = function() {
	camera.position.x = radius * Math.cos(radians);  
	camera.position.z = radius * Math.sin(radians);
	camera.lookAt(0,0,0);
	radians += 0.01;
}

// �ڽ��� ���� ������ �ؽ�Ʈ ���� ������ ������ ������
const animate7 = function() {
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 5;
	camera.lookAt(0,0,0);
}