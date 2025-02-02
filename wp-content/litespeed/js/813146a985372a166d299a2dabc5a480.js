function animateCircle({
    percentage: e = 100,
    onScroll: t = !1,
    speed: i = 1,
    element: n,
    size: o = 50,
    backgroundClr: r = "white",
    color: l = "blue",
    strokeWidth: a = 5
}) {
    let c = Math.ceil(document.body.scrollHeight - window.innerHeight);
    if (!n) return void console.error("Invalid element:", n);
    let d = n,
        h = d.getContext("2d"),
        s = 2 * o + a,
        g = s,
        m = s / 2,
        u = g / 2;
    d.width = s, d.height = g;
    let k = () => {
        let n = t ? Math.floor(window.pageYOffset / c * 100) : e > 100 ? 100 : e + i;
        h.clearRect(0, 0, s, g), h.beginPath(), h.lineWidth = a, h.arc(m, u, o, 0, 2 * Math.PI), h.strokeStyle = r, h.stroke(), (e => {
            h.beginPath(), h.lineWidth = a, h.strokeStyle = l, h.arc(m, u, o, 0, 2 * Math.PI * e / 100), h.stroke()
        })(n), (!t || n < e) && requestAnimationFrame(k)
    };
    t ? document.addEventListener("scroll", k) : k()
};