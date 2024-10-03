import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animation pour le header
gsap.from("#main-nav", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

// Animation pour les sections
gsap.utils.toArray(".section").forEach(section => {
    gsap.from(section, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: true
        }
    });
});

// Animation pour les éléments de la section "Services"
gsap.utils.toArray(".service-item").forEach(item => {
    gsap.from(item, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            scrub: true
        }
    });
});

// Animation pour les éléments de la section "Steps"
gsap.utils.toArray(".step-item").forEach(item => {
    gsap.from(item, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            scrub: true
        }
    });
});

// Animation pour les éléments de la section "Why"
gsap.utils.toArray(".why-item").forEach(item => {
    gsap.from(item, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            scrub: true
        }
    });
});