<template>
  <canvas ref='canvas'></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three';
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

camera.position.set(0, 0, 300);
const cameraTarget = new THREE.Vector3(0, 0, 0);
scene.add(camera);

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


onMounted(() => {
  const htmlCanvas = canvas.value as unknown as HTMLCanvasElement;

  const renderer = new THREE.WebGLRenderer({canvas: htmlCanvas});

  resizeScene(camera, renderer, sizes)
  renderer.render(scene, camera);

  const controls = new OrbitControls(camera, htmlCanvas)
  controls.enabled = true;

  
  window.addEventListener('resize', () => resizeScene(camera, renderer))
  window.addEventListener('dblclick', () => toggleFullScreen(htmlCanvas))

  const tick = () => {
    controls.update()
    
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
  }

  camera.lookAt(cameraTarget);
  tick()
});

</script>
