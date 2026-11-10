import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshStandardMaterial } from 'three';

// GLTFExporter uses the browser FileReader API even for binary geometry exports.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = result;
      this.onloadend?.();
    });
  }
};

const source = process.argv[2];
if (!source) throw new Error('Pass the path to the portrait OBJ file.');
const text = await readFile(source, 'utf8');
const materialFiles = [...text.matchAll(/^mtllib\s+(.+)$/gm)].map((match) => match[1]);
const model = new OBJLoader().parse(text);
let triangles = 0;
model.traverse((object) => {
  if (!object.isMesh) return;
  const geometry = object.geometry;
  // This upload contains no material or texture files; use a neutral sculpture finish.
  geometry.deleteAttribute('uv');
  geometry.deleteAttribute('normal');
  geometry.computeBoundingBox();
  const bounds = geometry.boundingBox;
  const extent = Math.max(bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y, bounds.max.z - bounds.min.z);
  // Weld at a fine spatial resolution and discard collapsed triangles.
  // This reduces the nearly two million original faces for interactive viewing.
  object.geometry = mergeVertices(geometry, extent / 700);
  geometry.dispose();
  const indices = object.geometry.index.array;
  const visible = [];
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i], b = indices[i + 1], c = indices[i + 2];
    if (a !== b && b !== c && a !== c) visible.push(a, b, c);
  }
  object.geometry.setIndex(visible);
  object.geometry.computeVertexNormals();
  triangles += object.geometry.index.count / 3;
  object.material = new MeshStandardMaterial({
    color: 0xc7c4b8,
    roughness: 0.75,
    metalness: 0.05,
    vertexColors: object.geometry.hasAttribute('color'),
  });
});
const glb = await new GLTFExporter().parseAsync(model, { binary: true });
await mkdir(new URL('../public/models/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/models/profile.glb', import.meta.url), Buffer.from(glb));
console.log(JSON.stringify({ triangles, materialFiles, sourceBytes: Buffer.byteLength(text), glbBytes: glb.byteLength }));
