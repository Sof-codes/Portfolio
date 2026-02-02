// 1. LENIS SMOOTH SCROLL
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. CINEMATIC LOADER
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.to(".load-word", {
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power4.out"
    })
    .to(".loader-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    }, "-=0.2")
    .to(".load-word", {
        y: "-110%",
        stagger: 0.1,
        duration: 0.5,
        ease: "power4.in"
    })
    .to(".loader-container", {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut"
    });
});

// 3. CURSOR LOGIC
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('.mag');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
});

// Magnetic Elements
links.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) * 0.5;
        const y = (e.clientY - top - height / 2) * 0.5;
        gsap.to(el, { x, y, duration: 0.3 });
        gsap.to(follower, { scale: 1.5, borderColor: '#C40233', duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.3 });
        gsap.to(follower, { scale: 1, borderColor: '#C40233', duration: 0.3 });
    });
});

// 4. SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress-bar').style.width = scrolled + "%";
});

// 5. PROJECT HOVER REVEAL
const workItems = document.querySelectorAll('.work-item');
const hoverImgContainer = document.getElementById('hover-image-container');

workItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const imgSrc = item.getAttribute('data-img');
        hoverImgContainer.innerHTML = `<img src="${imgSrc}" alt="Project Preview">`;
        gsap.to(hoverImgContainer, { opacity: 1, scale: 1, duration: 0.3 });
    });

    item.addEventListener('mousemove', (e) => {
        gsap.to(hoverImgContainer, {
            x: e.clientX + 20,
            y: e.clientY - 250,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(hoverImgContainer, { opacity: 0, scale: 0.8, duration: 0.3 });
    });
});

// 6. TOGGLES (Education & Achievements)
function toggleEdu(element) {
    const items = document.querySelectorAll('.edu-item');
    items.forEach(item => {
        if (item !== element) item.classList.remove('active');
    });
    element.classList.toggle('active');
}

function toggleAcc(element) {
    element.classList.toggle('active');
    const icon = element.querySelector('.acc-icon');
    if(element.classList.contains('active')) {
        gsap.to(icon, { rotation: 180, duration: 0.3 });
    } else {
        gsap.to(icon, { rotation: 0, duration: 0.3 });
    }
}

// 7. SCROLL REVEAL (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 8. LIVE CLOCK
setInterval(() => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    document.getElementById("clock").innerText = time;
}, 1000);

// Globalize for HTML inline calls
window.toggleEdu = toggleEdu;
window.toggleAcc = toggleAcc;