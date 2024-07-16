"use strict";
! function(c) {
    var r = c(window);

    function l(a, i, o) {
        var s;
        return function() {
            var e = this,
                t = arguments,
                n = o && !s;
            clearTimeout(s), s = setTimeout(function() {
                s = null, o || a.apply(e, t)
            }, i), n && a.apply(e, t)
        }
    }

    function d(e, t) {
        var e = e.find(".hajs-filter"),
            n = e.data("default-filter");
        e.length && (e.on("click.onFilterNav", "button", function(e) {
            e.stopPropagation();
            e = c(this);
            e.addClass("ha-filter__item--active").siblings().removeClass("ha-filter__item--active"), t(e.data("filter"))
        }), e.find('[data-filter="' + n + '"]').click())
    }

    function h(e) {
        var t, n, a;
        e.$element.on("click", e.selector, function(e) {
            e.preventDefault()
        }), c.fn.magnificPopup && (e.isEnabled ? (t = c(window).width(), n = elementorFrontendConfig.breakpoints.md, a = elementorFrontendConfig.breakpoints.lg, e.$element.find(e.selector).magnificPopup({
            key: e.key,
            type: "image",
            image: {
                titleSrc: function(e) {
                    return e.el.attr("title") ? e.el.attr("title") : e.el.find("img").attr("alt")
                }
            },
            gallery: {
                enabled: !0,
                preload: [1, 2]
            },
            zoom: {
                enabled: !0,
                duration: 300,
                easing: "ease-in-out",
                opener: function(e) {
                    return e.is("img") ? e : e.find("img")
                }
            },
            disableOn: function() {
                return !(e.disableOnMobile && t < n || e.disableOnTablet && n <= t && t < a)
            }
        })) : c.magnificPopup.close())
    }
    c.fn.getHappySettings = function() {
        return this.data("happy-settings")
    };

    function u(e) {
        var t = e.find(".hajs-image-comparison"),
            n = t.getHappySettings();
        n[{
            on_hover: "move_slider_on_hover",
            on_swipe: "move_with_handle_only",
            on_click: "click_to_move"
        }[n.move_handle || "on_swipe"]] = !0, delete n.move_handle, t.imagesLoaded().done(function() {
            t.twentytwenty(n);
            var e = setTimeout(function() {
                r.trigger("resize.twentytwenty"), clearTimeout(e)
            }, 400)
        })
    }
    r.on("elementor/frontend/init", function() {
        function e(e) {
            e.hasClass("elementor-element-edit-mode") && e.addClass("ha-has-bg-overlay")
        }
        var t = elementorModules.frontend.handlers.Base,
            n = t.extend({
                bindEvents: function() {
                    this.removeArrows(), this.run()
                },
                removeArrows: function() {
                    var e = this;
                    this.elements.$container.on("init", function() {
                        e.elements.$container.siblings().hide()
                    })
                },
                getDefaultSettings: function() {
                    return {
                        autoplay: !0,
                        arrows: !1,
                        checkVisible: !1,
                        container: ".hajs-slick",
                        dots: !1,
                        infinite: !0,
                        rows: 0,
                        slidesToShow: 1,
                        prevArrow: c("<div />").append(this.findElement(".slick-prev").clone().show()).html(),
                        nextArrow: c("<div />").append(this.findElement(".slick-next").clone().show()).html()
                    }
                },
                getDefaultElements: function() {
                    return {
                        $container: this.findElement(this.getSettings("container"))
                    }
                },
                onElementChange: l(function() {
                    this.elements.$container.slick("unslick"), this.run()
                }, 200),
                getSlickSettings: function() {
                    var e = 1 == c('html[dir="rtl"]').length || c("body").hasClass("rtl"),
                        t = ("yes" == this.getElementSettings("vertical") && (e = !1), {
                            infinite: !!this.getElementSettings("loop"),
                            autoplay: !!this.getElementSettings("autoplay"),
                            autoplaySpeed: this.getElementSettings("autoplay_speed"),
                            speed: this.getElementSettings("animation_speed"),
                            centerMode: !!this.getElementSettings("center"),
                            vertical: !!this.getElementSettings("vertical"),
                            rtl: e
                        });
                    switch (this.getElementSettings("navigation")) {
                        case "arrow":
                            t.arrows = !0;
                            break;
                        case "dots":
                            t.dots = !0;
                            break;
                        case "both":
                            t.arrows = !0, t.dots = !0
                    }
                    e = !!this.getElementSettings("slides_to_scroll");
                    return t.slidesToShow = parseInt(this.getElementSettings("slides_to_show")) || 1, t.slidesToScroll = e && parseInt(this.getElementSettings("slides_to_show")) || 1, t.responsive = [{
                        breakpoint: elementorFrontend.config.breakpoints.lg,
                        settings: {
                            slidesToShow: parseInt(this.getElementSettings("slides_to_show_tablet")) || t.slidesToShow,
                            slidesToScroll: e ? parseInt(this.getElementSettings("slides_to_show_tablet")) || t.slidesToShow : 1
                        }
                    }, {
                        breakpoint: elementorFrontend.config.breakpoints.md,
                        settings: {
                            slidesToShow: parseInt(this.getElementSettings("slides_to_show_mobile")) || parseInt(this.getElementSettings("slides_to_show_tablet")) || t.slidesToShow,
                            slidesToScroll: e ? parseInt(this.getElementSettings("slides_to_show_mobile")) || parseInt(this.getElementSettings("slides_to_show_tablet")) || t.slidesToShow : 1
                        }
                    }], c.extend({}, this.getSettings(), t)
                },
                run: function() {
                    this.elements.$container.slick(this.getSlickSettings())
                }
            }),
            a = t.extend({
                onInit: function() {
                    t.prototype.onInit.apply(this, arguments), this.run(), this.runFilter(), r.on("resize", l(this.run.bind(this), 100))
                },
                getLayoutMode: function() {
                    var e = this.getElementSettings("layout");
                    return "even" === e ? "masonry" : e
                },
                getDefaultSettings: function() {
                    return {
                        itemSelector: ".ha-image-grid__item",
                        percentPosition: !0,
                        layoutMode: this.getLayoutMode()
                    }
                },
                getDefaultElements: function() {
                    return {
                        $container: this.findElement(".hajs-isotope")
                    }
                },
                getLightBoxSettings: function() {
                    return {
                        key: "imagegrid",
                        $element: this.$element,
                        selector: ".ha-js-lightbox",
                        isEnabled: !!this.getElementSettings("enable_popup"),
                        disableOnTablet: !!this.getElementSettings("disable_lightbox_on_tablet"),
                        disableOnMobile: !!this.getElementSettings("disable_lightbox_on_mobile")
                    }
                },
                runFilter: function() {
                    var t = this,
                        n = this.getLightBoxSettings();
                    d(this.$element, function(e) {
                        t.elements.$container.isotope({
                            filter: e
                        }), "*" !== e && (n.selector = e), h(n)
                    })
                },
                onElementChange: function(e) {
                    -1 !== ["layout", "image_height", "columns", "image_margin", "enable_popup"].indexOf(e) && this.run()
                },
                run: function() {
                    var e = this;
                    e.elements.$container.isotope(e.getDefaultSettings()).imagesLoaded().progress(function() {
                        e.elements.$container.isotope("layout")
                    }), h(e.getLightBoxSettings())
                }
            }),
            i = t.extend({
                onInit: function() {
                    t.prototype.onInit.apply(this, arguments), this.run(), this.runFilter(), r.on("resize", l(this.run.bind(this), 100))
                },
                getDefaultSettings: function() {
                    var e = {
                            rowHeight: +this.getElementSettings("row_height.size") || 150,
                            lastRow: this.getElementSettings("last_row"),
                            margins: +this.getElementSettings("margins.size"),
                            captions: !!this.getElementSettings("show_caption")
                        },
                        t = {};
                    return "yes" == this.getElementSettings("max_row_height") && (t = {
                        maxRowHeight: +this.getElementSettings("row_height.size") || 150
                    }), c.extend(e, t)
                },
                getDefaultElements: function() {
                    return {
                        $container: this.findElement(".hajs-justified-grid")
                    }
                },
                getLightBoxSettings: function() {
                    return {
                        key: "justifiedgallery",
                        $element: this.$element,
                        selector: ".ha-js-lightbox",
                        isEnabled: !!this.getElementSettings("enable_popup"),
                        disableOnTablet: !!this.getElementSettings("disable_lightbox_on_tablet"),
                        disableOnMobile: !!this.getElementSettings("disable_lightbox_on_mobile")
                    }
                },
                runFilter: function() {
                    var t = this,
                        n = this.getLightBoxSettings(),
                        a = {
                            lastRow: this.getElementSettings("last_row")
                        };
                    d(t.$element, function(e) {
                        "*" !== e && (a.lastRow = "nojustify", n.selector = e), a.filter = e, t.elements.$container.justifiedGallery(a), h(n)
                    })
                },
                onElementChange: function(e) {
                    -1 !== ["row_height", "max_row_height", "last_row", "margins", "show_caption", "enable_popup"].indexOf(e) && this.run()
                },
                run: function() {
                    this.elements.$container.justifiedGallery(this.getDefaultSettings()), h(this.getLightBoxSettings())
                }
            }),
            o = t.extend({
                onInit: function() {
                    t.prototype.onInit.apply(this, arguments), this.wrapper = this.$element.find(".ha-news-ticker-wrapper"), this.run()
                },
                onElementChange: function(e) {
                    "item_space" !== e && "title_typography_font_size" !== e || this.run()
                },
                run: function() {
                    var e, t, n, a, i, o, s, r;
                    0 != this.wrapper.length && (a = this.wrapper.innerHeight(), r = this.wrapper.innerWidth(), t = (e = this.wrapper.find(".ha-news-ticker-container")).find(".ha-news-ticker-item"), a = "scroll" + (n = this.wrapper.data("scroll-direction")) + parseInt(a) + parseInt(r), i = this.wrapper.data("duration"), o = "normal", s = 10, r = {
                        transform: "translateX(0" + r + "px)"
                    }, "right" === n && (o = "reverse"), t.each(function() {
                        s += c(this).outerWidth(!0)
                    }), e.css({
                        width: s,
                        display: "flex"
                    }), c.keyframe.define([{
                        name: a,
                        "0%": r,
                        "100%": {
                            transform: "translateX(-101%)"
                        }
                    }]), e.playKeyframe({
                        name: a,
                        duration: i.toString() + "ms",
                        timingFunction: "linear",
                        delay: "0s",
                        iterationCount: "infinite",
                        direction: o,
                        fillMode: "none",
                        complete: function() {}
                    }))
                }
            }),
            s = t.extend({
                onInit: function() {
                    t.prototype.onInit.apply(this, arguments), this.wrapper = this.$element.find(".ha-post-tab"), this.run()
                },
                run: function() {
                    var s = this.wrapper.find(".ha-post-tab-filter").find("li"),
                        e = this.wrapper.data("event"),
                        r = this.wrapper.data("query-args");
                    s.on(e, l(function(e) {
                        e.preventDefault();
                        var e = c(this),
                            n = e.data("term"),
                            t = e.closest(".ha-post-tab").find(".ha-post-tab-content"),
                            a = t.find(".ha-post-tab-loading"),
                            i = t.find(".ha-post-tab-item-wrapper"),
                            o = !1;
                        0 === a.length && (s.removeClass("active"), i.removeClass("active"), e.addClass("active"), i.each(function() {
                            var e = c(this),
                                t = e.data("term");
                            n === t && (e.addClass("active"), o = !0)
                        }), !1 === o) && c.ajax({
                            url: HappyLocalize.ajax_url,
                            type: "POST",
                            data: {
                                action: "ha_post_tab_action",
                                security: HappyLocalize.nonce,
                                post_tab_query: r,
                                term_id: n
                            },
                            beforeSend: function() {
                                t.append('<span class="ha-post-tab-loading"><i class="eicon-spinner eicon-animation-spin"></i></span>')
                            },
                            success: function(e) {
                                t.find(".ha-post-tab-loading").remove(), t.append(e)
                            },
                            error: function(e) {}
                        })
                    }, 200))
                }
            }),
            a = (elementorFrontend.hooks.addAction("frontend/element_ready/ha-slider.default", function(e) {
                elementorFrontend.elementsHandler.addHandler(n, {
                    $element: e
                })
            }), elementorFrontend.hooks.addAction("frontend/element_ready/ha-carousel.default", function(e) {
                elementorFrontend.elementsHandler.addHandler(n, {
                    $element: e
                })
            }), elementorFrontend.hooks.addAction("frontend/element_ready/ha-horizontal-timeline.default", function(e) {
                elementorFrontend.elementsHandler.addHandler(n, {
                    $element: e,
                    autoplay: !1,
                    container: ".ha-horizontal-timeline-wrapper",
                    navigation: "arrow",
                    arrows: !0
                });
                e = e.find(".ha-horizontal-timeline-image");
                void 0 !== e.data("mfp-src") && e.magnificPopup({
                    type: "image",
                    gallery: {
                        enabled: !0
                    }
                })
            }), c("body").on("click.onWrapperLink", "[data-ha-element-link]", function() {
                var e, t, n = c(this),
                    a = n.data("ha-element-link"),
                    n = n.data("id"),
                    i = document.createElement("a");
                i.id = "happy-addons-wrapper-link-" + n, i.href = a.url, i.target = a.is_external ? "_blank" : "_self", i.rel = a.nofollow ? "nofollow noreferer" : "", i.style.display = "none", document.body.appendChild(i), (e = document.getElementById(i.id)).click(), t = setTimeout(function() {
                    document.body.removeChild(e), clearTimeout(t)
                })
            }), c.each({
                "ha-image-compare.default": u,
                "ha-number.default": function(t) {
                    elementorFrontend.waypoint(t, function() {
                        var e = t.find(".ha-number-text");
                        e.numerator(e.data("animation"))
                    })
                },
                "ha-skills.default": function(e) {
                    elementorFrontend.waypoint(e, function() {
                        e.find(".ha-skill-level").each(function() {
                            var e = c(this),
                                t = e.find(".ha-skill-level-text"),
                                n = e.data("level");
                            e.animate({
                                width: n + "%"
                            }, 500), t.numerator({
                                toValue: n + "%",
                                duration: 1300,
                                onStep: function() {
                                    t.append("%")
                                }
                            })
                        })
                    })
                },
                "ha-fun-factor.default": function(t) {
                    elementorFrontend.waypoint(t, function() {
                        var e = t.find(".ha-fun-factor__content-number");
                        e.numerator(e.data("animation"))
                    })
                },
                "ha-bar-chart.default": function(e) {
                    elementorFrontend.waypoint(e, function() {
                        var e = c(this),
                            t = e.find(".ha-bar-chart-container"),
                            e = e.find("#ha-bar-chart"),
                            n = t.data("settings");
                        t.length && new Chart(e, n)
                    })
                },
                "ha-twitter-feed.default": function(i) {
                    var e = i.find(".ha-twitter-load-more"),
                        o = i.find(".ha-tweet-items");
                    e.on("click", function(e) {
                        e.preventDefault();
                        var t = c(this),
                            e = t.data("settings"),
                            n = t.data("total"),
                            a = i.find(".ha-tweet-item").length;
                        c.ajax({
                            url: HappyLocalize.ajax_url,
                            type: "POST",
                            data: {
                                action: "ha_twitter_feed_action",
                                security: HappyLocalize.nonce,
                                query_settings: e,
                                loaded_item: a
                            },
                            success: function(e) {
                                a < n ? c(e).appendTo(o) : (t.text("All Loaded").addClass("loaded"), setTimeout(function() {
                                    t.css({
                                        display: "none"
                                    })
                                }, 800))
                            },
                            error: function(e) {}
                        })
                    })
                },
                "ha-threesixty-rotation.default": function(a) {
                    var e, i = a.find(".ha-threesixty-rotation-inner"),
                        t = i.data("selector"),
                        n = i.data("autoplay"),
                        o = a.find(".ha-threesixty-rotation-magnify"),
                        s = a.find(".ha-threesixty-rotation-360img"),
                        r = o.data("zoom"),
                        l = a.find(".ha-threesixty-rotation-play"),
                        d = circlr(t, {
                            play: !0
                        });
                    "on" === n ? ((e = a.find(".ha-threesixty-rotation-autoplay")).on("click", function(e) {
                        e.preventDefault(), d.play(), s.remove()
                    }), setTimeout(function() {
                        e.trigger("click"), e.remove()
                    }, 1e3)) : l.on("click", function(e) {
                        e.preventDefault();
                        e = c(this).find("i");
                        e.hasClass("hm-play-button") ? (e.removeClass("hm-play-button"), e.addClass("hm-stop"), d.play()) : (e.removeClass("hm-stop"), e.addClass("hm-play-button"), d.stop()), s.remove()
                    }), o.on("click", function(e) {
                        a.find("img").each(function() {
                            -1 !== c(this).attr("style").indexOf("block") && (HappySimplaMagnify(c(this)[0], r), o.css("display", "none"), s.remove())
                        })
                    }), c(document).on("click", function(e) {
                        var e = c(e.target),
                            t = a.find(".ha-img-magnifier-glass"),
                            n = o.find("i");
                        t.length && e[0] !== n[0] && (t.remove(), o.removeAttr("style")), e[0] === i[0] && s.remove()
                    }), i.on("mouseup mousedown touchstart touchend", function(e) {
                        s.remove()
                    })
                },
                "ha-data-table.default": function(e) {
                    var n = e.find(".ha-table__head-column-cell");
                    e.find(".ha-table__body-row").each(function(e, t) {
                        c(t).find(".ha-table__body-row-cell").each(function(e, t) {
                            c(t).prepend('<div class="ha-table__head-column-cell">' + n.eq(e).html() + "</div>")
                        })
                    })
                },
                section: e,
                column: e,
                "ha-event-calendar.default": function(_) {
                    var e = _.find(".ha-ec"),
                        x = _.find(".ha-ec-popup-wrapper"),
                        t = _.find(".ha-ec-popup-close"),
                        n = e.data("initialview"),
                        a = e.data("firstday"),
                        i = e.data("locale"),
                        k = e.data("show-popup"),
                        S = e.data("allday-text"),
                        o = window["HaECjson" + _.data("id")];
                    void 0 !== o && (new FullCalendar.Calendar(e[0], {
                        stickyHeaderDates: !1,
                        locale: i,
                        headerToolbar: {
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                        },
                        initialView: n,
                        firstDay: a,
                        eventTimeFormat: {
                            hour: "numeric",
                            minute: "2-digit",
                            meridiem: "short"
                        },
                        events: o,
                        height: "auto",
                        eventClick: function(e) {
                            if ("yes" == k) {
                                var t = function(e) {
                                        return new Date(e)
                                    },
                                    n = function(e) {
                                        var t = e.getHours(),
                                            e = e.getMinutes(),
                                            n = 12 <= t ? "pm" : "am";
                                        return (t = (t %= 12) || 12) + ":" + (e < 10 ? "0" + e : e) + n
                                    },
                                    a = (e.jsEvent.preventDefault(), e.view.calendar.currentData.currentDate.toString(), e.event.allDay),
                                    i = e.event.title,
                                    o = e.event.startStr,
                                    s = e.event.endStr,
                                    r = e.event.extendedProps.guest,
                                    l = e.event.extendedProps.location,
                                    d = e.event.extendedProps.description,
                                    c = e.event.url,
                                    h = e.event.extendedProps.image,
                                    u = x.find(".ha-ec-event-title"),
                                    m = x.find(".ha-ec-event-time-wrap"),
                                    f = x.find(".ha-ec-event-guest-wrap"),
                                    p = x.find(".ha-ec-event-location-wrap"),
                                    g = x.find(".ha-ec-popup-desc"),
                                    v = x.find(".ha-ec-popup-readmore-link"),
                                    w = x.find(".ha-ec-popup-image");
                                w.css("display", "none"), u.css("display", "none"), m.css("display", "none"), f.css("display", "none"), p.css("display", "none"), g.css("display", "none"), v.css("display", "none"), x.addClass("ha-ec-popup-ready"), h && (w.removeAttr("style"), w.find("img").attr("src", h), w.find("img").attr("alt", i)), i && (u.removeAttr("style"), u.text(i)), r && (f.removeAttr("style"), f.find("span.ha-ec-event-guest").text(r)), l && (p.removeAttr("style"), p.find("span.ha-ec-event-location").text(l)), d && (g.removeAttr("style"), g.html(d)), !0 !== a ? (m.removeAttr("style"), o = Date.parse(t(o)), s = Date.parse(t(s)), h = n(t(o)), w = "Invalid Data", o < s && (w = n(t(s))), m.find("span.ha-ec-event-time").text(h + " - " + w)) : (m.removeAttr("style"), m.find("span.ha-ec-event-time").text(S)), c && (v.removeAttr("style"), v.attr("href", c), "on" === e.event.extendedProps.external && v.attr("target", "_blank"), "on" === e.event.extendedProps.nofollow) && v.attr("rel", "nofollow")
                            } else {
                                var y, b;
                                if (e.event.url && e.event.extendedProps.external) return e.jsEvent.preventDefault(), u = _.data("id"), (i = document.createElement("a")).id = "happy-even-calender-link-" + u, i.href = e.event.url, i.target = e.event.extendedProps.external ? "_blank" : "_self", i.rel = e.event.extendedProps.nofollow ? "nofollow noreferer" : "", i.style.display = "none", document.body.appendChild(i), (y = document.getElementById(i.id)).click(), b = setTimeout(function() {
                                    document.body.removeChild(y), clearTimeout(b)
                                }), !1
                            }
                        },
                        dateClick: function(e) {
                            itemDate = e.date.toUTCString()
                        }
                    }).render(), _.find(".ha-ec-popup-wrapper").on("click", function(e) {
                        e.stopPropagation(), e.target !== e.currentTarget && e.target != t[0] && e.target != t.find(".eicon-editor-close")[0] || x.addClass("ha-ec-popup-removing").removeClass("ha-ec-popup-ready")
                    }))
                },
                "ha-mailchimp.default": function(e) {
                    var n = e.find(".ha-mailchimp-form"),
                        a = e.find(".ha-mc-response-message"),
                        i = n.data("success-message");
                    n.on("submit", function(e) {
                        e.preventDefault();
                        e = {
                            action: "ha_mailchimp_ajax",
                            security: HappyLocalize.nonce,
                            subscriber_info: n.serialize(),
                            list_id: n.data("list-id"),
                            post_id: n.parent().data("post-id"),
                            widget_id: n.parent().data("widget-id")
                        };
                        c.ajax({
                            type: "post",
                            url: HappyLocalize.ajax_url,
                            data: e,
                            success: function(e) {
                                n.trigger("reset"), e.status ? (a.removeClass("error"), a.addClass("success"), a.text(i)) : (a.addClass("error"), a.removeClass("success"), a.text(e.msg));
                                var t = setTimeout(function() {
                                    a.removeClass("error"), a.removeClass("success"), clearTimeout(t)
                                }, 5e3)
                            },
                            error: function(e) {}
                        })
                    })
                },
                "ha-image-accordion.default": function(e) {
                    var n;
                    e.hasClass("ha-image-accordion-click") && (n = e.find(".ha-ia-item")).each(function(e, t) {
                        c(this).on("click", function(e) {
                            c(this).hasClass("active") || (n.removeClass("active"), c(this).addClass("active"))
                        })
                    })
                },
                "ha-content-switcher.default": function(e) {
                    var n, a, t, i, o, s, r, l = e.find(".ha-content-switcher-wrapper");
                    "button" == l.data("design-type") ? (n = l.find(".ha-cs-button"), a = l.find(".ha-cs-content-section"), n.each(function(e, t) {
                        c(this).on("click", function(e) {
                            e.preventDefault(), c(this).hasClass("active") || (n.removeClass("active"), c(this).addClass("active"), a.removeClass("active"), e = c(this).data("content-id"), l.find("#" + e).addClass("active"))
                        })
                    })) : (e = l.find(".ha-cs-switch.ha-input-label"), t = l.find("input.ha-cs-toggle-switch"), i = l.find(".ha-cs-switch.primary"), o = l.find(".ha-cs-switch.secondary"), s = l.find(".ha-cs-content-section.primary"), r = l.find(".ha-cs-content-section.secondary"), e.on("click", function(e) {
                        (t.is(":checked") ? (i.removeClass("active"), s.removeClass("active"), o.addClass("active"), r) : (o.removeClass("active"), r.removeClass("active"), i.addClass("active"), s)).addClass("active")
                    }))
                },
                "ha-member.default": function(e) {
                    var t, n = e.find(".ha-btn"),
                        a = e.find(".ha-member-lightbox");
                    0 < a.length && (t = a.find(".ha-member-lightbox-close"), n.on("click", function() {
                        a.addClass("ha-member-lightbox-show")
                    }), a.on("click", function(e) {
                        !a.hasClass("ha-member-lightbox-show") || e.target != a[0] && e.target != t[0] && e.target != t.find("i.eicon-editor-close")[0] || a.removeClass("ha-member-lightbox-show")
                    }))
                },
                "ha-creative-button.default": function(e) {
                    var n = e.find(".ha-creative-btn-wrap"),
                        t = n.data("magnetic"),
                        a = n.find("a.ha-creative-btn"),
                        t = ("yes" == t && (n.on("mousemove", function(e) {
                            var t = e.pageX - (n.offset().left + n.outerWidth() / 2),
                                e = e.pageY - (n.offset().top + n.outerHeight() / 2);
                            a.css("transform", "translate(" + .3 * t + "px, " + .5 * e + "px)")
                        }), n.on("mouseout", function(e) {
                            a.css("transform", "translate(0px, 0px)")
                        })), e.find(".ha-eft--expandable")),
                        i = t.find(".text");
                    0 < t.length && 0 < i.length && (i[0].addEventListener("transitionend", function() {
                        i[0].style.width && (i[0].style.width = "auto")
                    }), t[0].addEventListener("mouseenter", function(e) {
                        e.currentTarget.classList.add("hover"), i[0].style.width = "auto";
                        e = i[0].offsetWidth;
                        i[0].style.width = "0", window.getComputedStyle(i[0]).transform, i[0].style.width = "".concat(e, "px")
                    }), t[0].addEventListener("mouseleave", function(e) {
                        e.currentTarget.classList.remove("hover"), i[0].style.width = "".concat(i[0].offsetWidth, "px"), window.getComputedStyle(i[0]).transform, i[0].style.width = ""
                    }))
                },
                "ha-pdf-view.default": function(e) {
                    var t = e.data("id"),
                        e = e.find(".viewer-" + t).data("pdf-settings"),
                        t = {
                            width: e.width,
                            height: e.height,
                            page: e.page_number
                        };
                    PDFObject.embed(e.pdf_url, "#" + e.unique_id, t)
                },
                "ha-comparison-table.default": function(e) {
                    var t = e.find(".ha-comparison-table-wrapper"),
                        n = e.find(".ha-comparison-table__head"),
                        a = n.data("sticky-header"),
                        i = (e.height(), t.innerHeight()),
                        o = t.offset().top;
                    "yes" === a && r.scroll(function() {
                        var e = c(this).scrollTop();
                        o <= e ? n.addClass("table-sticky") : i < e && n.removeClass("table-sticky")
                    })
                }
            }, function(e, t) {
                elementorFrontend.hooks.addAction("frontend/element_ready/" + e, t)
            }), {
                "ha-image-grid.default": a,
                "ha-justified-gallery.default": i,
                "ha-news-ticker.default": o,
                "ha-post-tab.default": s
            });
        c.each(a, function(e, t) {
            elementorFrontend.hooks.addAction("frontend/element_ready/" + e, function(e) {
                elementorFrontend.elementsHandler.addHandler(t, {
                    $element: e
                })
            })
        }), elementorFrontend.hooks.addAction("frontend/element_ready/ha-navigation-menu.default", function(e) {
            var a = e.find(".ha-nav-menu");

            function t() {
                jQuery(window).width() < 768 ? (a.removeClass("ha-navigation-menu-wrapper"), a.addClass("ha-navigation-burger-menu"), a.find(".ha-submenu-indicator-wrap").on("click", function(e) {
                    e.preventDefault();
                    e = c(this).parent("li.menu-item-has-children");
                    e && e.children("ul.sub-menu").slideToggle()
                })) : (a.addClass("ha-navigation-menu-wrapper"), a.removeClass("ha-navigation-burger-menu"), a.find("ul.menu").removeAttr("style"), a.find("ul.sub-menu").removeAttr("style"))
            }
            jQuery(window).width() < 1025 && 767 < jQuery(window).width() && a.find(".ha-submenu-indicator-wrap").on("click", function(e) {
                e.preventDefault();
                e = c(this).parent("li.menu-item-has-children");
                e && e.children("ul.sub-menu").slideToggle()
            }), a.find(".ha-menu-toggler").on("click", function(e) {
                var t = c(this).data("humberger"),
                    n = a.find("ul.menu");
                "open" == t ? (c(".ha-menu-open-icon").addClass("hide-icon"), c(".ha-menu-close-icon").removeClass("hide-icon"), c(".ha-menu-close-icon").addClass("show-icon"), n.slideDown()) : (c(".ha-menu-close-icon").addClass("hide-icon"), c(".ha-menu-open-icon").removeClass("hide-icon"), c(".ha-menu-open-icon").addClass("show-icon"), n.slideUp())
            }), t(), r.on("resize", l(t, 100))
        });
        elementorFrontend.hooks.addAction("frontend/element_ready/ha-age-gate.default", function(e, t) {
            var n, a, i, o, s;
            elementorFrontend.isEditMode() ? (localStorage.removeItem("ha-age-gate-expire-time"), e.find(".ha-age-gate-wrapper").length && "no" == e.find(".ha-age-gate-wrapper").data("editor_mood") && e.find(".ha-age-gate-wrapper").hide()) : elementorFrontend.isEditMode() || (a = (n = e.find(".ha-age-gate-wrapper")).data("age_gate_cookies_time"), i = localStorage.getItem("ha-age-gate-expire-time"), n.closest("body").css("overflow", "hidden"), o = new Date, (s = new Date).setDate(o.getDate() + a), "" != i && null != i && new Date(o) <= new Date(i) ? (t(".ha-age-gate-wrapper").hide(), n.closest("body").css("overflow", "")) : ("" != i && null != i && new Date(o) > new Date(i) && localStorage.removeItem("ha-age-gate-expire-time"), t(".ha-age-gate-wrapper").show()), e.find(".ha-age-gate-wrapper.ha-age-gate-confirm-age").length && t(".ha-age-gate-confirm-age-btn").on("click", function() {
                localStorage.setItem("ha-age-gate-expire-time", s), t(this).closest(".ha-age-gate-wrapper").hide(), t(this).closest("body").css("overflow", "")
            }), e.find(".ha-age-gate-wrapper.ha-age-gate-confirm-dob").length && t(".ha-age-gate-confirm-dob-btn").on("click", function() {
                var e = new Date(Date.parse(t(this).closest(".ha-age-gate-form-body").find(".ha-age-gate-date-input").val())).getFullYear();
                o.getFullYear() - e < t(this).closest(".ha-age-gate-wrapper").data("userbirth") ? t(this).closest(".ha-age-gate-boxes").find(".ha-age-gate-warning-msg").show() : (localStorage.setItem("ha-age-gate-expire-time", s), t(this).closest(".ha-age-gate-wrapper").hide(), t(this).closest("body").css("overflow", ""))
            }), e.find(".ha-age-gate-wrapper.ha-age-gate-confirm-by-boolean").length && (t(".ha-age-gate-wrapper .ha-age-gate-confirm-yes-btn").on("click", function() {
                localStorage.setItem("ha-age-gate-expire-time", s), t(this).closest(".ha-age-gate-wrapper").hide(), t(this).closest("body").css("overflow", "")
            }), t(".ha-age-gate-wrapper .ha-age-gate-confirm-no-btn").on("click", function() {
                t(this).closest(".ha-age-gate-boxes").find(".ha-age-gate-warning-msg").show()
            })))
        })
    })
}(jQuery);