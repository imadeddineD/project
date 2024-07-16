! function n(o, i, a) {
    function s(e, t) {
        if (!i[e]) {
            if (!o[e]) {
                var r = "function" == typeof require && require;
                if (!t && r) return r(e, !0);
                if (l) return l(e, !0);
                throw (t = new Error("Cannot find module '" + e + "'")).code = "MODULE_NOT_FOUND", t
            }
            r = i[e] = {
                exports: {}
            }, o[e][0].call(r.exports, function(t) {
                return s(o[e][1][t] || t)
            }, r, r.exports, n, o, i, a)
        }
        return i[e].exports
    }
    for (var l = "function" == typeof require && require, t = 0; t < a.length; t++) s(a[t]);
    return s
}({
    1: [function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        var o = n(t("./parser/front.calculator.parser.tokenizer")),
            i = n(t("./symbol/front.calculator.symbol.loader")),
            a = n(t("./parser/front.calculator.parser")),
            s = n(t("./symbol/front.calculator.symbol.number")),
            l = n(t("./symbol/abstract/front.calculator.symbol.constant.abstract")),
            f = n(t("./parser/node/front.calculator.parser.node.symbol")),
            u = n(t("./symbol/abstract/front.calculator.symbol.operator.abstract")),
            c = n(t("./symbol/front.calculator.symbol.separator")),
            m = n(t("./parser/node/front.calculator.parser.node.function")),
            d = n(t("./parser/node/front.calculator.parser.node.container"));

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function h(t) {
            return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function p(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== h(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== h(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === h(t) ? t : String(t)
                }(n.key), n)
            }
        }
        var b = r.default = function() {
            function e(t) {
                if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
                this.term = t, this.tokenizer = new o.default(this.term), this.symbolLoader = new i.default, this.parser = new a.default(this.symbolLoader)
            }
            var t, r, n;
            return t = e, (r = [{
                key: "parse",
                value: function() {
                    this.tokenizer.input = this.term, this.tokenizer.reset();
                    var t = this.tokenizer.tokenize();
                    if (0 === t.length) throw "Error: Empty token of calculator term.";
                    t = this.parser.parse(t);
                    if (t.isEmpty()) throw "Error: Empty nodes of calculator tokens.";
                    return t
                }
            }, {
                key: "calculate",
                value: function() {
                    var t = this.parse();
                    return !1 === t ? 0 : this.calculateNode(t)
                }
            }, {
                key: "calculateNode",
                value: function(t) {
                    if (t instanceof f.default) return this.calculateSymbolNode(t);
                    if (t instanceof m.default) return this.calculateFunctionNode(t);
                    if (t instanceof d.default) return this.calculateContainerNode(t);
                    throw 'Error: Cannot calculate node of unknown type "' + t.constructor.name + '"'
                }
            }, {
                key: "calculateContainerNode",
                value: function(t) {
                    if (t instanceof m.default) throw "Error: Expected container node but got a function node";
                    for (var e = 0, r = t.childNodes, n = this.detectCalculationOrder(r), o = 0; o < n.length; o++) {
                        for (var i = n[o].node, a = n[o].index, s = null, l = null, f = 0; f !== a;) void 0 === r[f] || (s = r[f], l = f), f++;
                        for (f++; void 0 === r[f];) f++;
                        var u = r[f],
                            c = f,
                            u = isNaN(u) ? this.calculateNode(u) : u,
                            d = i.symbol;
                        i.isUnaryOperator ? (e = d.operate(null, u), delete r[c], r[a] = e) : null !== l && null !== s && (i = isNaN(s) ? this.calculateNode(s) : s, e = d.operate(i, u), delete r[l], delete r[c], r[a] = e)
                    }
                    if (0 === (r = r.filter(function(t) {
                            return void 0 !== t
                        })).length) throw "Error: Missing calculable subterm. Are there empty brackets?";
                    if (1 < r.length) throw "Error: Missing operators between parts of the term.";
                    return e = r.pop(), isNaN(e) ? this.calculateNode(e) : e
                }
            }, {
                key: "calculateFunctionNode",
                value: function(t) {
                    for (var e = t.childNodes, r = [], n = [], o = null, i = 0; i < e.length; i++) {
                        var a = e[i];
                        a instanceof f.default && a.symbol instanceof c.default ? (o = new d.default(n), r.push(this.calculateNode(o)), n = []) : n.push(a)
                    }
                    return 0 < n.length && (o = new d.default(n), r.push(this.calculateNode(o))), t.symbolNode.symbol.execute(r)
                }
            }, {
                key: "calculateSymbolNode",
                value: function(t) {
                    var e = t.symbol,
                        r = 0;
                    if (e instanceof s.default) r = t.token.value, r = Number(r);
                    else {
                        if (!(e instanceof l.default)) throw 'Error: Found symbol of unexpected type "' + e.constructor.name + '", expected number or constant';
                        r = e.value
                    }
                    return r
                }
            }, {
                key: "detectCalculationOrder",
                value: function(t) {
                    for (var e = [], r = 0; r < t.length; r++) {
                        var n = t[r];
                        n instanceof f.default && n.symbol instanceof u.default && e.push({
                            index: r,
                            node: n
                        })
                    }
                    return e.sort(function(t, e) {
                        var t = t.node,
                            e = e.node,
                            r = t.symbol,
                            n = 2,
                            o = (t.isUnaryOperator && (n = 3), e.symbol),
                            i = 2;
                        return n === (i = e.isUnaryOperator ? 3 : i) && (n = r.precedence, i = o.precedence), n === i ? t.token.position < e.token.position ? -1 : 1 : n < i ? 1 : -1
                    }), e
                }
            }]) && p(t.prototype, r), n && p(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e
        }();
        void 0 === window.forminatorCalculator && (window.forminatorCalculator = function(t) {
            return new b(t)
        })
    }, {
        "./parser/front.calculator.parser": 2,
        "./parser/front.calculator.parser.tokenizer": 4,
        "./parser/node/front.calculator.parser.node.container": 6,
        "./parser/node/front.calculator.parser.node.function": 7,
        "./parser/node/front.calculator.parser.node.symbol": 8,
        "./symbol/abstract/front.calculator.symbol.constant.abstract": 10,
        "./symbol/abstract/front.calculator.symbol.operator.abstract": 12,
        "./symbol/front.calculator.symbol.loader": 16,
        "./symbol/front.calculator.symbol.number": 17,
        "./symbol/front.calculator.symbol.separator": 18
    }],
    2: [function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        var f = n(t("./front.calculator.parser.token")),
            u = n(t("../symbol/front.calculator.symbol.number")),
            c = n(t("../symbol/brackets/front.calculator.symbol.opening.bracket")),
            d = n(t("../symbol/brackets/front.calculator.symbol.closing.bracket")),
            m = n(t("../symbol/abstract/front.calculator.symbol.function.abstract")),
            a = n(t("../symbol/abstract/front.calculator.symbol.operator.abstract")),
            s = n(t("../symbol/front.calculator.symbol.separator")),
            h = n(t("./node/front.calculator.parser.node.symbol")),
            l = n(t("./node/front.calculator.parser.node.container")),
            p = n(t("./node/front.calculator.parser.node.function"));

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }
        r.default = function() {
            function e(t) {
                if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
                this.symbolLoader = t
            }
            var t, r, n;
            return t = e, (r = [{
                key: "parse",
                value: function(t) {
                    t = this.detectSymbols(t), t = this.createTreeByBrackets(t), t = this.transformTreeByFunctions(t);
                    return this.checkGrammar(t), new l.default(t)
                }
            }, {
                key: "detectSymbols",
                value: function(t) {
                    for (var e = [], r = null, n = null, o = !1, i = 0, a = 0; a < t.length; a++) {
                        var s = t[a],
                            l = s.type;
                        if (f.default.TYPE_WORD === l) {
                            if (n = s.value, null === (r = this.symbolLoader.find(n))) throw "Error: Detected unknown or invalid string identifier: " + n + "."
                        } else if (l === f.default.TYPE_NUMBER) {
                            l = this.symbolLoader.findSubTypes(u.default);
                            if (l.length < 1 || !(l instanceof Array)) throw "Error: Unavailable number symbol processor.";
                            r = l[0]
                        } else {
                            if (n = s.value, null === (r = this.symbolLoader.find(n))) throw "Error: Detected unknown or invalid string identifier: " + n + ".";
                            if (r instanceof c.default && i++, r instanceof d.default && --i < 0) throw "Error: Found closing bracket that does not have an opening bracket."
                        }
                        if (o) {
                            if (!(r instanceof c.default)) throw "Error: Expected opening bracket (after a function) but got something else.";
                            o = !1
                        } else r instanceof m.default && (o = !0);
                        l = new h.default(s, r);
                        e.push(l)
                    }
                    if (o) throw "Error: Expected opening bracket (after a function) but reached the end of the term";
                    if (0 < i) throw "Error: There is at least one opening bracket that does not have a closing bracket";
                    return e
                }
            }, {
                key: "createTreeByBrackets",
                value: function(t) {
                    for (var e = [], r = [], n = 0, o = 0; o < t.length; o++) {
                        var i, a = t[o];
                        if (!(a instanceof h.default)) throw 'Error: Expected symbol node, but got "' + a.constructor.name + '"';
                        a.symbol instanceof c.default ? 1 < ++n && r.push(a) : a.symbol instanceof d.default ? 0 === --n ? (i = this.createTreeByBrackets(r), e.push(new l.default(i)), r = []) : r.push(a) : (0 === n ? e : r).push(a)
                    }
                    return e
                }
            }, {
                key: "transformTreeByFunctions",
                value: function(t) {
                    for (var e = [], r = null, n = 0; n < t.length; n++) {
                        var o = t[n];
                        if (o instanceof l.default) {
                            var i, a = this.transformTreeByFunctions(o.childNodes);
                            null !== r ? (i = new p.default(a, r), e.push(i), r = null) : (o.childNodes = a, e.push(o))
                        } else {
                            if (!(o instanceof h.default)) throw 'Error: Expected array node or symbol node, got "' + o.constructor.name + '"';
                            o.symbol instanceof m.default ? r = o : e.push(o)
                        }
                    }
                    return e
                }
            }, {
                key: "checkGrammar",
                value: function(t) {
                    for (var e = 0; e < t.length; e++) {
                        var r = t[e];
                        if (r instanceof h.default) {
                            var n = r.symbol;
                            if (n instanceof a.default) {
                                if (e + 1 >= t.length) throw "Error: Found operator that does not stand before an operand.";
                                var o = e - 1,
                                    i = null;
                                if (null === (i = 0 <= o && (i = t[o]) instanceof h.default && (i.symbol instanceof a.default || i.symbol instanceof s.default) ? null : i)) {
                                    if (!n.operatesUnary) throw "Error: Found operator in unary notation that is not unary.";
                                    r.setIsUnaryOperator(!0)
                                } else if (!n.operatesBinary) throw console.log(n), "Error: Found operator in binary notation that is not binary."
                            }
                        } else this.checkGrammar(r.childNodes)
                    }
                }
            }]) && i(t.prototype, r), n && i(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e
        }()
    }, {
        "../symbol/abstract/front.calculator.symbol.function.abstract": 11,
        "../symbol/abstract/front.calculator.symbol.operator.abstract": 12,
        "../symbol/brackets/front.calculator.symbol.closing.bracket": 13,
        "../symbol/brackets/front.calculator.symbol.opening.bracket": 14,
        "../symbol/front.calculator.symbol.number": 17,
        "../symbol/front.calculator.symbol.separator": 18,
        "./front.calculator.parser.token": 3,
        "./node/front.calculator.parser.node.container": 6,
        "./node/front.calculator.parser.node.function": 7,
        "./node/front.calculator.parser.node.symbol": 8
    }],
    3: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        r.default = function() {
            function n(t, e, r) {
                if (!(this instanceof n)) throw new TypeError("Cannot call a class as a function");
                this.type = t, this.value = e, this.position = r
            }
            var t, e, r;
            return t = n, r = [{
                key: "TYPE_WORD",
                get: function() {
                    return 1
                }
            }, {
                key: "TYPE_CHAR",
                get: function() {
                    return 2
                }
            }, {
                key: "TYPE_NUMBER",
                get: function() {
                    return 3
                }
            }], (e = null) && i(t.prototype, e), r && i(t, r), Object.defineProperty(t, "prototype", {
                writable: !1
            }), n
        }()
    }, {}],
    4: [function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        var o = (t = t("./front.calculator.parser.token")) && t.__esModule ? t : {
            default: t
        };

        function i(t) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== i(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== i(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === i(t) ? t : String(t)
                }(n.key), n)
            }
        }
        r.default = function() {
            function e(t) {
                if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
                this.input = t, this.currentPosition = 0
            }
            var t, r, n;
            return t = e, (r = [{
                key: "tokenize",
                value: function() {
                    this.reset();
                    for (var t = [], e = this.readToken(); e;) t.push(e), e = this.readToken();
                    return t
                }
            }, {
                key: "readToken",
                value: function() {
                    this.stepOverWhitespace();
                    var t, e, r = this.readCurrent();
                    return null === r ? null : (e = t = null, e = this.isLetter(r) ? (t = this.readWord(), o.default.TYPE_WORD) : this.isDigit(r) || this.isPeriod(r) ? (t = this.readNumber(), o.default.TYPE_NUMBER) : (t = this.readChar(), o.default.TYPE_CHAR), new o.default(e, t, this.currentPosition))
                }
            }, {
                key: "isLetter",
                value: function(t) {
                    return null !== t && (65 <= (t = t.charCodeAt(0)) && t <= 90 || 97 <= t && t <= 122)
                }
            }, {
                key: "isDigit",
                value: function(t) {
                    return null !== t && 48 <= (t = t.charCodeAt(0)) && t <= 57
                }
            }, {
                key: "isPeriod",
                value: function(t) {
                    return "." === t
                }
            }, {
                key: "isWhitespace",
                value: function(t) {
                    return 0 <= [" ", "\t", "\n"].indexOf(t)
                }
            }, {
                key: "stepOverWhitespace",
                value: function() {
                    for (; this.isWhitespace(this.readCurrent());) this.readNext()
                }
            }, {
                key: "readWord",
                value: function() {
                    for (var t = "", e = this.readCurrent(); null !== e && this.isLetter(e);) t += e, e = this.readNext();
                    return t
                }
            }, {
                key: "readNumber",
                value: function() {
                    for (var t = "", e = !1, r = this.readCurrent(); null !== r && (this.isPeriod(r) || this.isDigit(r));) {
                        if (this.isPeriod(r)) {
                            if (e) throw "Error: A number cannot have more than one period";
                            e = !0
                        }
                        t += r, r = this.readNext()
                    }
                    return t
                }
            }, {
                key: "readChar",
                value: function() {
                    var t = this.readCurrent();
                    return this.readNext(), t
                }
            }, {
                key: "readCurrent",
                value: function() {
                    var t = null;
                    return t = this.hasCurrent() ? this.input[this.currentPosition] : t
                }
            }, {
                key: "readNext",
                value: function() {
                    return this.currentPosition++, this.readCurrent()
                }
            }, {
                key: "hasCurrent",
                value: function() {
                    return this.currentPosition < this.input.length
                }
            }, {
                key: "reset",
                value: function() {
                    this.currentPosition = 0
                }
            }]) && a(t.prototype, r), n && a(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e
        }()
    }, {
        "./front.calculator.parser.token": 3
    }],
    5: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function n(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function i(t, e, r) {
            return e && n(t.prototype, e), r && n(t, r), Object.defineProperty(t, "prototype", {
                writable: !1
            }), t
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        r.default = i(function t() {
            if (!(this instanceof t)) throw new TypeError("Cannot call a class as a function")
        })
    }, {}],
    6: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        var i = (t = t("./front.calculator.parser.node.abstract")) && t.__esModule ? t : {
            default: t
        };

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = f(r),
                    e = (t = n ? (t = f(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function f(t) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n = l(o);

            function o(t) {
                var e;
                if (this instanceof o) return (e = n.call(this)).childNodes = null, e.setChildNodes(t), e;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "setChildNodes",
                value: function(t) {
                    t.forEach(function(t) {
                        if (!(t instanceof i.default)) throw "Expected AbstractNode, but got " + t.constructor.name
                    }), this.childNodes = t
                }
            }, {
                key: "size",
                value: function() {
                    try {
                        return this.childNodes.length
                    } catch (t) {
                        return 0
                    }
                }
            }, {
                key: "isEmpty",
                value: function() {
                    return !this.size()
                }
            }]) && a(e.prototype, t), r && a(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(i.default)
    }, {
        "./front.calculator.parser.node.abstract": 5
    }],
    7: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("./front.calculator.parser.node.container")) && t.__esModule ? t : {
            default: t
        };

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = i(r),
                    e = (t = n ? (t = i(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function i(t) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = i;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n, o = l(i);

            function i(t, e) {
                if (this instanceof i) return (t = o.call(this, t)).symbolNode = e, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = i, r && a(e.prototype, r), n && a(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e
        }(t.default)
    }, {
        "./front.calculator.parser.node.container": 6
    }],
    8: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        var i = n(t("../../symbol/abstract/front.calculator.symbol.operator.abstract")),
            t = n(t("./front.calculator.parser.node.abstract"));

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = f(r),
                    e = (t = n ? (t = f(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function f(t) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n = l(o);

            function o(t, e) {
                var r;
                if (this instanceof o) return (r = n.call(this)).token = t, r.symbol = e, r.isUnaryOperator = !1, r;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "setIsUnaryOperator",
                value: function(t) {
                    if (!(this.symbol instanceof i.default)) throw "Error: Cannot mark node as unary operator, because symbol is not an operator but of type " + this.symbol.constructor.name;
                    this.isUnaryOperator = t
                }
            }]) && a(e.prototype, t), r && a(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../../symbol/abstract/front.calculator.symbol.operator.abstract": 12,
        "./front.calculator.parser.node.abstract": 5
    }],
    9: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        r.default = function() {
            function t() {
                if (!(this instanceof t)) throw new TypeError("Cannot call a class as a function");
                this.identifiers = []
            }
            var e, r, n;
            return e = t, (r = [{
                key: "getIdentifiers",
                value: function() {
                    var e = [];
                    return this.identifiers.forEach(function(t) {
                        e.push(t.toLowerCase())
                    }), e
                }
            }]) && i(e.prototype, r), n && i(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t
        }()
    }, {}],
    10: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("./front.calculator.symbol.abstract")) && t.__esModule ? t : {
            default: t
        };

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = i(r),
                    e = (t = n ? (t = i(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function i(t) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = i;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n, o = l(i);

            function i() {
                var t;
                if (this instanceof i) return (t = o.call(this)).value = 0, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = i, r && a(e.prototype, r), n && a(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e
        }(t.default)
    }, {
        "./front.calculator.symbol.abstract": 9
    }],
    11: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("./front.calculator.symbol.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                if (this instanceof o) return n.call(this);
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "execute",
                value: function(t) {
                    return 0
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "./front.calculator.symbol.abstract": 9
    }],
    12: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("./front.calculator.symbol.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).precedence = 0, t.operatesUnary = !1, t.operatesBinary = !0, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "operate",
                value: function(t, e) {
                    return 0
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "./front.calculator.symbol.abstract": 9
    }],
    13: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.abstract")) && t.__esModule ? t : {
            default: t
        };

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = i(r),
                    e = (t = n ? (t = i(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function i(t) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = i;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n, o = l(i);

            function i() {
                var t;
                if (this instanceof i) return (t = o.call(this)).identifiers = [")"], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = i, r && a(e.prototype, r), n && a(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.abstract": 9
    }],
    14: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.abstract")) && t.__esModule ? t : {
            default: t
        };

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = i(r),
                    e = (t = n ? (t = i(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function i(t) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = i;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n, o = l(i);

            function i() {
                var t;
                if (this instanceof i) return (t = o.call(this)).identifiers = ["("], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = i, r && a(e.prototype, r), n && a(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.abstract": 9
    }],
    15: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.constant.abstract")) && t.__esModule ? t : {
            default: t
        };

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = i(r),
                    e = (t = n ? (t = i(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function i(t) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = i;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n, o = l(i);

            function i() {
                var t;
                if (this instanceof i) return (t = o.call(this)).identifiers = ["pi"], t.value = Math.PI, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = i, r && a(e.prototype, r), n && a(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.constant.abstract": 10
    }],
    16: [function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        var o = n(t("./front.calculator.symbol.number")),
            i = n(t("./front.calculator.symbol.separator")),
            a = n(t("./brackets/front.calculator.symbol.opening.bracket")),
            s = n(t("./brackets/front.calculator.symbol.closing.bracket")),
            l = n(t("./constants/front.calculator.symbol.constant.pi")),
            f = n(t("./operators/front.calculator.symbol.operator.addition")),
            u = n(t("./operators/front.calculator.symbol.operator.division")),
            c = n(t("./operators/front.calculator.symbol.operator.exponentiation")),
            d = n(t("./operators/front.calculator.symbol.operator.modulo")),
            m = n(t("./operators/front.calculator.symbol.operator.multiplication")),
            h = n(t("./operators/front.calculator.symbol.operator.subtraction")),
            p = n(t("./functions/front.calculator.symbol.function.abs")),
            b = n(t("./functions/front.calculator.symbol.function.avg")),
            y = n(t("./functions/front.calculator.symbol.function.ceil")),
            g = n(t("./functions/front.calculator.symbol.function.floor")),
            v = n(t("./functions/front.calculator.symbol.function.max")),
            _ = n(t("./functions/front.calculator.symbol.function.min")),
            w = n(t("./functions/front.calculator.symbol.function.round"));

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function O(t) {
            return (O = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function C(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== O(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== O(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === O(t) ? t : String(t)
                }(n.key), n)
            }
        }
        r.default = function() {
            function t() {
                if (!(this instanceof t)) throw new TypeError("Cannot call a class as a function");
                this.symbols = {
                    FrontCalculatorSymbolNumber: new o.default,
                    FrontCalculatorSymbolSeparator: new i.default,
                    FrontCalculatorSymbolOpeningBracket: new a.default,
                    FrontCalculatorSymbolClosingBracket: new s.default,
                    FrontCalculatorSymbolConstantPi: new l.default,
                    FrontCalculatorSymbolOperatorAddition: new f.default,
                    FrontCalculatorSymbolOperatorDivision: new u.default,
                    FrontCalculatorSymbolOperatorExponentiation: new c.default,
                    FrontCalculatorSymbolOperatorModulo: new d.default,
                    FrontCalculatorSymbolOperatorMultiplication: new m.default,
                    FrontCalculatorSymbolOperatorSubtraction: new h.default,
                    FrontCalculatorSymbolFunctionAbs: new p.default,
                    FrontCalculatorSymbolFunctionAvg: new b.default,
                    FrontCalculatorSymbolFunctionCeil: new y.default,
                    FrontCalculatorSymbolFunctionFloor: new g.default,
                    FrontCalculatorSymbolFunctionMax: new v.default,
                    FrontCalculatorSymbolFunctionMin: new _.default,
                    FrontCalculatorSymbolFunctionRound: new w.default
                }
            }
            var e, r, n;
            return e = t, (r = [{
                key: "find",
                value: function(t) {
                    for (var e in t = t.toLowerCase(), this.symbols)
                        if (this.symbols.hasOwnProperty(e)) {
                            e = this.symbols[e];
                            if (0 <= e.getIdentifiers().indexOf(t)) return e
                        }
                    return null
                }
            }, {
                key: "findSubTypes",
                value: function(t) {
                    var e, r, n = [];
                    for (e in this.symbols) this.symbols.hasOwnProperty(e) && (r = this.symbols[e]) instanceof t && n.push(r);
                    return n
                }
            }]) && C(e.prototype, r), n && C(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t
        }()
    }, {
        "./brackets/front.calculator.symbol.closing.bracket": 13,
        "./brackets/front.calculator.symbol.opening.bracket": 14,
        "./constants/front.calculator.symbol.constant.pi": 15,
        "./front.calculator.symbol.number": 17,
        "./front.calculator.symbol.separator": 18,
        "./functions/front.calculator.symbol.function.abs": 19,
        "./functions/front.calculator.symbol.function.avg": 20,
        "./functions/front.calculator.symbol.function.ceil": 21,
        "./functions/front.calculator.symbol.function.floor": 22,
        "./functions/front.calculator.symbol.function.max": 23,
        "./functions/front.calculator.symbol.function.min": 24,
        "./functions/front.calculator.symbol.function.round": 25,
        "./operators/front.calculator.symbol.operator.addition": 26,
        "./operators/front.calculator.symbol.operator.division": 27,
        "./operators/front.calculator.symbol.operator.exponentiation": 28,
        "./operators/front.calculator.symbol.operator.modulo": 29,
        "./operators/front.calculator.symbol.operator.multiplication": 30,
        "./operators/front.calculator.symbol.operator.subtraction": 31
    }],
    17: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("./abstract/front.calculator.symbol.abstract")) && t.__esModule ? t : {
            default: t
        };

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = i(r),
                    e = (t = n ? (t = i(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function i(t) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = i;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n, o = l(i);

            function i() {
                if (this instanceof i) return o.call(this);
                throw new TypeError("Cannot call a class as a function")
            }
            return e = i, r && a(e.prototype, r), n && a(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e
        }(t.default)
    }, {
        "./abstract/front.calculator.symbol.abstract": 9
    }],
    18: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("./abstract/front.calculator.symbol.abstract")) && t.__esModule ? t : {
            default: t
        };

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = i(r),
                    e = (t = n ? (t = i(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function i(t) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = i;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n, o = l(i);

            function i() {
                var t;
                if (this instanceof i) return (t = o.call(this)).identifiers = [","], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = i, r && a(e.prototype, r), n && a(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e
        }(t.default)
    }, {
        "./abstract/front.calculator.symbol.abstract": 9
    }],
    19: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.function.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["abs"], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "execute",
                value: function(t) {
                    if (1 !== t.length) throw "Error: Expected one argument, got " + t.length;
                    t = t[0];
                    return Math.abs(t)
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.function.abstract": 11
    }],
    20: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.function.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["avg"], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "execute",
                value: function(t) {
                    if (t.length < 1) throw "Error: Expected at least one argument, got " + t.length;
                    for (var e = 0, r = 0; r < t.length; r++) e += t[r];
                    return e / t.length
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.function.abstract": 11
    }],
    21: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.function.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["ceil"], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "execute",
                value: function(t) {
                    if (1 !== t.length) throw "Error: Expected one argument, got " + t.length;
                    return Math.ceil(t[0])
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.function.abstract": 11
    }],
    22: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.function.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["floor"], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "execute",
                value: function(t) {
                    if (1 !== t.length) throw "Error: Expected one argument, got " + t.length;
                    return Math.floor(t[0])
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.function.abstract": 11
    }],
    23: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.function.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t) {
            return function(t) {
                if (Array.isArray(t)) return n(t)
            }(t) || function(t) {
                if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
            }(t) || function(t, e) {
                var r;
                if (t) return "string" == typeof t ? n(t, e) : "Map" === (r = "Object" === (r = Object.prototype.toString.call(t).slice(8, -1)) && t.constructor ? t.constructor.name : r) || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(t, e) : void 0
            }(t) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function n(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
            return n
        }

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = f(r),
                    e = (t = n ? (t = f(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function f(t) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n = l(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["max"], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "execute",
                value: function(t) {
                    if (t.length < 1) throw "Error: Expected at least one argument, got " + t.length;
                    return Math.max.apply(Math, i(t))
                }
            }]) && a(e.prototype, t), r && a(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.function.abstract": 11
    }],
    24: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.function.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t) {
            return function(t) {
                if (Array.isArray(t)) return n(t)
            }(t) || function(t) {
                if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
            }(t) || function(t, e) {
                var r;
                if (t) return "string" == typeof t ? n(t, e) : "Map" === (r = "Object" === (r = Object.prototype.toString.call(t).slice(8, -1)) && t.constructor ? t.constructor.name : r) || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(t, e) : void 0
            }(t) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function n(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
            return n
        }

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = f(r),
                    e = (t = n ? (t = f(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function f(t) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && s(e, t);
            var r, n = l(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["min"], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "execute",
                value: function(t) {
                    if (t.length < 1) throw "Error: Expected at least one argument, got " + t.length;
                    return Math.min.apply(Math, i(t))
                }
            }]) && a(e.prototype, t), r && a(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.function.abstract": 11
    }],
    25: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.function.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["round"], t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "execute",
                value: function(t) {
                    if (1 !== t.length) throw "Error: Expected one argument, got " + t.length;
                    return Math.round(t[0])
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.function.abstract": 11
    }],
    26: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.operator.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["+"], t.precedence = 100, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "operate",
                value: function(t, e) {
                    return t + e
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.operator.abstract": 12
    }],
    27: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.operator.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["/"], t.precedence = 200, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "operate",
                value: function(t, e) {
                    return t / e
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.operator.abstract": 12
    }],
    28: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.operator.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["^"], t.precedence = 300, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "operate",
                value: function(t, e) {
                    return Math.pow(t, e)
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.operator.abstract": 12
    }],
    29: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.operator.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["%"], t.precedence = 200, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "operate",
                value: function(t, e) {
                    return t % e
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.operator.abstract": 12
    }],
    30: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.operator.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["*"], t.precedence = 200, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "operate",
                value: function(t, e) {
                    return t * e
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.operator.abstract": 12
    }],
    31: [function(t, e, r) {
        "use strict";

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.default = void 0;
        t = (t = t("../abstract/front.calculator.symbol.operator.abstract")) && t.__esModule ? t : {
            default: t
        };

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                    t = function(t, e) {
                        if ("object" !== o(t) || null === t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 === r) return ("string" === e ? String : Number)(t);
                        r = r.call(t, e || "default");
                        if ("object" !== o(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === o(t) ? t : String(t)
                }(n.key), n)
            }
        }

        function a(t, e) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function s(r) {
            var n = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var t, e = l(r),
                    e = (t = n ? (t = l(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), this);
                if (t && ("object" === o(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== e) return e;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(t) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        r.default = function(t) {
            var e = o;
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && a(e, t);
            var r, n = s(o);

            function o() {
                var t;
                if (this instanceof o) return (t = n.call(this)).identifiers = ["-"], t.precedence = 100, t.operatesUnary = !0, t;
                throw new TypeError("Cannot call a class as a function")
            }
            return e = o, (t = [{
                key: "operate",
                value: function(t, e) {
                    return t - e
                }
            }]) && i(e.prototype, t), r && i(e, r), Object.defineProperty(e, "prototype", {
                writable: !1
            }), o
        }(t.default)
    }, {
        "../abstract/front.calculator.symbol.operator.abstract": 12
    }]
}, {}, [1]), [].includes || (Array.prototype.includes = function(t, e) {
    "use strict";
    var r = Object(this),
        n = parseInt(r.length) || 0;
    if (0 !== n) {
        var o, e = parseInt(e) || 0;
        for (0 <= e ? o = e : (o = n + e) < 0 && (o = 0); o < n;) {
            var i = r[o];
            if (t === i || t != t && i != i) return !0;
            o++
        }
    }
    return !1
});
class forminatorFrontUtils {
    constructor() {}
    field_is_checkbox(t) {
        var e = !1;
        return t.each(function() {
            if ("checkbox" === jQuery(this).attr("type")) return !(e = !0)
        }), e
    }
    field_is_radio(t) {
        var e = !1;
        return t.each(function() {
            if ("radio" === jQuery(this).attr("type")) return !(e = !0)
        }), e
    }
    field_is_select(t) {
        return t.is("select")
    }
    field_has_inputMask(t) {
        var e = !1;
        return t.each(function() {
            if (void 0 !== jQuery(this).attr("data-inputmask")) return !(e = !0)
        }), e
    }
    get_field_value(t) {
        var e = 0,
            r = 0,
            n = null;
        return this.field_is_radio(t) ? (n = t.filter(":checked")).length && void 0 !== (r = n.data("calculation")) && (e = Number(r)) : this.field_is_checkbox(t) ? t.each(function() {
            jQuery(this).is(":checked") && void 0 !== (r = jQuery(this).data("calculation")) && (e += Number(r))
        }) : this.field_is_select(t) ? (n = t.find("option").filter(":selected")).length && void 0 !== (r = n.data("calculation")) && (e = Number(r)) : this.field_has_inputMask(t) ? e = parseFloat(t.inputmask("unmaskedvalue").replace(",", ".")) : t.length && (n = t.val(), e = parseFloat(n.replace(",", "."))), isNaN(e) ? 0 : e
    }
}
void 0 === window.forminatorUtils && (window.forminatorUtils = function() {
        return new forminatorFrontUtils
    }),
    function(l, f, a) {
        "use strict";
        var r = "forminatorLoader",
            n = {
                action: "",
                type: "",
                id: "",
                render_id: "",
                is_preview: "",
                preview_data: [],
                nonce: !1,
                last_submit_data: {},
                extra: {}
            };

        function e(t, e) {
            this.element = t, this.$el = l(this.element), this.settings = l.extend({}, n, e), this._defaults = n, this._name = r, this.frontInitCalled = !1, this.scriptsQue = [], this.frontOptions = null, this.leadFrontOptions = null, this.init()
        }
        l.extend(e.prototype, {
            init: function() {
                var t = decodeURI(a.location.search).replace(/(^\?)/, "").split("&").map(function(t) {
                    return this[(t = t.split("="))[0]] = t[1], this
                }.bind({}))[0];
                t.action = this.settings.action, t.type = this.settings.type, t.id = this.settings.id, t.render_id = this.settings.render_id, t.is_preview = this.settings.is_preview, t.preview_data = JSON.stringify(this.settings.preview_data), t.last_submit_data = this.settings.last_submit_data, t.extra = this.settings.extra, t.nonce = this.settings.nonce, void 0 !== this.settings.has_lead && (t.has_lead = this.settings.has_lead, t.leads_id = this.settings.leads_id), this.load_ajax(t), this.handleDiviPopup()
            },
            load_ajax: function(o) {
                var i = this;
                l.ajax({
                    type: "POST",
                    url: f.ForminatorFront.ajaxUrl,
                    data: o,
                    cache: !1,
                    beforeSend: function() {
                        l(a).trigger("before.load.forminator", o.id)
                    },
                    success: function(t) {
                        if (t.success) {
                            var e = t.data;
                            if (l(a).trigger("response.success.load.forminator", o.id, t), !e.is_ajax_load) return !1;
                            var r, n = [];
                            (n = void 0 === e.pagination_config && void 0 !== e.options.pagination_config ? e.options.pagination_config : n) && (f.Forminator_Cform_Paginations = f.Forminator_Cform_Paginations || [], f.Forminator_Cform_Paginations[o.id] = n), i.frontOptions = e.options || null, void 0 === f.Forminator_Cform_Paginations && i.frontOptions.pagination_config && (f.Forminator_Cform_Paginations = f.Forminator_Cform_Paginations || [], f.Forminator_Cform_Paginations[o.id] = i.frontOptions.pagination_config), void 0 !== e.lead_options && (i.leadFrontOptions = e.lead_options || null, void 0 === f.Forminator_Cform_Paginations) && i.leadFrontOptions.pagination_config && (f.Forminator_Cform_Paginations = f.Forminator_Cform_Paginations || [], f.Forminator_Cform_Paginations[o.leads_id] = i.leadFrontOptions.pagination_config), e.html && (n = e.style || null, r = e.script || null, i.render_html(e.html, n, r)), e.styles && i.maybe_append_styles(e.styles), e.scripts && i.maybe_append_scripts(e.scripts), !e.scripts && i.frontOptions && i.init_front()
                        } else l(a).trigger("response.error.load.forminator", o.id, t)
                    },
                    error: function() {
                        l(a).trigger("request.error.load.forminator", o.id)
                    }
                }).always(function() {
                    l(a).trigger("after.load.forminator", o.id)
                })
            },
            render_html: function(t, e, r) {
                var n = this.settings.id,
                    o = this.settings.render_id,
                    i = "",
                    a = null;
                (a = this.$el.find(".forminator-response-message")).length && (i = a.get(0).outerHTML), (a = this.$el.find(".forminator-poll-response-message")).length && (i = a.get(0).outerHTML), this.$el.parent().hasClass("forminator-guttenberg") ? this.$el.parent().html(t) : this.$el.replaceWith(t), l("#forminator-module-" + n + "[data-forminator-render=" + o + "]").hide(), i && (l("#forminator-module-" + n + "[data-forminator-render=" + o + "] .forminator-response-message").replaceWith(i), l("#forminator-module-" + n + "[data-forminator-render=" + o + "] .forminator-poll-response-message").replaceWith(i)), e && (l("style#forminator-module-" + n).length && l("style#forminator-module-" + n).remove(), l("body").append(e)), r && l("body").append(r)
            },
            maybe_append_styles: function(t) {
                for (var e in t) {
                    var r;
                    t.hasOwnProperty(e) && !l("link#" + e).length && ((r = l("<link>")).attr("rel", "stylesheet"), r.attr("id", e), r.attr("type", "text/css"), r.attr("media", "all"), r.attr("href", t[e].src), l("head").append(r))
                }
            },
            maybe_append_scripts: function(t) {
                var e, r = [],
                    n = l("body").find(".hustle-ui").length,
                    o = l("body").find("script[src^='https://www.paypal.com/sdk/js']").attr("src");
                for (e in t)
                    if (t.hasOwnProperty(e)) {
                        var i = t[e].on,
                            a = t[e].load;
                        if ("window" === i) {
                            if (f[a] && "forminator-google-recaptcha" !== e && 0 === n) continue
                        } else if ("$" === i && l.fn[a]) continue;
                        i = {};
                        i.src = t[e].src, i.src !== o && (r.push(i), this.scriptsQue.push(e))
                    }
                if (this.scriptsQue.length)
                    for (var s in r) r.hasOwnProperty(s) && this.load_script(r[s]);
                else this.init_front()
            },
            load_script: function(t) {
                var e = this,
                    r = a.createElement("script"),
                    n = a.getElementsByTagName("body")[0];
                r.type = "text/javascript", r.src = t.src, r.async = !0, r.defer = !0, r.onload = function() {
                    e.script_on_load()
                }, 0 === l('script[src="' + r.src + '"]').length ? n.appendChild(r) : e.script_on_load()
            },
            script_on_load: function() {
                this.scriptsQue.pop(), this.scriptsQue.length || this.init_front()
            },
            init_front: function() {
                var t, e, r, n;
                this.frontInitCalled || (this.frontInitCalled = !0, n = this.settings.id, t = this.settings.render_id, e = this.frontOptions || null, r = this.leadFrontOptions || null, e && l("#forminator-module-" + n + '[data-forminator-render="' + t + '"]').forminatorFront(e), void 0 !== this.settings.has_lead && r && (n = this.settings.leads_id, l("#forminator-module-" + n + '[data-forminator-render="' + t + '"]').forminatorFront(r)), this.init_window_vars())
            },
            init_window_vars: function() {
                var t;
                "undefined" != typeof ForminatorValidationErrors && void 0 !== (t = jQuery(ForminatorValidationErrors.selector).data("forminatorFrontSubmit")) && t.show_messages(ForminatorValidationErrors.errors), "undefined" != typeof ForminatorFormHider && void 0 !== (t = jQuery(ForminatorFormHider.selector).data("forminatorFront")) && t.hide()
            },
            handleDiviPopup: function() {
                var e = this;
                "undefined" != typeof DiviArea && DiviArea.addAction("show_area", function(t) {
                    0 !== t.find("#" + e.element.id).length && (e.frontInitCalled = !1, e.init_front(), forminator_render_hcaptcha())
                })
            }
        }), l.fn[r] = function(t) {
            return this.each(function() {
                l.data(this, r) || l.data(this, r, new e(this, t))
            })
        }
    }(jQuery, window, document),
    function(l, f, s) {
        "use strict";
        var r = "forminatorFront",
            n = {
                form_type: "custom-form",
                rules: {},
                messages: {},
                conditions: {},
                inline_validation: !1,
                print_value: !1,
                chart_design: "bar",
                chart_options: {},
                forminator_fields: [],
                general_messages: {
                    calculation_error: "Failed to calculate field.",
                    payment_require_ssl_error: "SSL required to submit this form, please check your URL.",
                    payment_require_amount_error: "PayPal amount must be greater than 0.",
                    form_has_error: "Please correct the errors before submission."
                },
                payment_require_ssl: !1
            };

        function e(t, e) {
            this.element = t, this.$el = l(this.element), this.forminator_selector = "#" + l(this.element).attr("id") + '[data-forminator-render="' + l(this.element).data("forminator-render") + '"]', this.forminator_loader_selector = 'div[data-forminator-render="' + l(this.element).data("forminator-render") + '"][data-form="' + l(this.element).attr("id") + '"]', this.settings = l.extend({}, n, e), void 0 !== this.settings.messages && (this.settings.messages = this.maybeParseStringToJson(this.settings.messages, "object")), void 0 !== this.settings.rules && (this.settings.rules = this.maybeParseStringToJson(this.settings.rules, "object")), void 0 !== this.settings.calendar && (this.settings.calendar = this.maybeParseStringToJson(this.settings.calendar, "array")), this._defaults = n, this._name = r, this.form_id = 0, this.template_type = "", this.init(), this.handleDiviPopup()
        }

        function t() {
            l(".forminator-custom-form").find(".forminator-label").on("click", function(t) {
                t.preventDefault();
                t = l(this);
                t.next("#" + t.attr("for")).focus()
            })
        }
        l.extend(e.prototype, {
            init: function() {
                var e = this;
                switch (0 < this.$el.find('input[name="form_id"]').length && (this.form_id = this.$el.find('input[name="form_id"]').val()), 0 < this.$el.find('input[name="form_type"]').length && (this.template_type = this.$el.find('input[name="form_type"]').val()), l(this.forminator_loader_selector).remove(), 0 === this.$el.closest(".wph-modal").length && this.$el.show(), l(s).on("hustle:module:displayed", function(t, e) {
                    l(".wph-modal-active").find("form").css("display", "")
                }), e.reint_intlTelInput(), setTimeout(function() {
                    l(".wph-modal-active").find("form").css("display", "")
                }, 10), this.settings.form_type) {
                    case "custom-form":
                        l(this.element).each(function() {
                            e.init_custom_form(this)
                        }), this.$el.on("forminator-clone-group", function(t) {
                            e.init_custom_form(t.target)
                        });
                        break;
                    case "poll":
                        this.init_poll_form();
                        break;
                    case "quiz":
                        this.init_quiz_form()
                }
                var t = {
                    form_type: e.settings.form_type,
                    forminator_selector: e.forminator_selector,
                    chart_design: e.settings.chart_design,
                    chart_options: e.settings.chart_options,
                    has_quiz_loader: e.settings.has_quiz_loader,
                    has_loader: e.settings.has_loader,
                    loader_label: e.settings.loader_label,
                    resetEnabled: e.settings.is_reset_enabled,
                    inline_validation: e.settings.inline_validation
                };
                "leads" !== this.template_type && "quiz" !== this.settings.form_type || (t.form_placement = e.settings.form_placement, t.hasLeads = e.settings.hasLeads, t.leads_id = e.settings.leads_id, t.quiz_id = e.settings.quiz_id, t.skip_form = e.settings.skip_form), l(this.element).forminatorFrontSubmit(t), this.activate_field(), this.small_form(), l(s).trigger("forminator:form:added")
            },
            init_custom_form: function(t) {
                var e, r, n = this,
                    o = this.$el.find(".forminator-save-draft-link"),
                    i = 0 !== o.length,
                    a = (this.init_intlTelInput_validation(t), this.settings.inline_validation && l(t).forminatorFrontValidate({
                        rules: n.settings.rules,
                        messages: n.settings.messages
                    }), l(t).forminatorFrontCalculate({
                        forminatorFields: n.settings.forminator_fields,
                        generalMessages: n.settings.general_messages,
                        memoizeTime: n.settings.calcs_memoize_time || 300
                    }), l(t).forminatorFrontMergeTags({
                        forminatorFields: n.settings.forminator_fields,
                        print_value: n.settings.print_value
                    }), this.init_pagination(t), l(t).find('div[data-is-payment="true"], input[data-is-payment="true"]').first(), n.settings.has_stripe && (r = l(this.element).find(".forminator-stripe-element").first(), l(n.element).is(":visible") && this.renderStripe(n, r), l(s).on("forminator:form:added", function() {
                        n.renderStripe(n, r)
                    })), !n.settings.has_paypal || l(n.element).closest(".et_pb_section").length && !l(n.element).is(":visible") || l(this.element).forminatorFrontPayPal({
                        type: "paypal",
                        paymentEl: this.settings.paypal_config,
                        paymentRequireSsl: n.settings.payment_require_ssl,
                        generalMessages: n.settings.general_messages,
                        has_loader: n.settings.has_loader,
                        loader_label: n.settings.loader_label
                    }), l(t).forminatorFrontCondition(this.settings.conditions, this.settings.calendar), this.init_fui(t), l(t).find(".forminator-datepicker").forminatorFrontDatePicker(this.settings.calendar), this.responsive_captcha(t), this.field_counter(t), this.field_number(t), this.field_time(), l(t).find(".forminator-multi-upload").forminatorFrontMultiFile(this.$el), this.upload_field(t), this.init_login_2FA(), n.maybeRemoveDuplicateFields(t), n.checkComplianzBlocker(), l(f).on("resize", function() {
                        n.responsive_captcha(t)
                    }), l(f).on("load", function() {
                        n.maybeRemoveDuplicateFields(t)
                    }), i ? this.$el.serializeArray() : "");
                this.$el.find(".forminator-field input, .forminator-row input[type=hidden], .forminator-field select, .forminator-field textarea, .forminator-field-signature").on("change input", function(t) {
                    i && o.hasClass("disabled") && (clearTimeout(e), e = setTimeout(function() {
                        n.maybe_enable_save_draft(o, a)
                    }, 500))
                }), void 0 !== n.settings.hasLeads && ("beginning" === n.settings.form_placement && l("#forminator-module-" + this.settings.quiz_id).css({
                    height: 0,
                    opacity: 0,
                    overflow: "hidden",
                    visibility: "hidden",
                    "pointer-events": "none",
                    margin: 0,
                    padding: 0,
                    border: 0
                }), "end" === n.settings.form_placement) && l(t).css({
                    height: 0,
                    opacity: 0,
                    overflow: "hidden",
                    visibility: "hidden",
                    "pointer-events": "none",
                    margin: 0,
                    padding: 0,
                    border: 0
                })
            },
            init_poll_form: function() {
                var o = this,
                    i = this.$el.find("fieldset"),
                    t = this.$el.find(".forminator-radio input"),
                    a = this.$el.find(".forminator-input"),
                    s = a.closest(".forminator-field");
                FUI.inputStates(a), t.on("click", function() {
                    s.addClass("forminator-hidden"), s.attr("aria-hidden", "true"), a.removeAttr("tabindex"), a.attr("name", "");
                    var t, e = this.checked,
                        r = l(this).attr("id"),
                        n = l(this).attr("name");
                    return i.removeClass("forminator-has_error"), o.$el.find(".forminator-input#" + r + "-extra").length && (t = (r = o.$el.find(".forminator-input#" + r + "-extra")).closest(".forminator-field"), e ? (r.attr("name", n + "-extra"), t.removeClass("forminator-hidden"), t.removeAttr("aria-hidden"), r.attr("tabindex", "-1"), r.focus()) : (t.addClass("forminator-hidden"), t.attr("aria-hidden", "true"), r.removeAttr("tabindex"))), !0
                }), this.$el.hasClass("forminator-poll-disabled") && this.$el.find(".forminator-radio").each(function() {
                    l(this).addClass("forminator-disabled"), l(this).find("input").attr("disabled", !0)
                })
            },
            init_quiz_form: function() {
                var a = this,
                    t = void 0 !== a.settings.form_placement ? a.settings.form_placement : "",
                    e = void 0 !== a.settings.quiz_id ? a.settings.quiz_id : 0;
                this.$el.find(".forminator-button:not(.forminator-quiz-start)").each(function() {
                    l(this).prop("disabled", !0)
                }), this.$el.find(".forminator-answer input").each(function() {
                    l(this).attr("checked", !1)
                }), this.$el.find(".forminator-result--info button").on("click", function() {
                    location.reload()
                }), l("#forminator-quiz-leads-" + e + " .forminator-quiz-intro .forminator-quiz-start").on("click", function(t) {
                    t.preventDefault(), l(this).closest(".forminator-quiz-intro").hide(), a.$el.prepend('<button class="forminator-button forminator-quiz-start forminator-hidden"></button>').find(".forminator-quiz-start").trigger("click").remove()
                }), this.$el.on("click", ".forminator-quiz-start", function(t) {
                    t.preventDefault(), a.$el.find(".forminator-quiz-intro").hide(), a.$el.find(".forminator-pagination").removeClass("forminator-hidden");
                    t = {
                        totalSteps: a.$el.find(".forminator-pagination").length - 1,
                        step: 0,
                        quiz: !0
                    };
                    a.settings.text_next && (t.next_button = a.settings.text_next), a.settings.text_prev && (t.prev_button = a.settings.text_prev), a.settings.submit_class && (t.submitButtonClass = a.settings.submit_class), l(a.element).forminatorFrontPagination(t)
                }), "end" !== t && this.$el.find(".forminator-submit-rightaway").on("click", function() {
                    a.$el.submit(), l(this).closest(".forminator-question").find(".forminator-submit-rightaway").addClass("forminator-has-been-disabled").attr("disabled", "disabled")
                }), a.settings.hasLeads && ("beginning" === t && a.$el.css({
                    height: 0,
                    opacity: 0,
                    overflow: "hidden",
                    visibility: "hidden",
                    "pointer-events": "none",
                    margin: 0,
                    padding: 0,
                    border: 0
                }), "end" === t) && (a.$el.closest("div").find("#forminator-module-" + a.settings.leads_id).css({
                    height: 0,
                    opacity: 0,
                    overflow: "hidden",
                    visibility: "hidden",
                    "pointer-events": "none",
                    margin: 0,
                    padding: 0,
                    border: 0
                }), l("#forminator-quiz-leads-" + e + " .forminator-lead-form-skip").hide()), this.$el.on("click", ".forminator-social--icon a", function(t) {
                    t.preventDefault();
                    var t = l(this).data("social"),
                        e = l(this).closest(".forminator-social--icons").data("url"),
                        r = l(this).closest(".forminator-social--icons").data("message"),
                        e = {
                            facebook: "https://www.facebook.com/sharer/sharer.php?u=" + e + "&quote=" + (r = encodeURIComponent(r)),
                            twitter: "https://twitter.com/intent/tweet?&url=" + e + "&text=" + r,
                            google: "https://plus.google.com/share?url=" + e,
                            linkedin: "https://www.linkedin.com/shareArticle?mini=true&url=" + e + "&title=" + r
                        };
                    if (void 0 !== e[t]) return r = f.open(e[t], t, "height=" + l(f).height() + ",width=" + l(f).width()), f.focus && r.focus(), !1
                }), this.$el.on("change", ".forminator-answer input", function(t) {
                    var e = !!l(this).closest(".forminator-pagination").length,
                        r = e ? l(this).closest(".forminator-pagination") : a.$el,
                        n = r.find(".forminator-answer input:checked").length,
                        o = r.find(".forminator-question").length,
                        r = l(this).closest(".forminator-question"),
                        i = r.data("multichoice");
                    a.$el.find(".forminator-button:not(.forminator-button-back)").each(function() {
                        var t = n < o;
                        l(this).prop("disabled", t), e && (t ? l(this).addClass("forminator-disabled") : l(this).removeClass("forminator-disabled"))
                    }), this.checked && !1 === i && r.find(".forminator-answer").not(l(this).parent(".forminator-answer")).each(function(t, e) {
                        l(e).find("> input").prop("checked", !1)
                    })
                })
            },
            small_form: function() {
                var t, e = l(this.element),
                    r = e.width();
                783 < Math.max(s.documentElement.clientWidth, f.innerWidth || 0) && (e.hasClass("forminator-size--small") ? 480 < r && e.removeClass("forminator-size--small") : (t = e.closest(".hustle-content"), e.is(":visible") && r <= 480 && !t.length && e.addClass("forminator-size--small")))
            },
            init_intlTelInput_validation: function(t) {
                var a = l(t),
                    s = a.is(".forminator-design--material");
                a.find(".forminator-field--phone").each(function() {
                    var t, e, r = this,
                        n = l(this).data("national_mode"),
                        o = l(this).data("country"),
                        i = l(this).data("validation");
                    void 0 !== n && (n = {
                        nationalMode: "enabled" === n,
                        initialCountry: void 0 !== o ? o : "us",
                        utilsScript: f.ForminatorFront.cform.intlTelInput_utils_script
                    }, void 0 !== i && "standard" === i && (n.allowDropdown = !1), void 0 !== i && "international" === i && (n.autoHideDialCode = !1), t = l(this).intlTelInput(n), void 0 !== i && "international" === i && (e = "+" + (n = l(this).intlTelInput("getSelectedCountryData").dialCode)) !== l(this).val() && (n = l(this).val().trim().replace(n, "").replace("+", ""), l(this).val(e + n)), void 0 !== i && "standard" === i && l(this).on("blur", function() {
                        "" === l(r).val() && (t.intlTelInput("setCountry", o), a.validate().element(l(r)))
                    }), l(this).on("input", function() {
                        var t, e = l(r).intlTelInput("getSelectedCountryData"),
                            e = e && e.iso2 ? e.iso2.toUpperCase() : "";
                        "" !== e && (t = l(this).val(), "TOO_LONG" !== libphonenumber.validatePhoneNumberLength(t, e) ? (e = new libphonenumber.AsYouType(e).input(t), l(this).val(e)) : l(this).val(t.slice(0, t.length - 1)))
                    }), s ? (l(this).closest(".forminator-field").find("div.iti").addClass("forminator-input-with-phone"), l(this).closest(".forminator-field").find("div.iti").hasClass("iti--allow-dropdown") && l(this).closest(".forminator-field").find(".forminator-label").addClass("iti--allow-dropdown")) : l(this).closest(".forminator-field").find("div.iti").addClass("forminator-phone"))
                })
            },
            reint_intlTelInput: function() {
                var r = this;
                r.$el.on("after:forminator:form:submit", function(t, e) {
                    r.init_intlTelInput_validation(r.forminator_selector)
                })
            },
            init_fui: function(t) {
                var t = l(t),
                    e = t.find(".forminator-input"),
                    r = t.find(".forminator-textarea"),
                    n = t.find(".forminator-select2"),
                    o = t.find(".forminator-multiselect"),
                    i = t.find(".forminator-stripe-element"),
                    a = (t.find(".forminator-slider"), t.find(".forminator-rating"));
                t.attr("data-design"), t.attr("data-design"), t.attr("data-design"), t.attr("data-design");
                e.length && e.each(function() {
                    FUI.inputStates(this)
                }), r.length && r.each(function() {
                    FUI.textareaStates(this)
                }), "function" == typeof FUI.select2 && FUI.select2(n.length), "function" == typeof FUI.slider && FUI.slider(), o.length && FUI.multiSelectStates(o), a.length && "function" == typeof FUI.rating && FUI.rating(a), t.hasClass("forminator-design--material") && (e.length && e.each(function() {
                    FUI.inputMaterial(this)
                }), r.length && r.each(function() {
                    FUI.textareaMaterial(this)
                }), i.length) && i.each(function() {
                    var t = l(this).closest(".forminator-field"),
                        e = t.find(".forminator-label");
                    e.length && (t.addClass("forminator-stripe-floating"), e.addClass("forminator-floating--input"))
                })
            },
            responsive_captcha: function(t) {
                l(t).find(".forminator-g-recaptcha").each(function() {
                    var t = l(this).data("badge");
                    l(this).is(":visible") && "inline" === t && (t = (t = l(this).parent().width()) < 302 ? t / 302 : 1, l(this).css("transform", "scale(" + t + ")"), l(this).css("-webkit-transform", "scale(" + t + ")"), l(this).css("transform-origin", "0 0"), l(this).css("-webkit-transform-origin", "0 0"))
                })
            },
            init_pagination: function(t) {
                var t = l(t).find(".forminator-pagination").length,
                    e = f.location.hash,
                    r = !1,
                    n = 0;
                0 < t && (void 0 !== e && 0 <= e.indexOf("step-") && (r = !0, n = e.substr(6, 8)), l(this.element).forminatorFrontPagination({
                    totalSteps: t,
                    hashStep: r,
                    step: n,
                    inline_validation: this.settings.inline_validation,
                    submitButtonClass: this.settings.submit_button_class
                }))
            },
            activate_field: function() {
                var t = l(this.element),
                    e = t.find(".forminator-input"),
                    r = t.find(".forminator-textarea");

                function n(t) {
                    var r = l(t),
                        n = r.val().trim(),
                        o = r.closest(".forminator-field"),
                        i = r.attr("data-field"),
                        a = r.closest(".forminator-timepicker").parent(),
                        s = o.find(".forminator-error-message");
                    r.on("load change keyup keydown", function(t) {
                        var e;
                        void 0 !== i && !1 !== i ? ("hours" === r.data("field") && (e = a.find('.forminator-error-message[data-error-field="hours"]'), "" !== n) && 0 !== e.length && e.remove(), "minutes" === r.data("field") && (e = a.find('.forminator-error-message[data-error-field="minutes"]'), "" !== n) && 0 !== e.length && e.remove()) : "" !== n && s.text() && (s.remove(), o.removeClass("forminator-has_error")), t.stopPropagation()
                    })
                }

                function o() {
                    t.find(".select2-container").hasClass("select2-container--open") ? setTimeout(o, 300) : t.find(".select2-container").closest(".forminator-field").removeClass("forminator-is_active")
                }
                e.length && e.each(function() {
                    n(this)
                }), r.length && r.each(function() {
                    n(this)
                }), t.find("select.forminator-select2 + .forminator-select").each(function() {
                    var e = l(this);
                    e.on("mouseover", function(t) {
                        t.stopPropagation(), l(this).closest(".forminator-field").addClass("forminator-is_hover")
                    }).on("mouseout", function(t) {
                        t.stopPropagation(), l(this).closest(".forminator-field").removeClass("forminator-is_hover")
                    }), e.on("click", function(t) {
                        t.stopPropagation(), o(), e.hasClass("select2-container--open") ? l(this).closest(".forminator-field").addClass("forminator-is_active") : l(this).closest(".forminator-field").removeClass("forminator-is_active")
                    })
                })
            },
            field_counter: function(t) {
                var t = l(t),
                    e = t.find(".forminator-button-submit");
                t.find(".forminator-input, .forminator-textarea").each(function() {
                    var t = l(this),
                        n = 0;
                    t.on("keydown", function(t) {
                        if (!l(this).hasClass("forminator-textarea") && 13 === t.keyCode) return t.preventDefault(), e.is(":visible") && e.trigger("click"), !1
                    }), t.on("change keyup keydown", function(t) {
                        t.stopPropagation();
                        var e = l(this).closest(".forminator-col").find(".forminator-description span"),
                            r = "string" != typeof(r = l(this).val()) ? r : String(r).replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, "").trim();
                        e.length && e.data("limit") && (r = r.replace(/<[^>]*>/g, ""), "words" !== e.data("type") ? n = l("<div>" + r + "</div>").text().length : (n = r.trim().split(/\s+/).length, r.trim().split(/\s+/).length >= e.data("limit") && 32 === t.which && t.preventDefault()), e.html(n + " / " + e.data("limit")))
                    })
                })
            },
            field_number: function(t) {
                t = l(t);
                t.find("input[type=number]").each(function() {
                    l(this).keypress(function(t) {
                        for (var e = [44, 45, 46], r = t.which, n = 48; n < 58; n++) e.push(n);
                        0 <= e.indexOf(r) || t.preventDefault()
                    })
                }), t.find(".forminator-number--field, .forminator-currency, .forminator-calculation").each(function() {
                    var e;
                    "number" === l(this).attr("type") && (e = l(this).data("decimals"), l(this).change(function(t) {
                        this.value = parseFloat(this.value).toFixed(e)
                    }), l(this).trigger("change")), l(this).inputmask({
                        alias: "decimal",
                        rightAlign: !1,
                        digitsOptional: !1,
                        showMaskOnHover: !1,
                        autoUnmask: !0,
                        removeMaskOnSubmit: !0
                    })
                }), t.find("input[type=number]").on("mouseout", function() {
                    l(this).trigger("blur")
                })
            },
            field_time: function() {
                var s = this;
                l(".forminator-input-time").on("input", function(t) {
                    var e = l(this),
                        r = e.val();
                    r && 2 <= r.length && e.val(r.substr(0, 2))
                }), this.$el.find(".forminator-timepicker").each(function(t, e) {
                    var r, n, o = l(e),
                        i = o.data("start-limit"),
                        a = o.data("end-limit");
                    void 0 !== i && void 0 !== a && (r = o.find(".time-hours"), n = r.html(), s.resetTimePicker(o, i, a), o.find(".time-ampm").on("change", function() {
                        r.val(""), r.html(n), s.resetTimePicker(o, i, a), setTimeout(function() {
                            o.find(".forminator-field").removeClass("forminator-has_error")
                        }, 10)
                    }))
                })
            },
            resetTimePicker: function(t, e, r) {
                var n = t.find(".time-ampm"),
                    [e, o] = e.split(" "),
                    [i, , ] = e.split(":"),
                    i = parseInt(i),
                    [e, a] = r.split(" "),
                    [s, , ] = e.split(":"),
                    s = parseInt(s);
                o === a && n.find('option[value!="' + a + '"]').remove(), t.find(".time-hours").children().each(function(t, e) {
                    var r = parseInt(e.value);
                    "" !== r && (r < i || 0 !== i && 12 === r) && n.val() === o && e.remove(), "" !== r && s < r && 12 !== r && n.val() === a && e.remove()
                })
            },
            init_login_2FA: function() {
                var e = this;
                this.two_factor_providers("totp"), l("body").on("click", ".forminator-2fa-link", function() {
                    e.$el.find("#login_error").remove(), e.$el.find(".notification").empty();
                    var t = l(this).data("slug");
                    e.two_factor_providers(t), "fallback-email" === t && e.resend_code()
                }), this.$el.find(".wpdef-2fa-email-resend input").on("click", function() {
                    e.resend_code()
                })
            },
            two_factor_providers: function(t) {
                var e = this;
                e.$el.find(".forminator-authentication-box").hide(), e.$el.find(".forminator-authentication-box input").attr("disabled", !0), e.$el.find("#forminator-2fa-" + t).show(), e.$el.find("#forminator-2fa-" + t + " input").attr("disabled", !1), 0 < e.$el.find(".forminator-2fa-link").length && (e.$el.find(".forminator-2fa-link").hide(), e.$el.find(".forminator-2fa-link:not(#forminator-2fa-link-" + t + ")").each(function() {
                    e.$el.find(".forminator-auth-method").val(t), l(this).find("input").attr("disabled", !1), l(this).show()
                }))
            },
            resend_code: function() {
                var e = l('input[name="button_resend_code"]'),
                    t = l(".forminator-auth-token"),
                    t = {
                        action: "forminator_2fa_fallback_email",
                        data: JSON.stringify({
                            token: t
                        })
                    };
                l.ajax({
                    type: "POST",
                    url: f.ForminatorFront.ajaxUrl,
                    data: t,
                    beforeSend: function() {
                        e.attr("disabled", "disabled"), l(".def-ajaxloader").show()
                    },
                    success: function(t) {
                        e.removeAttr("disabled"), l(".def-ajaxloader").hide(), l(".notification").text(t.data.message)
                    }
                })
            },
            material_field: function() {},
            toggle_file_input: function() {
                l(this.element).find(".forminator-file-upload").each(function() {
                    var t = l(this),
                        e = t.find("input"),
                        t = t.find(".forminator-button-delete");
                    "" !== e.val() ? t.show() : t.hide()
                })
            },
            upload_field: function(t) {
                var r = this,
                    e = l(t);
                this.toggle_file_input(), e.find(".forminator-button-delete").on("click", function(t) {
                    t.preventDefault();
                    var t = l(this),
                        e = t.siblings("input"),
                        r = t.closest(".forminator-file-upload").find("> span");
                    e.val(""), r.html(r.data("empty-text")), t.hide()
                }), e.find(".forminator-input-file, .forminator-input-file-required").on("change", function() {
                    var t = l(this).closest(".forminator-file-upload").find("> span"),
                        e = l(this).val(),
                        e = e.length ? e.split("\\").pop() : "";
                    t.text(e), r.toggle_file_input()
                }), e.find(".forminator-button-upload").off(), e.find(".forminator-button-upload").on("click", function(t) {
                    t.preventDefault();
                    t = l(this).attr("data-id");
                    e.find("input#" + t).trigger("click")
                }), e.find(".forminator-input-file, .forminator-input-file-required").on("change", function(t) {
                    t.preventDefault();
                    var t = l(this)[0].files.length,
                        e = l(this).find(".forminator-button-delete");
                    0 === t ? e.hide() : e.show()
                })
            },
            maybeRemoveDuplicateFields: function(t) {
                var e, r, t = l(t);
                l(s).find("link[id='neira-lite-style-css']").length && (e = t.find(".forminator-select-container").next(".chosen-container"), r = t.find("select.forminator-select2 + .forminator-select").next(".chosen-container"), t = t.find(".forminator-select").next(".chosen-container"), 0 !== e.length && e.remove(), 0 !== r.length && r.remove(), 0 !== t.length) && t.remove()
            },
            renderCaptcha: function(t) {
                var e, r, n = this;
                void 0 === l(t).data("forminator-recapchta-widget") && (r = l(t).data("size"), e = {
                    sitekey: l(t).data("sitekey"),
                    theme: l(t).data("theme"),
                    size: r
                }, "invisible" === r ? (e.badge = l(t).data("badge"), e.callback = function(t) {
                    l(n.element).trigger("submit.frontSubmit")
                }) : e.callback = function() {
                    l(t).parent(".forminator-col").removeClass("forminator-has_error").remove(".forminator-error-message")
                }, "" !== e.sitekey) && (r = f.grecaptcha.render(t, e), l(t).data("forminator-recapchta-widget", r), this.addCaptchaAria(t), this.responsive_captcha())
            },
            renderHcaptcha: function(t) {
                var e, r, n = this;
                void 0 === l(t).data("forminator-hcaptcha-widget") && (r = l(t).data("size"), (e = {
                    sitekey: l(t).data("sitekey"),
                    theme: l(t).data("theme"),
                    size: r
                }).callback = "invisible" === r ? function(t) {
                    l(n.element).trigger("submit.frontSubmit")
                } : function() {
                    l(t).parent(".forminator-col").removeClass("forminator-has_error").remove(".forminator-error-message")
                }, "" !== e.sitekey) && (r = hcaptcha.render(t, e), l(t).data("forminator-hcaptcha-widget", r))
            },
            addCaptchaAria: function(t) {
                var e = l(t).find(".g-recaptcha-response"),
                    t = l(t).find(">div");
                0 !== e.length && (e.attr("aria-hidden", "true"), e.attr("aria-label", "do not use"), e.attr("aria-readonly", "true")), 0 !== t.length && t.css("z-index", 99)
            },
            hide: function() {
                this.$el.hide()
            },
            maybeParseStringToJson: function(t, e) {
                var r = {};
                if ("object" == typeof t) return t;
                if ("object" === e) t = "{" + t.trim() + "}";
                else {
                    if ("array" !== e) return {};
                    t = "[" + t.trim() + "]"
                }
                try {
                    t = t.replace(/\,(?!\s*?[\{\[\"\'\w])/g, ""), r = JSON.parse(t)
                } catch (t) {
                    console.error(t.message), "object" === e ? r = {} : "array" === e && (r = [])
                }
                return r
            },
            renderStripe: function(t, e, r = 0) {
                var n = this;
                setTimeout(function() {
                    r++, "undefined" != typeof Stripe ? l(t.element).forminatorFrontPayment({
                        type: "stripe",
                        paymentEl: e,
                        paymentRequireSsl: t.settings.payment_require_ssl,
                        generalMessages: t.settings.general_messages,
                        has_loader: t.settings.has_loader,
                        loader_label: t.settings.loader_label
                    }) : r < 300 ? n.renderStripe(t, e, r) : console.error("Failed to load Stripe.")
                }, 100)
            },
            maybe_enable_save_draft: function(t, e) {
                var r = this.$el.serializeArray(),
                    n = !1,
                    o = !!this.$el.find(".forminator-field-signature").length,
                    r = r.filter(function(t) {
                        return -1 === t.name.indexOf("ctlSignature")
                    });
                (e = JSON.stringify(e)) !== (r = JSON.stringify(r)) && (n = !0), o && !1 === n && this.$el.find(".forminator-field-signature").each(function(t) {
                    var e = l(this).find(".signature-prefix").val();
                    if (0 !== l(this).find("#ctlSignature" + e + "_data").length && "" !== l(this).find("#ctlSignature" + e + "_data").val()) return !(n = !0)
                }), n ? t.removeClass("disabled") : t.addClass("disabled")
            },
            handleDiviPopup: function() {
                var e = this;
                "undefined" != typeof DiviArea && DiviArea.addAction("show_area", function(t) {
                    setTimeout(function() {
                        e.init(), forminatorSignInit(), forminatorSignatureResize()
                    }, 100)
                })
            },
            disableFields: function() {
                this.$el.addClass("forminator-fields-disabled")
            },
            checkComplianzBlocker: function() {
                var t = this.$el.find(".cmplz-blocked-content-container");
                0 < t.length && (t = t.closest(".forminator-row"), this.disableFields(), t.insertBefore(this.$el.find(".forminator-row").first()), t.css({
                    "pointer-events": "all",
                    opacity: "1"
                }), t.find("*").css("pointer-events", "all"), 0 < t.closest(".forminator-pagination--content").length && (t.closest(".forminator-pagination--content").css({
                    "pointer-events": "all",
                    opacity: "1"
                }), t.nextAll(".forminator-row").css({
                    opacity: "0.5"
                })), l("body").on("click", ".cmplz-blocked-content-notice, .cmplz-accept", function() {
                    setTimeout(function() {
                        f.location.reload()
                    }, 50)
                }))
            }
        }), l.fn[r] = function(t) {
            return this.each(function() {
                l.data(this, r) || l.data(this, r, new e(this, t))
            })
        }, l(s).on("tinymce-editor-init", function(t, e) {
            var r = e.id,
                n = l("#" + r).closest(".forminator-col");
            e.on("change", function() {
                -1 !== r.indexOf("forminator-field-textarea-") && (e.save(), n.find("#" + r).trigger("change")), -1 !== r.indexOf("forminator-field-post-content-") && (e.save(), n.find("#" + r).trigger("change"))
            }), e.on("blur", function() {
                -1 === r.indexOf("forminator-field-textarea-") && -1 === r.indexOf("forminator-field-post-content-") || n.find("#" + r).valid()
            }), l("#" + e.id + "_ifr").is(":visible") && l("#" + e.id + "_ifr").height(l("#" + e.id).height()), -1 !== r.indexOf("forminator") && l("#" + r).closest(".wp-editor-wrap").attr("aria-describedby", r + "-description")
        }), l(s).on("click", ".forminator-copy-btn", function(t) {
            var e = l(this).prev(".forminator-draft-link").val();
            if (navigator.clipboard) navigator.clipboard.writeText(e).then(function() {}, function(t) {});
            else {
                var r = s.createElement("textarea");
                r.value = e, r.style.top = "0", r.style.left = "0", r.style.position = "fixed", s.body.appendChild(r), r.focus(), r.select();
                try {
                    s.execCommand("copy")
                } catch (t) {}
                s.body.removeChild(r)
            }
            l(this).hasClass("copied") || (l(this).addClass("copied"), l(this).prepend("&check;  "))
        }), t(), l(s).on("after.load.forminator", t), jQuery(s).on("elementor/popup/show", () => {
            forminator_render_captcha(), forminator_render_hcaptcha()
        })
    }(jQuery, window, document);
var forminator_render_captcha = function() {
        jQuery(".forminator-g-recaptcha").each(function() {
            var e = jQuery(this),
                r = e.closest("form");
            0 < r.length && "" === e.html() && window.setTimeout(function() {
                var t = r.data("forminatorFront");
                void 0 !== t && t.renderCaptcha(e[0])
            }, 100)
        })
    },
    forminator_render_hcaptcha = function() {
        jQuery(".forminator-hcaptcha").each(function() {
            var e = jQuery(this),
                r = e.closest("form");
            0 < r.length && "" === e.html() && window.setTimeout(function() {
                var t = r.data("forminatorFront");
                void 0 !== t && t.renderHcaptcha(e[0])
            }, 100)
        })
    },
    forminatorDateUtil = {
        month_number: function(t) {
            var e, r;
            return t.constructor === Number ? t : (r = NaN, t.constructor === String && (t = t.toLowerCase(), r = -1 === (e = -1 === (e = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(t)) ? ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].indexOf(t) : e) ? NaN : e), r)
        },
        convert: function(t) {
            return t.constructor === Date ? t : t.constructor === Array ? new Date(t[0], this.month_number(t[1]), t[2]) : jQuery.isNumeric(t) ? new Date(+t) : t.constructor === Number || t.constructor === String ? new Date(t) : "object" == typeof t ? new Date(t.year, this.month_number(t.month), t.date) : NaN
        },
        compare: function(t, e) {
            return isFinite(t = this.convert(t).valueOf()) && isFinite(e = this.convert(e).valueOf()) ? (e < t) - (t < e) : NaN
        },
        inRange: function(t, e, r) {
            return isFinite(t = this.convert(t).valueOf()) && isFinite(e = this.convert(e).valueOf()) && isFinite(r = this.convert(r).valueOf()) ? e <= t && t <= r : NaN
        },
        diffInDays: function(t, e) {
            return t = this.convert(t), e = this.convert(e), "function" != typeof t.getMonth || "function" != typeof e.getMonth ? NaN : (e = e.getTime(), t = t.getTime(), parseFloat((e - t) / 864e5))
        },
        diffInWeeks: function(t, e) {
            return t = this.convert(t), e = this.convert(e), "function" != typeof t.getMonth || "function" != typeof e.getMonth ? NaN : (e = e.getTime(), t = t.getTime(), parseInt((e - t) / 6048e5))
        },
        diffInMonths: function(t, e) {
            var r, n;
            return t = this.convert(t), e = this.convert(e), "function" != typeof t.getMonth || "function" != typeof e.getMonth ? NaN : (r = t.getFullYear(), n = e.getFullYear(), t = t.getMonth(), e.getMonth() + 12 * n - (t + 12 * r))
        },
        diffInYears: function(t, e) {
            return t = this.convert(t), e = this.convert(e), "function" != typeof t.getMonth || "function" != typeof e.getMonth ? NaN : e.getFullYear() - t.getFullYear()
        }
    };
! function(s, o, u) {
    "use strict";
    var r = "forminatorFrontCalculate",
        n = {
            forminatorFields: [],
            generalMessages: {}
        };

    function e(t, e) {
        this.element = t, this.$el = s(this.element), this.settings = s.extend({}, n, e), this._defaults = n, this._name = r, this.calculationFields = [], this.triggerInputs = [], this.isError = !1, this.init()
    }
    s.extend(e.prototype, {
        init: function() {
            var e = this,
                t = this.$el.find("input.forminator-calculation");
            0 < t.length && (t.each(function() {
                var t;
                e.calculationFields.push({
                    $input: s(this),
                    formula: s(this).data("formula"),
                    name: s(this).attr("name"),
                    isHidden: s(this).data("isHidden"),
                    precision: s(this).data("precision")
                }), s(this).data("isHidden") && (s(this).closest(".forminator-col").addClass("forminator-hidden forminator-hidden-option"), (t = s(this).closest(".forminator-row")).addClass("forminator-hidden-option"), 0 === t.find("> .forminator-col:not(.forminator-hidden)").length) && t.addClass("forminator-hidden")
            }), t = this.settings.memoizeTime || 300, this.debouncedReCalculateAll = this.debounce(this.recalculateAll, 1e3), this.memoizeDebounceRender = this.memoize(this.recalculate, t), this.$el.on("forminator:field:condition:toggled", function(t) {
                e.debouncedReCalculateAll()
            }), this.parseCalcFieldsFormula(), this.attachEventToTriggeringFields(), this.debouncedReCalculateAll()), this.$el.off("forminator:recalculate").on("forminator:recalculate", function() {
                e.recalculateAll()
            })
        },
        memoize: function(e, r) {
            var n, o = {},
                i = Array.prototype.slice;
            return function() {
                var t = i.call(arguments);
                return clearTimeout(n), n = setTimeout(function() {
                    n = null, o = {}
                }, r), t[0].name in o ? o[t[0].name] : o[t[0].name] = e.apply(this, t)
            }
        },
        debounce: function(n, o, i) {
            var a;
            return function() {
                var t = this,
                    e = arguments,
                    r = i && !a;
                clearTimeout(a), a = setTimeout(function() {
                    a = null, i || n.apply(t, e)
                }, o), r && n.apply(t, e)
            }
        },
        parseCalcFieldsFormula: function() {
            for (var t = 0; t < this.calculationFields.length; t++) {
                var e = this.calculationFields[t],
                    r = e.formula;
                e.formula = r, this.calculationFields[t] = e
            }
        },
        findTriggerInputs: function(t) {
            for (var e = t.formula, r = this.settings.forminatorFields.join("|"), n = new RegExp("\\{(" + ("(" + r + ")-\\d+") + "(?:-min|-max)?)(\\-[A-Za-z-_]+)?(\\-[A-Za-z0-9-_]+)?\\}", "g"), e = this.maybeReplaceCalculationGroups(e); a = n.exec(e);) {
                var o = a[0],
                    i = a[4] || "",
                    i = a[1] + i,
                    a = a[2];
                if (o !== u && i !== u && a !== u) {
                    o = this.get_form_field(i);
                    if (o.length) {
                        for (var s = o.data("calcFields"), l = (s === u && (s = []), !1), f = 0; f < s.length; f++)
                            if (s[f].name === t.name) {
                                l = !0;
                                break
                            }
                        l || s.push(t), o.data("calcFields", s), this.triggerInputs.push(o)
                    }
                }
            }
        },
        get_form_field: function(t) {
            let e = this.$el;
            var r = (e = e.hasClass("forminator-grouped-fields") ? e.closest("form.forminator-ui") : e).data("form-id"),
                n = e.data("uid"),
                r = e.find("#forminator-form-" + r + "__field--" + t + "_" + n);
            return r = 0 === r.length && 0 === (r = e.find("#" + t + "-field")).length && 0 === (r = e.find("input[name=" + t + "]")).length && 0 === (r = e.find("textarea[name=" + t + "]")).length && 0 === (r = e.find('input[name="' + t + '[]"]')).length && 0 === (r = this.$el.find('select[name="' + t + '"]')).length && 0 === (r = this.$el.find('select[name="' + t + '[]"]')).length ? e.find("#" + t) : r
        },
        attachEventToTriggeringFields: function() {
            for (var n = this, t = 0; t < this.calculationFields.length; t++) {
                var e = this.calculationFields[t];
                this.findTriggerInputs(e)
            }
            if (0 < this.triggerInputs.length)
                for (var r = [], o = 0; o < this.triggerInputs.length; o++) {
                    var i = this.triggerInputs[o],
                        a = i.attr("id");
                    r.indexOf(a) < 0 && (i.on("change.forminatorFrontCalculate, blur", function() {
                        var t = s(this).data("calcFields");
                        if (t !== u && 0 < t.length)
                            for (var e = 0; e < t.length; e++) {
                                var r = t[e];
                                n.field_is_checkbox(s(this)) || n.field_is_radio(s(this)) ? n.recalculate(r) : n.memoizeDebounceRender(r)
                            }
                    }), r.push(a))
                }
        },
        recalculateAll: function() {
            for (var t = 0; t < this.calculationFields.length; t++) this.recalculate(this.calculationFields[t])
        },
        recalculate: function(t) {
            var e = t.$input,
                r = (this.hideErrorMessage(e), this.maybeReplaceFieldOnFormula(t.formula)),
                n = 0,
                r = new o.forminatorCalculator(r);
            try {
                if (n = r.calculate(), !isFinite(n)) throw "Infinity calculation result."
            } catch (t) {
                this.isError = !0, console.log(t), this.displayErrorMessage(e, this.settings.generalMessages.calculation_error), n = "0"
            }
            n = (+(Math.round(n + ("e+" + t.precision)) + ("e-" + t.precision))).toFixed(t.precision), r = e.val(), t = e.data("decimal-point");
            r !== (n = String(n).replace(".", t)) && e.val(n).trigger("change")
        },
        maybeReplaceCalculationGroups: function(t) {
            for (var e = new RegExp("\\{((?:calculation|number|slider|currency|radio|select|checkbox)-\\d+(?:-min|-max)?)-\\*\\}", "g"); n = e.exec(t);) {
                var r = n[0],
                    n = n[1],
                    n = this.$el.find("[name='" + n + "'], [name='" + n + "[]'], [name^='" + n + "-']").map(function() {
                        return "{" + this.name.replace("[]", "") + "}"
                    }).get();
                n = "(" + (n = s.unique(n.sort())).join("+") + ")", t = t.replace(r, n)
            }
            return t
        },
        maybeReplaceFieldOnFormula: function(t) {
            t = this.maybeReplaceCalculationGroups(t);
            for (var e = this.settings.forminatorFields.join("|"), r = new RegExp("\\{(" + ("(" + e + ")-\\d+") + "(?:-min|-max)?)(\\-[A-Za-z-_]+)?(\\-[A-Za-z0-9-_]+)?\\}", "g"), n = t; s = r.exec(t);) {
                var o, i = s[0],
                    a = s[4] || "",
                    a = s[1] + a,
                    s = s[2],
                    l = i;
                i !== u && a !== u && s !== u && (this.is_hidden(a) ? (l = 0, "zero" !== this.get_form_field(a).data("hidden-behavior") && (o = i.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1"), !(o = new RegExp("([\\+\\-\\*\\/]?)[^\\+\\-\\*\\/\\(]*" + o + "[^\\)\\+\\-\\*\\/]*([\\+\\-\\*\\/]?)").exec(n)) || "*" !== o[1] && "/" !== o[1] && "*" !== o[2] && "/" !== o[2] || (l = 1))) : ("calculation" === s && (o = this.get_calculation_field(a)) && this.memoizeDebounceRender(o), l = this.get_field_value(a)), n = n.replace(i, l = "(" + l + ")"))
            }
            return n
        },
        get_calculation_field: function(t) {
            for (var e = 0; e < this.calculationFields.length; e++)
                if (this.calculationFields[e].name === t) return this.calculationFields[e];
            return !1
        },
        is_hidden: function(t) {
            var t = this.get_form_field(t).closest(".forminator-col"),
                e = t.closest(".forminator-row");
            return !(e.hasClass("forminator-hidden-option") || t.hasClass("forminator-hidden-option") || !e.hasClass("forminator-hidden") && !t.hasClass("forminator-hidden"))
        },
        get_field_value: function(t) {
            var t = this.get_form_field(t),
                e = 0,
                r = 0,
                n = null;
            return this.field_is_radio(t) ? (n = t.filter(":checked")).length && (r = n.data("calculation")) !== u && (e = Number(r)) : this.field_is_checkbox(t) ? t.each(function() {
                s(this).is(":checked") && (r = s(this).data("calculation")) !== u && (e += Number(r))
            }) : this.field_is_select(t) ? (n = t.find("option").filter(":selected")).length && n.each(function() {
                (r = s(this).data("calculation")) !== u && (e += Number(r))
            }) : this.field_has_inputMask(t) ? e = parseFloat(t.inputmask("unmaskedvalue").replace(",", ".")) : t.length && (n = t.val(), e = parseFloat(n.replace(",", "."))), isNaN(e) ? 0 : e
        },
        field_has_inputMask: function(t) {
            var e = !1;
            return t.each(function() {
                if (u !== s(this).attr("data-inputmask")) return !(e = !0)
            }), e
        },
        field_is_radio: function(t) {
            var e = !1;
            return t.each(function() {
                if ("radio" === s(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_checkbox: function(t) {
            var e = !1;
            return t.each(function() {
                if ("checkbox" === s(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_select: function(t) {
            return t.is("select")
        },
        displayErrorMessage: function(t, e) {
            var r = t.closest(".forminator-field--inner"),
                n = (r = 0 === r.length ? t.closest(".forminator-field") : r).find(".forminator-error-message"),
                o = t.attr("id") + "-error",
                i = t.attr("aria-describedby");
            i ? ((i = i.split(" ")).includes(o) || i.push(o), i = i.join(" "), t.attr("aria-describedby", i)) : t.attr("aria-describedby", o), 0 === n.length && (r.append('<span class="forminator-error-message" id="' + o + '"></span>'), n = r.find(".forminator-error-message")), t.attr("aria-invalid", "true"), n.html(e), r.addClass("forminator-has_error")
        },
        hideErrorMessage: function(t) {
            var e = t.closest(".forminator-field--inner"),
                r = (e = 0 === e.length ? t.closest(".forminator-field") : e).find(".forminator-error-message"),
                n = t.attr("id") + "-error",
                o = t.attr("aria-describedby");
            o ? (o = o.split(" ").filter(function(t) {
                return t !== n
            }).join(" "), t.attr("aria-describedby", o)) : t.removeAttr("aria-describedby"), t.removeAttr("aria-invalid"), r.remove(), e.removeClass("forminator-has_error")
        }
    }), s.fn[r] = function(t) {
        return this.each(function() {
            s.data(this, r) || s.data(this, r, new e(this, t))
        })
    }
}(jQuery, window, void document),
function(a, s) {
    "use strict";
    var r = "forminatorFrontMergeTags",
        n = {
            print_value: !1,
            forminatorFields: []
        };

    function e(t, e) {
        this.element = t, this.$el = a(this.element), this.settings = a.extend({}, n, e), this._defaults = n, this._name = r, ForminatorFront.MergeTags = ForminatorFront.MergeTags || [], this.init()
    }
    a.extend(e.prototype, {
        init: function() {
            var r = this,
                t = this.$el.find(".forminator-merge-tags");
            const i = this.getFormId();
            ForminatorFront.MergeTags[i] = ForminatorFront.MergeTags[i] || [], 0 < t.length && t.each(function() {
                let n = a(this).html(),
                    t = a(this).data("field");
                if (r.$el.hasClass("forminator-grouped-fields")) {
                    const o = r.$el.data("suffix");
                    var e;
                    ForminatorFront.MergeTags[i][t] && (n = ForminatorFront.MergeTags[i][t].value, e = r.$el.find("[name]").map(function() {
                        return this.name
                    }).get(), a.each(e, function(t, e) {
                        var r = e.replace("-" + o, "");
                        r !== e && (r = new RegExp(`{${r}}`, "g"), n = n.replace(r, "{" + e + "}"))
                    })), t += "-" + o
                }
                ForminatorFront.MergeTags[i][t] = {
                    $input: a(this),
                    value: n
                }
            }), this.replaceAll(), this.attachEvents()
        },
        getFormId: function() {
            let t = "";
            return t = (this.$el.hasClass("forminator-grouped-fields") ? this.$el.closest("form.forminator-ui") : this.$el).data("form-id")
        },
        attachEvents: function() {
            var t = this;
            this.$el.find(".forminator-textarea, input.forminator-input, .forminator-checkbox, .forminator-radio, .forminator-input-file, select.forminator-select2, .forminator-multiselect input, input.forminator-slider-hidden, input.forminator-slider-hidden-min, input.forminator-slider-hidden-max, select.forminator-rating").each(function() {
                a(this).on("change", function() {
                    setTimeout(function() {
                        t.replaceAll()
                    }, 300)
                })
            })
        },
        replaceAll: function() {
            var t = this.getFormId(),
                e = ForminatorFront.MergeTags[t];
            for (const n in e) {
                var r = e[n];
                this.replace(r)
            }
        },
        replace: function(t) {
            var e = t.$input,
                t = this.maybeReplaceValue(t.value);
            e.html(t)
        },
        maybeReplaceValue: function(t) {
            for (var e = this.settings.forminatorFields.join("|"), r = new RegExp("\\{(" + ("(" + e + ")-\\d+") + ")(\\-[0-9A-Za-z-_]+)?\\}", "g"), n = t; a = r.exec(t);) {
                var o = a[0],
                    i = o.replace("{", "").replace("}", ""),
                    a = a[2];
                o !== s && i !== s && a !== s && (a = this.get_field_value(i), n = n.replace(o, a))
            }
            return n
        },
        get_form_field: function(t) {
            let e = this.$el;
            var r = (e = e.hasClass("forminator-grouped-fields") ? e.closest("form.forminator-ui") : e).find("#" + t + "-field");
            return r = 0 === r.length && 0 === (r = e.find("[name=" + t + "]")).length && 0 === (r = e.find('input[name="' + t + '[]"]')).length && 0 === (r = e.find('select[name="' + t + '[]"]')).length ? e.find("#" + t) : r
        },
        is_calculation: function(t) {
            return !!this.get_form_field(t).hasClass("forminator-calculation")
        },
        get_field_value: function(t) {
            var e = this.get_form_field(t),
                r = this,
                n = "",
                o = null;
            if (this.is_hidden(t) && !this.is_calculation(t)) return "";
            if (0 === e.length) return "";
            if (this.is_calculation(t) && (!this.get_form_field(t).closest(".forminator-col").closest(".forminator-row").hasClass("forminator-hidden-option") && this.is_hidden(t))) return "";
            return this.field_is_radio(e) ? (o = e.filter(":checked")).length && (n = this.settings.print_value ? o.val() : (0 === o.siblings(".forminator-radio-label").length ? o.siblings(".forminator-screen-reader-only") : o.siblings(".forminator-radio-label")).text()) : this.field_is_checkbox(e) ? e.each(function() {
                var t;
                a(this).is(":checked") && ("" !== n && (n += ", "), t = !!a(this).closest(".forminator-multiselect").length, r.settings.print_value ? n += a(this).val() : n += (t ? a(this).closest("label") : 0 === a(this).siblings(".forminator-checkbox-label").length ? a(this).siblings(".forminator-screen-reader-only") : a(this).siblings(".forminator-checkbox-label")).text())
            }) : this.field_is_select(e) ? (o = e.find("option").filter(":selected")).length && o.each(function() {
                "" !== n && (n += ", "), r.settings.print_value ? n += a(this).val() : n += a(this).text()
            }) : this.field_is_upload(e) ? n = e.val().split("\\").pop() : this.field_has_inputMask(e) ? (e.inputmask({
                autoUnmask: !1
            }), n = e.val(), e.inputmask({
                autoUnmask: !0
            })) : n = e.val(), n
        },
        field_has_inputMask: function(t) {
            var e = !1;
            return t.each(function() {
                if (s !== a(this).attr("data-inputmask")) return !(e = !0)
            }), e
        },
        field_is_radio: function(t) {
            var e = !1;
            return t.each(function() {
                if ("radio" === a(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_checkbox: function(t) {
            var e = !1;
            return t.each(function() {
                if ("checkbox" === a(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_upload: function(t) {
            return "file" === t.attr("type")
        },
        field_is_select: function(t) {
            return t.is("select")
        },
        is_hidden: function(t) {
            var t = this.get_form_field(t).closest(".forminator-col"),
                e = t.closest(".forminator-row");
            return !(!e.hasClass("forminator-hidden-option") && !e.hasClass("forminator-hidden") && !t.hasClass("forminator-hidden"))
        }
    }), a.fn[r] = function(t) {
        return this.each(function() {
            a.data(this, r) || a.data(this, r, new e(this, t))
        })
    }
}(jQuery, (window, void document)),
function(s, a, u) {
    "use strict";
    Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function(t, e) {
            if (t === u || null === t) throw new TypeError("Cannot convert first argument to object");
            for (var r = Object(t), n = 1; n < arguments.length; n++) {
                var o = arguments[n];
                if (o !== u && null !== o)
                    for (var i = Object.keys(Object(o)), a = 0, s = i.length; a < s; a++) {
                        var l = i[a],
                            f = Object.getOwnPropertyDescriptor(o, l);
                        f !== u && f.enumerable && (r[l] = o[l])
                    }
            }
            return r
        }
    });
    var r = "forminatorFrontPayment",
        n = {
            type: "stripe",
            paymentEl: null,
            paymentRequireSsl: !1,
            generalMessages: {}
        };

    function e(t, e) {
        this.element = t, this.$el = s(this.element), this.settings = s.extend({}, n, e), this._defaults = n, this._name = r, this._stripeData = null, this._stripe = null, this._cardElement = null, this._stripeToken = null, this._beforeSubmitCallback = null, this._form = null, this._paymentIntent = null, this.init()
    }
    s.extend(e.prototype, {
        init: function() {
            var n;
            this.settings.paymentEl && void 0 !== this.settings.paymentEl.data() && ((n = this)._stripeData = this.settings.paymentEl.data(), !1 !== this.mountCardField()) && (s(this.element).on("payment.before.submit.forminator", function(t, e, r) {
                n._form = n.getForm(t), n._beforeSubmitCallback = r, n.validateStripe(t, e)
            }), this.$el.on("forminator:form:submit:stripe:3dsecurity", function(t, e, r) {
                n.validate3d(t, e, r)
            }), this.$el.find("input.forminator-input, .forminator-field-textarea textarea, .forminator-checkbox input, .forminator-radio input, select.forminator-select2").each(function() {
                s(this).on("change", function(t) {
                    n.mapZip(t)
                })
            }).trigger("change"))
        },
        validate3d: function(t, e, r) {
            var n = this;
            r ? this._stripe.confirmCardPayment(e, {
                payment_method: {
                    card: n._cardElement,
                    ...n.getBillingData()
                }
            }).then(function(t) {
                n.$el.find("#forminator-stripe-subscriptionid").val(r), n._beforeSubmitCallback && n._beforeSubmitCallback.call()
            }) : this._stripe.retrievePaymentIntent(e).then(function(t) {
                "requires_action" !== t.paymentIntent.status && "requires_source_action" !== t.paymentIntent.status || n._stripe.confirmCardPayment(e, {
                    payment_method: {
                        card: n._cardElement,
                        ...n.getBillingData()
                    }
                }).then(function(t) {
                    n._beforeSubmitCallback && n._beforeSubmitCallback.call()
                })
            })
        },
        validateStripe: function(r, n) {
            var o = this;
            this._stripe.createToken(this._cardElement).then(function(t) {
                t.error ? (o.showCardError(t.error.message, !0), o.$el.find("button").removeAttr("disabled")) : (o.hideCardError(), o._stripe.createPaymentMethod("card", o._cardElement, o.getBillingData()).then(function(t) {
                    var e = o.getObjectValue(t, "paymentMethod");
                    o._stripeData.paymentMethod = o.getObjectValue(e, "id"), o.updateAmount(r, n, t)
                }))
            })
        },
        isValid: function(e) {
            var r = this;
            this._stripe.createToken(this._cardElement).then(function(t) {
                t.error ? r.showCardError(t.error.message, e) : r.hideCardError()
            })
        },
        getForm: function(t) {
            t = s(t.target);
            return t = t.hasClass("forminator-custom-form") ? t : t.closest("form.forminator-custom-form")
        },
        updateAmount: function(r, n, t) {
            r.preventDefault();
            var o = this,
                e = n,
                t = this.getObjectValue(t, "paymentMethod"),
                t = (e.append("action", "forminator_update_payment_amount"), e.append("paymentid", this.getStripeData("paymentid")), e.append("payment_method", this.getObjectValue(t, "id")), this.getStripeData("receipt")),
                i = this.getStripeData("receiptEmail");
            t && i && (t = this.get_field_value(i) || "", e.append("receipt_email", t)), s.ajax({
                type: "POST",
                url: a.ForminatorFront.ajaxUrl,
                data: e,
                cache: !1,
                contentType: !1,
                processData: !1,
                beforeSend: function() {
                    var t;
                    void 0 !== o.settings.has_loader && o.settings.has_loader && (o._form.addClass("forminator-fields-disabled"), (t = o._form.find(".forminator-response-message")).html("<p>" + o.settings.loader_label + "</p>"), o.focus_to_element(t), t.removeAttr("aria-hidden").prop("tabindex", "-1").removeClass("forminator-success forminator-error").addClass("forminator-loading forminator-show")), o._form.find("button").attr("disabled", !0)
                },
                success: function(t) {
                    var e;
                    !0 === t.success ? void 0 !== t.data && void 0 !== t.data.paymentid ? (o.$el.find("#forminator-stripe-paymentid").val(t.data.paymentid), o.$el.find("#forminator-stripe-paymentmethod").val(o._stripeData.paymentMethod), o._stripeData.paymentid = t.data.paymentid, o._stripeData.secret = t.data.paymentsecret, o.handleCardPayment(t, r, n)) : o.show_error("Invalid Payment Intent ID") : (o.show_error(t.data.message), t.data.errors.length && o.show_messages(t.data.errors), (t = o._form.find(".forminator-g-recaptcha")).length && (e = (t = s(t.get(0))).data("forminator-recapchta-widget"), "invisible" === t.data("size")) && a.grecaptcha.reset(e))
                },
                error: function(t) {
                    t = 400 === t.status ? a.ForminatorFront.cform.upload_error : a.ForminatorFront.cform.error;
                    o.show_error(t)
                }
            })
        },
        show_error: function(t) {
            var e = this._form.find(".forminator-response-message");
            this._form.find("button").removeAttr("disabled"), e.removeAttr("aria-hidden").prop("tabindex", "-1").removeClass("forminator-loading").addClass("forminator-error forminator-show"), e.html("<p>" + t + "</p>"), this.focus_to_element(e), this.enable_form()
        },
        enable_form: function() {
            var t;
            void 0 !== this.settings.has_loader && this.settings.has_loader && (t = this._form.find(".forminator-response-message"), this._form.removeClass("forminator-fields-disabled"), t.removeClass("forminator-loading"))
        },
        mapZip: function(t) {
            var e = this.getStripeData("veifyZip"),
                r = this.getStripeData("zipField"),
                n = s(t.currentTarget).attr("name");
            "checkbox" === s(t.currentTarget).attr("type") && (n = n.replace("[]", "")), e && "" !== r && n === r && (t = this.get_field_value(r).toString(), this._cardElement.update({
                value: {
                    postalCode: t
                }
            }))
        },
        focus_to_element: function(t) {
            t.show(), s("html,body").animate({
                scrollTop: t.offset().top - (s(a).height() - t.outerHeight(!0)) / 2
            }, 500, function() {
                t.attr("tabindex") || t.attr("tabindex", -1), t.focus()
            })
        },
        show_messages: function(t) {
            var o, i = this,
                a = i.$el.data("forminatorFrontCondition");
            return void 0 !== a && (this.$el.find(".forminator-error-message").remove(), o = 0, t.forEach(function(t) {
                var e, r, n = Object.keys(t),
                    t = Object.values(t),
                    n = a.get_form_field(n);
                n.length && (0 === o && (i.$el.trigger("forminator.front.pagination.focus.input", [n]), i.focus_to_element(n)), s(n).hasClass("forminator-input-time") && (0 === (r = (e = s(n).closest(".forminator-field:not(.forminator-field--inner)")).children(".forminator-error-message")).length && (e.append('<span class="forminator-error-message" aria-hidden="true"></span>'), r = e.children(".forminator-error-message")), r.html(t)), 0 === (r = (e = 0 === (e = s(n).closest(".forminator-field--inner")).length && 0 === (e = s(n).closest(".forminator-field")).length && 1 < (e = s(n).find(".forminator-field")).length ? e.first() : e).find(".forminator-error-message")).length && (e.append('<span class="forminator-error-message" aria-hidden="true"></span>'), r = e.find(".forminator-error-message")), s(n).attr("aria-invalid", "true"), r.html(t), e.addClass("forminator-has_error"), o++)
            })), this
        },
        getBillingData: function(t) {
            if (!this.getStripeData("billing")) return {};
            var e = this.getStripeData("billingName"),
                r = this.getStripeData("billingEmail"),
                n = this.getStripeData("billingAddress"),
                o = {
                    address: {}
                },
                i = (e && (i = (i = this.get_field_value(e)) || (this.get_field_value(e + "-first-name") || "") + " " + (this.get_field_value(e + "-last-name") || "")) && (o.name = i), r && (e = this.get_field_value(r) || "") && (o.email = e), this.get_field_value(n + "-street_address") || ""),
                r = (i && (o.address.line1 = i), this.get_field_value(n + "-address_line") || ""),
                e = (r && (o.address.line2 = r), this.get_field_value(n + "-city") || ""),
                i = (e && (o.address.city = e), this.get_field_value(n + "-state") || "");
            i && (o.address.state = i);
            r = this.get_form_field(n + "-country").find(":selected").data("country-code"), r && (o.address.country = r), e = this.get_field_value(n + "-zip") || "";
            return e && (o.address.postal_code = e), {
                billing_details: o
            }
        },
        handleCardPayment: function(t, e, r) {
            t.data.paymentsecret;
            t = s(".forminator-number--field, .forminator-currency, .forminator-calculation");
            t.inputmask && t.inputmask("remove"), this._beforeSubmitCallback && this._beforeSubmitCallback.call()
        },
        mountCardField: function() {
            var t = this.getStripeData("key"),
                e = this.getStripeData("cardIcon"),
                r = this.getStripeData("veifyZip"),
                n = (this.getStripeData("zipField"), this.getStripeData("fieldId"));
            if (null === t) return !1;
            this._stripe = Stripe(t, {
                locale: this.getStripeData("language")
            });
            var t = {},
                r = (r ? t.value = {
                    postalCode: ""
                } : t.hidePostalCode = !0, {}),
                o = this.getStripeData("fontFamily"),
                i = this.getStripeData("customFonts"),
                i = (o && i && (r.fonts = [{
                    cssSrc: "https://fonts.bunny.net/css?family=" + o
                }]), this._stripe.elements(r));
            this._cardElement = i.create("card", Object.assign({
                classes: {
                    base: this.getStripeData("baseClass"),
                    complete: this.getStripeData("completeClass"),
                    empty: this.getStripeData("emptyClass"),
                    focus: this.getStripeData("focusedClass"),
                    invalid: this.getStripeData("invalidClass"),
                    webkitAutofill: this.getStripeData("autofilledClass")
                },
                style: {
                    base: {
                        iconColor: this.getStripeData("iconColor"),
                        color: this.getStripeData("fontColor"),
                        lineHeight: this.getStripeData("lineHeight"),
                        fontWeight: this.getStripeData("fontWeight"),
                        fontFamily: this.getStripeData("fontFamily"),
                        fontSmoothing: "antialiased",
                        fontSize: this.getStripeData("fontSize"),
                        "::placeholder": {
                            color: this.getStripeData("placeholder")
                        },
                        ":hover": {
                            iconColor: this.getStripeData("iconColorHover")
                        },
                        ":focus": {
                            iconColor: this.getStripeData("iconColorFocus")
                        }
                    },
                    invalid: {
                        iconColor: this.getStripeData("iconColorError"),
                        color: this.getStripeData("fontColorError")
                    }
                },
                iconStyle: "solid",
                hideIcon: !e
            }, t)), this._cardElement.mount("#card-element-" + n), this.validateCard()
        },
        validateCard: function() {
            var e = this;
            this._cardElement.on("change", function(t) {
                e.$el.find(".forminator-stripe-element").hasClass("StripeElement--empty") ? e.$el.find(".forminator-stripe-element").closest(".forminator-field").removeClass("forminator-is_filled") : e.$el.find(".forminator-stripe-element").closest(".forminator-field").addClass("forminator-is_filled"), e.$el.find(".forminator-stripe-element").hasClass("StripeElement--invalid") && e.$el.find(".forminator-stripe-element").closest(".forminator-field").addClass("forminator-has_error")
            }), this._cardElement.on("focus", function(t) {
                e.$el.find(".forminator-stripe-element").closest(".forminator-field").addClass("forminator-is_active")
            }), this._cardElement.on("blur", function(t) {
                e.$el.find(".forminator-stripe-element").closest(".forminator-field").removeClass("forminator-is_active"), e.isValid(!1)
            })
        },
        hideCardError: function() {
            var t = this.$el.find(".forminator-card-message"),
                e = t.find(".forminator-error-message");
            0 === e.length && (t.append('<span class="forminator-error-message" aria-hidden="true"></span>'), e = t.find(".forminator-error-message")), t.closest(".forminator-field").removeClass("forminator-has_error"), e.html("")
        },
        showCardError: function(t, e) {
            var r = this.$el.find(".forminator-card-message"),
                n = r.find(".forminator-error-message");
            0 === n.length && (r.append('<span class="forminator-error-message" aria-hidden="true"></span>'), n = r.find(".forminator-error-message")), r.closest(".forminator-field").addClass("forminator-has_error"), r.closest(".forminator-field").addClass("forminator-is_filled"), n.html(t), e && this.focus_to_element(r.closest(".forminator-field"))
        },
        getStripeData: function(t) {
            return void 0 !== this._stripeData && void 0 !== this._stripeData[t] ? this._stripeData[t] : null
        },
        getObjectValue: function(t, e) {
            return void 0 !== t[e] ? t[e] : null
        },
        get_form_field: function(t) {
            var e = this.$el.find("#" + t + "-field");
            return e = 0 === e.length && 0 === (e = this.$el.find("input[name=" + t + "]")).length && 0 === (e = this.$el.find("textarea[name=" + t + "]")).length && 0 === (e = this.$el.find('input[name="' + t + '[]"]')).length && 0 === (e = this.$el.find('select[name="' + t + '"]')).length && 0 === (e = this.$el.find('select[name="' + t + '[]"]')).length ? this.$el.find("#" + t) : e
        },
        get_field_value: function(t) {
            var t = this.get_form_field(t),
                e = "",
                r = null;
            return this.field_is_radio(t) ? (r = t.filter(":checked")).length && (e = r.val()) : this.field_is_checkbox(t) ? t.each(function() {
                s(this).is(":checked") && (e = s(this).val())
            }) : e = !this.field_is_select(t) && this.field_has_inputMask(t) ? parseFloat(t.inputmask("unmaskedvalue")) : t.val(), e
        },
        get_field_calculation: function(t) {
            var t = this.get_form_field(t),
                e = 0,
                r = 0,
                n = null;
            return this.field_is_radio(t) ? (n = t.filter(":checked")).length && (r = n.data("calculation")) !== u && (e = Number(r)) : this.field_is_checkbox(t) ? t.each(function() {
                s(this).is(":checked") && (r = s(this).data("calculation")) !== u && (e += Number(r))
            }) : this.field_is_select(t) ? (n = t.find("option").filter(":selected")).length && (r = n.data("calculation")) !== u && (e = Number(r)) : e = Number(t.val()), isNaN(e) ? 0 : e
        },
        field_has_inputMask: function(t) {
            var e = !1;
            return t.each(function() {
                if (u !== s(this).attr("data-inputmask")) return !(e = !0)
            }), e
        },
        field_is_radio: function(t) {
            var e = !1;
            return t.each(function() {
                if ("radio" === s(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_checkbox: function(t) {
            var e = !1;
            return t.each(function() {
                if ("checkbox" === s(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_select: function(t) {
            return t.is("select")
        }
    }), s.fn[r] = function(t) {
        return this.each(function() {
            s.data(this, r) || s.data(this, r, new e(this, t))
        })
    }
}(jQuery, window, void document),
function(s, l) {
    "use strict";
    var r = "forminatorFrontPagination",
        n = {
            totalSteps: 0,
            step: 0,
            hashStep: 0,
            inline_validation: !1
        };

    function e(t, e) {
        this.element = s(t), this.$el = this.element, this.totalSteps = 0, this.step = 0, this.finished = !1, this.hashStep = !1, this.next_button_txt = "", this.prev_button_txt = "", this.custom_label = [], this.form_id = 0, this.element = "", this.settings = s.extend({}, n, e), this._defaults = n, this._name = r, this.init()
    }
    s.extend(e.prototype, {
        init: function() {
            var e = this,
                t = this.$el.data("draft-page") ? this.$el.data("draft-page") : 0;
            this.next_button = this.settings.next_button || l.ForminatorFront.cform.pagination_next, this.prev_button = this.settings.prev_button || l.ForminatorFront.cform.pagination_prev, 0 < this.$el.find("input[name=form_id]").length && (this.form_id = this.$el.find("input[name=form_id]").val()), this.totalSteps = this.settings.totalSteps, this.step = this.settings.step, this.quiz = this.settings.quiz, this.element = this.$el.find("[data-step=" + this.step + "]").data("name"), this.form_id && "object" == typeof l.Forminator_Cform_Paginations && "object" == typeof l.Forminator_Cform_Paginations[this.form_id] && (this.custom_label = l.Forminator_Cform_Paginations[this.form_id]), 0 < t ? this.go_to(t, !0) : this.settings.hashStep && 0 < this.step ? this.go_to(this.step, !0) : this.quiz ? this.go_to(0, !0) : this.go_to(0, !1), this.render_navigation(), this.render_bar_navigation(), this.render_footer_navigation(this.form_id), this.init_events(), this.update_navigation(), this.$el.find(".forminator-button.forminator-button-back, .forminator-button.forminator-button-next, .forminator-button.forminator-button-submit").on("click", function(t) {
                t.preventDefault(), s(this).trigger("forminator.front.pagination.move"), e.resetRichTextEditorHeight()
            }), this.$el.on("click", ".forminator-result--view-answers", function(t) {
                t.preventDefault(), s(this).trigger("forminator.front.pagination.move")
            }), this.update_buttons()
        },
        init_events: function() {
            var o = this;
            this.$el.find(".forminator-button-back").on("forminator.front.pagination.move", function(t) {
                o.handle_click("prev")
            }), this.$el.on("forminator.front.pagination.move", ".forminator-result--view-answers", function(t) {
                o.handle_click("prev")
            }), this.$el.find(".forminator-button-next").on("forminator.front.pagination.move", function(t) {
                o.handle_click("next")
            }), this.$el.find(".forminator-step").on("click", function(t) {
                t.preventDefault();
                t = s(this).data("nav");
                o.handle_step(t)
            }), this.$el.on("reset", function(t) {
                o.on_form_reset(t)
            }), this.$el.on("forminator:quiz:submit:success", function(t, e, r, n) {
                n && o.move_to_results(t)
            }), this.$el.on("forminator.front.pagination.focus.input", function(t, e) {
                o.on_focus_input(t, e)
            })
        },
        move_to_results: function(t) {
            this.finished = !0, this.$el.find(".forminator-submit-rightaway").length ? this.$el.find("#forminator-submit").removeClass("forminator-hidden") : this.handle_click("next")
        },
        on_form_reset: function(t) {
            this.go_to(0, !0), this.update_buttons()
        },
        on_focus_input: function(t, e) {
            e = this.get_page_of_input(e);
            this.go_to(e, !0), this.update_buttons()
        },
        render_footer_navigation: function(t) {
            var e = "",
                r = !0 === this.custom_label["has-paypal"] ? ' style="align-items: flex-start;"' : "",
                n = this.$el.find(".forminator-save-draft-link").length ? this.$el.find(".forminator-save-draft-link") : "";
            this.custom_label[this.element] && "custom" === this.custom_label["pagination-labels"] ? (this.prev_button_txt = "" !== this.custom_label[this.element]["prev-text"] ? this.custom_label[this.element]["prev-text"] : this.prev_button, this.next_button_txt = "" !== this.custom_label[this.element]["next-text"] ? this.custom_label[this.element]["next-text"] : this.next_button) : (this.prev_button_txt = this.prev_button, this.next_button_txt = this.next_button), e = this.$el.hasClass("forminator-design--material") ? '<div class="forminator-pagination-footer"' + r + '><button class="forminator-button forminator-button-back"><span class="forminator-button--mask" aria-label="hidden"></span><span class="forminator-button--text">' + this.prev_button_txt + '</span></button><button class="forminator-button forminator-button-next"><span class="forminator-button--mask" aria-label="hidden"></span><span class="forminator-button--text">' + this.next_button_txt + "</span></button>" : '<div class="forminator-pagination-footer"' + r + '><button class="forminator-button forminator-button-back">' + this.prev_button_txt + '</button><button class="forminator-button forminator-button-next">' + this.next_button_txt + "</button>", !0 === this.custom_label["has-paypal"] && (e += '<div class="forminator-payment forminator-button-paypal forminator-hidden ' + (this.custom_label["paypal-id"] || "") + '-payment" id="paypal-button-container-' + t + '">'), this.$el.append(e += "</div>"), "" !== n && n.insertBefore(this.$el.find(".forminator-button-next"))
        },
        render_bar_navigation: function() {
            var t = this.$el.find(".forminator-pagination-progress");
            t.length && (t.html('<div class="forminator-progress-label">0%</div><div class="forminator-progress-bar"><span style="width: 0%"></span></div>'), this.calculate_bar_percentage())
        },
        calculate_bar_percentage: function() {
            var t = this.totalSteps,
                e = this.step + 1,
                r = this.$el;
            r.length && (e = Math.round(e / t * 100), r.find(".forminator-progress-label").html(e + "%"), r.find(".forminator-progress-bar span").css("width", e + "%"))
        },
        render_navigation: function() {
            var n = this.$el.find(".forminator-pagination-steps"),
                t = this.$el.find(".forminator-pagination-start");
            if (n.length) {
                const a = s(this.$el).data("forminator-render") || "";
                var o = this.$el.find(".forminator-pagination").not(".forminator-pagination-start"),
                    i = (n.append('<div class="forminator-break"></div>'), this);
                o.each(function() {
                    var t = s(this),
                        e = t.data("label"),
                        t = t.data("step") - 1,
                        r = "forminator-custom-form-" + i.form_id + "-" + a + "--page-" + t;
                    n.append('<button role="tab" id="' + (r + "-label") + '" class="forminator-step forminator-step-' + t + '" aria-selected="false" aria-controls="' + r + '" data-nav="' + t + '"><span class="forminator-step-label">' + e + '</span><span class="forminator-step-dot" aria-hidden="true"></span></button>' + '<div class="forminator-break" aria-hidden="true"></div>')
                }), t.each(function() {
                    var t = s(this).data("label"),
                        e = o.length,
                        r = "forminator-custom-form-" + i.form_id + "--page-" + e;
                    n.append('<button role="tab" id="' + (r + "-label") + '" class="forminator-step forminator-step-' + e + '" data-nav="' + e + '" aria-selected="false" aria-controls="' + r + '"><span class="forminator-step-label">' + t + '</span><span class="forminator-step-dot" aria-hidden="true"></span></button>' + '<div class="forminator-break" aria-hidden="true"></div>')
                })
            }
        },
        handle_step: function(t) {
            if (this.settings.inline_validation)
                for (var e = 0; e < t; e++)
                    if (this.step <= e && !this.is_step_inputs_valid(e)) return void this.go_to(e, !0);
            this.go_to(t, !0), this.update_buttons()
        },
        handle_click: function(t) {
            var e, r = this;
            if ("prev" === t && 0 !== this.step) this.go_to(this.step - 1, !0), this.update_buttons();
            else if ("next" === t) {
                if (this.settings.inline_validation && !this.is_step_inputs_valid(this.step)) return;
                void 0 !== this.$el.data().forminatorFrontPayment && (e = this.$el.data().forminatorFrontPayment, 0 < this.$el.find("[data-step=" + this.step + "]").find(".forminator-stripe-element").not(".forminator-hidden .forminator-stripe-element").length) ? e._stripe.createToken(e._cardElement).then(function(t) {
                    t.error ? e.showCardError(t.error.message, !0) : (e.hideCardError(), r.go_to(r.step + 1, !0), r.update_buttons())
                }) : (this.go_to(this.step + 1, !0), this.update_buttons())
            }
            var t = s(this.$el),
                n = t.find(".forminator-textarea");
            t.hasClass("forminator-design--material") && n.length && n.each(function() {
                FUI.textareaMaterial(this)
            })
        },
        is_step_inputs_valid: function(t) {
            var r = 0,
                n = this.$el.data("validator"),
                t = this.$el.find("[data-step=" + t + "]");
            return void 0 === n || (t.find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(':hidden:not(.forminator-wp-editor-required, .forminator-input-file-required, input[name$="_data"])').not('[gramm="true"]').each(function(t, e) {
                n.element(e) || (0 === r && e.focus(), r++)
            }), 0 === r)
        },
        get_page_of_input: function(t) {
            var e = this.step,
                t = s(t).closest(".forminator-pagination");
            return e = 0 < t.length && void 0 !== (t = s(t).data("step")) ? +t : e
        },
        update_buttons: function() {
            var t, e, r, n, o, i = this.$el.hasClass("draft-enabled"),
                a = this,
                s = (0 === this.step ? (i || this.$el.find(".forminator-button-back").closest(".forminator-pagination-footer").css({
                    "justify-content": "flex-end"
                }), this.$el.find(".forminator-button-back").addClass("forminator-hidden"), this.$el.find(".forminator-button-next").removeClass("forminator-hidden")) : 1 < this.totalSteps && (i || this.$el.find(".forminator-button-back").closest(".forminator-pagination-footer").css({
                    "justify-content": "space-between"
                }), this.$el.find(".forminator-button-back, .forminator-button-next").removeClass("forminator-hidden")), this.step !== this.totalSteps || this.finished || (this.step--, this.$el.trigger("submit")), this.settings.submitButtonClass);
            this.step !== this.totalSteps - 1 || this.finished ? (this.element = this.$el.find(".forminator-pagination[data-step=" + this.step + "]").data("name"), this.custom_label[this.element] && "custom" === this.custom_label["pagination-labels"] ? (this.prev_button_txt = "" !== this.custom_label[this.element]["prev-text"] ? this.custom_label[this.element]["prev-text"] : this.prev_button, this.next_button_txt = "" !== this.custom_label[this.element]["next-text"] ? this.custom_label[this.element]["next-text"] : this.next_button) : (this.prev_button_txt = this.prev_button, this.next_button_txt = this.next_button), this.step === this.totalSteps - 1 && this.finished && (this.next_button_txt = l.ForminatorFront.quiz.view_results), (this.$el.hasClass("forminator-design--material") ? (this.$el.find("#forminator-submit").removeAttr("id").removeClass("forminator-button-submit forminator-hidden " + s).addClass("forminator-button-next"), !0 === this.custom_label["has-paypal"] && (this.$el.find("#forminator-paypal-submit").removeAttr("id").addClass("forminator-hidden"), this.$el.find(".forminator-button-next").removeClass("forminator-button-submit forminator-hidden " + s)), this.$el.find(".forminator-button-back .forminator-button--text").html(this.prev_button_txt), this.$el.find(".forminator-button-next .forminator-button--text")) : (this.$el.find("#forminator-submit").removeAttr("id").removeClass("forminator-button-submit forminator-hidden").addClass("forminator-button-next"), !0 === this.custom_label["has-paypal"] && (this.$el.find("#forminator-paypal-submit").removeAttr("id").addClass("forminator-hidden"), this.$el.find(".forminator-button-next").removeClass("forminator-button-submit forminator-hidden")), this.$el.find(".forminator-button-back").html(this.prev_button_txt), this.$el.find(".forminator-button-next"))).html(this.next_button_txt), this.step === this.totalSteps && this.finished && this.$el.find(".forminator-button-next, .forminator-button-back").addClass("forminator-hidden")) : (t = this.$el.find(".forminator-pagination-submit").html(), e = this.$el.find(".forminator-pagination-submit").data("loading"), i = "custom" === this.custom_label["pagination-labels"] && "" !== this.custom_label["last-previous"] ? this.custom_label["last-previous"] : this.prev_button, r = a.$el.find(".forminator-payment"), n = this.$el.find(".forminator-button-next"), o = this.$el.find(".forminator-button-submit"), this.$el.hasClass("forminator-design--material") ? (this.$el.find(".forminator-button-back .forminator-button--text").html(i), n.removeClass("forminator-button-next").attr("id", "forminator-submit"), setTimeout(function() {
                n.addClass("forminator-button-submit " + s).find(".forminator-button--text").html("").html(t).data("loading", e)
            }, 20)) : (this.$el.find(".forminator-button-back").html(i), n.removeClass("forminator-button-next").attr("id", "forminator-submit"), setTimeout(function() {
                n.addClass("forminator-button-submit " + s).html(t).data("loading", e)
            }, 20)), setTimeout(function() {
                o = a.$el.find(".forminator-button-submit")
            }, 30), this.$el.hasClass("forminator-quiz") && !t && (o.addClass("forminator-hidden"), this.$el.find(".forminator-submit-rightaway").length) && o.html(l.ForminatorFront.quiz.view_results), !0 === this.custom_label["has-paypal"] && (r.attr("id", "forminator-paypal-submit"), setTimeout(function() {
                l.paypalHasCondition.includes(a.$el.data("form-id")) || (o.addClass("forminator-hidden"), r.removeClass("forminator-hidden"))
            }, 40)), 0 < r.find("iframe").length && r.find("iframe").width("100%")), this.$el.trigger("forminator.front.condition.restart")
        },
        go_to: function(t, e) {
            if ((this.step = t) === this.totalSteps && !this.finished) return !1;
            this.$el.find(".forminator-pagination").css({
                height: "0",
                opacity: "0",
                visibility: "hidden"
            }).attr("aria-hidden", "true").attr("hidden", !0), this.$el.find(".forminator-pagination .forminator-pagination--content").hide(), this.$el.find("[data-step=" + t + "]").css({
                height: "auto",
                opacity: "1",
                visibility: "visible"
            }).removeAttr("aria-hidden").removeAttr("hidden"), this.$el.find("[data-step=" + t + "] .forminator-pagination--content").show();
            t = this.$el.data("forminatorFront");
            void 0 !== t && t.responsive_captcha(), this.update_navigation(), e && this.scroll_to_top_form()
        },
        update_navigation: function() {
            this.$el.find(".forminator-current").attr("aria-selected", "false"), this.$el.find(".forminator-current").removeClass("forminator-current"), this.$el.find(".forminator-step-" + this.step).attr("aria-selected", "true"), this.$el.find(".forminator-step-" + this.step).addClass("forminator-current"), this.$el.find(".forminator-pagination:not(:hidden)").find(".forminator-answer input").first().trigger("change"), this.calculate_bar_percentage()
        },
        scroll_to_top_form: function() {
            var e = this.$el,
                r = this.$el.find(".forminator-row").not(":hidden").first();
            if ((e = r.length ? r : e).length) {
                var r = "html,body",
                    n = (0 < this.$el.closest(".sui-dialog").length && (r = ".sui-dialog"), 0 < this.$el.closest(".wph-modal").length && (r = ".wph-modal"), e.focus(), s(l).height() / 2);
                let t = e.offset().top - Math.max(n, s(l).height() - e.outerHeight(!0)) / 2;
                this.quiz && (t = e.offset().top, s("#wpadminbar").length) && (t -= 35), s(r).animate({
                    scrollTop: t
                }, 500, function() {
                    e.attr("tabindex") || e.attr("tabindex", -1)
                })
            }
        },
        resetRichTextEditorHeight: function() {
            var e;
            "undefined" != typeof tinyMCE && (e = this.$el).find(".forminator-textarea").each(function() {
                var t = s(this).attr("id");
                0 !== e.find("#" + t + "_ifr").length && e.find("#" + t + "_ifr").is(":visible") && e.find("#" + t + "_ifr").height(s(this).height())
            })
        }
    }), s.fn[r] = function(t) {
        return this.each(function() {
            s.data(this, r) || s.data(this, r, new e(this, t))
        })
    }
}(jQuery, window, document),
function(l, e, o) {
    "use strict";
    var r = "forminatorFrontPayPal",
        n = {
            type: "paypal",
            paymentEl: null,
            paymentRequireSsl: !1,
            generalMessages: {}
        };

    function i(t, e) {
        this.element = t, this.$el = l(this.element), this.forminator_selector = "#" + this.$el.attr("id") + '[data-forminator-render="' + this.$el.data("forminator-render") + '"]', this.settings = l.extend({}, n, e), this._defaults = n, this._name = r, this.paypalData = null, this.paypalButton = null, this.init()
    }
    l.extend(i.prototype, {
        init: function() {
            this.settings.paymentEl && (this.paypalData = this.settings.paymentEl, this.render_paypal_button(this.element), this.replaceScriptCurrency())
        },
        is_data_valid: function() {
            var t = this.configurePayPal(),
                e = this.settings.paymentRequireSsl;
            return !(t.amount <= 0 || e && "https:" !== location.protocol)
        },
        is_form_valid: function() {
            var t = this.$el.validate(),
                e = t.checkForm();
            return t.submitted = {}, e
        },
        render_paypal_button: function(t) {
            var i = l(t),
                a = this,
                r = this.configurePayPal(),
                n = i.find(".forminator-response-message"),
                s = ForminatorFront.cform.gateway.error,
                e = this.settings.paymentRequireSsl,
                o = this.settings.generalMessages,
                t = {
                    shape: r.shape,
                    color: r.color,
                    label: r.label,
                    layout: r.layout,
                    height: parseInt(r.height)
                };
            "vertical" !== r.layout && (t.tagline = r.tagline), this.paypalButton = paypal.Buttons({
                onInit: function(t, e) {
                    e.disable(), "variable" === r.amount_type && "" !== r.variable && (r.amount = a.get_field_calculation(r.variable)), i.find("input, select, textarea, .forminator-field-signature").on("change", function() {
                        a.is_data_valid() && a.is_form_valid() ? (e.enable(), n.hasClass("forminator-error") && (n.html("").attr("aria-hidden", "true"), n.removeClass("forminator-show"))) : e.disable()
                    }), i.on("validation:error", function() {
                        e.disable()
                    }), i.on("forminator:uploads:valid", function() {
                        a.is_data_valid() && a.is_form_valid() && e.enable()
                    }), a.is_data_valid() && a.is_form_valid() && e.enable()
                },
                env: r.mode,
                style: t,
                onClick: function() {
                    if (!i.valid() && r.amount <= 0) n.removeClass("forminator-accessible").addClass("forminator-error").html("").removeAttr("aria-hidden"), n.html('<label class="forminator-label--error"><span>' + o.payment_require_amount_error + "</span></label>"), a.focus_to_element(n);
                    else if (e && "https:" !== location.protocol) n.removeClass("forminator-accessible").addClass("forminator-error").html("").removeAttr("aria-hidden"), n.html('<label class="forminator-label--error"><span>' + o.payment_require_ssl_error + "</span></label>"), a.focus_to_element(n);
                    else if (i.valid()) {
                        if (i.trigger("forminator:preSubmit:paypal", [n]), n.html()) return a.focus_to_element(n), !1
                    } else n.removeClass("forminator-accessible").addClass("forminator-error").html("").removeAttr("aria-hidden"), n.html('<label class="forminator-label--error"><span>' + o.form_has_error + "</span></label>"), a.focus_to_element(n);
                    "variable" === r.amount_type && "" !== r.variable && (r.amount = a.get_field_calculation(r.variable))
                },
                createOrder: function(t, e) {
                    i.addClass("forminator-partial-disabled");
                    var r = i.find('input[name="forminator_nonce"]').val(),
                        n = a.getPayPalData("form_id"),
                        o = a.paypal_request_data();
                    return fetch(ForminatorFront.ajaxUrl + "?action=forminator_pp_create_order", {
                        method: "POST",
                        mode: "same-origin",
                        credentials: "same-origin",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            nonce: r,
                            form_id: n,
                            mode: a.getPayPalData("mode"),
                            form_data: o,
                            form_fields: i.serialize()
                        })
                    }).then(function(t) {
                        return t.json()
                    }).then(function(t) {
                        return !0 !== t.success ? (s = t.data, !1) : (t = t.data.order_id, i.find(".forminator-paypal-input").val(t), t)
                    })
                },
                onApprove: function(t, e) {
                    void 0 !== a.settings.has_loader && a.settings.has_loader && (i.addClass("forminator-fields-disabled"), n.html("<p>" + a.settings.loader_label + "</p>"), n.removeAttr("aria-hidden").prop("tabindex", "-1").removeClass("forminator-success forminator-error").addClass("forminator-loading forminator-show"), a.focus_to_element(n)), i.trigger("submit.frontSubmit")
                },
                onCancel: function(t, e) {
                    return void 0 !== a.settings.has_loader && a.settings.has_loader && (i.removeClass("forminator-fields-disabled forminator-partial-disabled"), n.removeClass("forminator-loading")), e.redirect()
                },
                onError: function() {
                    void 0 !== a.settings.has_loader && a.settings.has_loader && (i.removeClass("forminator-fields-disabled forminator-partial-disabled"), n.removeClass("forminator-loading")), n.removeClass("forminator-accessible").addClass("forminator-error").html("").removeAttr("aria-hidden"), n.html('<label class="forminator-label--error"><span>' + s + "</span></label>"), a.focus_to_element(n)
                }
            }), this.paypalButton.render(i.find(".forminator-button-paypal")[0])
        },
        configurePayPal: function() {
            var t = {
                    form_id: this.getPayPalData("form_id"),
                    sandbox_id: this.getPayPalData("sandbox_id"),
                    currency: this.getPayPalData("currency"),
                    live_id: this.getPayPalData("live_id"),
                    amount: 0
                },
                e = (t.color = this.getPayPalData("color") ? this.getPayPalData("color") : "gold", t.shape = this.getPayPalData("shape") ? this.getPayPalData("shape") : "rect", t.label = this.getPayPalData("label") ? this.getPayPalData("label") : "checkout", t.layout = this.getPayPalData("layout") ? this.getPayPalData("layout") : "vertical", t.tagline = this.getPayPalData("tagline") ? this.getPayPalData("tagline") : "true", t.redirect_url = this.getPayPalData("redirect_url") ? this.getPayPalData("redirect_url") : "", t.mode = this.getPayPalData("mode"), t.locale = this.getPayPalData("locale") ? this.getPayPalData("locale") : "en_US", t.debug_mode = this.getPayPalData("debug_mode") ? this.getPayPalData("debug_mode") : "disable", t.amount_type = this.getPayPalData("amount_type") ? this.getPayPalData("amount_type") : "fixed", t.variable = this.getPayPalData("variable") ? this.getPayPalData("variable") : "", t.height = this.getPayPalData("height") ? this.getPayPalData("height") : 55, t.shipping_address = this.getPayPalData("shipping_address") ? this.getPayPalData("shipping_address") : "disable", this.getPayPalData("amount_type"));
            return "fixed" === e ? t.amount = this.getPayPalData("amount") : "variable" === e && "" !== t.variable && (t.amount = this.get_field_calculation(t.variable)), t
        },
        getPayPalData: function(t) {
            return void 0 !== this.paypalData[t] ? this.paypalData[t] : null
        },
        get_form_field: function(t) {
            var e = this.$el.find("#" + t + "-field");
            return e = 0 === e.length && 0 === (e = this.$el.find("input[name=" + t + "]")).length && 0 === (e = this.$el.find("textarea[name=" + t + "]")).length && 0 === (e = this.$el.find('input[name="' + t + '[]"]')).length && 0 === (e = this.$el.find('select[name="' + t + '"]')).length && 0 === (e = this.$el.find('select[name="' + t + '[]"]')).length && 0 === (e = this.$el.find("#" + t)).length ? this.$el.find("select[name=" + t + "]") : e
        },
        get_field_calculation: function(t) {
            var t = this.get_form_field(t),
                e = 0,
                r = 0,
                n = null;
            return this.field_is_radio(t) ? (n = t.filter(":checked")).length && (r = n.data("calculation")) !== o && (e = Number(r)) : this.field_is_checkbox(t) ? t.each(function() {
                l(this).is(":checked") && (r = l(this).data("calculation")) !== o && (e += Number(r))
            }) : this.field_is_select(t) ? (n = t.find("option").filter(":selected")).length && (r = n.data("calculation")) !== o && (e = Number(r)) : e = t.inputmask ? t.inputmask("unmaskedvalue").replace(/,/g, ".") : Number(t.val()), isNaN(e) ? 0 : e
        },
        focus_to_element: function(t) {
            t.show(), l("html,body").animate({
                scrollTop: t.offset().top - (l(e).height() - t.outerHeight(!0)) / 2
            }, 500, function() {
                t.attr("tabindex") || t.attr("tabindex", -1), t.focus()
            })
        },
        paypal_request_data: function() {
            var t = this.configurePayPal(),
                e = this.getPayPalData("shipping_address"),
                r = this.getPayPalData("billing-details"),
                n = this.getBillingData(),
                o = {};
            return o.purchase_units = [{
                amount: {
                    currency_code: this.getPayPalData("currency"),
                    value: t.amount
                }
            }], "enable" !== e && (o.application_context = {
                shipping_preference: "NO_SHIPPING"
            }), r && (o.payer = n), o
        },
        getBillingData: function() {
            var t, e, r, n, o, i = this.getPayPalData("billing-name"),
                a = this.getPayPalData("billing-email"),
                s = this.getPayPalData("billing-address"),
                l = {};
            return i && (l.name = {}, (n = this.get_field_value(i)) || (t = this.get_field_value(i + "-prefix") || "", e = this.get_field_value(i + "-first-name") || "", r = this.get_field_value(i + "-middle-name") || "", o = this.get_field_value(i + "-last-name") || "", n = (n = t ? t + " " : "") + e + (r ? " " + r : "")), n) && (l.name.given_name = n, l.name.surname = o), a && (i = this.get_field_value(a) || "") && (l.email_address = i), s && (l.address = {}, (t = this.get_field_value(s + "-street_address") || "") && (l.address.address_line_1 = t), (e = this.get_field_value(s + "-address_line") || "") && (l.address.address_line_2 = e), (r = this.get_field_value(s + "-city") || "") && (l.address.admin_area_2 = r), (n = this.get_field_value(s + "-state") || "") && (l.address.admin_area_1 = n), (o = this.get_form_field(s + "-country") || "") && (l.address.country_code = o.find(":selected").data("country-code")), a = this.get_field_value(s + "-zip") || "") && (l.address.postal_code = a), l
        },
        get_field_value: function(t) {
            var t = this.get_form_field(t),
                e = "",
                r = null;
            return this.field_is_radio(t) ? (r = t.filter(":checked")).length && (e = r.val()) : this.field_is_checkbox(t) ? t.each(function() {
                l(this).is(":checked") && (e = l(this).val())
            }) : e = (this.field_is_select(t), t.val()), e
        },
        field_is_radio: function(t) {
            var e = !1;
            return t.each(function() {
                if ("radio" === l(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_checkbox: function(t) {
            var e = !1;
            return t.each(function() {
                if ("checkbox" === l(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_select: function(t) {
            return t.is("select")
        },
        replaceScriptCurrency: function() {
            var o = this,
                i = this.paypalData.currency;
            o.$el.on("click", function(t) {
                var e = l("script[src^='https://www.paypal.com/sdk/js']"),
                    r = e.attr("src"),
                    n = /currency=([^&]+)/.exec(r)[1];
                i !== n && (e.attr("src", r.replace("currency=" + n, "currency=" + i)), o.paypalButton.updateProps())
            })
        }
    }), l.fn[r] = function(t) {
        return this.each(function() {
            l.data(this, r) || l.data(this, r, new i(this, t))
        })
    }
}(jQuery, window, void document),
function(v) {
    "use strict";
    var r = "forminatorFrontDatePicker",
        n = {};

    function e(t, e) {
        this.element = t, this.$el = v(this.element), this.settings = v.extend({}, n, e), this._defaults = n, this._name = r, this.init()
    }
    v.extend(e.prototype, {
        init: function() {
            var i = this,
                t = this.$el.data("format"),
                e = (this.$el.data("restrict-type"), this.$el.data("restrict")),
                r = this.$el.data("restrict"),
                n = this.$el.data("start-year"),
                o = this.$el.data("end-year"),
                a = this.$el.data("past-dates"),
                s = this.$el.val(),
                l = this.$el.data("start-of-week"),
                f = this.$el.data("start-date"),
                u = this.$el.data("end-date"),
                c = this.$el.data("start-field"),
                d = this.$el.data("end-field"),
                m = this.$el.data("start-offset"),
                h = this.$el.data("end-offset"),
                p = this.$el.data("disable-date"),
                b = this.$el.data("disable-range"),
                r = !isNaN(parseFloat(r)) && isFinite(r) ? [r.toString()] : e.split(","),
                p = p.split(","),
                b = b.split(","),
                n = n || "c-95",
                o = o || "c+95",
                y = this.$el.closest(".forminator-custom-form"),
                g = "forminator-calendar";
            y.hasClass("forminator-design--default") ? g = "forminator-calendar--default" : y.hasClass("forminator-design--material") ? g = "forminator-calendar--material" : y.hasClass("forminator-design--flat") ? g = "forminator-calendar--flat" : y.hasClass("forminator-design--bold") && (g = "forminator-calendar--bold"), this.$el.datepicker({
                beforeShow: function(t, e) {
                    var r, n, o = v(this).closest(".elementor-popup-modal");
                    e.dpDiv.removeClass(function(t, e) {
                        return (e.match(/\bhustle-\S+/g) || []).join(" ")
                    }), e.dpDiv.removeClass(function(t, e) {
                        return (e.match(/\bforminator-\S+/g) || []).join(" ")
                    }), e.dpDiv.addClass("forminator-custom-form-" + y.data("form-id") + " " + g), "disable" === a ? v(this).datepicker("option", "minDate", s) : v(this).datepicker("option", "minDate", null), f && (r = new Date(f.replace(/-/g, "/").replace(/T.+/, "")), v(this).datepicker("option", "minDate", r)), u && (r = new Date(u.replace(/-/g, "/").replace(/T.+/, "")), v(this).datepicker("option", "maxDate", r)), c && void 0 !== (r = i.getLimitDate(c, m)) && v(this).datepicker("option", "minDate", r), d && void 0 !== (r = i.getLimitDate(d, h)) && v(this).datepicker("option", "maxDate", r), o.length ? (o.append(v("#ui-datepicker-div")), n = t.getBoundingClientRect(), setTimeout(function() {
                        e.dpDiv.css({
                            top: n.top + n.height,
                            left: n.left
                        })
                    }, 0)) : v("body").append(v("#ui-datepicker-div"))
                },
                beforeShowDay: function(t) {
                    return i.restrict_date(r, p, b, t)
                },
                monthNames: datepickerLang.monthNames,
                monthNamesShort: datepickerLang.monthNamesShort,
                dayNames: datepickerLang.dayNames,
                dayNamesShort: datepickerLang.dayNamesShort,
                dayNamesMin: datepickerLang.dayNamesMin,
                changeMonth: !0,
                changeYear: !0,
                dateFormat: t,
                yearRange: n + ":" + o,
                minDate: new Date(n, 0, 1),
                maxDate: new Date(o, 11, 31),
                firstDay: l,
                onClose: function() {
                    v(this).valid()
                }
            }), v(".ui-datepicker").addClass("notranslate")
        },
        getLimitDate: function(t, e) {
            var r = v('input[name ="' + t + '"]').val();
            if (void 0 !== r) return t = v('input[name ="' + t + '"]').data("format").replace(/y/g, "yy"), e = e.split("_"), r = moment(r, t.toUpperCase()), r = "-" === e[0] ? r.subtract(e[1], e[2]) : r.add(e[1], e[2]), t = moment(r).format("YYYY-MM-DD"), new Date(t)
        },
        restrict_date: function(t, e, r, n) {
            var o = !0,
                i = n.getDay(),
                a = jQuery.datepicker.formatDate("mm/dd/yy", n);
            if (0 !== r[0].length)
                for (var s = 0; s < r.length; s++) {
                    var l = r[s].split("-"),
                        f = new Date(l[0].trim()),
                        l = new Date(l[1].trim());
                    if (f <= n && n <= l) {
                        o = !1;
                        break
                    }
                }
            return -1 !== t.indexOf(i.toString()) || -1 !== e.indexOf(a) || !1 === o ? [!1, "disabledDate"] : [!0, "enabledDate"]
        }
    }), v.fn[r] = function(t) {
        return this.each(function() {
            v.data(this, r) || v.data(this, r, new e(this, t))
        })
    }
}(jQuery, (window, document)),
function(m) {
    "use strict";
    var r = "forminatorFrontValidate",
        n = {},
        o = {
            rules: {},
            messages: {}
        };

    function e(t, e) {
        this.element = t, this.$el = m(this.element), this.settings = m.extend({}, o, e), this._defaults = o, this._name = r, this.init()
    }

    function i(t) {
        t = String(t).trim();
        var e = parseFloat(t);
        return String(e) === t ? a(e, 2) : 1 === (e = t.split(/[^\dE-]+/)).length ? a(parseFloat(t), 2) : (t = e.pop(), a(parseFloat(e.join("") + "." + t), 2))
    }

    function a(t, e) {
        return (Math.floor(100 * t) / 100).toFixed(e)
    }

    function s(t) {
        var [t, e] = t.split(" "), [t, r] = t.split(":");
        return (t = 60 * (t = void 0 !== e && (12 === parseInt(t, 10) && (t = 0), "pm" === e.toLowerCase()) ? parseInt(t, 10) + 12 : t) * 60) + (r *= 60)
    }
    m.extend(e.prototype, {
        init: function() {
            m(".forminator-select2").on("change", this.element, function(t, e) {
                "forminator_emulate_trigger" !== e && m(this).trigger("focusout")
            });
            var r = !1,
                o = this.$el,
                i = this.settings.rules,
                a = this.settings.messages;
            if (o.hasClass("forminator-grouped-fields")) {
                let n = o.data("suffix");
                m.each(i, function(t, e) {
                    var r = t.replace(/(.+?)(\[\])?$/g, "$1-" + n + "$2");
                    (o.find('[name="' + r + '"]').length || o.find("#" + r.replace("[]", "")).length) && (i[r] = e, a[r] = a[t])
                }), o = o.closest("form.forminator-ui")
            }
            o.data("validator", null).unbind("validate").validate({
                ignore: ":hidden:not(.do-validate)",
                errorPlacement: function(t, e) {
                    o.trigger("validation:error")
                },
                showErrors: function(t, e) {
                    r && 0 < e.length && (o.find(".forminator-response-message").html("<ul></ul>"), jQuery.each(e, function(t, e) {
                        o.find(".forminator-response-message ul").append("<li>" + e.message + "</li>")
                    }), o.find(".forminator-response-message").removeAttr("aria-hidden").prop("tabindex", "-1").addClass("forminator-accessible")), r = !1, this.defaultShowErrors(), o.trigger("validation:showError", e)
                },
                invalidHandler: function(t, e) {
                    r = !0, o.trigger("validation:invalid")
                },
                onfocusout: function(t) {
                    !1 === m(t).hasClass("hasDatepicker") && m(t).valid(), m(t).trigger("validation:focusout")
                },
                highlight: function(t, e, r) {
                    var n = m(t),
                        o = n.closest(".forminator-field"),
                        i = n.closest(".forminator-date-input"),
                        a = n.closest(".forminator-timepicker"),
                        s = !1,
                        l = !1,
                        f = !1,
                        t = this.errorMap[t.name],
                        u = n.attr("id") + "-error",
                        c = n.attr("aria-describedby"),
                        d = '<span class="forminator-error-message" id="' + u + '"></span>';
                    (0 < i.length ? (l = (s = i.parent()).find('.forminator-error-message[data-error-field="' + n.data("field") + '"]'), f = s.find(".forminator-description"), d = '<span class="forminator-error-message" data-error-field="' + n.data("field") + '" id="' + u + '"></span>', 0 === l.length && ("day" === n.data("field") && (s.find('.forminator-error-message[data-error-field="year"]').length ? m(d).insertBefore(s.find('.forminator-error-message[data-error-field="year"]')) : 0 === f.length ? s.append(d) : m(d).insertBefore(f), 0 === o.find(".forminator-error-message").length) && o.append('<span class="forminator-error-message" id="' + u + '"></span>'), "month" === n.data("field") && (s.find('.forminator-error-message[data-error-field="day"]').length ? m(d).insertBefore(s.find('.forminator-error-message[data-error-field="day"]')) : 0 === f.length ? s.append(d) : m(d).insertBefore(f), 0 === o.find(".forminator-error-message").length) && o.append('<span class="forminator-error-message" id="' + u + '"></span>'), "year" === n.data("field")) && (0 === f.length ? s.append(d) : m(d).insertBefore(f), 0 === o.find(".forminator-error-message").length) && o.append('<span class="forminator-error-message" id="' + u + '"></span>'), s.find('.forminator-error-message[data-error-field="' + n.data("field") + '"]').html(t), o.find(".forminator-error-message")) : 0 < a.length ? (l = (s = a.parent()).find('.forminator-error-message[data-error-field="' + n.data("field") + '"]'), f = s.find(".forminator-description"), d = '<span class="forminator-error-message" data-error-field="' + n.data("field") + '" id="' + u + '"></span>', 0 === l.length && ("hours" === n.data("field") && (s.find('.forminator-error-message[data-error-field="minutes"]').length ? m(d).insertBefore(s.find('.forminator-error-message[data-error-field="minutes"]')) : 0 === f.length ? s.append(d) : m(d).insertBefore(f), 0 === o.find(".forminator-error-message").length) && o.append('<span class="forminator-error-message" id="' + u + '"></span>'), "minutes" === n.data("field")) && (0 === f.length ? s.append(d) : m(d).insertBefore(f), 0 === o.find(".forminator-error-message").length) && o.append('<span class="forminator-error-message" id="' + u + '"></span>'), s.find('.forminator-error-message[data-error-field="' + n.data("field") + '"]').html(t), o.find(".forminator-error-message")) : (l = o.find(".forminator-error-message"), f = o.find(".forminator-description"), 0 === l.length && (0 === f.length ? o.append(d) : m(d).insertBefore(f)), o.find(".forminator-error-message"))).html(t), c ? ((i = c.split(" ")).includes(u) || i.push(u), a = i.join(" "), n.attr("aria-describedby", a)) : n.attr("aria-describedby", u), n.attr("aria-invalid", "true"), o.addClass("forminator-has_error"), n.trigger("validation:highlight")
                },
                unhighlight: function(t, e, r) {
                    var t = m(t),
                        n = t.closest(".forminator-field"),
                        o = t.closest(".forminator-timepicker"),
                        i = t.closest(".forminator-date-input"),
                        a = "",
                        s = t.attr("id") + "-error",
                        l = t.attr("aria-describedby"),
                        a = 0 < i.length ? i.parent().find('.forminator-error-message[data-error-field="' + t.data("field") + '"]') : 0 < o.length ? o.parent().find('.forminator-error-message[data-error-field="' + t.data("field") + '"]') : n.find(".forminator-error-message");
                    l ? (i = l.split(" ").filter(function(t) {
                        return t !== s
                    }).join(" "), t.attr("aria-describedby", i)) : t.removeAttr("aria-describedby"), t.removeAttr("aria-invalid"), a.remove(), n.removeClass("forminator-has_error"), t.trigger("validation:unhighlight")
                },
                rules: i,
                messages: a
            }), o.off("forminator.validate.signature").on("forminator.validate.signature", function() {
                m(this).validate().form()
            }), m(".time-minutes.has-time-limiter, .time-ampm.has-time-limiter").on("change", function() {
                m(this).closest(".forminator-col").siblings(".forminator-col").first().find(".time-hours").trigger("focusout")
            }), m('.forminator-field.required input[type="checkbox"]').on("input", function() {
                m(this).not(":checked").trigger("focusout")
            })
        }
    }), m.fn[r] = function(t) {
        return m.each(n, function(t, e) {
            void 0 === m.validator.methods[t] ? m.validator.addMethod(t, e) : "number" === t && (m.validator.methods.number = n.number)
        }), this.each(function() {
            m.data(this, r) || m.data(this, r, new e(this, t))
        })
    }, m.validator.addMethod("validurl", function(t, e) {
        var r = m.validator.methods.url.bind(this);
        return r(t, e) || r("http://" + t, e)
    }), m.validator.addMethod("forminatorPhoneNational", function(t, e) {
        var r = m(e);
        return !r.data("required") && t === "+" + r.intlTelInput("getSelectedCountryData").dialCode || (void 0 === r.data("country") || r.data("country").toLowerCase() === r.intlTelInput("getSelectedCountryData").iso2) && (this.optional(e) || r.intlTelInput("isValidNumber"))
    }), m.validator.addMethod("forminatorPhoneInternational", function(t, e) {
        return !m(e).data("required") && t === "+" + m(e).intlTelInput("getSelectedCountryData").dialCode || this.optional(e) || m(e).intlTelInput("isValidNumber")
    }), m.validator.addMethod("dateformat", function(t, e, r) {
        var n, o, i, a, s = !1,
            l = "yy-mm-dd" === r || "yy/mm/dd" === r || "yy.mm.dd" === r ? /^\d{4}-\d{1,2}-\d{1,2}$/ : /^\d{1,2}-\d{1,2}-\d{4}$/;
        return t = t.replace(/[ /.]/g, "-"), s = !!l.test(t) && ("dd/mm/yy" === r || "dd-mm-yy" === r || "dd.mm.yy" === r ? (n = t.split("-"), o = parseInt(n[0], 10), i = parseInt(n[1], 10), a = parseInt(n[2], 10)) : "mm/dd/yy" === r || "mm.dd.yy" === r || "mm-dd-yy" === r ? (n = t.split("-"), i = parseInt(n[0], 10), o = parseInt(n[1], 10), a = parseInt(n[2], 10)) : (n = t.split("-"), a = parseInt(n[0], 10), i = parseInt(n[1], 10), o = parseInt(n[2], 10)), (l = new Date(Date.UTC(a, i - 1, o, 12, 0, 0, 0))).getUTCFullYear() === a) && l.getUTCMonth() === i - 1 && l.getUTCDate() === o, this.optional(e) || s
    }), m.validator.addMethod("maxwords", function(t, e, r) {
        return this.optional(e) || t.trim().split(/\s+/).length <= r
    }), m.validator.methods.maxlength = function(t, e, r) {
        return !((t = t.replace(/<[^>]*>/g, "")).length > r)
    }, m.validator.addMethod("trim", function(t, e, r) {
        return !0 === this.optional(e) || 0 !== t.trim().length
    }), m.validator.addMethod("emailWP", function(t, e, r) {
        if (!this.optional(e)) {
            if (t.trim().length < 6) return !1;
            if (t.indexOf("@", 1) < 0) return !1;
            e = t.split("@", 2);
            if (!e[0].match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\.-]+$/)) return !1;
            if (e[1].match(/\.{2,}/)) return !1;
            var n = e[1].split(".");
            if (n.length < 2) return !1;
            for (var o = n.length, i = 0; i < o; i++)
                if (!n[i].match(/^[a-z0-9-]+$/i)) return !1
        }
        return !0
    }), m.validator.addMethod("forminatorPasswordStrength", function(t, e, r) {
        var n, t = t.trim();
        return 0 == t.length || !(!t || t.length < 8) && (n = 0, t.match(/[0-9]/) && (n += 10), t.match(/[a-z]/) && (n += 20), t.match(/[A-Z]/) && (n += 20), t.match(/[^a-zA-Z0-9]/) && (n += 30), t.match(/[=!\-@.,_*#&?^`%$+\/{\[\]|}^?~]/) && (n += 30), 54 <= Math.log(Math.pow(n, t.length)) / Math.LN2)
    }), m.validator.addMethod("extension", function(t, e, r) {
        var n, o = !1;
        return "" !== t.trim() && (n = (n = t.replace(/^.*\./, "")) == t ? "notExt" : n.toLowerCase(), -1 != r.indexOf(n)) && (o = !0), this.optional(e) || o
    }), m.validator.methods.number = function(t, e, r) {
        return this.optional(e) || /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/.test(t)
    }, m.validator.addMethod("minNumber", function(t, e, r) {
        return 0 === t.length || r <= i(t)
    }), m.validator.addMethod("maxNumber", function(t, e, r) {
        return 0 === t.length || i(t) <= r
    }), m.validator.addMethod("timeLimit", function(t, e, r) {
        var t = function(t, e) {
                var r, n, o, i = "";
                t.name.includes("hours") && (t = m(t).closest(".forminator-col"), r = e, e = t.next(), n = ("select" === (n = e.find(".time-minutes")).prop("tagName").toLowerCase() ? e.find(".time-minutes option:selected") : e.find(".time-minutes")).val(), o = e.next().find('select[name$="ampm"] option:selected').val()); {
                    if (void 0 === r || "" === r || void 0 === n || "" === n) return !0;
                    i = r + ":" + n
                }
                "" !== i && void 0 !== o && (i += " " + o);
                return i = s(i)
            }(e, t),
            n = s(r.start_limit),
            r = s(r.end_limit),
            n = n <= t && t <= r,
            o = m(e).closest(".forminator-col").next().find(".forminator-field");
        return n || !0 === t ? o.removeClass("forminator-has_error") : setTimeout(function() {
            o.addClass("forminator-has_error")
        }, 10), !0 === t || n
    }), n = m.validator.methods
}(jQuery, (window, document)),
function(i, u, e, o) {
    "use strict";
    u.paypalHasCondition = [];
    var n = "forminatorFrontCondition",
        a = {
            fields: {},
            relations: {}
        };

    function r(t, e, r) {
        this.element = t, this.$el = i(this.element), this.settings = i.extend({}, a, e), this._defaults = a, this._name = n, this.calendar = r[0], this.init()
    }
    i.extend(r.prototype, {
        init: function() {
            var n = this,
                o = this.$el,
                t = this.$el.find(".forminator-field input, .forminator-row input[type=hidden], .forminator-field select, .forminator-field textarea, .forminator-field-signature, .forminator-rating");
            if (o.hasClass("forminator-grouped-fields")) {
                let r = o.data("suffix");
                i.each(this.settings.fields, function(t, e) {
                    t = t + "-" + r;
                    (o.find('[name="' + t + '"]').length || o.find("#" + t).length) && (e = n.updateConditions(e, r, o), n.settings.fields[t] = e)
                })
            }
            this.add_missing_relations(), t.on("change input forminator.change", function(t) {
                var e = i(this),
                    r = e.closest(".forminator-col").attr("id");
                if (!e.is('input[type="radio"]') || "input" !== t.type) return r = (r = void 0 !== r && 0 !== r.indexOf("slider-") ? r : "1" === e.attr("data-multi") || "hidden" === e.attr("type") ? e.attr("name") : e.attr("id")).trim(), !(!n.has_relations(r) && !n.has_siblings(r)) && (n.has_siblings(r) && n.trigger_fake_parent_date_field(r), !n.has_relations(r) && n.has_siblings(r) ? (n.trigger_siblings(r), !1) : (n.process_relations(r, e, t), n.paypal_button_condition(), void n.maybe_clear_upload_container()))
            }), i(e).on("tinymce-editor-init", function(t, e) {
                e.on("change", function(t) {
                    o.find("#" + i(this).attr("id")).change()
                })
            }), "undefined" != typeof tinyMCE && tinyMCE.activeEditor && tinyMCE.activeEditor.on("change", function(t) {
                o.find("#" + i(this).attr("id")).change()
            }), this.$el.find(".forminator-button.forminator-button-back, .forminator-button.forminator-button-next").on("click", function() {
                o.find('.forminator-field input:not([type="file"]), .forminator-row input[type=hidden], .forminator-field select, .forminator-field textarea').trigger("forminator.change", "forminator_emulate_trigger")
            }), this.$el.find(".forminator-field input, .forminator-row input[type=hidden], .forminator-field select, .forminator-field textarea").trigger("forminator.change", "forminator_emulate_trigger"), this.init_events()
        },
        updateConditions: function(t, e, r) {
            t = JSON.parse(JSON.stringify(t));
            if (t.conditions && Array.isArray(t.conditions)) {
                const n = r.closest(".forminator-col").prop("id");
                t.conditions.forEach(function(t) {
                    t.field && t.group && t.group === n && (t.field = t.field + "-" + e)
                })
            }
            return t
        },
        process_relations: function(t, s, l) {
            var f = this;
            f.get_relations(t).forEach(function(t) {
                var e, r = f.get_field_logic(t),
                    n = r.action,
                    o = r.rule,
                    i = r.conditions,
                    a = 0;
                0 !== t.indexOf("paypal") || 0 === r.length || u.paypalHasCondition.includes(f.$el.data("form-id")) || u.paypalHasCondition.push(f.$el.data("form-id")), i.forEach(function(t) {
                    f.is_applicable_rule(t, n) && a++
                }), "all" === o && a === i.length || "any" === o && 0 < a ? (s instanceof jQuery && (e = s.closest(".forminator-pagination")), "submit" === t && void 0 !== e && f.toggle_field(t, "show", "valid"), f.toggle_field(t, n, "valid"), f.has_relations(t) && ("hide" === n ? f.hide_element(t, l) : f.show_element(t, l))) : (f.toggle_field(t, n, "invalid"), f.has_relations(t) && ("show" === n ? f.hide_element(t, l) : f.show_element(t, l)))
            })
        },
        init_events: function() {
            var e = this;
            this.$el.on("forminator.front.condition.restart", function(t) {
                e.on_restart(t)
            })
        },
        on_restart: function(t) {
            this.$el.find('.forminator-field input:not([type="file"]), .forminator-row input[type=hidden], .forminator-field select, .forminator-field textarea').trigger("change", "forminator_emulate_trigger")
        },
        add_missing_relations: function() {
            var t, n = this,
                o = {};
            void 0 !== this.settings.fields && (t = this.settings.fields, Object.keys(t).forEach(function(r) {
                t[r].conditions.forEach(function(t) {
                    var e, t = t.field;
                    n.has_relations(t) ? (e = n.get_relations(t), -1 === i.inArray(r, e) && n.settings.relations[t].push(r)) : (void 0 === o[t] && (o[t] = []), o[t].push(r))
                })
            })), Object.keys(o).forEach(function(t) {
                n.settings.relations[t] = o[t]
            })
        },
        get_field_logic: function(t) {
            return void 0 === this.settings.fields[t] ? [] : this.settings.fields[t]
        },
        has_relations: function(t) {
            return void 0 !== this.settings.relations[t]
        },
        get_relations: function(t) {
            return this.has_relations(t) ? i.unique(this.settings.relations[t]) : []
        },
        get_field_value: function(t) {
            if ("" === t) return "";
            var e = this.get_form_field(t),
                r = e.val();
            if (this.field_is_radio(e)) r = e.filter(":checked").val();
            else if (this.field_is_signature(e)) r = e.find("input[id$='_data']").val();
            else if (this.field_is_checkbox(e)) r = [], e.each(function() {
                i(this).is(":checked") && r.push(i(this).val().toLowerCase())
            }), 0 === r.length && (r = null);
            else if (this.field_is_textarea_wpeditor(e)) "undefined" != typeof tinyMCE && tinyMCE.activeEditor && (r = tinyMCE.activeEditor.getContent());
            else if (this.field_has_inputMask(e)) {
                if (r = parseFloat(e.inputmask("unmaskedvalue").replace(",", ".")), 0 <= t.indexOf("calculation-")) return r
            } else this.field_is_rating(e) && (r = "string" == typeof r && r.split("/")[0] || 0);
            return r || ""
        },
        get_date_field_value: function(t) {
            if ("" === t) return "";
            var e = this.get_form_field(t),
                r = !0,
                n = "";
            if (!(r = e instanceof jQuery && (r = !1, e.hasClass("forminator-col")) ? !0 : r) && this.field_is_datepicker(e)) {
                switch (n = e.val(), e.data("format")) {
                    case "dd/mm/yy":
                        n = e.val().split("/").reverse().join("-");
                        break;
                    case "dd.mm.yy":
                        n = e.val().split(".").reverse().join("-");
                        break;
                    case "dd-mm-yy":
                        n = e.val().split("-").reverse().join("-")
                }
                var o = new Date,
                    n = {
                        year: (o = "" !== n ? new Date(n) : o).getFullYear(),
                        month: o.getMonth(),
                        date: o.getDate(),
                        day: o.getDay()
                    }
            } else {
                var r = !0 === r ? t : e.data("parent"),
                    t = this.get_form_field_value(r + "-year"),
                    i = this.get_form_field_value(r + "-month"),
                    r = this.get_form_field_value(r + "-day");
                "" !== t && "" !== i && "" !== r && (n = {
                    year: (o = new Date(t + "-" + i + "-" + r)).getFullYear(),
                    month: o.getMonth(),
                    date: o.getDate(),
                    day: o.getDay()
                })
            }
            return n || ""
        },
        field_has_inputMask: function(t) {
            var e = !1;
            return t.each(function() {
                if (o !== i(this).attr("data-inputmask")) return !(e = !0)
            }), e
        },
        field_is_radio: function(t) {
            var e = !1;
            return t.each(function() {
                if ("radio" === i(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_signature: function(t) {
            var e = !1;
            return t.each(function() {
                if (0 < i(this).find(".forminator-field-signature").length) return !(e = !0)
            }), e
        },
        field_is_datepicker: function(t) {
            var e = !1;
            return t.each(function() {
                if (i(this).hasClass("forminator-datepicker")) return !(e = !0)
            }), e
        },
        field_is_checkbox: function(t) {
            var e = !1;
            return t.each(function() {
                if ("checkbox" === i(this).attr("type")) return !(e = !0)
            }), e
        },
        field_is_select: function(t) {
            return t.is("select")
        },
        field_is_textarea_wpeditor: function(t) {
            var e = !1;
            return t.each(function() {
                if (i(this).parent(".wp-editor-container").parent("div").hasClass("tmce-active")) return !(e = !0)
            }), e
        },
        field_is_upload: function(t) {
            var e = !1;
            return e = -1 !== t.indexOf("upload") ? !0 : e
        },
        field_is_rating: function(t) {
            var e = !1;
            return t.each(function() {
                if (i(this).hasClass("forminator-rating")) return !(e = !0)
            }), e
        },
        get_form_field: function(t) {
            let e = this.$el;
            var r = (e = e.hasClass("forminator-grouped-fields") ? e.closest("form.forminator-ui") : e).find("#" + t + "-field");
            return r = 0 === r.length && 0 === (r = e.find("." + t + "-payment")).length && 0 === (r = e.find('input[name="' + t + '"]')).length && 0 === (r = e.find('textarea[name="' + t + '"]')).length && 0 === (r = e.find('input[name="' + t + '[]"]')).length && 0 === (r = e.find('select[name="' + t + '"]')).length && 0 === (r = e.find('select[name="' + t + '[]"]')).length ? e.find("#" + t) : r
        },
        get_form_field_value: function(t) {
            var e = this.$el.data("form-id"),
                r = this.$el.data("uid"),
                e = this.$el.find("#forminator-form-" + e + "__field--" + t + "_" + r);
            return (e = 0 === e.length && 0 === (e = this.$el.find("#" + t + "-field")).length && 0 === (e = this.$el.find('input[name="' + t + '"]')).length && 0 === (e = this.$el.find('textarea[name="' + t + '"]')).length && 0 === (e = this.$el.find('input[name="' + t + '[]"]')).length && 0 === (e = this.$el.find('select[name="' + t + '"]')).length && 0 === (e = this.$el.find('select[name="' + t + '[]"]')).length ? this.$el.find("#" + t) : e).val()
        },
        is_numeric: function(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        },
        is_date_rule: function(t) {
            return ["day_is", "day_is_not", "month_is", "month_is_not", "is_before", "is_after", "is_before_n_or_more_days", "is_before_less_than_n_days", "is_after_n_or_more_days", "is_after_less_than_n_days"].includes(t)
        },
        has_siblings: function(t) {
            return "" !== t && !!(t = this.get_form_field(t)).data("parent")
        },
        trigger_fake_parent_date_field: function(t) {
            t = this.get_form_field(t).data("parent");
            this.process_relations(t, {}, {})
        },
        trigger_siblings: function(r) {
            var n = this,
                t = n.get_form_field(r).data("parent");
            i.each([t + "-year", t + "-month", t + "-day"], function(t, e) {
                r !== e && n.has_relations(e) && n.get_form_field(e).trigger("change")
            })
        },
        is_applicable_rule: function(t, e) {
            var r, n, o;
            return void 0 !== t && (r = this.is_date_rule(t.operator) ? this.get_date_field_value(t.field) : this.get_field_value(t.field), n = t.value, o = t.operator, "show" === e ? this.is_matching(r, n, o) && this.is_hidden(t.field) : this.is_matching(r, n, o))
        },
        is_hidden: function(t) {
            t = this.get_form_field(t).closest(".forminator-col").closest(".forminator-row");
            return !!t.hasClass("forminator-hidden-option") || !t.hasClass("forminator-hidden")
        },
        is_matching: function(t, e, r) {
            var n, o = Array.isArray(t);
            switch ("string" == typeof t && (t = t.toLowerCase()), "string" == typeof e && (e = e.toLowerCase(), "month_is" !== r && "month_is_not" !== r || i.inArray(e, n = {
                jan: 0,
                feb: 1,
                mar: 2,
                apr: 3,
                may: 4,
                jun: 5,
                jul: 6,
                aug: 7,
                sep: 8,
                oct: 9,
                nov: 10,
                dec: 11
            }) && (e = n[e]), "day_is" !== r && "day_is_not" !== r || i.inArray(e, n = {
                su: 0,
                mo: 1,
                tu: 2,
                we: 3,
                th: 4,
                fr: 5,
                sa: 6
            }) && (e = n[e])), r) {
                case "is":
                    return o ? -1 < i.inArray(e, t) : this.is_numeric(t) && this.is_numeric(e) ? Number(t) === Number(e) : t === e;
                case "is_not":
                    return o ? -1 === i.inArray(e, t) : t !== e;
                case "is_great":
                    return e = +e, !(!this.is_numeric(t = +t) || !this.is_numeric(e)) && e < t;
                case "is_less":
                    return e = +e, !(!this.is_numeric(t = +t) || !this.is_numeric(e)) && t < e;
                case "contains":
                    return this.contains(t, e);
                case "starts":
                    return t.startsWith(e);
                case "ends":
                    return t.endsWith(e);
                case "month_is":
                    return t.month === e;
                case "month_is_not":
                    return t.month !== e;
                case "day_is":
                    return t.day === e;
                case "day_is_not":
                    return t.day !== e;
                case "is_before":
                    return this.date_is_smaller(t, e);
                case "is_after":
                    return this.date_is_grater(t, e);
                case "is_before_n_or_more_days":
                    return this.date_is_n_days_before_current_date(t, e);
                case "is_before_less_than_n_days":
                    return this.date_is_less_than_n_days_before_current_date(t, e);
                case "is_after_n_or_more_days":
                    return this.date_is_n_days_after_current_date(t, e);
                case "is_after_less_than_n_days":
                    return this.date_is_less_than_n_days_after_current_date(t, e)
            }
            return !1
        },
        contains: function(t, e) {
            return 0 <= t.toLowerCase().indexOf(e)
        },
        date_is_grater: function(t, e) {
            return 1 === forminatorDateUtil.compare(t, e)
        },
        date_is_smaller: function(t, e) {
            return -1 === forminatorDateUtil.compare(t, e)
        },
        date_is_equal: function(t, e) {
            return 0 === forminatorDateUtil.compare(t, e)
        },
        date_is_n_days_before_current_date: function(t, e) {
            e = parseInt(e);
            var r = this.get_current_date(),
                t = forminatorDateUtil.diffInDays(t, r);
            return !isNaN(t) && (0 === e ? t === e : e <= t)
        },
        date_is_less_than_n_days_before_current_date: function(t, e) {
            e = parseInt(e);
            var r = this.get_current_date(),
                t = forminatorDateUtil.diffInDays(t, r);
            return !isNaN(t) && t < e && 0 < t
        },
        date_is_n_days_after_current_date: function(t, e) {
            e = parseInt(e);
            var r = this.get_current_date(),
                r = forminatorDateUtil.diffInDays(r, t);
            return !isNaN(r) && (0 === e ? r === e : e <= r)
        },
        date_is_less_than_n_days_after_current_date: function(t, e) {
            e = parseInt(e);
            var r = this.get_current_date(),
                r = forminatorDateUtil.diffInDays(r, t);
            return !isNaN(r) && r < e && 0 < r
        },
        get_current_date: function() {
            return new Date
        },
        toggle_field: function(t, e, r) {
            var n = this,
                o = this.get_form_field(t),
                i = o.closest(".forminator-col"),
                a = i.find(".forminator-input-file-required"),
                s = i.find("[id ^=ctlSignature][id $=_data]"),
                l = i.find(".forminator-wp-editor-required"),
                f = i.closest(".forminator-row"),
                u = this.$el.find(".forminator-pagination-footer").find(".forminator-button-next"),
                c = "submit" === t ? ".forminator-button-submit" : "#forminator-paypal-submit",
                d = this.$el.find(c);
            "show" === e && ("valid" === r ? (f.removeClass("forminator-hidden"), i.removeClass("forminator-hidden"), u.removeClass("forminator-hidden"), 0 < a.length && a.addClass("do-validate"), 0 < l.length && l.addClass("do-validate"), 0 < s.length && s.addClass("do-validate"), setTimeout(function() {
                d = n.$el.find(c), "submit" === t && d.removeClass("forminator-hidden"), 0 === t.indexOf("paypal") && (n.$el.find(".forminator-button-submit").addClass("forminator-hidden"), d.removeClass("forminator-hidden"))
            }, 100)) : (i.addClass("forminator-hidden"), setTimeout(function() {
                d = n.$el.find(c), "submit" === t && d.addClass("forminator-hidden"), 0 === t.indexOf("paypal") && (n.$el.find(".forminator-button-submit").removeClass("forminator-hidden"), d.addClass("forminator-hidden"))
            }, 100), 0 < a.length && a.removeClass("do-validate"), 0 < l.length && l.removeClass("do-validate"), 0 < s.length && s.removeClass("do-validate"), 0 === f.find("> .forminator-col:not(.forminator-hidden)").length && f.addClass("forminator-hidden"))), "hide" === e && ("valid" === r ? (i.addClass("forminator-hidden"), d.addClass("forminator-hidden"), 0 < a.length && a.removeClass("do-validate"), 0 < l.length && l.removeClass("do-validate"), 0 < s.length && s.removeClass("do-validate"), 0 === f.find("> .forminator-col:not(.forminator-hidden)").length && f.addClass("forminator-hidden"), setTimeout(function() {
                d = n.$el.find(c), "submit" === t && d.addClass("forminator-hidden"), 0 === t.indexOf("paypal") && (n.$el.find(".forminator-button-submit").removeClass("forminator-hidden"), d.addClass("forminator-hidden"))
            }, 100)) : (f.removeClass("forminator-hidden"), i.removeClass("forminator-hidden"), d.removeClass("forminator-hidden"), 0 < a.length && a.addClass("do-validate"), 0 < l.length && l.addClass("do-validate"), 0 < s.length && s.addClass("do-validate"), setTimeout(function() {
                d = n.$el.find(c), "submit" === t && d.removeClass("forminator-hidden"), 0 === t.indexOf("paypal") && (n.$el.find(".forminator-button-submit").addClass("forminator-hidden"), d.removeClass("forminator-hidden"))
            }, 100))), this.$el.trigger("forminator:field:condition:toggled"), this.toggle_confirm_password(o)
        },
        clear_value: function(t, e) {
            var r = this.get_form_field(t),
                n = this.get_field_value(t);
            r.hasClass("forminator-cleared-value") || (r.addClass("forminator-cleared-value"), e.originalEvent !== o && (this.field_is_radio(r) ? (r.attr("data-previous-value", n), r.removeAttr("checked")) : this.field_is_checkbox(r) ? r.each(function() {
                i(this).attr("data-previous-value", n), i(this).prop("checked", !1)
            }) : (r.attr("data-previous-value", n), r.val(""))))
        },
        restore_value: function(t, e) {
            var r = this.get_form_field(t),
                n = r.attr("data-previous-value");
            r.hasClass("forminator-cleared-value") && e.originalEvent !== o && (r.removeClass("forminator-cleared-value"), !this.field_is_upload(t)) && n && (this.field_is_radio(r) ? r.val([n]) : this.field_is_checkbox(r) ? r.each(function() {
                var t = i(this).attr("data-previous-value");
                t && 0 <= t.indexOf(i(this).val().toLowerCase()) && i(this).prop("checked", !0)
            }) : r.val(n))
        },
        hide_element: function(t, r) {
            var n = this,
                e = n.get_relations(t);
            n.clear_value(t, r), e.forEach(function(t) {
                var e = "hide" === n.get_field_logic(t).action ? "show" : "hide";
                n.toggle_field(t, e, "valid"), n.has_relations(t) && ("hide" == e ? n.hide_element(t, r) : n.show_element(t, r))
            })
        },
        show_element: function(t, i) {
            var a = this,
                s = a.get_relations(t);
            this.restore_value(t, i), this.textareaFix(this.$el, t, i), s.forEach(function(t) {
                var e = a.get_field_logic(t),
                    r = e.action,
                    n = e.rule,
                    e = e.conditions,
                    o = 0;
                e.forEach(function(t) {
                    a.is_applicable_rule(t, r) && o++
                }), "all" === n && o === e.length || "any" === n && 0 < o ? a.toggle_field(t, r, "valid") : a.toggle_field(t, r, "invalid"), a.has_relations(t) && (s = a.show_element(t, i))
            })
        },
        paypal_button_condition: function() {
            var t = this.$el.find(".forminator-paypal-row"),
                e = this.$el.find(".forminator-pagination-footer").find(".forminator-button-paypal");
            0 < t.length && (this.$el.find(".forminator-button-submit").closest(".forminator-row").removeClass("forminator-hidden"), t.hasClass("forminator-hidden") || this.$el.find(".forminator-button-submit").closest(".forminator-row").addClass("forminator-hidden")), 0 < e.length && (e.hasClass("forminator-hidden") ? this.$el.find(".forminator-button-submit").removeClass("forminator-hidden") : this.$el.find(".forminator-button-submit").addClass("forminator-hidden"))
        },
        maybe_clear_upload_container: function() {
            this.$el.find('.forminator-row.forminator-hidden input[type="file"]').each(function() {
                "" === i(this).val() && (i(this).parent().hasClass("forminator-multi-upload") ? i(this).parent().siblings(".forminator-uploaded-files").empty() : (i(this).siblings("span").text(i(this).siblings("span").data("empty-text")), i(this).siblings(".forminator-button-delete").hide()))
            })
        },
        textareaFix: function(t, e, r) {
            var n = i("#" + e + " .forminator-label");
            e.includes("textarea") && t.hasClass("forminator-design--material") && 0 < n.length && (t = i("#" + e + " .forminator-textarea"), e = n.height() + 9, n.css({
                "padding-top": e + "px"
            }), t.css({
                "padding-top": e + "px"
            }))
        },
        toggle_confirm_password: function(t) {
            0 !== t.length && t.attr("id") && -1 !== t.attr("id").indexOf("password") && ((t = t.closest(".forminator-col")).hasClass("forminator-hidden") ? t.parent(".forminator-row").next(".forminator-row").addClass("forminator-hidden") : t.parent(".forminator-row").next(".forminator-row").removeClass("forminator-hidden"))
        }
    }), i.fn[n] = function(t, e) {
        return this.each(function() {
            i.data(this, n) || i.data(this, n, new r(this, t, e))
        })
    }
}(jQuery, window, document),
function(p, b, y) {
    "use strict";
    var r = "forminatorFrontSubmit",
        n = {
            form_type: "custom-form",
            forminatorFront: !1,
            forminator_selector: "",
            chart_design: "bar",
            chart_options: {}
        };

    function e(t, e) {
        this.element = t, this.$el = p(this.element), this.forminatorFront = null, this.settings = p.extend({}, n, e), this._defaults = n, this._name = r, this.init()
    }
    p.extend(e.prototype, {
        init: function() {
            switch (this.forminatorFront = this.$el.data("forminatorFront"), this.settings.form_type) {
                case "custom-form":
                    this.settings.forminator_selector && p(this.settings.forminator_selector).length || (this.settings.forminator_selector = ".forminator-custom-form"), this.handle_submit_custom_form();
                    break;
                case "quiz":
                    this.settings.forminator_selector && p(this.settings.forminator_selector).length || (this.settings.forminator_selector = ".forminator-quiz"), this.handle_submit_quiz();
                    break;
                case "poll":
                    this.settings.forminator_selector && p(this.settings.forminator_selector).length || (this.settings.forminator_selector = ".forminator-poll"), this.handle_submit_poll()
            }
        },
        decodeHtmlEntity: function(t) {
            return t.replace(/&#(\d+);/g, function(t, e) {
                return String.fromCharCode(e)
            })
        },
        removeCountryCode: function(t) {
            t.find(".forminator-field--phone").each(function() {
                var t = p(this);
                t.data("required") || "+" + t.intlTelInput("getSelectedCountryData").dialCode === t.val() && t.val("")
            })
        },
        handle_submit_custom_form: function() {
            var c = this,
                d = c.$el.find(".forminator-save-draft-link"),
                r = (c.$el.find(".forminator-response-message").find(".forminator-label--success").not(":hidden").length && c.focus_to_element(c.$el.find(".forminator-response-message")), p(".def-ajaxloader").hide(), !1);
            p("body").on("click", "#lostPhone", function(t) {
                t.preventDefault();
                var e = p(this);
                !1 === r && (r = !0, p.ajax({
                    type: "GET",
                    url: e.attr("href"),
                    beforeSend: function() {
                        e.attr("disabled", "disabled"), p(".def-ajaxloader").show()
                    },
                    success: function(t) {
                        e.removeAttr("disabled"), p(".def-ajaxloader").hide(), p(".notification").text(t.data.message), r = !1
                    }
                }))
            }), p("body").on("click", ".auth-back", function(t) {
                t.preventDefault();
                t = c.$el.attr("id");
                p("#" + (t + "-authentication") + "-input").attr("disabled", "disabled"), FUI.closeAuthentication()
            }), 0 !== d.length && this.handle_submit_form_draft(), p("body").off("forminator:preSubmit:paypal", this.settings.forminator_selector).on("forminator:preSubmit:paypal", this.settings.forminator_selector, function(t, e) {
                return c.processCaptcha(c, t, e)
            }), p("body").off("submit.frontSubmit", this.settings.forminator_selector), p("body").on("submit.frontSubmit", this.settings.forminator_selector, function(r, t) {
                if (!c.$el.find(".forminator-button-submit").prop("disabled"))
                    if (c.disable_form_submit(c, !0), 0 !== c.$el.find('input[type="hidden"][value="forminator_submit_preview_form_custom-forms"]').length) c.disable_form_submit(c, !1);
                    else {
                        var e, s = p(this),
                            n = this,
                            o = r,
                            l = new FormData(this),
                            f = s.find(".forminator-response-message"),
                            i = "true" === c.$el.find('input[name="save_draft"]').val(),
                            a = p("body").find("#ui-datepicker-div.forminator-custom-form-" + c.$el.data("form-id"));
                        if (c.removeCountryCode(s), c.settings.inline_validation && 0 < c.$el.find(".forminator-uploaded-files").length && !i)
                            if (0 < c.$el.find(".forminator-uploaded-files li.forminator-has_error").length) return c.disable_form_submit(c, !1), !1;
                        if (o.originalEvent !== y) {
                            var u = p(this).find(".forminator-button-submit").first();
                            if (0 === u.length || p(u).closest(".forminator-col").hasClass("forminator-hidden")) return c.disable_form_submit(c, !1), !1
                        }
                        0 !== a.length && c.$el.datepicker("widget").is(":visible") ? c.disable_form_submit(c, !1) : c.$el.data("forminatorFrontPayment") && !i && (s.find(".forminator-button-submit").attr("disabled", !0), !1 === c.processCaptcha(c, r, f)) ? (s.find(".forminator-button-submit").attr("disabled", !1), c.disable_form_submit(c, !1)) : (c.multi_upload_disable(s, !0), e = function() {
                            var t = c.$el.find(".forminator-pagination:visible"),
                                e = !!t.length,
                                t = t.index(".forminator-pagination");
                            if (l = new FormData(this), i && e && l.append("draft_page", t), !c.$el.data("forminatorFrontPayment") && !i && !1 === c.processCaptcha(c, r, f)) return c.disable_form_submit(c, !1), !1;
                            c.$el.hasClass("forminator_ajax") || i ? (f.html(""), c.$el.find(".forminator-button-submit").addClass("forminator-button-onload"), c.$el.find("input[type=file]").each(function() {
                                "" === p(this).val() && "function" == typeof b.FormData.prototype.delete && l.delete(p(this).attr("name"))
                            }), void 0 !== c.settings.has_loader && c.settings.has_loader && ("login" !== c.$el.find('input[name="form_type"]').val() && c.$el.addClass("forminator-fields-disabled"), f.html("<p>" + c.settings.loader_label + "</p>"), c.focus_to_element(f), f.removeAttr("aria-hidden").prop("tabindex", "-1").removeClass("forminator-success forminator-error forminator-accessible").addClass("forminator-loading forminator-show")), r.preventDefault(), p.ajax({
                                type: "POST",
                                url: b.ForminatorFront.ajaxUrl,
                                data: l,
                                cache: !1,
                                contentType: !1,
                                processData: !1,
                                beforeSend: function() {
                                    s.find("button").attr("disabled", !0), s.trigger("before:forminator:form:submit", l)
                                },
                                success: function(t) {
                                    var e, r, n, o, i, a;
                                    return !t && void 0 !== t || "object" != typeof t.data ? (s.find("button").removeAttr("disabled"), f.addClass("forminator-error").html("<p>" + b.ForminatorFront.cform.error + "<br>(" + t.data + ")</p>"), c.focus_to_element(f), t.data && s.trigger("forminator:form:submit:failed", [l, t.data]), !1) : t.success && y !== t.data.type && "save_draft" === t.data.type ? (c.showDraftLink(t.data), !1) : (s.find(".forminator-error-message").not(".forminator-uploaded-files .forminator-error-message").remove(), s.find(".forminator-field").removeClass("forminator-has_error"), s.find("button").removeAttr("disabled"), f.html("").removeClass("forminator-accessible forminator-error forminator-success"), c.settings.hasLeads && void 0 !== t.data.entry_id ? (c.showQuiz(c.$el), p("#forminator-module-" + c.settings.quiz_id + " input[name=entry_id]").val(t.data.entry_id), "end" === c.settings.form_placement && p("#forminator-module-" + c.settings.quiz_id).submit(), !1) : void 0 === t || void 0 === t.data || void 0 === t.data.authentication || "show" !== t.data.authentication && "invalid" !== t.data.authentication ? (a = t.success ? "forminator-success" : "forminator-error", void 0 !== t.message ? (f.removeAttr("aria-hidden").prop("tabindex", "-1").addClass(a + " forminator-show"), c.focus_to_element(f, !1, t.fadeout, t.fadeout_time), f.html(t.message), !t.data.success && t.data.errors.length && (o = '<ul class="forminator-screen-reader-only">', p.each(t.data.errors, function(t, e) {
                                        for (var r in e) e.hasOwnProperty(r) && (o += "<li>" + e[r] + "</li>")
                                    }), o += "</ul>", f.append(o))) : void 0 !== t.data && (i = !0, (i = void 0 !== t.data.url && void 0 !== t.data.newtab && "newtab_thankyou" !== t.data.newtab ? !1 : i) && (f.removeAttr("aria-hidden").prop("tabindex", "-1").addClass(a + " forminator-show"), c.focus_to_element(f, !1, t.data.fadeout, t.data.fadeout_time), f.html(t.data.message)), !t.data.success && void 0 !== t.data.errors && t.data.errors.length && (o = '<ul class="forminator-screen-reader-only">', p.each(t.data.errors, function(t, e) {
                                        for (var r in e) e.hasOwnProperty(r) && (o += "<li>" + e[r] + "</li>")
                                    }), o += "</ul>", f.append(o)), void 0 !== t.data.stripe3d) && (void 0 !== t.data.subscription ? s.trigger("forminator:form:submit:stripe:3dsecurity", [t.data.secret, t.data.subscription]) : s.trigger("forminator:form:submit:stripe:3dsecurity", [t.data.secret, !1])), t.data.success || (i = void 0 !== t.data.errors && t.data.errors.length ? t.data.errors : "", s.trigger("forminator:form:submit:failed", [l, i]), c.multi_upload_disable(s, !1), i && c.show_messages(i)), void(!0 === t.success && (a = void 0 !== t.data.behav && "behaviour-hide" === t.data.behav, s[0] && (c.settings.resetEnabled && !a && s[0].reset(), c.$el.trigger("forminator:field:condition:toggled"), s.find(".forminator-field-signature img").trigger("click"), void 0 !== t.data.select_field && p.each(t.data.select_field, function(r, t) {
                                        0 < t.length && p.each(t, function(t, e) {
                                            e.value && ("multiselect" === e.type ? s.find("#" + r + " input[value=" + e.value + "]").closest(".forminator-option") : s.find("#" + r + " option[value=" + e.value + "]")).remove().trigger("change")
                                        })
                                    }), s.find(".forminator-button-delete").hide(), s.find(".forminator-file-upload input").val(""), s.find(".forminator-file-upload > span").html(b.ForminatorFront.cform.no_file_chosen), s.find("ul.forminator-uploaded-files").html(""), c.$el.find("ul.forminator-uploaded-files").html(""), c.$el.find(".forminator-multifile-hidden").val(""), 0 < s.find(".forminator-select").length && s.find(".forminator-select").each(function(t, e) {
                                        var r = p(e).data("default-value");
                                        "" === r && (r = p(e).val()), p(e).val(r).trigger("fui:change")
                                    }), s.find(".multiselect-default-values").each(function() {
                                        var t = "" !== p(this).val() ? p.parseJSON(p(this).val()) : [],
                                            r = Object.values(t);
                                        p(this).closest(".forminator-multiselect").find('input[type="checkbox"]').each(function(t, e) {
                                            -1 !== p.inArray(p(e).val(), r) ? (p(e).prop("checked", !0), p(e).closest("label").addClass("forminator-is_checked")) : (p(e).prop("checked", !1), p(e).closest("label").removeClass("forminator-is_checked"))
                                        })
                                    }), s.find(".forminator-slider").each(function() {
                                        var t = p(this).find(".forminator-slide"),
                                            e = t.slider("option"),
                                            r = parseInt(t.data("min")) || 0,
                                            n = parseInt(t.data("max")) || 100,
                                            r = parseInt(t.data("value")) || r,
                                            n = parseInt(t.data("value-max")) || n;
                                        e.create(), !0 === e.range ? t.slider("values", [r, n]) : t.slider("value", r)
                                    }), c.multi_upload_disable(s, !1), s.trigger("forminator:form:submit:success", l), s.trigger("forminator.front.condition.restart")), void 0 !== t.data.url && (void 0 !== t.data.newtab && "sametab" !== t.data.newtab ? ("newtab_hide" === t.data.newtab && c.$el.hide(), b.open(c.decodeHtmlEntity(t.data.url), "_blank")) : b.location.href = c.decodeHtmlEntity(t.data.url)), a) && (c.$el.find(".forminator-row").hide(), c.$el.find(".forminator-pagination-steps").hide(), c.$el.find(".forminator-pagination-footer").hide(), c.$el.find(".forminator-pagination-steps, .forminator-pagination-progress").hide()))) : (i = c.$el.attr("id"), e = p("#" + (a = i + "-authentication")), r = p("#" + a + "-input"), n = p("#" + a + "-token"), e.find(".forminator-authentication-notice").removeClass("error"), e.find(".lost-device-url").attr("href", t.data.lost_url), "show" === t.data.authentication && (c.$el.find(".forminator-authentication-nav").html("").append(t.data.auth_nav), c.$el.find(".forminator-authentication-box").hide(), "fallback-email" === t.data.auth_method && (c.$el.find(".wpdef-2fa-email-resend input").click(), c.$el.find(".notification").hide()), c.$el.find("#forminator-2fa-" + t.data.auth_method).show(), c.$el.find(".forminator-authentication-box input").attr("disabled", !0), c.$el.find("#forminator-2fa-" + t.data.auth_method + " input").attr("disabled", !1), c.$el.find(".forminator-2fa-link").show(), c.$el.find("#forminator-2fa-link-" + t.data.auth_method).hide(), r.removeAttr("disabled").val(t.data.auth_method), n.val(t.data.auth_token), FUI.openAuthentication(a, i, a + "-input")), "invalid" === t.data.authentication && (e.find(".forminator-authentication-notice").addClass("error"), e.find(".forminator-authentication-notice").html("<p>" + t.data.message + "</p>"), s.trigger("forminator:form:submit:failed", [l, t.data.message])), !1))
                                },
                                error: function(t) {
                                    0 !== d.length && (c.$el.find('input[name="save_draft"]').val("false"), d.addClass("disabled")), s.find("button").removeAttr("disabled"), f.html("");
                                    t = 400 === t.status ? b.ForminatorFront.cform.upload_error : b.ForminatorFront.cform.error;
                                    f.html('<label class="forminator-label--notice"><span>' + t + "</span></label>"), c.focus_to_element(f), s.trigger("forminator:form:submit:failed", [l, t]), c.multi_upload_disable(s, !1)
                                },
                                complete: function(t, e) {
                                    c.$el.find(".forminator-button-submit").removeClass("forminator-button-onload"), s.trigger("forminator:form:submit:complete", l), c.showLeadsLoader(c)
                                }
                            }).always(function() {
                                void 0 !== c.settings.has_loader && c.settings.has_loader && (c.$el.removeClass("forminator-fields-disabled forminator-partial-disabled"), f.removeClass("forminator-loading")), 0 !== d.length && (c.$el.find('input[name="save_draft"]').val("false"), d.addClass("disabled")), c.disable_form_submit(c, !1), s.trigger("after:forminator:form:submit", l)
                            })) : (void 0 !== c.settings.has_loader && c.settings.has_loader && (c.$el.addClass("forminator-fields-disabled"), f.html("<p>" + c.settings.loader_label + "</p>"), f.removeAttr("aria-hidden").prop("tabindex", "-1").removeClass("forminator-success forminator-error forminator-accessible").addClass("forminator-loading forminator-show")), o.currentTarget.submit(), c.showLeadsLoader(c))
                        }, u = c.$el.find('div[data-is-payment="true"]').closest(".forminator-row, .forminator-col").hasClass("forminator-hidden"), !c.$el.data("forminatorFrontPayment") || u || i ? e.apply(n) : setTimeout(function() {
                            c.$el.trigger("payment.before.submit.forminator", [l, function() {
                                e.apply(n)
                            }])
                        }, 200))
                    }
                return !1
            })
        },
        handle_submit_form_draft: function() {
            p("body").on("click", ".forminator-save-draft-link", function(t) {
                t.preventDefault(), t.stopPropagation();
                var t = p(this).closest("form"),
                    e = t.find('input[name="save_draft"]');
                t.closest("#forminator-modal").hasClass("preview") || "true" === e.val() || p(this).hasClass("disabled") || (e.val("true"), t.trigger("submit.frontSubmit", "draft_submit"))
            })
        },
        showDraftLink: function(t) {
            var e = this.$el;
            e.trigger("forminator:form:draft:success", t), e.find(".forminator-response-message").html(""), e.hide(), p(t.message).insertBefore(e), this.sendDraftLink(t)
        },
        sendDraftLink: function(t) {
            var l = this,
                t = "#send-draft-link-form-" + t.draft_id;
            p("body").on("submit", t, function(t) {
                var r = p(this),
                    e = new FormData(this),
                    n = r.find("#email-1"),
                    o = n.find(".forminator-field"),
                    i = r.find(".forminator-button-submit"),
                    a = r.find(".forminator-response-message"),
                    s = r.prev(".forminator-draft-email-response");
                if (p(this).hasClass("submitting") || p(this).hasClass("forminator-has_error") && "" === n.find('input[name="email-1"]').val()) return !1;
                r.addClass("submitting"), i.attr("disabled", !0), r.removeClass("forminator-has_error"), o.removeClass("forminator-has_error"), o.find(".forminator-error-message").remove(), t.preventDefault(), p.ajax({
                    type: "POST",
                    url: b.ForminatorFront.ajaxUrl,
                    data: e,
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    beforeSend: function() {
                        r.trigger("before:forminator:draft:email:submit", e)
                    },
                    success: function(t) {
                        var e = t.data;
                        if (!t && void 0 !== t || "object" != typeof e) return i.removeAttr("disabled"), a.addClass("forminator-error").html("<p>" + b.ForminatorFront.cform.error + "<br>(" + e + ")</p>"), l.focus_to_element(a), !1;
                        t.success || y === e.field || "email-1" !== e.field || o.hasClass("forminator-has_error") || (r.addClass("forminator-has_error"), o.addClass("forminator-has_error"), o.append('<span class="forminator-error-message" aria-hidden="true">' + e.message + "</span>")), t.success && (e.draft_mail_sent ? s.removeClass("draft-error").addClass("draft-success") : s.removeClass("draft-success").addClass("draft-error"), s.html(e.draft_mail_message), s.show(), r.hide())
                    },
                    error: function(t) {
                        r.removeClass("submitting"), i.removeAttr("disabled")
                    }
                }).always(function() {
                    r.removeClass("submitting"), i.removeAttr("disabled")
                }), s.on("click", ".draft-resend-mail", function(t) {
                    t.preventDefault(), s.slideUp(50), r.show()
                })
            })
        },
        processCaptcha: function(t, e, r) {
            if ((n = t.$el.find(".forminator-g-recaptcha, .forminator-hcaptcha")).length) {
                var n, o = (n = p(n.get(0))).data("size"),
                    i = n.parent(".forminator-col");
                if (n.hasClass("forminator-g-recaptcha")) {
                    var a = n.data("forminator-recapchta-widget");
                    if (0 !== n.children().length) {
                        var s = b.grecaptcha.getResponse(a);
                        if ("invisible" === o && 0 === s.length) return b.grecaptcha.execute(a), !1;
                        t.$el.hasClass("forminator_ajax") && "forminator:preSubmit:paypal" !== e.type && b.grecaptcha.reset(a)
                    }
                } else if (n.hasClass("forminator-hcaptcha")) {
                    a = n.data("forminator-hcaptcha-widget"), s = hcaptcha.getResponse(a);
                    if ("invisible" === o && 0 === s.length) return hcaptcha.execute(a), !1;
                    t.$el.hasClass("forminator_ajax") && "forminator:preSubmit:paypal" !== e.type && hcaptcha.reset(a)
                }
                if (r.html(""), n.hasClass("error") && n.removeClass("error"), !s || 0 === s.length) return n.hasClass("error") || n.addClass("error"), r.removeAttr("aria-hidden").html('<label class="forminator-label--error"><span>' + b.ForminatorFront.cform.captcha_error + "</span></label>"), t.settings.inline_validation ? i.hasClass("forminator-has_error") || "invisible" === n.data("size") || (i.addClass("forminator-has_error").append('<span class="forminator-error-message" aria-hidden="true">' + b.ForminatorFront.cform.captcha_error + "</span>"), t.focus_to_element(i)) : t.focus_to_element(r), !1
            }
        },
        hideForm: function(t) {
            t.css({
                height: 0,
                opacity: 0,
                overflow: "hidden",
                visibility: "hidden",
                "pointer-events": "none",
                margin: 0,
                padding: 0,
                border: 0,
                display: "none"
            })
        },
        showForm: function(t) {
            t.css({
                height: "",
                opacity: "",
                overflow: "",
                visibility: "",
                "pointer-events": "",
                margin: "",
                padding: "",
                border: "",
                display: "block"
            })
        },
        showQuiz: function(t) {
            var e = p("#forminator-module-" + this.settings.quiz_id),
                r = p("#forminator-quiz-leads-" + this.settings.quiz_id);
            this.hideForm(t), r.find(".forminator-lead-form-skip").hide(), void 0 !== this.settings.form_placement && "beginning" === this.settings.form_placement && (this.showForm(e), e.find(".forminator-pagination").length) && (r.find(".forminator-quiz-intro").hide(), e.prepend('<button class="forminator-button forminator-quiz-start forminator-hidden"></button>').find(".forminator-quiz-start").trigger("click").remove())
        },
        handle_submit_quiz: function(t) {
            var d = this,
                u = void 0 !== d.settings.hasLeads && d.settings.hasLeads,
                m = void 0 !== d.settings.leads_id ? d.settings.leads_id : 0,
                h = void 0 !== d.settings.quiz_id ? d.settings.quiz_id : 0;
            p("body").on("submit.frontSubmit", this.settings.forminator_selector, function(t) {
                if (0 === d.$el.find('input[type="hidden"][value="forminator_submit_preview_form_quizzes"]').length) {
                    var e, r = p(this),
                        n = new FormData(this),
                        o = r.find(".forminator-answer"),
                        i = d.$el.find(".forminator-button").last(),
                        a = d.$el.find(".forminator-quiz--result"),
                        s = i.data("loading"),
                        l = void 0 !== d.settings.form_placement ? d.settings.form_placement : "",
                        f = void 0 !== d.settings.skip_form ? d.settings.skip_form : "";
                    if (t.preventDefault(), t.stopPropagation(), d.$el.find(".forminator-has-been-disabled").removeAttr("disabled"), e = r.serialize(), d.$el.find(".forminator-has-been-disabled").attr("disabled", "disabled"), u) {
                        t = "";
                        if (0 < d.$el.find("input[name=entry_id]").length && (t = d.$el.find("input[name=entry_id]").val()), "end" === l && "" === t) return d.showForm(p("#forminator-module-" + m)), a.addClass("forminator-hidden"), p("#forminator-quiz-leads-" + h + " .forminator-lead-form-skip").show(), !1;
                        if (!f && "" === t) return !1
                    }
                    "" !== s && i.text(s), d.settings.has_quiz_loader && o.each(function() {
                        var t = p(this),
                            e = t.find("input"),
                            t = t.find(".forminator-answer--status");
                        e.is(":checked") && 0 === t.html().length && t.html('<i class="forminator-icon-loader forminator-loading"></i>')
                    });
                    var c = !!d.$el.find(".forminator-pagination");
                    p.ajax({
                        type: "POST",
                        url: b.ForminatorFront.ajaxUrl,
                        data: e,
                        beforeSend: function() {
                            c || d.$el.find("button").attr("disabled", "disabled"), r.trigger("before:forminator:quiz:submit", [e, n])
                        },
                        success: function(u) {
                            var t;
                            u.success ? (t = "", a.removeClass("forminator-hidden"), b.history.pushState("forminator", "Forminator", u.data.result_url), "nowrong" === u.data.type ? (t = u.data.result, a.html(t), c || d.$el.find(".forminator-answer input").attr("disabled", "disabled")) : "knowledge" === u.data.type && (t = u.data.finalText, 0 < a.length && a.html(t), Object.keys(u.data.result).forEach(function(t) {
                                var e, r = d.$el.find("#" + t),
                                    n = r.find(".forminator-question--result"),
                                    o = r.find(".forminator-submit-rightaway"),
                                    i = r.find(".forminator-answer input"),
                                    a = u.data.result[t].isCorrect ? (e = "forminator-is_correct", '<i class="forminator-icon-check"></i>') : (e = "forminator-is_incorrect", '<i class="forminator-icon-cancel"></i>');
                                if (n.text(u.data.result[t].message), n.addClass("forminator-show"), o.attr("disabled", !0), o.attr("aria-disabled", !0), i.attr("disabled", !0), i.attr("aria-disabled", !0), y === u.data.result[t].answer)
                                    for (var s, l = u.data.result[t].answers, f = 0; f < l.length; f++)(s = r.find('[id|="' + l[f].id + '"]').closest(".forminator-answer")).addClass(e), (0 === s.find(".forminator-answer--status").html().length || 0 !== s.find(".forminator-answer--status .forminator-icon-loader").length) && s.find(".forminator-answer--status").html(a);
                                else(s = r.find('[id|="' + u.data.result[t].answer + '"]').closest(".forminator-answer")).addClass(e), 0 !== s.find(".forminator-answer--status").html().length && 0 === s.find(".forminator-answer--status .forminator-icon-loader").length || s.find(".forminator-answer--status").html(a)
                            })), r.trigger("forminator:quiz:submit:success", [e, n, t]), 0 === a.find(".forminator-quiz--summary").length || a.parent().hasClass("forminator-pagination--content") || d.focus_to_element(a.find(".forminator-quiz--summary"))) : (d.$el.find("button").removeAttr("disabled"), r.trigger("forminator:quiz:submit:failed", [e, n]))
                        }
                    }).always(function() {
                        r.trigger("after:forminator:quiz:submit", [e, n]), r.nextAll(".leads-quiz-loader").remove()
                    })
                }
                return !1
            }), p("body").on("click", "#forminator-quiz-leads-" + h + " .forminator-lead-form-skip", function(t) {
                d.showQuiz(p("#forminator-module-" + m)), void 0 !== d.settings.form_placement && "end" === d.settings.form_placement && (d.settings.form_placement = "skip", d.$el.submit())
            }), p("body").on("click", ".forminator-result--retake", function(t) {
                var e = {
                    action: "forminator_reload_quiz",
                    pageId: d.$el.find('input[name="page_id"]').val(),
                    nonce: d.$el.find('input[name="forminator_nonce"]').val()
                };
                t.preventDefault(), p.post(b.ForminatorFront.ajaxUrl, e, function(t) {
                    1 == t.success && t.html && b.location.replace(t.html)
                })
            })
        },
        handle_submit_poll: function() {
            var u = this,
                c = u.$el.html();
            u.$el.find(".forminator-response-message").not(":hidden").length && u.focus_to_element(u.$el.find(".forminator-response-message"), !0), p("body").on("submit.frontSubmit", this.settings.forminator_selector, function(t) {
                var r, n, o, i, a, s;
                return 0 === u.$el.find('input[type="hidden"][value="forminator_submit_preview_form_poll"]').length && (r = p(this), n = new FormData(this), o = r.serialize(), i = u.$el.find(".forminator-response-message"), a = u.$el.find("fieldset"), s = u.$el.find(".forminator-button"), !u.$el.hasClass("forminator_ajax") || (l(), p.ajax({
                    type: "POST",
                    url: b.ForminatorFront.ajaxUrl,
                    data: o,
                    beforeSend: function() {
                        s.addClass("forminator-onload"), r.trigger("before:forminator:poll:submit", [o, n])
                    },
                    success: function(t) {
                        var e = t.success ? "success" : "error";
                        s.removeClass("forminator-onload"), !1 === t.success ? (f(t.data.message, e), r.trigger("forminator:poll:submit:failed", [o, n])) : void 0 !== t.data && (e = t.data.success ? "success" : "error", f(t.data.message, e), setTimeout(function() {
                            l()
                        }, 2500)), !0 === t.success && (void 0 !== t.data.url ? b.location.href = t.data.url : void 0 !== t.data.chart_data && 1 < t.data.chart_data.length && ("link_on" === t.data.results_behav && r.find(".forminator-note").length && (r.find(".forminator-note").remove(), r.find(".forminator-poll-footer").append(t.data.results_link)), "show_after" === t.data.results_behav) && u.render_poll_chart(t.data.chart_data, t.data.back_button, u, c, [t.data.votes_text, t.data.votes_count, [t.data.grids_color, t.data.labels_color, t.data.onchart_label],
                            [t.data.tooltips_bg, t.data.tooltips_color]
                        ]), r.trigger("forminator:poll:submit:success", [o, n]))
                    },
                    error: function() {
                        l(), s.removeClass(".forminator-onload"), r.trigger("forminator:poll:submit:failed", [o, n])
                    }
                }).always(function() {
                    r.trigger("after:forminator:poll:submit", [o, n])
                }), !1));

                function l() {
                    i.html(""), i.removeClass("forminator-show"), i.removeClass("forminator-error"), i.removeClass("forminator-success"), i.removeAttr("tabindex"), i.attr("aria-hidden", !0), a.removeClass("forminator-has_error")
                }

                function f(t, e) {
                    i.html("<p>" + t + "</p>"), i.addClass("forminator-" + e), i.addClass("forminator-show"), i.removeAttr("aria-hidden"), i.attr("tabindex", "-1"), i.focus(), "error" !== e || a.find('input[type="radio"]').is(":checked") || a.addClass("forminator-has_error")
                }
            })
        },
        render_poll_chart: function(t, e, r, n, o) {
            var i, a, s = "forminator-chart-poll-" + (r.$el.attr("id") + "-" + r.$el.data("forminatorRender")),
                l = r.$el.find(".forminator-poll-body"),
                f = r.$el.find(".forminator-poll-footer");
            a = r.$el.find(".forminator-chart-wrapper"), i = r.$el.find(".forminator-chart"), a.remove(), i.remove(), a = p('<canvas id="' + s + '" class="forminator-chart" role="img" aria-hidden="true"></canvas>'), l.append(a), FUI.pollChart("#" + s, t, r.settings.chart_design, o), (i = l.find(".forminator-field")).hide(), i.attr("aria-hidden", "true"), a = r.$el.find(".forminator-chart"), ((s = r.$el.find(".forminator-chart-wrapper")).length ? (a.addClass("forminator-show"), s.addClass("forminator-show"), s.removeAttr("aria-hidden"), s.attr("tabindex", "-1"), s) : (a.html("<p>Fallback text...</p>"), a.addClass("forminator-show"), a.removeAttr("aria-hidden"), a.attr("tabindex", "-1"), a)).focus(), t = p(e), f.empty(), f.append(t), r.$el.find(".forminator-button").click(function(t) {
                r.$el.hasClass("forminator_ajax") ? r.$el.html(n) : location.reload(), t.preventDefault()
            })
        },
        focus_to_element: function(t, e, r, n) {
            r = r || !1, n = n || 0, e = e || !1;
            var o = "html,body";

            function i(t) {
                t.attr("tabindex") || t.attr("tabindex", -1), t.hasClass("forminator-select2") || t.focus(), r && t.show().delay(n).fadeOut("slow")
            }
            0 < t.closest(".sui-dialog").length && (o = ".sui-dialog"), 0 < t.closest(".wph-modal").length && (o = ".wph-modal"), t.hasClass("forminator-textarea") || t.parent(".wp-editor-container").length ? t.hasClass("forminator-textarea") && t.parent(".wp-editor-container").length && (t = t.parent(".wp-editor-container")) : t.show(), e ? i(t) : p(o).animate({
                scrollTop: t.offset().top - (p(b).height() - t.outerHeight(!0)) / 2
            }, 500, function() {
                i(t)
            })
        },
        show_messages: function(t) {
            var d, m = this,
                h = m.$el.data("forminatorFrontCondition");
            return void 0 !== h && (this.$el.find(".forminator-error-message").remove(), d = 0, t.forEach(function(t) {
                var e = Object.keys(t),
                    e = h.get_form_field(e),
                    r = p(e),
                    n = r.closest(".forminator-field"),
                    o = r.closest(".forminator-date-input"),
                    i = r.closest(".forminator-timepicker"),
                    a = !1,
                    s = !1,
                    l = !1,
                    f = r.attr("id") + "-error",
                    u = r.attr("aria-describedby"),
                    t = Object.values(t),
                    c = '<span class="forminator-error-message" id="' + f + '"></span>';
                e.length && (0 === d && (m.$el.trigger("forminator.front.pagination.focus.input", [e]), m.focus_to_element(e)), (0 < o.length ? (s = (a = o.parent()).find('.forminator-error-message[data-error-field="' + r.data("field") + '"]'), l = a.find(".forminator-description"), c = '<span class="forminator-error-message" data-error-field="' + r.data("field") + '" id="' + f + '"></span>', 0 === s.length && ("day" === r.data("field") && (a.find('.forminator-error-message[data-error-field="year"]').length ? p(c).insertBefore(a.find('.forminator-error-message[data-error-field="year"]')) : 0 === l.length ? a.append(c) : p(c).insertBefore(l), 0 === n.find(".forminator-error-message").length) && n.append('<span class="forminator-error-message" id="' + f + '"></span>'), "month" === r.data("field") && (a.find('.forminator-error-message[data-error-field="day"]').length ? p(c).insertBefore(a.find('.forminator-error-message[data-error-field="day"]')) : 0 === l.length ? a.append(c) : p(c).insertBefore(l), 0 === n.find(".forminator-error-message").length) && n.append('<span class="forminator-error-message" id="' + f + '"></span>'), "year" === r.data("field")) && (0 === l.length ? a.append(c) : p(c).insertBefore(l), 0 === n.find(".forminator-error-message").length) && n.append('<span class="forminator-error-message" id="' + f + '"></span>'), a.find('.forminator-error-message[data-error-field="' + r.data("field") + '"]').html(t), n.find(".forminator-error-message")) : 0 < i.length && 0 < t[0].length ? (s = (a = i.parent()).find('.forminator-error-message[data-error-field="' + r.data("field") + '"]'), l = a.find(".forminator-description"), c = '<span class="forminator-error-message" data-error-field="' + r.data("field") + '" id="' + f + '"></span>', 0 === s.length && ("hours" === r.data("field") && (a.find('.forminator-error-message[data-error-field="minutes"]').length ? p(c).insertBefore(a.find('.forminator-error-message[data-error-field="minutes"]')) : 0 === l.length ? a.append(c) : p(c).insertBefore(l), 0 === n.find(".forminator-error-message").length) && n.append('<span class="forminator-error-message" id="' + f + '"></span>'), "minutes" === r.data("field")) && (0 === l.length ? a.append(c) : p(c).insertBefore(l), 0 === n.find(".forminator-error-message").length) && n.append('<span class="forminator-error-message" id="' + f + '"></span>'), a.find('.forminator-error-message[data-error-field="' + r.data("field") + '"]').html(t), n.find(".forminator-error-message")) : (s = n.find(".forminator-error-message"), l = n.find(".forminator-description"), 0 === s.length && (0 === l.length ? n.append(c) : p(c).insertBefore(l)), n.find(".forminator-error-message"))).html(t), u ? ((e = u.split(" ")).includes(f) || e.push(f), o = e.join(" "), r.attr("aria-describedby", o)) : r.attr("aria-describedby", f), r.attr("aria-invalid", "true"), n.addClass("forminator-has_error"), d++)
            })), this
        },
        multi_upload_disable: function(t, e) {
            t.find(".forminator-multi-upload input").each(function() {
                "ajax" === p(this).data("method") && p(this).attr("disabled", e)
            })
        },
        disable_form_submit: function(t, e) {
            t.$el.find(".forminator-button-submit").prop("disabled", e)
        },
        showLeadsLoader: function(t) {
            t.settings.hasLeads && "end" === t.settings.form_placement && p("#forminator-quiz-leads-" + t.settings.quiz_id).append('<div class="leads-quiz-loader forminator-response-message"><i class="forminator-icon-loader forminator-loading" aria-hidden="true"></i><style>.leads-quiz-loader{padding:20px;text-align:center;}.leads-quiz-loader .forminator-loading:before{display:block;}</style></div>')
        }
    }), p.fn[r] = function(t) {
        return this.each(function() {
            p.data(this, r) || p.data(this, r, new e(this, t))
        })
    }
}(jQuery, window, void document),
function(p, b, o) {
    "use strict";
    var r = "forminatorFrontMultiFile",
        n = {};

    function e(t, e) {
        this.element = t, this.$el = p(this.element), this.form = p.extend({}, n, e), this._defaults = n, this._name = r, this.form_id = 0, this.uploader = this.$el, this.element = this.uploader.data("element"), this.init()
    }
    p.extend(e.prototype, {
        init: function() {
            var i = this,
                a = [],
                s = [];
            0 < this.form.find("input[name=form_id]").length && (this.form_id = this.form.find("input[name=form_id]").val()), this.uploader.on("drag dragstart dragend dragover dragenter dragleave drop", function(t) {
                t.preventDefault(), t.stopPropagation()
            }), this.uploader.on("dragover dragenter", function(t) {
                p(this).addClass("forminator-dragover")
            }), this.uploader.on("dragleave dragend drop", function(t) {
                p(this).removeClass("forminator-dragover")
            }), this.uploader.find(".forminator-upload-file--forminator-field-" + this.element).on("click", function(t) {
                i.form.find(".forminator-field-" + i.element + "-" + i.form_id).click()
            }), this.uploader.on("drop", function(t) {
                o.querySelector(".forminator-field-" + i.element + "-" + i.form_id).files = t.originalEvent.dataTransfer.files, i.form.find(".forminator-field-" + i.element + "-" + i.form_id).change()
            }), this.uploader.on("click", function(t) {
                t.target === t.currentTarget && i.form.find(".forminator-field-" + i.element + "-" + i.form_id).click()
            }), this.uploader.find(".forminator-multi-upload-message, .forminator-multi-upload-message p, .forminator-multi-upload-message .forminator-icon-upload").on("click", function(t) {
                t.target === t.currentTarget && i.form.find(".forminator-field-" + i.element + "-" + i.form_id).click()
            }), this.form.on("forminator:form:submit:success", function(t) {
                a = []
            }), this.form.find(".forminator-field-" + i.element + "-" + i.form_id).on("change", function(t) {
                var r, n, o;
                i.uploadingFile || (i.uploadingFile = 1, r = p(this), n = this.files, o = [], p.when().then(function() {
                    r.closest(".forminator-field").removeClass("forminator-has_error");
                    for (var t = 0; t < n.length; t++) o.push(n[t]), a.push(n[t]);
                    s = i.handleChangeCallback(o, r, s);
                    var e = Array.prototype.slice.call(a);
                    0 < e.length && (n = i.FileObjectItem(e), "submission" === r.data("method")) && r.prop("files", n)
                }).done(function() {
                    i.uploadingFile = null
                }))
            }), this.delete_files(a, s)
        },
        handleChangeCallback: function(s, l, f) {
            var u = this,
                c = 0,
                d = new FormData,
                t = this.form.find('input[name="forminator_nonce"]').val(),
                m = l.data("method"),
                h = (h = u.element).split("_")[0];
            return d.append("action", "forminator_multiple_file_upload"), d.append("form_id", this.form_id), d.append("element_id", h), d.append("nonce", t), p.each(s, function(t, n) {
                var e, o = u.progress_bar(n, m),
                    r = u.form.find(".upload-container-" + u.element + " li").length,
                    i = void 0 !== l.data("filetype") ? l.data("filetype") : "",
                    i = new RegExp("(.*?).(" + i + ")$"),
                    a = n.name.toLowerCase();
                void 0 !== l.data("size") && l.data("size") <= n.size ? (e = l.data("size-message"), u.upload_fail_response(o, e)) : i.test(a) ? "ajax" === m ? (d.delete(u.element), d.delete("totalFiles"), d.append("totalFiles", r), d.append(h, n), f.push(p.ajax({
                    xhr: function() {
                        var t = new b.XMLHttpRequest;
                        return t.upload.addEventListener("progress", function(t) {
                            t.lengthComputable && (t = t.loaded / t.total * 100) < 90 && u.form.find("#" + o + " .progress-percentage").html(Math.round(t) + "% of ")
                        }, !1), t
                    },
                    type: "POST",
                    url: b.ForminatorFront.ajaxUrl,
                    data: d,
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    beforeSend: function() {
                        u.form.find(".forminator-button-submit").attr("disabled", !0), u.$el.trigger("before:forminator:multiple:upload", d)
                    },
                    success: function(t) {
                        var e = u.element,
                            r = {
                                success: t.success,
                                message: "undefined" !== t.data.message ? t.data.message : "",
                                file_id: o,
                                file_name: void 0 !== t.data.file_url ? t.data.file_url.replace(/^.*[\\\/]/, "") : n.name,
                                mime_type: n.type
                            };
                        u.add_upload_file(e, r), !0 === t.success && !0 === t.data.success && void 0 !== t.data ? (u.upload_success_response(o), u.$el.trigger("success:forminator:multiple:upload", d)) : (u.upload_fail_response(o, t.data.message), void 0 !== t.data.error_type && "limit" === t.data.error_type && u.form.find("#" + o).addClass("forminator-upload-limit_error"), u.$el.trigger("fail:forminator:multiple:upload", d))
                    },
                    complete: function(t, e) {
                        c++, s.length === c && u.form.find(".forminator-button-submit").attr("disabled", !1), u.$el.trigger("complete:forminator:multiple:upload", d)
                    },
                    error: function(t) {
                        u.upload_fail_response(o, b.ForminatorFront.cform.process_error)
                    }
                }))) : (i = !0, e = b.ForminatorFront.cform.process_error, void 0 !== l.data("limit") && l.data("limit") < r && (i = !1, u.form.find("#" + o).addClass("forminator-upload-limit_error"), e = l.data("limit-message")), i ? u.upload_success_response(o) : u.upload_fail_response(o, e)) : (e = "." + a.split(".").pop() + " " + l.data("filetype-message"), u.upload_fail_response(o, e))
            }), f
        },
        upload_fail_response: function(t, e) {
            this.form.trigger("validation:error"), this.form.find("#" + t).addClass("forminator-has_error"), this.form.find("#" + t).find('.forminator-uploaded-file--size [class*="forminator-icon-"]').addClass("forminator-icon-warning").removeClass("forminator-icon-loader").removeClass("forminator-loading"), this.form.find("#" + t + " .progress-percentage").html("0% of "), this.form.find("#" + t + " .forminator-uploaded-file--content").after('<div class="forminator-error-message">' + e + "</div>")
        },
        upload_success_response: function(t) {
            this.form.find("#" + t + " .progress-percentage").html("100% of "), this.form.find("#" + t + ' .forminator-uploaded-file--size [class*="forminator-icon-"]').remove(), this.form.find("#" + t + " .progress-percentage").remove()
        },
        progress_bar: function(t, e) {
            var r = "upload-process-" + Math.random().toString(36).substr(2, 7),
                n = t.name,
                o = this.bytes_to_size(t.size, 2),
                i = this.uploader.closest(".forminator-field").find(".forminator-uploaded-files"),
                a = "";
            this.progress_image_preview(t, r);
            t = '<div class="forminator-uploaded-file--preview" aria-hidden="true"><span class="forminator-icon-file" aria-hidden="true"></span></div>',
                function(t) {
                    switch ((t = (t = t).split("."))[t.length - 1].toLowerCase()) {
                        case "jpg":
                        case "jpe":
                        case "jpeg":
                        case "png":
                        case "gif":
                        case "ico":
                            return 1
                    }
                }(n) && (t = '<div class="forminator-uploaded-file--image" aria-hidden="true"><div class="forminator-img-preview" role="image"></div></div>'), n = '<p class="forminator-uploaded-file--title">' + n.replace(/[<>:"/\\|?*]+/g, "_") + "</p>", a = (a = (a = (a = '<li id="' + r + '" class="forminator-uploaded-file"><div class="forminator-uploaded-file--content">') + t + '<div class="forminator-uploaded-file--text">') + n + '<p class="forminator-uploaded-file--size"><span class="forminator-icon-loader forminator-loading" aria-hidden="true"></span><span class="progress-percentage">29% of </span>' + o + "</p>") + '</div><button type="button" class="forminator-uploaded-file--delete forminator-button-delete" data-method="' + e + '" data-element="' + this.element + '" data-value="' + r + '"><span class="forminator-icon-close" aria-hidden="true"></span><span class="forminator-screen-reader-only">Delete uploaded file</span></button></div></li>';
            return i.hasClass(".forminator-has-files") || i.addClass("forminator-has-files"), i.append(a), r
        },
        bytes_to_size: function(t, e) {
            var r;
            return 0 === t ? "0 Bytes" : (e = e < 0 ? 0 : e, r = Math.floor(Math.log(t) / Math.log(1024)), parseFloat((t / Math.pow(1024, r)).toFixed(e)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][r])
        },
        progress_image_preview: function(t, e) {
            var r;
            t && ((r = new FileReader).onload = function(t) {
                p("#" + e + " .forminator-img-preview").css("background-image", "url(" + t.target.result + ")")
            }, r.readAsDataURL(t))
        },
        get_uplaoded_files: function() {
            var t = this.form.find(".forminator-multifile-hidden").val();
            return void 0 === t || "" === t ? {} : p.parseJSON(t)
        },
        get_uplaoded_file: function(t) {
            var e = this.get_uplaoded_files();
            return void 0 === e[t] && (e[t] = []), e[t]
        },
        add_upload_file: function(t, e) {
            var r = this.get_uplaoded_file(t);
            r.unshift(e), this.set_upload_file(t, r)
        },
        set_upload_file: function(t, e) {
            var r = this.get_uplaoded_files(),
                n = this.form.find(".forminator-multifile-hidden");
            r[t] = e, n.val(JSON.stringify(r))
        },
        get_uploaded_file_id: function(t, r) {
            var n = null,
                t = this.get_uplaoded_file(t);
            return p.each(t, function(t, e) {
                r === e.file_id && (n = t)
            }), n
        },
        delete_files: function(l, f) {
            var u = this;
            p(o).on("click", ".forminator-uploaded-file--delete", function(t) {
                t.preventDefault();
                var e, r, n, t = p(this),
                    o = t.data("value"),
                    i = t.data("method"),
                    a = t.data("element"),
                    s = (void 0 !== o && void 0 !== a && void 0 !== i && (e = u.form.find("#" + o).index(), t = p(t).closest("li#" + o), r = u.get_uplaoded_files(), n = u.form.find(".forminator-multifile-hidden"), r && "ajax" === i && (void 0 !== f[e] && (f[e].abort(), f.splice(e, 1)), void 0 !== n) && ("" !== (o = u.get_uploaded_file_id(a, o)) && null !== o && r[a].splice(o, 1), n.val(JSON.stringify(r))), void 0 !== i && "submission" === i && u.remove_object(e, l, a), p(t).remove()), u.form.find(".forminator-field-" + a + "-" + u.form_id)),
                    o = u.form.find(".upload-container-" + a + " li");
                void 0 !== s.data("limit") && (p.each(o, function(t) {
                    s.data("limit") > t && p(this).hasClass("forminator-upload-limit_error") && (t = p(this).attr("id"), t = u.get_uploaded_file_id(a, t), p(this).removeClass("forminator-has_error"), p(this).find(".forminator-error-message, .forminator-icon-warning, .progress-percentage").remove(), "" !== t) && null !== t && void 0 !== r[a][t] && (r[a][t].success = !0)
                }), n.val(JSON.stringify(r))), 0 === o.length && s.val(""), 0 === u.form.find(".forminator-uploaded-file.forminator-has_error").length && (u.form.trigger("forminator:uploads:valid"), u.form.find(".forminator-button-submit").attr("disabled", !1))
            })
        },
        remove_object: function(t, e, r) {
            var n, r = o.querySelector(".forminator-field-" + r + "-" + this.form_id);
            void 0 !== r && 0 < (n = r.files).length && (n = Array.prototype.slice.call(n), e.splice(t, 1), n.splice(t, 1), r.files = this.FileObjectItem(n))
        },
        FileObjectItem: function(t) {
            for (var e, r = e = (t = (t = [].slice.call(Array.isArray(t) ? t : arguments)).reverse()).length, n = !0; r-- && n;) n = t[r] instanceof File;
            if (!n) throw new TypeError("expected argument to FileList is File or array of File objects");
            for (r = new ClipboardEvent("").clipboardData || new DataTransfer; e--;) r.items.add(t[e]);
            return r.files
        }
    }), p.fn[r] = function(t) {
        return this.each(function() {
            p.data(this, r) || p.data(this, r, new e(this, t))
        })
    }
}(jQuery, window, document);