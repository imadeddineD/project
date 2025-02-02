! function(a) {
    "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], function(b) {
        a(b)
    }) : a(jQuery)
}(function(a, b) {
    "use strict";

    function c(a) {
        for (var b = 1; b < arguments.length; b++) {
            var c = null != arguments[b] ? Object(arguments[b]) : {},
                e = Object.keys(c);
            "function" == typeof Object.getOwnPropertySymbols && e.push.apply(e, Object.getOwnPropertySymbols(c).filter(function(a) {
                return Object.getOwnPropertyDescriptor(c, a).enumerable
            })), e.forEach(function(b) {
                d(a, b, c[b])
            })
        }
        return a
    }

    function d(a, b, c) {
        return b = n(b), b in a ? Object.defineProperty(a, b, {
            value: c,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : a[b] = c, a
    }

    function e(a, b) {
        return j(a) || i(a, b) || g(a, b) || f()
    }

    function f() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }

    function g(a, b) {
        if (a) {
            if ("string" == typeof a) return h(a, b);
            var c = Object.prototype.toString.call(a).slice(8, -1);
            return "Object" === c && a.constructor && (c = a.constructor.name), "Map" === c || "Set" === c ? Array.from(a) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? h(a, b) : void 0
        }
    }

    function h(a, b) {
        (null == b || b > a.length) && (b = a.length);
        for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c];
        return d
    }

    function i(a, b) {
        var c = null == a ? null : "undefined" != typeof Symbol && a[Symbol.iterator] || a["@@iterator"];
        if (null != c) {
            var d, e, f, g, h = [],
                i = !0,
                j = !1;
            try {
                if (f = (c = c.call(a)).next, 0 === b) {
                    if (Object(c) !== c) return;
                    i = !1
                } else
                    for (; !(i = (d = f.call(c)).done) && (h.push(d.value), h.length !== b); i = !0);
            } catch (k) {
                j = !0, e = k
            } finally {
                try {
                    if (!i && null != c["return"] && (g = c["return"](), Object(g) !== g)) return
                } finally {
                    if (j) throw e
                }
            }
            return h
        }
    }

    function j(a) {
        if (Array.isArray(a)) return a
    }

    function k(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

    function l(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, n(d.key), d)
        }
    }

    function m(a, b, c) {
        return b && l(a.prototype, b), c && l(a, c), Object.defineProperty(a, "prototype", {
            writable: !1
        }), a
    }

    function n(a) {
        var b = o(a, "string");
        return "symbol" == typeof b ? b : String(b)
    }

    function o(a, c) {
        if ("object" != typeof a || null === a) return a;
        var d = a[Symbol.toPrimitive];
        if (d !== b) {
            var e = d.call(a, c || "default");
            if ("object" != typeof e) return e;
            throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return ("string" === c ? String : Number)(a)
    }
    for (var p = [
            ["Afghanistan", "af", "93"],
            ["Albania", "al", "355"],
            ["Algeria", "dz", "213"],
            ["American Samoa", "as", "1", 5, ["684"]],
            ["Andorra", "ad", "376"],
            ["Angola", "ao", "244"],
            ["Anguilla", "ai", "1", 6, ["264"]],
            ["Antigua & Barbuda", "ag", "1", 7, ["268"]],
            ["Argentina", "ar", "54"],
            ["Armenia", "am", "374"],
            ["Aruba", "aw", "297"],
            ["Ascension Island", "ac", "247"],
            ["Australia", "au", "61", 0],
            ["Austria", "at", "43"],
            ["Azerbaijan", "az", "994"],
            ["Bahamas", "bs", "1", 8, ["242"]],
            ["Bahrain", "bh", "973"],
            ["Bangladesh", "bd", "880"],
            ["Barbados", "bb", "1", 9, ["246"]],
            ["Belarus", "by", "375"],
            ["Belgium", "be", "32"],
            ["Belize", "bz", "501"],
            ["Benin", "bj", "229"],
            ["Bermuda", "bm", "1", 10, ["441"]],
            ["Bhutan", "bt", "975"],
            ["Bolivia", "bo", "591"],
            ["Bosnia & Herzegovina", "ba", "387"],
            ["Botswana", "bw", "267"],
            ["Brazil", "br", "55"],
            ["British Indian Ocean Territory", "io", "246"],
            ["British Virgin Islands", "vg", "1", 11, ["284"]],
            ["Brunei", "bn", "673"],
            ["Bulgaria", "bg", "359"],
            ["Burkina Faso", "bf", "226"],
            ["Burundi", "bi", "257"],
            ["Cambodia", "kh", "855"],
            ["Cameroon", "cm", "237"],
            ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]],
            ["Cape Verde", "cv", "238"],
            ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]],
            ["Cayman Islands", "ky", "1", 12, ["345"]],
            ["Central African Republic", "cf", "236"],
            ["Chad", "td", "235"],
            ["Chile", "cl", "56"],
            ["China", "cn", "86"],
            ["Christmas Island", "cx", "61", 2, ["89164"]],
            ["Cocos (Keeling) Islands", "cc", "61", 1, ["89162"]],
            ["Colombia", "co", "57"],
            ["Comoros", "km", "269"],
            ["Congo - Brazzaville", "cg", "242"],
            ["Congo - Kinshasa", "cd", "243"],
            ["Cook Islands", "ck", "682"],
            ["Costa Rica", "cr", "506"],
            ["Côte d’Ivoire", "ci", "225"],
            ["Croatia", "hr", "385"],
            ["Cuba", "cu", "53"],
            ["Curaçao", "cw", "599", 0],
            ["Cyprus", "cy", "357"],
            ["Czech Republic", "cz", "420"],
            ["Denmark", "dk", "45"],
            ["Djibouti", "dj", "253"],
            ["Dominica", "dm", "1", 13, ["767"]],
            ["Dominican Republic", "do", "1", 2, ["809", "829", "849"]],
            ["Ecuador", "ec", "593"],
            ["Egypt", "eg", "20"],
            ["El Salvador", "sv", "503"],
            ["Equatorial Guinea", "gq", "240"],
            ["Eritrea", "er", "291"],
            ["Estonia", "ee", "372"],
            ["Eswatini", "sz", "268"],
            ["Ethiopia", "et", "251"],
            ["Falkland Islands", "fk", "500"],
            ["Faroe Islands", "fo", "298"],
            ["Fiji", "fj", "679"],
            ["Finland", "fi", "358", 0],
            ["France", "fr", "33"],
            ["French Guiana", "gf", "594"],
            ["French Polynesia", "pf", "689"],
            ["Gabon", "ga", "241"],
            ["Gambia", "gm", "220"],
            ["Georgia", "ge", "995"],
            ["Germany", "de", "49"],
            ["Ghana", "gh", "233"],
            ["Gibraltar", "gi", "350"],
            ["Greece", "gr", "30"],
            ["Greenland", "gl", "299"],
            ["Grenada", "gd", "1", 14, ["473"]],
            ["Guadeloupe", "gp", "590", 0],
            ["Guam", "gu", "1", 15, ["671"]],
            ["Guatemala", "gt", "502"],
            ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]],
            ["Guinea", "gn", "224"],
            ["Guinea-Bissau", "gw", "245"],
            ["Guyana", "gy", "592"],
            ["Haiti", "ht", "509"],
            ["Honduras", "hn", "504"],
            ["Hong Kong", "hk", "852"],
            ["Hungary", "hu", "36"],
            ["Iceland", "is", "354"],
            ["India", "in", "91"],
            ["Indonesia", "id", "62"],
            ["Iran", "ir", "98"],
            ["Iraq", "iq", "964"],
            ["Ireland", "ie", "353"],
            ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]],
            ["Israel", "il", "972"],
            ["Italy", "it", "39", 0],
            ["Jamaica", "jm", "1", 4, ["876", "658"]],
            ["Japan", "jp", "81"],
            ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]],
            ["Jordan", "jo", "962"],
            ["Kazakhstan", "kz", "7", 1, ["33", "7"]],
            ["Kenya", "ke", "254"],
            ["Kiribati", "ki", "686"],
            ["Kosovo", "xk", "383"],
            ["Kuwait", "kw", "965"],
            ["Kyrgyzstan", "kg", "996"],
            ["Laos", "la", "856"],
            ["Latvia", "lv", "371"],
            ["Lebanon", "lb", "961"],
            ["Lesotho", "ls", "266"],
            ["Liberia", "lr", "231"],
            ["Libya", "ly", "218"],
            ["Liechtenstein", "li", "423"],
            ["Lithuania", "lt", "370"],
            ["Luxembourg", "lu", "352"],
            ["Macau", "mo", "853"],
            ["Madagascar", "mg", "261"],
            ["Malawi", "mw", "265"],
            ["Malaysia", "my", "60"],
            ["Maldives", "mv", "960"],
            ["Mali", "ml", "223"],
            ["Malta", "mt", "356"],
            ["Marshall Islands", "mh", "692"],
            ["Martinique", "mq", "596"],
            ["Mauritania", "mr", "222"],
            ["Mauritius", "mu", "230"],
            ["Mayotte", "yt", "262", 1, ["269", "639"]],
            ["Mexico", "mx", "52"],
            ["Micronesia", "fm", "691"],
            ["Moldova", "md", "373"],
            ["Monaco", "mc", "377"],
            ["Mongolia", "mn", "976"],
            ["Montenegro", "me", "382"],
            ["Montserrat", "ms", "1", 16, ["664"]],
            ["Morocco", "ma", "212", 0],
            ["Mozambique", "mz", "258"],
            ["Myanmar (Burma)", "mm", "95"],
            ["Namibia", "na", "264"],
            ["Nauru", "nr", "674"],
            ["Nepal", "np", "977"],
            ["Netherlands", "nl", "31"],
            ["New Caledonia", "nc", "687"],
            ["New Zealand", "nz", "64"],
            ["Nicaragua", "ni", "505"],
            ["Niger", "ne", "227"],
            ["Nigeria", "ng", "234"],
            ["Niue", "nu", "683"],
            ["Norfolk Island", "nf", "672"],
            ["North Korea", "kp", "850"],
            ["North Macedonia", "mk", "389"],
            ["Northern Mariana Islands", "mp", "1", 17, ["670"]],
            ["Norway", "no", "47", 0],
            ["Oman", "om", "968"],
            ["Pakistan", "pk", "92"],
            ["Palau", "pw", "680"],
            ["Palestine", "ps", "970"],
            ["Panama", "pa", "507"],
            ["Papua New Guinea", "pg", "675"],
            ["Paraguay", "py", "595"],
            ["Peru", "pe", "51"],
            ["Philippines", "ph", "63"],
            ["Poland", "pl", "48"],
            ["Portugal", "pt", "351"],
            ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
            ["Qatar", "qa", "974"],
            ["Réunion", "re", "262", 0],
            ["Romania", "ro", "40"],
            ["Russia", "ru", "7", 0],
            ["Rwanda", "rw", "250"],
            ["Samoa", "ws", "685"],
            ["San Marino", "sm", "378"],
            ["São Tomé & Príncipe", "st", "239"],
            ["Saudi Arabia", "sa", "966"],
            ["Senegal", "sn", "221"],
            ["Serbia", "rs", "381"],
            ["Seychelles", "sc", "248"],
            ["Sierra Leone", "sl", "232"],
            ["Singapore", "sg", "65"],
            ["Sint Maarten", "sx", "1", 21, ["721"]],
            ["Slovakia", "sk", "421"],
            ["Slovenia", "si", "386"],
            ["Solomon Islands", "sb", "677"],
            ["Somalia", "so", "252"],
            ["South Africa", "za", "27"],
            ["South Korea", "kr", "82"],
            ["South Sudan", "ss", "211"],
            ["Spain", "es", "34"],
            ["Sri Lanka", "lk", "94"],
            ["St Barthélemy", "bl", "590", 1],
            ["St Helena", "sh", "290"],
            ["St Kitts & Nevis", "kn", "1", 18, ["869"]],
            ["St Lucia", "lc", "1", 19, ["758"]],
            ["St Martin", "mf", "590", 2],
            ["St Pierre & Miquelon", "pm", "508"],
            ["St Vincent & Grenadines", "vc", "1", 20, ["784"]],
            ["Sudan", "sd", "249"],
            ["Suriname", "sr", "597"],
            ["Svalbard & Jan Mayen", "sj", "47", 1, ["79"]],
            ["Sweden", "se", "46"],
            ["Switzerland", "ch", "41"],
            ["Syria", "sy", "963"],
            ["Taiwan", "tw", "886"],
            ["Tajikistan", "tj", "992"],
            ["Tanzania", "tz", "255"],
            ["Thailand", "th", "66"],
            ["Timor-Leste", "tl", "670"],
            ["Togo", "tg", "228"],
            ["Tokelau", "tk", "690"],
            ["Tonga", "to", "676"],
            ["Trinidad & Tobago", "tt", "1", 22, ["868"]],
            ["Tunisia", "tn", "216"],
            ["Turkey", "tr", "90"],
            ["Turkmenistan", "tm", "993"],
            ["Turks & Caicos Islands", "tc", "1", 23, ["649"]],
            ["Tuvalu", "tv", "688"],
            ["Uganda", "ug", "256"],
            ["Ukraine", "ua", "380"],
            ["United Arab Emirates", "ae", "971"],
            ["United Kingdom", "gb", "44", 0],
            ["United States", "us", "1", 0],
            ["Uruguay", "uy", "598"],
            ["US Virgin Islands", "vi", "1", 24, ["340"]],
            ["Uzbekistan", "uz", "998"],
            ["Vanuatu", "vu", "678"],
            ["Vatican City", "va", "39", 1, ["06698"]],
            ["Venezuela", "ve", "58"],
            ["Vietnam", "vn", "84"],
            ["Wallis & Futuna", "wf", "681"],
            ["Western Sahara", "eh", "212", 1, ["5288", "5289"]],
            ["Yemen", "ye", "967"],
            ["Zambia", "zm", "260"],
            ["Zimbabwe", "zw", "263"],
            ["Åland Islands", "ax", "358", 1, ["18"]]
        ], q = 0; q < p.length; q++) {
        var r = p[q];
        p[q] = {
            name: r[0],
            iso2: r[1],
            dialCode: r[2],
            priority: r[3] || 0,
            areaCodes: r[4] || null,
            nodeById: {}
        }
    }
    var s = {
        getInstance: function(a) {
            var b = a.getAttribute("data-intl-tel-input-id");
            return window.intlTelInputGlobals.instances[b]
        },
        instances: {},
        documentReady: function() {
            return "complete" === document.readyState
        }
    };
    "object" == typeof window && (window.intlTelInputGlobals = s);
    var t = 0,
        u = {
            allowDropdown: !0,
            autoInsertDialCode: !1,
            autoPlaceholder: "polite",
            countrySearch: !0,
            containerClass: "",
            customPlaceholder: null,
            defaultToFirstCountry: !0,
            dropdownContainer: null,
            excludeCountries: [],
            fixDropdownWidth: !0,
            formatAsYouType: !0,
            formatOnDisplay: !0,
            geoIpLookup: null,
            hiddenInput: null,
            i18n: {},
            initialCountry: "",
            nationalMode: !0,
            onlyCountries: [],
            placeholderNumberType: "MOBILE",
            preferredCountries: [],
            showFlags: !0,
            showSelectedDialCode: !1,
            useFullscreenPopup: "undefined" != typeof navigator && "undefined" != typeof window && (/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 500),
            utilsScript: ""
        },
        v = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"],
        w = function(a) {
            var b = window.intlTelInputGlobals.instances;
            Object.values(b).forEach(function(b) {
                return b[a]()
            })
        },
        x = function() {
            function a(c) {
                var d = arguments.length > 1 && arguments[1] !== b ? arguments[1] : {};
                k(this, a), this.id = t++, this.a = c, this.b = null, this.c = null, this.d = Object.assign({}, u, d), this.e = Boolean(c.getAttribute("placeholder"))
            }
            return m(a, [{
                key: "_init",
                value: function() {
                    var a = this;
                    this.d.useFullscreenPopup && (this.d.fixDropdownWidth = !1), this.d.countrySearch && !this.d.useFullscreenPopup && (this.d.fixDropdownWidth = !0), this.d.nationalMode && (this.d.autoInsertDialCode = !1), this.d.showSelectedDialCode && (this.d.autoInsertDialCode = !1);
                    var b = this.d.allowDropdown && !this.d.showSelectedDialCode;
                    if (!this.d.showFlags && b && (this.d.showFlags = !0), this.d.useFullscreenPopup && !this.d.dropdownContainer && (this.d.dropdownContainer = document.body), this.isRTL = !!this.a.closest("[dir=rtl]"), "undefined" != typeof Promise) {
                        var c = new Promise(function(b, c) {
                                a.h = b, a.i = c
                            }),
                            d = new Promise(function(b, c) {
                                a.i0 = b, a.i1 = c
                            });
                        this.promise = Promise.all([c, d])
                    } else this.h = this.i = function() {}, this.i0 = this.i1 = function() {};
                    this.s = {}, this._b(), this._f(), this._h(), this._i(), this._i3()
                }
            }, {
                key: "_b",
                value: function() {
                    this._d(), this._d2(), this._e(), this._d0(), (this.d.onlyCountries.length || this.d.i18n) && this.p.sort(this._d1)
                }
            }, {
                key: "_c",
                value: function(a, c, d) {
                    c.length > this.dialCodeMaxLen && (this.dialCodeMaxLen = c.length), this.q.hasOwnProperty(c) || (this.q[c] = []);
                    for (var e = 0; e < this.q[c].length; e++)
                        if (this.q[c][e] === a) return;
                    var f = d !== b ? d : this.q[c].length;
                    this.q[c][f] = a
                }
            }, {
                key: "_d",
                value: function() {
                    if (this.d.onlyCountries.length) {
                        var a = this.d.onlyCountries.map(function(a) {
                            return a.toLowerCase()
                        });
                        this.p = p.filter(function(b) {
                            return a.indexOf(b.iso2) > -1
                        })
                    } else if (this.d.excludeCountries.length) {
                        var b = this.d.excludeCountries.map(function(a) {
                            return a.toLowerCase()
                        });
                        this.p = p.filter(function(a) {
                            return -1 === b.indexOf(a.iso2)
                        })
                    } else this.p = p
                }
            }, {
                key: "_d0",
                value: function() {
                    for (var a = 0; a < this.p.length; a++) {
                        var b = this.p[a].iso2.toLowerCase();
                        this.d.i18n.hasOwnProperty(b) && (this.p[a].name = this.d.i18n[b])
                    }
                }
            }, {
                key: "_d1",
                value: function(a, b) {
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                }
            }, {
                key: "_d2",
                value: function() {
                    this.dialCodes = {}, this.dialCodeMaxLen = 0, this.q = {};
                    for (var a = 0; a < this.p.length; a++) {
                        var b = this.p[a];
                        this.dialCodes[b.dialCode] || (this.dialCodes[b.dialCode] = !0), this._c(b.iso2, b.dialCode, b.priority)
                    }
                    for (var c = 0; c < this.p.length; c++) {
                        var d = this.p[c];
                        if (d.areaCodes)
                            for (var e = this.q[d.dialCode][0], f = 0; f < d.areaCodes.length; f++) {
                                for (var g = d.areaCodes[f], h = 1; h < g.length; h++) {
                                    var i = d.dialCode + g.substr(0, h);
                                    this._c(e, i), this._c(d.iso2, i)
                                }
                                this._c(d.iso2, d.dialCode + g)
                            }
                    }
                }
            }, {
                key: "_e",
                value: function() {
                    this.preferredCountries = [];
                    for (var a = 0; a < this.d.preferredCountries.length; a++) {
                        var b = this.d.preferredCountries[a].toLowerCase(),
                            c = this._y(b, !0);
                        c && this.preferredCountries.push(c)
                    }
                }
            }, {
                key: "_e2",
                value: function(a, b, c) {
                    var d = document.createElement(a);
                    return b && Object.entries(b).forEach(function(a) {
                        var b = e(a, 2),
                            c = b[0],
                            f = b[1];
                        return d.setAttribute(c, f)
                    }), c && c.appendChild(d), d
                }
            }, {
                key: "_f",
                value: function() {
                    this.a.classList.add("iti__tel-input"), this.a.hasAttribute("autocomplete") || this.a.form && this.a.form.hasAttribute("autocomplete") || this.a.setAttribute("autocomplete", "off");
                    var a = this.d,
                        b = a.allowDropdown,
                        d = a.showSelectedDialCode,
                        e = a.showFlags,
                        f = a.containerClass,
                        g = a.hiddenInput,
                        h = a.dropdownContainer,
                        i = a.fixDropdownWidth,
                        j = a.useFullscreenPopup,
                        k = a.countrySearch,
                        l = "iti";
                    b && (l += " iti--allow-dropdown"), d && (l += " iti--show-selected-dial-code"), e && (l += " iti--show-flags"), f && (l += " ".concat(f)), j || (l += " iti--inline-dropdown");
                    var m = this._e2("div", {
                        "class": l
                    });
                    this.a.parentNode.insertBefore(m, this.a);
                    var n = b || e || d;
                    if (n && (this.k = this._e2("div", {
                            "class": "iti__flag-container"
                        }, m)), m.appendChild(this.a), n && (this.selectedFlag = this._e2("div", c({
                            "class": "iti__selected-flag"
                        }, b && {
                            role: "combobox",
                            "aria-haspopup": "listbox",
                            "aria-controls": "iti-".concat(this.id, "__country-listbox"),
                            "aria-expanded": "false",
                            "aria-label": this.d.i18n.selectedCountryAriaLabel || "Selected country"
                        }), this.k)), e && (this.l = this._e2("div", {
                            "class": "iti__flag"
                        }, this.selectedFlag)), this.selectedFlag && this.a.disabled && this.selectedFlag.setAttribute("aria-disabled", "true"), d && (this.t = this._e2("div", {
                            "class": "iti__selected-dial-code"
                        }, this.selectedFlag)), b) {
                        this.a.disabled || this.selectedFlag.setAttribute("tabindex", "0"), this.u = this._e2("div", {
                            "class": "iti__arrow"
                        }, this.selectedFlag);
                        var o = i ? "" : "iti--flexible-dropdown-width";
                        if (this.dropdownContent = this._e2("div", {
                                "class": "iti__dropdown-content iti__hide ".concat(o)
                            }), k && (this.searchInput = this._e2("input", {
                                type: "text",
                                "class": "iti__search-input",
                                placeholder: this.d.i18n.searchPlaceholder || "Search"
                            }, this.dropdownContent)), this.countryList = this._e2("ul", {
                                "class": "iti__country-list",
                                id: "iti-".concat(this.id, "__country-listbox"),
                                role: "listbox",
                                "aria-label": this.d.i18n.countryListAriaLabel || "List of countries"
                            }, this.dropdownContent), this.preferredCountries.length && !k && (this._g(this.preferredCountries, "iti__preferred", !0), this._e2("li", {
                                "class": "iti__divider",
                                "aria-hidden": "true"
                            }, this.countryList)), this._g(this.p, "iti__standard"), h) {
                            var p = "iti iti--container";
                            p += j ? " iti--fullscreen-popup" : " iti--inline-dropdown", k && (p += " iti--country-search"), this.dropdown = this._e2("div", {
                                "class": p
                            }), this.dropdown.appendChild(this.dropdownContent)
                        } else this.k.appendChild(this.dropdownContent)
                    }
                    if (g) {
                        var q, r, s = this.a.getAttribute("name"),
                            t = g(s),
                            u = null !== t && "object" == typeof t;
                        if (u ? (q = t.phone || s, r = t.country || "".concat(q, "_country")) : (q = t || s, r = "".concat(q, "_country")), !q) return;
                        this.hiddenInput = this._e2("input", {
                            type: "hidden",
                            name: q
                        }), this.hiddenInputCountry = this._e2("input", {
                            type: "hidden",
                            name: r
                        }), m.appendChild(this.hiddenInput), m.appendChild(this.hiddenInputCountry)
                    }
                }
            }, {
                key: "_g",
                value: function(a, b, c) {
                    for (var d = 0; d < a.length; d++) {
                        var e = a[d],
                            f = c ? "-preferred" : "",
                            g = this._e2("li", {
                                id: "iti-".concat(this.id, "__item-").concat(e.iso2).concat(f),
                                "class": "iti__country ".concat(b),
                                tabindex: "-1",
                                role: "option",
                                "data-dial-code": e.dialCode,
                                "data-country-code": e.iso2,
                                "aria-selected": "false"
                            }, this.countryList);
                        e.nodeById[this.id] = g;
                        var h = "";
                        this.d.showFlags && (h += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(e.iso2, "'></div></div>")), h += "<span class='iti__country-name'>".concat(e.name, "</span>"), h += "<span class='iti__dial-code'>+".concat(e.dialCode, "</span>"), g.insertAdjacentHTML("beforeend", h)
                    }
                }
            }, {
                key: "_h",
                value: function() {
                    var a = arguments.length > 0 && arguments[0] !== b && arguments[0],
                        c = this.a.getAttribute("value"),
                        d = this.a.value,
                        e = c && "+" === c.charAt(0) && (!d || "+" !== d.charAt(0)),
                        f = e ? c : d,
                        g = this._5(f),
                        h = this._w(f),
                        i = this.d,
                        j = i.initialCountry,
                        k = i.autoInsertDialCode,
                        l = i.defaultToFirstCountry;
                    if (g && !h) this._v(f);
                    else if ("auto" !== j || a) {
                        var m = j ? j.toLowerCase() : "",
                            n = m && this._y(m, !0);
                        n ? this._z(m) : g && h ? this._z("us") : l && !f ? (this.j = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.p[0].iso2, this._z(this.j)) : this._z(), !f && k && (this.a.value = "+".concat(this.s.dialCode))
                    }
                    f && this._u(f)
                }
            }, {
                key: "_i",
                value: function() {
                    this._j(), this.d.autoInsertDialCode && this._l(), this.d.allowDropdown && this._i2(), this.hiddenInput && this._i0()
                }
            }, {
                key: "_i0",
                value: function() {
                    var a = this;
                    this._a14 = function() {
                        a.hiddenInput.value = a.getNumber(), a.hiddenInputCountry.value = a.getSelectedCountryData().iso2
                    }, this.a.form && this.a.form.addEventListener("submit", this._a14)
                }
            }, {
                key: "_i2",
                value: function() {
                    var a = this;
                    this._a9 = function(b) {
                        a.dropdownContent.classList.contains("iti__hide") ? a.a.focus() : b.preventDefault()
                    };
                    var b = this.a.closest("label");
                    b && b.addEventListener("click", this._a9), this._a10 = function() {
                        !a.dropdownContent.classList.contains("iti__hide") || a.a.disabled || a.a.readOnly || a._n()
                    }, this.selectedFlag.addEventListener("click", this._a10), this._a11 = function(b) {
                        a.dropdownContent.classList.contains("iti__hide") && ["ArrowUp", "ArrowDown", " ", "Enter"].includes(b.key) && (b.preventDefault(), b.stopPropagation(), a._n()), "Tab" === b.key && a._2()
                    }, this.k.addEventListener("keydown", this._a11)
                }
            }, {
                key: "_i3",
                value: function() {
                    var a = this;
                    this.d.utilsScript && !window.intlTelInputUtils ? window.intlTelInputGlobals.documentReady() ? window.intlTelInputGlobals.loadUtils(this.d.utilsScript) : window.addEventListener("load", function() {
                        window.intlTelInputGlobals.loadUtils(a.d.utilsScript)
                    }) : this.i0(), "auto" !== this.d.initialCountry || this.s.iso2 ? this.h() : this._i4()
                }
            }, {
                key: "_i4",
                value: function() {
                    var a = this;
                    window.intlTelInputGlobals.autoCountry ? this.handleAutoCountry() : window.intlTelInputGlobals.startedLoadingAutoCountry || (window.intlTelInputGlobals.startedLoadingAutoCountry = !0, "function" == typeof this.d.geoIpLookup && this.d.geoIpLookup(function() {
                        var c = arguments.length > 0 && arguments[0] !== b ? arguments[0] : "",
                            d = c.toLowerCase();
                        d && a._y(d, !0) ? (window.intlTelInputGlobals.autoCountry = d, setTimeout(function() {
                            return w("handleAutoCountry")
                        })) : (a._h(!0), w("rejectAutoCountryPromise"))
                    }, function() {
                        return w("rejectAutoCountryPromise")
                    }))
                }
            }, {
                key: "_j",
                value: function() {
                    var a = this,
                        b = !1;
                    this._a12 = function(c) {
                        if (a._v(a.a.value) && a._m2CountryChange(), c && c.data && /[^+0-9]/.test(c.data) ? b = !0 : /[^+0-9]/.test(a.a.value) || (b = !1), a.d.formatAsYouType && !b) {
                            var d = a.a.selectionStart,
                                e = a.a.value.substring(0, d),
                                f = e.replace(/[^+0-9]/g, "").length,
                                g = c && "deleteContentForward" === c.inputType,
                                h = a._formatNumberAsYouType(),
                                i = a._translateCursorPosition(f, h, d, g);
                            a.a.value = h, a.a.setSelectionRange(i, i)
                        }
                    }, this.a.addEventListener("input", this._a12), this._a13 = function() {
                        setTimeout(a._a12)
                    }, this.a.addEventListener("cut", this._a13), this.a.addEventListener("paste", this._a13)
                }
            }, {
                key: "_translateCursorPosition",
                value: function(a, b, c, d) {
                    if (0 === c && !d) return 0;
                    for (var e = 0, f = 0; f < b.length; f++) {
                        if (/[+0-9]/.test(b[f]) && e++, e === a && !d) return f + 1;
                        if (d && e === a + 1) return f
                    }
                    return b.length
                }
            }, {
                key: "_j2",
                value: function(a) {
                    var b = this.a.getAttribute("maxlength");
                    return b && a.length > b ? a.substr(0, b) : a
                }
            }, {
                key: "_l",
                value: function() {
                    var a = this;
                    this._a8 = function() {
                        a._l2()
                    }, this.a.form && this.a.form.addEventListener("submit", this._a8), this.a.addEventListener("blur", this._a8)
                }
            }, {
                key: "_l2",
                value: function() {
                    if ("+" === this.a.value.charAt(0)) {
                        var a = this._m(this.a.value);
                        a && this.s.dialCode !== a || (this.a.value = "")
                    }
                }
            }, {
                key: "_m",
                value: function(a) {
                    return a.replace(/\D/g, "")
                }
            }, {
                key: "_m2",
                value: function(a) {
                    var b = new Event(a, {
                        bubbles: !0,
                        cancelable: !0
                    });
                    this.a.dispatchEvent(b)
                }
            }, {
                key: "_n",
                value: function() {
                    if (this.d.fixDropdownWidth && (this.dropdownContent.style.width = "".concat(this.a.offsetWidth, "px")), this.dropdownContent.classList.remove("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "true"), this._o(), this.d.countrySearch) {
                        var a = this.countryList.firstElementChild;
                        a && this._x(a, !1), this.searchInput.focus()
                    } else this.b && (this._x(this.b, !1), this._3(this.b, !0));
                    this._p(), this.u.classList.add("iti__arrow--up"), this._m2("open:countrydropdown")
                }
            }, {
                key: "_n2",
                value: function(a, b, c) {
                    c && !a.classList.contains(b) ? a.classList.add(b) : !c && a.classList.contains(b) && a.classList.remove(b)
                }
            }, {
                key: "_o",
                value: function() {
                    var a = this;
                    if (this.d.dropdownContainer && this.d.dropdownContainer.appendChild(this.dropdown), !this.d.useFullscreenPopup) {
                        var b = this.a.getBoundingClientRect(),
                            c = document.documentElement.scrollTop,
                            d = b.top + c,
                            e = this.dropdownContent.offsetHeight,
                            f = d + this.a.offsetHeight + e < c + window.innerHeight,
                            g = d - e > c,
                            h = !this.d.countrySearch && !f && g;
                        if (this._n2(this.dropdownContent, "iti__dropdown-content--dropup", h), this.d.dropdownContainer) {
                            var i = h ? 0 : this.a.offsetHeight;
                            this.dropdown.style.top = "".concat(d + i, "px"), this.dropdown.style.left = "".concat(b.left + document.body.scrollLeft, "px"), this._a4 = function() {
                                return a._2()
                            }, window.addEventListener("scroll", this._a4)
                        }
                    }
                }
            }, {
                key: "_p",
                value: function() {
                    var a = this;
                    this._a0 = function(b) {
                        var c = b.target.closest(".iti__country");
                        c && a._x(c, !1)
                    }, this.countryList.addEventListener("mouseover", this._a0), this._a1 = function(b) {
                        var c = b.target.closest(".iti__country");
                        c && a._1(c)
                    }, this.countryList.addEventListener("click", this._a1);
                    var b = !0;
                    this._a2 = function() {
                        b || a._2(), b = !1
                    }, document.documentElement.addEventListener("click", this._a2);
                    var c = "",
                        d = null;
                    if (this._a3 = function(b) {
                            ["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(b.key) && (b.preventDefault(), b.stopPropagation(), "ArrowUp" === b.key || "ArrowDown" === b.key ? a._q(b.key) : "Enter" === b.key ? a._r() : "Escape" === b.key && a._2()), !a.d.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(b.key) && (b.stopPropagation(), d && clearTimeout(d), c += b.key.toLowerCase(), a._s(c), d = setTimeout(function() {
                                c = ""
                            }, 1e3))
                        }, document.addEventListener("keydown", this._a3), this.d.countrySearch) {
                        var e = function() {
                                var b = a.searchInput.value.trim();
                                b ? a._filterCountries(b) : a._filterCountries("", !0)
                            },
                            f = null;
                        this._handleSearchChange = function() {
                            f && clearTimeout(f), f = setTimeout(function() {
                                e(), f = null
                            }, 100)
                        }, this.searchInput.addEventListener("input", this._handleSearchChange), this.searchInput.addEventListener("click", function(a) {
                            return a.stopPropagation()
                        })
                    }
                }
            }, {
                key: "_normaliseString",
                value: function() {
                    return (arguments.length > 0 && arguments[0] !== b ? arguments[0] : "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                }
            }, {
                key: "_filterCountries",
                value: function(a) {
                    var c = arguments.length > 1 && arguments[1] !== b && arguments[1],
                        d = !0;
                    this.countryList.innerHTML = "";
                    for (var e = this._normaliseString(a), f = 0; f < this.p.length; f++) {
                        var g = this.p[f],
                            h = this._normaliseString(g.name),
                            i = "+".concat(g.dialCode);
                        (c || h.includes(e) || i.includes(e) || g.iso2.includes(e)) && (this.countryList.appendChild(g.nodeById[this.id]), d && (this._x(g.nodeById[this.id], !1), d = !1))
                    }
                }
            }, {
                key: "_q",
                value: function(a) {
                    var b = "ArrowUp" === a ? this.c.previousElementSibling : this.c.nextElementSibling;
                    if (b ? b.classList.contains("iti__divider") && (b = "ArrowUp" === a ? b.previousElementSibling : b.nextElementSibling) : this.countryList.childElementCount > 1 && (b = "ArrowUp" === a ? this.countryList.lastElementChild : this.countryList.firstElementChild), b) {
                        var c = !this.d.countrySearch;
                        this._x(b, c), this.d.countrySearch && this._3(b, !1)
                    }
                }
            }, {
                key: "_r",
                value: function() {
                    this.c && this._1(this.c)
                }
            }, {
                key: "_s",
                value: function(a) {
                    for (var b = 0; b < this.p.length; b++)
                        if (this._t(this.p[b].name, a)) {
                            var c = this.p[b].nodeById[this.id];
                            this._x(c, !1), this._3(c, !0);
                            break
                        }
                }
            }, {
                key: "_t",
                value: function(a, b) {
                    return a.substr(0, b.length).toLowerCase() === b
                }
            }, {
                key: "_u",
                value: function(a) {
                    var b = a;
                    if (this.d.formatOnDisplay && window.intlTelInputUtils && this.s) {
                        var c = this.d.nationalMode || "+" !== b.charAt(0) && !this.d.showSelectedDialCode,
                            d = intlTelInputUtils.numberFormat,
                            e = d.NATIONAL,
                            f = d.INTERNATIONAL,
                            g = c ? e : f;
                        b = intlTelInputUtils.formatNumber(b, this.s.iso2, g)
                    }
                    b = this._7(b), this.a.value = b
                }
            }, {
                key: "_v",
                value: function(a) {
                    var b = a.indexOf("+"),
                        c = b ? a.substring(b) : a,
                        d = this.s.dialCode,
                        e = "1" === d;
                    c && e && "+" !== c.charAt(0) && ("1" !== c.charAt(0) && (c = "1".concat(c)), c = "+".concat(c)), this.d.showSelectedDialCode && d && "+" !== c.charAt(0) && (c = "+".concat(d).concat(c));
                    var f = this._5(c, !0),
                        g = this._m(c),
                        h = null;
                    if (f) {
                        var i = this.q[this._m(f)],
                            j = -1 !== i.indexOf(this.s.iso2) && g.length <= f.length - 1;
                        if (!("1" === d && this._w(g)) && !j)
                            for (var k = 0; k < i.length; k++)
                                if (i[k]) {
                                    h = i[k];
                                    break
                                }
                    } else "+" === c.charAt(0) && g.length ? h = "" : c && "+" !== c || this.s.iso2 || (h = this.j);
                    return null !== h && this._z(h)
                }
            }, {
                key: "_w",
                value: function(a) {
                    var b = this._m(a);
                    if ("1" === b.charAt(0)) {
                        var c = b.substr(1, 3);
                        return -1 !== v.indexOf(c)
                    }
                    return !1
                }
            }, {
                key: "_x",
                value: function(a, b) {
                    var c = this.c;
                    c && c.classList.remove("iti__highlight"), this.c = a, this.c.classList.add("iti__highlight"), this.selectedFlag.setAttribute("aria-activedescendant", a.getAttribute("id")), b && this.c.focus()
                }
            }, {
                key: "_y",
                value: function(a, b) {
                    for (var c = 0; c < this.p.length; c++)
                        if (this.p[c].iso2 === a) return this.p[c];
                    if (b) return null;
                    throw new Error("No country data for '".concat(a, "'"))
                }
            }, {
                key: "_z",
                value: function(a) {
                    var b = this.d,
                        c = b.allowDropdown,
                        d = b.showSelectedDialCode,
                        e = b.showFlags,
                        f = b.countrySearch,
                        g = this.s.iso2 ? this.s : {};
                    if (this.s = a ? this._y(a, !1) : {}, this.s.iso2 && (this.j = this.s.iso2), e) {
                        var h = a ? "iti__".concat(a) : "iti__globe";
                        this.l.setAttribute("class", "iti__flag ".concat(h))
                    }
                    if (this._setSelectedCountryFlagTitleAttribute(a, d), d) {
                        var i = this.s.dialCode ? "+".concat(this.s.dialCode) : "";
                        this.t.innerHTML = i;
                        var j = this.selectedFlag.offsetWidth || this._z2();
                        this.isRTL ? this.a.style.paddingRight = "".concat(j + 6, "px") : this.a.style.paddingLeft = "".concat(j + 6, "px")
                    }
                    if (this._0(), c && !f) {
                        var k = this.b;
                        if (k && (k.classList.remove("iti__active"), k.setAttribute("aria-selected", "false")), a) {
                            var l = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(a, "-preferred")) || this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(a));
                            l.setAttribute("aria-selected", "true"), l.classList.add("iti__active"), this.b = l
                        }
                    }
                    return g.iso2 !== a
                }
            }, {
                key: "_setSelectedCountryFlagTitleAttribute",
                value: function(a, b) {
                    if (this.selectedFlag) {
                        var c;
                        c = a && !b ? "".concat(this.s.name, ": +").concat(this.s.dialCode) : a ? this.s.name : "Unknown", this.selectedFlag.setAttribute("title", c)
                    }
                }
            }, {
                key: "_z2",
                value: function() {
                    var a = this.a.parentNode.cloneNode();
                    a.style.visibility = "hidden", document.body.appendChild(a);
                    var b = this.k.cloneNode();
                    a.appendChild(b);
                    var c = this.selectedFlag.cloneNode(!0);
                    b.appendChild(c);
                    var d = c.offsetWidth;
                    return a.parentNode.removeChild(a), d
                }
            }, {
                key: "_0",
                value: function() {
                    var a = "aggressive" === this.d.autoPlaceholder || !this.e && "polite" === this.d.autoPlaceholder;
                    if (window.intlTelInputUtils && a) {
                        var b = intlTelInputUtils.numberType[this.d.placeholderNumberType],
                            c = this.s.iso2 ? intlTelInputUtils.getExampleNumber(this.s.iso2, this.d.nationalMode, b) : "";
                        c = this._7(c), "function" == typeof this.d.customPlaceholder && (c = this.d.customPlaceholder(c, this.s)), this.a.setAttribute("placeholder", c)
                    }
                }
            }, {
                key: "_1",
                value: function(a) {
                    var b = this._z(a.getAttribute("data-country-code"));
                    this._2(), this._4(a.getAttribute("data-dial-code")), this.a.focus(), b && this._m2CountryChange()
                }
            }, {
                key: "_2",
                value: function() {
                    this.dropdownContent.classList.add("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "false"), this.selectedFlag.removeAttribute("aria-activedescendant"), this.u.classList.remove("iti__arrow--up"), document.removeEventListener("keydown", this._a3), this.d.countrySearch && this.searchInput.removeEventListener("input", this._handleSearchChange), document.documentElement.removeEventListener("click", this._a2), this.countryList.removeEventListener("mouseover", this._a0), this.countryList.removeEventListener("click", this._a1), this.d.dropdownContainer && (this.d.useFullscreenPopup || window.removeEventListener("scroll", this._a4), this.dropdown.parentNode && this.dropdown.parentNode.removeChild(this.dropdown)), this._m2("close:countrydropdown")
                }
            }, {
                key: "_3",
                value: function(a, b) {
                    var c = this.countryList,
                        d = document.documentElement.scrollTop,
                        e = c.offsetHeight,
                        f = c.getBoundingClientRect().top + d,
                        g = f + e,
                        h = a.offsetHeight,
                        i = a.getBoundingClientRect().top + d,
                        j = i + h,
                        k = i - f + c.scrollTop,
                        l = e / 2 - h / 2;
                    if (i < f) b && (k -= l), c.scrollTop = k;
                    else if (j > g) {
                        b && (k += l);
                        var m = e - h;
                        c.scrollTop = k - m
                    }
                }
            }, {
                key: "_4",
                value: function(a) {
                    var b, c = this.a.value,
                        d = "+".concat(a);
                    if ("+" === c.charAt(0)) {
                        var e = this._5(c);
                        b = e ? c.replace(e, d) : d, this.a.value = b
                    } else this.d.autoInsertDialCode && (b = c ? d + c : d, this.a.value = b)
                }
            }, {
                key: "_5",
                value: function(a, b) {
                    var c = "";
                    if ("+" === a.charAt(0))
                        for (var d = "", e = 0; e < a.length; e++) {
                            var f = a.charAt(e);
                            if (!isNaN(parseInt(f, 10))) {
                                if (d += f, b) this.q[d] && (c = a.substr(0, e + 1));
                                else if (this.dialCodes[d]) {
                                    c = a.substr(0, e + 1);
                                    break
                                }
                                if (d.length === this.dialCodeMaxLen) break
                            }
                        }
                    return c
                }
            }, {
                key: "_6",
                value: function() {
                    var a = this.a.value.trim(),
                        b = this.s.dialCode,
                        c = this._m(a);
                    return (this.d.showSelectedDialCode && !this.d.nationalMode && "+" !== a.charAt(0) && b && c ? "+".concat(b) : "") + a
                }
            }, {
                key: "_7",
                value: function(a) {
                    var b = a;
                    if (this.d.showSelectedDialCode) {
                        var c = this._5(b);
                        if (c) {
                            c = "+".concat(this.s.dialCode);
                            var d = " " === b[c.length] || "-" === b[c.length] ? c.length + 1 : c.length;
                            b = b.substr(d)
                        }
                    }
                    return this._j2(b)
                }
            }, {
                key: "_m2CountryChange",
                value: function() {
                    this._m2("countrychange")
                }
            }, {
                key: "_formatNumberAsYouType",
                value: function() {
                    var a = this._6(),
                        b = window.intlTelInputUtils ? intlTelInputUtils.formatNumberAsYouType(a, this.s.iso2) : a,
                        c = this.s.dialCode;
                    if (this.d.showSelectedDialCode && !this.d.nationalMode && "+" !== this.a.value.charAt(0) && b.includes("+".concat(c))) {
                        return (b.split("+".concat(c))[1] || "").trim()
                    }
                    return b
                }
            }, {
                key: "handleAutoCountry",
                value: function() {
                    "auto" === this.d.initialCountry && (this.j = window.intlTelInputGlobals.autoCountry, this.a.value || this.setCountry(this.j), this.h())
                }
            }, {
                key: "handleUtils",
                value: function() {
                    window.intlTelInputUtils && (this.a.value && this._u(this.a.value), this._0()), this.i0()
                }
            }, {
                key: "destroy",
                value: function() {
                    var a = this.a.form;
                    if (this.d.allowDropdown) {
                        this._2(), this.selectedFlag.removeEventListener("click", this._a10), this.k.removeEventListener("keydown", this._a11);
                        var b = this.a.closest("label");
                        b && b.removeEventListener("click", this._a9)
                    }
                    this.hiddenInput && a && a.removeEventListener("submit", this._a14), this.d.autoInsertDialCode && (a && a.removeEventListener("submit", this._a8), this.a.removeEventListener("blur", this._a8)), this.a.removeEventListener("input", this._a12), this.a.removeEventListener("cut", this._a13), this.a.removeEventListener("paste", this._a13), this.a.removeAttribute("data-intl-tel-input-id");
                    var c = this.a.parentNode;
                    c.parentNode.insertBefore(this.a, c), c.parentNode.removeChild(c), delete window.intlTelInputGlobals.instances[this.id]
                }
            }, {
                key: "getExtension",
                value: function() {
                    return window.intlTelInputUtils ? intlTelInputUtils.getExtension(this._6(), this.s.iso2) : ""
                }
            }, {
                key: "getNumber",
                value: function(a) {
                    if (window.intlTelInputUtils) {
                        var b = this.s.iso2;
                        return intlTelInputUtils.formatNumber(this._6(), b, a)
                    }
                    return ""
                }
            }, {
                key: "getNumberType",
                value: function() {
                    return window.intlTelInputUtils ? intlTelInputUtils.getNumberType(this._6(), this.s.iso2) : -99
                }
            }, {
                key: "getSelectedCountryData",
                value: function() {
                    return this.s
                }
            }, {
                key: "getValidationError",
                value: function() {
                    if (window.intlTelInputUtils) {
                        var a = this.s.iso2;
                        return intlTelInputUtils.getValidationError(this._6(), a)
                    }
                    return -99
                }
            }, {
                key: "isValidNumber",
                value: function(a) {
                    var b = this._6();
                    return window.intlTelInputUtils ? intlTelInputUtils.isPossibleNumber(b, this.s.iso2, a) : null
                }
            }, {
                key: "isValidNumberPrecise",
                value: function() {
                    var a = this._6();
                    return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(a, this.s.iso2) : null
                }
            }, {
                key: "setCountry",
                value: function(a) {
                    var b = a.toLowerCase();
                    this.s.iso2 !== b && (this._z(b), this._4(this.s.dialCode), this._m2CountryChange())
                }
            }, {
                key: "setNumber",
                value: function(a) {
                    var b = this._v(a);
                    this._u(a), b && this._m2CountryChange()
                }
            }, {
                key: "setPlaceholderNumberType",
                value: function(a) {
                    this.d.placeholderNumberType = a, this._0()
                }
            }]), a
        }();
    s.getCountryData = function() {
        return p
    };
    var y = function(a, b, c) {
        var d = document.createElement("script");
        d.onload = function() {
            w("handleUtils"), b && b()
        }, d.onerror = function() {
            w("rejectUtilsScriptPromise"), c && c()
        }, d.className = "iti-load-utils", d.async = !0, d.src = a, document.body.appendChild(d)
    };
    s.loadUtils = function(a) {
        if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
            if (window.intlTelInputGlobals.startedLoadingUtilsScript = !0, "undefined" != typeof Promise) return new Promise(function(b, c) {
                return y(a, b, c)
            });
            y(a)
        }
        return null
    }, s.defaults = u, s.version = "19.5.6";
    a.fn.intlTelInput = function(c) {
        var d = arguments;
        if (c === b || "object" == typeof c) return this.each(function() {
            if (!a.data(this, "plugin_intlTelInput")) {
                var b = new x(this, c);
                b._init(), window.intlTelInputGlobals.instances[b.id] = b, a.data(this, "plugin_intlTelInput", b)
            }
        });
        if ("string" == typeof c && "_" !== c[0]) {
            var e;
            return this.each(function() {
                var b = a.data(this, "plugin_intlTelInput");
                b instanceof x && "function" == typeof b[c] && (e = b[c].apply(b, Array.prototype.slice.call(d, 1))), "destroy" === c && a.data(this, "plugin_intlTelInput", null)
            }), e !== b ? e : this
        }
    }
});