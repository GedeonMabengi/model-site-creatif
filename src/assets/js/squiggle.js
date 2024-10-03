import * as THREE from 'three';
import { gsap } from 'gsap';

// Configurer la scène, la caméra et le renderer de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumière pour illuminer l'objet 3D
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Fonction pour créer une courbe sinusoïdale (squiggle)
class SquiggleCurve extends THREE.Curve {
  constructor(scale) {
    super();
    this.scale = scale;
  }

  getPoint(t) {
    const tx = t * 10 - 5; // Générer un point sur l'axe X
    const ty = Math.sin(2 * Math.PI * t * 2) * 2; // Calculer la position Y pour une forme sinusoïdale
    const tz = Math.cos(2 * Math.PI * t * 2) * 2; // Calculer la position Z pour un mouvement ondulé

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  }
}

// Créer la géométrie d'un tube basé sur la courbe sinusoïdale (squiggle)
const path = new SquiggleCurve(4); // Ajuster l'échelle pour une taille de squiggle plus grande
const tubularSegments = 200; // Nombre de segments le long du tube
const radius = 0.45; // Rayon du tube (45px)
const radialSegments = 16; // Nombre de segments autour du tube
const closed = false; // Tube ouvert

const geometry = new THREE.TubeGeometry(path, tubularSegments, radius, radialSegments, closed);

// Matériau MeshLambert avec dégradé pour la forme 3D
const material = new THREE.MeshPhongMaterial({
  color: 0xff00ff, // Couleur de base
  flatShading: true,
  wireframe: false
});

// Créer le mesh du squiggle 3D
const squiggleMesh = new THREE.Mesh(geometry, material);
scene.add(squiggleMesh);

// Position de la caméra
camera.position.z = 20; // Ajuster la position pour bien voir le squiggle

// Animation du squiggle avec un mouvement de rotation et de translation ondulatoire
gsap.to(squiggleMesh.rotation, {
  x: "+=6.28", // Rotation complète autour de l'axe X
  repeat: -1,
  duration: 6,
  ease: 'linear'
});

gsap.to(squiggleMesh.rotation, {
  y: "+=6.28", // Rotation complète autour de l'axe Y
  repeat: -1,
  duration: 12,
  ease: 'linear'
});

// Animation d'ondulation sur les axes X, Y et Z
gsap.to(squiggleMesh.position, {
  x: "+=5",
  repeat: -1,
  yoyo: true,
  duration: 3,
  ease: 'sine.inOut'
});

gsap.to(squiggleMesh.position, {
  y: "+=2",
  repeat: -1,
  yoyo: true,
  duration: 2,
  ease: 'sine.inOut'
});

gsap.to(squiggleMesh.position, {
  z: "+=3",
  repeat: -1,
  yoyo: true,
  duration: 4,
  ease: 'sine.inOut'
});

// Fonction d'animation de Three.js
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
