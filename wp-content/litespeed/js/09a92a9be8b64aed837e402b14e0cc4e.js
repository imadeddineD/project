! function(e, n) {
    e.wp = e.wp || {}, e.wp.mediaelement = new function() {
        var t = {};
        return {
            initialize: function() {
                var e = [];
                (t = "undefined" != typeof _wpmejsSettings ? n.extend(!0, {}, _wpmejsSettings) : t).classPrefix = "mejs-", t.success = t.success || function(e) {
                    var t, n;
                    e.rendererName && -1 !== e.rendererName.indexOf("flash") && (t = e.attributes.autoplay && "false" !== e.attributes.autoplay, n = e.attributes.loop && "false" !== e.attributes.loop, t && e.addEventListener("canplay", function() {
                        e.play()
                    }, !1), n) && e.addEventListener("ended", function() {
                        e.play()
                    }, !1)
                }, t.customError = function(e, t) {
                    if (-1 !== e.rendererName.indexOf("flash") || -1 !== e.rendererName.indexOf("flv")) return '<a href="' + t.src + '">' + mejsL10n.strings["mejs.download-file"] + "</a>"
                }, void 0 !== t.videoShortcodeLibrary && "mediaelement" !== t.videoShortcodeLibrary || e.push(".wp-video-shortcode"), void 0 !== t.audioShortcodeLibrary && "mediaelement" !== t.audioShortcodeLibrary || e.push(".wp-audio-shortcode"), e.length && n(e.join(", ")).not(".mejs-container").filter(function() {
                    return !n(this).parent().hasClass("mejs-mediaelement")
                }).mediaelementplayer(t)
            }
        }
    }, n(e.wp.mediaelement.initialize)
}(window, jQuery);