<template>
  <div ref='canvas'></div>
</template>

<script setup lang="ts">
// import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import * as THREE from 'three'

import { ref, onMounted } from 'vue';


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const light = new THREE.DirectionalLight('hsl(0, 100%, 100%)')
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({
    side: THREE.FrontSide,
    color: 'hsl(0, 100%, 50%)',
    wireframe: false
})
const cube = new THREE.Mesh(geometry, material)
const axes = new THREE.AxesHelper(5)

const scene = new THREE.Scene()
scene.add(camera)
scene.add(light)
scene.add(cube)
scene.add(axes)

const renderer = new THREE.WebGLRenderer({ antialias: true })

const canvas = ref<HTMLCanvasElement>(renderer.domElement)

onMounted(() => {
  canvas?.value?.appendChild(renderer.domElement)
});
</script>
