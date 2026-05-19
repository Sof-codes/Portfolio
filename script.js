// CURSOR
const dot = document.getElementById('curDot');
const ring = document.getElementById('curRing');

let mx = 0;
let my = 0;

let rx = 0;
let ry = 0;

window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
});

(function animateCursor() {

    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';

    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';

    requestAnimationFrame(animateCursor);

})();

// LOADER
window.addEventListener('load', () => {

    const tl = gsap.timeline({
        onComplete: () => {

            document.getElementById('loader').style.display = 'none';

            gsap.to('#heroEye', {
                opacity: 1,
                y: 0,
                duration: 0.8
            });

            gsap.to(['#hn1', '#hn2'], {
                y: '0%',
                stagger: 0.15,
                duration: 1,
                ease: 'power4.out'
            });

            gsap.to('#heroDesc', {
                opacity: 1,
                y: 0,
                duration: 0.8
            });

            gsap.to('#heroScroll', {
                opacity: 1,
                y: 0,
                duration: 0.8
            });

        }
    });

    tl.to('#ld1', {
        y: '0%',
        duration: 0.7,
        ease: 'power4.out'
    })

    .to('#ld2', {
        y: '0%',
        duration: 0.7,
        ease: 'power4.out'
    }, '-=.4')

    .to('#ldSub', {
        opacity: 1,
        duration: 0.5
    }, '-=.2')

    .to('#ldBar', {
        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut'
    }, '-=.3')

    .to(['#ld1', '#ld2'], {
        y: '-110%',
        stagger: 0.08,
        duration: 0.5,
        ease: 'power4.in'
    }, '+=.1')

    .to('#loader', {
        y: '-100%',
        duration: 0.9,
        ease: 'power4.inOut'
    });

});

// SCROLL PROGRESS
window.addEventListener('scroll', () => {

    const s = document.documentElement.scrollTop;

    const h =
        document.documentElement.scrollHeight -
        window.innerHeight;

    document.getElementById('spBar').style.width =
        (s / h * 100) + '%';

});

// REVEAL
const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }

    });

}, {
    threshold: 0.1
});

document
    .querySelectorAll('.reveal')
    .forEach((el) => observer.observe(el));

// CLOCK
setInterval(() => {

    document.getElementById('clock').textContent =
        new Date().toLocaleTimeString('en-GB', {
            hour12: false
        });

}, 1000);
