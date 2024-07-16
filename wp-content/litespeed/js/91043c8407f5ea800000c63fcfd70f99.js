/*!
 * WPMU DEV Forminator UI
 * Copyright 2019 Incsub (https://incsub.com)
 * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
/*!
 * WPMU DEV Forminator UI
 * Copyright 2019 Incsub (https://incsub.com)
 * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
function ownKeys(t, e) {
    var o = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(t);
        e && (i = i.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        }))), o.push.apply(o, i)
    }
    return o
}

function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = null != arguments[e] ? arguments[e] : {};
        e % 2 ? ownKeys(Object(o), !0).forEach((function(e) {
            _defineProperty(t, e, o[e])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : ownKeys(Object(o)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
        }))
    }
    return t
}

function _defineProperty(t, e, o) {
    return (e = _toPropertyKey(e)) in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t
}

function _toPropertyKey(t) {
    var e = _toPrimitive(t, "string");
    return "symbol" == _typeof(e) ? e : e + ""
}

function _toPrimitive(t, e) {
    if ("object" != _typeof(t) || !t) return t;
    var o = t[Symbol.toPrimitive];
    if (void 0 !== o) {
        var i = o.call(t, e || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === e ? String : Number)(t)
}

function _typeof(t) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, _typeof(t)
}! function(t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.inputStates = function(e) {
        var o = t(e),
            i = o.closest("form");
        if (o.is("input") || i.is(".forminator-poll") && (i.is(".forminator-ui") || i.is(".forminator-custom-form"))) return o.each((function() {
            var e, o;
            e = t(this), o = e.closest(".forminator-field"), e.mouseover((function(t) {
                    o.addClass("forminator-is_hover"), t.stopPropagation()
                })).mouseout((function(t) {
                    o.removeClass("forminator-is_hover"), t.stopPropagation()
                })),
                function(e) {
                    var o = t(e),
                        i = o.closest(".forminator-field");
                    o.focus((function(t) {
                        i.addClass("forminator-is_active"), t.stopPropagation()
                    })).blur((function(t) {
                        i.removeClass("forminator-is_active"), t.stopPropagation()
                    }))
                }(this),
                function(e) {
                    var o = t(e),
                        i = o.closest(".forminator-field");
                    "" !== o.val().trim() && i.addClass("forminator-is_filled"), o.on("change", (function() {
                        "" !== o.val().trim() ? i.addClass("forminator-is_filled") : i.removeClass("forminator-is_filled")
                    }))
                }(this)
        })), this
    }
}(jQuery),
function(t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.inputMaterial = function(e) {
        var o = t(e),
            i = o.closest(".forminator-field"),
            r = i.find(".forminator-label"),
            n = o.closest("form");
        if (o.is("input") || n.is(".forminator-poll") && (n.is(".forminator-ui") || n.is(".forminator-custom-form"))) return o.parent().hasClass("forminator-input--wrap") || o.wrap('<div class="forminator-input--wrap"></div>'), r.length && (r.addClass("forminator-floating--input"), i.find(".forminator-input-with-icon").length && r.addClass("forminator-has_icon"), i.find(".forminator-input-with-phone").length && (r.addClass("forminator-has_phone"), i.find(".intl-tel-input").hasClass("allow-dropdown") && r.addClass("allow-dropdown"))), this
    }
}(jQuery),
function(t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.textareaStates = function(e) {
        var o = t(e),
            i = o.closest("form");
        if (o.is("textarea") || i.is(".forminator-ui") || i.is(".forminator-custom-form")) return o.each((function() {
            var e, o;
            e = t(this), o = e.closest(".forminator-field"), e.mouseover((function(t) {
                    o.addClass("forminator-is_hover"), t.stopPropagation()
                })).mouseout((function(t) {
                    o.removeClass("forminator-is_hover"), t.stopPropagation()
                })),
                function(e) {
                    var o = t(e),
                        i = o.closest(".forminator-field");
                    o.focus((function(t) {
                        i.addClass("forminator-is_active"), t.stopPropagation()
                    })).blur((function(t) {
                        i.removeClass("forminator-is_active"), t.stopPropagation()
                    }))
                }(this),
                function(e) {
                    var o = t(e),
                        i = o.closest(".forminator-field");
                    o.on("load", (function() {
                        "" !== o.val().trim() && i.addClass("forminator-is_filled")
                    })), o.on("change", (function() {
                        "" !== o.val().trim() ? i.addClass("forminator-is_filled") : i.removeClass("forminator-is_filled")
                    }))
                }(this)
        })), this
    }
}(jQuery),
function(t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.textareaMaterial = function(e) {
        var o = t(e),
            i = o.closest(".forminator-field"),
            r = i.find(".forminator-label"),
            n = o.closest("form");
        if ((o.is("textarea") || n.is(".forminator-ui") || n.is(".forminator-custom-form")) && !o.hasClass("wp-editor-area")) return function() {
            if (o.parent().hasClass("forminator-textarea--wrap") || o.wrap('<div class="forminator-textarea--wrap"></div>'), r.length) {
                var t = (0 === r.height() ? 20 : r.height()) + 9;
                r.addClass("forminator-floating--textarea"), i.css({
                    position: "relative"
                }), o.val() && i.addClass("forminator-is_filled"), i.hasClass("forminator-is_filled") && i.hasClass("forminator-is_active") || r.css({
                    "padding-top": t + "px"
                }), o.css({
                    "padding-top": t + "px"
                })
            }
        }(), this
    }
}(jQuery),
function(t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.radioStates = function(e) {
        var o = t(e),
            i = o.find("input");
        if (o.is("label") && "radio" === i.prop("type")) return i.each((function() {
            t(this).on("click", (function() {
                var e = t(this),
                    o = e.parent(),
                    i = o.closest(".forminator-field").find(".forminator-radio");
                i.find("input").prop("checked", !1), i.removeClass("forminator-is_checked"), e.prop("checked", "checked"), o.addClass("forminator-is_checked")
            }))
        })), this
    }
}(jQuery),
function(t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.checkboxStates = function(e) {
        var o = t(e),
            i = o.find("input");
        if (o.is("label") && "checkbox" === i.prop("type")) return i.each((function() {
            t(this).on("click", (function() {
                var e = t(this).parent();
                e.is(".forminator-is_checked") ? e.removeClass("forminator-is_checked") : e.addClass("forminator-is_checked")
            }))
        })), this
    }
}(jQuery),
function(t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.multiSelectStates = function(e) {
        var o = t(e),
            i = o.find(".forminator-option"),
            r = i.find("input");
        if (o.is(".forminator-multiselect") && 0 !== i.length) return r.each((function() {
            t(this).on("click", (function() {
                var e = t(this).parent();
                e.is(".forminator-is_checked") ? e.removeClass("forminator-is_checked") : e.addClass("forminator-is_checked")
            }))
        })), this
    }
}(jQuery),
function(t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.select = {}, FUI.select.escapeJS = function(e) {
        return t("<div>").html(e).text().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    }, FUI.select.formatCheckbox = function(t, e) {
        var o = FUI.select.escapeJS(t.text),
            i = t.selected,
            r = o.toLowerCase().replace(/\s+/g, "-");
        return t.id && (r = t.id), '<label for="' + r + '" class="forminator-checkbox"><input type="checkbox" value="' + o + '" id="' + r + '" ' + (i ? "checked" : "") + ' /><span class="forminator-checkbox-box" aria-hidden="true"></span><span class="forminator-select-label">' + o + "</span></label>"
    }, FUI.select2 = function() {
        t(".forminator-custom-form").each((function() {
            var e = t(this),
                o = e.data("form-id"),
                i = e.find(".forminator-select2");
            t.each(["bold", "flat", "default", "material", "none"], (function(r, n) {
                var a, s = "en",
                    d = "Select",
                    l = -1,
                    c = !1;
                e.hasClass("forminator-design--" + n) && i.length && i.each((function() {
                    var e = t(this),
                        i = e.closest(".sui-dialog-content"),
                        r = i.length ? i : e.closest(".elementor-popup-modal"),
                        f = "forminator-custom-form-" + o + " forminator-dropdown--" + n;
                    a = !0 === e.data("rtl-support") ? "rtl" : "ltr", d = e.data("placeholder") ? e.data("placeholder") : "Select", s = e.data("language") ? e.data("language") : "en", l = !0 === e.data("search") ? 0 : -1, !0 === e.data("checkbox") ? (c = !0, f += " forminator-dropdown--checkbox") : c = !1, e.prop("multiple") && (f += " forminator-dropdown--multiple"), r.length || (r = t(document.body)), e.FUIselect2(_objectSpread({
                        dir: a,
                        language: s,
                        placeholder: d,
                        dropdownCssClass: f,
                        minimumResultsForSearch: l,
                        dropdownParent: r
                    }, c && {
                        closeOnSelect: !1,
                        templateResult: FUI.select.formatCheckbox,
                        escapeMarkup: function(t) {
                            return t
                        }
                    })).on("select2:opening", (function() {
                        e.data("search-placeholder") ? e.data("select2").$dropdown.find(":input.select2-search__field").prop("placeholder", e.data("search-placeholder")) : e.data("select2").$dropdown.find(":input.select2-search__field").prop("placeholder", e.data("placeholder") ? e.data("placeholder") : "Search"), (e.closest(".hustle-popup").length || e.closest(".hustle-slidein")) && t(document.body).addClass("forminator-hustle-dropdown-fix")
                    })).on("select2:closing", (function() {
                        t(document.body).removeClass("forminator-hustle-dropdown-fix")
                    }))
                }))
            }))
        }))
    }
}(jQuery),
function() {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {});
    var t = t || {};
    t.KeyCode = {
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
    }, t.Utils = t.Utils || {}, t.Utils.remove = function(t) {
        return t.remove && "function" == typeof t.remove ? t.remove() : !(!t.parentNode || !t.parentNode.removeChild || "function" != typeof t.parentNode.removeChild) && t.parentNode.removeChild(t)
    }, t.Utils.isFocusable = function(t) {
        if (0 < t.tabIndex || 0 === t.tabIndex && null !== t.getAttribute("tabIndex")) return !0;
        if (t.disabled) return !1;
        switch (t.nodeName) {
            case "A":
                return !!t.href && "ignore" != t.rel;
            case "INPUT":
                return "hidden" != t.type && "file" != t.type;
            case "BUTTON":
            case "SELECT":
            case "TEXTAREA":
                return !0;
            default:
                return !1
        }
    }, t.Utils.simulateClick = function(t) {
        var e = new MouseEvent("click", {
            bubbles: !0,
            cancelable: !0,
            view: window
        });
        t.dispatchEvent(e)
    }, t.Utils.IgnoreUtilFocusChanges = !1, t.Utils.dialogOpenClass = "forminator-authentication-enabled", t.Utils.focusFirstDescendant = function(e) {
        for (var o = 0; o < e.childNodes.length; o++) {
            var i = e.childNodes[o];
            if (t.Utils.attemptFocus(i) || t.Utils.focusFirstDescendant(i)) return !0
        }
        return !1
    }, t.Utils.focusLastDescendant = function(e) {
        for (var o = e.childNodes.length - 1; 0 <= o; o--) {
            var i = e.childNodes[o];
            if (t.Utils.attemptFocus(i) || t.Utils.focusLastDescendant(i)) return !0
        }
        return !1
    }, t.Utils.attemptFocus = function(e) {
        if (!t.Utils.isFocusable(e)) return !1;
        t.Utils.IgnoreUtilFocusChanges = !0;
        try {
            e.focus()
        } catch (t) {}
        return t.Utils.IgnoreUtilFocusChanges = !1, document.activeElement === e
    }, t.OpenDialogList = t.OpenDialogList || new Array(0), t.getCurrentDialog = function() {
        if (t.OpenDialogList && t.OpenDialogList.length) return t.OpenDialogList[t.OpenDialogList.length - 1]
    }, t.closeCurrentDialog = function() {
        var e = t.getCurrentDialog();
        return !!e && (e.close(), !0)
    }, t.handleEscape = function(e) {
        (e.which || e.keyCode) === t.Utils.ESC && t.closeCurrentDialog() && e.stopPropagation()
    }, document.addEventListener("keyup", t.handleEscape), t.Authentication = function(e, o, i) {
        if (this.dialogNode = document.getElementById(e), null === this.dialogNode) throw new Error('No element found with id="' + e + '".');
        var r = ["dialog", "alertdialog"];
        if (!(this.dialogNode.getAttribute("role") || "").trim().split(/\s+/g).some((function(t) {
                return r.some((function(e) {
                    return t === e
                }))
            }))) throw new Error("Dialog() requires a DOM element with ARIA role of dialog or alertdialog.");
        var n = "forminator-authentication";
        if (this.dialogNode.parentNode.classList.contains(n) ? this.backdropNode = this.dialogNode.parentNode : (this.backdropNode = document.createElement("div"), this.backdropNode.className = n, this.backdropNode.data("markup", "new"), this.dialogNode.parentNode.insertBefore(this.backdropNode, this.dialogNodev), this.backdropNode.appendChild(this.dialogNode)), this.backdropNode.classList.add("forminator-active"), document.body.parentNode.classList.add(t.Utils.dialogOpenClass), "string" == typeof o) this.focusAfterClosed = document.getElementById(o);
        else {
            if ("object" !== _typeof(o)) throw new Error("the focusAfterClosed parameter is required for the aria.Authentication constructor.");
            this.focusAfterClosed = o
        }
        "string" == typeof i ? this.focusFirst = document.getElementById(i) : "object" === _typeof(i) ? this.focusFirst = i : this.focusFirst = null;
        var a = document.createElement("div");
        this.preNode = this.dialogNode.parentNode.insertBefore(a, this.dialogNode), this.preNode.tabIndex = 0;
        var s = document.createElement("div");
        this.postNode = this.dialogNode.parentNode.insertBefore(s, this.dialogNode.nextSibling), this.postNode.tabIndex = 0, 0 < t.OpenDialogList.length && t.getCurrentDialog().removeListeners(), this.addListeners(), t.OpenDialogList.push(this), this.dialogNode.classList.add("forminator-authentication-fade-in"), this.dialogNode.classList.remove("forminator-authentication-fade-out"), this.focusFirst ? this.focusFirst.focus() : t.Utils.focusFirstDescendant(this.dialogNode), this.lastFocus = document.activeElement
    }, t.Authentication.prototype.close = function() {
        var e = this;
        t.OpenDialogList.pop(), this.removeListeners(), this.preNode.parentNode.removeChild(this.preNode), this.postNode.parentNode.removeChild(this.postNode), this.dialogNode.classList.add("forminator-content-fade-out"), this.dialogNode.classList.remove("forminator-content-fade-in"), this.focusAfterClosed.focus(), setTimeout((function() {
            e.backdropNode.classList.remove("forminator-active")
        }), 300), 0 < t.OpenDialogList.length ? t.getCurrentDialog().addListeners() : document.body.parentNode.classList.remove(t.Utils.dialogOpenClass)
    }, t.Authentication.prototype.addListeners = function() {
        document.addEventListener("focus", this.trapFocus, !0)
    }, t.Authentication.prototype.removeListeners = function() {
        document.removeEventListener("focus", this.trapFocus, !0)
    }, t.Authentication.prototype.trapFocus = function(e) {
        if (!t.Utils.IgnoreUtilFocusChanges) {
            var o = t.getCurrentDialog();
            o.dialogNode.contains(e.target) ? o.lastFocus = e.target : (t.Utils.focusFirstDescendant(o.dialogNode), o.lastFocus == document.activeElement && t.Utils.focusLastDescendant(o.dialogNode), o.lastFocus = document.activeElement)
        }
    }, FUI.openAuthentication = function(e, o, i) {
        new t.Authentication(e, o, i)
    }, FUI.closeAuthentication = function() {
        t.getCurrentDialog().close()
    }
}(),
function(t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.slider = function() {
        function e(e, o) {
            return (e.find(".forminator-slider-amount").data("value-template") || "{slider-value}").replace("{slider-value}", '<span class="forminator-slider-value">' + t("<div>").text(o).html() + "</span>")
        }

        function o(t, e, o, i, r) {
            var n = t.find(".forminator-slider-amount"),
                a = t.find(".forminator-slide").data("is-range");
            n.find(".forminator-slider-value-min").html(e), a && (i === r ? (n.find(".forminator-slider-separator").hide(), n.find(".forminator-slider-value-max").html("")) : (n.find(".forminator-slider-separator").show(), n.find(".forminator-slider-value-max").html(o)))
        }
        t(".forminator-slider").each((function() {
            var i = t(this),
                r = i.find(".forminator-slide"),
                n = i.find(".forminator-hidden-input"),
                a = i.hasClass("forminator-disabled"),
                s = r.data("is-range"),
                d = parseInt(r.data("min")) || 0,
                l = parseInt(r.data("max")) || 100,
                c = parseInt(r.data("value")) || d,
                f = parseInt(r.data("value-max")) || l,
                u = parseInt(r.data("step")) || 1,
                m = i.find(".forminator-slider-amount"),
                p = t('label[for="' + n.attr("id") + '"]');
            !0 !== r.data("init") && (r.slider(_objectSpread(_objectSpread({
                range: !!s || "min",
                min: d,
                max: l,
                disabled: a,
                step: u
            }, s ? {
                values: [c, f]
            } : {
                value: c
            }), {}, {
                create: function(t, n) {
                    var a = e(i, c),
                        d = s ? e(i, f) : null;
                    r.data("init", !0), m.find(".forminator-slider-hidden-min").val(c).change(), s && m.find(".forminator-slider-hidden-max").val(f).change(), o(i, a, d, c, f)
                },
                slide: function(t, r) {
                    var n = s ? r.values[0] : r.value,
                        a = s ? r.values[1] : null,
                        d = e(i, n),
                        l = s ? e(i, a) : null;
                    o(i, d, l, n, a)
                },
                stop: function(t, e) {
                    var o = s ? e.values[0] : e.value,
                        r = s ? e.values[1] : null;
                    e.handle === i.find(".ui-slider-handle")[0] ? m.find(".forminator-slider-hidden-min").val(o).change() : e.handle === i.find(".ui-slider-handle")[1] ? m.find(".forminator-slider-hidden-max").val(r).change() : m.find(".forminator-slider-hidden-min").val(o).change()
                }
            })), p.on("click", (function() {
                var e = r.find(".ui-slider-handle");
                a || (s && 1 < e.length ? t(e[0]).focus() : e.focus())
            })))
        }))
    }
}(jQuery),
function(t) {
    "use strict";
    var e = !1;
    "object" !== _typeof(window.FUI) && (window.FUI = {}), FUI.rating = function(o) {
        o.each((function() {
            var e, o = t(this),
                i = o.attr("id"),
                r = o.find("option").not(":disabled"),
                n = r.length,
                a = o.attr("data-type") || "star",
                s = o.attr("data-size") || "md",
                d = o.find("option:selected").val() || 0,
                l = t('<div class="forminator-rating-wrapper"></div>'),
                c = t('<span data-id="' + i + '" data-selected-value="' + d + '" class="forminator-rating-items forminator-rating-' + s + '"></span>');
            for ("true" === (o.attr("data-init") || "false") && o.next(".forminator-rating-wrapper").remove(), e = 0; e < n; e++) {
                var f = r.eq(e).val(),
                    u = f <= d ? "forminator-rating-item forminator-rating-selected" : "forminator-rating-item";
                c.append('<span class="' + u + '" data-value="' + f + '"><i class="forminator-icon-' + a + '" aria-hidden="true"></i></span>')
            }
            o.attr("data-selected-value", d), o.attr("data-total-value", n), l.append(c), "true" === o.attr("data-suffix") && c.append('<span class="forminator-rating-suffix">(' + d + "/" + n + ")</span>"), o.after(l), o.attr("data-init", "true"), o.on("change", (function() {
                var e = t(this).val() || 0,
                    o = t('[data-id="' + i + '"]'),
                    r = o.find(".forminator-rating-suffix");
                o.attr("data-selected-value", e), t(this).attr("data-selected-value", e), o.children().removeClass("forminator-rating-selected"), o.children().each((function() {
                    t(this).data("value") <= e && t(this).addClass("forminator-rating-selected")
                })), r.length && r.text("(" + e + "/" + o.children().not(".forminator-rating-suffix").length + ")")
            }))
        })), e || (FUI.rating.events(), e = !0)
    }, FUI.rating.events = function() {
        t(document).on("mouseenter", ".forminator-rating-item", (function() {
            var e = t(this);
            e.siblings().removeClass("forminator-rating-selected"), e.prevAll().addBack().addClass("forminator-rating-hover")
        })), t(document).on("mouseleave", ".forminator-rating-item", (function() {
            var e = t(this),
                o = e.closest(".forminator-rating-items").data("id"),
                i = t("#" + o).find("option:selected").val();
            e.prevAll().addBack().removeClass("forminator-rating-hover"), e.siblings().addBack().each((function() {
                t(this).data("value") <= i ? t(this).addClass("forminator-rating-selected") : t(this).removeClass("forminator-rating-selected")
            }))
        })), t(document).on("click", ".forminator-rating-item", (function() {
            var e = t(this),
                o = e.data("value"),
                i = e.closest(".forminator-rating-items"),
                r = i.data("id"),
                n = t("#" + r),
                a = i.find(".forminator-rating-suffix");
            n.val(o).trigger("change"), i.attr("data-selected-value", o), n.attr("data-selected-value", o), e.siblings().removeClass("forminator-rating-selected"), e.prevAll().addBack().addClass("forminator-rating-selected"), a.length && a.text("(" + o + "/" + i.children().not(".forminator-rating-suffix").length + ")")
        })), t(document).on("focus", ".forminator-rating", (function() {
            t(this).next(".forminator-rating-wrapper").addClass("forminator-rating-focused")
        })), t(document).on("blur", ".forminator-rating", (function() {
            t(this).next(".forminator-rating-wrapper").removeClass("forminator-rating-focused")
        })), t(document).on("keydown", ".forminator-rating", (function(e) {
            var o = t(this),
                i = o.find("option"),
                r = i.index(o.find("option:selected"));
            "ArrowUp" !== e.key && "ArrowRight" !== e.key && "ArrowDown" !== e.key && "ArrowLeft" !== e.key || e.preventDefault(), ("ArrowUp" === e.key || "ArrowRight" === e.key) && r < i.length - 1 ? i.eq(r + 1).prop("selected", !0).trigger("change") : ("ArrowDown" === e.key || "ArrowLeft" === e.key) && 0 < r && i.eq(r - 1).prop("selected", !0).trigger("change")
        }))
    }
}(jQuery);