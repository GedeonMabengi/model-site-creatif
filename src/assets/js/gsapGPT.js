// Assurez-vous d'avoir importé GSAP dans votre projet
import gsap from 'gsap';

// Sélectionnez chaque caractère du titre
const titleChars = document.querySelectorAll('.title span');

// Appliquez une rotation aléatoire à chaque caractère
titleChars.forEach(char => {
  gsap.to(char, {
    rotation: gsap.utils.random(-360, 360),
    duration: gsap.utils.random(1, 3),
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });
});
