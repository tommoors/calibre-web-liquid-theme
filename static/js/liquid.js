/* Liquid — 3D tilt for book covers.
   static/js/liquid.js, loaded after jQuery, Bootstrap, main.js and standard.js.

   A cover follows the pointer: it tilts up to MAX_TILT degrees towards it,
   grows a little, a soft glare tracks the pointer, and on leave it eases back
   flat. The look lives in liquid.css (custom properties --lq-rx, --lq-ry,
   --lq-scale, --lq-gx, --lq-gy, --lq-glare); this file only sets the numbers.

   Off for touch and pen (no hover), and when the user asks for reduced motion.
   One delegated listener per page, so covers loaded later (infinite scroll,
   pop-ups) work too. No dependencies, nothing loaded from elsewhere. */
(function () {
    "use strict";

    if (!document.body || !document.body.classList.contains("liquid")) return;

    var MAX_TILT = 12;      // degrees
    var SCALE = 1.04;
    var COVER = ".book .cover span.img, .single .cover";

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    var active = null;      // the cover being tilted
    var frame = 0;
    var last = null;        // last pointer event

    function enabled() {
        return finePointer.matches && !reduce.matches;
    }

    function render() {
        frame = 0;
        if (!active || !last) return;
        var r = active.getBoundingClientRect();
        if (!r.width || !r.height) return;
        // -1 … 1 from the centre
        var px = Math.min(Math.max((last.clientX - r.left) / r.width, 0), 1);
        var py = Math.min(Math.max((last.clientY - r.top) / r.height, 0), 1);
        var nx = px * 2 - 1;
        var ny = py * 2 - 1;
        var s = active.style;
        s.setProperty("--lq-ry", (nx * MAX_TILT).toFixed(2) + "deg");
        s.setProperty("--lq-rx", (-ny * MAX_TILT).toFixed(2) + "deg");
        s.setProperty("--lq-scale", SCALE);
        s.setProperty("--lq-gx", (px * 100).toFixed(1) + "%");
        s.setProperty("--lq-gy", (py * 100).toFixed(1) + "%");
        s.setProperty("--lq-glare", "1");
    }

    function release(el) {
        if (!el) return;
        el.classList.remove("lq-tilting");
        var s = el.style;
        s.removeProperty("--lq-rx");
        s.removeProperty("--lq-ry");
        s.removeProperty("--lq-scale");
        s.removeProperty("--lq-glare");
    }

    document.addEventListener("pointermove", function (e) {
        if (!enabled() || e.pointerType !== "mouse") return;
        var el = e.target.closest ? e.target.closest(COVER) : null;
        if (el !== active) {
            release(active);
            active = el;
            if (active) active.classList.add("lq-tilting");
        }
        if (!active) return;
        last = e;
        if (!frame) frame = window.requestAnimationFrame(render);
    }, { passive: true });

    function leave() {
        release(active);
        active = null;
        last = null;
    }
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("blur", leave);
    reduce.addEventListener && reduce.addEventListener("change", leave);
})();
