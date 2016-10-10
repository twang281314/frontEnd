/*
 * The Typekit service used to deliver this font or fonts for use on websites
 * is provided by Adobe and is subject to these Terms of Use
 * http://www.adobe.com/products/eulas/tou_typekit. For font license
 * information, see the list below.
 *
 * myriad-pro:
 *   - http://typekit.com/eulas/00000000000000000001709e
 *   - http://typekit.com/eulas/00000000000000000001709f
 *   - http://typekit.com/eulas/00000000000000000001709b
 *   - http://typekit.com/eulas/00000000000000000001709a
 *
 * © 2009-2016 Adobe Systems Incorporated. All Rights Reserved.
 */
if (!window.Typekit) window.Typekit = {};
window.Typekit.config = { "a": "1689356", "c": [".tk-myriad-pro", "\"myriad-pro\",sans-serif"], "dl": "AAAAdAAAAAojpBuo2vUxf7hru0sABDeM", "f": "//use.typekit.net/c/a416cf/1w;myriad-pro,7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191,ftg:W:i4,ftl:W:i7,ftf:W:n4,ftk:W:n7/{format}{/extras*}", "fc": [{ "id": 6846, "family": "myriad-pro", "src": "{scheme}://{hostname}/af/f15dfe/00000000000000000001709e/27/{format}{?primer,subset_id,fvd}", "descriptors": { "weight": "700", "style": "normal", "primer": "7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191" } }, { "id": 6847, "family": "myriad-pro", "src": "{scheme}://{hostname}/af/292a4d/00000000000000000001709f/27/{format}{?primer,subset_id,fvd}", "descriptors": { "weight": "700", "style": "italic", "primer": "7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191" } }, { "id": 6848, "family": "myriad-pro", "src": "{scheme}://{hostname}/af/417df7/00000000000000000001709b/27/{format}{?primer,subset_id,fvd}", "descriptors": { "weight": "400", "style": "italic", "primer": "7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191" } }, { "id": 6851, "family": "myriad-pro", "src": "{scheme}://{hostname}/af/bd00ea/00000000000000000001709a/27/{format}{?primer,subset_id,fvd}", "descriptors": { "weight": "400", "style": "normal", "primer": "7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191" } }], "fi": [6846, 6847, 6848, 6851], "fn": ["myriad-pro", ["i4", "i7", "n4", "n7"]], "hn": "use.typekit.net", "ht": "tk", "js": "1.18.0", "kt": "tiv5pep", "l": "typekit", "p": "p.typekit.net", "ps": 1, "type": "configurable" };
/*{"k":"1.18.0","auto_updating":true,"last_published":"2016-06-29 15:42:50 UTC"}*/
;
(function(window, document, undefined) {
    if (!document.querySelector) { document.documentElement.className += " wf-inactive"; return; }

    function aa(a, b, c) { return a.call.apply(a.bind, arguments) }

    function ba(a, b, c) { if (!a) throw Error(); if (2 < arguments.length) { var d = Array.prototype.slice.call(arguments, 2); return function() { var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d); return a.apply(b, c) } } return function() { return a.apply(b, arguments) } }

    function h(a, b, c) { h = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba; return h.apply(null, arguments) }
    var k = Date.now || function() { return +new Date };

    function l(a, b, c, d) { this.b = null != a ? a : null;
        this.g = null != b ? b : null;
        this.m = null != c ? c : null;
        this.o = null != d ? d : null }
    var ca = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;

    function m(a, b) { return a.b > b.b || a.b === b.b && a.g > b.g || a.b === b.b && a.g === b.g && a.m > b.m ? 1 : a.b < b.b || a.b === b.b && a.g < b.g || a.b === b.b && a.g === b.g && a.m < b.m ? -1 : 0 }

    function p(a, b) { return -1 === m(a, b) }

    function q(a, b) { return !m(a, b) || 1 === m(a, b) }

    function da(a, b) { return !m(a, b) || -1 === m(a, b) }

    function r(a, b) { return !m(a, b) }
    l.prototype.toString = function() { return [this.b, this.g || "", this.m || "", this.o || ""].join("") };

    function t(a) { a = ca.exec(a); var b = null,
            c = null,
            d = null,
            e = null;
        a && (null !== a[1] && a[1] && (b = parseInt(a[1], 10)), null !== a[2] && a[2] && (c = parseInt(a[2], 10)), null !== a[3] && a[3] && (d = parseInt(a[3], 10)), null !== a[4] && a[4] && (/^[0-9]+$/.test(a[4]) ? e = parseInt(a[4], 10) : e = a[4])); return new l(b, c, d, e) };

    function ea(a) { return "Safari" === a.getName() && "AppleWebKit" === a.H || "Unknown" === a.getName() && "AppleWebKit" === a.H && ("iPhone" === a.v || "iPad" === a.v || "iPod" === a.v) }

    function fa(a) { return "Chrome" === a.getName() && q(a.C, new l(6)) && da(a.C, new l(35)) }

    function ga(a) { return "Chrome" === a.getName() && q(a.C, new l(36)) }

    function ha(a) { return "BuiltinBrowser" === a.getName() };

    function ia() { this.P = this.R = this.I = this.L = this.M = !0 };

    function ja(a) { this.g = a || "-" }
    ja.prototype.b = function(a) { for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase()); return b.join(this.g) };

    function ka() { var a = [{ name: "font-family", value: u.c[v + 1] }];
        this.g = [u.c[v]];
        this.b = a }

    function la(a) { for (var b = a.g.join(","), c = [], d = 0; d < a.b.length; d++) { var e = a.b[d];
            c.push(e.name + ":" + e.value + ";") } return b + "{" + c.join("") + "}" };

    function w(a, b) { return (a & 65535) * b + (((a >>> 16) * b & 65535) << 16) };

    function ma(a, b) { this.b = b || Array(Math.ceil(a / 32)); if (!b)
            for (var c = 0; c < this.b.length; c++) this.b[c] = 0 }
    ma.prototype.set = function(a) { if (Math.floor(a / 32 + 1) > this.b.length) throw Error("Index is out of bounds."); var b = Math.floor(a / 32);
        this.b[b] |= 1 << a - 32 * b };
    ma.prototype.has = function(a) { if (Math.floor(a / 32 + 1) > this.b.length) throw Error("Index is out of bounds."); var b = Math.floor(a / 32); return !!(this.b[b] & 1 << a - 32 * b) };

    function na(a, b, c) { this.b = a;
        this.m = b;
        this.g = new ma(a, c) }
    var oa = [2449897292, 4218179547, 2675077685, 1031960064, 1478620578, 1386343184, 3194259988, 2656050674, 3012733295, 2193273665];
    na.prototype.has = function(a) {
        if ("string" !== typeof a && "number" !== typeof a) throw Error("Value should be a string or number.");
        for (var b = "number" === typeof a, c = 0; c < this.m; c++) {
            var d;
            if (b) d = w(a & 4294967295, 3432918353), d = d << 15 | d >>> 17, d = w(d, 461845907), d ^= oa[c] || 0, d = d << 13 | d >>> 19, d = w(d, 5) + 3864292196, d ^= 4, d ^= d >>> 16, d = w(d, 2246822507), d ^= d >>> 13, d = w(d, 3266489909), d ^= d >>> 16, d = (d >>> 0) % this.b;
            else {
                d = oa[c] || 0;
                var e, f, g = a.length % 4,
                    n = a.length - g;
                for (f = 0; f < n; f += 4) e = (a.charCodeAt(f + 0) & 4294967295) << 0 | (a.charCodeAt(f + 1) &
                    4294967295) << 8 | (a.charCodeAt(f + 2) & 4294967295) << 16 | (a.charCodeAt(f + 3) & 4294967295) << 24, e = w(e, 3432918353), e = e << 15 | e >>> 17, e = w(e, 461845907), d ^= e, d = d << 13 | d >>> 19, d = w(d, 5) + 3864292196;
                e = 0;
                switch (g) {
                    case 3:
                        e ^= (a.charCodeAt(f + 2) & 4294967295) << 16;
                    case 2:
                        e ^= (a.charCodeAt(f + 1) & 4294967295) << 8;
                    case 1:
                        e ^= (a.charCodeAt(f + 0) & 4294967295) << 0, e = w(e, 3432918353), e = e << 15 | e >>> 17, e = w(e, 461845907), d ^= e }
                d ^= a.length;
                d = w(d ^ d >>> 16, 2246822507);
                d = w(d ^ d >>> 13, 3266489909);
                d = ((d ^ d >>> 16) >>> 0) % this.b
            }
            if (!this.g.has(d)) return !1
        }
        return !0
    };

    function pa(a) {
        if (window.atob) a = window.atob(a);
        else { a = a.replace(/=+$/, ""); if (1 == a.length % 4) throw Error("'atob' failed: The string to be decoded is not correctly encoded."); for (var b = 0, c, d, e = 0, f = ""; d = a.charAt(e++); ~d && (c = b % 4 ? 64 * c + d : d, b++ % 4) ? f += String.fromCharCode(255 & c >> (-2 * b & 6)) : 0) d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(d);
            a = f }
        c = [];
        for (b = 0; b < a.length; b += 4) c.push(a.charCodeAt(b) << 24 | a.charCodeAt(b + 1) << 16 | a.charCodeAt(b + 2) << 8 | a.charCodeAt(b + 3) << 0);
        a = c.shift();
        b =
            c.shift();
        this.b = new na(a, b, c)
    }
    pa.prototype.has = function(a) { if ("" === a) return !0; for (a = a.split("."); a.length;) { var b = a.join("."),
                c = "*." + b; if (this.b.has(b) || this.b.has(c) || this.b.has(encodeURIComponent(b)) || this.b.has(encodeURIComponent(c))) return !0;
            a.shift() } return !1 };

    function qa(a, b, c, d) { b = a.b.createElement(b); if (c)
            for (var e in c) c.hasOwnProperty(e) && ("style" == e ? b.style.cssText = c[e] : b.setAttribute(e, c[e]));
        d && b.appendChild(a.b.createTextNode(d)); return b }

    function ra(a, b, c) { a = a.b.getElementsByTagName(b)[0];
        a || (a = document.documentElement);
        a.insertBefore(c, a.lastChild) }

    function sa(a, b) { a.b.body ? b() : a.b.addEventListener ? a.b.addEventListener("DOMContentLoaded", b) : a.b.attachEvent("onreadystatechange", function() { "interactive" != a.b.readyState && "complete" != a.b.readyState || b() }) }

    function x(a) { a.parentNode && a.parentNode.removeChild(a) }

    function z(a, b, c) { b = b || [];
        c = c || []; for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) { for (var f = !1, g = 0; g < d.length; g += 1)
                if (b[e] === d[g]) { f = !0; break }
            f || d.push(b[e]) }
        b = []; for (e = 0; e < d.length; e += 1) { f = !1; for (g = 0; g < c.length; g += 1)
                if (d[e] === c[g]) { f = !0; break }
            f || b.push(d[e]) }
        a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "") }

    function ta(a, b) { for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
            if (c[d] == b) return !0;
        return !1 }

    function A(a, b) { var c = qa(a, "style");
        c.setAttribute("type", "text/css");
        c.styleSheet ? (ra(a, "head", c), c.styleSheet.cssText = b) : (c.appendChild(document.createTextNode(b)), ra(a, "head", c)) }

    function ua(a, b, c) { var d = a.b.getElementsByTagName("head")[0]; if (d) { var e = qa(a, "script", { src: b }),
                f = !1;
            e.onload = e.onreadystatechange = function() { f || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (f = !0, c && c(null), e.onload = e.onreadystatechange = null, "HEAD" == e.parentNode.tagName && d.removeChild(e)) };
            d.appendChild(e);
            setTimeout(function() { f || (f = !0, c && c(Error("Script load timeout"))) }, 5E3) } };

    function va(a, b, c) { this.g = a.g.document.documentElement;
        this.o = b;
        this.w = c;
        this.b = new ja("-");
        this.A = !1 !== b.events;
        this.m = !1 !== b.classes }

    function B(a) { if (a.m) { var b = ta(a.g, a.b.b("wf", "active")),
                c = [],
                d = [a.b.b("wf", "loading")];
            b || c.push(a.b.b("wf", "inactive"));
            z(a.g, c, d) }
        C(a, "inactive") }

    function C(a, b, c) { if (a.A && a.o[b]) try { if (c) a.o[b](c.b, D(c));
            else a.o[b]() } catch (d) { console.error('Typekit: Error in "' + b + '" callback', d) }
        if (a.w[b])
            if (c) a.w[b](c.b, D(c));
            else a.w[b]() };

    function wa(a, b, c) { c = c || {};
        this.b = a;
        this.g = b;
        this.weight = c.weight || "400";
        this.style = c.style || "normal";
        this.N = c.primer || void 0;
        this.O = c.subset_id || void 0 }

    function xa(a) { return ("tk-" + a.b).slice(0, 26) + "-" + D(a) }

    function E(a, b) { return new wa(b, a.g, { weight: a.weight, style: a.style, N: a.N, O: a.O }) }

    function D(a) { return a.style.charAt(0) + a.weight.charAt(0) };
    var F = { Y: "a", ca: "d", X: "i", Z: "j", W: "k", ba: "l", NONE: "x" };

    function ya(a) { this.b = a }

    function za(a, b) { return a.b.replace(/\{([^\{\}]+)\}/g, function(a, d) { if ("?" == d.charAt(0)) { for (var e = d.slice(1).split(","), f = [], g = 0; g < e.length; g++) b[e[g]] && f.push(e[g] + "=" + encodeURIComponent(b[e[g]])); return f.length ? "?" + f.join("&") : "" } return encodeURIComponent(b[d] || "") }) };

    function Aa() { this.b = [] }

    function Ba(a, b) { for (var c = 0; c < b.length; c++) a.b.push(b[c]) }

    function Ca(a, b) { for (var c = 0; c < a.b.length; c++) b(a.b[c], c, a) }

    function Da(a, b) {
        if ("i" === b) { var c = {},
                d = new Aa;
            Ca(a, function(a) { c[a.b] || (c[a.b] = {});
                c[a.b][a.weight] || (c[a.b][a.weight] = []);
                c[a.b][a.weight].push(a) }); for (var e in c) { for (var f = [400, 300, 200, 100, 500, 600, 700, 800, 900], g = 0; g < f.length; g++) { var n = f[g]; if (c[e][n]) { Ba(d, c[e][n]); break } }
                f = [700, 800, 900, 600, 500, 400, 300, 200, 100]; for (g = 0; g < f.length; g++) { var y = f[g]; if (c[e][y] && n !== y) { Ba(d, c[e][y]); break } } }
            Ca(a, function(a) { a = E(a, a.b.replace(/(-1|-2)$/, "").slice(0, 28) + "-" + D(a));
                d.b.push(a) }); return d }
        return "x" ===
            b ? new Aa : a
    }

    function Ea(a, b) { for (var c = [], d = 0; d < b.length; d++) { var e = b[d],
                f = za(new ya(a.g), { scheme: "https", hostname: "fonts.typekit.net", format: e, primer: a.N, subset_id: a.O, fvd: D(a), extension: Fa(e) }); "i" === e ? c.push("url(" + f + ")") : c.push("url(" + f + ') format("' + Ha(e) + '")') } return c.join(",") }

    function Ia(a, b, c) { if ("x" === b) return ""; var d = [];
        d.push("font-family:" + (c ? xa(a) : a.b));
        b = "k" === b ? Ea(a, ["l", "d", "j"]) : Ea(a, [b]);
        d.push("src:" + b);
        d.push("font-weight:" + a.weight);
        d.push("font-style:" + a.style); return "@font-face{" + d.join(";") + ";}" }

    function Ha(a) { switch (a) {
            case "d":
                return "woff";
            case "i":
                return "eot";
            case "l":
                return "woff2";
            default:
                return "opentype" } }

    function Fa(a) { switch (a) {
            case "d":
                return "woff";
            case "i":
                return "eot";
            case "l":
                return "woff2";
            default:
                return "otf" } }

    function Ja(a, b, c) { var d = [];
        Ca(a, function(a) { d.push(Ia(a, b, c)) }); return d.join("") };

    function Ka(a, b) { this.g = a;
        this.m = b;
        this.b = qa(this.g, "span", { "aria-hidden": "true" }, this.m) }

    function La(a) { ra(a.g, "body", a.b) }

    function Ma(a) { return "display:block !important;position:absolute !important;top:-9999px !important;left:-9999px !important;font-size:300px !important;width:auto !important;height:auto !important;line-height:normal !important;margin:0 !important;padding:0 !important;font-variant:normal !important;white-space:nowrap !important;font-family:" + a.b + " !important;font-weight:" + a.weight + " !important;font-style:" + a.style + " !important;" };

    function Na(a, b, c, d, e, f, g, n) {
        this.J = a;
        this.U = b;
        this.B = c;
        this.b = d;
        this.D = g || "BESbswy";
        this.g = {};
        this.V = e || 3E3;
        this.T = n;
        this.F = f || null;
        this.m = new Ka(this.B, this.D);
        this.o = new Ka(this.B, this.D);
        this.w = new Ka(this.B, this.D);
        this.A = new Ka(this.B, this.D);
        a = this.T ? xa(this.b) : this.b.b;
        this.m.b.style.cssText = Ma(E(this.b, a + ",serif"));
        this.o.b.style.cssText = Ma(E(this.b, a + ",sans-serif"));
        this.w.b.style.cssText = Ma(E(this.b, "serif"));
        this.A.b.style.cssText = Ma(E(this.b, "sans-serif"));
        La(this.m);
        La(this.o);
        La(this.w);
        La(this.A)
    }
    var Oa = { aa: "serif", $: "sans-serif" },
        Pa = null;

    function Qa() { if (null === Pa) { var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
            Pa = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10)) } return Pa }
    Na.prototype.start = function() { this.g.serif = this.w.b.offsetWidth;
        this.g["sans-serif"] = this.A.b.offsetWidth;
        this.S = k();
        Ra(this) };

    function Sa(a, b, c) { for (var d in Oa)
            if (Oa.hasOwnProperty(d) && b === a.g[Oa[d]] && c === a.g[Oa[d]]) return !0;
        return !1 }

    function Ra(a) { var b = a.m.b.offsetWidth,
            c = a.o.b.offsetWidth,
            d;
        (d = b === a.g.serif && c === a.g["sans-serif"]) || (d = Qa() && Sa(a, b, c));
        d ? k() - a.S >= a.V ? Qa() && Sa(a, b, c) && (!a.F || a.F.hasOwnProperty(a.b.b)) ? Ta(a, a.J) : Ta(a, a.U) : Ua(a) : Ta(a, a.J) }

    function Ua(a) { setTimeout(h(function() { Ra(this) }, a), 50) }

    function Ta(a, b) { setTimeout(h(function() { x(this.m.b);
            x(this.o.b);
            x(this.w.b);
            x(this.A.b);
            b(this.b) }, a), 0) };

    function Va(a, b, c, d, e, f, g) { this.m = a;
        this.B = b;
        this.b = d;
        this.w = c;
        this.g = e || 3E3;
        this.A = f || void 0;
        this.o = g }
    Va.prototype.start = function() { var a = this.w.g.document,
            b = this,
            c = k(),
            d = new Promise(function(d, e) {
                function n() { k() - c >= b.g ? e() : a.fonts.load(b.b.style + " " + b.b.weight + " 300px " + (b.o ? xa(b.b) : b.b.b), b.A).then(function(a) { 1 <= a.length ? d() : setTimeout(n, 25) }, function() { e() }) }
                n() }),
            e = new Promise(function(a, c) { setTimeout(c, b.g) });
        Promise.race([e, d]).then(function() { b.m(b.b) }, function() { b.B(b.b) }) };

    function Wa(a, b, c, d) { this.D = a;
        this.b = b;
        this.g = 0;
        this.A = this.w = !1;
        this.F = c;
        this.B = d }
    var Xa = null;

    function Ya(a, b, c) {
        var d = {},
            e = b.b.length;
        if (!e && c) B(a.b);
        else {
            a.g += e;
            c && (a.w = c);
            var f = [];
            Ca(b, function(b) {
                var c = a.b;
                c.m && z(c.g, [c.b.b("wf", b.b, D(b), "loading")]);
                C(c, "fontloading", b);
                c = null;
                if (null === Xa)
                    if (window.FontFace) { var e = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent);
                        Xa = e ? 42 < parseInt(e[1], 10) : !0 } else Xa = !1;
                Xa ? c = new Va(h(a.m, a), h(a.o, a), a.D, b, a.F, "BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006", a.B) : c = new Na(h(a.m, a), h(a.o, a), a.D, b, a.F, d, "BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006",
                    a.B);
                f.push(c)
            });
            for (b = 0; b < f.length; b++) f[b].start()
        }
    }
    Wa.prototype.m = function(a) { var b = this.b;
        b.m && z(b.g, [b.b.b("wf", a.b, D(a), "active")], [b.b.b("wf", a.b, D(a), "loading"), b.b.b("wf", a.b, D(a), "inactive")]);
        C(b, "fontactive", a);
        this.A = !0;
        Za(this) };
    Wa.prototype.o = function(a) { var b = this.b; if (b.m) { var c = ta(b.g, b.b.b("wf", a.b, D(a), "active")),
                d = [],
                e = [b.b.b("wf", a.b, D(a), "loading")];
            c || d.push(b.b.b("wf", a.b, D(a), "inactive"));
            z(b.g, d, e) }
        C(b, "fontinactive", a);
        Za(this) };

    function Za(a) {!--a.g && a.w && (a.A ? (a = a.b, a.m && z(a.g, [a.b.b("wf", "active")], [a.b.b("wf", "loading"), a.b.b("wf", "inactive")]), C(a, "active")) : B(a.b)) };

    function G(a) { return "Windows" === a.v }

    function $a(a) { return G(a) && q(a.u, new l(6, 1)) }

    function H(a) { return G(a) && r(a.u, new l(5, 1)) || G(a) && r(a.u, new l(5, 2)) || G(a) && r(a.u, new l(6, 0)) || $a(a) }

    function I(a) { return "Macintosh" === a.v && (q(a.u, new l(10, 4)) || null === a.u.b) }

    function ab(a, b) { return b.M && ("iPhone" === a.v || "iPod" === a.v) && q(a.u, new l(4, 2)) && p(a.u, new l(5)) }

    function bb(a, b) { return b.M && ("iPhone" === a.v || "iPod" === a.v) && q(a.u, new l(5)) }

    function cb(a, b) { return b.L && "iPad" === a.v && q(a.u, new l(4, 2)) && p(a.u, new l(5)) }

    function db(a, b) { return b.L && "iPad" === a.v && q(a.u, new l(5)) }

    function J(a, b) { return b.I && "Android" === a.v }

    function eb(a, b) { return J(a, b) && q(a.u, new l(2, 2)) && p(a.u, new l(3, 1)) }

    function fb(a, b) { return J(a, b) && q(a.u, new l(3, 1)) && p(a.u, new l(4, 1)) }

    function L(a) { return "Linux" === a.v || "Ubuntu" === a.v };
    var gb = {
        a: function(a, b) { return "Safari" === a.getName() && "AppleWebKit" === a.H && q(a.G, new l(525, 13)) && p(a.G, new l(534, 50)) && (H(a) || I(a)) || ha(a) && (eb(a, b) || J(a, b) && q(a.u, new l(4, 1))) || b.I && "Silk" === a.getName() && p(a.C, new l(2)) && (eb(a, b) || I) || b.I && "Silk" === a.getName() && q(a.C, new l(2)) && J(a, b) && q(a.u, new l(4, 1)) || ea(a) && (cb(a, b) || ab(a, b)) || fa(a) && (cb(a, b) || ab(a, b)) || ga(a) && (cb(a, b) || ab(a, b)) || "AdobeAIR" === a.getName() && q(a.C, new l(2, 5)) && (G(a) && null === a.u.b || L(a) || I(a)) },
        d: function(a, b) {
            return fa(a) && (H(a) ||
                    L(a) || I(a) || J(a, b) || "CrOS" === a.v || "CrKey" === a.v || db(a, b) || bb(a, b)) || ga(a) && (db(a, b) || bb(a, b)) || "Gecko" === a.H && 1 === m(a.G, new l(1, 9, 1)) && da(a.G, new l(38)) && (H(a) || L(a) || I(a) || J(a, b)) || "Safari" === a.getName() && "AppleWebKit" === a.H && q(a.G, new l(534, 50)) && (H(a) || I(a)) || ea(a) && (db(a, b) || bb(a, b)) || "Opera" === a.getName() && q(a.C, new l(11, 10)) && da(a.C, new l(22)) && (H(a) || L(a) || I(a) || J(a, b)) || "MSIE" === a.getName() && 9 <= a.K && ($a(a) || G(a) && r(a.u, new l(6, 0))) || "Edge" === a.getName() && $a(a) || "MSIE" === a.getName() && b.R &&
                "Windows Phone" === a.v && q(a.u, new l(8)) || ha(a) && (b.P && "BlackBerry" === a.v && q(a.u, new l(10)) || L(a))
        },
        j: function(a, b) { return ha(a) && fb(a, b) || b.I && "Silk" === a.getName() && q(a.C, new l(2)) && (fb(a, b) || L(a)) },
        i: function(a) { return "MSIE" === a.getName() && q(a.C, new l(6, 0)) && (void 0 === a.K || 9 > a.K) && H(a) },
        l: function(a, b) { return ga(a) && (H(a) || L(a) || I(a) || J(a, b) || "CrOS" === a.v || "CrKey" === a.v) || "Gecko" === a.H && q(a.G, new l(39)) && (H(a) || L(a) || I(a) || J(a, b)) || "Opera" === a.getName() && q(a.C, new l(23)) && (H(a) || L(a) || I(a) || J(a, b)) },
        x: function() { return !1 }
    };

    function hb(a) { this.b = a;
        this.g = "x";
        this.w = this.F = null;
        this.m = [];
        this.o = this.B = this.J = null;
        this.A = new Aa }
    hb.prototype.supportsConfiguredBrowser = function() { return "x" !== this.g };
    hb.prototype.init = function() { if (0 < this.m.length) { for (var a = [], b = 0; b < this.m.length; b++) a.push(la(this.m[b]));
            A(this.b, a.join("")) } };
    hb.prototype.load = function(a, b, c) {
        var d = this;
        c = c || {};
        a = c.timeout;
        var e = !!c.async,
            f = Da(this.A, this.g);
        c = new va(this.b, c, {
            active: function() {
                if (e) { var a = Ja(f, d.g, !1);
                    A(d.b, a) }
                if (d.D) {
                    var a = d.D,
                        b = d.b,
                        c = new ya("{scheme}://{hostname}/p.gif{?s,k,app,ht,h,f,a,js,_}"),
                        g = (window.__adobewebfontsappname__ || a.app || "").toString().substr(0, 20),
                        b = b.g.location.hostname || b.m.location.hostname,
                        n = [],
                        P = [];
                    window.Typekit ? (window.Typekit.fonts || (window.Typekit.fonts = []), P = window.Typekit.fonts) : window.TypekitPreview && (window.TypekitPreview.fonts ||
                        (window.TypekitPreview.fonts = []), P = window.TypekitPreview.fonts);
                    for (var Q = 0; Q < a.b.length; Q++) { for (var kb = !1, Ga = 0; Ga < P.length; Ga++)
                            if (a.b[Q] === P[Ga]) { kb = !0; break }
                        kb || (n.push(a.b[Q]), P.push(a.b[Q])) }
                    n.length && ib(za(c, { scheme: "https", hostname: a.A, s: a.o, k: a.w, app: g, ht: a.m, h: b, f: n.join("."), a: a.g, js: a.version, _: (+new Date).toString() }))
                }
            },
            inactive: function() { if (e) { var a = Ja(f, d.g, !1);
                    A(d.b, a) } }
        });
        if (this.o) {
            var g = location.hostname;
            if (!this.o.has(g)) {
                console.error('Typekit: the domain "' + g + '" isn\'t in the list of published domains for kit "' +
                    this.B + '".');
                B(c);
                return
            }
        }
        if (f.b.length) { g = Ja(f, this.g, e);
            A(this.b, g); var n = new Wa(this.b, c, a, e);
            sa(d.b, function() { Ya(n, f, b) }) } else B(c)
    };

    function jb(a, b) { this.o = a;
        this.g = b;
        this.b = [] }
    jb.prototype.m = function(a) { this.b.push(a) };
    jb.prototype.load = function(a, b) { var c = a,
            d = b || {}; "string" == typeof c ? c = [c] : c && c.length || (d = c || {}, c = []); if (c.length)
            for (var e = this, f = c.length, g = 0; g < c.length; g++) lb(this, c[g], function() {--f || mb(e, d) });
        else mb(this, d) };

    function lb(a, b, c) { b = za(a.o, { id: b });
        ua(a.g, b, c) }

    function mb(a, b) { if (a.b.length) { for (var c = new va(a.g, b, {}), d = !1, e = 0; e < a.b.length; e++) a.b[e].init(), d = d || a.b[e].supportsConfiguredBrowser(); if (d)
                for (c.m && z(c.g, [c.b.b("wf", "loading")]), C(c, "loading"), c = 0; c < a.b.length; c++) d = a.b[c], d.supportsConfiguredBrowser() && d.load(null, c == a.b.length - 1, b);
            else B(c);
            a.b = [] } };

    function ib(a) { var b = new Image(1, 1),
            c = !1;
        b.src = a;
        b.onload = function() { c = !0;
            b.onload = null };
        setTimeout(function() { c || (b.src = "about:blank", b.onload = null) }, 3E3) };

    function M(a, b, c, d, e, f, g) { this.b = a;
        this.C = b;
        this.H = c;
        this.G = d;
        this.v = e;
        this.u = f;
        this.K = g }
    M.prototype.getName = function() { return this.b };
    var nb = new M("Unknown", new l, "Unknown", new l, "Unknown", new l, void 0);

    function N(a) { var b = O(a.b, /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/, 1); if ("" !== b) return /BB\d{2}/.test(b) && (b = "BlackBerry"), b;
        a = O(a.b, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS|PlayStation|CrKey)/, 1); return "" !== a ? ("Mac_PowerPC" == a ? a = "Macintosh" : "PlayStation" == a && (a = "Linux"), a) : "Unknown" }

    function R(a) { var b = O(a.b, /(OS X|Windows NT|Android) ([^;)]+)/, 2); if (b || (b = O(a.b, /Windows Phone( OS)? ([^;)]+)/, 2)) || (b = O(a.b, /(iPhone )?OS ([\d_]+)/, 2))) return b; if (b = O(a.b, /(?:Linux|CrOS|CrKey) ([^;)]+)/, 1))
            for (var b = b.split(/\s/), c = 0; c < b.length; c += 1)
                if (/^[\d\._]+$/.test(b[c])) return b[c];
        return (a = O(a.b, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2)) ? a : "Unknown" }

    function ob() {
        var a = S,
            b = "Unknown",
            c = t(O(a.b, /Presto\/([\d\w\.]+)/, 1)),
            d = t(R(a)),
            e = T(a.g);
        null !== c.b ? b = "Presto" : (-1 != a.b.indexOf("Gecko") && (b = "Gecko"), c = t(O(a.b, /rv:([^\)]+)/, 1)));
        if (-1 != a.b.indexOf("Opera Mini/")) { var f = t(O(a.b, /Opera Mini\/([\d\.]+)/, 1)); return new M("OperaMini", f, b, c, N(a), d, e) }
        if (-1 != a.b.indexOf("Version/") && (f = t(O(a.b, /Version\/([\d\.]+)/, 1)), null !== f.b)) return new M("Opera", f, b, c, N(a), d, e);
        f = t(O(a.b, /Opera[\/ ]([\d\.]+)/, 1));
        return null !== f.b ? new M("Opera", f, b, c, N(a), d, e) : new M("Opera",
            new l, b, c, N(a), d, e)
    }

    function pb() {
        var a = S,
            b = N(a),
            c = t(R(a)),
            d = t(O(a.b, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1)),
            e = "Unknown",
            f;
        f = "Unknown";
        /OPR\/[\d.]+/.test(a.b) ? e = "Opera" : -1 != a.b.indexOf("Chrome") || -1 != a.b.indexOf("CrMo") || -1 != a.b.indexOf("CriOS") ? e = "Chrome" : /Silk\/\d/.test(a.b) ? e = "Silk" : "BlackBerry" == b || "Android" == b ? e = "BuiltinBrowser" : -1 != a.b.indexOf("PhantomJS") ? e = "PhantomJS" : -1 != a.b.indexOf("Safari") ? e = "Safari" : -1 != a.b.indexOf("AdobeAIR") ? e = "AdobeAIR" : -1 != a.b.indexOf("PlayStation") && (e = "BuiltinBrowser");
        "BuiltinBrowser" ==
        e ? f = "Unknown" : "Silk" == e ? f = O(a.b, /Silk\/([\d\._]+)/, 1) : "Chrome" == e ? f = O(a.b, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2) : -1 != a.b.indexOf("Version/") ? f = O(a.b, /Version\/([\d\.\w]+)/, 1) : "AdobeAIR" == e ? f = O(a.b, /AdobeAIR\/([\d\.]+)/, 1) : "Opera" == e ? f = O(a.b, /OPR\/([\d.]+)/, 1) : "PhantomJS" == e && (f = O(a.b, /PhantomJS\/([\d.]+)/, 1));
        f = t(f);
        return new M(e, f, "AppleWebKit", d, b, c, T(a.g))
    }

    function O(a, b, c) { return (a = a.match(b)) && a[c] ? a[c] : "" }

    function T(a) { if (a.documentMode) return a.documentMode };
    var qb, S = new function() { var a = document;
            this.b = navigator.userAgent;
            this.g = a },
        rb;
    if (-1 != S.b.indexOf("MSIE") || -1 != S.b.indexOf("Trident/")) { var U = S,
            sb = N(U),
            tb = t(R(U)),
            ub, vb, wb, xb = O(U.b, /Trident\/([\d\w\.]+)/, 1),
            yb = T(U.g);
        ub = -1 != U.b.indexOf("MSIE") ? t(O(U.b, /MSIE ([\d\w\.]+)/, 1)) : t(O(U.b, /rv:([\d\w\.]+)/, 1)); "" !== xb ? (vb = "Trident", wb = t(xb)) : (vb = "Unknown", wb = new l);
        rb = new M("MSIE", ub, vb, wb, sb, tb, yb) } else {
        var zb;
        if (-1 != S.b.indexOf("Edge/")) { var Ab = S,
                Bb = N(Ab),
                Cb = t(R(Ab)),
                Db = t(O(Ab.b, /Edge\/([\d\w\.]+)/, 1));
            zb = new M("Edge", Db, "Edge", Db, Bb, Cb, T(Ab.g)) } else {
            var Eb;
            if (-1 != S.b.indexOf("Opera")) Eb =
                ob();
            else { var Fb; if (/OPR\/[\d.]+/.test(S.b)) Fb = pb();
                else { var Gb; if (/AppleWeb(K|k)it/.test(S.b)) Gb = pb();
                    else { var Hb; if (-1 != S.b.indexOf("Gecko")) { var V = S,
                                Ib = "Unknown",
                                Jb = new l,
                                Kb = t(R(V)); - 1 != V.b.indexOf("Firefox") ? (Ib = "Firefox", Jb = t(O(V.b, /Firefox\/([\d\w\.]+)/, 1))) : -1 != V.b.indexOf("Mozilla") && (Ib = "Mozilla"); var Lb = t(O(V.b, /rv:([^\)]+)/, 1));
                            Hb = new M(Ib, Jb, "Gecko", Lb, N(V), Kb, T(V.g)) } else Hb = nb;
                        Gb = Hb }
                    Fb = Gb }
                Eb = Fb }
            zb = Eb
        }
        rb = zb
    }
    qb = rb;
    var Mb = new function() { var a = window;
        this.g = this.m = a;
        this.b = this.g.document };
    window.Typekit || (window.Typekit = {});
    if (!window.Typekit.load) { var Nb = new jb(new ya("//" + (window.Typekit.config || {}).hn + "/{id}.js"), Mb);
        window.Typekit.load = function() { Nb.load.apply(Nb, arguments) };
        window.Typekit.addKit = function() { Nb.m.apply(Nb, arguments) } }
    var W, X, u = window.Typekit.config || {};
    X = new hb(Mb);
    X.D = new function() { var a = u.ps,
            b = u.ht,
            c = u.fi,
            d = u.a,
            e = u.kt,
            f = u.js,
            g = u.l;
        this.A = u.p;
        this.o = a;
        this.m = b;
        this.b = c || [];
        this.g = d || null;
        this.w = e || null;
        this.version = f || null;
        this.app = g || null };
    W = new ia;
    W.M = !u.si;
    W.L = !u.st;
    W.I = !u.sa;
    W.R = !u.sw;
    W.P = !u.sb;
    X.w = W;
    if (u.fc)
        for (var Ob = u.fc, Y = 0; Y < Ob.length; Y++) X.A.b.push(new wa(Ob[Y].family, Ob[Y].src, Ob[Y].descriptors));
    if (u.dl) { var Pb = u.dl; try { X.o = new pa(Pb) } catch (a) {} }
    u.kt && (X.B = u.kt);
    u.hn && (X.J = u.hn);
    if (u.c)
        for (var v = 0; v < u.c.length; v += 2) X.m.push(new ka);
    X.F = qb;
    var Qb;
    a: { var Rb = X.F,
            Sb = new ia,
            Tb = X.w || Sb,
            Ub; for (Ub in F) { var Z = F[Ub]; if (gb[Z] && gb[Z](Rb, Tb)) { Qb = Z; break a } } for (Ub in F)
            if (Z = F[Ub], gb[Z] && gb[Z](Rb, Sb)) { Qb = "x"; break a }
        Qb = "k" }
    X.g = Qb;
    window.Typekit.addKit(X);
    if (1 === Math.round(30 * Math.random())) {
        var Vb = window.Typekit.load,
            Wb = [];
        window.Typekit.load = function(a) {
            a = a || {};
            var b = a.active || function() {},
                c = a.fontactive || function() {},
                d = (new Date).getTime();
            a.active = function() {
                b();
                var a = JSON.stringify({ fonts: Wb, augmentations: [], font_loading: window.FontFace ? "native" : "non-native", active_duration: (new Date).getTime() - d, javascript_version: u.js, kit_type: "configurable" });
                if (!window.XDomainRequest) {
                    var c = new XMLHttpRequest;
                    c.open("POST", "https://performance.typekit.net/");
                    c.send(a)
                }
            };
            a.fontactive = function(a, b) { var g, n;
                c(a, b);
                a: { g = b.charAt(0);n = b.charAt(1);g = "i" === g ? "italic" : "o" === g ? "oblique" : "normal"; /[1-9]/.test(n) || (n = 4);n += "00"; for (var y = u.fc, K = 0; K < y.length; K++)
                        if (y[K].family === a && y[K].descriptors.weight === n && y[K].descriptors.style === g) { g = y[K].id; break a }
                    g = 0 }
                Wb.push({ id: g, duration: (new Date).getTime() - d, dynamic: !1 }) };
            Vb(a)
        }
    }
    if (window.WebFont) try { window.Typekit.load() } catch (a) {};
}(this, document));