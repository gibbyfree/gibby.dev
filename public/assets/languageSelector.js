! function() {
    function e() {
        return window.matchMedia(s).matches
    }

    function t() {
        o && o.classList.toggle("hidden", !e()), i && i.classList.toggle("hidden", e()), c && c.classList.toggle("hidden", !e())
    }
    var n = document.querySelector(".container"),
        i = document.querySelector(".menu"),
        o = document.querySelector(".menu-trigger"),
        d = (document.querySelector(".menu__inner--desktop"), document.querySelector(".menu__sub-inner-more-trigger")),
        c = document.querySelector(".menu__sub-inner-more"),
        s = getComputedStyle(document.body).getPropertyValue("--phoneWidth");
    i && i.addEventListener("click", function(e) {
        return e.stopPropagation()
    }), c && c.addEventListener("click", function(e) {
        return e.stopPropagation()
    }), t(), document.body.addEventListener("click", function() {
        e() || !c || c.classList.contains("hidden") ? e() && !i.classList.contains("hidden") && i.classList.add("hidden") : c.classList.add("hidden")
    }), window.addEventListener("resize", t), o && o.addEventListener("click", function(e) {
        e.stopPropagation(), i && i.classList.toggle("hidden")
    }), d && d.addEventListener("click", function(e) {
        e.stopPropagation(), c && c.classList.toggle("hidden"), c.getBoundingClientRect().right > n.getBoundingClientRect().right && (c.style.left = "auto", c.style.right = 0)
    })
}();