import dynamic from 'next/dynamic';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { useThree } from '@react-three/fiber';

const AnimateCanvas = () => {
  // Texture Loader
  const textureLoader = new THREE.TextureLoader();
  // const cross = textureLoader.load('/cross.png')

  // Debug

  // Canvas
  const canvas = document.querySelector('canvas.webgl');

  // Scene
  const scene = new THREE.Scene();

  // Objects
  const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

  const particalGeometry = new THREE.BufferGeometry();
  const particalCount = 5000;

  const posArray = new Float32Array(particalCount * 3);

  for (let i = 0; i < particalCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }

  particalGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(posArray, 3),
  );
  // Materials

  const material = new THREE.PointsMaterial({
    size: 0.005,
  });

  const particalMaterial = new THREE.PointsMaterial({
    size: 0.005,
    // map: cross,
    tranparent: true,
    color: 'red',
  });

  // Ponits
  const sphere = new THREE.Points(geometry, material);
  const particlePoints = new THREE.Points(particalGeometry, material);
  scene.add(sphere, particlePoints);

  // Lights

  const pointLight = new THREE.PointLight(0xffffff, 0.1);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;
  scene.add(pointLight);
  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2;
  scene.add(camera);
  // Controls
  // const controls = new OrbitControls(camera, canvas)
  // controls.enableDamping = true

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // renderer.setClearColor(new THREE.Color('rgb(20, 20, 20)'));
  renderer.setClearColor(new THREE.Color('#21282a'));

  // MOUSE
  document.addEventListener('mousemove', animateParticles);
  let mouseY = 0;
  let mouseX = 0;

  function animateParticles(event) {
    mouseY = event.clientY;
    mouseX = event.clientX;
  }

  /**
   * Animate
   */

  const clock = new THREE.Clock();

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  particlePoints.rotation.y = -0.1 * elapsedTime;
  if (mouseX > 0) {
    particlePoints.rotation.x = -mouseY * (elapsedTime * 0.00008);
    particlePoints.rotation.y = -mouseX * (elapsedTime * 0.00008);
  }
  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(AnimateCanvas);
}

// create dynamic component
// export default dynamic(() => Promise.resolve({AnimateCanvas}: any), {});
