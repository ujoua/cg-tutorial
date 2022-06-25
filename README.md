# CG Tutorial

22-1컴퓨터그래픽스 기말과제

[index.html 영상](index.mp4)

# PerspectiveCamera를 제대로 활용하여 뮤직비디오 같이 화려한 장면 연출하기
1. index1.html - rotation을 활용한 팬, 틸트 샷
2. index2.html - position을 활용한 붐, 아크 샷
3. index3.html - PerspectiveCamera, lookAt, getWorldPosition을 활용한 줌, 싱글 샷(개인 직캠)

## 1) 아이템 선발 과정
컴퓨터 그래픽스 강의 시간에 WebGL의 View/Projection Transform 이론 수업과 함께 Three.js의 PerspectiveCamera 실습을 진행할 때, 세 개의 정육면체가 태양-지구-달을 연상시키는 예제를 이용했었습니다.

그런데 저는 이때 태양-지구-달보다 **사람들에게 더 익숙한 주제인 아이돌 뮤직비디오, 직캠과 같은 예제를 제시하면** PerspectiveCamera 오브젝트와 lookAt, getWorldPosition 메소드들을 **학습하기 더 쉬울 것 같다**는 생각이 들었습니다.

따라서 <PerspectiveCamera를 제대로 활용하여 뮤직비디오 같이 화려한 장면 연출하기>를 아이템으로 선발하게 되었습니다.

## 2) 개발 과정
먼저 컨텐츠를 크게 세 가지 주제로 다음과 같이 나누었습니다.
1. 삼각대는 고정한 채 카메라만 움직이는 방법인 팬, 틸트 샷 연출하기
2. 카메라 전체를 움직이는 방법인 붐, 아크 샷 연출하기
3. 카메라 렌즈가 움직이는 방법인 줌과 흔히 개인 직캠이라고 부르는 방법인 싱글 샷 연출하기

OctahedronGeometry를 공연을 하는 아이돌로, PerspectiveCamera를 공연을 찍는 카메라로 가정해 표현하였습니다. 이때 기본 스켈레톤 코드로는 이 [깃 허브 코드](https://github.com/learn-cg/three.js/blob/main/05_transform_auto.js)를, 장면의 배경 설정은 이 [깃 허브 코드](https://github.com/learn-cg/three.js/blob/main/15_texture_cube.js)를 참고하였습니다. 그리고 간단히 시간에 따라 다른 애니메이션 클립이 실행되도록 하는 일은 이 [모질라 글](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)을 참고하였습니다.

각 주제에서 OctahedronGeometry의 위치와 움직임은 모두 동일하며, PerspectiveCamera의 위치와 움직임만 달리합니다. 이와 같은 각 주제의 세부 개발 과정을 설명하자면 다음과 같습니다.

### 2-1) rotation을 활용한 팬, 틸트 샷
이 주제는 기초를 위한 부분이라 특별히 따라하고자 하는 참고 영상 없이 위아래로, 좌우로, 시계반시계로 팬/틸트 샷을 연출해보는 것을 개발했습니다.

```js
function animate(timestamp) {
    ...
    // 틸트
    camera.rotation.x += 0.01;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    requestAnimationFrame(animate);
    ...
    //팬
    camera.rotation.x = 0;
    camera.rotation.y += 0.01;
    camera.rotation.z = 0;
    requestAnimationFrame(animate);
    ...
}
```
위와 같이 틸트 샷은 PerspectiveCamera의 x축에 대한 rotation 값을 증감시킴으로써 개발할 수 있었고, 팬 샷은 PerspectiveCamera의 y축에 대한 rotation 값을 증감시킴으로써 개발할 수 있었습니다.

### 2-2) position을 활용한 붐, 아크 샷
이 주제는 [Next Level 뮤직비디오 영상](https://youtu.be/60eU66pu-tA?t=92)을 참고하여 따라해보는 것을 목표로 개발했습니다.

```js
    ...
    // 붐 업 샷
	camera.position.x = camera.position.x + 0.1 <= 1.0 ? camera.position.x + 0.1 : 1.0;
	camera.position.y = camera.position.y + 0.2 <= 2.0 ? camera.position.y + 0.2 : 2.0;
	camera.lookAt(0, 0, 0);
    ...

    // 붐 다운 샷
	camera.position.x = camera.position.x - 0.01 >= 0.1 ? camera.position.x - 0.01 : 0.1;
	camera.position.y = camera.position.y - 0.01 >= 1.1 ? camera.position.y - 0.01 : 1.1;
	camera.position.z = camera.position.z + 0.02 <= 3.5 ? camera.position.z + 0.02 : 3.5;
	camera.lookAt(0, 0, 0);
    ...
```
위와 같이 붐 업 샷은 PerspectiveCamera의 position.y를 증가시킴으로써, 붐 다운 샷은 position.y를 감소시킴으로써 개발할 수 있었습니다. 이와 동시에 lookAt 메소드를 사용함으로써 참고 영상과 같은 하이/로우 앵글을 연출할 수 있었습니다.

```js
    ...
    // 아크 샷
	camera.position.x = radius * Math.cos(radians);  
	camera.position.z = radius * Math.sin(radians);
	camera.lookAt(0,0,0);
	radians += 0.01;
    ...
```
그리고 위와 같이 아크 샷은 카메라가 호를 그릴 경로를 직접 cos, sin 값으로 계산하여 PerspectiveCamera의 position.x와 position.z에 대입함과 동시에 lookAt 메소드를 사용함으로써 개발할 수 있었습니다. 이때 이러한 [스택오버플로우 글](https://stackoverflow.com/questions/27095251/how-to-rotate-a-three-perspectivecamera-around-on-object) 자료를 참고하였습니다.

### 2-3) PerspectiveCamera, lookAt, getWorldPosition을 활용한 줌, 싱글 샷
이 주제는 [Next Level 개인 직캠 영상](https://youtu.be/nyvWK4n6AAc?t=50)을 참고하여 따라해보는 것을 목표로 개발했습니다.

```js
    ...
    // 줌
    const camera = new THREE.PerspectiveCamera(15, h_scr/v_scr, 0.1, 1000);
    ...

    // 싱글 샷(개인 직캠)
        camera.lookAt(mesh2.getWorldPosition(new THREE.Vector3(-1, 0, 0)));
    ...
```
위와 같이 줌은 PerspectiveCamera의 fov 값을 45에서 15로 축소함으로써 개발할 수 있었습니다. 그리고 싱글 샷(개인 직캠)은 lookAt()과 mesh2.getWorldPosition() 메소드를 이용함으로써 개발할 수 있었습니다. 따라서 참고 영상처럼 멀리서 확대하여 계속 mesh2를 중심으로 촬영하는 장면을 연출할 수 있었습니다.

## 3) 느낀 점
