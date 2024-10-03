import * as THREE from 'three';
import { gsap } from 'gsap';

// Configuration de la scène, de la caméra et du renderer de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Arrière-plan transparent
document.body.appendChild(renderer.domElement);

// Lumière ambiante pour illuminer les nuages
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Lumière directionnelle douce pour donner un effet de lumière dynamique
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Fonction pour créer un nuage stylisé
function createCloud() {
  const cloudGeometry = new THREE.SphereGeometry(1, 32, 32); // Nuage de base en forme de sphère
  const cloudMaterial = new THREE.MeshPhongMaterial({
    color: 0x87CEFA, // Couleur de base du nuage
    transparent: true,
    opacity: 0.6,
    shininess: 100,
    emissive: 0x4b0082, // Couleur d'émission subtile
    emissiveIntensity: 0.2,
  });

  const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

  // Création d'une déformation douce pour un effet de nuage fluide
  const noise = new THREE.Vector3(
    Math.random() * 0.5,
    Math.random() * 0.5,
    Math.random() * 0.5
  );

  cloudMesh.scale.set(1 + noise.x, 1 + noise.y, 1 + noise.z);
  cloudMesh.position.set(
    Math.random() * 20 - 10,
    Math.random() * 5,
    Math.random() * 20 - 10
  );

  return cloudMesh;
}

// Création d'un groupe de nuages
const clouds = new THREE.Group();
for (let i = 0; i < 10; i++) {
  clouds.add(createCloud());
}
scene.add(clouds);

// Position de la caméra pour bien voir les nuages
camera.position.z = 15;

// Animation des nuages avec GSAP
function animateClouds() {
  clouds.children.forEach((cloud, index) => {
    // Mouvement flottant des nuages
    gsap.to(cloud.position, {
      y: "+=1.5",
      repeat: -1,
      yoyo: true,
      duration: 6 + Math.random() * 2,
      ease: 'sine.inOut',
      delay: index * 0.5,
    });

    // Légère rotation des nuages
    gsap.to(cloud.rotation, {
      x: "+=0.5",
      y: "+=0.5",
      repeat: -1,
      duration: 20,
      ease: 'linear',
    });

    // Changement de la taille des nuages pour une déformation fluide
    gsap.to(cloud.scale, {
      x: "+=0.5",
      y: "+=0.5",
      z: "+=0.5",
      repeat: -1,
      yoyo: true,
      duration: 8 + Math.random() * 2,
      ease: 'sine.inOut',
    });
  });
}

animateClouds();

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
