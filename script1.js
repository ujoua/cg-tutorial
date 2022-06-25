// 05_transform_auto 참고
const h_scr = document.getElementById("HelloCanvas").width;
const v_scr = document.getElementById("HelloCanvas").height;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, h_scr/v_scr, 0.1, 1000);
camera.lookAt(0, 0, 0);
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
	var progress = (timestamp - start) % 10000;
	console.log(progress);
	
	renderer.render(scene, camera);
	
	if (progress < 1000) { // 틸트
		camera.rotation.x += 0.01;
		camera.rotation.y = 0;
		camera.rotation.z = 0;
		requestAnimationFrame(animate);
	} else if (progress < 2000) {
		camera.rotation.x -= 0.01;
		camera.rotation.y = 0;
		camera.rotation.z = 0;
		requestAnimationFrame(animate);
	} 
	else if (progress < 3000) { // 팬
		camera.rotation.x = 0;
		camera.rotation.y += 0.01;
		camera.rotation.z = 0;
		requestAnimationFrame(animate);
	}
	else if (progress < 4000) { // 소위 360도 회전
		camera.rotation.x = 0;
		camera.rotation.y -= 0.01;
		camera.rotation.z = 0;
		requestAnimationFrame(animate);
	} else if (progress < 5000) {
		if (progress > 4500)
			mesh2.position.x += 0.1;
		camera.rotation.x = 0;
		camera.rotation.y = 0;
		camera.rotation.z += 0.01;
		requestAnimationFrame(animate);
	} else if (progress < 6000) {
		camera.rotation.x = 0;
		camera.rotation.y = 0;
		camera.rotation.z -= 0.01;
		requestAnimationFrame(animate);
	} else {
		if (progress > 8000) {
			mesh1.position.set(0, 0, 0);
			mesh2.position.set(-2, 0, -2);
		}
		requestAnimationFrame(animate);
	}
};
requestAnimationFrame(animate);