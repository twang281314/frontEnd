(function() {
	var z = function() {
		(function(j, l) {
			function q(a, b, d) {
				if (d === l && a.nodeType === 1)
					if (d = "data-" + b.replace(db, "$1-$2").toLowerCase(), d = a.getAttribute(d), typeof d === "string") {
						try {
							d = d === "true" ? true : d === "false" ? false : d === "null" ? null : !c.isNaN(d) ? parseFloat(d) : eb.test(d) ? c.parseJSON(d) : d
						} catch (e) {}
						c.data(a, b, d)
					} else d = l;
				return d
			}

			function r(a) {
				for (var b in a)
					if (b !== "toJSON") return false;
				return true
			}

			function u(a, b, d) {
				var e = b + "defer",
					f = b + "queue",
					g = b + "mark",
					h = c.data(a, e, l, true);
				h && (d === "queue" || !c.data(a,
					f, l, true)) && (d === "mark" || !c.data(a, g, l, true)) && setTimeout(function() {
					!c.data(a, f, l, true) && !c.data(a, g, l, true) && (c.removeData(a, e, true), h.resolve())
				}, 0)
			}

			function w() {
				return false
			}

			function D() {
				return true
			}

			function z(a, b, d) {
				var e = c.extend({}, d[0]);
				e.type = a;
				e.originalEvent = {};
				e.liveFired = l;
				c.event.handle.call(b, e);
				e.isDefaultPrevented() && d[0].preventDefault()
			}

			function ea(a) {
				var b, d, e, f, g, h, k, o, p, l, j, m = [];
				f = [];
				g = c._data(this, "events");
				if (!(a.liveFired === this || !g || !g.live || a.target.disabled || a.button &&
					a.type === "click")) {
					a.namespace && (j = RegExp("(^|\\.)" + a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)"));
					a.liveFired = this;
					var s = g.live.slice(0);
					for (k = 0; k < s.length; k++) g = s[k], g.origType.replace(fa, "") === a.type ? f.push(g.selector) : s.splice(k--, 1);
					f = c(a.target).closest(f, a.currentTarget);
					for (o = 0, p = f.length; o < p; o++) {
						l = f[o];
						for (k = 0; k < s.length; k++)
							if (g = s[k], l.selector === g.selector && (!j || j.test(g.namespace)) && !l.elem.disabled) {
								h = l.elem;
								e = null;
								if (g.preType === "mouseenter" || g.preType === "mouseleave") a.type =
									g.preType, (e = c(a.relatedTarget).closest(g.selector)[0]) && c.contains(h, e) && (e = h);
								(!e || e !== h) && m.push({
									elem: h,
									handleObj: g,
									level: l.level
								})
							}
					}
					for (o = 0, p = m.length; o < p; o++) {
						f = m[o];
						if (d && f.level > d) break;
						a.currentTarget = f.elem;
						a.data = f.handleObj.data;
						a.handleObj = f.handleObj;
						j = f.handleObj.origHandler.apply(f.elem, arguments);
						if (j === false || a.isPropagationStopped())
							if (d = f.level, j === false && (b = false), a.isImmediatePropagationStopped()) break
					}
					return b
				}
			}

			function X(a, b) {
				return (a && a !== "*" ? a + "." : "") + b.replace(fb, "`").replace(gb,
					"&")
			}

			function N(a, b, d) {
				b = b || 0;
				if (c.isFunction(b)) return c.grep(a, function(a, c) {
					return !!b.call(a, c, a) === d
				});
				else if (b.nodeType) return c.grep(a, function(a) {
					return a === b === d
				});
				else if (typeof b === "string") {
					var e = c.grep(a, function(a) {
						return a.nodeType === 1
					});
					if (hb.test(b)) return c.filter(b, e, !d);
					else b = c.filter(b, e)
				}
				return c.grep(a, function(a) {
					return c.inArray(a, b) >= 0 === d
				})
			}

			function ua(a, b) {
				if (b.nodeType === 1 && c.hasData(a)) {
					var d = c.expando,
						e = c.data(a),
						f = c.data(b, e);
					if (e = e[d]) {
						var g = e.events,
							f = f[d] = c.extend({},
								e);
						if (g) {
							delete f.handle;
							f.events = {};
							for (var h in g) {
								d = 0;
								for (e = g[h].length; d < e; d++) c.event.add(b, h + (g[h][d].namespace ? "." : "") + g[h][d].namespace, g[h][d], g[h][d].data)
							}
						}
					}
				}
			}

			function va(a, b) {
				var d;
				if (b.nodeType === 1) {
					b.clearAttributes && b.clearAttributes();
					b.mergeAttributes && b.mergeAttributes(a);
					d = b.nodeName.toLowerCase();
					if (d === "object") b.outerHTML = a.outerHTML;
					else if (d === "input" && (a.type === "checkbox" || a.type === "radio")) {
						if (a.checked) b.defaultChecked = b.checked = a.checked;
						if (b.value !== a.value) b.value = a.value
					} else if (d ===
						"option") b.selected = a.defaultSelected;
					else if (d === "input" || d === "textarea") b.defaultValue = a.defaultValue;
					b.removeAttribute(c.expando)
				}
			}

			function Y(a) {
				return "getElementsByTagName" in a ? a.getElementsByTagName("*") : "querySelectorAll" in a ? a.querySelectorAll("*") : []
			}

			function wa(a) {
				if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
			}

			function xa(a) {
				c.nodeName(a, "input") ? wa(a) : "getElementsByTagName" in a && c.grep(a.getElementsByTagName("input"), wa)
			}

			function ta(a, b) {
				b.src ? c.ajax({
					url: b.src,
					async: false,
					dataType: "script"
				}) : c.globalEval((b.text || b.textContent || b.innerHTML || "").replace(ib, "/*$0*/"));
				b.parentNode && b.parentNode.removeChild(b)
			}

			function ya(a, b, d) {
				var e = b === "width" ? a.offsetWidth : a.offsetHeight,
					f = b === "width" ? jb : kb;
				if (e > 0) return d !== "border" && c.each(f, function() {
					d || (e -= parseFloat(c.css(a, "padding" + this)) || 0);
					d === "margin" ? e += parseFloat(c.css(a, d + this)) || 0 : e -= parseFloat(c.css(a, "border" + this + "Width")) || 0
				}), e + "px";
				e = I(a, b, b);
				if (e < 0 || e == null) e = a.style[b] || 0;
				e = parseFloat(e) || 0;
				d && c.each(f, function() {
					e +=
						parseFloat(c.css(a, "padding" + this)) || 0;
					d !== "padding" && (e += parseFloat(c.css(a, "border" + this + "Width")) || 0);
					d === "margin" && (e += parseFloat(c.css(a, d + this)) || 0)
				});
				return e + "px"
			}

			function za(a) {
				return function(b, d) {
					var o;
					typeof b !== "string" && (d = b, b = "*");
					if (c.isFunction(d))
						for (var e = b.toLowerCase().split(Aa), f = 0, g = e.length, h, k; f < g; f++) h = e[f], (k = /^\+/.test(h)) && (h = h.substr(1) || "*"), o = a[h] = a[h] || [], h = o, h[k ? "unshift" : "push"](d)
				}
			}

			function Z(a, b, c, e, f, g) {
				f = f || b.dataTypes[0];
				g = g || {};
				g[f] = true;
				for (var f = a[f], h = 0,
						k = f ? f.length : 0, o = a === ga, p; h < k && (o || !p); h++) p = f[h](b, c, e), typeof p === "string" && (!o || g[p] ? p = l : (b.dataTypes.unshift(p), p = Z(a, b, c, e, p, g)));
				if ((o || !p) && !g["*"]) p = Z(a, b, c, e, "*", g);
				return p
			}

			function Ba(a, b) {
				var d, e, f = c.ajaxSettings.flatOptions || {};
				for (d in b) b[d] !== l && ((f[d] ? a : e || (e = {}))[d] = b[d]);
				e && c.extend(true, a, e)
			}

			function ha(a, b, d, e) {
				if (c.isArray(b)) c.each(b, function(b, f) {
					d || lb.test(a) ? e(a, f) : ha(a + "[" + (typeof f === "object" || c.isArray(f) ? b : "") + "]", f, d, e)
				});
				else if (!d && b != null && typeof b === "object")
					for (var f in b) ha(a +
						"[" + f + "]", b[f], d, e);
				else e(a, b)
			}

			function Ca() {
				try {
					return new j.XMLHttpRequest
				} catch (a) {}
			}

			function Da() {
				setTimeout(mb, 0);
				return $ = c.now()
			}

			function mb() {
				$ = l
			}

			function O(a, b) {
				var d = {};
				c.each(Ea.concat.apply([], Ea.slice(0, b)), function() {
					d[this] = a
				});
				return d
			}

			function Fa(a) {
				if (!ia[a]) {
					var b = m.body,
						d = c("<" + a + ">").appendTo(b),
						e = d.css("display");
					d.remove();
					if (e === "none" || e === "") {
						if (!E) E = m.createElement("iframe"), E.frameBorder = E.width = E.height = 0;
						b.appendChild(E);
						if (!J || !E.createElement) J = (E.contentWindow || E.contentDocument).document,
						J.write((m.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), J.close();
						d = J.createElement(a);
						J.body.appendChild(d);
						e = c.css(d, "display");
						b.removeChild(E)
					}
					ia[a] = e
				}
				return ia[a]
			}

			function ja(a) {
				return c.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
			}
			var m = j.document,
				nb = j.navigator,
				ob = j.location,
				c = function() {
					function a() {
						if (!b.isReady) {
							try {
								m.documentElement.doScroll("left")
							} catch (c) {
								setTimeout(a, 1);
								return
							}
							b.ready()
						}
					}
					var b = function(a, c) {
						return new b.fn.init(a, c, f)
					}, c = j.jQuery,
						e = j.$,
						f, g = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
						h = /\S/,
						k = /^\s+/,
						o = /\s+$/,
						p = /\d/,
						V = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
						W = /^[\],:{}\s]*$/,
						B = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
						s = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
						pb = /(?:^|:|,)(?:\s*\[)+/g,
						q = /(webkit)[ \/]([\w.]+)/,
						r = /(opera)(?:.*version)?[ \/]([\w.]+)/,
						w = /(msie) ([\w.]+)/,
						A = /(mozilla)(?:.*? rv:([\w.]+))?/,
						x = /-([a-z]|[0-9])/ig,
						t = /^-ms-/,
						qb = function(a, b) {
							return (b + "").toUpperCase()
						}, M = nb.userAgent,
						aa, T, rb = Object.prototype.toString,
						ka = Object.prototype.hasOwnProperty,
						la = Array.prototype.push,
						u = Array.prototype.slice,
						Ga = String.prototype.trim,
						Ha = Array.prototype.indexOf,
						v = {};
					b.fn = b.prototype = {
						constructor: b,
						init: function(a, c, d) {
							var e;
							if (!a) return this;
							if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
							if (a === "body" && !c && m.body) return this.context = m, this[0] = m.body, this.selector = a, this.length = 1, this;
							if (typeof a === "string")
								if ((e = a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? [null, a, null] : g.exec(a)) && (e[1] || !c))
									if (e[1]) return d =
										(c = c instanceof b ? c[0] : c) ? c.ownerDocument || c : m, (a = V.exec(a)) ? b.isPlainObject(c) ? (a = [m.createElement(a[1])], b.fn.attr.call(a, c, true)) : a = [d.createElement(a[1])] : (a = b.buildFragment([e[1]], [d]), a = (a.cacheable ? b.clone(a.fragment) : a.fragment).childNodes), b.merge(this, a);
									else {
										if ((c = m.getElementById(e[2])) && c.parentNode) {
											if (c.id !== e[2]) return d.find(a);
											this.length = 1;
											this[0] = c
										}
										this.context = m;
										this.selector = a;
										return this
									} else return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
									else
							if (b.isFunction(a)) return d.ready(a);
							if (a.selector !== l) this.selector = a.selector, this.context = a.context;
							return b.makeArray(a, this)
						},
						selector: "",
						jquery: "1.6.3",
						length: 0,
						size: function() {
							return this.length
						},
						toArray: function() {
							return u.call(this, 0)
						},
						get: function(a) {
							return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
						},
						pushStack: function(a, c, d) {
							var e = this.constructor();
							b.isArray(a) ? la.apply(e, a) : b.merge(e, a);
							e.prevObject = this;
							e.context = this.context;
							if (c === "find") e.selector = this.selector + (this.selector ? " " : "") + d;
							else if (c) e.selector =
								this.selector + "." + c + "(" + d + ")";
							return e
						},
						each: function(a, c) {
							return b.each(this, a, c)
						},
						ready: function(a) {
							b.bindReady();
							aa.done(a);
							return this
						},
						eq: function(a) {
							return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
						},
						first: function() {
							return this.eq(0)
						},
						last: function() {
							return this.eq(-1)
						},
						slice: function() {
							return this.pushStack(u.apply(this, arguments), "slice", u.call(arguments).join(","))
						},
						map: function(a) {
							return this.pushStack(b.map(this, function(b, c) {
								return a.call(b, c, b)
							}))
						},
						end: function() {
							return this.prevObject ||
								this.constructor(null)
						},
						push: la,
						sort: [].sort,
						splice: [].splice
					};
					b.fn.init.prototype = b.fn;
					b.extend = b.fn.extend = function() {
						var a, c, d, e, f, g = arguments[0] || {}, x = 1,
							h = arguments.length,
							t = false;
						typeof g === "boolean" && (t = g, g = arguments[1] || {}, x = 2);
						typeof g !== "object" && !b.isFunction(g) && (g = {});
						h === x && (g = this, --x);
						for (; x < h; x++)
							if ((a = arguments[x]) != null)
								for (c in a) d = g[c], e = a[c], g !== e && (t && e && (b.isPlainObject(e) || (f = b.isArray(e))) ? (f ? (f = false, d = d && b.isArray(d) ? d : []) : d = d && b.isPlainObject(d) ? d : {}, g[c] = b.extend(t, d,
									e)) : e !== l && (g[c] = e));
						return g
					};
					b.extend({
						noConflict: function(a) {
							if (j.$ === b) j.$ = e;
							if (a && j.jQuery === b) j.jQuery = c;
							return b
						},
						isReady: false,
						readyWait: 1,
						holdReady: function(a) {
							a ? b.readyWait++ : b.ready(true)
						},
						ready: function(a) {
							if (a === true && !--b.readyWait || a !== true && !b.isReady) {
								if (!m.body) return setTimeout(b.ready, 1);
								b.isReady = true;
								a !== true && --b.readyWait > 0 || (aa.resolveWith(m, [b]), b.fn.trigger && b(m).trigger("ready").unbind("ready"))
							}
						},
						bindReady: function() {
							if (!aa) {
								aa = b._Deferred();
								if (m.readyState === "complete") return setTimeout(b.ready,
									1);
								if (m.addEventListener) m.addEventListener("DOMContentLoaded", T, false), j.addEventListener("load", b.ready, false);
								else if (m.attachEvent) {
									m.attachEvent("onreadystatechange", T);
									j.attachEvent("onload", b.ready);
									var c = false;
									try {
										c = j.frameElement == null
									} catch (d) {}
									m.documentElement.doScroll && c && a()
								}
							}
						},
						isFunction: function(a) {
							return b.type(a) === "function"
						},
						isArray: Array.isArray || function(a) {
							return b.type(a) === "array"
						},
						isWindow: function(a) {
							return a && typeof a === "object" && "setInterval" in a
						},
						isNaN: function(a) {
							return a ==
								null || !p.test(a) || isNaN(a)
						},
						type: function(a) {
							return a == null ? String(a) : v[rb.call(a)] || "object"
						},
						isPlainObject: function(a) {
							if (!a || b.type(a) !== "object" || a.nodeType || b.isWindow(a)) return false;
							try {
								if (a.constructor && !ka.call(a, "constructor") && !ka.call(a.constructor.prototype, "isPrototypeOf")) return false
							} catch (c) {
								return false
							}
							for (var d in a);
							return d === l || ka.call(a, d)
						},
						isEmptyObject: function(a) {
							for (var b in a) return false;
							return true
						},
						error: function(a) {
							throw a;
						},
						parseJSON: function(a) {
							if (typeof a !== "string" || !a) return null;
							a = b.trim(a);
							if (j.JSON && j.JSON.parse) return j.JSON.parse(a);
							if (W.test(a.replace(B, "@").replace(s, "]").replace(pb, ""))) return (new Function("return " + a))();
							b.error("Invalid JSON: " + a)
						},
						parseXML: function(a) {
							var c, d;
							try {
								j.DOMParser ? (d = new DOMParser, c = d.parseFromString(a, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(a))
							} catch (e) {
								c = l
							}(!c || !c.documentElement || c.getElementsByTagName("parsererror").length) && b.error("Invalid XML: " + a);
							return c
						},
						noop: function() {},
						globalEval: function(a) {
							a && h.test(a) && (j.execScript || function(a) {
								j.eval.call(j, a)
							})(a)
						},
						camelCase: function(a) {
							return a.replace(t, "ms-").replace(x, qb)
						},
						nodeName: function(a, b) {
							return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
						},
						each: function(a, c, d) {
							var e, f = 0,
								g = a.length,
								x = g === l || b.isFunction(a);
							if (d)
								if (x)
									for (e in a) {
										if (c.apply(a[e], d) === false) break
									} else
										for (; f < g;) {
											if (c.apply(a[f++], d) === false) break
										} else if (x)
											for (e in a) {
												if (c.call(a[e], e, a[e]) === false) break
											} else
												for (; f < g;)
													if (c.call(a[f], f, a[f++]) ===
														false) break;
							return a
						},
						trim: Ga ? function(a) {
							return a == null ? "" : Ga.call(a)
						} : function(a) {
							return a == null ? "" : a.toString().replace(k, "").replace(o, "")
						},
						makeArray: function(a, c) {
							var d = c || [];
							if (a != null) {
								var e = b.type(a);
								a.length == null || e === "string" || e === "function" || e === "regexp" || b.isWindow(a) ? la.call(d, a) : b.merge(d, a)
							}
							return d
						},
						inArray: function(a, b) {
							if (!b) return -1;
							if (Ha) return Ha.call(b, a);
							for (var c = 0, d = b.length; c < d; c++)
								if (b[c] === a) return c;
							return -1
						},
						merge: function(a, b) {
							var c = a.length,
								d = 0;
							if (typeof b.length ===
								"number")
								for (var e = b.length; d < e; d++) a[c++] = b[d];
							else
								for (; b[d] !== l;) a[c++] = b[d++];
							a.length = c;
							return a
						},
						grep: function(a, b, c) {
							for (var d = [], e, c = !! c, f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
							return d
						},
						map: function(a, c, d) {
							var e, f, g = [],
								x = 0,
								h = a.length;
							if (a instanceof b || h !== l && typeof h === "number" && (h > 0 && a[0] && a[h - 1] || h === 0 || b.isArray(a)))
								for (; x < h; x++) e = c(a[x], x, d), e != null && (g[g.length] = e);
							else
								for (f in a) e = c(a[f], f, d), e != null && (g[g.length] = e);
							return g.concat.apply([], g)
						},
						guid: 1,
						proxy: function(a,
							c) {
							if (typeof c === "string") var d = a[c],
							c = a, a = d;
							if (!b.isFunction(a)) return l;
							var e = u.call(arguments, 2),
								d = function() {
									return a.apply(c, e.concat(u.call(arguments)))
								};
							d.guid = a.guid = a.guid || d.guid || b.guid++;
							return d
						},
						access: function(a, c, d, e, f, g) {
							var x = a.length;
							if (typeof c === "object") {
								for (var h in c) b.access(a, h, c[h], e, f, d);
								return a
							}
							if (d !== l) {
								e = !g && e && b.isFunction(d);
								for (h = 0; h < x; h++) f(a[h], c, e ? d.call(a[h], h, f(a[h], c)) : d, g);
								return a
							}
							return x ? f(a[0], c) : l
						},
						now: function() {
							return (new Date).getTime()
						},
						uaMatch: function(a) {
							a =
								a.toLowerCase();
							a = q.exec(a) || r.exec(a) || w.exec(a) || a.indexOf("compatible") < 0 && A.exec(a) || [];
							return {
								browser: a[1] || "",
								version: a[2] || "0"
							}
						},
						sub: function() {
							function a(b, c) {
								return new a.fn.init(b, c)
							}
							b.extend(true, a, this);
							a.superclass = this;
							a.fn = a.prototype = this();
							a.fn.constructor = a;
							a.sub = this.sub;
							a.fn.init = function(d, e) {
								e && e instanceof b && !(e instanceof a) && (e = a(e));
								return b.fn.init.call(this, d, e, c)
							};
							a.fn.init.prototype = a.fn;
							var c = a(m);
							return a
						},
						browser: {}
					});
					b.each("Boolean Number String Function Array Date RegExp Object".split(" "),
						function(a, b) {
							v["[object " + b + "]"] = b.toLowerCase()
						});
					M = b.uaMatch(M);
					if (M.browser) b.browser[M.browser] = true, b.browser.version = M.version;
					if (b.browser.webkit) b.browser.safari = true;
					h.test("\u00a0") && (k = /^[\s\xA0]+/, o = /[\s\xA0]+$/);
					f = b(m);
					m.addEventListener ? T = function() {
						m.removeEventListener("DOMContentLoaded", T, false);
						b.ready()
					} : m.attachEvent && (T = function() {
						m.readyState === "complete" && (m.detachEvent("onreadystatechange", T), b.ready())
					});
					return b
				}(),
				ma = "done fail isResolved isRejected promise then always pipe".split(" "),
				Ia = [].slice;
			c.extend({
				_Deferred: function() {
					var a = [],
						b, d, e, f = {
							done: function() {
								if (!e) {
									var d = arguments,
										h, k, o, p, l;
									b && (l = b, b = 0);
									for (h = 0, k = d.length; h < k; h++) o = d[h], p = c.type(o), p === "array" ? f.done.apply(f, o) : p === "function" && a.push(o);
									l && f.resolveWith(l[0], l[1])
								}
								return this
							},
							resolveWith: function(c, f) {
								if (!e && !b && !d) {
									f = f || [];
									d = 1;
									try {
										for (; a[0];) a.shift().apply(c, f)
									} finally {
										b = [c, f], d = 0
									}
								}
								return this
							},
							resolve: function() {
								f.resolveWith(this, arguments);
								return this
							},
							isResolved: function() {
								return !(!d && !b)
							},
							cancel: function() {
								e =
									1;
								a = [];
								return this
							}
						};
					return f
				},
				Deferred: function(a) {
					var b = c._Deferred(),
						d = c._Deferred(),
						e;
					c.extend(b, {
						then: function(a, c) {
							b.done(a).fail(c);
							return this
						},
						always: function() {
							return b.done.apply(b, arguments).fail.apply(this, arguments)
						},
						fail: d.done,
						rejectWith: d.resolveWith,
						reject: d.resolve,
						isRejected: d.isResolved,
						pipe: function(a, d) {
							return c.Deferred(function(e) {
								c.each({
									done: [a, "resolve"],
									fail: [d, "reject"]
								}, function(a, d) {
									var f = d[0],
										g = d[1],
										l;
									if (c.isFunction(f)) b[a](function() {
										if ((l = f.apply(this, arguments)) &&
											c.isFunction(l.promise)) l.promise().then(e.resolve, e.reject);
										else e[g + "With"](this === b ? e : this, [l])
									});
									else b[a](e[g])
								})
							}).promise()
						},
						promise: function(a) {
							if (a == null) {
								if (e) return e;
								e = a = {}
							}
							for (var c = ma.length; c--;) a[ma[c]] = b[ma[c]];
							return a
						}
					});
					b.done(d.cancel).fail(b.cancel);
					delete b.cancel;
					a && a.call(b, b);
					return b
				},
				when: function(a) {
					function b(a) {
						return function(b) {
							d[a] = arguments.length > 1 ? Ia.call(arguments, 0) : b;
							--g || h.resolveWith(h, Ia.call(d, 0))
						}
					}
					var d = arguments,
						e = 0,
						f = d.length,
						g = f,
						h = f <= 1 && a && c.isFunction(a.promise) ?
							a : c.Deferred();
					if (f > 1) {
						for (; e < f; e++) d[e] && c.isFunction(d[e].promise) ? d[e].promise().then(b(e), h.reject) : --g;
						g || h.resolveWith(h, d)
					} else h !== a && h.resolveWith(h, f ? [a] : []);
					return h.promise()
				}
			});
			c.support = function() {
				var a = m.createElement("div"),
					b = m.documentElement,
					d, e, f, g, h, k;
				a.setAttribute("className", "t");
				a.innerHTML = "   <link><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type=checkbox>";
				d = a.getElementsByTagName("*");
				e = a.getElementsByTagName("a")[0];
				if (!d || !d.length || !e) return {};
				f = m.createElement("select");
				g = f.appendChild(m.createElement("option"));
				d = a.getElementsByTagName("input")[0];
				h = {
					leadingWhitespace: a.firstChild.nodeType === 3,
					tbody: !a.getElementsByTagName("tbody").length,
					htmlSerialize: !! a.getElementsByTagName("link").length,
					style: /top/.test(e.getAttribute("style")),
					hrefNormalized: e.getAttribute("href") === "/a",
					opacity: /^0.55$/.test(e.style.opacity),
					cssFloat: !! e.style.cssFloat,
					checkOn: d.value === "on",
					optSelected: g.selected,
					getSetAttribute: a.className !== "t",
					submitBubbles: true,
					changeBubbles: true,
					focusinBubbles: false,
					deleteExpando: true,
					noCloneEvent: true,
					inlineBlockNeedsLayout: false,
					shrinkWrapBlocks: false,
					reliableMarginRight: true
				};
				d.checked = true;
				h.noCloneChecked = d.cloneNode(true).checked;
				f.disabled = true;
				h.optDisabled = !g.disabled;
				try {
					delete a.test
				} catch (o) {
					h.deleteExpando = false
				}!a.addEventListener && a.attachEvent && a.fireEvent && (a.attachEvent("onclick", function() {
					h.noCloneEvent = false
				}), a.cloneNode(true).fireEvent("onclick"));
				d = m.createElement("input");
				d.value =
					"t";
				d.setAttribute("type", "radio");
				h.radioValue = d.value === "t";
				d.setAttribute("checked", "checked");
				a.appendChild(d);
				e = m.createDocumentFragment();
				e.appendChild(a.firstChild);
				h.checkClone = e.cloneNode(true).cloneNode(true).lastChild.checked;
				a.innerHTML = "";
				a.style.width = a.style.paddingLeft = "1px";
				f = m.getElementsByTagName("body")[0];
				e = m.createElement(f ? "div" : "body");
				g = {
					visibility: "hidden",
					width: 0,
					height: 0,
					border: 0,
					margin: 0,
					background: "none"
				};
				f && c.extend(g, {
					position: "absolute",
					left: "-1000px",
					top: "-1000px"
				});
				for (k in g) e.style[k] = g[k];
				e.appendChild(a);
				b = f || b;
				b.insertBefore(e, b.firstChild);
				h.appendChecked = d.checked;
				h.boxModel = a.offsetWidth === 2;
				if ("zoom" in a.style) a.style.display = "inline", a.style.zoom = 1, h.inlineBlockNeedsLayout = a.offsetWidth === 2, a.style.display = "", a.innerHTML = "<div style='width:4px;'></div>", h.shrinkWrapBlocks = a.offsetWidth !== 2;
				a.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
				f = a.getElementsByTagName("td");
				d = f[0].offsetHeight === 0;
				f[0].style.display =
					"";
				f[1].style.display = "none";
				h.reliableHiddenOffsets = d && f[0].offsetHeight === 0;
				a.innerHTML = "";
				if (m.defaultView && m.defaultView.getComputedStyle) d = m.createElement("div"), d.style.width = "0", d.style.marginRight = "0", a.appendChild(d), h.reliableMarginRight = (parseInt((m.defaultView.getComputedStyle(d, null) || {
					marginRight: 0
				}).marginRight, 10) || 0) === 0;
				e.innerHTML = "";
				b.removeChild(e);
				if (a.attachEvent)
					for (k in {
						submit: 1,
						change: 1,
						focusin: 1
					}) b = "on" + k, d = b in a, d || (a.setAttribute(b, "return;"), d = typeof a[b] === "function"),
				h[k + "Bubbles"] = d;
				e = e = f = g = f = d = a = d = null;
				return h
			}();
			c.boxModel = c.support.boxModel;
			var eb = /^(?:\{.*\}|\[.*\])$/,
				db = /([a-z])([A-Z])/g;
			c.extend({
				cache: {},
				uuid: 0,
				expando: "jQuery" + (c.fn.jquery + Math.random()).replace(/\D/g, ""),
				noData: {
					embed: true,
					object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
					applet: true
				},
				hasData: function(a) {
					a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando];
					return !!a && !r(a)
				},
				data: function(a, b, d, e) {
					if (c.acceptData(a)) {
						var f = c.expando,
							g = typeof b === "string",
							h = a.nodeType,
							k = h ? c.cache : a,
							o = h ?
								a[c.expando] : a[c.expando] && c.expando;
						if (o && (!e || !o || !k[o] || k[o][f]) || !(g && d === l)) {
							if (!o) h ? a[c.expando] = o = ++c.uuid : o = c.expando;
							if (!k[o] && (k[o] = {}, !h)) k[o].toJSON = c.noop;
							if (typeof b === "object" || typeof b === "function") e ? k[o][f] = c.extend(k[o][f], b) : k[o] = c.extend(k[o], b);
							a = k[o];
							e && (a[f] || (a[f] = {}), a = a[f]);
							d !== l && (a[c.camelCase(b)] = d);
							if (b === "events" && !a[b]) return a[f] && a[f].events;
							g ? (d = a[b], d == null && (d = a[c.camelCase(b)])) : d = a;
							return d
						}
					}
				},
				removeData: function(a, b, d) {
					if (c.acceptData(a)) {
						var e, f = c.expando,
							g = a.nodeType,
							h = g ? c.cache : a,
							k = g ? a[c.expando] : c.expando;
						if (h[k]) {
							if (b && (e = d ? h[k][f] : h[k]))
								if (e[b] || (b = c.camelCase(b)), delete e[b], !r(e)) return;
							if (d && (delete h[k][f], !r(h[k]))) return;
							b = h[k][f];
							c.support.deleteExpando || !h.setInterval ? delete h[k] : h[k] = null;
							if (b) {
								h[k] = {};
								if (!g) h[k].toJSON = c.noop;
								h[k][f] = b
							} else g && (c.support.deleteExpando ? delete a[c.expando] : a.removeAttribute ? a.removeAttribute(c.expando) : a[c.expando] = null)
						}
					}
				},
				_data: function(a, b, d) {
					return c.data(a, b, d, true)
				},
				acceptData: function(a) {
					if (a.nodeName) {
						var b =
							c.noData[a.nodeName.toLowerCase()];
						if (b) return !(b === true || a.getAttribute("classid") !== b)
					}
					return true
				}
			});
			c.fn.extend({
				data: function(a, b) {
					var d = null;
					if (typeof a === "undefined") {
						if (this.length && (d = c.data(this[0]), this[0].nodeType === 1))
							for (var e = this[0].attributes, f, g = 0, h = e.length; g < h; g++) f = e[g].name, f.indexOf("data-") === 0 && (f = c.camelCase(f.substring(5)), q(this[0], f, d[f]));
						return d
					} else if (typeof a === "object") return this.each(function() {
						c.data(this, a)
					});
					var k = a.split(".");
					k[1] = k[1] ? "." + k[1] : "";
					return b ===
						l ? (d = this.triggerHandler("getData" + k[1] + "!", [k[0]]), d === l && this.length && (d = c.data(this[0], a), d = q(this[0], a, d)), d === l && k[1] ? this.data(k[0]) : d) : this.each(function() {
							var d = c(this),
								e = [k[0], b];
							d.triggerHandler("setData" + k[1] + "!", e);
							c.data(this, a, b);
							d.triggerHandler("changeData" + k[1] + "!", e)
						})
				},
				removeData: function(a) {
					return this.each(function() {
						c.removeData(this, a)
					})
				}
			});
			c.extend({
				_mark: function(a, b) {
					a && (b = (b || "fx") + "mark", c.data(a, b, (c.data(a, b, l, true) || 0) + 1, true))
				},
				_unmark: function(a, b, d) {
					a !== true && (d =
						b, b = a, a = false);
					if (b) {
						var d = d || "fx",
							e = d + "mark";
						(a = a ? 0 : (c.data(b, e, l, true) || 1) - 1) ? c.data(b, e, a, true) : (c.removeData(b, e, true), u(b, d, "mark"))
					}
				},
				queue: function(a, b, d) {
					if (a) {
						var b = (b || "fx") + "queue",
							e = c.data(a, b, l, true);
						d && (!e || c.isArray(d) ? e = c.data(a, b, c.makeArray(d), true) : e.push(d));
						return e || []
					}
				},
				dequeue: function(a, b) {
					var b = b || "fx",
						d = c.queue(a, b),
						e = d.shift();
					e === "inprogress" && (e = d.shift());
					e && (b === "fx" && d.unshift("inprogress"), e.call(a, function() {
						c.dequeue(a, b)
					}));
					d.length || (c.removeData(a, b + "queue",
						true), u(a, b, "queue"))
				}
			});
			c.fn.extend({
				queue: function(a, b) {
					typeof a !== "string" && (b = a, a = "fx");
					return b === l ? c.queue(this[0], a) : this.each(function() {
						var d = c.queue(this, a, b);
						a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
					})
				},
				dequeue: function(a) {
					return this.each(function() {
						c.dequeue(this, a)
					})
				},
				delay: function(a, b) {
					a = c.fx ? c.fx.speeds[a] || a : a;
					b = b || "fx";
					return this.queue(b, function() {
						var d = this;
						setTimeout(function() {
							c.dequeue(d, b)
						}, a)
					})
				},
				clearQueue: function(a) {
					return this.queue(a || "fx", [])
				},
				promise: function(a) {
					function b() {
						--g ||
							d.resolveWith(e, [e])
					}
					typeof a !== "string" && (a = l);
					var a = a || "fx",
						d = c.Deferred(),
						e = this,
						f = e.length,
						g = 1,
						h = a + "defer",
						k = a + "queue";
					a += "mark";
					for (var o; f--;)
						if (o = c.data(e[f], h, l, true) || (c.data(e[f], k, l, true) || c.data(e[f], a, l, true)) && c.data(e[f], h, c._Deferred(), true)) g++, o.done(b);
					b();
					return d.promise()
				}
			});
			var Ja = /[\n\t\r]/g,
				na = /\s+/,
				sb = /\r/g,
				tb = /^(?:button|input)$/i,
				ub = /^(?:button|input|object|select|textarea)$/i,
				vb = /^a(?:rea)?$/i,
				Ka = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
				K, La;
			c.fn.extend({
				attr: function(a, b) {
					return c.access(this, a, b, true, c.attr)
				},
				removeAttr: function(a) {
					return this.each(function() {
						c.removeAttr(this, a)
					})
				},
				prop: function(a, b) {
					return c.access(this, a, b, true, c.prop)
				},
				removeProp: function(a) {
					a = c.propFix[a] || a;
					return this.each(function() {
						try {
							this[a] = l, delete this[a]
						} catch (b) {}
					})
				},
				addClass: function(a) {
					var b, d, e, f, g, h, k;
					if (c.isFunction(a)) return this.each(function(b) {
						c(this).addClass(a.call(this, b, this.className))
					});
					if (a && typeof a === "string") {
						b = a.split(na);
						for (d =
							0, e = this.length; d < e; d++)
							if (f = this[d], f.nodeType === 1)
								if (!f.className && b.length === 1) f.className = a;
								else {
									g = " " + f.className + " ";
									for (h = 0, k = b.length; h < k; h++)~ g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
									f.className = c.trim(g)
								}
					}
					return this
				},
				removeClass: function(a) {
					var b, d, e, f, g, h, k;
					if (c.isFunction(a)) return this.each(function(b) {
						c(this).removeClass(a.call(this, b, this.className))
					});
					if (a && typeof a === "string" || a === l) {
						b = (a || "").split(na);
						for (d = 0, e = this.length; d < e; d++)
							if (f = this[d], f.nodeType === 1 && f.className)
								if (a) {
									g =
										(" " + f.className + " ").replace(Ja, " ");
									for (h = 0, k = b.length; h < k; h++) g = g.replace(" " + b[h] + " ", " ");
									f.className = c.trim(g)
								} else f.className = ""
					}
					return this
				},
				toggleClass: function(a, b) {
					var d = typeof a,
						e = typeof b === "boolean";
					return c.isFunction(a) ? this.each(function(d) {
						c(this).toggleClass(a.call(this, d, this.className, b), b)
					}) : this.each(function() {
						if (d === "string")
							for (var f, g = 0, h = c(this), k = b, o = a.split(na); f = o[g++];) k = e ? k : !h.hasClass(f), h[k ? "addClass" : "removeClass"](f);
						else if (d === "undefined" || d === "boolean") this.className &&
							c._data(this, "__className__", this.className), this.className = this.className || a === false ? "" : c._data(this, "__className__") || ""
					})
				},
				hasClass: function(a) {
					for (var a = " " + a + " ", b = 0, c = this.length; b < c; b++)
						if (this[b].nodeType === 1 && (" " + this[b].className + " ").replace(Ja, " ").indexOf(a) > -1) return true;
					return false
				},
				val: function(a) {
					var b, d, e = this[0];
					if (!arguments.length) {
						if (e) {
							if ((b = c.valHooks[e.nodeName.toLowerCase()] || c.valHooks[e.type]) && "get" in b && (d = b.get(e, "value")) !== l) return d;
							d = e.value;
							return typeof d ===
								"string" ? d.replace(sb, "") : d == null ? "" : d
						}
						return l
					}
					var f = c.isFunction(a);
					return this.each(function(d) {
						var e = c(this);
						if (this.nodeType === 1 && (d = f ? a.call(this, d, e.val()) : a, d == null ? d = "" : typeof d === "number" ? d += "" : c.isArray(d) && (d = c.map(d, function(a) {
							return a == null ? "" : a + ""
						})), b = c.valHooks[this.nodeName.toLowerCase()] || c.valHooks[this.type], !b || !("set" in b) || b.set(this, d, "value") === l)) this.value = d
					})
				}
			});
			c.extend({
				valHooks: {
					option: {
						get: function(a) {
							var b = a.attributes.value;
							return !b || b.specified ? a.value : a.text
						}
					},
					select: {
						get: function(a) {
							var b, d = a.selectedIndex,
								e = [],
								f = a.options,
								a = a.type === "select-one";
							if (d < 0) return null;
							for (var g = a ? d : 0, h = a ? d + 1 : f.length; g < h; g++)
								if (b = f[g], b.selected && (c.support.optDisabled ? !b.disabled : b.getAttribute("disabled") === null) && (!b.parentNode.disabled || !c.nodeName(b.parentNode, "optgroup"))) {
									b = c(b).val();
									if (a) return b;
									e.push(b)
								}
							return a && !e.length && f.length ? c(f[d]).val() : e
						},
						set: function(a, b) {
							var d = c.makeArray(b);
							c(a).find("option").each(function() {
								this.selected = c.inArray(c(this).val(),
									d) >= 0
							});
							if (!d.length) a.selectedIndex = -1;
							return d
						}
					}
				},
				attrFn: {
					val: true,
					css: true,
					html: true,
					text: true,
					data: true,
					width: true,
					height: true,
					offset: true
				},
				attrFix: {
					tabindex: "tabIndex"
				},
				attr: function(a, b, d, e) {
					var f = a.nodeType;
					if (!a || f === 3 || f === 8 || f === 2) return l;
					if (e && b in c.attrFn) return c(a)[b](d);
					if (!("getAttribute" in a)) return c.prop(a, b, d);
					var g, h;
					if (e = f !== 1 || !c.isXMLDoc(a)) b = c.attrFix[b] || b, (h = c.attrHooks[b]) || (Ka.test(b) ? h = La : K && (h = K));
					return d !== l ? d === null ? (c.removeAttr(a, b), l) : h && "set" in h && e && (g = h.set(a,
						d, b)) !== l ? g : (a.setAttribute(b, "" + d), d) : h && "get" in h && e && (g = h.get(a, b)) !== null ? g : (g = a.getAttribute(b), g === null ? l : g)
				},
				removeAttr: function(a, b) {
					var d;
					if (a.nodeType === 1 && (b = c.attrFix[b] || b, c.attr(a, b, ""), a.removeAttribute(b), Ka.test(b) && (d = c.propFix[b] || b) in a)) a[d] = false
				},
				attrHooks: {
					type: {
						set: function(a, b) {
							if (tb.test(a.nodeName) && a.parentNode) c.error("type property can't be changed");
							else if (!c.support.radioValue && b === "radio" && c.nodeName(a, "input")) {
								var d = a.value;
								a.setAttribute("type", b);
								if (d) a.value =
									d;
								return b
							}
						}
					},
					value: {
						get: function(a, b) {
							return K && c.nodeName(a, "button") ? K.get(a, b) : b in a ? a.value : null
						},
						set: function(a, b, d) {
							if (K && c.nodeName(a, "button")) return K.set(a, b, d);
							a.value = b
						}
					}
				},
				propFix: {
					tabindex: "tabIndex",
					readonly: "readOnly",
					"for": "htmlFor",
					"class": "className",
					maxlength: "maxLength",
					cellspacing: "cellSpacing",
					cellpadding: "cellPadding",
					rowspan: "rowSpan",
					colspan: "colSpan",
					usemap: "useMap",
					frameborder: "frameBorder",
					contenteditable: "contentEditable"
				},
				prop: function(a, b, d) {
					var e = a.nodeType;
					if (!a ||
						e === 3 || e === 8 || e === 2) return l;
					var f, g;
					if (e !== 1 || !c.isXMLDoc(a)) b = c.propFix[b] || b, g = c.propHooks[b];
					return d !== l ? g && "set" in g && (f = g.set(a, d, b)) !== l ? f : a[b] = d : g && "get" in g && (f = g.get(a, b)) !== null ? f : a[b]
				},
				propHooks: {
					tabIndex: {
						get: function(a) {
							var b = a.getAttributeNode("tabindex");
							return b && b.specified ? parseInt(b.value, 10) : ub.test(a.nodeName) || vb.test(a.nodeName) && a.href ? 0 : l
						}
					}
				}
			});
			c.attrHooks.tabIndex = c.propHooks.tabIndex;
			La = {
				get: function(a, b) {
					var d;
					return c.prop(a, b) === true || (d = a.getAttributeNode(b)) && d.nodeValue !==
						false ? b.toLowerCase() : l
				},
				set: function(a, b, d) {
					b === false ? c.removeAttr(a, d) : (b = c.propFix[d] || d, b in a && (a[b] = true), a.setAttribute(d, d.toLowerCase()));
					return d
				}
			};
			if (!c.support.getSetAttribute) K = c.valHooks.button = {
				get: function(a, b) {
					var c;
					return (c = a.getAttributeNode(b)) && c.nodeValue !== "" ? c.nodeValue : l
				},
				set: function(a, b, c) {
					var e = a.getAttributeNode(c);
					e || (e = m.createAttribute(c), a.setAttributeNode(e));
					return e.nodeValue = b + ""
				}
			}, c.each(["width", "height"], function(a, b) {
				c.attrHooks[b] = c.extend(c.attrHooks[b], {
					set: function(a, c) {
						if (c === "") return a.setAttribute(b, "auto"), c
					}
				})
			});
			c.support.hrefNormalized || c.each(["href", "src", "width", "height"], function(a, b) {
				c.attrHooks[b] = c.extend(c.attrHooks[b], {
					get: function(a) {
						a = a.getAttribute(b, 2);
						return a === null ? l : a
					}
				})
			});
			if (!c.support.style) c.attrHooks.style = {
				get: function(a) {
					return a.style.cssText.toLowerCase() || l
				},
				set: function(a, b) {
					return a.style.cssText = "" + b
				}
			};
			if (!c.support.optSelected) c.propHooks.selected = c.extend(c.propHooks.selected, {
				get: function() {
					return null
				}
			});
			c.support.checkOn || c.each(["radio", "checkbox"], function() {
				c.valHooks[this] = {
					get: function(a) {
						return a.getAttribute("value") === null ? "on" : a.value
					}
				}
			});
			c.each(["radio", "checkbox"], function() {
				c.valHooks[this] = c.extend(c.valHooks[this], {
					set: function(a, b) {
						if (c.isArray(b)) return a.checked = c.inArray(c(a).val(), b) >= 0
					}
				})
			});
			var fa = /\.(.*)$/,
				oa = /^(?:textarea|input|select)$/i,
				fb = /\./g,
				gb = / /g,
				wb = /[^\w\s.|`]/g,
				xb = function(a) {
					return a.replace(wb, "\\$&")
				};
			c.event = {
				add: function(a, b, d, e) {
					if (!(a.nodeType === 3 || a.nodeType ===
						8)) {
						if (d === false) d = w;
						else if (!d) return;
						var f, g;
						if (d.handler) f = d, d = f.handler;
						if (!d.guid) d.guid = c.guid++;
						if (g = c._data(a)) {
							var h = g.events,
								k = g.handle;
							if (!h) g.events = h = {};
							if (!k) g.handle = k = function(a) {
								return typeof c !== "undefined" && (!a || c.event.triggered !== a.type) ? c.event.handle.apply(k.elem, arguments) : l
							};
							k.elem = a;
							for (var b = b.split(" "), o, p = 0, j; o = b[p++];) {
								g = f ? c.extend({}, f) : {
									handler: d,
									data: e
								};
								o.indexOf(".") > -1 ? (j = o.split("."), o = j.shift(), g.namespace = j.slice(0).sort().join(".")) : (j = [], g.namespace = "");
								g.type =
									o;
								if (!g.guid) g.guid = d.guid;
								var m = h[o],
									B = c.event.special[o] || {};
								if (!m && (m = h[o] = [], !B.setup || B.setup.call(a, e, j, k) === false)) a.addEventListener ? a.addEventListener(o, k, false) : a.attachEvent && a.attachEvent("on" + o, k);
								if (B.add && (B.add.call(a, g), !g.handler.guid)) g.handler.guid = d.guid;
								m.push(g);
								c.event.global[o] = true
							}
							a = null
						}
					}
				},
				global: {},
				remove: function(a, b, d, e) {
					if (!(a.nodeType === 3 || a.nodeType === 8)) {
						d === false && (d = w);
						var f, g, h = 0,
							k, o, p, j, m, B, s = c.hasData(a) && c._data(a),
							q = s && s.events;
						if (s && q) {
							if (b && b.type) d = b.handler,
							b = b.type;
							if (!b || typeof b === "string" && b.charAt(0) === ".")
								for (f in b = b || "", q) c.event.remove(a, f + b);
							else {
								for (b = b.split(" "); f = b[h++];)
									if (j = f, k = f.indexOf(".") < 0, o = [], k || (o = f.split("."), f = o.shift(), p = RegExp("(^|\\.)" + c.map(o.slice(0).sort(), xb).join("\\.(?:.*\\.)?") + "(\\.|$)")), m = q[f])
										if (d) {
											j = c.event.special[f] || {};
											for (g = e || 0; g < m.length; g++)
												if (B = m[g], d.guid === B.guid) {
													if (k || p.test(B.namespace)) e == null && m.splice(g--, 1), j.remove && j.remove.call(a, B);
													if (e != null) break
												}
											if (m.length === 0 || e != null && m.length === 1)(!j.teardown ||
												j.teardown.call(a, o) === false) && c.removeEvent(a, f, s.handle), delete q[f]
										} else
											for (g = 0; g < m.length; g++)
												if (B = m[g], k || p.test(B.namespace)) c.event.remove(a, j, B.handler, g), m.splice(g--, 1);
								if (c.isEmptyObject(q)) {
									if (b = s.handle) b.elem = null;
									delete s.events;
									delete s.handle;
									c.isEmptyObject(s) && c.removeData(a, l, true)
								}
							}
						}
					}
				},
				customEvent: {
					getData: true,
					setData: true,
					changeData: true
				},
				trigger: function(a, b, d, e) {
					var f = a.type || a,
						g = [],
						h;
					f.indexOf("!") >= 0 && (f = f.slice(0, -1), h = true);
					f.indexOf(".") >= 0 && (g = f.split("."), f = g.shift(),
						g.sort());
					if (d && !c.event.customEvent[f] || c.event.global[f]) {
						a = typeof a === "object" ? a[c.expando] ? a : new c.Event(f, a) : new c.Event(f);
						a.type = f;
						a.exclusive = h;
						a.namespace = g.join(".");
						a.namespace_re = RegExp("(^|\\.)" + g.join("\\.(?:.*\\.)?") + "(\\.|$)");
						if (e || !d) a.preventDefault(), a.stopPropagation();
						if (d) {
							if (!(d.nodeType === 3 || d.nodeType === 8)) {
								a.result = l;
								a.target = d;
								b = b != null ? c.makeArray(b) : [];
								b.unshift(a);
								g = d;
								e = f.indexOf(":") < 0 ? "on" + f : "";
								do {
									h = c._data(g, "handle");
									a.currentTarget = g;
									h && h.apply(g, b);
									if (e && c.acceptData(g) &&
										g[e] && g[e].apply(g, b) === false) a.result = false, a.preventDefault();
									g = g.parentNode || g.ownerDocument || g === a.target.ownerDocument && j
								} while (g && !a.isPropagationStopped());
								if (!a.isDefaultPrevented()) {
									var k, g = c.event.special[f] || {};
									if ((!g._default || g._default.call(d.ownerDocument, a) === false) && !(f === "click" && c.nodeName(d, "a")) && c.acceptData(d)) {
										try {
											if (e && d[f])(k = d[e]) && (d[e] = null), c.event.triggered = f, d[f]()
										} catch (o) {}
										k && (d[e] = k);
										c.event.triggered = l
									}
								}
								return a.result
							}
						} else c.each(c.cache, function() {
							var d = this[c.expando];
							d && d.events && d.events[f] && c.event.trigger(a, b, d.handle.elem)
						})
					}
				},
				handle: function(a) {
					var a = c.event.fix(a || j.event),
						b = ((c._data(this, "events") || {})[a.type] || []).slice(0),
						d = !a.exclusive && !a.namespace,
						e = Array.prototype.slice.call(arguments, 0);
					e[0] = a;
					a.currentTarget = this;
					for (var f = 0, g = b.length; f < g; f++) {
						var h = b[f];
						if (d || a.namespace_re.test(h.namespace)) {
							a.handler = h.handler;
							a.data = h.data;
							a.handleObj = h;
							h = h.handler.apply(this, e);
							if (h !== l) a.result = h, h === false && (a.preventDefault(), a.stopPropagation());
							if (a.isImmediatePropagationStopped()) break
						}
					}
					return a.result
				},
				props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
				fix: function(a) {
					if (a[c.expando]) return a;
					for (var b = a, a = c.Event(b), d = this.props.length, e; d;) e = this.props[--d], a[e] = b[e];
					if (!a.target) a.target = a.srcElement || m;
					if (a.target.nodeType ===
						3) a.target = a.target.parentNode;
					if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
					if (a.pageX == null && a.clientX != null) d = a.target.ownerDocument || m, b = d.documentElement, d = d.body, a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0), a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0);
					if (a.which == null && (a.charCode != null || a.keyCode != null)) a.which = a.charCode != null ? a.charCode : a.keyCode;
					if (!a.metaKey && a.ctrlKey) a.metaKey = a.ctrlKey;
					if (!a.which && a.button !== l) a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
					return a
				},
				guid: 1E8,
				proxy: c.proxy,
				special: {
					ready: {
						setup: c.bindReady,
						teardown: c.noop
					},
					live: {
						add: function(a) {
							c.event.add(this, X(a.origType, a.selector), c.extend({}, a, {
								handler: ea,
								guid: a.handler.guid
							}))
						},
						remove: function(a) {
							c.event.remove(this, X(a.origType, a.selector), a)
						}
					},
					beforeunload: {
						setup: function(a, b, d) {
							if (c.isWindow(this)) this.onbeforeunload = d
						},
						teardown: function(a, b) {
							if (this.onbeforeunload ===
								b) this.onbeforeunload = null
						}
					}
				}
			};
			c.removeEvent = m.removeEventListener ? function(a, b, c) {
				a.removeEventListener && a.removeEventListener(b, c, false)
			} : function(a, b, c) {
				a.detachEvent && a.detachEvent("on" + b, c)
			};
			c.Event = function(a, b) {
				if (!this.preventDefault) return new c.Event(a, b);
				a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === false || a.getPreventDefault && a.getPreventDefault() ? D : w) : this.type = a;
				b && c.extend(this, b);
				this.timeStamp = c.now();
				this[c.expando] =
					true
			};
			c.Event.prototype = {
				preventDefault: function() {
					this.isDefaultPrevented = D;
					var a = this.originalEvent;
					if (a) a.preventDefault ? a.preventDefault() : a.returnValue = false
				},
				stopPropagation: function() {
					this.isPropagationStopped = D;
					var a = this.originalEvent;
					if (a) a.stopPropagation && a.stopPropagation(), a.cancelBubble = true
				},
				stopImmediatePropagation: function() {
					this.isImmediatePropagationStopped = D;
					this.stopPropagation()
				},
				isDefaultPrevented: w,
				isPropagationStopped: w,
				isImmediatePropagationStopped: w
			};
			var Ma = function(a) {
				var b =
					a.relatedTarget,
					d = false,
					e = a.type;
				a.type = a.data;
				if (b !== this && (b && (d = c.contains(this, b)), !d)) c.event.handle.apply(this, arguments), a.type = e
			}, Na = function(a) {
					a.type = a.data;
					c.event.handle.apply(this, arguments)
				};
			c.each({
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			}, function(a, b) {
				c.event.special[a] = {
					setup: function(d) {
						c.event.add(this, b, d && d.selector ? Na : Ma, a)
					},
					teardown: function(a) {
						c.event.remove(this, b, a && a.selector ? Na : Ma)
					}
				}
			});
			if (!c.support.submitBubbles) c.event.special.submit = {
				setup: function() {
					if (c.nodeName(this,
						"form")) return false;
					else c.event.add(this, "click.specialSubmit", function(a) {
						var b = a.target,
							d = c.nodeName(b, "input") ? b.type : "";
						(d === "submit" || d === "image") && c(b).closest("form").length && z("submit", this, arguments)
					}), c.event.add(this, "keypress.specialSubmit", function(a) {
						var b = a.target,
							d = c.nodeName(b, "input") ? b.type : "";
						(d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13 && z("submit", this, arguments)
					})
				},
				teardown: function() {
					c.event.remove(this, ".specialSubmit")
				}
			};
			if (!c.support.changeBubbles) {
				var R,
					Oa = function(a) {
						var b = c.nodeName(a, "input") ? a.type : "",
							d = a.value;
						if (b === "radio" || b === "checkbox") d = a.checked;
						else if (b === "select-multiple") d = a.selectedIndex > -1 ? c.map(a.options, function(a) {
							return a.selected
						}).join("-") : "";
						else if (c.nodeName(a, "select")) d = a.selectedIndex;
						return d
					}, ba = function(a, b) {
						var d = a.target,
							e, f;
						if (oa.test(d.nodeName) && !d.readOnly && (e = c._data(d, "_change_data"), f = Oa(d), (a.type !== "focusout" || d.type !== "radio") && c._data(d, "_change_data", f), !(e === l || f === e)))
							if (e != null || f) a.type = "change",
						a.liveFired = l, c.event.trigger(a, b, d)
					};
				c.event.special.change = {
					filters: {
						focusout: ba,
						beforedeactivate: ba,
						click: function(a) {
							var b = a.target,
								d = c.nodeName(b, "input") ? b.type : "";
							(d === "radio" || d === "checkbox" || c.nodeName(b, "select")) && ba.call(this, a)
						},
						keydown: function(a) {
							var b = a.target,
								d = c.nodeName(b, "input") ? b.type : "";
							(a.keyCode === 13 && !c.nodeName(b, "textarea") || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple") && ba.call(this, a)
						},
						beforeactivate: function(a) {
							a = a.target;
							c._data(a, "_change_data",
								Oa(a))
						}
					},
					setup: function() {
						if (this.type === "file") return false;
						for (var a in R) c.event.add(this, a + ".specialChange", R[a]);
						return oa.test(this.nodeName)
					},
					teardown: function() {
						c.event.remove(this, ".specialChange");
						return oa.test(this.nodeName)
					}
				};
				R = c.event.special.change.filters;
				R.focus = R.beforeactivate
			}
			c.support.focusinBubbles || c.each({
				focus: "focusin",
				blur: "focusout"
			}, function(a, b) {
				function d(a) {
					var d = c.event.fix(a);
					d.type = b;
					d.originalEvent = {};
					c.event.trigger(d, null, d.target);
					d.isDefaultPrevented() && a.preventDefault()
				}
				var e = 0;
				c.event.special[b] = {
					setup: function() {
						e++ === 0 && m.addEventListener(a, d, true)
					},
					teardown: function() {
						--e === 0 && m.removeEventListener(a, d, true)
					}
				}
			});
			c.each(["bind", "one"], function(a, b) {
				c.fn[b] = function(a, e, f) {
					var g;
					if (typeof a === "object") {
						for (var h in a) this[b](h, e, a[h], f);
						return this
					}
					if (arguments.length === 2 || e === false) f = e, e = l;
					b === "one" ? (g = function(a) {
						c(this).unbind(a, g);
						return f.apply(this, arguments)
					}, g.guid = f.guid || c.guid++) : g = f;
					if (a === "unload" && b !== "one") this.one(a, e, f);
					else {
						h = 0;
						for (var k = this.length; h <
							k; h++) c.event.add(this[h], a, g, e)
					}
					return this
				}
			});
			c.fn.extend({
				unbind: function(a, b) {
					if (typeof a === "object" && !a.preventDefault)
						for (var d in a) this.unbind(d, a[d]);
					else {
						d = 0;
						for (var e = this.length; d < e; d++) c.event.remove(this[d], a, b)
					}
					return this
				},
				delegate: function(a, b, c, e) {
					return this.live(b, c, e, a)
				},
				undelegate: function(a, b, c) {
					return arguments.length === 0 ? this.unbind("live") : this.die(b, null, c, a)
				},
				trigger: function(a, b) {
					return this.each(function() {
						c.event.trigger(a, b, this)
					})
				},
				triggerHandler: function(a, b) {
					if (this[0]) return c.event.trigger(a,
						b, this[0], true)
				},
				toggle: function(a) {
					var b = arguments,
						d = a.guid || c.guid++,
						e = 0,
						f = function(d) {
							var f = (c.data(this, "lastToggle" + a.guid) || 0) % e;
							c.data(this, "lastToggle" + a.guid, f + 1);
							d.preventDefault();
							return b[f].apply(this, arguments) || false
						};
					for (f.guid = d; e < b.length;) b[e++].guid = d;
					return this.click(f)
				},
				hover: function(a, b) {
					return this.mouseenter(a).mouseleave(b || a)
				}
			});
			var pa = {
				focus: "focusin",
				blur: "focusout",
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			};
			c.each(["live", "die"], function(a, b) {
				c.fn[b] = function(a,
					e, f, g) {
					var h = 0,
						k, o, p = g || this.selector,
						j = g ? this : c(this.context);
					if (typeof a === "object" && !a.preventDefault) {
						for (k in a) j[b](k, e, a[k], p);
						return this
					}
					if (b === "die" && !a && g && g.charAt(0) === ".") return j.unbind(g), this;
					if (e === false || c.isFunction(e)) f = e || w, e = l;
					for (a = (a || "").split(" ");
						(g = a[h++]) != null;)
						if (k = fa.exec(g), o = "", k && (o = k[0], g = g.replace(fa, "")), g === "hover") a.push("mouseenter" + o, "mouseleave" + o);
						else
					if (k = g, pa[g] ? (a.push(pa[g] + o), g += o) : g = (pa[g] || g) + o, b === "live") {
						o = 0;
						for (var m = j.length; o < m; o++) c.event.add(j[o],
							"live." + X(g, p), {
								data: e,
								selector: p,
								handler: f,
								origType: g,
								origHandler: f,
								preType: k
							})
					} else j.unbind("live." + X(g, p), f);
					return this
				}
			});
			c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(a, b) {
				c.fn[b] = function(a, c) {
					c == null && (c = a, a = null);
					return arguments.length > 0 ? this.bind(b, a, c) : this.trigger(b)
				};
				c.attrFn && (c.attrFn[b] = true)
			});
			(function() {
				function a(a,
					b, c, d, e, f) {
					for (var e = 0, g = d.length; e < g; e++) {
						var h = d[e];
						if (h) {
							for (var k = false, h = h[a]; h;) {
								if (h.sizcache === c) {
									k = d[h.sizset];
									break
								}
								if (h.nodeType === 1 && !f) h.sizcache = c, h.sizset = e;
								if (h.nodeName.toLowerCase() === b) {
									k = h;
									break
								}
								h = h[a]
							}
							d[e] = k
						}
					}
				}

				function b(a, b, c, d, e, f) {
					for (var e = 0, g = d.length; e < g; e++) {
						var h = d[e];
						if (h) {
							for (var k = false, h = h[a]; h;) {
								if (h.sizcache === c) {
									k = d[h.sizset];
									break
								}
								if (h.nodeType === 1) {
									if (!f) h.sizcache = c, h.sizset = e;
									if (typeof b !== "string") {
										if (h === b) {
											k = true;
											break
										}
									} else if (p.filter(b, [h]).length > 0) {
										k =
											h;
										break
									}
								}
								h = h[a]
							}
							d[e] = k
						}
					}
				}
				var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
					e = 0,
					f = Object.prototype.toString,
					g = false,
					h = true,
					k = /\\/g,
					o = /\W/;
				[0, 0].sort(function() {
						h = false;
						return 0
					});
				var p = function(a, b, c, e) {
					var c = c || [],
						g = b = b || m;
					if (b.nodeType !== 1 && b.nodeType !== 9) return [];
					if (!a || typeof a !== "string") return c;
					var h, k, o, l, s, B = true,
						A = p.isXML(b),
						v = [],
						w = a;
					do
						if (d.exec(""), h = d.exec(w))
							if (w = h[3], v.push(h[1]), h[2]) {
								l = h[3];
								break
							} while (h);
					if (v.length > 1 && q.exec(a))
						if (v.length === 2 && j.relative[v[0]]) k = y(v[0] + v[1], b);
						else
							for (k = j.relative[v[0]] ? [b] : p(v.shift(), b); v.length;) a = v.shift(), j.relative[a] && (a += v.shift()), k = y(a, k);
						else
					if (!e && v.length > 1 && b.nodeType === 9 && !A && j.match.ID.test(v[0]) && !j.match.ID.test(v[v.length - 1]) && (h = p.find(v.shift(), b, A), b = h.expr ? p.filter(h.expr, h.set)[0] : h.set[0]), b) {
						h = e ? {
							expr: v.pop(),
							set: r(e)
						} : p.find(v.pop(), v.length === 1 && (v[0] === "~" || v[0] === "+") && b.parentNode ? b.parentNode : b, A);
						k = h.expr ? p.filter(h.expr, h.set) :
							h.set;
						for (v.length > 0 ? o = r(k) : B = false; v.length;) h = s = v.pop(), j.relative[s] ? h = v.pop() : s = "", h == null && (h = b), j.relative[s](o, h, A)
					} else o = [];
					o || (o = k);
					o || p.error(s || a);
					if (f.call(o) === "[object Array]")
						if (B)
							if (b && b.nodeType === 1)
								for (a = 0; o[a] != null; a++) o[a] && (o[a] === true || o[a].nodeType === 1 && p.contains(b, o[a])) && c.push(k[a]);
							else
								for (a = 0; o[a] != null; a++) o[a] && o[a].nodeType === 1 && c.push(k[a]);
							else c.push.apply(c, o);
							else r(o, c);
					l && (p(l, g, c, e), p.uniqueSort(c));
					return c
				};
				p.uniqueSort = function(a) {
					if (w && (g = h, a.sort(w),
						g))
						for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
					return a
				};
				p.matches = function(a, b) {
					return p(a, null, null, b)
				};
				p.matchesSelector = function(a, b) {
					return p(b, null, null, [a]).length > 0
				};
				p.find = function(a, b, c) {
					var d;
					if (!a) return [];
					for (var e = 0, f = j.order.length; e < f; e++) {
						var g, h = j.order[e];
						if (g = j.leftMatch[h].exec(a)) {
							var o = g[1];
							g.splice(1, 1);
							if (o.substr(o.length - 1) !== "\\" && (g[1] = (g[1] || "").replace(k, ""), d = j.find[h](g, b, c), d != null)) {
								a = a.replace(j.match[h], "");
								break
							}
						}
					}
					d || (d = typeof b.getElementsByTagName !==
						"undefined" ? b.getElementsByTagName("*") : []);
					return {
						set: d,
						expr: a
					}
				};
				p.filter = function(a, b, c, d) {
					for (var e, f, g = a, h = [], k = b, o = b && b[0] && p.isXML(b[0]); a && b.length;) {
						for (var m in j.filter)
							if ((e = j.leftMatch[m].exec(a)) != null && e[2]) {
								var s, v, r = j.filter[m];
								v = e[1];
								f = false;
								e.splice(1, 1);
								if (v.substr(v.length - 1) !== "\\") {
									k === h && (h = []);
									if (j.preFilter[m])
										if (e = j.preFilter[m](e, k, c, h, d, o)) {
											if (e === true) continue
										} else f = s = true;
									if (e)
										for (var q = 0;
											(v = k[q]) != null; q++)
											if (v) {
												s = r(v, e, q, k);
												var B = d ^ !! s;
												c && s != null ? B ? f = true : k[q] = false :
													B && (h.push(v), f = true)
											}
									if (s !== l) {
										c || (k = h);
										a = a.replace(j.match[m], "");
										if (!f) return [];
										break
									}
								}
							}
						if (a === g)
							if (f == null) p.error(a);
							else break;
						g = a
					}
					return k
				};
				p.error = function(a) {
					throw "Syntax error, unrecognized expression: " + a;
				};
				var j = p.selectors = {
					order: ["ID", "NAME", "TAG"],
					match: {
						ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
						CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
						NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
						ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
						TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
						CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
						POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
						PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
					},
					leftMatch: {},
					attrMap: {
						"class": "className",
						"for": "htmlFor"
					},
					attrHandle: {
						href: function(a) {
							return a.getAttribute("href")
						},
						type: function(a) {
							return a.getAttribute("type")
						}
					},
					relative: {
						"+": function(a, b) {
							var c =
								typeof b === "string",
								d = c && !o.test(b),
								c = c && !d;
							d && (b = b.toLowerCase());
							for (var d = 0, e = a.length, f; d < e; d++)
								if (f = a[d]) {
									for (;
										(f = f.previousSibling) && f.nodeType !== 1;);
									a[d] = c || f && f.nodeName.toLowerCase() === b ? f || false : f === b
								}
							c && p.filter(b, a, true)
						},
						">": function(a, b) {
							var c, d = typeof b === "string",
								e = 0,
								f = a.length;
							if (d && !o.test(b))
								for (b = b.toLowerCase(); e < f; e++) {
									if (c = a[e]) c = c.parentNode, a[e] = c.nodeName.toLowerCase() === b ? c : false
								} else {
									for (; e < f; e++)(c = a[e]) && (a[e] = d ? c.parentNode : c.parentNode === b);
									d && p.filter(b, a, true)
								}
						},
						"": function(c, d, f) {
							var g, h = e++,
								k = b;
							typeof d === "string" && !o.test(d) && (g = d = d.toLowerCase(), k = a);
							k("parentNode", d, h, c, g, f)
						},
						"~": function(c, d, f) {
							var g, h = e++,
								k = b;
							typeof d === "string" && !o.test(d) && (g = d = d.toLowerCase(), k = a);
							k("previousSibling", d, h, c, g, f)
						}
					},
					find: {
						ID: function(a, b, c) {
							if (typeof b.getElementById !== "undefined" && !c) return (a = b.getElementById(a[1])) && a.parentNode ? [a] : []
						},
						NAME: function(a, b) {
							if (typeof b.getElementsByName !== "undefined") {
								for (var c = [], d = b.getElementsByName(a[1]), e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") ===
									a[1] && c.push(d[e]);
								return c.length === 0 ? null : c
							}
						},
						TAG: function(a, b) {
							if (typeof b.getElementsByTagName !== "undefined") return b.getElementsByTagName(a[1])
						}
					},
					preFilter: {
						CLASS: function(a, b, c, d, e, f) {
							a = " " + a[1].replace(k, "") + " ";
							if (f) return a;
							for (var f = 0, g;
								(g = b[f]) != null; f++) g && (e ^ (g.className && (" " + g.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(g) : c && (b[f] = false));
							return false
						},
						ID: function(a) {
							return a[1].replace(k, "")
						},
						TAG: function(a) {
							return a[1].replace(k, "").toLowerCase()
						},
						CHILD: function(a) {
							if (a[1] ===
								"nth") {
								a[2] || p.error(a[0]);
								a[2] = a[2].replace(/^\+|\s*/g, "");
								var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
								a[2] = b[1] + (b[2] || 1) - 0;
								a[3] = b[3] - 0
							} else a[2] && p.error(a[0]);
							a[0] = e++;
							return a
						},
						ATTR: function(a, b, c, d, e, f) {
							b = a[1] = a[1].replace(k, "");
							!f && j.attrMap[b] && (a[1] = j.attrMap[b]);
							a[4] = (a[4] || a[5] || "").replace(k, "");
							a[2] === "~=" && (a[4] = " " + a[4] + " ");
							return a
						},
						PSEUDO: function(a, b, c, e, f) {
							if (a[1] === "not")
								if ((d.exec(a[3]) || "").length > 1 ||
									/^\w/.test(a[3])) a[3] = p(a[3], null, null, b);
								else return a = p.filter(a[3], b, c, 1 ^ f), c || e.push.apply(e, a), false;
								else
							if (j.match.POS.test(a[0]) || j.match.CHILD.test(a[0])) return true;
							return a
						},
						POS: function(a) {
							a.unshift(true);
							return a
						}
					},
					filters: {
						enabled: function(a) {
							return a.disabled === false && a.type !== "hidden"
						},
						disabled: function(a) {
							return a.disabled === true
						},
						checked: function(a) {
							return a.checked === true
						},
						selected: function(a) {
							return a.selected === true
						},
						parent: function(a) {
							return !!a.firstChild
						},
						empty: function(a) {
							return !a.firstChild
						},
						has: function(a, b, c) {
							return !!p(c[3], a).length
						},
						header: function(a) {
							return /h\d/i.test(a.nodeName)
						},
						text: function(a) {
							var b = a.getAttribute("type"),
								c = a.type;
							return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
						},
						radio: function(a) {
							return a.nodeName.toLowerCase() === "input" && "radio" === a.type
						},
						checkbox: function(a) {
							return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
						},
						file: function(a) {
							return a.nodeName.toLowerCase() === "input" && "file" === a.type
						},
						password: function(a) {
							return a.nodeName.toLowerCase() ===
								"input" && "password" === a.type
						},
						submit: function(a) {
							var b = a.nodeName.toLowerCase();
							return (b === "input" || b === "button") && "submit" === a.type
						},
						image: function(a) {
							return a.nodeName.toLowerCase() === "input" && "image" === a.type
						},
						reset: function(a) {
							var b = a.nodeName.toLowerCase();
							return (b === "input" || b === "button") && "reset" === a.type
						},
						button: function(a) {
							var b = a.nodeName.toLowerCase();
							return b === "input" && "button" === a.type || b === "button"
						},
						input: function(a) {
							return /input|select|textarea|button/i.test(a.nodeName)
						},
						focus: function(a) {
							return a ===
								a.ownerDocument.activeElement
						}
					},
					setFilters: {
						first: function(a, b) {
							return b === 0
						},
						last: function(a, b, c, d) {
							return b === d.length - 1
						},
						even: function(a, b) {
							return b % 2 === 0
						},
						odd: function(a, b) {
							return b % 2 === 1
						},
						lt: function(a, b, c) {
							return b < c[3] - 0
						},
						gt: function(a, b, c) {
							return b > c[3] - 0
						},
						nth: function(a, b, c) {
							return c[3] - 0 === b
						},
						eq: function(a, b, c) {
							return c[3] - 0 === b
						}
					},
					filter: {
						PSEUDO: function(a, b, c, d) {
							var e = b[1],
								f = j.filters[e];
							if (f) return f(a, c, b, d);
							else if (e === "contains") return (a.textContent || a.innerText || p.getText([a]) || "").indexOf(b[3]) >=
								0;
							else if (e === "not") {
								b = b[3];
								c = 0;
								for (d = b.length; c < d; c++)
									if (b[c] === a) return false;
								return true
							} else p.error(e)
						},
						CHILD: function(a, b) {
							var c = b[1],
								d = a;
							switch (c) {
								case "only":
								case "first":
									for (; d = d.previousSibling;)
										if (d.nodeType === 1) return false;
									if (c === "first") return true;
									d = a;
								case "last":
									for (; d = d.nextSibling;)
										if (d.nodeType === 1) return false;
									return true;
								case "nth":
									var c = b[2],
										e = b[3];
									if (c === 1 && e === 0) return true;
									var f = b[0],
										g = a.parentNode;
									if (g && (g.sizcache !== f || !a.nodeIndex)) {
										for (var h = 0, d = g.firstChild; d; d = d.nextSibling)
											if (d.nodeType ===
												1) d.nodeIndex = ++h;
										g.sizcache = f
									}
									d = a.nodeIndex - e;
									return c === 0 ? d === 0 : d % c === 0 && d / c >= 0
							}
						},
						ID: function(a, b) {
							return a.nodeType === 1 && a.getAttribute("id") === b
						},
						TAG: function(a, b) {
							return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
						},
						CLASS: function(a, b) {
							return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
						},
						ATTR: function(a, b) {
							var c = b[1],
								c = j.attrHandle[c] ? j.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
								d = c + "",
								e = b[2],
								f = b[4];
							return c == null ? e === "!=" : e === "=" ? d === f : e === "*=" ? d.indexOf(f) >=
								0 : e === "~=" ? (" " + d + " ").indexOf(f) >= 0 : !f ? d && c !== false : e === "!=" ? d !== f : e === "^=" ? d.indexOf(f) === 0 : e === "$=" ? d.substr(d.length - f.length) === f : e === "|=" ? d === f || d.substr(0, f.length + 1) === f + "-" : false
						},
						POS: function(a, b, c, d) {
							var e = j.setFilters[b[2]];
							if (e) return e(a, c, b, d)
						}
					}
				}, q = j.match.POS,
					B = function(a, b) {
						return "\\" + (b - 0 + 1)
					}, s;
				for (s in j.match) j.match[s] = RegExp(j.match[s].source + /(?![^\[]*\])(?![^\(]*\))/.source), j.leftMatch[s] = RegExp(/(^(?:.|\r|\n)*?)/.source + j.match[s].source.replace(/\\(\d+)/g, B));
				var r = function(a,
					b) {
					a = Array.prototype.slice.call(a, 0);
					return b ? (b.push.apply(b, a), b) : a
				};
				try {
					Array.prototype.slice.call(m.documentElement.childNodes, 0)
				} catch (u) {
					r = function(a, b) {
						var c = 0,
							d = b || [];
						if (f.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
						else if (typeof a.length === "number")
							for (var e = a.length; c < e; c++) d.push(a[c]);
						else
							for (; a[c]; c++) d.push(a[c]);
						return d
					}
				}
				var w, A;
				m.documentElement.compareDocumentPosition ? w = function(a, b) {
					return a === b ? (g = true, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ?
						a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1
				} : (w = function(a, b) {
					if (a === b) return g = true, 0;
					else if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
					var c, d, e = [],
						f = [];
					c = a.parentNode;
					d = b.parentNode;
					var h = c;
					if (c === d) return A(a, b);
					else if (c) {
						if (!d) return 1
					} else return -1;
					for (; h;) e.unshift(h), h = h.parentNode;
					for (h = d; h;) f.unshift(h), h = h.parentNode;
					c = e.length;
					d = f.length;
					for (h = 0; h < c && h < d; h++)
						if (e[h] !== f[h]) return A(e[h], f[h]);
					return h === c ? A(a, f[h], -1) : A(e[h], b, 1)
				}, A = function(a,
					b, c) {
					if (a === b) return c;
					for (a = a.nextSibling; a;) {
						if (a === b) return -1;
						a = a.nextSibling
					}
					return 1
				});
				p.getText = function(a) {
					for (var b = "", c, d = 0; a[d]; d++) c = a[d], c.nodeType === 3 || c.nodeType === 4 ? b += c.nodeValue : c.nodeType !== 8 && (b += p.getText(c.childNodes));
					return b
				};
				(function() {
					var a = m.createElement("div"),
						b = "script" + (new Date).getTime(),
						c = m.documentElement;
					a.innerHTML = "<a name='" + b + "'/>";
					c.insertBefore(a, c.firstChild);
					if (m.getElementById(b)) j.find.ID = function(a, b, c) {
						if (typeof b.getElementById !== "undefined" && !c) return (b =
							b.getElementById(a[1])) ? b.id === a[1] || typeof b.getAttributeNode !== "undefined" && b.getAttributeNode("id").nodeValue === a[1] ? [b] : l : []
					}, j.filter.ID = function(a, b) {
						var c = typeof a.getAttributeNode !== "undefined" && a.getAttributeNode("id");
						return a.nodeType === 1 && c && c.nodeValue === b
					};
					c.removeChild(a);
					c = a = null
				})();
				(function() {
					var a = m.createElement("div");
					a.appendChild(m.createComment(""));
					if (a.getElementsByTagName("*").length > 0) j.find.TAG = function(a, b) {
						var c = b.getElementsByTagName(a[1]);
						if (a[1] === "*") {
							for (var d =
								[], e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
							c = d
						}
						return c
					};
					a.innerHTML = "<a href='#'></a>";
					if (a.firstChild && typeof a.firstChild.getAttribute !== "undefined" && a.firstChild.getAttribute("href") !== "#") j.attrHandle.href = function(a) {
						return a.getAttribute("href", 2)
					};
					a = null
				})();
				m.querySelectorAll && function() {
					var a = p,
						b = m.createElement("div");
					b.innerHTML = "<p class='TEST'></p>";
					if (!(b.querySelectorAll && b.querySelectorAll(".TEST").length === 0)) {
						p = function(b, c, d, e) {
							c = c || m;
							if (!e && !p.isXML(c)) {
								var f = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
								if (f && (c.nodeType === 1 || c.nodeType === 9))
									if (f[1]) return r(c.getElementsByTagName(b), d);
									else
								if (f[2] && j.find.CLASS && c.getElementsByClassName) return r(c.getElementsByClassName(f[2]), d);
								if (c.nodeType === 9) {
									if (b === "body" && c.body) return r([c.body], d);
									else if (f && f[3]) {
										var g = c.getElementById(f[3]);
										if (g && g.parentNode) {
											if (g.id === f[3]) return r([g], d)
										} else return r([], d)
									}
									try {
										return r(c.querySelectorAll(b), d)
									} catch (h) {}
								} else if (c.nodeType === 1 && c.nodeName.toLowerCase() !== "object") {
									var f = c,
										k = (g = c.getAttribute("id")) ||
											"__sizzle__",
										o = c.parentNode,
										l = /^\s*[+~]/.test(b);
									g ? k = k.replace(/'/g, "\\$&") : c.setAttribute("id", k);
									if (l && o) c = c.parentNode;
									try {
										if (!l || o) return r(c.querySelectorAll("[id='" + k + "'] " + b), d)
									} catch (t) {} finally {
										g || f.removeAttribute("id")
									}
								}
							}
							return a(b, c, d, e)
						};
						for (var c in a) p[c] = a[c];
						b = null
					}
				}();
				(function() {
					var a = m.documentElement,
						b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
					if (b) {
						var c = !b.call(m.createElement("div"), "div"),
							d = false;
						try {
							b.call(m.documentElement, "[test!='']:sizzle")
						} catch (e) {
							d =
								true
						}
						p.matchesSelector = function(a, e) {
							e = e.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
							if (!p.isXML(a)) try {
								if (d || !j.match.PSEUDO.test(e) && !/!=/.test(e)) {
									var f = b.call(a, e);
									if (f || !c || a.document && a.document.nodeType !== 11) return f
								}
							} catch (g) {}
							return p(e, null, null, [a]).length > 0
						}
					}
				})();
				(function() {
					var a = m.createElement("div");
					a.innerHTML = "<div class='test e'></div><div class='test'></div>";
					if (a.getElementsByClassName && a.getElementsByClassName("e").length !== 0 && (a.lastChild.className = "e", a.getElementsByClassName("e").length !==
						1)) j.order.splice(1, 0, "CLASS"), j.find.CLASS = function(a, b, c) {
						if (typeof b.getElementsByClassName !== "undefined" && !c) return b.getElementsByClassName(a[1])
					}, a = null
				})();
				p.contains = m.documentElement.contains ? function(a, b) {
					return a !== b && (a.contains ? a.contains(b) : true)
				} : m.documentElement.compareDocumentPosition ? function(a, b) {
					return !!(a.compareDocumentPosition(b) & 16)
				} : function() {
					return false
				};
				p.isXML = function(a) {
					return (a = (a ? a.ownerDocument || a : 0).documentElement) ? a.nodeName !== "HTML" : false
				};
				var y = function(a,
					b) {
					for (var c, d = [], e = "", f = b.nodeType ? [b] : b; c = j.match.PSEUDO.exec(a);) e += c[0], a = a.replace(j.match.PSEUDO, "");
					a = j.relative[a] ? a + "*" : a;
					c = 0;
					for (var g = f.length; c < g; c++) p(a, f[c], d);
					return p.filter(e, d)
				};
				c.find = p;
				c.expr = p.selectors;
				c.expr[":"] = c.expr.filters;
				c.unique = p.uniqueSort;
				c.text = p.getText;
				c.isXMLDoc = p.isXML;
				c.contains = p.contains
			})();
			var yb = /Until$/,
				zb = /^(?:parents|prevUntil|prevAll)/,
				Ab = /,/,
				hb = /^.[^:#\[\.,]*$/,
				Bb = Array.prototype.slice,
				Pa = c.expr.match.POS,
				Cb = {
					children: true,
					contents: true,
					next: true,
					prev: true
				};
			c.fn.extend({
				find: function(a) {
					var b = this,
						d, e;
					if (typeof a !== "string") return c(a).filter(function() {
						for (d = 0, e = b.length; d < e; d++)
							if (c.contains(b[d], this)) return true
					});
					var f = this.pushStack("", "find", a),
						g, h, k;
					for (d = 0, e = this.length; d < e; d++)
						if (g = f.length, c.find(a, this[d], f), d > 0)
							for (h = g; h < f.length; h++)
								for (k = 0; k < g; k++)
									if (f[k] === f[h]) {
										f.splice(h--, 1);
										break
									}
					return f
				},
				has: function(a) {
					var b = c(a);
					return this.filter(function() {
						for (var a = 0, e = b.length; a < e; a++)
							if (c.contains(this, b[a])) return true
					})
				},
				not: function(a) {
					return this.pushStack(N(this,
						a, false), "not", a)
				},
				filter: function(a) {
					return this.pushStack(N(this, a, true), "filter", a)
				},
				is: function(a) {
					return !!a && (typeof a === "string" ? c.filter(a, this).length > 0 : this.filter(a).length > 0)
				},
				closest: function(a, b) {
					var d = [],
						e, f, g = this[0];
					if (c.isArray(a)) {
						var h, k = {}, o = 1;
						if (g && a.length) {
							for (e = 0, f = a.length; e < f; e++) h = a[e], k[h] || (k[h] = Pa.test(h) ? c(h, b || this.context) : h);
							for (; g && g.ownerDocument && g !== b;) {
								for (h in k) e = k[h], (e.jquery ? e.index(g) > -1 : c(g).is(e)) && d.push({
									selector: h,
									elem: g,
									level: o
								});
								g = g.parentNode;
								o++
							}
						}
						return d
					}
					h =
						Pa.test(a) || typeof a !== "string" ? c(a, b || this.context) : 0;
					for (e = 0, f = this.length; e < f; e++)
						for (g = this[e]; g;)
							if (h ? h.index(g) > -1 : c.find.matchesSelector(g, a)) {
								d.push(g);
								break
							} else
					if (g = g.parentNode, !g || !g.ownerDocument || g === b || g.nodeType === 11) break;
					d = d.length > 1 ? c.unique(d) : d;
					return this.pushStack(d, "closest", a)
				},
				index: function(a) {
					return !a ? this[0] && this[0].parentNode ? this.prevAll().length : -1 : typeof a === "string" ? c.inArray(this[0], c(a)) : c.inArray(a.jquery ? a[0] : a, this)
				},
				add: function(a, b) {
					var d = typeof a === "string" ?
						c(a, b) : c.makeArray(a && a.nodeType ? [a] : a),
						e = c.merge(this.get(), d);
					return this.pushStack(!d[0] || !d[0].parentNode || d[0].parentNode.nodeType === 11 || !e[0] || !e[0].parentNode || e[0].parentNode.nodeType === 11 ? e : c.unique(e))
				},
				andSelf: function() {
					return this.add(this.prevObject)
				}
			});
			c.each({
					parent: function(a) {
						return (a = a.parentNode) && a.nodeType !== 11 ? a : null
					},
					parents: function(a) {
						return c.dir(a, "parentNode")
					},
					parentsUntil: function(a, b, d) {
						return c.dir(a, "parentNode", d)
					},
					next: function(a) {
						return c.nth(a, 2, "nextSibling")
					},
					prev: function(a) {
						return c.nth(a, 2, "previousSibling")
					},
					nextAll: function(a) {
						return c.dir(a, "nextSibling")
					},
					prevAll: function(a) {
						return c.dir(a, "previousSibling")
					},
					nextUntil: function(a, b, d) {
						return c.dir(a, "nextSibling", d)
					},
					prevUntil: function(a, b, d) {
						return c.dir(a, "previousSibling", d)
					},
					siblings: function(a) {
						return c.sibling(a.parentNode.firstChild, a)
					},
					children: function(a) {
						return c.sibling(a.firstChild)
					},
					contents: function(a) {
						return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
					}
				},
				function(a, b) {
					c.fn[a] = function(d, e) {
						var f = c.map(this, b, d),
							g = Bb.call(arguments);
						yb.test(a) || (e = d);
						e && typeof e === "string" && (f = c.filter(e, f));
						f = this.length > 1 && !Cb[a] ? c.unique(f) : f;
						if ((this.length > 1 || Ab.test(e)) && zb.test(a)) f = f.reverse();
						return this.pushStack(f, a, g.join(","))
					}
				});
			c.extend({
				filter: function(a, b, d) {
					d && (a = ":not(" + a + ")");
					return b.length === 1 ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b)
				},
				dir: function(a, b, d) {
					for (var e = [], a = a[b]; a && a.nodeType !== 9 && (d === l || a.nodeType !== 1 || !c(a).is(d));) a.nodeType ===
						1 && e.push(a), a = a[b];
					return e
				},
				nth: function(a, b, c) {
					for (var b = b || 1, e = 0; a; a = a[c])
						if (a.nodeType === 1 && ++e === b) break;
					return a
				},
				sibling: function(a, b) {
					for (var c = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
					return c
				}
			});
			var Db = / jQuery\d+="(?:\d+|null)"/g,
				qa = /^\s+/,
				Qa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
				Ra = /<([\w:]+)/,
				Eb = /<tbody/i,
				Fb = /<|&#?\w+;/,
				Sa = /<(?:script|object|embed|option|style)/i,
				Ta = /checked\s*(?:[^=]|=\s*.checked.)/i,
				Gb = /\/(java|ecma)script/i,
				ib = /^\s*<!(?:\[CDATA\[|\-\-)/,
				y = {
					option: [1, "<select multiple='multiple'>", "</select>"],
					legend: [1, "<fieldset>", "</fieldset>"],
					thead: [1, "<table>", "</table>"],
					tr: [2, "<table><tbody>", "</tbody></table>"],
					td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
					col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
					area: [1, "<map>", "</map>"],
					_default: [0, "", ""]
				};
			y.optgroup = y.option;
			y.tbody = y.tfoot = y.colgroup = y.caption = y.thead;
			y.th = y.td;
			if (!c.support.htmlSerialize) y._default = [1, "div<div>", "</div>"];
			c.fn.extend({
				text: function(a) {
					return c.isFunction(a) ?
						this.each(function(b) {
							var d = c(this);
							d.text(a.call(this, b, d.text()))
						}) : typeof a !== "object" && a !== l ? this.empty().append((this[0] && this[0].ownerDocument || m).createTextNode(a)) : c.text(this)
				},
				wrapAll: function(a) {
					if (c.isFunction(a)) return this.each(function(b) {
						c(this).wrapAll(a.call(this, b))
					});
					if (this[0]) {
						var b = c(a, this[0].ownerDocument).eq(0).clone(true);
						this[0].parentNode && b.insertBefore(this[0]);
						b.map(function() {
							for (var a = this; a.firstChild && a.firstChild.nodeType === 1;) a = a.firstChild;
							return a
						}).append(this)
					}
					return this
				},
				wrapInner: function(a) {
					return c.isFunction(a) ? this.each(function(b) {
						c(this).wrapInner(a.call(this, b))
					}) : this.each(function() {
						var b = c(this),
							d = b.contents();
						d.length ? d.wrapAll(a) : b.append(a)
					})
				},
				wrap: function(a) {
					return this.each(function() {
						c(this).wrapAll(a)
					})
				},
				unwrap: function() {
					return this.parent().each(function() {
						c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
					}).end()
				},
				append: function() {
					return this.domManip(arguments, true, function(a) {
						this.nodeType === 1 && this.appendChild(a)
					})
				},
				prepend: function() {
					return this.domManip(arguments,
						true, function(a) {
							this.nodeType === 1 && this.insertBefore(a, this.firstChild)
						})
				},
				before: function() {
					if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(a) {
						this.parentNode.insertBefore(a, this)
					});
					else if (arguments.length) {
						var a = c(arguments[0]);
						a.push.apply(a, this.toArray());
						return this.pushStack(a, "before", arguments)
					}
				},
				after: function() {
					if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(a) {
						this.parentNode.insertBefore(a, this.nextSibling)
					});
					else if (arguments.length) {
						var a =
							this.pushStack(this, "after", arguments);
						a.push.apply(a, c(arguments[0]).toArray());
						return a
					}
				},
				remove: function(a, b) {
					for (var d = 0, e;
						(e = this[d]) != null; d++)
						if (!a || c.filter(a, [e]).length)!b && e.nodeType === 1 && (c.cleanData(e.getElementsByTagName("*")), c.cleanData([e])), e.parentNode && e.parentNode.removeChild(e);
					return this
				},
				empty: function() {
					for (var a = 0, b;
						(b = this[a]) != null; a++)
						for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
					return this
				},
				clone: function(a, b) {
					a =
						a == null ? false : a;
					b = b == null ? a : b;
					return this.map(function() {
						return c.clone(this, a, b)
					})
				},
				html: function(a) {
					if (a === l) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Db, "") : null;
					else if (typeof a === "string" && !Sa.test(a) && (c.support.leadingWhitespace || !qa.test(a)) && !y[(Ra.exec(a) || ["", ""])[1].toLowerCase()]) {
						a = a.replace(Qa, "<$1></$2>");
						try {
							for (var b = 0, d = this.length; b < d; b++)
								if (this[b].nodeType === 1) c.cleanData(this[b].getElementsByTagName("*")), this[b].innerHTML = a
						} catch (e) {
							this.empty().append(a)
						}
					} else c.isFunction(a) ?
						this.each(function(b) {
							var d = c(this);
							d.html(a.call(this, b, d.html()))
						}) : this.empty().append(a);
					return this
				},
				replaceWith: function(a) {
					if (this[0] && this[0].parentNode) {
						if (c.isFunction(a)) return this.each(function(b) {
							var d = c(this),
								e = d.html();
							d.replaceWith(a.call(this, b, e))
						});
						typeof a !== "string" && (a = c(a).detach());
						return this.each(function() {
							var b = this.nextSibling,
								d = this.parentNode;
							c(this).remove();
							b ? c(b).before(a) : c(d).append(a)
						})
					} else return this.length ? this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith",
						a) : this
				},
				detach: function(a) {
					return this.remove(a, true)
				},
				domManip: function(a, b, d) {
					var e, f, g, h = a[0],
						k = [];
					if (!c.support.checkClone && arguments.length === 3 && typeof h === "string" && Ta.test(h)) return this.each(function() {
						c(this).domManip(a, b, d, true)
					});
					if (c.isFunction(h)) return this.each(function(e) {
						var f = c(this);
						a[0] = h.call(this, e, b ? f.html() : l);
						f.domManip(a, b, d)
					});
					if (this[0]) {
						e = h && h.parentNode;
						e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? {
							fragment: e
						} : c.buildFragment(a, this,
							k);
						g = e.fragment;
						if (f = g.childNodes.length === 1 ? g = g.firstChild : g.firstChild) {
							b = b && c.nodeName(f, "tr");
							f = 0;
							for (var o = this.length, j = o - 1; f < o; f++) d.call(b ? c.nodeName(this[f], "table") ? this[f].getElementsByTagName("tbody")[0] || this[f].appendChild(this[f].ownerDocument.createElement("tbody")) : this[f] : this[f], e.cacheable || o > 1 && f < j ? c.clone(g, true, true) : g)
						}
						k.length && c.each(k, ta)
					}
					return this
				}
			});
			c.buildFragment = function(a, b, d) {
				var e, f, g, h;
				b && b[0] && (h = b[0].ownerDocument || b[0]);
				h.createDocumentFragment || (h = m);
				if (a.length ===
					1 && typeof a[0] === "string" && a[0].length < 512 && h === m && a[0].charAt(0) === "<" && !Sa.test(a[0]) && (c.support.checkClone || !Ta.test(a[0]))) f = true, (g = c.fragments[a[0]]) && g !== 1 && (e = g);
				e || (e = h.createDocumentFragment(), c.clean(a, h, e, d));
				f && (c.fragments[a[0]] = g ? e : 1);
				return {
					fragment: e,
					cacheable: f
				}
			};
			c.fragments = {};
			c.each({
				appendTo: "append",
				prependTo: "prepend",
				insertBefore: "before",
				insertAfter: "after",
				replaceAll: "replaceWith"
			}, function(a, b) {
				c.fn[a] = function(d) {
					var e = [],
						d = c(d),
						f = this.length === 1 && this[0].parentNode;
					if (f &&
						f.nodeType === 11 && f.childNodes.length === 1 && d.length === 1) return d[b](this[0]), this;
					else {
						for (var f = 0, g = d.length; f < g; f++) {
							var h = (f > 0 ? this.clone(true) : this).get();
							c(d[f])[b](h);
							e = e.concat(h)
						}
						return this.pushStack(e, a, d.selector)
					}
				}
			});
			c.extend({
				clone: function(a, b, d) {
					var e = a.cloneNode(true),
						f, g, h;
					if ((!c.support.noCloneEvent || !c.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !c.isXMLDoc(a)) {
						va(a, e);
						f = Y(a);
						g = Y(e);
						for (h = 0; f[h]; ++h) g[h] && va(f[h], g[h])
					}
					if (b && (ua(a, e), d)) {
						f = Y(a);
						g = Y(e);
						for (h = 0; f[h]; ++h) ua(f[h],
							g[h])
					}
					return e
				},
				clean: function(a, b, d, e) {
					b = b || m;
					typeof b.createElement === "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || m);
					for (var f = [], g, h = 0, k;
						(k = a[h]) != null; h++)
						if (typeof k === "number" && (k += ""), k) {
							if (typeof k === "string")
								if (Fb.test(k)) {
									k = k.replace(Qa, "<$1></$2>");
									g = (Ra.exec(k) || ["", ""])[1].toLowerCase();
									var o = y[g] || y._default,
										j = o[0],
										l = b.createElement("div");
									for (l.innerHTML = o[1] + k + o[2]; j--;) l = l.lastChild;
									if (!c.support.tbody) {
										j = Eb.test(k);
										o = g === "table" && !j ? l.firstChild && l.firstChild.childNodes :
											o[1] === "<table>" && !j ? l.childNodes : [];
										for (g = o.length - 1; g >= 0; --g) c.nodeName(o[g], "tbody") && !o[g].childNodes.length && o[g].parentNode.removeChild(o[g])
									}!c.support.leadingWhitespace && qa.test(k) && l.insertBefore(b.createTextNode(qa.exec(k)[0]), l.firstChild);
									k = l.childNodes
								} else k = b.createTextNode(k);
							var q;
							if (!c.support.appendChecked)
								if (k[0] && typeof(q = k.length) === "number")
									for (g = 0; g < q; g++) xa(k[g]);
								else xa(k);
							k.nodeType ? f.push(k) : f = c.merge(f, k)
						}
					if (d) {
						a = function(a) {
							return !a.type || Gb.test(a.type)
						};
						for (h = 0; f[h]; h++) e &&
							c.nodeName(f[h], "script") && (!f[h].type || f[h].type.toLowerCase() === "text/javascript") ? e.push(f[h].parentNode ? f[h].parentNode.removeChild(f[h]) : f[h]) : (f[h].nodeType === 1 && (b = c.grep(f[h].getElementsByTagName("script"), a), f.splice.apply(f, [h + 1, 0].concat(b))), d.appendChild(f[h]))
					}
					return f
				},
				cleanData: function(a) {
					for (var b, d, e = c.cache, f = c.expando, g = c.event.special, h = c.support.deleteExpando, k = 0, o;
						(o = a[k]) != null; k++)
						if (!o.nodeName || !c.noData[o.nodeName.toLowerCase()])
							if (d = o[c.expando]) {
								if ((b = e[d] && e[d][f]) &&
									b.events) {
									for (var j in b.events) g[j] ? c.event.remove(o, j) : c.removeEvent(o, j, b.handle);
									if (b.handle) b.handle.elem = null
								}
								h ? delete o[c.expando] : o.removeAttribute && o.removeAttribute(c.expando);
								delete e[d]
							}
				}
			});
			var ra = /alpha\([^)]*\)/i,
				Hb = /opacity=([^)]*)/,
				Ib = /([A-Z]|^ms)/g,
				Ua = /^-?\d+(?:px)?$/i,
				Jb = /^-?\d/,
				Kb = /^([\-+])=([\-+.\de]+)/,
				Lb = {
					position: "absolute",
					visibility: "hidden",
					display: "block"
				}, jb = ["Left", "Right"],
				kb = ["Top", "Bottom"],
				I, Va, Wa;
			c.fn.css = function(a, b) {
				return arguments.length === 2 && b === l ? this : c.access(this,
					a, b, true, function(a, b, f) {
						return f !== l ? c.style(a, b, f) : c.css(a, b)
					})
			};
			c.extend({
				cssHooks: {
					opacity: {
						get: function(a, b) {
							if (b) {
								var c = I(a, "opacity", "opacity");
								return c === "" ? "1" : c
							} else return a.style.opacity
						}
					}
				},
				cssNumber: {
					fillOpacity: true,
					fontWeight: true,
					lineHeight: true,
					opacity: true,
					orphans: true,
					widows: true,
					zIndex: true,
					zoom: true
				},
				cssProps: {
					"float": c.support.cssFloat ? "cssFloat" : "styleFloat"
				},
				style: function(a, b, d, e) {
					if (a && !(a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
						var f, g = c.camelCase(b),
							h = a.style,
							k = c.cssHooks[g],
							b = c.cssProps[g] || g;
						if (d !== l) {
							e = typeof d;
							if (e === "string" && (f = Kb.exec(d))) d = +(f[1] + 1) * +f[2] + parseFloat(c.css(a, b)), e = "number";
							if (!(d == null || e === "number" && isNaN(d)))
								if (e === "number" && !c.cssNumber[g] && (d += "px"), !k || !("set" in k) || (d = k.set(a, d)) !== l) try {
									h[b] = d
								} catch (j) {}
						} else return k && "get" in k && (f = k.get(a, false, e)) !== l ? f : h[b]
					}
				},
				css: function(a, b, d) {
					var e, f, b = c.camelCase(b);
					f = c.cssHooks[b];
					b = c.cssProps[b] || b;
					b === "cssFloat" && (b = "float");
					if (f && "get" in f && (e = f.get(a, true, d)) !== l) return e;
					else if (I) return I(a,
						b)
				},
				swap: function(a, b, c) {
					var e = {}, f;
					for (f in b) e[f] = a.style[f], a.style[f] = b[f];
					c.call(a);
					for (f in b) a.style[f] = e[f]
				}
			});
			c.curCSS = c.css;
			c.each(["height", "width"], function(a, b) {
				c.cssHooks[b] = {
					get: function(a, e, f) {
						var g;
						if (e) {
							if (a.offsetWidth !== 0) return ya(a, b, f);
							else c.swap(a, Lb, function() {
								g = ya(a, b, f)
							});
							return g
						}
					},
					set: function(a, b) {
						if (Ua.test(b)) {
							if (b = parseFloat(b), b >= 0) return b + "px"
						} else return b
					}
				}
			});
			if (!c.support.opacity) c.cssHooks.opacity = {
				get: function(a, b) {
					return Hb.test((b && a.currentStyle ? a.currentStyle.filter :
						a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
				},
				set: function(a, b) {
					var d = a.style,
						e = a.currentStyle,
						f = c.isNaN(b) ? "" : "alpha(opacity=" + b * 100 + ")",
						g = e && e.filter || d.filter || "";
					d.zoom = 1;
					if (b >= 1 && c.trim(g.replace(ra, "")) === "" && (d.removeAttribute("filter"), e && !e.filter)) return;
					d.filter = ra.test(g) ? g.replace(ra, f) : g + " " + f
				}
			};
			c(function() {
				if (!c.support.reliableMarginRight) c.cssHooks.marginRight = {
					get: function(a, b) {
						var d;
						c.swap(a, {
							display: "inline-block"
						}, function() {
							d = b ? I(a, "margin-right", "marginRight") :
								a.style.marginRight
						});
						return d
					}
				}
			});
			m.defaultView && m.defaultView.getComputedStyle && (Va = function(a, b) {
				var d, e, b = b.replace(Ib, "-$1").toLowerCase();
				if (!(e = a.ownerDocument.defaultView)) return l;
				if (e = e.getComputedStyle(a, null)) d = e.getPropertyValue(b), d === "" && !c.contains(a.ownerDocument.documentElement, a) && (d = c.style(a, b));
				return d
			});
			m.documentElement.currentStyle && (Wa = function(a, b) {
				var c, e = a.currentStyle && a.currentStyle[b],
					f = a.runtimeStyle && a.runtimeStyle[b],
					g = a.style;
				if (!Ua.test(e) && Jb.test(e)) {
					c = g.left;
					if (f) a.runtimeStyle.left = a.currentStyle.left;
					g.left = b === "fontSize" ? "1em" : e || 0;
					e = g.pixelLeft + "px";
					g.left = c;
					if (f) a.runtimeStyle.left = f
				}
				return e === "" ? "auto" : e
			});
			I = Va || Wa;
			if (c.expr && c.expr.filters) c.expr.filters.hidden = function(a) {
				var b = a.offsetHeight;
				return a.offsetWidth === 0 && b === 0 || !c.support.reliableHiddenOffsets && (a.style.display || c.css(a, "display")) === "none"
			}, c.expr.filters.visible = function(a) {
				return !c.expr.filters.hidden(a)
			};
			var Mb = /%20/g,
				lb = /\[\]$/,
				Xa = /\r?\n/g,
				Nb = /#.*$/,
				Ob = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
				Pb = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
				Qb = /^(?:GET|HEAD)$/,
				Rb = /^\/\//,
				Ya = /\?/,
				Sb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
				Tb = /^(?:select|textarea)/i,
				Aa = /\s+/,
				Ub = /([?&])_=[^&]*/,
				Za = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
				$a = c.fn.load,
				ga = {}, ab = {}, L, G, bb = ["*/"] + ["*"];
			try {
				L = ob.href
			} catch ($b) {
				L = m.createElement("a"), L.href = "", L = L.href
			}
			G = Za.exec(L.toLowerCase()) || [];
			c.fn.extend({
				load: function(a, b, d) {
					if (typeof a !==
						"string" && $a) return $a.apply(this, arguments);
					else if (!this.length) return this;
					var e = a.indexOf(" ");
					if (e >= 0) var f = a.slice(e, a.length),
					a = a.slice(0, e);
					e = "GET";
					b && (c.isFunction(b) ? (d = b, b = l) : typeof b === "object" && (b = c.param(b, c.ajaxSettings.traditional), e = "POST"));
					var g = this;
					c.ajax({
						url: a,
						type: e,
						dataType: "html",
						data: b,
						complete: function(a, b, e) {
							e = a.responseText;
							a.isResolved() && (a.done(function(a) {
								e = a
							}), g.html(f ? c("<div>").append(e.replace(Sb, "")).find(f) : e));
							d && g.each(d, [e, b, a])
						}
					});
					return this
				},
				serialize: function() {
					return c.param(this.serializeArray())
				},
				serializeArray: function() {
					return this.map(function() {
						return this.elements ? c.makeArray(this.elements) : this
					}).filter(function() {
						return this.name && !this.disabled && (this.checked || Tb.test(this.nodeName) || Pb.test(this.type))
					}).map(function(a, b) {
						var d = c(this).val();
						return d == null ? null : c.isArray(d) ? c.map(d, function(a) {
							return {
								name: b.name,
								value: a.replace(Xa, "\r\n")
							}
						}) : {
							name: b.name,
							value: d.replace(Xa, "\r\n")
						}
					}).get()
				}
			});
			c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a,
				b) {
				c.fn[b] = function(a) {
					return this.bind(b, a)
				}
			});
			c.each(["get", "post"], function(a, b) {
				c[b] = function(a, e, f, g) {
					c.isFunction(e) && (g = g || f, f = e, e = l);
					return c.ajax({
						type: b,
						url: a,
						data: e,
						success: f,
						dataType: g
					})
				}
			});
			c.extend({
				getScript: function(a, b) {
					return c.get(a, l, b, "script")
				},
				getJSON: function(a, b, d) {
					return c.get(a, b, d, "json")
				},
				ajaxSetup: function(a, b) {
					b ? Ba(a, c.ajaxSettings) : (b = a, a = c.ajaxSettings);
					Ba(a, b);
					return a
				},
				ajaxSettings: {
					url: L,
					isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(G[1]),
					global: true,
					type: "GET",
					contentType: "application/x-www-form-urlencoded",
					processData: true,
					async: true,
					accepts: {
						xml: "application/xml, text/xml",
						html: "text/html",
						text: "text/plain",
						json: "application/json, text/javascript",
						"*": bb
					},
					contents: {
						xml: /xml/,
						html: /html/,
						json: /json/
					},
					responseFields: {
						xml: "responseXML",
						text: "responseText"
					},
					converters: {
						"* text": j.String,
						"text html": true,
						"text json": c.parseJSON,
						"text xml": c.parseXML
					},
					flatOptions: {
						context: true,
						url: true
					}
				},
				ajaxPrefilter: za(ga),
				ajaxTransport: za(ab),
				ajax: function(a,
					b) {
					function d(a, b, d, m) {
						if (y !== 2) {
							y = 2;
							w && clearTimeout(w);
							A = l;
							r = m || "";
							t.readyState = a > 0 ? 4 : 0;
							var q, s, u, m = b;
							if (d) {
								var x = e,
									v = t,
									V = x.contents,
									z = x.dataTypes,
									W = x.responseFields,
									F, C, D, K;
								for (C in W) C in d && (v[W[C]] = d[C]);
								for (; z[0] === "*";) z.shift(), F === l && (F = x.mimeType || v.getResponseHeader("content-type"));
								if (F)
									for (C in V)
										if (V[C] && V[C].test(F)) {
											z.unshift(C);
											break
										}
								if (z[0] in d) D = z[0];
								else {
									for (C in d) {
										if (!z[0] || x.converters[C + " " + z[0]]) {
											D = C;
											break
										}
										K || (K = C)
									}
									D = D || K
								}
								D ? (D !== z[0] && z.unshift(D), d = d[D]) : d = void 0
							} else d =
								l; if (a >= 200 && a < 300 || a === 304) {
								if (e.ifModified) {
									if (F = t.getResponseHeader("Last-Modified")) c.lastModified[p] = F;
									if (F = t.getResponseHeader("Etag")) c.etag[p] = F
								}
								if (a === 304) m = "notmodified", q = true;
								else try {
									F = e;
									F.dataFilter && (d = F.dataFilter(d, F.dataType));
									var L = F.dataTypes;
									C = {};
									var G, I, O = L.length,
										J, P = L[0],
										H, M, Q, S, U;
									for (G = 1; G < O; G++) {
										if (G === 1)
											for (I in F.converters) typeof I === "string" && (C[I.toLowerCase()] = F.converters[I]);
										H = P;
										P = L[G];
										if (P === "*") P = H;
										else if (H !== "*" && H !== P) {
											M = H + " " + P;
											Q = C[M] || C["* " + P];
											if (!Q)
												for (S in U =
													l, C)
													if (J = S.split(" "), J[0] === H || J[0] === "*")
														if (U = C[J[1] + " " + P]) {
															S = C[S];
															S === true ? Q = U : U === true && (Q = S);
															break
														}!Q && !U && c.error("No conversion from " + M.replace(" ", " to "));
											Q !== true && (d = Q ? Q(d) : U(S(d)))
										}
									}
									s = d;
									m = "success";
									q = true
								} catch (R) {
									m = "parsererror", u = R
								}
							} else if (u = m, !m || a) m = "error", a < 0 && (a = 0);
							t.status = a;
							t.statusText = "" + (b || m);
							q ? h.resolveWith(f, [s, m, t]) : h.rejectWith(f, [t, m, u]);
							t.statusCode(j);
							j = l;
							E && g.trigger("ajax" + (q ? "Success" : "Error"), [t, e, q ? s : u]);
							k.resolveWith(f, [t, m]);
							E && (g.trigger("ajaxComplete", [t,
								e
							]), --c.active || c.event.trigger("ajaxStop"))
						}
					}
					typeof a === "object" && (b = a, a = l);
					var b = b || {}, e = c.ajaxSetup({}, b),
						f = e.context || e,
						g = f !== e && (f.nodeType || f instanceof c) ? c(f) : c.event,
						h = c.Deferred(),
						k = c._Deferred(),
						j = e.statusCode || {}, p, m = {}, q = {}, r, s, A, w, u, y = 0,
						E, x, t = {
							readyState: 0,
							setRequestHeader: function(a, b) {
								if (!y) {
									var c = a.toLowerCase(),
										a = q[c] = q[c] || a;
									m[a] = b
								}
								return this
							},
							getAllResponseHeaders: function() {
								return y === 2 ? r : null
							},
							getResponseHeader: function(a) {
								var b;
								if (y === 2) {
									if (!s)
										for (s = {}; b = Ob.exec(r);) s[b[1].toLowerCase()] =
											b[2];
									b = s[a.toLowerCase()]
								}
								return b === l ? null : b
							},
							overrideMimeType: function(a) {
								if (!y) e.mimeType = a;
								return this
							},
							abort: function(a) {
								a = a || "abort";
								A && A.abort(a);
								d(0, a);
								return this
							}
						};
					h.promise(t);
					t.success = t.done;
					t.error = t.fail;
					t.complete = k.done;
					t.statusCode = function(a) {
						if (a) {
							var b;
							if (y < 2)
								for (b in a) j[b] = [j[b], a[b]];
							else b = a[t.status], t.then(b, b)
						}
						return this
					};
					e.url = ((a || e.url) + "").replace(Nb, "").replace(Rb, G[1] + "//");
					e.dataTypes = c.trim(e.dataType || "*").toLowerCase().split(Aa);
					if (e.crossDomain == null) u = Za.exec(e.url.toLowerCase()),
					e.crossDomain = !(!u || !(u[1] != G[1] || u[2] != G[2] || (u[3] || (u[1] === "http:" ? 80 : 443)) != (G[3] || (G[1] === "http:" ? 80 : 443))));
					if (e.data && e.processData && typeof e.data !== "string") e.data = c.param(e.data, e.traditional);
					Z(ga, e, b, t);
					if (y === 2) return false;
					E = e.global;
					e.type = e.type.toUpperCase();
					e.hasContent = !Qb.test(e.type);
					E && c.active++ === 0 && c.event.trigger("ajaxStart");
					if (!e.hasContent && (e.data && (e.url += (Ya.test(e.url) ? "&" : "?") + e.data, delete e.data), p = e.url, e.cache === false)) {
						u = c.now();
						var z = e.url.replace(Ub, "$1_=" + u);
						e.url = z + (z === e.url ? (Ya.test(e.url) ? "&" : "?") + "_=" + u : "")
					}(e.data && e.hasContent && e.contentType !== false || b.contentType) && t.setRequestHeader("Content-Type", e.contentType);
					e.ifModified && (p = p || e.url, c.lastModified[p] && t.setRequestHeader("If-Modified-Since", c.lastModified[p]), c.etag[p] && t.setRequestHeader("If-None-Match", c.etag[p]));
					t.setRequestHeader("Accept", e.dataTypes[0] && e.accepts[e.dataTypes[0]] ? e.accepts[e.dataTypes[0]] + (e.dataTypes[0] !== "*" ? ", " + bb + "; q=0.01" : "") : e.accepts["*"]);
					for (x in e.headers) t.setRequestHeader(x,
						e.headers[x]);
					if (e.beforeSend && (e.beforeSend.call(f, t, e) === false || y === 2)) return t.abort(), false;
					for (x in {
						success: 1,
						error: 1,
						complete: 1
					}) t[x](e[x]);
					if (A = Z(ab, e, b, t)) {
						t.readyState = 1;
						E && g.trigger("ajaxSend", [t, e]);
						e.async && e.timeout > 0 && (w = setTimeout(function() {
							t.abort("timeout")
						}, e.timeout));
						try {
							y = 1, A.send(m, d)
						} catch (D) {
							y < 2 ? d(-1, D) : c.error(D)
						}
					} else d(-1, "No Transport");
					return t
				},
				param: function(a, b) {
					var d = [],
						e = function(a, b) {
							b = c.isFunction(b) ? b() : b;
							d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
						};
					if (b === l) b = c.ajaxSettings.traditional;
					if (c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a, function() {
						e(this.name, this.value)
					});
					else
						for (var f in a) ha(f, a[f], b, e);
					return d.join("&").replace(Mb, "+")
				}
			});
			c.extend({
				active: 0,
				lastModified: {},
				etag: {}
			});
			var Vb = c.now(),
				ca = /(\=)\?(&|$)|\?\?/i;
			c.ajaxSetup({
				jsonp: "callback",
				jsonpCallback: function() {
					return c.expando + "_" + Vb++
				}
			});
			c.ajaxPrefilter("json jsonp", function(a, b, d) {
				b = a.contentType === "application/x-www-form-urlencoded" && typeof a.data === "string";
				if (a.dataTypes[0] ===
					"jsonp" || a.jsonp !== false && (ca.test(a.url) || b && ca.test(a.data))) {
					var e, f = a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback,
						g = j[f],
						h = a.url,
						k = a.data,
						o = "$1" + f + "$2";
					a.jsonp !== false && (h = h.replace(ca, o), a.url === h && (b && (k = k.replace(ca, o)), a.data === k && (h += (/\?/.test(h) ? "&" : "?") + a.jsonp + "=" + f)));
					a.url = h;
					a.data = k;
					j[f] = function(a) {
						e = [a]
					};
					d.always(function() {
						j[f] = g;
						if (e && c.isFunction(g)) j[f](e[0])
					});
					a.converters["script json"] = function() {
						e || c.error(f + " was not called");
						return e[0]
					};
					a.dataTypes[0] = "json";
					return "script"
				}
			});
			c.ajaxSetup({
				accepts: {
					script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
				},
				contents: {
					script: /javascript|ecmascript/
				},
				converters: {
					"text script": function(a) {
						c.globalEval(a);
						return a
					}
				}
			});
			c.ajaxPrefilter("script", function(a) {
				if (a.cache === l) a.cache = false;
				if (a.crossDomain) a.type = "GET", a.global = false
			});
			c.ajaxTransport("script", function(a) {
				if (a.crossDomain) {
					var b, c = m.head || m.getElementsByTagName("head")[0] || m.documentElement;
					return {
						send: function(e, f) {
							b = m.createElement("script");
							b.async = "async";
							if (a.scriptCharset) b.charset = a.scriptCharset;
							b.src = a.url;
							b.onload = b.onreadystatechange = function(a, e) {
								if (e || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload = b.onreadystatechange = null, c && b.parentNode && c.removeChild(b), b = l, e || f(200, "success")
							};
							c.insertBefore(b, c.firstChild)
						},
						abort: function() {
							if (b) b.onload(0, 1)
						}
					}
				}
			});
			var sa = j.ActiveXObject ? function() {
					for (var a in H) H[a](0, 1)
				} : false,
				Wb = 0,
				H;
			c.ajaxSettings.xhr = j.ActiveXObject ?
				function() {
					var a;
					if (!(a = !this.isLocal && Ca())) a: {
						try {
							a = new j.ActiveXObject("Microsoft.XMLHTTP");
							break a
						} catch (b) {}
						a = void 0
					}
					return a
			} : Ca;
			(function(a) {
				c.extend(c.support, {
					ajax: !! a,
					cors: !! a && "withCredentials" in a
				})
			})(c.ajaxSettings.xhr());
			c.support.ajax && c.ajaxTransport(function(a) {
				if (!a.crossDomain || c.support.cors) {
					var b;
					return {
						send: function(d, e) {
							var f = a.xhr(),
								g, h;
							a.username ? f.open(a.type, a.url, a.async, a.username, a.password) : f.open(a.type, a.url, a.async);
							if (a.xhrFields)
								for (h in a.xhrFields) f[h] = a.xhrFields[h];
							a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType);
							!a.crossDomain && !d["X-Requested-With"] && (d["X-Requested-With"] = "XMLHttpRequest");
							try {
								for (h in d) f.setRequestHeader(h, d[h])
							} catch (k) {}
							f.send(a.hasContent && a.data || null);
							b = function(d, h) {
								var k, j, m, q, r;
								try {
									if (b && (h || f.readyState === 4)) {
										b = l;
										if (g) f.onreadystatechange = c.noop, sa && delete H[g];
										if (h) f.readyState !== 4 && f.abort();
										else {
											k = f.status;
											m = f.getAllResponseHeaders();
											q = {};
											if ((r = f.responseXML) && r.documentElement) q.xml = r;
											q.text = f.responseText;
											try {
												j =
													f.statusText
											} catch (u) {
												j = ""
											}!k && a.isLocal && !a.crossDomain ? k = q.text ? 200 : 404 : k === 1223 && (k = 204)
										}
									}
								} catch (A) {
									h || e(-1, A)
								}
								q && e(k, j, q, m)
							};
							!a.async || f.readyState === 4 ? b() : (g = ++Wb, sa && (H || (H = {}, c(j).unload(sa)), H[g] = b), f.onreadystatechange = b)
						},
						abort: function() {
							b && b(0, 1)
						}
					}
				}
			});
			var ia = {}, E, J, Xb = /^(?:toggle|show|hide)$/,
				Yb = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
				da, Ea = [
					["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
					["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
					["opacity"]
				],
				$;
			c.fn.extend({
				show: function(a,
					b, d) {
					if (a || a === 0) return this.animate(O("show", 3), a, b, d);
					else {
						for (var d = 0, e = this.length; d < e; d++)
							if (a = this[d], a.style) {
								b = a.style.display;
								if (!c._data(a, "olddisplay") && b === "none") b = a.style.display = "";
								b === "" && c.css(a, "display") === "none" && c._data(a, "olddisplay", Fa(a.nodeName))
							}
						for (d = 0; d < e; d++)
							if (a = this[d], a.style && (b = a.style.display, b === "" || b === "none")) a.style.display = c._data(a, "olddisplay") || "";
						return this
					}
				},
				hide: function(a, b, d) {
					if (a || a === 0) return this.animate(O("hide", 3), a, b, d);
					else {
						a = 0;
						for (b = this.length; a <
							b; a++) this[a].style && (d = c.css(this[a], "display"), d !== "none" && !c._data(this[a], "olddisplay") && c._data(this[a], "olddisplay", d));
						for (a = 0; a < b; a++)
							if (this[a].style) this[a].style.display = "none";
						return this
					}
				},
				_toggle: c.fn.toggle,
				toggle: function(a, b, d) {
					var e = typeof a === "boolean";
					c.isFunction(a) && c.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || e ? this.each(function() {
						var b = e ? a : c(this).is(":hidden");
						c(this)[b ? "show" : "hide"]()
					}) : this.animate(O("toggle", 3), a, b, d);
					return this
				},
				fadeTo: function(a, b, c,
					e) {
					return this.filter(":hidden").css("opacity", 0).show().end().animate({
						opacity: b
					}, a, c, e)
				},
				animate: function(a, b, d, e) {
					var f = c.speed(b, d, e);
					if (c.isEmptyObject(a)) return this.each(f.complete, [false]);
					a = c.extend({}, a);
					return this[f.queue === false ? "each" : "queue"](function() {
						var g;
						f.queue === false && c._mark(this);
						var b = c.extend({}, f),
							d = this.nodeType === 1,
							e = d && c(this).is(":hidden"),
							j, l, m, q, r;
						b.animatedProperties = {};
						for (m in a) {
							j = c.camelCase(m);
							m !== j && (a[j] = a[m], delete a[m]);
							l = a[j];
							c.isArray(l) ? (b.animatedProperties[j] =
								l[1], g = a[j] = l[0], l = g) : b.animatedProperties[j] = b.specialEasing && b.specialEasing[j] || b.easing || "swing";
							if (l === "hide" && e || l === "show" && !e) return b.complete.call(this);
							if (d && (j === "height" || j === "width"))
								if (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], c.css(this, "display") === "inline" && c.css(this, "float") === "none") c.support.inlineBlockNeedsLayout ? (l = Fa(this.nodeName), l === "inline" ? this.style.display = "inline-block" : (this.style.display = "inline", this.style.zoom = 1)) : this.style.display =
									"inline-block"
						}
						if (b.overflow != null) this.style.overflow = "hidden";
						for (m in a)
							if (d = new c.fx(this, b, m), l = a[m], Xb.test(l)) d[l === "toggle" ? e ? "show" : "hide" : l]();
							else j = Yb.exec(l), q = d.cur(), j ? (l = parseFloat(j[2]), r = j[3] || (c.cssNumber[m] ? "" : "px"), r !== "px" && (c.style(this, m, (l || 1) + r), q *= (l || 1) / d.cur(), c.style(this, m, q + r)), j[1] && (l = (j[1] === "-=" ? -1 : 1) * l + q), d.custom(q, l, r)) : d.custom(q, l, "");
						return true
					})
				},
				stop: function(a, b) {
					a && this.queue([]);
					this.each(function() {
						var a = c.timers,
							e = a.length;
						for (b || c._unmark(true, this); e--;)
							if (a[e].elem ===
								this) {
								if (b) a[e](true);
								a.splice(e, 1)
							}
					});
					b || this.dequeue();
					return this
				}
			});
			c.each({
				slideDown: O("show", 1),
				slideUp: O("hide", 1),
				slideToggle: O("toggle", 1),
				fadeIn: {
					opacity: "show"
				},
				fadeOut: {
					opacity: "hide"
				},
				fadeToggle: {
					opacity: "toggle"
				}
			}, function(a, b) {
				c.fn[a] = function(a, c, f) {
					return this.animate(b, a, c, f)
				}
			});
			c.extend({
				speed: function(a, b, d) {
					var e = a && typeof a === "object" ? c.extend({}, a) : {
						complete: d || !d && b || c.isFunction(a) && a,
						duration: a,
						easing: d && b || b && !c.isFunction(b) && b
					};
					e.duration = c.fx.off ? 0 : typeof e.duration ===
						"number" ? e.duration : e.duration in c.fx.speeds ? c.fx.speeds[e.duration] : c.fx.speeds._default;
					e.old = e.complete;
					e.complete = function(a) {
						c.isFunction(e.old) && e.old.call(this);
						e.queue !== false ? c.dequeue(this) : a !== false && c._unmark(this)
					};
					return e
				},
				easing: {
					linear: function(a, b, c, e) {
						return c + e * a
					},
					swing: function(a, b, c, e) {
						return (-Math.cos(a * Math.PI) / 2 + 0.5) * e + c
					}
				},
				timers: [],
				fx: function(a, b, c) {
					this.options = b;
					this.elem = a;
					this.prop = c;
					b.orig = b.orig || {}
				}
			});
			c.fx.prototype = {
				update: function() {
					this.options.step && this.options.step.call(this.elem,
						this.now, this);
					(c.fx.step[this.prop] || c.fx.step._default)(this)
				},
				cur: function() {
					if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
					var a, b = c.css(this.elem, this.prop);
					return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
				},
				custom: function(a, b, d) {
					function e(a) {
						return f.step(a)
					}
					var f = this,
						g = c.fx;
					this.startTime = $ || Da();
					this.start = a;
					this.end = b;
					this.unit = d || this.unit || (c.cssNumber[this.prop] ? "" : "px");
					this.now = this.start;
					this.pos = this.state = 0;
					e.elem =
						this.elem;
					e() && c.timers.push(e) && !da && (da = setInterval(g.tick, g.interval))
				},
				show: function() {
					this.options.orig[this.prop] = c.style(this.elem, this.prop);
					this.options.show = true;
					this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
					c(this.elem).show()
				},
				hide: function() {
					this.options.orig[this.prop] = c.style(this.elem, this.prop);
					this.options.hide = true;
					this.custom(this.cur(), 0)
				},
				step: function(a) {
					var b = $ || Da(),
						d = true,
						e = this.elem,
						f = this.options,
						g;
					if (a || b >= f.duration + this.startTime) {
						this.now = this.end;
						this.pos = this.state = 1;
						this.update();
						f.animatedProperties[this.prop] = true;
						for (g in f.animatedProperties) f.animatedProperties[g] !== true && (d = false);
						if (d) {
							f.overflow != null && !c.support.shrinkWrapBlocks && c.each(["", "X", "Y"], function(a, b) {
								e.style["overflow" + b] = f.overflow[a]
							});
							f.hide && c(e).hide();
							if (f.hide || f.show)
								for (var h in f.animatedProperties) c.style(e, h, f.orig[h]);
							f.complete.call(e)
						}
						return false
					} else f.duration == Infinity ? this.now = b : (a = b - this.startTime, this.state = a / f.duration, this.pos = c.easing[f.animatedProperties[this.prop]](this.state,
						a, 0, 1, f.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
					return true
				}
			};
			c.extend(c.fx, {
				tick: function() {
					for (var a = c.timers, b = 0; b < a.length; ++b) a[b]() || a.splice(b--, 1);
					a.length || c.fx.stop()
				},
				interval: 13,
				stop: function() {
					clearInterval(da);
					da = null
				},
				speeds: {
					slow: 600,
					fast: 200,
					_default: 400
				},
				step: {
					opacity: function(a) {
						c.style(a.elem, "opacity", a.now)
					},
					_default: function(a) {
						a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) :
							a.now) + a.unit : a.elem[a.prop] = a.now
					}
				}
			});
			if (c.expr && c.expr.filters) c.expr.filters.animated = function(a) {
				return c.grep(c.timers, function(b) {
					return a === b.elem
				}).length
			};
			var Zb = /^t(?:able|d|h)$/i,
				cb = /^(?:body|html)$/i;
			c.fn.offset = "getBoundingClientRect" in m.documentElement ? function(a) {
				var b = this[0],
					d;
				if (a) return this.each(function(b) {
					c.offset.setOffset(this, a, b)
				});
				if (!b || !b.ownerDocument) return null;
				if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
				try {
					d = b.getBoundingClientRect()
				} catch (e) {}
				var f =
					b.ownerDocument,
					g = f.documentElement;
				if (!d || !c.contains(g, b)) return d ? {
					top: d.top,
					left: d.left
				} : {
					top: 0,
					left: 0
				};
				b = f.body;
				f = ja(f);
				return {
					top: d.top + (f.pageYOffset || c.support.boxModel && g.scrollTop || b.scrollTop) - (g.clientTop || b.clientTop || 0),
					left: d.left + (f.pageXOffset || c.support.boxModel && g.scrollLeft || b.scrollLeft) - (g.clientLeft || b.clientLeft || 0)
				}
			} : function(a) {
				var b = this[0];
				if (a) return this.each(function(b) {
					c.offset.setOffset(this, a, b)
				});
				if (!b || !b.ownerDocument) return null;
				if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
				c.offset.initialize();
				var d, e = b.offsetParent,
					f = b.ownerDocument,
					g = f.documentElement,
					h = f.body;
				d = (f = f.defaultView) ? f.getComputedStyle(b, null) : b.currentStyle;
				for (var k = b.offsetTop, j = b.offsetLeft;
					(b = b.parentNode) && b !== h && b !== g;) {
					if (c.offset.supportsFixedPosition && d.position === "fixed") break;
					d = f ? f.getComputedStyle(b, null) : b.currentStyle;
					k -= b.scrollTop;
					j -= b.scrollLeft;
					if (b === e) {
						k += b.offsetTop;
						j += b.offsetLeft;
						if (c.offset.doesNotAddBorder && (!c.offset.doesAddBorderForTableAndCells || !Zb.test(b.nodeName))) k +=
							parseFloat(d.borderTopWidth) || 0, j += parseFloat(d.borderLeftWidth) || 0;
						e = b.offsetParent
					}
					c.offset.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, j += parseFloat(d.borderLeftWidth) || 0)
				}
				if (d.position === "relative" || d.position === "static") k += h.offsetTop, j += h.offsetLeft;
				c.offset.supportsFixedPosition && d.position === "fixed" && (k += Math.max(g.scrollTop, h.scrollTop), j += Math.max(g.scrollLeft, h.scrollLeft));
				return {
					top: k,
					left: j
				}
			};
			c.offset = {
				initialize: function() {
					var a =
						m.body,
						b = m.createElement("div"),
						d, e, f, g = parseFloat(c.css(a, "marginTop")) || 0;
					c.extend(b.style, {
						position: "absolute",
						top: 0,
						left: 0,
						margin: 0,
						border: 0,
						width: "1px",
						height: "1px",
						visibility: "hidden"
					});
					b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
					a.insertBefore(b,
						a.firstChild);
					d = b.firstChild;
					e = d.firstChild;
					f = d.nextSibling.firstChild.firstChild;
					this.doesNotAddBorder = e.offsetTop !== 5;
					this.doesAddBorderForTableAndCells = f.offsetTop === 5;
					e.style.position = "fixed";
					e.style.top = "20px";
					this.supportsFixedPosition = e.offsetTop === 20 || e.offsetTop === 15;
					e.style.position = e.style.top = "";
					d.style.overflow = "hidden";
					d.style.position = "relative";
					this.subtractsBorderForOverflowNotVisible = e.offsetTop === -5;
					this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== g;
					a.removeChild(b);
					c.offset.initialize =
						c.noop
				},
				bodyOffset: function(a) {
					var b = a.offsetTop,
						d = a.offsetLeft;
					c.offset.initialize();
					c.offset.doesNotIncludeMarginInBodyOffset && (b += parseFloat(c.css(a, "marginTop")) || 0, d += parseFloat(c.css(a, "marginLeft")) || 0);
					return {
						top: b,
						left: d
					}
				},
				setOffset: function(a, b, d) {
					var e = c.css(a, "position");
					if (e === "static") a.style.position = "relative";
					var f = c(a),
						g = f.offset(),
						h = c.css(a, "top"),
						k = c.css(a, "left"),
						j = {}, l = {};
					(e === "absolute" || e === "fixed") && c.inArray("auto", [h, k]) > -1 ? (l = f.position(), e = l.top, k = l.left) : (e = parseFloat(h) ||
							0, k = parseFloat(k) || 0);
					c.isFunction(b) && (b = b.call(a, d, g));
					if (b.top != null) j.top = b.top - g.top + e;
					if (b.left != null) j.left = b.left - g.left + k;
					"using" in b ? b.using.call(a, j) : f.css(j)
				}
			};
			c.fn.extend({
				position: function() {
					if (!this[0]) return null;
					var a = this[0],
						b = this.offsetParent(),
						d = this.offset(),
						e = cb.test(b[0].nodeName) ? {
							top: 0,
							left: 0
						} : b.offset();
					d.top -= parseFloat(c.css(a, "marginTop")) || 0;
					d.left -= parseFloat(c.css(a, "marginLeft")) || 0;
					e.top += parseFloat(c.css(b[0], "borderTopWidth")) || 0;
					e.left += parseFloat(c.css(b[0],
						"borderLeftWidth")) || 0;
					return {
						top: d.top - e.top,
						left: d.left - e.left
					}
				},
				offsetParent: function() {
					return this.map(function() {
						for (var a = this.offsetParent || m.body; a && !cb.test(a.nodeName) && c.css(a, "position") === "static";) a = a.offsetParent;
						return a
					})
				}
			});
			c.each(["Left", "Top"], function(a, b) {
				var d = "scroll" + b;
				c.fn[d] = function(b) {
					var f, g;
					if (b === l) {
						f = this[0];
						return !f ? null : (g = ja(f)) ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && g.document.documentElement[d] || g.document.body[d] : f[d]
					}
					return this.each(function() {
						(g =
							ja(this)) ? g.scrollTo(!a ? b : c(g).scrollLeft(), a ? b : c(g).scrollTop()) : this[d] = b
					})
				}
			});
			c.each(["Height", "Width"], function(a, b) {
				var d = b.toLowerCase();
				c.fn["inner" + b] = function() {
					var a = this[0];
					return a && a.style ? parseFloat(c.css(a, d, "padding")) : null
				};
				c.fn["outer" + b] = function(a) {
					var b = this[0];
					return b && b.style ? parseFloat(c.css(b, d, a ? "margin" : "border")) : null
				};
				c.fn[d] = function(a) {
					var f = this[0];
					if (!f) return a == null ? null : this;
					if (c.isFunction(a)) return this.each(function(b) {
						var f = c(this);
						f[d](a.call(this, b, f[d]()))
					});
					if (c.isWindow(f)) {
						var g = f.document.documentElement["client" + b],
							h = f.document.body;
						return f.document.compatMode === "CSS1Compat" && g || h && h["client" + b] || g
					} else return f.nodeType === 9 ? Math.max(f.documentElement["client" + b], f.body["scroll" + b], f.documentElement["scroll" + b], f.body["offset" + b], f.documentElement["offset" + b]) : a === l ? (f = c.css(f, d), g = parseFloat(f), c.isNaN(g) ? f : g) : this.css(d, typeof a === "string" ? a : a + "px")
				}
			});
			j.jQuery = j.$ = c
		})(window);
		q = ea = window.jQuery.noConflict(true);
		return {
			$: q,
			jQuery: ea
		}
	}(),
		q = z.$,
		ea = z.jQuery,
		ta = q('#mymouse'),
		z = navigator.appVersion.toLowerCase(),
		z = z.indexOf("msie") > -1 ? parseInt(z.replace(/.*msie[ ]/, "").match(/^[0-9]+/)) : 0,
		N = z != 0;
	/android|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
	q(function() {
		(function(j) {
			var l = {}, A = decodeURIComponent;
			q.each(j.attr("src").split("#").pop().split("&"), function() {
				var j = (this + "").split("=");
				l[A(j[0])] = A(j[1])
			});
			return q.extend({}, l)
		})(ta);
		window.giffy_bp_0013 = {
			canvas: null,
			ball: [],
			ballImageResource: [],
			subBall: [],
			subBallImageResource: [],
			actionCount: [],
			timerId: null,
			waitCnt: 0,
			curBallIdx: 0,
			mouseX: 0,
			mouseY: 0,
			init: function() {
				for (i = 0; i < 1; i++) {
					var j = "images/subball" + (i + 1) + ".png";
					giffy_bp_0013.ballImageResource[i] = new Image;
					giffy_bp_0013.ballImageResource[i].src = j
				}
				for (i = 0; i < 8; i++) j = "images/subball" + (i + 1) + ".png", giffy_bp_0013.subBallImageResource[i] =
					new Image, giffy_bp_0013.subBallImageResource[i].src = j;
				for (i = 0; i < 20; i++) {
					giffy_bp_0013.ball[i] = q("<div />", {
						id: "giffy_bp_0013_ball_" + i,
						no: i,
						css: {
							position: "absolute",
							visibility: "hidden",
							zIndex: "10000"
						},
						html: "",
						click: function() {}
					}).appendTo("body");
					giffy_bp_0013.subBall[i] = [];
					for (n = 0; n < 3; n++) giffy_bp_0013.subBall[i][n] = q("<div />", {
						id: "giffy_bp_0013_subball_" + i + "_" + n,
						no: i,
						subno: n,
						css: {
							position: "absolute",
							visibility: "hidden",
							zIndex: "10000"
						},
						html: "",
						click: function() {}
					}).appendTo("body");
					giffy_bp_0013.actionCount[i] =
						0
				}
				q("html").mousemove(function(j) {
					giffy_bp_0013.mouseX = j.pageX;
					giffy_bp_0013.mouseY = j.pageY;
					if (giffy_bp_0013.waitCnt == 0 && giffy_bp_0013.actionCount[giffy_bp_0013.curBallIdx] == 0) giffy_bp_0013.waitCnt = 2, giffy_bp_0013.actionCount[giffy_bp_0013.curBallIdx] = 1, giffy_bp_0013.curBallIdx = giffy_bp_0013.curBallIdx == 19 ? 0 : giffy_bp_0013.curBallIdx + 1
				});
				timerId = setInterval("giffy_bp_0013.action()", 50)
			},
			action: function() {
				for (i = 0; i < 20; i++) switch (giffy_bp_0013.actionCount[i]) {
					case 1:
						var j = giffy_bp_0013.ballImageResource[giffy_bp_0013.getRandomNum(1)];
						giffy_bp_0013.ball[i].css({
							background: "url(" + j.src + ") no-repeat",
							height: j.height,
							width: j.width
						});
						giffy_bp_0013.move(giffy_bp_0013.ball[i], {
							top: giffy_bp_0013.mouseY + 10,
							left: giffy_bp_0013.mouseX + 10
						});
						giffy_bp_0013.animateY(giffy_bp_0013.ball[i], giffy_bp_0013.mouseY, 100, "swing", function() {
							giffy_bp_0013.actionCount[q(this).attr("no")] = 2
						});
						giffy_bp_0013.setVisible(giffy_bp_0013.ball[i]);
						giffy_bp_0013.actionCount[i] = 0;
						break;
					case 2:
						giffy_bp_0013.setHidden(giffy_bp_0013.ball[i]);
						var l = giffy_bp_0013.ball[i].position();
						for (n = 0; n < 3; n++) giffy_bp_0013.move(giffy_bp_0013.subBall[i][n], l), giffy_bp_0013.animateRandomXY(giffy_bp_0013.subBall[i][n], l.left - 30, l.left + 30, l.top, l.top + 30, 200, "swing", function() {
							q(this).attr("subno") == 2 && (giffy_bp_0013.actionCount[q(this).attr("no")] = 3)
						}), j = giffy_bp_0013.subBallImageResource[giffy_bp_0013.getRandomNum(8)], giffy_bp_0013.subBall[i][n].css({
							background: "url(" + j.src + ") no-repeat",
							height: j.height,
							width: j.width
						}), N || giffy_bp_0013.setOpacity(giffy_bp_0013.subBall[i][n], 1), giffy_bp_0013.setVisible(giffy_bp_0013.subBall[i][n]);
						giffy_bp_0013.actionCount[i] = 0;
						break;
					case 3:
						for (n = 0; n < 3; n++) l = giffy_bp_0013.subBall[i][n].position(), N ? giffy_bp_0013.animateRandomXY(giffy_bp_0013.subBall[i][n], l.left, l.left, l.top + 10, l.top + 50, 1E3, "linear", function() {
							q(this).attr("subno") == 2 && (giffy_bp_0013.actionCount[q(this).attr("no")] = 4)
						}) : giffy_bp_0013.animateRandomXYFadeout(giffy_bp_0013.subBall[i][n], l.left, l.left, l.top + 10, l.top + 50, 1E3, "linear", function() {
							q(this).attr("subno") == 2 && (giffy_bp_0013.actionCount[q(this).attr("no")] = 4)
						});
						giffy_bp_0013.actionCount[i] =
							0;
						break;
					case 4:
						for (n = 0; n < 3; n++) giffy_bp_0013.setHidden(giffy_bp_0013.subBall[i][n]);
						giffy_bp_0013.actionCount[i] = 0
				}
				giffy_bp_0013.waitCnt > 0 && giffy_bp_0013.waitCnt--
			},
			debug: function(j) {
				navigator.appName.indexOf("Microsoft") != -1 ? document.getElementById("debugArea").innerHTML += j + "<br />" : console.log(j)
			},
			getRandomNum: function(j) {
				return Math.floor(Math.random() * j)
			},
			getDocumentHeight: function() {
				return q(document).height()
			},
			getDocumentWidth: function() {
				return q(document).width()
			},
			getViewTop: function() {
				return q(window).scrollTop()
			},
			getViewLeft: function() {
				return q(window).scrollLeft()
			},
			getViewHeight: function() {
				return q(window).height()
			},
			getViewWidth: function() {
				return q(window).width()
			},
			getViewBottom: function() {
				return giffy_bp_0013.getViewTop() + giffy_bp_0013.getViewHeight()
			},
			getViewRight: function() {
				return giffy_bp_0013.getViewLeft() + giffy_bp_0013.getViewWidth()
			},
			move: function(j, l) {
				j.css({
					top: l.top,
					left: l.left
				})
			},
			moveViewTop: function(j) {
				j.css({
					top: giffy_bp_0013.getViewTop()
				})
			},
			moveViewBottom: function(j) {
				j.css({
					top: giffy_bp_0013.getViewBottom() - j.outerHeight()
				})
			},
			moveViewLeft: function(j) {
				j.css({
					left: giffy_bp_0013.getViewLeft()
				})
			},
			moveViewRight: function(j) {
				j.css({
					left: giffy_bp_0013.getViewRight() - j.outerWidth()
				})
			},
			moveViewTopLeft: function(j) {
				giffy_bp_0013.moveViewTop(j);
				giffy_bp_0013.moveViewLeft(j)
			},
			moveViewTopRight: function(j) {
				giffy_bp_0013.moveViewTop(j);
				giffy_bp_0013.moveViewRight(j)
			},
			moveViewBottomLeft: function(j) {
				giffy_bp_0013.moveViewBottom(j);
				giffy_bp_0013.moveViewLeft(j)
			},
			moveViewBottomRight: function(j) {
				giffy_bp_0013.moveViewBottom(j);
				giffy_bp_0013.moveViewRight(j)
			},
			moveRandomTop: function(j) {
				j.css({
					top: giffy_bp_0013.getViewTop() + giffy_bp_0013.getRandomNum(giffy_bp_0013.getViewHeight() - j.outerHeight())
				})
			},
			moveRandomLeft: function(j) {
				j.css({
					left: giffy_bp_0013.getViewLeft() + giffy_bp_0013.getRandomNum(giffy_bp_0013.getViewWidth() - j.outerWidth() - 100)
				})
			},
			animateY: function(j, l, q, r, u) {
				j.animate({
					top: l
				}, q, r, u)
			},
			animateRandomY: function(j, l, q, r, u, w) {
				giffy_bp_0013.animateY(j, l + giffy_bp_0013.getRandomNum(q - l), r, u, w)
			},
			animateX: function(j, l, q,
				r, u) {
				j.animate({
					left: l
				}, q, r, u)
			},
			animateRandomX: function(j, l, q, r, u, w) {
				giffy_bp_0013.animateX(j, l + giffy_bp_0013.getRandomNum(q - l), r, u, w)
			},
			animateXY: function(j, l, q, r, u, w) {
				j.animate({
					top: q,
					left: l
				}, r, u, w)
			},
			animateRandomXY: function(j, l, q, r, u, w, z, N) {
				giffy_bp_0013.animateXY(j, l + giffy_bp_0013.getRandomNum(q - l), r + giffy_bp_0013.getRandomNum(u - r), w, z, N)
			},
			animateXYFadeout: function(j, l, q, r, u, w) {
				j.animate({
					top: q,
					left: l,
					opacity: "0"
				}, r, u, w)
			},
			animateRandomXYFadeout: function(j, l, q, r, u, w, z, N) {
				giffy_bp_0013.animateXYFadeout(j,
					l + giffy_bp_0013.getRandomNum(q - l), r + giffy_bp_0013.getRandomNum(u - r), w, z, N)
			},
			setOpacity: function(j, l) {
				j.css({
					opacity: l
				})
			},
			setHidden: function(j) {
				j.css({
					visibility: "hidden"
				})
			},
			setVisible: function(j) {
				j.css({
					visibility: "visible"
				})
			}
		}
	});
	q(document).ready(function() {
		giffy_bp_0013.init()
	})
})();