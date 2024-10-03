import * as THREE from 'three';
import { gsap } from 'gsap';

// Créez une scène, une caméra et un rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Créez un plan avec un shader pour l'effet de squizzle
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    
    float rand(vec2 co){
      return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      float noise = rand(vec2(vUv.x * 10.0 + uTime * 0.5, vUv.y * 100.0));
      vec3 color = vec3(noise);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 1;

// Animation avec GSAP
gsap.to(material.uniforms.uTime, {
  value: 10,
  repeat: -1,
  yoyo: true,
  duration: 5,
  ease: "linear"
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Adapter la taille du rendu au redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
