import * as THREE from 'three';

// 1. Khởi tạo Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Màu trời
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Ánh sáng
const light = new THREE.HemisphereLight(0xeeeeee, 0x888888, 1);
scene.add(light);

// 3. Tạo địa hình đơn giản (Voxel)
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const grassMat = new THREE.MeshLambertMaterial({ color: 0x4dca4d });

for (let x = -10; x < 10; x++) {
    for (let z = -10; z < 10; z++) {
        const cube = new THREE.Mesh(boxGeo, grassMat);
        cube.position.set(x, 0, z);
        scene.add(cube);
    }
}

// 4. Điều khiển di chuyển
camera.position.y = 2;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') moveForward = true;
    if (e.code === 'KeyS') moveBackward = true;
    if (e.code === 'KeyA') moveLeft = true;
    if (e.code === 'KeyD') moveRight = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW') moveForward = false;
    if (e.code === 'KeyS') moveBackward = false;
    if (e.code === 'KeyA') moveLeft = false;
    if (e.code === 'KeyD') moveRight = false;
});

// Khóa chuột khi click
document.body.addEventListener('click', () => {
    document.body.requestPointerLock();
});

document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === document.body) {
        camera.rotation.y -= e.movementX * 0.002;
        camera.rotation.x -= e.movementY * 0.002;
    }
});

// 5. Loop Game
function animate() {
    requestAnimationFrame(animate);
    
    if (document.pointerLockElement === document.body) {
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();

        if (moveForward || moveBackward) velocity.z -= direction.z * 0.01;
        if (moveLeft || moveRight) velocity.x -= direction.x * 0.01;

        camera.translateX(-velocity.x);
        camera.translateZ(-velocity.z);
        velocity.multiplyScalar(0.9); // Giảm tốc (ma sát)
    }
    
    renderer.render(scene, camera);
}
animate();
