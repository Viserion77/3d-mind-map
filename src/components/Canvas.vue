<template>
  <canvas ref='canvas'></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { GUI } from 'dat.gui'
import { ref, onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = ref<HTMLCanvasElement | null>(null);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00001f);

type ImplicitSize = {
  width: number,
  height: number
}

const sizes:ImplicitSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height);
camera.position.set(3, 3, 1);
scene.add(camera);

const axesHelper = new THREE.AxesHelper(7);
scene.add(axesHelper);

const gui = new GUI()
const meshFolder = gui.addFolder('Mesh')

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x').min(-3).max(3).step(0.01).name('Position X')
cameraFolder.add(camera.position, 'y').min(-3).max(3).step(0.01).name('Position Y')
cameraFolder.add(camera.position, 'z').min(-3).max(3).step(0.01).name('Position Z')

const toggleFullScreen = (element: HTMLElement) => {
  if (!document.fullscreenElement) {
    element.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const resizeScene = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, implicitSize: ImplicitSize | null = null) => {
  const sizes = implicitSize != null ? implicitSize : {
    width: window.innerWidth,
    height: window.innerHeight
  }

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const renderizeSceneOnCanvas = () => {
  const htmlCanvas = canvas.value as unknown as HTMLCanvasElement;

  const renderer = new THREE.WebGLRenderer({canvas: htmlCanvas});

  resizeScene(camera, renderer, sizes)
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  renderer.render(scene, camera);

  const controls = new OrbitControls(camera, htmlCanvas)
  controls.enabled = true;
  controls.enableDamping = true

  window.addEventListener('resize', () => resizeScene(camera, renderer))
  window.addEventListener('dblclick', () => toggleFullScreen(htmlCanvas))

  const tick = () => {
    controls.update()
    
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
  }

  tick()
}

onMounted(renderizeSceneOnCanvas);
</script>
