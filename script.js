/* ═══════════════════════════════════════════════
   DIKSHA BHALERAO — PORTFOLIO
   script.js (patched — runtime-safety fixes)
═══════════════════════════════════════════════ */

/* Utility: safe element getter */
const $id = (id) => document.getElementById(id);

/* ── 1. CURSOR ─────────────────────────────────
   Using the normal system cursor (styled glossy via CSS) —
   no JS tracking needed. */

/* ── 2. CINEMATIC LOADER ─────────────────────── */
/* Safety net: if GSAP fails to load (CDN blocked, offline, ad blocker,
   slow network) the loader must never stay stuck on screen forever. */
function hideLoaderInstantly() {
    const loader = $id('loader');
    if (loader) loader.style.display = 'none';
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    ['heroEye', 'heroDesc', 'heroScroll'].forEach(id => {
        const el = $id(id);
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
    });
    ['hn1', 'hn2'].forEach(id => {
        const el = $id(id);
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
                const loaderEl = $id('loader');
                if (loaderEl) loaderEl.style.display = 'none';
                // playHeroEntrance exists below; call if defined and gsap available
                if (typeof playHeroEntrance === 'function') {
                    try { playHeroEntrance(); } catch (e) { /* swallow to avoid breaking page */ }
                }
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
    if (typeof gsap === 'undefined') {
        // Fallback: reveal elements without animation
        const heroEye = $id('heroEye'); if (heroEye) { heroEye.style.opacity = '1'; heroEye.style.transform = 'none'; }
        ['hn1','hn2'].forEach(id => { const el = $id(id); if (el) el.style.transform = 'translateY(0%)'; });
        const desc = $id('heroDesc'); if (desc) { desc.style.opacity = '1'; desc.style.transform = 'none'; }
        const scroll = $id('heroScroll'); if (scroll) { scroll.style.opacity = '1'; scroll.style.transform = 'none'; }
        return;
    }

    try {
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
    } catch (e) {
        // If animation fails for any reason, reveal immediately
        const show = (id) => { const el = $id(id); if (el) { el.style.opacity = '1'; el.style.transform = 'none'; } };
        ['heroEye','heroDesc','heroScroll','hn1','hn2'].forEach(show);
    }
}


/* ── 4. SCROLL PROGRESS BAR ──────────────────── */
window.addEventListener('scroll', () => {
    const spBar = $id('spBar');
    if (!spBar) return;
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    const maxScroll = Math.max((document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight, 0);
    const pct = maxScroll === 0 ? 0 : (scrolled / maxScroll) * 100;
    spBar.style.width = pct + '%';
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
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


/* ── 7. LIVE CLOCK ───────────────────────────── */
function updateClock() {
    const clockEl = $id('clock');
    if (!clockEl) return;
    clockEl.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
}
updateClock();
setInterval(updateClock, 1000);


/* ── 8. SKILL PILL HOVER RIPPLE ─────────────── */
document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('mouseenter', function () {
        if (typeof gsap !== 'undefined') {
            gsap.to(this, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
        } else {
            this.style.transition = 'transform 0.2s ease';
            this.style.transform = 'scale(1.05)';
        }
    });
    pill.addEventListener('mouseleave', function () {
        if (typeof gsap !== 'undefined') {
            gsap.to(this, { scale: 1, duration: 0.2, ease: 'power2.out' });
        } else {
            this.style.transform = 'scale(1)';
        }
    });
});


/* ── 9. PROJECT ITEM PARALLAX TEXT ──────────── */
document.querySelectorAll('.proj-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        const target = this.querySelector('.proj-name');
        if (!target) return;
        if (typeof gsap !== 'undefined') {
            gsap.to(target, { x: 12, duration: 0.4, ease: 'power3.out' });
        } else {
            target.style.transition = 'transform 0.4s ease';
            target.style.transform = 'translateX(12px)';
        }
    });
    item.addEventListener('mouseleave', function () {
        const target = this.querySelector('.proj-name');
        if (!target) return;
        if (typeof gsap !== 'undefined') {
            gsap.to(target, { x: 0, duration: 0.4, ease: 'power3.out' });
        } else {
            target.style.transform = 'translateX(0)';
        }
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
        if (el) el.textContent = value + (suffix || '');
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const raw = el.textContent ? el.textContent.trim() : '';
            if (raw === '9.21') animateCounter(el, 9.21, '', true);
            if (raw === '12+')  animateCounter(el, 12, '+', false);
            if (raw === '5')    animateCounter(el, 5, '', false);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));
