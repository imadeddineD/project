var runtime = function(t) {
    "use strict";
    var e, r = Object.prototype,
        n = r.hasOwnProperty,
        o = Object.defineProperty || function(t, e, r) {
            t[e] = r.value
        },
        i = (w = "function" == typeof Symbol ? Symbol : {}).iterator || "@@iterator",
        a = w.asyncIterator || "@@asyncIterator",
        c = w.toStringTag || "@@toStringTag";

    function u(t, e, r) {
        return Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), t[e]
    }
    try {
        u({}, "")
    } catch (r) {
        u = function(t, e, r) {
            return t[e] = r
        }
    }

    function h(t, r, n, i) {
        var a, c, u, h;
        r = r && r.prototype instanceof v ? r : v, r = Object.create(r.prototype), i = new O(i || []);
        return o(r, "_invoke", {
            value: (a = t, c = n, u = i, h = f, function(t, r) {
                if (h === p) throw new Error("Generator is already running");
                if (h === y) {
                    if ("throw" === t) throw r;
                    return {
                        value: e,
                        done: !0
                    }
                }
                for (u.method = t, u.arg = r;;) {
                    var n = u.delegate;
                    if (n && (n = function t(r, n) {
                            var o = n.method,
                                i = r.iterator[o];
                            return i === e ? (n.delegate = null, "throw" === o && r.iterator.return && (n.method = "return", n.arg = e, t(r, n), "throw" === n.method) || "return" !== o && (n.method = "throw", n.arg = new TypeError("The iterator does not provide a '" + o + "' method")), g) : "throw" === (o = l(i, r.iterator, n.arg)).type ? (n.method = "throw", n.arg = o.arg, n.delegate = null, g) : (i = o.arg) ? i.done ? (n[r.resultName] = i.value, n.next = r.nextLoc, "return" !== n.method && (n.method = "next", n.arg = e), n.delegate = null, g) : i : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, g)
                        }(n, u), n)) {
                        if (n === g) continue;
                        return n
                    }
                    if ("next" === u.method) u.sent = u._sent = u.arg;
                    else if ("throw" === u.method) {
                        if (h === f) throw h = y, u.arg;
                        u.dispatchException(u.arg)
                    } else "return" === u.method && u.abrupt("return", u.arg);
                    if (h = p, "normal" === (n = l(a, c, u)).type) {
                        if (h = u.done ? y : s, n.arg !== g) return {
                            value: n.arg,
                            done: u.done
                        }
                    } else "throw" === n.type && (h = y, u.method = "throw", u.arg = n.arg)
                }
            })
        }), r
    }

    function l(t, e, r) {
        try {
            return {
                type: "normal",
                arg: t.call(e, r)
            }
        } catch (t) {
            return {
                type: "throw",
                arg: t
            }
        }
    }
    t.wrap = h;
    var f = "suspendedStart",
        s = "suspendedYield",
        p = "executing",
        y = "completed",
        g = {};

    function v() {}

    function d() {}

    function m() {}
    var w, b, L = ((b = (b = (u(w = {}, i, (function() {
        return this
    })), Object.getPrototypeOf)) && b(b(k([])))) && b !== r && n.call(b, i) && (w = b), m.prototype = v.prototype = Object.create(w));

    function x(t) {
        ["next", "throw", "return"].forEach((function(e) {
            u(t, e, (function(t) {
                return this._invoke(e, t)
            }))
        }))
    }

    function E(t, e) {
        var r;
        o(this, "_invoke", {
            value: function(o, i) {
                function a() {
                    return new e((function(r, a) {
                        ! function r(o, i, a, c) {
                            var u;
                            if ("throw" !== (o = l(t[o], t, i)).type) return (i = (u = o.arg).value) && "object" == typeof i && n.call(i, "__await") ? e.resolve(i.__await).then((function(t) {
                                r("next", t, a, c)
                            }), (function(t) {
                                r("throw", t, a, c)
                            })) : e.resolve(i).then((function(t) {
                                u.value = t, a(u)
                            }), (function(t) {
                                return r("throw", t, a, c)
                            }));
                            c(o.arg)
                        }(o, i, r, a)
                    }))
                }
                return r = r ? r.then(a, a) : a()
            }
        })
    }

    function j(t) {
        var e = {
            tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
    }

    function _(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e
    }

    function O(t) {
        this.tryEntries = [{
            tryLoc: "root"
        }], t.forEach(j, this), this.reset(!0)
    }

    function k(t) {
        if (t || "" === t) {
            var r, o = t[i];
            if (o) return o.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) return r = -1, (o = function o() {
                for (; ++r < t.length;)
                    if (n.call(t, r)) return o.value = t[r], o.done = !1, o;
                return o.value = e, o.done = !0, o
            }).next = o
        }
        throw new TypeError(typeof t + " is not iterable")
    }
    return o(L, "constructor", {
        value: d.prototype = m,
        configurable: !0
    }), o(m, "constructor", {
        value: d,
        configurable: !0
    }), d.displayName = u(m, c, "GeneratorFunction"), t.isGeneratorFunction = function(t) {
        return !!(t = "function" == typeof t && t.constructor) && (t === d || "GeneratorFunction" === (t.displayName || t.name))
    }, t.mark = function(t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, m) : (t.__proto__ = m, u(t, c, "GeneratorFunction")), t.prototype = Object.create(L), t
    }, t.awrap = function(t) {
        return {
            __await: t
        }
    }, x(E.prototype), u(E.prototype, a, (function() {
        return this
    })), t.AsyncIterator = E, t.async = function(e, r, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new E(h(e, r, n, o), i);
        return t.isGeneratorFunction(r) ? a : a.next().then((function(t) {
            return t.done ? t.value : a.next()
        }))
    }, x(L), u(L, c, "Generator"), u(L, i, (function() {
        return this
    })), u(L, "toString", (function() {
        return "[object Generator]"
    })), t.keys = function(t) {
        var e, r = Object(t),
            n = [];
        for (e in r) n.push(e);
        return n.reverse(),
            function t() {
                for (; n.length;) {
                    var e = n.pop();
                    if (e in r) return t.value = e, t.done = !1, t
                }
                return t.done = !0, t
            }
    }, t.values = k, O.prototype = {
        constructor: O,
        reset: function(t) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(_), !t)
                for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
        },
        stop: function() {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval
        },
        dispatchException: function(t) {
            if (this.done) throw t;
            var r = this;

            function o(n, o) {
                return c.type = "throw", c.arg = t, r.next = n, o && (r.method = "next", r.arg = e), !!o
            }
            for (var i = this.tryEntries.length - 1; 0 <= i; --i) {
                var a = this.tryEntries[i],
                    c = a.completion;
                if ("root" === a.tryLoc) return o("end");
                if (a.tryLoc <= this.prev) {
                    var u = n.call(a, "catchLoc"),
                        h = n.call(a, "finallyLoc");
                    if (u && h) {
                        if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                        if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                    } else if (u) {
                        if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                    } else {
                        if (!h) throw new Error("try statement without catch or finally");
                        if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                    }
                }
            }
        },
        abrupt: function(t, e) {
            for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
                var o = this.tryEntries[r];
                if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                    var i = o;
                    break
                }
            }
            var a = (i = i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc ? null : i) ? i.completion : {};
            return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, g) : this.complete(a)
        },
        complete: function(t, e) {
            if ("throw" === t.type) throw t.arg;
            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), g
        },
        finish: function(t) {
            for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                var r = this.tryEntries[e];
                if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), _(r), g
            }
        },
        catch: function(t) {
            for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                var r, n, o = this.tryEntries[e];
                if (o.tryLoc === t) return "throw" === (r = o.completion).type && (n = r.arg, _(o)), n
            }
            throw new Error("illegal catch attempt")
        },
        delegateYield: function(t, r, n) {
            return this.delegate = {
                iterator: k(t),
                resultName: r,
                nextLoc: n
            }, "next" === this.method && (this.arg = e), g
        }
    }, t
}("object" == typeof module ? module.exports : {});
try {
    regeneratorRuntime = runtime
} catch (t) {
    "object" == typeof globalThis ? globalThis.regeneratorRuntime = runtime : Function("r", "regeneratorRuntime = r")(runtime)
};