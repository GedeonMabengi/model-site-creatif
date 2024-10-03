import * as THREE from 'three';

// Créer la scène, la caméra et le renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Créer un plan qui couvrira tout l'écran
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uColor: { value: new THREE.Color(0x6A0DAD) } // Violet de base
  },
  vertexShader: `...`, // Vous pouvez utiliser un shader simple ici
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uColor;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      uv.y += sin(uv.x * 10.0 + uTime * 5.0) * 0.1;
      vec3 color = uColor * (0.5 + 0.5 * sin(uTime * 2.0));
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  side: THREE.DoubleSide
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Positionner la caméra
camera.position.z = 1;

// Fonction d'animation
function animate(time) {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value = time * 0.001; // Mise à jour du temps
  renderer.render(scene, camera);
}

animate();
