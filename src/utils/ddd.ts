import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';

const createTextNode = async (text: string) => {
  const textSettings = {
    font: 'fonts/apollo_2/Apollo.ttf',
    size: 10,
    height: 10,
    curveSegments: 1,
    bevelEnabled: false,
    color: 0x0000dd
  }

  const loader = new TTFLoader();
  const fontJson = await loader.loadAsync(textSettings.font);

  const font = new Font(fontJson);
  const textGeo = new TextGeometry(text, {
    font: font,
    size: textSettings.size,
    height: textSettings.height,
    curveSegments: textSettings.curveSegments,
    bevelEnabled: textSettings.bevelEnabled,
  });

  textGeo.computeBoundingBox();
  textGeo.computeVertexNormals();

  const textMaterial = new THREE.MeshBasicMaterial({
    color: textSettings.color
  });

  const textMesh = new THREE.Mesh(textGeo, textMaterial);
  textMesh.position.x = 0;
  textMesh.position.y = 0;
  textMesh.position.z = 0;

  return textMesh;
}

export { createTextNode }
