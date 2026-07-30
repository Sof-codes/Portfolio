/* ═══════════════════════════════════════════════
   DIKSHA BHALERAO — PORTFOLIO
   script.js
═══════════════════════════════════════════════ */

/* ── 1. CURSOR ─────────────────────────────────
   Using the normal system cursor (styled glossy via CSS) —
   no JS tracking needed. */

/* ── 2. CINEMATIC LOADER ─────────────────────── */
/* Safety net: if GSAP fails to load (CDN blocked, offline, ad blocker,
   slow network) the loader must never stay stuck on screen forever. */
function hideLoaderInstantly() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    ['heroEye', 'heroDesc', 'heroScroll'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
    });
    ['hn1', 'hn2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.transform = 'translateY(0%)';
    });
}

// Hard timeout — if the GSAP loader animation hasn't finished within 4s
// of window load for ANY reason, force the page to reveal itself.
window.addEventListener('load', () => {
    setTimeout(hideLoaderInstantly, 4000);
});

if (typeof gsap === 'undefined') {
    // GSAP didn't load at all — skip animation entirely, reveal now.
    window.addEventListener('DOMContentLoaded', hideLoaderInstantly);
} else {
window.addEventListener('load', () => {
    const tl = gsap.timeline({
        onComplete: () => {
            document.getElementById('loader').style.display = 'none';
            playHeroEntrance();
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
        }, '-=0.4')
        .to('#ldSub', {
            opacity: 1,
            duration: 0.5
        }, '-=0.2')
        .to('#ldBar', {
            width: '100%',
            duration: 1.2,
            ease: 'power2.inOut'
        }, '-=0.3')
        .to(['#ld1', '#ld2'], {
            y: '-110%',
            stagger: 0.08,
            duration: 0.5,
            ease: 'power4.in'
        }, '+=0.15')
        .to('#loader', {
            y: '-100%',
            duration: 0.9,
            ease: 'power4.inOut'
        });
});
}


/* ── 3. HERO ENTRANCE ────────────────────────── */
function playHeroEntrance() {
    gsap.to('#heroEye', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out'
    });
    gsap.to(['#hn1', '#hn2'], {
        y: '0%',
        stagger: 0.15,
        duration: 1.1,
        delay: 0.2,
        ease: 'power4.out'
    });
    gsap.to('#heroDesc', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.55,
        ease: 'power3.out'
    });
    gsap.to('#heroScroll', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.75,
        ease: 'power3.out'
    });
}


/* ── 4. SCROLL PROGRESS BAR ──────────────────── */
window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrolled / maxScroll) * 100;
    document.getElementById('spBar').style.width = pct + '%';
});


/* ── 5. SCROLL REVEAL ────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── 6. SMOOTH NAV SCROLL ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


/* ── 7. LIVE CLOCK ───────────────────────────── */
function updateClock() {
    document.getElementById('clock').textContent =
        new Date().toLocaleTimeString('en-GB', { hour12: false });
}
updateClock();
setInterval(updateClock, 1000);


/* ── 8. SKILL PILL HOVER RIPPLE ─────────────── */
document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('mouseenter', function () {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    pill.addEventListener('mouseleave', function () {
        gsap.to(this, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});


/* ── 9. PROJECT ITEM PARALLAX TEXT ──────────── */
document.querySelectorAll('.proj-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        gsap.to(this.querySelector('.proj-name'), {
            x: 12,
            duration: 0.4,
            ease: 'power3.out'
        });
    });
    item.addEventListener('mouseleave', function () {
        gsap.to(this.querySelector('.proj-name'), {
            x: 0,
            duration: 0.4,
            ease: 'power3.out'
        });
    });
});


/* ── 10. STAT BOX COUNTER ANIMATION ─────────── */
function animateCounter(el, target, suffix, isFloat) {
    const start    = 0;
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = isFloat
            ? (start + (target - start) * eased).toFixed(2)
            : Math.round(start + (target - start) * eased);
        el.textContent = value + (suffix || '');
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const raw = el.textContent.trim();
            if (raw === '9.21') animateCounter(el, 9.21, '', true);
            if (raw === '12+')  animateCounter(el, 12, '+', false);
            if (raw === '5')    animateCounter(el, 5, '', false);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));
