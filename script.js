// CURSOR

const dot = document.getElementById("curDot");
const ring = document.getElementById("curRing");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {

    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();

// LOADER

window.addEventListener("load", () => {

    const tl = gsap.timeline({
        onComplete: () => {
            document.getElementById("loader").style.display = "none";
        }
    });

    tl.to("#ldBar", {
        width: "100%",
        duration: 1.4
    })

    .to("#loader", {
        y: "-100%",
        duration: 1
    });

});

// SCROLL PROGRESS

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

    document.getElementById("spBar").style.width =
        (scrollTop / height) * 100 + "%";

});
