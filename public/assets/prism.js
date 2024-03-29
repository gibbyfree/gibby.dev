! function() {
    var a = {
            213: function(e, t, n) {
                var a, i, r, o, s, h, l, d, u, c, p, g, f, m, b, y, v, w, k, S, E = function(d) {
                    var u = /\blang(?:uage)?-([\w-]+)\b/i,
                        t = 0,
                        N = {
                            manual: d.Prism && d.Prism.manual,
                            disableWorkerMessageHandler: d.Prism && d.Prism.disableWorkerMessageHandler,
                            util: {
                                encode: function e(t) {
                                    return t instanceof O ? new O(t.type, e(t.content), t.alias) : Array.isArray(t) ? t.map(e) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                                },
                                type: function(e) {
                                    return Object.prototype.toString.call(e).slice(8, -1)
                                },
                                objId: function(e) {
                                    return e.__id || Object.defineProperty(e, "__id", {
                                        value: ++t
                                    }), e.__id
                                },
                                clone: function n(e, a) {
                                    var i, t;
                                    switch (a = a || {}, N.util.type(e)) {
                                        case "Object":
                                            if (t = N.util.objId(e), a[t]) return a[t];
                                            for (var r in i = {}, a[t] = i, e) e.hasOwnProperty(r) && (i[r] = n(e[r], a));
                                            return i;
                                        case "Array":
                                            return t = N.util.objId(e), a[t] ? a[t] : (i = [], a[t] = i, e.forEach(function(e, t) {
                                                i[t] = n(e, a)
                                            }), i);
                                        default:
                                            return e
                                    }
                                },
                                getLanguage: function(e) {
                                    for (; e && !u.test(e.className);) e = e.parentElement;
                                    return e ? (e.className.match(u) || [, "none"])[1].toLowerCase() : "none"
                                },
                                currentScript: function() {
                                    if ("undefined" == typeof document) return null;
                                    if ("currentScript" in document) return document.currentScript;
                                    try {
                                        throw new Error
                                    } catch (e) {
                                        var t = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
                                        if (t) {
                                            var n = document.getElementsByTagName("script");
                                            for (var a in n)
                                                if (n[a].src == t) return n[a]
                                        }
                                        return null
                                    }
                                },
                                isActive: function(e, t, n) {
                                    for (var a = "no-" + t; e;) {
                                        var i = e.classList;
                                        if (i.contains(t)) return !0;
                                        if (i.contains(a)) return !1;
                                        e = e.parentElement
                                    }
                                    return !!n
                                }
                            },
                            languages: {
                                extend: function(e, t) {
                                    var n = N.util.clone(N.languages[e]);
                                    for (var a in t) n[a] = t[a];
                                    return n
                                },
                                insertBefore: function(n, e, t, a) {
                                    var i = (a = a || N.languages)[n],
                                        r = {};
                                    for (var o in i)
                                        if (i.hasOwnProperty(o)) {
                                            if (o == e)
                                                for (var s in t) t.hasOwnProperty(s) && (r[s] = t[s]);
                                            t.hasOwnProperty(o) || (r[o] = i[o])
                                        }
                                    var l = a[n];
                                    return a[n] = r, N.languages.DFS(N.languages, function(e, t) {
                                        t === l && e != n && (this[e] = r)
                                    }), r
                                },
                                DFS: function e(t, n, a, i) {
                                    i = i || {};
                                    var r, o, s = N.util.objId;
                                    for (var l in t) {
                                        t.hasOwnProperty(l) && (n.call(t, l, t[l], a || l), r = t[l], "Object" !== (o = N.util.type(r)) || i[s(r)] ? "Array" !== o || i[s(r)] || (i[s(r)] = !0, e(r, n, l, i)) : (i[s(r)] = !0, e(r, n, null, i)))
                                    }
                                }
                            },
                            plugins: {},
                            highlightAll: function(e, t) {
                                N.highlightAllUnder(document, e, t)
                            },
                            highlightAllUnder: function(e, t, n) {
                                var a = {
                                    callback: n,
                                    container: e,
                                    selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                                };
                                N.hooks.run("before-highlightall", a), a.elements = Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)), N.hooks.run("before-all-elements-highlight", a);
                                for (var i, r = 0; i = a.elements[r++];) N.highlightElement(i, !0 === t, a.callback)
                            },
                            highlightElement: function(e, t, n) {
                                var a = N.util.getLanguage(e),
                                    i = N.languages[a];
                                e.className = e.className.replace(u, "").replace(/\s+/g, " ") + " language-" + a;
                                var r = e.parentElement;
                                r && "pre" === r.nodeName.toLowerCase() && (r.className = r.className.replace(u, "").replace(/\s+/g, " ") + " language-" + a);
                                var o, s = {
                                    element: e,
                                    language: a,
                                    grammar: i,
                                    code: e.textContent
                                };

                                function l(e) {
                                    s.highlightedCode = e, N.hooks.run("before-insert", s), s.element.innerHTML = s.highlightedCode, N.hooks.run("after-highlight", s), N.hooks.run("complete", s), n && n.call(s.element)
                                }
                                if (N.hooks.run("before-sanity-check", s), !s.code) return N.hooks.run("complete", s), void(n && n.call(s.element));
                                N.hooks.run("before-highlight", s), s.grammar ? t && d.Worker ? ((o = new Worker(N.filename)).onmessage = function(e) {
                                    l(e.data)
                                }, o.postMessage(JSON.stringify({
                                    language: s.language,
                                    code: s.code,
                                    immediateClose: !0
                                }))) : l(N.highlight(s.code, s.grammar, s.language)) : l(N.util.encode(s.code))
                            },
                            highlight: function(e, t, n) {
                                var a = {
                                    code: e,
                                    grammar: t,
                                    language: n
                                };
                                return N.hooks.run("before-tokenize", a), a.tokens = N.tokenize(a.code, a.grammar), N.hooks.run("after-tokenize", a), O.stringify(N.util.encode(a.tokens), a.language)
                            },
                            tokenize: function(e, t) {
                                var n = t.rest;
                                if (n) {
                                    for (var a in n) t[a] = n[a];
                                    delete t.rest
                                }
                                var i = new r;
                                return F(i, i.head, e),
                                    function e(t, n, a, i, r, o) {
                                        for (var s in a)
                                            if (a.hasOwnProperty(s) && a[s])
                                                for (var l = a[s], l = Array.isArray(l) ? l : [l], d = 0; d < l.length; ++d) {
                                                    if (o && o.cause == s + "," + d) return;
                                                    var u, c = l[d],
                                                        p = c.inside,
                                                        g = !!c.lookbehind,
                                                        f = !!c.greedy,
                                                        m = 0,
                                                        b = c.alias;
                                                    f && !c.pattern.global && (u = c.pattern.toString().match(/[imsuy]*$/)[0], c.pattern = RegExp(c.pattern.source, u + "g"));
                                                    for (var h = c.pattern || c, y = i.next, v = r; y !== n.tail && !(o && v >= o.reach); v += y.value.length, y = y.next) {
                                                        var w = y.value;
                                                        if (n.length > t.length) return;
                                                        if (!(w instanceof O)) {
                                                            var k, S, E, x, A, _ = 1;
                                                            if (f && y != n.tail.prev) {
                                                                if (h.lastIndex = v, !(I = h.exec(t))) break;
                                                                var T = I.index + (g && I[1] ? I[1].length : 0),
                                                                    C = I.index + I[0].length,
                                                                    R = v;
                                                                for (R += y.value.length; R <= T;) R += (y = y.next).value.length;
                                                                if (v = R -= y.value.length, y.value instanceof O) continue;
                                                                for (var L = y; L !== n.tail && (R < C || "string" == typeof L.value); L = L.next) _++, R += L.value.length;
                                                                _--, w = t.slice(v, R), I.index -= v
                                                            } else {
                                                                h.lastIndex = 0;
                                                                var I = h.exec(w)
                                                            }
                                                            I && (g && (m = I[1] ? I[1].length : 0), C = (T = I.index + m) + (k = I[0].slice(m)).length, S = w.slice(0, T), E = w.slice(C), x = v + w.length, o && x > o.reach && (o.reach = x), A = y.prev, S && (A = F(n, A, S), v += S.length), function(e, t, n) {
                                                                for (var a = t.next, i = 0; i < n && a !== e.tail; i++) a = a.next;
                                                                (t.next = a).prev = t, e.length -= i
                                                            }(n, A, _), y = F(n, A, new O(s, p ? N.tokenize(k, p) : k, b, k)), E && F(n, y, E), 1 < _ && e(t, n, a, y.prev, v, {
                                                                cause: s + "," + d,
                                                                reach: x
                                                            }))
                                                        }
                                                    }
                                                }
                                    }(e, i, t, i.head, 0),
                                    function(e) {
                                        for (var t = [], n = e.head.next; n !== e.tail;) t.push(n.value), n = n.next;
                                        return t
                                    }(i)
                            },
                            hooks: {
                                all: {},
                                add: function(e, t) {
                                    var n = N.hooks.all;
                                    n[e] = n[e] || [], n[e].push(t)
                                },
                                run: function(e, t) {
                                    var n = N.hooks.all[e];
                                    if (n && n.length)
                                        for (var a, i = 0; a = n[i++];) a(t)
                                }
                            },
                            Token: O
                        };

                    function O(e, t, n, a) {
                        this.type = e, this.content = t, this.alias = n, this.length = 0 | (a || "").length
                    }

                    function r() {
                        var e = {
                                value: null,
                                prev: null,
                                next: null
                            },
                            t = {
                                value: null,
                                prev: e,
                                next: null
                            };
                        e.next = t, this.head = e, this.tail = t, this.length = 0
                    }

                    function F(e, t, n) {
                        var a = t.next,
                            i = {
                                value: n,
                                prev: t,
                                next: a
                            };
                        return t.next = i, a.prev = i, e.length++, i
                    }
                    if (d.Prism = N, O.stringify = function t(e, n) {
                            if ("string" == typeof e) return e;
                            if (Array.isArray(e)) {
                                var a = "";
                                return e.forEach(function(e) {
                                    a += t(e, n)
                                }), a
                            }
                            var i = {
                                    type: e.type,
                                    content: t(e.content, n),
                                    tag: "span",
                                    classes: ["token", e.type],
                                    attributes: {},
                                    language: n
                                },
                                r = e.alias;
                            r && (Array.isArray(r) ? Array.prototype.push.apply(i.classes, r) : i.classes.push(r)), N.hooks.run("wrap", i);
                            var o = "";
                            for (var s in i.attributes) o += " " + s + '="' + (i.attributes[s] || "").replace(/"/g, "&quot;") + '"';
                            return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">"
                        }, !d.document) return d.addEventListener && (N.disableWorkerMessageHandler || d.addEventListener("message", function(e) {
                        var t = JSON.parse(e.data),
                            n = t.language,
                            a = t.code,
                            i = t.immediateClose;
                        d.postMessage(N.highlight(a, N.languages[n], n)), i && d.close()
                    }, !1)), N;
                    var e, n = N.util.currentScript();

                    function a() {
                        N.manual || N.highlightAll()
                    }
                    return n && (N.filename = n.src, n.hasAttribute("data-manual") && (N.manual = !0)), N.manual || ("loading" === (e = document.readyState) || "interactive" === e && n && n.defer ? document.addEventListener("DOMContentLoaded", a) : window.requestAnimationFrame ? window.requestAnimationFrame(a) : window.setTimeout(a, 16)), N
                }("undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {});

                function x(e, t) {
                    return "___" + e.toUpperCase() + t + "___"
                }

                function A(e) {
                    return e = e.replace(/<inner>/g, function() {
                        return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))"
                    }), RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + e + ")")
                }
                e.exports && (e.exports = E), void 0 !== n.g && (n.g.Prism = E), E.languages.markup = {
                        comment: /<!--[\s\S]*?-->/,
                        prolog: /<\?[\s\S]+?\?>/,
                        doctype: {
                            pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
                            greedy: !0,
                            inside: {
                                "internal-subset": {
                                    pattern: /(\[)[\s\S]+(?=\]>$)/,
                                    lookbehind: !0,
                                    greedy: !0,
                                    inside: null
                                },
                                string: {
                                    pattern: /"[^"]*"|'[^']*'/,
                                    greedy: !0
                                },
                                punctuation: /^<!|>$|[[\]]/,
                                "doctype-tag": /^DOCTYPE/,
                                name: /[^\s<>'"]+/
                            }
                        },
                        cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
                        tag: {
                            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
                            greedy: !0,
                            inside: {
                                tag: {
                                    pattern: /^<\/?[^\s>\/]+/,
                                    inside: {
                                        punctuation: /^<\/?/,
                                        namespace: /^[^\s>\/:]+:/
                                    }
                                },
                                "attr-value": {
                                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                                    inside: {
                                        punctuation: [{
                                            pattern: /^=/,
                                            alias: "attr-equals"
                                        }, /"|'/]
                                    }
                                },
                                punctuation: /\/?>/,
                                "attr-name": {
                                    pattern: /[^\s>\/]+/,
                                    inside: {
                                        namespace: /^[^\s>\/:]+:/
                                    }
                                }
                            }
                        },
                        entity: [{
                            pattern: /&[\da-z]{1,8};/i,
                            alias: "named-entity"
                        }, /&#x?[\da-f]{1,8};/i]
                    }, E.languages.markup.tag.inside["attr-value"].inside.entity = E.languages.markup.entity, E.languages.markup.doctype.inside["internal-subset"].inside = E.languages.markup, E.hooks.add("wrap", function(e) {
                        "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
                    }), Object.defineProperty(E.languages.markup.tag, "addInlined", {
                        value: function(e, t) {
                            var n = {};
                            n["language-" + t] = {
                                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                                lookbehind: !0,
                                inside: E.languages[t]
                            }, n.cdata = /^<!\[CDATA\[|\]\]>$/i;
                            var a = {
                                "included-cdata": {
                                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                                    inside: n
                                }
                            };
                            a["language-" + t] = {
                                pattern: /[\s\S]+/,
                                inside: E.languages[t]
                            };
                            var i = {};
                            i[e] = {
                                pattern: RegExp("(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function() {
                                    return e
                                }), "i"),
                                lookbehind: !0,
                                greedy: !0,
                                inside: a
                            }, E.languages.insertBefore("markup", "cdata", i)
                        }
                    }), E.languages.html = E.languages.markup, E.languages.mathml = E.languages.markup, E.languages.svg = E.languages.markup, E.languages.xml = E.languages.extend("markup", {}), E.languages.ssml = E.languages.xml, E.languages.atom = E.languages.xml, E.languages.rss = E.languages.xml,
                    function(e) {
                        var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
                        e.languages.css = {
                            comment: /\/\*[\s\S]*?\*\//,
                            atrule: {
                                pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
                                inside: {
                                    rule: /^@[\w-]+/,
                                    "selector-function-argument": {
                                        pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
                                        lookbehind: !0,
                                        alias: "selector"
                                    },
                                    keyword: {
                                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                                        lookbehind: !0
                                    }
                                }
                            },
                            url: {
                                pattern: RegExp("\\burl\\((?:" + t.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
                                greedy: !0,
                                inside: {
                                    function: /^url/i,
                                    punctuation: /^\(|\)$/,
                                    string: {
                                        pattern: RegExp("^" + t.source + "$"),
                                        alias: "url"
                                    }
                                }
                            },
                            selector: RegExp("[^{}\\s](?:[^{};\"']|" + t.source + ")*?(?=\\s*\\{)"),
                            string: {
                                pattern: t,
                                greedy: !0
                            },
                            property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
                            important: /!important\b/i,
                            function: /[-a-z0-9]+(?=\()/i,
                            punctuation: /[(){};:,]/
                        }, e.languages.css.atrule.inside.rest = e.languages.css;
                        var n = e.languages.markup;
                        n && (n.tag.addInlined("style", "css"), e.languages.insertBefore("inside", "attr-value", {
                            "style-attr": {
                                pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
                                lookbehind: !0,
                                inside: {
                                    "attr-value": {
                                        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                                        inside: {
                                            style: {
                                                pattern: /(["'])[\s\S]+(?=["']$)/,
                                                lookbehind: !0,
                                                alias: "language-css",
                                                inside: e.languages.css
                                            },
                                            punctuation: [{
                                                pattern: /^=/,
                                                alias: "attr-equals"
                                            }, /"|'/]
                                        }
                                    },
                                    "attr-name": /^style/i
                                }
                            }
                        }, n.tag))
                    }(E), E.languages.clike = {
                        comment: [{
                            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                            lookbehind: !0
                        }, {
                            pattern: /(^|[^\\:])\/\/.*/,
                            lookbehind: !0,
                            greedy: !0
                        }],
                        string: {
                            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                            greedy: !0
                        },
                        "class-name": {
                            pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
                            lookbehind: !0,
                            inside: {
                                punctuation: /[.\\]/
                            }
                        },
                        keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
                        boolean: /\b(?:true|false)\b/,
                        function: /\w+(?=\()/,
                        number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
                        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
                        punctuation: /[{}[\];(),.:]/
                    }, E.languages.javascript = E.languages.extend("clike", {
                        "class-name": [E.languages.clike["class-name"], {
                            pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
                            lookbehind: !0
                        }],
                        keyword: [{
                            pattern: /((?:^|})\s*)(?:catch|finally)\b/,
                            lookbehind: !0
                        }, {
                            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                            lookbehind: !0
                        }],
                        number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
                        function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
                        operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
                    }), E.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, E.languages.insertBefore("javascript", "keyword", {
                        regex: {
                            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
                            lookbehind: !0,
                            greedy: !0,
                            inside: {
                                "regex-source": {
                                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                                    lookbehind: !0,
                                    alias: "language-regex",
                                    inside: E.languages.regex
                                },
                                "regex-flags": /[a-z]+$/,
                                "regex-delimiter": /^\/|\/$/
                            }
                        },
                        "function-variable": {
                            pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
                            alias: "function"
                        },
                        parameter: [{
                            pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
                            lookbehind: !0,
                            inside: E.languages.javascript
                        }, {
                            pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
                            inside: E.languages.javascript
                        }, {
                            pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
                            lookbehind: !0,
                            inside: E.languages.javascript
                        }, {
                            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
                            lookbehind: !0,
                            inside: E.languages.javascript
                        }],
                        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
                    }), E.languages.insertBefore("javascript", "string", {
                        "template-string": {
                            pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
                            greedy: !0,
                            inside: {
                                "template-punctuation": {
                                    pattern: /^`|`$/,
                                    alias: "string"
                                },
                                interpolation: {
                                    pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                                    lookbehind: !0,
                                    inside: {
                                        "interpolation-punctuation": {
                                            pattern: /^\${|}$/,
                                            alias: "punctuation"
                                        },
                                        rest: E.languages.javascript
                                    }
                                },
                                string: /[\s\S]+/
                            }
                        }
                    }), E.languages.markup && E.languages.markup.tag.addInlined("script", "javascript"), E.languages.js = E.languages.javascript, E.languages.actionscript = E.languages.extend("javascript", {
                        keyword: /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,
                        operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
                    }), E.languages.actionscript["class-name"].alias = "function", E.languages.markup && E.languages.insertBefore("actionscript", "string", {
                        xml: {
                            pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
                            lookbehind: !0,
                            inside: E.languages.markup
                        }
                    }), E.languages.apacheconf = {
                        comment: /#.*/,
                        "directive-inline": {
                            pattern: /(^\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|Add(?:Alt|AltByEncoding|AltByType|Charset|DefaultCharset|Description|Encoding|Handler|Icon|IconByEncoding|IconByType|InputFilter|Language|ModuleInfo|OutputFilter|OutputFilterByType|Type)|Alias|AliasMatch|Allow(?:CONNECT|EncodedSlashes|Methods|Override|OverrideList)?|Anonymous(?:_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail)?|AsyncRequestWorkerFactor|Auth(?:BasicAuthoritative|BasicFake|BasicProvider|BasicUseDigestAlgorithm|DBDUserPWQuery|DBDUserRealmQuery|DBMGroupFile|DBMType|DBMUserFile|Digest(?:Algorithm|Domain|NonceLifetime|Provider|Qop|ShmemSize)|Form(?:Authoritative|Body|DisableNoStore|FakeBasicAuth|Location|LoginRequiredLocation|LoginSuccessLocation|LogoutLocation|Method|Mimetype|Password|Provider|SitePassphrase|Size|Username)|GroupFile|LDAP(?:AuthorizePrefix|BindAuthoritative|BindDN|BindPassword|CharsetConfig|CompareAsUser|CompareDNOnServer|DereferenceAliases|GroupAttribute|GroupAttributeIsDN|InitialBindAsUser|InitialBindPattern|MaxSubGroupDepth|RemoteUserAttribute|RemoteUserIsDN|SearchAsUser|SubGroupAttribute|SubGroupClass|Url)|Merging|Name|Type|UserFile|nCache(?:Context|Enable|ProvideFor|SOCache|Timeout)|nzFcgiCheckAuthnProvider|nzFcgiDefineProvider|zDBDLoginToReferer|zDBDQuery|zDBDRedirectQuery|zDBMType|zSendForbiddenOnFailure)|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferSize|BufferedLogs|CGIDScriptTimeout|CGIMapExtension|Cache(?:DefaultExpire|DetailHeader|DirLength|DirLevels|Disable|Enable|File|Header|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|IgnoreQueryString|IgnoreURLSessionIdentifiers|KeyBaseURL|LastModifiedFactor|Lock|LockMaxAge|LockPath|MaxExpire|MaxFileSize|MinExpire|MinFileSize|NegotiatedDocs|QuickHandler|ReadSize|ReadTime|Root|Socache(?:MaxSize|MaxTime|MinTime|ReadSize|ReadTime)?|StaleOnError|StoreExpired|StoreNoStore|StorePrivate)|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DTracePrivileges|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|Deflate(?:BufferSize|CompressionLevel|FilterNote|InflateLimitRequestBody|InflateRatio(?:Burst|Limit)|MemLevel|WindowSize)|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtFilterDefine|ExtFilterOptions|ExtendedStatus|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|Heartbeat(?:Address|Listen|MaxServers|Storage)|HostnameLookups|ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer)|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|Index(?:HeadInsert|Ignore|IgnoreReset|Options|OrderDefault|StyleSheet)|InputSed|KeepAlive|KeepAliveTimeout|KeptBodySize|LDAP(?:CacheEntries|CacheTTL|ConnectionPoolTTL|ConnectionTimeout|LibraryDebug|OpCacheEntries|OpCacheTTL|ReferralHopLimit|Referrals|Retries|RetryDelay|SharedCacheFile|SharedCacheSize|Timeout|TrustedClientCert|TrustedGlobalCert|TrustedMode|VerifyServerCert)|LanguagePriority|Limit(?:InternalRecursion|Request(?:Body|FieldSize|Fields|Line)|XMLRequestBody)|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|Lua(?:Hook(?:AccessChecker|AuthChecker|CheckUserID|Fixups|InsertFilter|Log|MapToStorage|TranslateName|TypeChecker)|Inherit|InputFilter|MapHandler|OutputFilter|PackageCPath|PackagePath|QuickHandler|Root|Scope)|MMapFile|Max(?:ConnectionsPerChild|KeepAliveRequests|MemFree|RangeOverlaps|RangeReversals|Ranges|RequestWorkers|SpareServers|SpareThreads|Threads)|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|ModMimeUsePathInfo|ModemStandard|MultiviewsMatch|Mutex|NWSSLTrustedCerts|NWSSLUpgradeable|NameVirtualHost|NoProxy|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|Proxy(?:AddHeaders|BadHeader|Block|Domain|ErrorOverride|ExpressDBMFile|ExpressDBMType|ExpressEnable|FtpDirCharset|FtpEscapeWildcards|FtpListOnWildcard|HTML(?:BufSize|CharsetOut|DocType|Enable|Events|Extended|Fixups|Interp|Links|Meta|StripComments|URLMap)|IOBufferSize|MaxForwards|Pass(?:Inherit|InterpolateEnv|Match|Reverse|ReverseCookieDomain|ReverseCookiePath)?|PreserveHost|ReceiveBufferSize|Remote|RemoteMatch|Requests|SCGIInternalRedirect|SCGISendfile|Set|SourceAddress|Status|Timeout|Via)|RLimitCPU|RLimitMEM|RLimitNPROC|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIP(?:Header|InternalProxy|InternalProxyList|ProxiesHeader|TrustedProxy|TrustedProxyList)|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|Rewrite(?:Base|Cond|Engine|Map|Options|Rule)|SSIETag|SSIEndTag|SSIErrorMsg|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSL(?:CACertificateFile|CACertificatePath|CADNRequestFile|CADNRequestPath|CARevocationCheck|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Compression|CryptoDevice|Engine|FIPS|HonorCipherOrder|InsecureRenegotiation|OCSP(?:DefaultResponder|Enable|OverrideResponder|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|UseRequestNonce)|OpenSSLConfCmd|Options|PassPhraseDialog|Protocol|Proxy(?:CACertificateFile|CACertificatePath|CARevocation(?:Check|File|Path)|CheckPeer(?:CN|Expire|Name)|CipherSuite|Engine|MachineCertificate(?:ChainFile|File|Path)|Protocol|Verify|VerifyDepth)|RandomSeed|RenegBufferSize|Require|RequireSSL|SRPUnknownUserSeed|SRPVerifierFile|Session(?:Cache|CacheTimeout|TicketKeyFile|Tickets)|Stapling(?:Cache|ErrorCacheTimeout|FakeTryLater|ForceURL|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|ReturnResponderErrors|StandardCacheTimeout)|StrictSNIVHostCheck|UseStapling|UserName|VerifyClient|VerifyDepth)|Satisfy|ScoreBoardFile|Script(?:Alias|AliasMatch|InterpreterSource|Log|LogBuffer|LogLength|Sock)?|SecureListen|SeeRequestTail|SendBufferSize|Server(?:Admin|Alias|Limit|Name|Path|Root|Signature|Tokens)|Session(?:Cookie(?:Name|Name2|Remove)|Crypto(?:Cipher|Driver|Passphrase|PassphraseFile)|DBD(?:CookieName|CookieName2|CookieRemove|DeleteLabel|InsertLabel|PerUser|SelectLabel|UpdateLabel)|Env|Exclude|Header|Include|MaxAge)?|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadStackSize|ThreadsPerChild|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|Virtual(?:DocumentRoot|ScriptAlias)(?:IP)?|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
                            lookbehind: !0,
                            alias: "property"
                        },
                        "directive-block": {
                            pattern: /<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|Require(?:All|Any|None)|VirtualHost)\b *.*>/i,
                            inside: {
                                "directive-block": {
                                    pattern: /^<\/?\w+/,
                                    inside: {
                                        punctuation: /^<\/?/
                                    },
                                    alias: "tag"
                                },
                                "directive-block-parameter": {
                                    pattern: /.*[^>]/,
                                    inside: {
                                        punctuation: /:/,
                                        string: {
                                            pattern: /("|').*\1/,
                                            inside: {
                                                variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/
                                            }
                                        }
                                    },
                                    alias: "attr-value"
                                },
                                punctuation: />/
                            },
                            alias: "tag"
                        },
                        "directive-flags": {
                            pattern: /\[(?:\w,?)+\]/,
                            alias: "keyword"
                        },
                        string: {
                            pattern: /("|').*\1/,
                            inside: {
                                variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/
                            }
                        },
                        variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
                        regex: /\^?.*\$|\^.*\$?/
                    }, E.languages.applescript = {
                        comment: [/\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[\s\S])*?\*\)/, /--.+/, /#.+/],
                        string: /"(?:\\.|[^"\\\r\n])*"/,
                        number: /(?:\b\d+\.?\d*|\B\.\d+)(?:e-?\d+)?\b/i,
                        operator: [/[&=≠≤≥*+\-\/÷^]|[<>]=?/, /\b(?:(?:start|begin|end)s? with|(?:(?:does not|doesn't) contain|contains?)|(?:is|isn't|is not) (?:in|contained by)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:(?:does not|doesn't) come|comes) (?:before|after)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equals|equal to|isn't|is not)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|or|div|mod|as|not))\b/],
                        keyword: /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/,
                        class: {
                            pattern: /\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POSIX file|real|record|reference|RGB color|script|text|centimetres|centimeters|feet|inches|kilometres|kilometers|metres|meters|miles|yards|square feet|square kilometres|square kilometers|square metres|square meters|square miles|square yards|cubic centimetres|cubic centimeters|cubic feet|cubic inches|cubic metres|cubic meters|cubic yards|gallons|litres|liters|quarts|grams|kilograms|ounces|pounds|degrees Celsius|degrees Fahrenheit|degrees Kelvin)\b/, alias: "builtin"
                        },
                        punctuation: /[{}():,¬«»《》]/
                    },
                    function(e) {
                        var t = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
                            n = {
                                pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
                                lookbehind: !0,
                                alias: "punctuation",
                                inside: null
                            },
                            a = {
                                bash: n,
                                environment: {
                                    pattern: RegExp("\\$" + t),
                                    alias: "constant"
                                },
                                variable: [{
                                    pattern: /\$?\(\([\s\S]+?\)\)/,
                                    greedy: !0,
                                    inside: {
                                        variable: [{
                                            pattern: /(^\$\(\([\s\S]+)\)\)/,
                                            lookbehind: !0
                                        }, /^\$\(\(/],
                                        number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
                                        operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                                        punctuation: /\(\(?|\)\)?|,|;/
                                    }
                                }, {
                                    pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
                                    greedy: !0,
                                    inside: {
                                        variable: /^\$\(|^`|\)$|`$/
                                    }
                                }, {
                                    pattern: /\$\{[^}]+\}/,
                                    greedy: !0,
                                    inside: {
                                        operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                                        punctuation: /[\[\]]/,
                                        environment: {
                                            pattern: RegExp("(\\{)" + t),
                                            lookbehind: !0,
                                            alias: "constant"
                                        }
                                    }
                                }, /\$(?:\w+|[#?*!@$])/],
                                entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
                            };
                        e.languages.bash = {
                            shebang: {
                                pattern: /^#!\s*\/.*/,
                                alias: "important"
                            },
                            comment: {
                                pattern: /(^|[^"{\\$])#.*/,
                                lookbehind: !0
                            },
                            "function-name": [{
                                pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
                                lookbehind: !0,
                                alias: "function"
                            }, {
                                pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
                                alias: "function"
                            }],
                            "for-or-select": {
                                pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
                                alias: "variable",
                                lookbehind: !0
                            },
                            "assign-left": {
                                pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
                                inside: {
                                    environment: {
                                        pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
                                        lookbehind: !0,
                                        alias: "constant"
                                    }
                                },
                                alias: "variable",
                                lookbehind: !0
                            },
                            string: [{
                                pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,
                                lookbehind: !0,
                                greedy: !0,
                                inside: a
                            }, {
                                pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
                                lookbehind: !0,
                                greedy: !0,
                                inside: {
                                    bash: n
                                }
                            }, {
                                pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,
                                lookbehind: !0,
                                greedy: !0,
                                inside: a
                            }],
                            environment: {
                                pattern: RegExp("\\$?" + t),
                                alias: "constant"
                            },
                            variable: a.variable,
                            function: {
                                pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
                                lookbehind: !0
                            },
                            keyword: {
                                pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
                                lookbehind: !0
                            },
                            builtin: {
                                pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
                                lookbehind: !0,
                                alias: "class-name"
                            },
                            boolean: {
                                pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
                                lookbehind: !0
                            },
                            "file-descriptor": {
                                pattern: /\B&\d\b/,
                                alias: "important"
                            },
                            operator: {
                                pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
                                inside: {
                                    "file-descriptor": {
                                        pattern: /^\d/,
                                        alias: "important"
                                    }
                                }
                            },
                            punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
                            number: {
                                pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
                                lookbehind: !0
                            }
                        }, n.inside = e.languages.bash;
                        for (var i = ["comment", "function-name", "for-or-select", "assign-left", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number"], r = a.variable[1].inside, o = 0; o < i.length; o++) r[i[o]] = e.languages.bash[i[o]];
                        e.languages.shell = e.languages.bash
                    }(E), E.languages.c = E.languages.extend("clike", {
                        comment: {
                            pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
                            greedy: !0
                        },
                        "class-name": {
                            pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+/,
                            lookbehind: !0
                        },
                        keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
                        function: /[a-z_]\w*(?=\s*\()/i,
                        operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
                        number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
                    }), E.languages.insertBefore("c", "string", {
                        macro: {
                            pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
                            lookbehind: !0,
                            greedy: !0,
                            alias: "property",
                            inside: {
                                string: [{
                                    pattern: /^(#\s*include\s*)<[^>]+>/,
                                    lookbehind: !0
                                }, E.languages.c.string],
                                comment: E.languages.c.comment,
                                directive: {
                                    pattern: /^(#\s*)[a-z]+/,
                                    lookbehind: !0,
                                    alias: "keyword"
                                },
                                "directive-hash": /^#/,
                                punctuation: /##|\\(?=[\r\n])/,
                                expression: {
                                    pattern: /\S[\s\S]*/,
                                    inside: E.languages.c
                                }
                            }
                        },
                        constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
                    }), delete E.languages.c.boolean,
                    function(n) {
                        function a(e, n) {
                            return e.replace(/<<(\d+)>>/g, function(e, t) {
                                return "(?:" + n[+t] + ")"
                            })
                        }

                        function i(e, t, n) {
                            return RegExp(a(e, t), n || "")
                        }

                        function e(e, t) {
                            for (var n = 0; n < t; n++) e = e.replace(/<<self>>/g, function() {
                                return "(?:" + e + ")"
                            });
                            return e.replace(/<<self>>/g, "[^\\s\\S]")
                        }
                        var t = "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
                            r = "class enum interface struct",
                            o = "add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where where",
                            s = "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";

                        function l(e) {
                            return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b"
                        }
                        var d = l(r),
                            u = RegExp(l(t + " " + r + " " + o + " " + s)),
                            c = l(r + " " + o + " " + s),
                            p = l(t + " " + r + " " + s),
                            g = e("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2),
                            f = e("\\((?:[^()]|<<self>>)*\\)", 2),
                            m = "@?\\b[A-Za-z_]\\w*\\b",
                            b = a("<<0>>(?:\\s*<<1>>)?", [m, g]),
                            h = a("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, b]),
                            y = "\\[\\s*(?:,\\s*)*\\]",
                            v = a("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [h, y]),
                            w = a("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [a("\\(<<0>>+(?:,<<0>>+)+\\)", [a("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, f, y])]), h, y]),
                            k = {
                                keyword: u,
                                punctuation: /[<>()?,.:[\]]/
                            },
                            S = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
                            E = '"(?:\\\\.|[^\\\\"\r\n])*"';
                        n.languages.csharp = n.languages.extend("clike", {
                            string: [{
                                pattern: i("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
                                lookbehind: !0,
                                greedy: !0
                            }, {
                                pattern: i("(^|[^@$\\\\])<<0>>", [E]),
                                lookbehind: !0,
                                greedy: !0
                            }, {
                                pattern: RegExp(S),
                                greedy: !0,
                                alias: "character"
                            }],
                            "class-name": [{
                                pattern: i("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [h]),
                                lookbehind: !0,
                                inside: k
                            }, {
                                pattern: i("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [m, w]),
                                lookbehind: !0,
                                inside: k
                            }, {
                                pattern: i("(\\busing\\s+)<<0>>(?=\\s*=)", [m]),
                                lookbehind: !0
                            }, {
                                pattern: i("(\\b<<0>>\\s+)<<1>>", [d, b]),
                                lookbehind: !0,
                                inside: k
                            }, {
                                pattern: i("(\\bcatch\\s*\\(\\s*)<<0>>", [h]),
                                lookbehind: !0,
                                inside: k
                            }, {
                                pattern: i("(\\bwhere\\s+)<<0>>", [m]),
                                lookbehind: !0
                            }, {
                                pattern: i("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [v]),
                                lookbehind: !0,
                                inside: k
                            }, {
                                pattern: i("\\b<<0>>(?=\\s+(?!<<1>>)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))", [w, p, m]),
                                inside: k
                            }],
                            keyword: u,
                            number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
                            operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
                            punctuation: /\?\.?|::|[{}[\];(),.:]/
                        }), n.languages.insertBefore("csharp", "number", {
                            range: {
                                pattern: /\.\./,
                                alias: "operator"
                            }
                        }), n.languages.insertBefore("csharp", "punctuation", {
                            "named-parameter": {
                                pattern: i("([(,]\\s*)<<0>>(?=\\s*:)", [m]),
                                lookbehind: !0,
                                alias: "punctuation"
                            }
                        }), n.languages.insertBefore("csharp", "class-name", {
                            namespace: {
                                pattern: i("(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])", [m]),
                                lookbehind: !0,
                                inside: {
                                    punctuation: /\./
                                }
                            },
                            "type-expression": {
                                pattern: i("(\\b(?:default|typeof|sizeof)\\s*\\(\\s*)(?:[^()\\s]|\\s(?!\\s*\\))|<<0>>)*(?=\\s*\\))", [f]),
                                lookbehind: !0,
                                alias: "class-name",
                                inside: k
                            },
                            "return-type": {
                                pattern: i("<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [w, h]),
                                inside: k,
                                alias: "class-name"
                            },
                            "constructor-invocation": {
                                pattern: i("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [w]),
                                lookbehind: !0,
                                inside: k,
                                alias: "class-name"
                            },
                            "generic-method": {
                                pattern: i("<<0>>\\s*<<1>>(?=\\s*\\()", [m, g]),
                                inside: {
                                    function: i("^<<0>>", [m]),
                                    generic: {
                                        pattern: RegExp(g),
                                        alias: "class-name",
                                        inside: k
                                    }
                                }
                            },
                            "type-list": {
                                pattern: i("\\b((?:<<0>>\\s+<<1>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>)(?:\\s*,\\s*(?:<<3>>|<<4>>))*(?=\\s*(?:where|[{;]|=>|$))", [d, b, m, w, u.source]),
                                lookbehind: !0,
                                inside: {
                                    keyword: u,
                                    "class-name": {
                                        pattern: RegExp(w),
                                        greedy: !0,
                                        inside: k
                                    },
                                    punctuation: /,/
                                }
                            },
                            preprocessor: {
                                pattern: /(^\s*)#.*/m,
                                lookbehind: !0,
                                alias: "property",
                                inside: {
                                    directive: {
                                        pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                                        lookbehind: !0,
                                        alias: "keyword"
                                    }
                                }
                            }
                        });
                        var x = E + "|" + S,
                            A = a("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [x]),
                            _ = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [A]), 2),
                            T = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b",
                            C = a("<<0>>(?:\\s*\\(<<1>>*\\))?", [h, _]);
                        n.languages.insertBefore("csharp", "class-name", {
                            attribute: {
                                pattern: i("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])", [T, C]),
                                lookbehind: !0,
                                greedy: !0,
                                inside: {
                                    target: {
                                        pattern: i("^<<0>>(?=\\s*:)", [T]),
                                        alias: "keyword"
                                    },
                                    "attribute-arguments": {
                                        pattern: i("\\(<<0>>*\\)", [_]),
                                        inside: n.languages.csharp
                                    },
                                    "class-name": {
                                        pattern: RegExp(h),
                                        inside: {
                                            punctuation: /\./
                                        }
                                    },
                                    punctuation: /[:,]/
                                }
                            }
                        });
                        var R = ":[^}\r\n]+",
                            L = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [A]), 2),
                            I = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [L, R]),
                            N = e(a("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [x]), 2),
                            O = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [N, R]);

                        function F(e, t) {
                            return {
                                interpolation: {
                                    pattern: i("((?:^|[^{])(?:\\{\\{)*)<<0>>", [e]),
                                    lookbehind: !0,
                                    inside: {
                                        "format-string": {
                                            pattern: i("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [t, R]),
                                            lookbehind: !0,
                                            inside: {
                                                punctuation: /^:/
                                            }
                                        },
                                        punctuation: /^\{|\}$/,
                                        expression: {
                                            pattern: /[\s\S]+/,
                                            alias: "language-csharp",
                                            inside: n.languages.csharp
                                        }
                                    }
                                },
                                string: /[\s\S]+/
                            }
                        }
                        n.languages.insertBefore("csharp", "string", {
                            "interpolation-string": [{
                                pattern: i('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [I]),
                                lookbehind: !0,
                                greedy: !0,
                                inside: F(I, L)
                            }, {
                                pattern: i('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [O]),
                                lookbehind: !0,
                                greedy: !0,
                                inside: F(O, N)
                            }]
                        })
                    }(E), E.languages.dotnet = E.languages.cs = E.languages.csharp, i = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/, (a = E).languages.cpp = a.languages.extend("c", {
                        "class-name": [{
                            pattern: RegExp("(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(/<keyword>/g, function() {
                                return i.source
                            })),
                            lookbehind: !0
                        }, /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/, /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i, /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],
                        keyword: i,
                        number: {
                            pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
                            greedy: !0
                        },
                        operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
                        boolean: /\b(?:true|false)\b/
                    }), a.languages.insertBefore("cpp", "string", {
                        "raw-string": {
                            pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
                            alias: "string",
                            greedy: !0
                        }
                    }), a.languages.insertBefore("cpp", "class-name", {
                        "base-clause": {
                            pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)(?:[^;{}"'])+?(?=\s*[;{])/,
                            lookbehind: !0,
                            greedy: !0,
                            inside: a.languages.extend("cpp", {})
                        }
                    }), a.languages.insertBefore("inside", "operator", {
                        "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
                    }, a.languages.cpp["base-clause"]), o = /#(?!\{).+/, s = {
                        pattern: /#\{[^}]+\}/,
                        alias: "variable"
                    }, (r = E).languages.coffeescript = r.languages.extend("javascript", {
                        comment: o,
                        string: [{
                            pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                            greedy: !0
                        }, {
                            pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                            greedy: !0,
                            inside: {
                                interpolation: s
                            }
                        }],
                        keyword: /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
                        "class-member": {
                            pattern: /@(?!\d)\w+/,
                            alias: "variable"
                        }
                    }), r.languages.insertBefore("coffeescript", "comment", {
                        "multiline-comment": {
                            pattern: /###[\s\S]+?###/,
                            alias: "comment"
                        },
                        "block-regex": {
                            pattern: /\/{3}[\s\S]*?\/{3}/,
                            alias: "regex",
                            inside: {
                                comment: o,
                                interpolation: s
                            }
                        }
                    }), r.languages.insertBefore("coffeescript", "string", {
                        "inline-javascript": {
                            pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                            inside: {
                                delimiter: {
                                    pattern: /^`|`$/,
                                    alias: "punctuation"
                                },
                                rest: r.languages.javascript
                            }
                        },
                        "multiline-string": [{
                            pattern: /'''[\s\S]*?'''/,
                            greedy: !0,
                            alias: "string"
                        }, {
                            pattern: /"""[\s\S]*?"""/,
                            greedy: !0,
                            alias: "string",
                            inside: {
                                interpolation: s
                            }
                        }]
                    }), r.languages.insertBefore("coffeescript", "keyword", {
                        property: /(?!\d)\w+(?=\s*:(?!:))/
                    }), delete r.languages.coffeescript["template-string"], r.languages.coffee = r.languages.coffeescript, E.languages.csp = {
                        directive: {
                            pattern: /\b(?:base-uri|block-all-mixed-content|(?:child|connect|default|font|frame|img|manifest|media|object|script|style|worker)-src|disown-opener|form-action|frame-ancestors|plugin-types|referrer|reflected-xss|report-to|report-uri|require-sri-for|sandbox|upgrade-insecure-requests)\b/i,
                            alias: "keyword"
                        },
                        safe: {
                            pattern: /'(?:self|none|strict-dynamic|(?:nonce-|sha(?:256|384|512)-)[a-zA-Z\d+=/]+)'/,
                            alias: "selector"
                        },
                        unsafe: {
                            pattern: /(?:'unsafe-inline'|'unsafe-eval'|'unsafe-hashed-attributes'|\*)/,
                            alias: "function"
                        }
                    },
                    function(e) {
                        var t, n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
                        e.languages.css.selector = {
                            pattern: e.languages.css.selector,
                            inside: t = {
                                "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
                                "pseudo-class": /:[-\w]+/,
                                class: /\.[-\w]+/,
                                id: /#[-\w]+/,
                                attribute: {
                                    pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"),
                                    greedy: !0,
                                    inside: {
                                        punctuation: /^\[|\]$/,
                                        "case-sensitivity": {
                                            pattern: /(\s)[si]$/i,
                                            lookbehind: !0,
                                            alias: "keyword"
                                        },
                                        namespace: {
                                            pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
                                            lookbehind: !0,
                                            inside: {
                                                punctuation: /\|$/
                                            }
                                        },
                                        "attr-name": {
                                            pattern: /^(\s*)[-\w\xA0-\uFFFF]+/,
                                            lookbehind: !0
                                        },
                                        "attr-value": [n, {
                                            pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/,
                                            lookbehind: !0
                                        }],
                                        operator: /[|~*^$]?=/
                                    }
                                },
                                "n-th": [{
                                    pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
                                    lookbehind: !0,
                                    inside: {
                                        number: /[\dn]+/,
                                        operator: /[+-]/
                                    }
                                }, {
                                    pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
                                    lookbehind: !0
                                }],
                                combinator: />|\+|~|\|\|/,
                                punctuation: /[(),]/
                            }
                        }, e.languages.css.atrule.inside["selector-function-argument"].inside = t, e.languages.insertBefore("css", "property", {
                            variable: {
                                pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
                                lookbehind: !0
                            }
                        });
                        var a = {
                                pattern: /(\b\d+)(?:%|[a-z]+\b)/,
                                lookbehind: !0
                            },
                            i = {
                                pattern: /(^|[^\w.-])-?\d*\.?\d+/,
                                lookbehind: !0
                            };
                        e.languages.insertBefore("css", "function", {
                            operator: {
                                pattern: /(\s)[+\-*\/](?=\s)/,
                                lookbehind: !0
                            },
                            hexcode: {
                                pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i,
                                alias: "color"
                            },
                            color: [/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i, {
                                pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
                                inside: {
                                    unit: a,
                                    number: i,
                                    function: /[\w-]+(?=\()/,
                                    punctuation: /[(),]/
                                }
                            }],
                            entity: /\\[\da-f]{1,8}/i,
                            unit: a,
                            number: i
                        })
                    }(E),
                    function(a) {
                        a.languages.diff = {
                            coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m]
                        };
                        var i = {
                            "deleted-sign": "-",
                            "deleted-arrow": "<",
                            "inserted-sign": "+",
                            "inserted-arrow": ">",
                            unchanged: " ",
                            diff: "!"
                        };
                        Object.keys(i).forEach(function(e) {
                            var t = i[e],
                                n = [];
                            /^\w+$/.test(e) || n.push(/\w+/.exec(e)[0]), "diff" === e && n.push("bold"), a.languages.diff[e] = {
                                pattern: RegExp("^(?:[" + t + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
                                alias: n,
                                inside: {
                                    line: {
                                        pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
                                        lookbehind: !0
                                    },
                                    prefix: {
                                        pattern: /[\s\S]/,
                                        alias: /\w+/.exec(e)[0]
                                    }
                                }
                            }
                        }), Object.defineProperty(a.languages.diff, "PREFIXES", {
                            value: i
                        })
                    }(E), h = E, Object.defineProperties(h.languages["markup-templating"] = {}, {
                        buildPlaceholders: {
                            value: function(a, i, e, r) {
                                var o;
                                a.language === i && (o = a.tokenStack = [], a.code = a.code.replace(e, function(e) {
                                    if ("function" == typeof r && !r(e)) return e;
                                    for (var t, n = o.length; - 1 !== a.code.indexOf(t = x(i, n));) ++n;
                                    return o[n] = e, t
                                }), a.grammar = h.languages.markup)
                            }
                        },
                        tokenizePlaceholders: {
                            value: function(g, f) {
                                var m, b;
                                g.language === f && g.tokenStack && (g.grammar = h.languages[f], m = 0, b = Object.keys(g.tokenStack), function e(t) {
                                    for (var n = 0; n < t.length && !(m >= b.length); n++) {
                                        var a, i, r, o, s, l, d, u, c, p = t[n];
                                        "string" == typeof p || p.content && "string" == typeof p.content ? (a = b[m], i = g.tokenStack[a], r = "string" == typeof p ? p : p.content, o = x(f, a), -1 < (s = r.indexOf(o)) && (++m, l = r.substring(0, s), d = new h.Token(f, h.tokenize(i, g.grammar), "language-" + f, i), u = r.substring(s + o.length), c = [], l && c.push.apply(c, e([l])), c.push(d), u && c.push.apply(c, e([u])), "string" == typeof p ? t.splice.apply(t, [n, 1].concat(c)) : p.content = c)) : p.content && e(p.content)
                                    }
                                    return t
                                }(g.tokens))
                            }
                        }
                    }),
                    function(e) {
                        e.languages.django = {
                            comment: /^{#[\s\S]*?#}$/,
                            tag: {
                                pattern: /(^{%[+-]?\s*)\w+/,
                                lookbehind: !0,
                                alias: "keyword"
                            },
                            delimiter: {
                                pattern: /^{[{%][+-]?|[+-]?[}%]}$/,
                                alias: "punctuation"
                            },
                            string: {
                                pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
                                greedy: !0
                            },
                            filter: {
                                pattern: /(\|)\w+/,
                                lookbehind: !0,
                                alias: "function"
                            },
                            test: {
                                pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
                                lookbehind: !0,
                                alias: "function"
                            },
                            function: /\b[a-z_]\w+(?=\s*\()/i,
                            keyword: /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
                            operator: /[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
                            number: /\b\d+(?:\.\d+)?\b/,
                            boolean: /[Tt]rue|[Ff]alse|[Nn]one/,
                            variable: /\b\w+?\b/,
                            punctuation: /[{}[\](),.:;]/
                        };
                        var t = /{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,
                            n = e.languages["markup-templating"];
                        e.hooks.add("before-tokenize", function(e) {
                            n.buildPlaceholders(e, "django", t)
                        }), e.hooks.add("after-tokenize", function(e) {
                            n.tokenizePlaceholders(e, "django")
                        }), e.languages.jinja2 = e.languages.django, e.hooks.add("before-tokenize", function(e) {
                            n.buildPlaceholders(e, "jinja2", t)
                        }), e.hooks.add("after-tokenize", function(e) {
                            n.tokenizePlaceholders(e, "jinja2")
                        })
                    }(E), E.languages.docker = {
                        keyword: {
                            pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
                            lookbehind: !0
                        },
                        string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
                        comment: {
                            pattern: /#.*/,
                            greedy: !0
                        },
                        punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/
                    }, E.languages.dockerfile = E.languages.docker, E.languages.elixir = {
                        comment: /#.*/m,
                        regex: {
                            pattern: /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
                            greedy: !0
                        },
                        string: [{
                            pattern: /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|#(?!\{)|[^#\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
                            greedy: !0,
                            inside: {}
                        }, {
                            pattern: /("""|''')[\s\S]*?\1/,
                            greedy: !0,
                            inside: {}
                        }, {
                            pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                            greedy: !0,
                            inside: {}
                        }],
                        atom: {
                            pattern: /(^|[^:]):\w+/,
                            lookbehind: !0,
                            alias: "symbol"
                        },
                        "attr-name": /\w+\??:(?!:)/,
                        capture: {
                            pattern: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/,
                            lookbehind: !0,
                            alias: "function"
                        },
                        argument: {
                            pattern: /(^|[^&])&\d+/,
                            lookbehind: !0,
                            alias: "variable"
                        },
                        attribute: {
                            pattern: /@\w+/,
                            alias: "variable"
                        },
                        number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
                        keyword: /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/,
                        boolean: /\b(?:true|false|nil)\b/,
                        operator: [/\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/, {
                            pattern: /([^<])<(?!<)/,
                            lookbehind: !0
                        }, {
                            pattern: /([^>])>(?!>)/,
                            lookbehind: !0
                        }],
                        punctuation: /<<|>>|[.,%\[\]{}()]/
                    }, E.languages.elixir.string.forEach(function(e) {
                        e.inside = {
                            interpolation: {
                                pattern: /#\{[^}]+\}/,
                                inside: {
                                    delimiter: {
                                        pattern: /^#\{|\}$/,
                                        alias: "punctuation"
                                    },
                                    rest: E.languages.elixir
                                }
                            }
                        }
                    }), E.languages.elm = {
                        comment: /--.*|{-[\s\S]*?-}/,
                        char: {
                            pattern: /'(?:[^\\'\r\n]|\\(?:[abfnrtv\\']|\d+|x[0-9a-fA-F]+))'/,
                            greedy: !0
                        },
                        string: [{
                            pattern: /"""[\s\S]*?"""/,
                            greedy: !0
                        }, {
                            pattern: /"(?:[^\\"\r\n]|\\(?:[abfnrtv\\"]|\d+|x[0-9a-fA-F]+))*"/,
                            greedy: !0
                        }],
                        import_statement: {
                            pattern: /^\s*import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+(?:[A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
                            inside: {
                                keyword: /\b(?:import|as|exposing)\b/
                            }
                        },
                        keyword: /\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b/,
                        builtin: /\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
                        number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-f]+)\b/i,
                        operator: /\s\.\s|[+\-/*=.$<>:&|^?%#@~!]{2,}|[+\-/*=$<>:&|^?%#@~!]/,
                        hvariable: /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
                        constant: /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
                        punctuation: /[{}[\]|(),.:]/
                    }, E.languages.erlang = {
                        comment: /%.+/,
                        string: {
                            pattern: /"(?:\\.|[^\\"\r\n])*"/,
                            greedy: !0
                        },
                        "quoted-function": {
                            pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
                            alias: "function"
                        },
                        "quoted-atom": {
                            pattern: /'(?:\\.|[^\\'\r\n])+'/,
                            alias: "atom"
                        },
                        boolean: /\b(?:true|false)\b/,
                        keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
                        number: [/\$\\?./, /\d+#[a-z0-9]+/i, /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i],
                        function: /\b[a-z][\w@]*(?=\()/,
                        variable: {
                            pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
                            lookbehind: !0
                        },
                        operator: [/[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/, {
                            pattern: /(^|[^<])<(?!<)/,
                            lookbehind: !0
                        }, {
                            pattern: /(^|[^>])>(?!>)/,
                            lookbehind: !0
                        }],
                        atom: /\b[a-z][\w@]*/,
                        punctuation: /[()[\]{}:;,.#|]|<<|>>/
                    }, E.languages.fsharp = E.languages.extend("clike", {
                        comment: [{
                            pattern: /(^|[^\\])\(\*[\s\S]*?\*\)/,
                            lookbehind: !0
                        }, {
                            pattern: /(^|[^\\:])\/\/.*/,
                            lookbehind: !0
                        }],
                        string: {
                            pattern: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|"(?:\\[\s\S]|[^\\"])*")B?|'(?:[^\\']|\\(?:.|\d{3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|U[a-fA-F\d]{8}))'B?/,
                            greedy: !0
                        },
                        "class-name": {
                            pattern: /(\b(?:exception|inherit|interface|new|of|type)\s+|\w\s*:\s*|\s:\??>\s*)[.\w]+\b(?:\s*(?:->|\*)\s*[.\w]+\b)*(?!\s*[:.])/,
                            lookbehind: !0,
                            inside: {
                                operator: /->|\*/,
                                punctuation: /\./
                            }
                        },
                        keyword: /\b(?:let|return|use|yield)(?:!\B|\b)|\b(?:abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/,
                        number: [/\b0x[\da-fA-F]+(?:un|lf|LF)?\b/, /\b0b[01]+(?:y|uy)?\b/, /(?:\b\d+\.?\d*|\B\.\d+)(?:[fm]|e[+-]?\d+)?\b/i, /\b\d+(?:[IlLsy]|u[lsy]?|UL)?\b/],
                        operator: /([<>~&^])\1\1|([*.:<>&])\2|<-|->|[!=:]=|<?\|{1,3}>?|\??(?:<=|>=|<>|[-+*/%=<>])\??|[!?^&]|~[+~-]|:>|:\?>?/
                    }), E.languages.insertBefore("fsharp", "keyword", {
                        preprocessor: {
                            pattern: /^[^\r\n\S]*#.*/m,
                            alias: "property",
                            inside: {
                                directive: {
                                    pattern: /(\s*#)\b(?:else|endif|if|light|line|nowarn)\b/,
                                    lookbehind: !0,
                                    alias: "keyword"
                                }
                            }
                        }
                    }), E.languages.insertBefore("fsharp", "punctuation", {
                        "computation-expression": {
                            pattern: /[_a-z]\w*(?=\s*\{)/i,
                            alias: "keyword"
                        }
                    }), E.languages.insertBefore("fsharp", "string", {
                        annotation: {
                            pattern: /\[<.+?>\]/,
                            inside: {
                                punctuation: /^\[<|>\]$/,
                                "class-name": {
                                    pattern: /^\w+$|(^|;\s*)[A-Z]\w*(?=\()/,
                                    lookbehind: !0
                                },
                                "annotation-content": {
                                    pattern: /[\s\S]+/,
                                    inside: E.languages.fsharp
                                }
                            }
                        }
                    }), (l = E).languages.flow = l.languages.extend("javascript", {}), l.languages.insertBefore("flow", "keyword", {
                        type: [{
                            pattern: /\b(?:[Nn]umber|[Ss]tring|[Bb]oolean|Function|any|mixed|null|void)\b/,
                            alias: "tag"
                        }]
                    }), l.languages.flow["function-variable"].pattern = /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i, delete l.languages.flow.parameter, l.languages.insertBefore("flow", "operator", {
                        "flow-punctuation": {
                            pattern: /\{\||\|\}/,
                            alias: "punctuation"
                        }
                    }), Array.isArray(l.languages.flow.keyword) || (l.languages.flow.keyword = [l.languages.flow.keyword]), l.languages.flow.keyword.unshift({
                        pattern: /(^|[^$]\b)(?:type|opaque|declare|Class)\b(?!\$)/,
                        lookbehind: !0
                    }, {
                        pattern: /(^|[^$]\B)\$(?:await|Diff|Exact|Keys|ObjMap|PropertyType|Shape|Record|Supertype|Subtype|Enum)\b(?!\$)/,
                        lookbehind: !0
                    }), E.languages.git = {
                        comment: /^#.*/m,
                        deleted: /^[-–].*/m,
                        inserted: /^\+.*/m,
                        string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
                        command: {
                            pattern: /^.*\$ git .*$/m,
                            inside: {
                                parameter: /\s--?\w+/m
                            }
                        },
                        coord: /^@@.*@@$/m,
                        commit_sha1: /^commit \w{40}$/m
                    }, E.languages.go = E.languages.extend("clike", {
                        keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
                        builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
                        boolean: /\b(?:_|iota|nil|true|false)\b/,
                        operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
                        number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
                        string: {
                            pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
                            greedy: !0
                        }
                    }), delete E.languages.go["class-name"], E.languages.graphql = {
                        comment: /#.*/,
                        description: {
                            pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
                            greedy: !0,
                            alias: "string",
                            inside: {
                                "language-markdown": {
                                    pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
                                    lookbehind: !0,
                                    inside: E.languages.markdown
                                }
                            }
                        },
                        string: {
                            pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
                            greedy: !0
                        },
                        number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
                        boolean: /\b(?:true|false)\b/,
                        variable: /\$[a-z_]\w*/i,
                        directive: {
                            pattern: /@[a-z_]\w*/i,
                            alias: "function"
                        },
                        "attr-name": {
                            pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
                            greedy: !0
                        },
                        "class-name": {
                            pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*)[a-zA-Z_]\w*/,
                            lookbehind: !0
                        },
                        fragment: {
                            pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
                            lookbehind: !0,
                            alias: "function"
                        },
                        keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
                        operator: /[!=|&]|\.{3}/,
                        punctuation: /[!(){}\[\]:=,]/,
                        constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/
                    },
                    function(e) {
                        e.languages.ruby = e.languages.extend("clike", {
                            comment: [/#.*/, {
                                pattern: /^=begin\s[\s\S]*?^=end/m,
                                greedy: !0
                            }],
                            "class-name": {
                                pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
                                lookbehind: !0,
                                inside: {
                                    punctuation: /[.\\]/
                                }
                            },
                            keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/
                        });
                        var t = {
                            pattern: /#\{[^}]+\}/,
                            inside: {
                                delimiter: {
                                    pattern: /^#\{|\}$/,
                                    alias: "tag"
                                },
                                rest: e.languages.ruby
                            }
                        };
                        delete e.languages.ruby.function, e.languages.insertBefore("ruby", "keyword", {
                            regex: [{
                                pattern: RegExp("%r(?:" + ["([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1[gim]{0,3}", "\\((?:[^()\\\\]|\\\\[^])*\\)[gim]{0,3}", "\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}[gim]{0,3}", "\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\][gim]{0,3}", "<(?:[^<>\\\\]|\\\\[^])*>[gim]{0,3}"].join("|") + ")"),
                                greedy: !0,
                                inside: {
                                    interpolation: t
                                }
                            }, {
                                pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
                                lookbehind: !0,
                                greedy: !0
                            }],
                            variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
                            symbol: {
                                pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
                                lookbehind: !0
                            },
                            "method-definition": {
                                pattern: /(\bdef\s+)[\w.]+/,
                                lookbehind: !0,
                                inside: {
                                    function: /\w+$/,
                                    rest: e.languages.ruby
                                }
                            }
                        }), e.languages.insertBefore("ruby", "number", {
                            builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
                            constant: /\b[A-Z]\w*(?:[?!]|\b)/
                        }), e.languages.ruby.string = [{
                            pattern: RegExp("%[qQiIwWxs]?(?:" + ["([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1", "\\((?:[^()\\\\]|\\\\[^])*\\)", "\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}", "\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\]", "<(?:[^<>\\\\]|\\\\[^])*>"].join("|") + ")"),
                            greedy: !0,
                            inside: {
                                interpolation: t
                            }
                        }, {
                            pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                            greedy: !0,
                            inside: {
                                interpolation: t
                            }
                        }], e.languages.rb = e.languages.ruby
                    }(E),
                    function(e) {
                        e.languages.haml = {
                            "multiline-comment": {
                                pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ]+.+)*/,
                                lookbehind: !0,
                                alias: "comment"
                            },
                            "multiline-code": [{
                                pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ]+.+)/,
                                lookbehind: !0,
                                inside: e.languages.ruby
                            }, {
                                pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*\|[\t ]*)*/,
                                lookbehind: !0,
                                inside: e.languages.ruby
                            }],
                            filter: {
                                pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/,
                                lookbehind: !0,
                                inside: {
                                    "filter-name": {
                                        pattern: /^:[\w-]+/,
                                        alias: "variable"
                                    }
                                }
                            },
                            markup: {
                                pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
                                lookbehind: !0,
                                inside: e.languages.markup
                            },
                            doctype: {
                                pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/,
                                lookbehind: !0
                            },
                            tag: {
                                pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|\[[^\]]+\])*[\/<>]*/,
                                lookbehind: !0,
                                inside: {
                                    attributes: [{
                                        pattern: /(^|[^#])\{(?:\{[^}]+\}|[^}])+\}/,
                                        lookbehind: !0,
                                        inside: e.languages.ruby
                                    }, {
                                        pattern: /\([^)]+\)/,
                                        inside: {
                                            "attr-value": {
                                                pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
                                                lookbehind: !0
                                            },
                                            "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
                                            punctuation: /[=(),]/
                                        }
                                    }, {
                                        pattern: /\[[^\]]+\]/,
                                        inside: e.languages.ruby
                                    }],
                                    punctuation: /[<>]/
                                }
                            },
                            code: {
                                pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
                                lookbehind: !0,
                                inside: e.languages.ruby
                            },
                            interpolation: {
                                pattern: /#\{[^}]+\}/,
                                inside: {
                                    delimiter: {
                                        pattern: /^#\{|\}$/,
                                        alias: "punctuation"
                                    },
                                    rest: e.languages.ruby
                                }
                            },
                            punctuation: {
                                pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
                                lookbehind: !0
                            }
                        };
                        for (var t = ["css", {
                                filter: "coffee",
                                language: "coffeescript"
                            }, "erb", "javascript", "less", "markdown", "ruby", "scss", "textile"], n = {}, a = 0, i = t.length; a < i; a++) {
                            var r = "string" == typeof(r = t[a]) ? {
                                filter: r,
                                language: r
                            } : r;
                            e.languages[r.language] && (n["filter-" + r.filter] = {
                                pattern: RegExp("((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+".replace("{{filter_name}}", function() {
                                    return r.filter
                                })),
                                lookbehind: !0,
                                inside: {
                                    "filter-name": {
                                        pattern: /^:[\w-]+/,
                                        alias: "variable"
                                    },
                                    rest: e.languages[r.language]
                                }
                            })
                        }
                        e.languages.insertBefore("haml", "filter", n)
                    }(E), (d = E).languages.handlebars = {
                        comment: /\{\{![\s\S]*?\}\}/,
                        delimiter: {
                            pattern: /^\{\{\{?|\}\}\}?$/i,
                            alias: "punctuation"
                        },
                        string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
                        number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
                        boolean: /\b(?:true|false)\b/,
                        block: {
                            pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
                            lookbehind: !0,
                            alias: "keyword"
                        },
                        brackets: {
                            pattern: /\[[^\]]+\]/,
                            inside: {
                                punctuation: /\[|\]/,
                                variable: /[\s\S]+/
                            }
                        },
                        punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
                        variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/
                    }, d.hooks.add("before-tokenize", function(e) {
                        d.languages["markup-templating"].buildPlaceholders(e, "handlebars", /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g)
                    }), d.hooks.add("after-tokenize", function(e) {
                        d.languages["markup-templating"].tokenizePlaceholders(e, "handlebars")
                    }), E.languages.haskell = {
                        comment: {
                            pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--(?:(?=.)[^-!#$%*+=?&@|~.:<>^\\\/].*|$)|{-[\s\S]*?-})/m,
                            lookbehind: !0
                        },
                        char: {
                            pattern: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
                            alias: "string"
                        },
                        string: {
                            pattern: /"(?:[^\\"]|\\(?:\S|\s+\\))*"/,
                            greedy: !0
                        },
                        keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
                        "import-statement": {
                            pattern: /(^\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
                            lookbehind: !0,
                            inside: {
                                keyword: /\b(?:import|qualified|as|hiding)\b/
                            }
                        },
                        builtin: /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
                        number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
                        operator: /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,
                        hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
                        constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
                        punctuation: /[{}[\];(),.:]/
                    }, E.languages.hs = E.languages.haskell,
                    function(e) {
                        e.languages.http = {
                            "request-line": {
                                pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
                                inside: {
                                    property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
                                    "attr-name": /:\w+/
                                }
                            },
                            "response-status": {
                                pattern: /^HTTP\/1.[01] \d+.*/m,
                                inside: {
                                    property: {
                                        pattern: /(^HTTP\/1.[01] )\d+.*/i,
                                        lookbehind: !0
                                    }
                                }
                            },
                            "header-name": {
                                pattern: /^[\w-]+:(?=.)/m,
                                alias: "keyword"
                            }
                        };
                        var t, n, a, i, r = e.languages,
                            o = {
                                "application/javascript": r.javascript,
                                "application/json": r.json || r.javascript,
                                "application/xml": r.xml,
                                "text/xml": r.xml,
                                "text/html": r.html,
                                "text/css": r.css
                            },
                            s = {
                                "application/json": !0,
                                "application/xml": !0
                            };
                        for (var l in o) {
                            o[l] && (t = t || {}, i = s[l] ? (a = (n = l).replace(/^[a-z]+\//, ""), "(?:" + n + "|\\w+/(?:[\\w.-]+\\+)+" + a + "(?![+\\w.-]))") : l, t[l.replace(/\//g, "-")] = {
                                pattern: RegExp("(content-type:\\s*" + i + "[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*", "i"),
                                lookbehind: !0,
                                inside: o[l]
                            })
                        }
                        t && e.languages.insertBefore("http", "header-name", t)
                    }(E), c = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/, p = /\b[A-Z](?:\w*[a-z]\w*)?\b/, (u = E).languages.java = u.languages.extend("clike", {
                        "class-name": [p, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
                        keyword: c,
                        function: [u.languages.clike.function, {
                            pattern: /(\:\:)[a-z_]\w*/,
                            lookbehind: !0
                        }],
                        number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
                        operator: {
                            pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
                            lookbehind: !0
                        }
                    }), u.languages.insertBefore("java", "string", {
                        "triple-quoted-string": {
                            pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
                            greedy: !0,
                            alias: "string"
                        }
                    }), u.languages.insertBefore("java", "class-name", {
                        annotation: {
                            alias: "punctuation",
                            pattern: /(^|[^.])@\w+/,
                            lookbehind: !0
                        },
                        namespace: {
                            pattern: RegExp("(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(/<keyword>/g, function() {
                                return c.source
                            })),
                            lookbehind: !0,
                            inside: {
                                punctuation: /\./
                            }
                        },
                        generics: {
                            pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
                            inside: {
                                "class-name": p,
                                keyword: c,
                                punctuation: /[<>(),.:]/,
                                operator: /[?&|]/
                            }
                        }
                    }), E.languages.json = {
                        property: {
                            pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
                            greedy: !0
                        },
                        string: {
                            pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
                            greedy: !0
                        },
                        comment: {
                            pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
                            greedy: !0
                        },
                        number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
                        punctuation: /[{}[\],]/,
                        operator: /:/,
                        boolean: /\b(?:true|false)\b/,
                        null: {
                            pattern: /\bnull\b/,
                            alias: "keyword"
                        }
                    }, E.languages.webmanifest = E.languages.json,
                    function(e) {
                        e.languages.kotlin = e.languages.extend("clike", {
                            keyword: {
                                pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
                                lookbehind: !0
                            },
                            function: [/\w+(?=\s*\()/, {
                                pattern: /(\.)\w+(?=\s*\{)/,
                                lookbehind: !0
                            }],
                            number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
                            operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
                        }), delete e.languages.kotlin["class-name"], e.languages.insertBefore("kotlin", "string", {
                            "raw-string": {
                                pattern: /("""|''')[\s\S]*?\1/,
                                alias: "string"
                            }
                        }), e.languages.insertBefore("kotlin", "keyword", {
                            annotation: {
                                pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
                                alias: "builtin"
                            }
                        }), e.languages.insertBefore("kotlin", "function", {
                            label: {
                                pattern: /\w+@|@\w+/,
                                alias: "symbol"
                            }
                        });
                        var t = [{
                            pattern: /\$\{[^}]+\}/,
                            inside: {
                                delimiter: {
                                    pattern: /^\$\{|\}$/,
                                    alias: "variable"
                                },
                                rest: e.languages.kotlin
                            }
                        }, {
                            pattern: /\$\w+/,
                            alias: "variable"
                        }];
                        e.languages.kotlin.string.inside = e.languages.kotlin["raw-string"].inside = {
                            interpolation: t
                        }, e.languages.kt = e.languages.kotlin, e.languages.kts = e.languages.kotlin
                    }(E), m = {
                        "equation-command": {
                            pattern: f = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
                            alias: "regex"
                        }
                    }, (g = E).languages.latex = {
                        comment: /%.*/m,
                        cdata: {
                            pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
                            lookbehind: !0
                        },
                        equation: [{
                            pattern: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
                            inside: m,
                            alias: "string"
                        }, {
                            pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
                            lookbehind: !0,
                            inside: m,
                            alias: "string"
                        }],
                        keyword: {
                            pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
                            lookbehind: !0
                        },
                        url: {
                            pattern: /(\\url\{)[^}]+(?=\})/,
                            lookbehind: !0
                        },
                        headline: {
                            pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
                            lookbehind: !0,
                            alias: "class-name"
                        },
                        function: {
                            pattern: f,
                            alias: "selector"
                        },
                        punctuation: /[[\]{}&]/
                    }, g.languages.tex = g.languages.latex, g.languages.context = g.languages.latex, E.languages.less = E.languages.extend("css", {
                        comment: [/\/\*[\s\S]*?\*\//, {
                            pattern: /(^|[^\\])\/\/.*/,
                            lookbehind: !0
                        }],
                        atrule: {
                            pattern: /@[\w-]+?(?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};])*?(?=\s*\{)/,
                            inside: {
                                punctuation: /[:()]/
                            }
                        },
                        selector: {
                            pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@])*?(?=\s*\{)/,
                            inside: {
                                variable: /@+[\w-]+/
                            }
                        },
                        property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
                        operator: /[+\-*\/]/
                    }), E.languages.insertBefore("less", "property", {
                        variable: [{
                            pattern: /@[\w-]+\s*:/,
                            inside: {
                                punctuation: /:/
                            }
                        }, /@@?[\w-]+/],
                        "mixin-usage": {
                            pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
                            lookbehind: !0,
                            alias: "function"
                        }
                    }), E.languages.makefile = {
                        comment: {
                            pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
                            lookbehind: !0
                        },
                        string: {
                            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                            greedy: !0
                        },
                        builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
                        symbol: {
                            pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
                            inside: {
                                variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/
                            }
                        },
                        variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
                        keyword: [/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/, {
                            pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
                            lookbehind: !0
                        }],
                        operator: /(?:::|[?:+!])?=|[|@]/,
                        punctuation: /[:;(){}]/
                    }, b = E, y = "(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+", v = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|$)".replace(/__/g, function() {
                        return y
                    }), w = "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)", b.languages.markdown = b.languages.extend("markup", {}), b.languages.insertBefore("markdown", "prolog", {
                        blockquote: {
                            pattern: /^>(?:[\t ]*>)*/m,
                            alias: "punctuation"
                        },
                        table: {
                            pattern: RegExp("^" + v + w + "(?:" + v + ")*", "m"),
                            inside: {
                                "table-data-rows": {
                                    pattern: RegExp("^(" + v + w + ")(?:" + v + ")*$"),
                                    lookbehind: !0,
                                    inside: {
                                        "table-data": {
                                            pattern: RegExp(y),
                                            inside: b.languages.markdown
                                        },
                                        punctuation: /\|/
                                    }
                                },
                                "table-line": {
                                    pattern: RegExp("^(" + v + ")" + w + "$"),
                                    lookbehind: !0,
                                    inside: {
                                        punctuation: /\||:?-{3,}:?/
                                    }
                                },
                                "table-header-row": {
                                    pattern: RegExp("^" + v + "$"),
                                    inside: {
                                        "table-header": {
                                            pattern: RegExp(y),
                                            alias: "important",
                                            inside: b.languages.markdown
                                        },
                                        punctuation: /\|/
                                    }
                                }
                            }
                        },
                        code: [{
                            pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
                            lookbehind: !0,
                            alias: "keyword"
                        }, {
                            pattern: /``.+?``|`[^`\r\n]+`/,
                            alias: "keyword"
                        }, {
                            pattern: /^```[\s\S]*?^```$/m,
                            greedy: !0,
                            inside: {
                                "code-block": {
                                    pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                                    lookbehind: !0
                                },
                                "code-language": {
                                    pattern: /^(```).+/,
                                    lookbehind: !0
                                },
                                punctuation: /```/
                            }
                        }],
                        title: [{
                            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
                            alias: "important",
                            inside: {
                                punctuation: /==+$|--+$/
                            }
                        }, {
                            pattern: /(^\s*)#+.+/m,
                            lookbehind: !0,
                            alias: "important",
                            inside: {
                                punctuation: /^#+|#+$/
                            }
                        }],
                        hr: {
                            pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
                            lookbehind: !0,
                            alias: "punctuation"
                        },
                        list: {
                            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
                            lookbehind: !0,
                            alias: "punctuation"
                        },
                        "url-reference": {
                            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
                            inside: {
                                variable: {
                                    pattern: /^(!?\[)[^\]]+/,
                                    lookbehind: !0
                                },
                                string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                                punctuation: /^[\[\]!:]|[<>]/
                            },
                            alias: "url"
                        },
                        bold: {
                            pattern: A("\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*"),
                            lookbehind: !0,
                            greedy: !0,
                            inside: {
                                content: {
                                    pattern: /(^..)[\s\S]+(?=..$)/,
                                    lookbehind: !0,
                                    inside: {}
                                },
                                punctuation: /\*\*|__/
                            }
                        },
                        italic: {
                            pattern: A("\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*"),
                            lookbehind: !0,
                            greedy: !0,
                            inside: {
                                content: {
                                    pattern: /(^.)[\s\S]+(?=.$)/,
                                    lookbehind: !0,
                                    inside: {}
                                },
                                punctuation: /[*_]/
                            }
                        },
                        strike: {
                            pattern: A("(~~?)(?:(?!~)<inner>)+?\\2"),
                            lookbehind: !0,
                            greedy: !0,
                            inside: {
                                content: {
                                    pattern: /(^~~?)[\s\S]+(?=\1$)/,
                                    lookbehind: !0,
                                    inside: {}
                                },
                                punctuation: /~~?/
                            }
                        },
                        url: {
                            pattern: A('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)| ?\\[(?:(?!\\])<inner>)+\\])'),
                            lookbehind: !0,
                            greedy: !0,
                            inside: {
                                variable: {
                                    pattern: /(\[)[^\]]+(?=\]$)/,
                                    lookbehind: !0
                                },
                                content: {
                                    pattern: /(^!?\[)[^\]]+(?=\])/,
                                    lookbehind: !0,
                                    inside: {}
                                },
                                string: {
                                    pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
                                }
                            }
                        }
                    }), ["url", "bold", "italic", "strike"].forEach(function(t) {
                        ["url", "bold", "italic", "strike"].forEach(function(e) {
                            t !== e && (b.languages.markdown[t].inside.content.inside[e] = b.languages.markdown[e])
                        })
                    }), b.hooks.add("after-tokenize", function(e) {
                        "markdown" !== e.language && "md" !== e.language || ! function e(t) {
                            if (t && "string" != typeof t)
                                for (var n = 0, a = t.length; n < a; n++) {
                                    var i, r, o, s, l = t[n];
                                    "code" === l.type ? (i = l.content[1], r = l.content[3], i && r && "code-language" === i.type && "code-block" === r.type && "string" == typeof i.content && (o = i.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp"), s = "language-" + (o = (/[a-z][\w-]*/i.exec(o) || [""])[0].toLowerCase()), r.alias ? "string" == typeof r.alias ? r.alias = [r.alias, s] : r.alias.push(s) : r.alias = [s])) : e(l.content)
                                }
                        }(e.tokens)
                    }), b.hooks.add("wrap", function(e) {
                        if ("code-block" === e.type) {
                            for (var t = "", n = 0, a = e.classes.length; n < a; n++) {
                                var i = e.classes[n],
                                    r = /language-(.+)/.exec(i);
                                if (r) {
                                    t = r[1];
                                    break
                                }
                            }
                            var o, s, l = b.languages[t];
                            l ? (o = e.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&"), e.content = b.highlight(o, l, t)) : t && "none" !== t && b.plugins.autoloader && (s = "md-" + (new Date).valueOf() + "-" + Math.floor(1e16 * Math.random()), e.attributes.id = s, b.plugins.autoloader.loadLanguages(t, function() {
                                var e = document.getElementById(s);
                                e && (e.innerHTML = b.highlight(e.textContent, b.languages[t], t))
                            }))
                        }
                    }), b.languages.md = b.languages.markdown, E.languages.objectivec = E.languages.extend("c", {
                        keyword: /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
                        string: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
                        operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
                    }), delete E.languages.objectivec["class-name"], E.languages.objc = E.languages.objectivec, E.languages.ocaml = {
                        comment: /\(\*[\s\S]*?\*\)/,
                        string: [{
                            pattern: /"(?:\\.|[^\\\r\n"])*"/,
                            greedy: !0
                        }, {
                            pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
                            greedy: !0
                        }],
                        number: /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
                        directive: {
                            pattern: /\B#\w+/,
                            alias: "important"
                        },
                        label: {
                            pattern: /\B~\w+/,
                            alias: "function"
                        },
                        type_variable: {
                            pattern: /\B'\w+/,
                            alias: "function"
                        },
                        variant: {
                            pattern: /`\w+/,
                            alias: "variable"
                        },
                        module: {
                            pattern: /\b[A-Z]\w+/,
                            alias: "variable"
                        },
                        keyword: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
                        boolean: /\b(?:false|true)\b/,
                        operator: /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
                        punctuation: /[(){}\[\]|.,:;]|\b_\b/
                    }, E.languages.perl = {
                        comment: [{
                            pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m,
                            lookbehind: !0
                        }, {
                            pattern: /(^|[^\\$])#.*/,
                            lookbehind: !0
                        }],
                        string: [{
                            pattern: /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/,
                            greedy: !0
                        }, {
                            pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/,
                            greedy: !0
                        }, {
                            pattern: /'(?:[^'\\\r\n]|\\.)*'/,
                            greedy: !0
                        }],
                        regex: [{
                            pattern: /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,
                            greedy: !0
                        }, {
                            pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,
                            greedy: !0
                        }, {
                            pattern: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
                            lookbehind: !0,
                            greedy: !0
                        }, {
                            pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
                            lookbehind: !0,
                            greedy: !0
                        }, {
                            pattern: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
                            lookbehind: !0,
                            greedy: !0
                        }, {
                            pattern: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
                            lookbehind: !0,
                            greedy: !0
                        }, {
                            pattern: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
                            lookbehind: !0,
                            greedy: !0
                        }, {
                            pattern: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
                            lookbehind: !0,
                            greedy: !0
                        }, {
                            pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,
                            greedy: !0
                        }],
                        variable: [/[&*$@%]\{\^[A-Z]+\}/, /[&*$@%]\^[A-Z_]/, /[&*$@%]#?(?=\{)/, /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i, /[&*$@%]\d+/, /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/],
                        filehandle: {
                            pattern: /<(?![<=])\S*>|\b_\b/,
                            alias: "symbol"
                        },
                        vstring: {
                            pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,
                            alias: "string"
                        },
                        function: {
                            pattern: /sub [a-z0-9_]+/i,
                            inside: {
                                keyword: /sub/
                            }
                        },
                        keyword: /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
                        number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
                        operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
                        punctuation: /[{}[\];(),:]/
                    },
                    function(t) {
                        var e = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
                            n = [{
                                pattern: /\b(?:false|true)\b/i,
                                alias: "boolean"
                            }, /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/, /\b(?:null)\b/i],
                            a = /\b0b[01]+\b|\b0x[\da-f]+\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)*|\B\.\d+)(?:e[+-]?\d+)?/i,
                            i = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
                            r = /[{}\[\](),:;]/;
                        t.languages.php = {
                            delimiter: {
                                pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
                                alias: "important"
                            },
                            comment: e,
                            variable: /\$+(?:\w+\b|(?={))/i,
                            package: {
                                pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                                lookbehind: !0,
                                inside: {
                                    punctuation: /\\/
                                }
                            },
                            keyword: [{
                                pattern: /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,
                                alias: "type-casting",
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
                                alias: "type-hint",
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /([(,?]\s*[a-z0-9_|]\|\s*)(?:null|false)\b(?=\s*\$)/i,
                                alias: "type-hint",
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /(\)\s*:\s*\??\s*)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
                                alias: "return-type",
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /(\)\s*:\s*\??\s*[a-z0-9_|]\|\s*)(?:null|false)\b/i,
                                alias: "return-type",
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,
                                alias: "type-declaration",
                                greedy: !0
                            }, {
                                pattern: /(\|\s*)(?:null|false)\b/i,
                                alias: "type-declaration",
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /\b(?:parent|self|static)(?=\s*::)/i,
                                alias: "static-context",
                                greedy: !0
                            }, /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i],
                            "argument-name": /\b[a-z_]\w*(?=\s*:(?!:))/i,
                            "class-name": [{
                                pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
                                greedy: !0
                            }, {
                                pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
                                alias: "class-name-fully-qualified",
                                greedy: !0,
                                lookbehind: !0,
                                inside: {
                                    punctuation: /\\/
                                }
                            }, {
                                pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
                                alias: "class-name-fully-qualified",
                                greedy: !0,
                                inside: {
                                    punctuation: /\\/
                                }
                            }, {
                                pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                                alias: "class-name-fully-qualified",
                                greedy: !0,
                                lookbehind: !0,
                                inside: {
                                    punctuation: /\\/
                                }
                            }, {
                                pattern: /\b[a-z_]\w*(?=\s*\$)/i,
                                alias: "type-declaration",
                                greedy: !0
                            }, {
                                pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
                                alias: ["class-name-fully-qualified", "type-declaration"],
                                greedy: !0,
                                inside: {
                                    punctuation: /\\/
                                }
                            }, {
                                pattern: /\b[a-z_]\w*(?=\s*::)/i,
                                alias: "static-context",
                                greedy: !0
                            }, {
                                pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
                                alias: ["class-name-fully-qualified", "static-context"],
                                greedy: !0,
                                inside: {
                                    punctuation: /\\/
                                }
                            }, {
                                pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
                                alias: "type-hint",
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
                                alias: ["class-name-fully-qualified", "type-hint"],
                                greedy: !0,
                                lookbehind: !0,
                                inside: {
                                    punctuation: /\\/
                                }
                            }, {
                                pattern: /(\)\s*:\s*\??\s*)\b[a-z_]\w*(?!\\)\b/i,
                                alias: "return-type",
                                greedy: !0,
                                lookbehind: !0
                            }, {
                                pattern: /(\)\s*:\s*\??\s*)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                                alias: ["class-name-fully-qualified", "return-type"],
                                greedy: !0,
                                lookbehind: !0,
                                inside: {
                                    punctuation: /\\/
                                }
                            }],
                            constant: n,
                            function: /\w+\s*(?=\()/,
                            property: {
                                pattern: /(->)[\w]+/,
                                lookbehind: !0
                            },
                            number: a,
                            operator: i,
                            punctuation: r
                        };
                        var o = {
                                pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
                                lookbehind: !0,
                                inside: t.languages.php
                            },
                            s = [{
                                pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
                                alias: "nowdoc-string",
                                greedy: !0,
                                inside: {
                                    delimiter: {
                                        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                                        alias: "symbol",
                                        inside: {
                                            punctuation: /^<<<'?|[';]$/
                                        }
                                    }
                                }
                            }, {
                                pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
                                alias: "heredoc-string",
                                greedy: !0,
                                inside: {
                                    delimiter: {
                                        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                                        alias: "symbol",
                                        inside: {
                                            punctuation: /^<<<"?|[";]$/
                                        }
                                    },
                                    interpolation: o
                                }
                            }, {
                                pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                                alias: "backtick-quoted-string",
                                greedy: !0
                            }, {
                                pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                                alias: "single-quoted-string",
                                greedy: !0
                            }, {
                                pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                                alias: "double-quoted-string",
                                greedy: !0,
                                inside: {
                                    interpolation: o
                                }
                            }];
                        t.languages.insertBefore("php", "variable", {
                            string: s
                        }), t.languages.insertBefore("php", "variable", {
                            attribute: {
                                pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
                                greedy: !0,
                                inside: {
                                    "attribute-content": {
                                        pattern: /^(#\[)[\s\S]+(?=]$)/,
                                        lookbehind: !0,
                                        inside: {
                                            comment: e,
                                            string: s,
                                            "attribute-class-name": [{
                                                pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                                                alias: "class-name",
                                                greedy: !0,
                                                lookbehind: !0
                                            }, {
                                                pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                                                alias: ["class-name", "class-name-fully-qualified"],
                                                greedy: !0,
                                                lookbehind: !0,
                                                inside: {
                                                    punctuation: /\\/
                                                }
                                            }],
                                            constant: n,
                                            number: a,
                                            operator: i,
                                            punctuation: r
                                        }
                                    },
                                    delimiter: {
                                        pattern: /^#\[|]$/,
                                        alias: "punctuation"
                                    }
                                }
                            }
                        }), t.hooks.add("before-tokenize", function(e) {
                            /<\?/.test(e.code) && t.languages["markup-templating"].buildPlaceholders(e, "php", /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi)
                        }), t.hooks.add("after-tokenize", function(e) {
                            t.languages["markup-templating"].tokenizePlaceholders(e, "php")
                        })
                    }(E), E.languages.insertBefore("php", "variable", {
                        this: /\$this\b/,
                        global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
                        scope: {
                            pattern: /\b[\w\\]+::/,
                            inside: {
                                keyword: /static|self|parent/,
                                punctuation: /::|\\/
                            }
                        }
                    }), k = E.languages.powershell = {
                        comment: [{
                            pattern: /(^|[^`])<#[\s\S]*?#>/,
                            lookbehind: !0
                        }, {
                            pattern: /(^|[^`])#.*/,
                            lookbehind: !0
                        }],
                        string: [{
                            pattern: /"(?:`[\s\S]|[^`"])*"/,
                            greedy: !0,
                            inside: {
                                function: {
                                    pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
                                    lookbehind: !0,
                                    inside: {}
                                }
                            }
                        }, {
                            pattern: /'(?:[^']|'')*'/,
                            greedy: !0
                        }],
                        namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
                        boolean: /\$(?:true|false)\b/i,
                        variable: /\$\w+\b/,
                        function: [/\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i, /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i],
                        keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
                        operator: {
                            pattern: /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
                            lookbehind: !0
                        },
                        punctuation: /[|{}[\];(),.]/
                    }, (S = k.string[0].inside).boolean = k.boolean, S.variable = k.variable, S.function.inside = k, E.languages.processing = E.languages.extend("clike", {
                        keyword: /\b(?:break|catch|case|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
                        operator: /<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/
                    }), E.languages.insertBefore("processing", "number", {
                        constant: /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
                        type: {
                            pattern: /\b(?:boolean|byte|char|color|double|float|int|[A-Z]\w*)\b/,
                            alias: "variable"
                        }
                    }), E.languages.processing.function = /\w+(?=\s*\()/, E.languages.processing["class-name"].alias = "variable",
                    function(e) {
                        e.languages.pug = {
                            comment: {
                                pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m,
                                lookbehind: !0
                            },
                            "multiline-script": {
                                pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
                                lookbehind: !0,
                                inside: e.languages.javascript
                            },
                            filter: {
                                pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
                                lookbehind: !0,
                                inside: {
                                    "filter-name": {
                                        pattern: /^:[\w-]+/,
                                        alias: "variable"
                                    }
                                }
                            },
                            "multiline-plain-text": {
                                pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
                                lookbehind: !0
                            },
                            markup: {
                                pattern: /(^[\t ]*)<.+/m,
                                lookbehind: !0,
                                inside: e.languages.markup
                            },
                            doctype: {
                                pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/,
                                lookbehind: !0
                            },
                            "flow-control": {
                                pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
                                lookbehind: !0,
                                inside: {
                                    each: {
                                        pattern: /^each .+? in\b/,
                                        inside: {
                                            keyword: /\b(?:each|in)\b/,
                                            punctuation: /,/
                                        }
                                    },
                                    branch: {
                                        pattern: /^(?:if|unless|else|case|when|default|while)\b/,
                                        alias: "keyword"
                                    },
                                    rest: e.languages.javascript
                                }
                            },
                            keyword: {
                                pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
                                lookbehind: !0
                            },
                            mixin: [{
                                pattern: /(^[\t ]*)mixin .+/m,
                                lookbehind: !0,
                                inside: {
                                    keyword: /^mixin/,
                                    function: /\w+(?=\s*\(|\s*$)/,
                                    punctuation: /[(),.]/
                                }
                            }, {
                                pattern: /(^[\t ]*)\+.+/m,
                                lookbehind: !0,
                                inside: {
                                    name: {
                                        pattern: /^\+\w+/,
                                        alias: "function"
                                    },
                                    rest: e.languages.javascript
                                }
                            }],
                            script: {
                                pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
                                lookbehind: !0,
                                inside: e.languages.javascript
                            },
                            "plain-text": {
                                pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
                                lookbehind: !0
                            },
                            tag: {
                                pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
                                lookbehind: !0,
                                inside: {
                                    attributes: [{
                                        pattern: /&[^(]+\([^)]+\)/,
                                        inside: e.languages.javascript
                                    }, {
                                        pattern: /\([^)]+\)/,
                                        inside: {
                                            "attr-value": {
                                                pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                                                lookbehind: !0,
                                                inside: e.languages.javascript
                                            },
                                            "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
                                            punctuation: /[!=(),]+/
                                        }
                                    }],
                                    punctuation: /:/,
                                    "attr-id": /#[\w\-]+/,
                                    "attr-class": /\.[\w\-]+/
                                }
                            },
                            code: [{
                                pattern: /(^[\t ]*(?:-|!?=)).+/m,
                                lookbehind: !0,
                                inside: e.languages.javascript
                            }],
                            punctuation: /[.\-!=|]+/
                        };
                        for (var t = [{
                                filter: "atpl",
                                language: "twig"
                            }, {
                                filter: "coffee",
                                language: "coffeescript"
                            }, "ejs", "handlebars", "less", "livescript", "markdown", {
                                filter: "sass",
                                language: "scss"
                            }, "stylus"], n = {}, a = 0, i = t.length; a < i; a++) {
                            var r = "string" == typeof(r = t[a]) ? {
                                filter: r,
                                language: r
                            } : r;
                            e.languages[r.language] && (n["filter-" + r.filter] = {
                                pattern: RegExp("(^([\t ]*)):{{filter_name}}(?:(?:\r?\n|\r(?!\n))(?:\\2[\t ]+.+|\\s*?(?=\r?\n|\r)))+".replace("{{filter_name}}", function() {
                                    return r.filter
                                }), "m"),
                                lookbehind: !0,
                                inside: {
                                    "filter-name": {
                                        pattern: /^:[\w-]+/,
                                        alias: "variable"
                                    },
                                    rest: e.languages[r.language]
                                }
                            })
                        }
                        e.languages.insertBefore("pug", "filter", n)
                    }(E), E.languages.python = {
                        comment: {
                            pattern: /(^|[^\\])#.*/,
                            lookbehind: !0
                        },
                        "string-interpolation": {
                            pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
                            greedy: !0,
                            inside: {
                                interpolation: {
                                    pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
                                    lookbehind: !0,
                                    inside: {
                                        "format-spec": {
                                            pattern: /(:)[^:(){}]+(?=}$)/,
                                            lookbehind: !0
                                        },
                                        "conversion-option": {
                                            pattern: /![sra](?=[:}]$)/,
                                            alias: "punctuation"
                                        },
                                        rest: null
                                    }
                                },
                                string: /[\s\S]+/
                            }
                        },
                        "triple-quoted-string": {
                            pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
                            greedy: !0,
                            alias: "string"
                        },
                        string: {
                            pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
                            greedy: !0
                        },
                        function: {
                            pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
                            lookbehind: !0
                        },
                        "class-name": {
                            pattern: /(\bclass\s+)\w+/i,
                            lookbehind: !0
                        },
                        decorator: {
                            pattern: /(^\s*)@\w+(?:\.\w+)*/im,
                            lookbehind: !0,
                            alias: ["annotation", "punctuation"],
                            inside: {
                                punctuation: /\./
                            }
                        },
                        keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
                        builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
                        boolean: /\b(?:True|False|None)\b/,
                        number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
                        operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
                        punctuation: /[{}[\];(),.:]/
                    }, E.languages.python["string-interpolation"].inside.interpolation.inside.rest = E.languages.python, E.languages.py = E.languages.python, E.languages.r = {
                        comment: /#.*/,
                        string: {
                            pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,
                            greedy: !0
                        },
                        "percent-operator": {
                            pattern: /%[^%\s]*%/,
                            alias: "operator"
                        },
                        boolean: /\b(?:TRUE|FALSE)\b/,
                        ellipsis: /\.\.(?:\.|\d+)/,
                        number: [/\b(?:NaN|Inf)\b/, /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+\.?\d*|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/],
                        keyword: /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
                        operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
                        punctuation: /[(){}\[\],;]/
                    },
                    function(s) {
                        var e = s.util.clone(s.languages.javascript);
                        s.languages.jsx = s.languages.extend("markup", e), s.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:$-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}))*\s*\/?)?>/i, s.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i, s.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i, s.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/, s.languages.insertBefore("inside", "attr-name", {
                            spread: {
                                pattern: /\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/,
                                inside: {
                                    punctuation: /\.{3}|[{}.]/,
                                    "attr-value": /\w+/
                                }
                            }
                        }, s.languages.jsx.tag), s.languages.insertBefore("inside", "attr-value", {
                            script: {
                                pattern: /=(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\})/i,
                                inside: {
                                    "script-punctuation": {
                                        pattern: /^=(?={)/,
                                        alias: "punctuation"
                                    },
                                    rest: s.languages.jsx
                                },
                                alias: "language-javascript"
                            }
                        }, s.languages.jsx.tag);

                        function l(e) {
                            return e ? "string" == typeof e ? e : "string" == typeof e.content ? e.content : e.content.map(l).join("") : ""
                        }
                        s.hooks.add("after-tokenize", function(e) {
                            "jsx" !== e.language && "tsx" !== e.language || function e(t) {
                                for (var n = [], a = 0; a < t.length; a++) {
                                    var i, r = t[a],
                                        o = !1;
                                    "string" != typeof r && ("tag" === r.type && r.content[0] && "tag" === r.content[0].type ? "</" === r.content[0].content[0].content ? 0 < n.length && n[n.length - 1].tagName === l(r.content[0].content[1]) && n.pop() : "/>" === r.content[r.content.length - 1].content || n.push({
                                        tagName: l(r.content[0].content[1]),
                                        openedBraces: 0
                                    }) : 0 < n.length && "punctuation" === r.type && "{" === r.content ? n[n.length - 1].openedBraces++ : 0 < n.length && 0 < n[n.length - 1].openedBraces && "punctuation" === r.type && "}" === r.content ? n[n.length - 1].openedBraces-- : o = !0), (o || "string" == typeof r) && 0 < n.length && 0 === n[n.length - 1].openedBraces && (i = l(r), a < t.length - 1 && ("string" == typeof t[a + 1] || "plain-text" === t[a + 1].type) && (i += l(t[a + 1]), t.splice(a + 1, 1)), 0 < a && ("string" == typeof t[a - 1] || "plain-text" === t[a - 1].type) && (i = l(t[a - 1]) + i, t.splice(a - 1, 1), a--), t[a] = new s.Token("plain-text", i, null, i)), r.content && "string" != typeof r.content && e(r.content)
                                }
                            }(e.tokens)
                        })
                    }(E),
                    function(e) {
                        e.languages.typescript = e.languages.extend("javascript", {
                            "class-name": {
                                pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
                                lookbehind: !0,
                                greedy: !0,
                                inside: null
                            },
                            keyword: /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
                            builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
                        }), delete e.languages.typescript.parameter;
                        var t = e.languages.extend("typescript", {});
                        delete t["class-name"], e.languages.typescript["class-name"].inside = t, e.languages.insertBefore("typescript", "function", {
                            "generic-function": {
                                pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
                                greedy: !0,
                                inside: {
                                    function: /^#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/,
                                    generic: {
                                        pattern: /<[\s\S]+/,
                                        alias: "class-name",
                                        inside: t
                                    }
                                }
                            }
                        }), e.languages.ts = e.languages.typescript
                    }(E);
                var _, T, C, R, L, I, N, O, F, D, P, B, M, $, z, q, U, G, j, H, Z, W, K, V, Y, X, Q, J, ee, te, ne, ae, ie, re, oe, se, le, de = E.util.clone(E.languages.typescript);

                function ue(e) {
                    return e.replace(/__/g, function() {
                        return "(?:[\\w-]+|'[^'\n\r]*'|\"(?:\\\\.|[^\\\\\"\r\n])*\")"
                    })
                }

                function ce(e, t) {
                    t = (t || "").replace(/m/g, "") + "m";
                    var n = "([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|]|}|\\s*#))".replace(/<<prop>>/g, function() {
                        return O
                    }).replace(/<<value>>/g, function() {
                        return e
                    });
                    return RegExp(n, t)
                }

                function pe(e, t) {
                    return Array.prototype.slice.call((t || document).querySelectorAll(e))
                }

                function ge(e, t) {
                    return t = " " + t + " ", -1 < (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t)
                }

                function fe(e) {
                    e()
                }

                function me(d, e, u) {
                    var t = (e = "string" == typeof e ? e : d.getAttribute("data-line")).replace(/\s+/g, "").split(",").filter(Boolean),
                        c = +d.getAttribute("data-line-offset") || 0,
                        p = (B() ? parseInt : parseFloat)(getComputedStyle(d).lineHeight),
                        g = ge(d, "line-numbers"),
                        f = !g && d.querySelector("code") || d,
                        m = [];
                    t.forEach(function(e) {
                        var t, n, a, i, r = e.split("-"),
                            o = +r[0],
                            s = +r[1] || o,
                            l = d.querySelector('.line-highlight[data-range="' + e + '"]') || document.createElement("div");
                        m.push(function() {
                            l.setAttribute("aria-hidden", "true"), l.setAttribute("data-range", e), l.className = (u || "") + " line-highlight"
                        }), g && E.plugins.lineNumbers ? (t = E.plugins.lineNumbers.getLine(d, o), n = E.plugins.lineNumbers.getLine(d, s), t && (a = t.offsetTop + "px", m.push(function() {
                            l.style.top = a
                        })), n && (i = n.offsetTop - t.offsetTop + n.offsetHeight + "px", m.push(function() {
                            l.style.height = i
                        }))) : m.push(function() {
                            l.setAttribute("data-start", o), o < s && l.setAttribute("data-end", s), l.style.top = (o - c - 1) * p + "px", l.textContent = new Array(s - o + 2).join(" \n")
                        }), m.push(function() {
                            f.appendChild(l)
                        })
                    });
                    var a = d.id;
                    if (g && a) {
                        for (var i, n = "linkable-line-numbers", r = !1, o = d; o;) {
                            if (ge(o, n)) {
                                r = !0;
                                break
                            }
                            o = o.parentElement
                        }
                        r && (ge(d, n) || m.push(function() {
                            d.className = (d.className + " " + n).trim()
                        }), i = parseInt(d.getAttribute("data-start") || "1"), pe(".line-numbers-rows > span", d).forEach(function(e, t) {
                            var n = t + i;
                            e.onclick = function() {
                                var e = a + "." + n;
                                M = !1, location.hash = e, setTimeout(function() {
                                    M = !0
                                }, 1)
                            }
                        }))
                    }
                    return function() {
                        m.forEach(fe)
                    }
                }

                function be() {
                    var e = location.hash.slice(1);
                    pe(".temporary.line-highlight").forEach(function(e) {
                        e.parentNode.removeChild(e)
                    });
                    var t, n, a = (e.match(/\.([\d,-]+)$/) || [, ""])[1];
                    a && !document.getElementById(e) && (t = e.slice(0, e.lastIndexOf(".")), (n = document.getElementById(t)) && (n.hasAttribute("data-line") || n.setAttribute("data-line", ""), me(n, a, "temporary ")(), M && document.querySelector(".temporary.line-highlight").scrollIntoView()))
                }

                function he(e) {
                    var t;
                    0 != (e = e.filter(function(e) {
                        var t = G(e)["white-space"];
                        return "pre-wrap" === t || "pre-line" === t
                    })).length && ((t = e.map(function(e) {
                        var t = e.querySelector("code"),
                            n = e.querySelector(".line-numbers-rows");
                        if (t && n) {
                            var a = e.querySelector(".line-numbers-sizer"),
                                i = t.textContent.split(q);
                            a || ((a = document.createElement("span")).className = "line-numbers-sizer", t.appendChild(a)), a.innerHTML = "0", a.style.display = "block";
                            var r = a.getBoundingClientRect().height;
                            return a.innerHTML = "", {
                                element: e,
                                lines: i,
                                lineHeights: [],
                                oneLinerHeight: r,
                                sizer: a
                            }
                        }
                    }).filter(Boolean)).forEach(function(e) {
                        var a = e.sizer,
                            t = e.lines,
                            i = e.lineHeights,
                            r = e.oneLinerHeight;
                        i[t.length - 1] = void 0, t.forEach(function(e, t) {
                            var n;
                            e && 1 < e.length ? ((n = a.appendChild(document.createElement("span"))).style.display = "block", n.textContent = e) : i[t] = r
                        })
                    }), t.forEach(function(e) {
                        for (var t = e.sizer, n = e.lineHeights, a = 0, i = 0; i < n.length; i++) void 0 === n[i] && (n[i] = t.children[a++].getBoundingClientRect().height)
                    }), t.forEach(function(e) {
                        var t = e.sizer,
                            n = e.element.querySelector(".line-numbers-rows");
                        t.style.display = "none", t.innerHTML = "", e.lineHeights.forEach(function(e, t) {
                            n.children[t].style.height = e + "px"
                        })
                    }))
                }

                function ye(e, t) {
                    t = t || e.name, "function" != typeof e || ve(e) || ve(t) || H.push({
                        adapter: e,
                        name: t
                    })
                }

                function ve(e) {
                    if ("function" == typeof e) {
                        for (var t = 0; n = H[t++];)
                            if (n.adapter.valueOf() === e.valueOf()) return n.adapter
                    } else if ("string" == typeof e)
                        for (var n, t = 0; n = H[t++];)
                            if (n.name === e) return n.adapter;
                    return null
                }

                function we(e, t) {
                    for (var n = "", a = 0; a < t; a++) n += e;
                    return n
                }

                function ke(e) {
                    var t = e.vars = e.vars || {};
                    return t["command-line"] = t["command-line"] || {}
                }
                E.languages.tsx = E.languages.extend("jsx", de), E.languages.reason = E.languages.extend("clike", {
                        string: {
                            pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,
                            greedy: !0
                        },
                        "class-name": /\b[A-Z]\w*/,
                        keyword: /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
                        operator: /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/
                    }), E.languages.insertBefore("reason", "class-name", {
                        character: {
                            pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
                            alias: "string"
                        },
                        constructor: {
                            pattern: /\b[A-Z]\w*\b(?!\s*\.)/,
                            alias: "variable"
                        },
                        label: {
                            pattern: /\b[a-z]\w*(?=::)/,
                            alias: "symbol"
                        }
                    }), delete E.languages.reason.function,
                    function(e) {
                        for (var t = "/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/", n = 0; n < 2; n++) t = t.replace(/<self>/g, function() {
                            return t
                        });
                        t = t.replace(/<self>/g, function() {
                            return "[^\\s\\S]"
                        }), e.languages.rust = {
                            comment: [{
                                pattern: RegExp("(^|[^\\\\])" + t),
                                lookbehind: !0,
                                greedy: !0
                            }, {
                                pattern: /(^|[^\\:])\/\/.*/,
                                lookbehind: !0,
                                greedy: !0
                            }],
                            string: {
                                pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
                                greedy: !0
                            },
                            char: {
                                pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
                                greedy: !0,
                                alias: "string"
                            },
                            attribute: {
                                pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
                                greedy: !0,
                                alias: "attr-name",
                                inside: {
                                    string: null
                                }
                            },
                            "closure-params": {
                                pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
                                lookbehind: !0,
                                greedy: !0,
                                inside: {
                                    "closure-punctuation": {
                                        pattern: /^\||\|$/,
                                        alias: "punctuation"
                                    },
                                    rest: null
                                }
                            },
                            "lifetime-annotation": {
                                pattern: /'\w+/,
                                alias: "symbol"
                            },
                            "fragment-specifier": {
                                pattern: /(\$\w+:)[a-z]+/,
                                lookbehind: !0,
                                alias: "punctuation"
                            },
                            variable: /\$\w+/,
                            "function-definition": {
                                pattern: /(\bfn\s+)\w+/,
                                lookbehind: !0,
                                alias: "function"
                            },
                            "type-definition": {
                                pattern: /(\b(?:enum|struct|union)\s+)\w+/,
                                lookbehind: !0,
                                alias: "class-name"
                            },
                            "module-declaration": [{
                                pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
                                lookbehind: !0,
                                alias: "namespace"
                            }, {
                                pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
                                lookbehind: !0,
                                alias: "namespace",
                                inside: {
                                    punctuation: /::/
                                }
                            }],
                            keyword: [/\b(?:abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|Self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/, /\b(?:[ui](?:8|16|32|64|128|size)|f(?:32|64)|bool|char|str)\b/],
                            function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
                            macro: {
                                pattern: /\w+!/,
                                alias: "property"
                            },
                            constant: /\b[A-Z_][A-Z_\d]+\b/,
                            "class-name": /\b[A-Z]\w*\b/,
                            namespace: {
                                pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
                                inside: {
                                    punctuation: /::/
                                }
                            },
                            number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64|size)?|f32|f64))?\b/,
                            boolean: /\b(?:false|true)\b/,
                            punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
                            operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
                        }, e.languages.rust["closure-params"].inside.rest = e.languages.rust, e.languages.rust.attribute.inside.string = e.languages.rust.string
                    }(E),
                    function(e) {
                        e.languages.sass = e.languages.extend("css", {
                            comment: {
                                pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
                                lookbehind: !0
                            }
                        }), e.languages.insertBefore("sass", "atrule", {
                            "atrule-line": {
                                pattern: /^(?:[ \t]*)[@+=].+/m,
                                inside: {
                                    atrule: /(?:@[\w-]+|[+=])/m
                                }
                            }
                        }), delete e.languages.sass.atrule;
                        var t = /\$[-\w]+|#\{\$[-\w]+\}/,
                            n = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
                                pattern: /(\s+)-(?=\s)/,
                                lookbehind: !0
                            }];
                        e.languages.insertBefore("sass", "property", {
                            "variable-line": {
                                pattern: /^[ \t]*\$.+/m,
                                inside: {
                                    punctuation: /:/,
                                    variable: t,
                                    operator: n
                                }
                            },
                            "property-line": {
                                pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
                                inside: {
                                    property: [/[^:\s]+(?=\s*:)/, {
                                        pattern: /(:)[^:\s]+/,
                                        lookbehind: !0
                                    }],
                                    punctuation: /:/,
                                    variable: t,
                                    operator: n,
                                    important: e.languages.sass.important
                                }
                            }
                        }), delete e.languages.sass.property, delete e.languages.sass.important, e.languages.insertBefore("sass", "punctuation", {
                            selector: {
                                pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
                                lookbehind: !0
                            }
                        })
                    }(E), E.languages.scss = E.languages.extend("css", {
                        comment: {
                            pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                            lookbehind: !0
                        },
                        atrule: {
                            pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
                            inside: {
                                rule: /@[\w-]+/
                            }
                        },
                        url: /(?:[-a-z]+-)?url(?=\()/i,
                        selector: {
                            pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
                            inside: {
                                parent: {
                                    pattern: /&/,
                                    alias: "important"
                                },
                                placeholder: /%[-\w]+/,
                                variable: /\$[-\w]+|#\{\$[-\w]+\}/
                            }
                        },
                        property: {
                            pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
                            inside: {
                                variable: /\$[-\w]+|#\{\$[-\w]+\}/
                            }
                        }
                    }), E.languages.insertBefore("scss", "atrule", {
                        keyword: [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
                            pattern: /( +)(?:from|through)(?= )/,
                            lookbehind: !0
                        }]
                    }), E.languages.insertBefore("scss", "important", {
                        variable: /\$[-\w]+|#\{\$[-\w]+\}/
                    }), E.languages.insertBefore("scss", "function", {
                        placeholder: {
                            pattern: /%[-\w]+/,
                            alias: "selector"
                        },
                        statement: {
                            pattern: /\B!(?:default|optional)\b/i,
                            alias: "keyword"
                        },
                        boolean: /\b(?:true|false)\b/,
                        null: {
                            pattern: /\bnull\b/,
                            alias: "keyword"
                        },
                        operator: {
                            pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
                            lookbehind: !0
                        }
                    }), E.languages.scss.atrule.inside.rest = E.languages.scss, E.languages.scheme = {
                        comment: /;.*|#;\s*\((?:[^()]|\([^()]*\))*\)|#\|(?:[^#|]|#(?!\|)|\|(?!#)|#\|(?:[^#|]|#(?!\|)|\|(?!#))*\|#)*\|#/,
                        string: {
                            pattern: /"(?:[^"\\]|\\.)*"/,
                            greedy: !0
                        },
                        symbol: {
                            pattern: /'[^()#'\s]+/,
                            greedy: !0
                        },
                        character: {
                            pattern: /#\\(?:[ux][a-fA-F\d]+\b|[-a-zA-Z]+\b|\S)/,
                            greedy: !0,
                            alias: "string"
                        },
                        "lambda-parameter": [{
                            pattern: /(\(lambda\s+)(?:[^|()'\s]+|\|(?:[^\\|]|\\.)*\|)/,
                            lookbehind: !0
                        }, {
                            pattern: /(\(lambda\s+\()[^()']+/,
                            lookbehind: !0
                        }],
                        keyword: {
                            pattern: /(\()(?:begin|case(?:-lambda)?|cond(?:-expand)?|define(?:-library|-macro|-record-type|-syntax|-values)?|defmacro|delay(?:-force)?|do|else|export|except|guard|if|import|include(?:-ci|-library-declarations)?|lambda|let(?:rec)?(?:-syntax|-values|\*)?|let\*-values|only|parameterize|prefix|(?:quasi-?)?quote|rename|set!|syntax-(?:case|rules)|unless|unquote(?:-splicing)?|when)(?=[()\s]|$)/,
                            lookbehind: !0
                        },
                        builtin: {
                            pattern: /(\()(?:abs|and|append|apply|assoc|ass[qv]|binary-port\?|boolean=?\?|bytevector(?:-append|-copy|-copy!|-length|-u8-ref|-u8-set!|\?)?|caar|cadr|call-with-(?:current-continuation|port|values)|call\/cc|car|cdar|cddr|cdr|ceiling|char(?:->integer|-ready\?|\?|<\?|<=\?|=\?|>\?|>=\?)|close-(?:input-port|output-port|port)|complex\?|cons|current-(?:error|input|output)-port|denominator|dynamic-wind|eof-object\??|eq\?|equal\?|eqv\?|error|error-object(?:-irritants|-message|\?)|eval|even\?|exact(?:-integer-sqrt|-integer\?|\?)?|expt|features|file-error\?|floor(?:-quotient|-remainder|\/)?|flush-output-port|for-each|gcd|get-output-(?:bytevector|string)|inexact\??|input-port(?:-open\?|\?)|integer(?:->char|\?)|lcm|length|list(?:->string|->vector|-copy|-ref|-set!|-tail|\?)?|make-(?:bytevector|list|parameter|string|vector)|map|max|member|memq|memv|min|modulo|negative\?|newline|not|null\?|number(?:->string|\?)|numerator|odd\?|open-(?:input|output)-(?:bytevector|string)|or|output-port(?:-open\?|\?)|pair\?|peek-char|peek-u8|port\?|positive\?|procedure\?|quotient|raise|raise-continuable|rational\?|rationalize|read-(?:bytevector|bytevector!|char|error\?|line|string|u8)|real\?|remainder|reverse|round|set-c[ad]r!|square|string(?:->list|->number|->symbol|->utf8|->vector|-append|-copy|-copy!|-fill!|-for-each|-length|-map|-ref|-set!|\?|<\?|<=\?|=\?|>\?|>=\?)?|substring|symbol(?:->string|\?|=\?)|syntax-error|textual-port\?|truncate(?:-quotient|-remainder|\/)?|u8-ready\?|utf8->string|values|vector(?:->list|->string|-append|-copy|-copy!|-fill!|-for-each|-length|-map|-ref|-set!|\?)?|with-exception-handler|write-(?:bytevector|char|string|u8)|zero\?)(?=[()\s]|$)/,
                            lookbehind: !0
                        },
                        operator: {
                            pattern: /(\()(?:[-+*%/]|[<>]=?|=>?)(?=[()\s]|$)/,
                            lookbehind: !0
                        },
                        number: {
                            pattern: /(^|[\s()])(?:(?:#d(?:#[ei])?|#[ei](?:#d)?)?[+-]?(?:(?:\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\/\d+)(?:[+-](?:\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\/\d+)i)?|(?:\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\/\d+)i)|(?:#[box](?:#[ei])?|#[ei](?:#[box])?)[+-]?(?:[\da-fA-F]+(?:\/[\da-fA-F]+)?(?:[+-][\da-fA-F]+(?:\/[\da-fA-F]+)?i)?|[\da-fA-F]+(?:\/[\da-fA-F]+)?i))(?=[()\s]|$)/,
                            lookbehind: !0
                        },
                        boolean: {
                            pattern: /(^|[\s()])#(?:[ft]|false|true)(?=[()\s]|$)/,
                            lookbehind: !0
                        },
                        function: {
                            pattern: /(\()(?:[^|()'\s]+|\|(?:[^\\|]|\\.)*\|)(?=[()\s]|$)/,
                            lookbehind: !0
                        },
                        identifier: {
                            pattern: /(^|[\s()])\|(?:[^\\|]|\\.)*\|(?=[()\s]|$)/,
                            lookbehind: !0,
                            greedy: !0
                        },
                        punctuation: /[()']/
                    }, E.languages.sql = {
                        comment: {
                            pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
                            lookbehind: !0
                        },
                        variable: [{
                            pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
                            greedy: !0
                        }, /@[\w.$]+/],
                        string: {
                            pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
                            greedy: !0,
                            lookbehind: !0
                        },
                        function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
                        keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
                        boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
                        number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
                        operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
                        punctuation: /[;[\]()`,.]/
                    }, _ = E, (R = {
                        comment: {
                            pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                            lookbehind: !0
                        },
                        url: {
                            pattern: /url\((["']?).*?\1\)/i,
                            greedy: !0
                        },
                        string: {
                            pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
                            greedy: !0
                        },
                        interpolation: null,
                        func: null,
                        important: /\B!(?:important|optional)\b/i,
                        keyword: {
                            pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
                            lookbehind: !0
                        },
                        hexcode: /#[\da-f]{3,6}/i,
                        color: [/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i, {
                            pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
                            inside: {
                                unit: T = {
                                    pattern: /(\b\d+)(?:%|[a-z]+)/,
                                    lookbehind: !0
                                },
                                number: C = {
                                    pattern: /(^|[^\w.-])-?\d*\.?\d+/,
                                    lookbehind: !0
                                },
                                function: /[\w-]+(?=\()/,
                                punctuation: /[(),]/
                            }
                        }],
                        entity: /\\[\da-f]{1,8}/i,
                        unit: T,
                        boolean: /\b(?:true|false)\b/,
                        operator: [/~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/],
                        number: C,
                        punctuation: /[{}()\[\];:,]/
                    }).interpolation = {
                        pattern: /\{[^\r\n}:]+\}/,
                        alias: "variable",
                        inside: {
                            delimiter: {
                                pattern: /^{|}$/,
                                alias: "punctuation"
                            },
                            rest: R
                        }
                    }, R.func = {
                        pattern: /[\w-]+\([^)]*\).*/,
                        inside: {
                            function: /^[^(]+/,
                            rest: R
                        }
                    }, _.languages.stylus = {
                        "atrule-declaration": {
                            pattern: /(^\s*)@.+/m,
                            lookbehind: !0,
                            inside: {
                                atrule: /^@[\w-]+/,
                                rest: R
                            }
                        },
                        "variable-declaration": {
                            pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
                            lookbehind: !0,
                            inside: {
                                variable: /^\S+/,
                                rest: R
                            }
                        },
                        statement: {
                            pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
                            lookbehind: !0,
                            inside: {
                                keyword: /^\S+/,
                                rest: R
                            }
                        },
                        "property-declaration": {
                            pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(?:\r?\n|\r)(?:\{|\2[ \t]+)))/m,
                            lookbehind: !0,
                            inside: {
                                property: {
                                    pattern: /^[^\s:]+/,
                                    inside: {
                                        interpolation: R.interpolation
                                    }
                                },
                                rest: R
                            }
                        },
                        selector: {
                            pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
                            lookbehind: !0,
                            inside: {
                                interpolation: R.interpolation,
                                comment: R.comment,
                                punctuation: /[{},]/
                            }
                        },
                        func: R.func,
                        string: R.string,
                        comment: {
                            pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                            lookbehind: !0,
                            greedy: !0
                        },
                        interpolation: R.interpolation,
                        punctuation: /[{}()\[\];:.]/
                    }, E.languages.swift = E.languages.extend("clike", {
                        string: {
                            pattern: /("|')(?:\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                            greedy: !0,
                            inside: {
                                interpolation: {
                                    pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
                                    inside: {
                                        delimiter: {
                                            pattern: /^\\\(|\)$/,
                                            alias: "variable"
                                        }
                                    }
                                }
                            }
                        },
                        keyword: /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
                        number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
                        constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
                        atrule: /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
                        builtin: /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/
                    }), E.languages.swift.string.inside.interpolation.inside.rest = E.languages.swift,
                    function() {
                        function e(e, t) {
                            return RegExp(e.replace(/<MOD>/g, function() {
                                return "(?:\\([^|()\n]+\\)|\\[[^\\]\n]+\\]|\\{[^}\n]+\\})"
                            }).replace(/<PAR>/g, function() {
                                return "(?:\\)|\\((?![^|()\n]+\\)))"
                            }), t || "")
                        }
                        var t = {
                                css: {
                                    pattern: /\{[^}]+\}/,
                                    inside: {
                                        rest: E.languages.css
                                    }
                                },
                                "class-id": {
                                    pattern: /(\()[^)]+(?=\))/,
                                    lookbehind: !0,
                                    alias: "attr-value"
                                },
                                lang: {
                                    pattern: /(\[)[^\]]+(?=\])/,
                                    lookbehind: !0,
                                    alias: "attr-value"
                                },
                                punctuation: /[\\\/]\d+|\S/
                            },
                            n = E.languages.textile = E.languages.extend("markup", {
                                phrase: {
                                    pattern: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,
                                    lookbehind: !0,
                                    inside: {
                                        "block-tag": {
                                            pattern: e("^[a-z]\\w*(?:<MOD>|<PAR>|[<>=])*\\."),
                                            inside: {
                                                modifier: {
                                                    pattern: e("(^[a-z]\\w*)(?:<MOD>|<PAR>|[<>=])+(?=\\.)"),
                                                    lookbehind: !0,
                                                    inside: t
                                                },
                                                tag: /^[a-z]\w*/,
                                                punctuation: /\.$/
                                            }
                                        },
                                        list: {
                                            pattern: e("^[*#]+<MOD>*\\s+.+", "m"),
                                            inside: {
                                                modifier: {
                                                    pattern: e("(^[*#]+)<MOD>+"),
                                                    lookbehind: !0,
                                                    inside: t
                                                },
                                                punctuation: /^[*#]+/
                                            }
                                        },
                                        table: {
                                            pattern: e("^(?:(?:<MOD>|<PAR>|[<>=^~])+\\.\\s*)?(?:\\|(?:(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+\\.)?[^|]*)+\\|", "m"),
                                            inside: {
                                                modifier: {
                                                    pattern: e("(^|\\|(?:\r?\n|\r)?)(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+(?=\\.)"),
                                                    lookbehind: !0,
                                                    inside: t
                                                },
                                                punctuation: /\||^\./
                                            }
                                        },
                                        inline: {
                                            pattern: e("(^|[^a-zA-Z\\d])(\\*\\*|__|\\?\\?|[*_%@+\\-^~])<MOD>*.+?\\2(?![a-zA-Z\\d])"),
                                            lookbehind: !0,
                                            inside: {
                                                bold: {
                                                    pattern: e("(^(\\*\\*?)<MOD>*).+?(?=\\2)"),
                                                    lookbehind: !0
                                                },
                                                italic: {
                                                    pattern: e("(^(__?)<MOD>*).+?(?=\\2)"),
                                                    lookbehind: !0
                                                },
                                                cite: {
                                                    pattern: e("(^\\?\\?<MOD>*).+?(?=\\?\\?)"),
                                                    lookbehind: !0,
                                                    alias: "string"
                                                },
                                                code: {
                                                    pattern: e("(^@<MOD>*).+?(?=@)"),
                                                    lookbehind: !0,
                                                    alias: "keyword"
                                                },
                                                inserted: {
                                                    pattern: e("(^\\+<MOD>*).+?(?=\\+)"),
                                                    lookbehind: !0
                                                },
                                                deleted: {
                                                    pattern: e("(^-<MOD>*).+?(?=-)"),
                                                    lookbehind: !0
                                                },
                                                span: {
                                                    pattern: e("(^%<MOD>*).+?(?=%)"),
                                                    lookbehind: !0
                                                },
                                                modifier: {
                                                    pattern: e("(^\\*\\*|__|\\?\\?|[*_%@+\\-^~])<MOD>+"),
                                                    lookbehind: !0,
                                                    inside: t
                                                },
                                                punctuation: /[*_%?@+\-^~]+/
                                            }
                                        },
                                        "link-ref": {
                                            pattern: /^\[[^\]]+\]\S+$/m,
                                            inside: {
                                                string: {
                                                    pattern: /(\[)[^\]]+(?=\])/,
                                                    lookbehind: !0
                                                },
                                                url: {
                                                    pattern: /(\])\S+$/,
                                                    lookbehind: !0
                                                },
                                                punctuation: /[\[\]]/
                                            }
                                        },
                                        link: {
                                            pattern: e('"<MOD>*[^"]+":.+?(?=[^\\w/]?(?:\\s|$))'),
                                            inside: {
                                                text: {
                                                    pattern: e('(^"<MOD>*)[^"]+(?=")'),
                                                    lookbehind: !0
                                                },
                                                modifier: {
                                                    pattern: e('(^")<MOD>+'),
                                                    lookbehind: !0,
                                                    inside: t
                                                },
                                                url: {
                                                    pattern: /(:).+/,
                                                    lookbehind: !0
                                                },
                                                punctuation: /[":]/
                                            }
                                        },
                                        image: {
                                            pattern: e("!(?:<MOD>|<PAR>|[<>=])*[^!\\s()]+(?:\\([^)]+\\))?!(?::.+?(?=[^\\w/]?(?:\\s|$)))?"),
                                            inside: {
                                                source: {
                                                    pattern: e("(^!(?:<MOD>|<PAR>|[<>=])*)[^!\\s()]+(?:\\([^)]+\\))?(?=!)"),
                                                    lookbehind: !0,
                                                    alias: "url"
                                                },
                                                modifier: {
                                                    pattern: e("(^!)(?:<MOD>|<PAR>|[<>=])+"),
                                                    lookbehind: !0,
                                                    inside: t
                                                },
                                                url: {
                                                    pattern: /(:).+/,
                                                    lookbehind: !0
                                                },
                                                punctuation: /[!:]/
                                            }
                                        },
                                        footnote: {
                                            pattern: /\b\[\d+\]/,
                                            alias: "comment",
                                            inside: {
                                                punctuation: /\[|\]/
                                            }
                                        },
                                        acronym: {
                                            pattern: /\b[A-Z\d]+\([^)]+\)/,
                                            inside: {
                                                comment: {
                                                    pattern: /(\()[^)]+(?=\))/,
                                                    lookbehind: !0
                                                },
                                                punctuation: /[()]/
                                            }
                                        },
                                        mark: {
                                            pattern: /\b\((?:TM|R|C)\)/,
                                            alias: "comment",
                                            inside: {
                                                punctuation: /[()]/
                                            }
                                        }
                                    }
                                }
                            }),
                            a = n.phrase.inside,
                            i = {
                                inline: a.inline,
                                link: a.link,
                                image: a.image,
                                footnote: a.footnote,
                                acronym: a.acronym,
                                mark: a.mark
                            };
                        n.tag.pattern = /<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i;
                        var r = a.inline.inside;
                        r.bold.inside = i, r.italic.inside = i, r.inserted.inside = i, r.deleted.inside = i, r.span.inside = i;
                        var o = a.table.inside;
                        o.inline = i.inline, o.link = i.link, o.image = i.image, o.footnote = i.footnote, o.acronym = i.acronym, o.mark = i.mark
                    }(), E.languages.toml = {
                        comment: {
                            pattern: /#.*/,
                            greedy: !0
                        },
                        table: {
                            pattern: RegExp(ue("(^\\s*\\[\\s*(?:\\[\\s*)?)__(?:\\s*\\.\\s*__)*(?=\\s*\\])"), "m"),
                            lookbehind: !0,
                            greedy: !0,
                            alias: "class-name"
                        },
                        key: {
                            pattern: RegExp(ue("(^\\s*|[{,]\\s*)__(?:\\s*\\.\\s*__)*(?=\\s*=)"), "m"),
                            lookbehind: !0,
                            greedy: !0,
                            alias: "property"
                        },
                        string: {
                            pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
                            greedy: !0
                        },
                        date: [{
                            pattern: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,
                            alias: "number"
                        }, {
                            pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,
                            alias: "number"
                        }],
                        number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
                        boolean: /\b(?:true|false)\b/,
                        punctuation: /[.,=[\]{}]/
                    }, E.languages.twig = {
                        comment: /\{#[\s\S]*?#\}/,
                        tag: {
                            pattern: /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/,
                            inside: {
                                ld: {
                                    pattern: /^(?:\{\{-?|\{%-?\s*\w+)/,
                                    inside: {
                                        punctuation: /^(?:\{\{|\{%)-?/,
                                        keyword: /\w+/
                                    }
                                },
                                rd: {
                                    pattern: /-?(?:%\}|\}\})$/,
                                    inside: {
                                        punctuation: /.+/
                                    }
                                },
                                string: {
                                    pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
                                    inside: {
                                        punctuation: /^['"]|['"]$/
                                    }
                                },
                                keyword: /\b(?:even|if|odd)\b/,
                                boolean: /\b(?:true|false|null)\b/,
                                number: /\b0x[\dA-Fa-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?/,
                                operator: [{
                                    pattern: /(\s)(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
                                    lookbehind: !0
                                }, /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/],
                                property: /\b[a-zA-Z_]\w*\b/,
                                punctuation: /[()\[\]{}:.,]/
                            }
                        },
                        other: {
                            pattern: /\S(?:[\s\S]*\S)?/,
                            inside: E.languages.markup
                        }
                    }, E.languages.vim = {
                        string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
                        comment: /".*/,
                        function: /\w+(?=\()/,
                        keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
                        builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
                        number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
                        operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
                        punctuation: /[{}[\](),;:]/
                    }, E.languages["visual-basic"] = {
                        comment: {
                            pattern: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i,
                            inside: {
                                keyword: /^REM/i
                            }
                        },
                        directive: {
                            pattern: /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
                            alias: "comment",
                            greedy: !0
                        },
                        string: {
                            pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i,
                            greedy: !0
                        },
                        date: {
                            pattern: /#[^\S\r\n]*(?:\d+([/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?)[^\S\r\n]*#/i,
                            alias: "builtin"
                        },
                        number: /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
                        boolean: /\b(?:True|False|Nothing)\b/i,
                        keyword: /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Currency|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|Type|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Until|Xor)\b/i,
                        operator: [/[+\-*/\\^<=>&#@$%!]/, {
                            pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/,
                            lookbehind: !0
                        }],
                        punctuation: /[{}().,:?]/
                    }, E.languages.vb = E.languages["visual-basic"], E.languages.vba = E.languages["visual-basic"], E.languages.wasm = {
                        comment: [/\(;[\s\S]*?;\)/, {
                            pattern: /;;.*/,
                            greedy: !0
                        }],
                        string: {
                            pattern: /"(?:\\[\s\S]|[^"\\])*"/,
                            greedy: !0
                        },
                        keyword: [{
                            pattern: /\b(?:align|offset)=/,
                            inside: {
                                operator: /=/
                            }
                        }, {
                            pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
                            inside: {
                                punctuation: /\./
                            }
                        }, /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/],
                        variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
                        number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
                        punctuation: /[()]/
                    }, L = E, O = "(?:" + (N = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/).source + "(?:[ \t]+" + (I = /[*&][^\s[\]{},]+/).source + ")?|" + I.source + "(?:[ \t]+" + N.source + ")?)", F = "(?:[^\\s\\x00-\\x08\\x0e-\\x1f!\"#%&'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*".replace(/<PLAIN>/g, function() {
                        return "[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]"
                    }), D = "\"(?:[^\"\\\\\r\n]|\\\\.)*\"|'(?:[^'\\\\\r\n]|\\\\.)*'", L.languages.yaml = {
                        scalar: {
                            pattern: RegExp("([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\\2[^\r\n]+)*)".replace(/<<prop>>/g, function() {
                                return O
                            })),
                            lookbehind: !0,
                            alias: "string"
                        },
                        comment: /#.*/,
                        key: {
                            pattern: RegExp("((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\\s*:\\s)".replace(/<<prop>>/g, function() {
                                return O
                            }).replace(/<<key>>/g, function() {
                                return "(?:" + F + "|" + D + ")"
                            })),
                            lookbehind: !0,
                            greedy: !0,
                            alias: "atrule"
                        },
                        directive: {
                            pattern: /(^[ \t]*)%.+/m,
                            lookbehind: !0,
                            alias: "important"
                        },
                        datetime: {
                            pattern: ce("\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?)?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?"),
                            lookbehind: !0,
                            alias: "number"
                        },
                        boolean: {
                            pattern: ce("true|false", "i"),
                            lookbehind: !0,
                            alias: "important"
                        },
                        null: {
                            pattern: ce("null|~", "i"),
                            lookbehind: !0,
                            alias: "important"
                        },
                        string: {
                            pattern: ce(D),
                            lookbehind: !0,
                            greedy: !0
                        },
                        number: {
                            pattern: ce("[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+\\.?\\d*|\\.?\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)", "i"),
                            lookbehind: !0
                        },
                        tag: N,
                        important: I,
                        punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
                    }, L.languages.yml = L.languages.yaml, "undefined" != typeof self && self.Prism && self.document && document.querySelector && (B = function() {
                        var e;
                        return void 0 === P && ((e = document.createElement("div")).style.fontSize = "13px", e.style.lineHeight = "1.5", e.style.padding = "0", e.style.border = "0", e.innerHTML = "&nbsp;<br />&nbsp;", document.body.appendChild(e), P = 38 === e.offsetHeight, document.body.removeChild(e)), P
                    }, M = !0, $ = 0, E.hooks.add("before-sanity-check", function(e) {
                        var t, n = e.element.parentNode,
                            a = n && n.getAttribute("data-line");
                        n && a && /pre/i.test(n.nodeName) && (t = 0, pe(".line-highlight", n).forEach(function(e) {
                            t += e.textContent.length, e.parentNode.removeChild(e)
                        }), t && /^( \n)+$/.test(e.code.slice(-t)) && (e.code = e.code.slice(0, -t)))
                    }), E.hooks.add("complete", function e(t) {
                        var n, a, i = t.element.parentNode,
                            r = i && i.getAttribute("data-line");
                        i && r && /pre/i.test(i.nodeName) && (clearTimeout($), n = E.plugins.lineNumbers, a = t.plugins && t.plugins.lineNumbers, ge(i, "line-numbers") && n && !a ? E.hooks.add("line-numbers", e) : (me(i, r)(), $ = setTimeout(be, 1)))
                    }), window.addEventListener("hashchange", be), window.addEventListener("resize", function() {
                        pe("pre[data-line]").map(function(e) {
                            return me(e)
                        }).forEach(fe)
                    })), "undefined" != typeof self && self.Prism && self.document && (z = "line-numbers", q = /\n(?!$)/g, U = E.plugins.lineNumbers = {
                        getLine: function(e, t) {
                            if ("PRE" === e.tagName && e.classList.contains(z)) {
                                var n = e.querySelector(".line-numbers-rows"),
                                    a = parseInt(e.getAttribute("data-start"), 10) || 1,
                                    i = a + (n.children.length - 1);
                                t < a && (t = a), i < t && (t = i);
                                var r = t - a;
                                return n.children[r]
                            }
                        },
                        resize: function(e) {
                            he([e])
                        },
                        assumeViewportIndependence: !0
                    }, G = function(e) {
                        return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null
                    }, j = void 0, window.addEventListener("resize", function() {
                        U.assumeViewportIndependence && j === window.innerWidth || (j = window.innerWidth, he(Array.prototype.slice.call(document.querySelectorAll("pre." + z))))
                    }), E.hooks.add("complete", function(e) {
                        var t, n, a, i, r, o;
                        !e.code || (n = (t = e.element).parentNode) && /pre/i.test(n.nodeName) && !t.querySelector(".line-numbers-rows") && E.util.isActive(t, z) && (t.classList.remove(z), n.classList.add(z), r = (i = e.code.match(q)) ? i.length + 1 : 1, o = new Array(r + 1).join("<span></span>"), (a = document.createElement("span")).setAttribute("aria-hidden", "true"), a.className = "line-numbers-rows", a.innerHTML = o, n.hasAttribute("data-start") && (n.style.counterReset = "linenumber " + (parseInt(n.getAttribute("data-start"), 10) - 1)), e.element.appendChild(a), he([n]), E.hooks.run("line-numbers", e))
                    }), E.hooks.add("line-numbers", function(e) {
                        e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0
                    })), "undefined" != typeof self && self.Prism && self.document && (H = [], ye(function(e, t) {
                        if (e && e.meta && e.data) {
                            if (e.meta.status && 400 <= e.meta.status) return "Error: " + (e.data.message || e.meta.status);
                            if ("string" == typeof e.data.content) return "function" == typeof atob ? atob(e.data.content.replace(/\s/g, "")) : "Your browser cannot decode base64"
                        }
                        return null
                    }, "github"), ye(function(e, t) {
                        if (e && e.meta && e.data && e.data.files) {
                            if (e.meta.status && 400 <= e.meta.status) return "Error: " + (e.data.message || e.meta.status);
                            var n = e.data.files,
                                a = t.getAttribute("data-filename");
                            if (null == a)
                                for (var i in n)
                                    if (n.hasOwnProperty(i)) {
                                        a = i;
                                        break
                                    }
                            return void 0 !== n[a] ? n[a].content : "Error: unknown or missing gist file " + a
                        }
                        return null
                    }, "gist"), ye(function(e, t) {
                        return e && e.node && "string" == typeof e.data ? e.data : null
                    }, "bitbucket"), Z = 0, V = "failed", Y = "pre[data-jsonp]:not([" + (W = "data-jsonp-status") + '="loaded"]):not([' + W + '="' + (K = "loading") + '"])', E.hooks.add("before-highlightall", function(e) {
                        e.selector += ", " + Y
                    }), E.hooks.add("before-sanity-check", function(e) {
                        var i = e.element;
                        if (i.matches(Y)) {
                            e.code = "", i.setAttribute(W, K);
                            var r = i.appendChild(document.createElement("CODE"));
                            r.textContent = "Loading…";
                            var t = e.language;
                            r.className = "language-" + t;
                            var n = E.plugins.autoloader;
                            n && n.loadLanguages(t);
                            var a = i.getAttribute("data-adapter"),
                                o = null;
                            if (a) {
                                if ("function" != typeof window[a]) return i.setAttribute(W, V), void(r.textContent = '✖ Error: JSONP adapter function "' + a + "\" doesn't exist");
                                o = window[a]
                            }
                            var s = "prismjsonp" + Z++,
                                l = document.createElement("a"),
                                d = l.href = i.getAttribute("data-jsonp");
                            l.href += (l.search ? "&" : "?") + (i.getAttribute("data-callback") || "callback") + "=" + s;
                            var u = setTimeout(function() {
                                    i.setAttribute(W, V), r.textContent = "✖ Error: Timeout loading " + d
                                }, E.plugins.jsonphighlight.timeout),
                                c = document.createElement("script");
                            c.src = l.href, window[s] = function(e) {
                                document.head.removeChild(c), clearTimeout(u), delete window[s];
                                var t = null;
                                if (o) t = o(e, i);
                                else
                                    for (var n = 0, a = H.length; n < a && null === (t = H[n].adapter(e, i)); n++);
                                null === t ? (i.setAttribute(W, V), r.textContent = "✖ Error: Cannot parse response (perhaps you need an adapter function?)") : (i.setAttribute(W, "loaded"), r.textContent = t, E.highlightElement(r))
                            }, document.head.appendChild(c)
                        }
                    }), E.plugins.jsonphighlight = {
                        timeout: 5e3,
                        registerAdapter: ye,
                        removeAdapter: function(t) {
                            var e;
                            "string" == typeof t && (t = ve(t)), "function" == typeof t && 0 <= (e = H.findIndex(function(e) {
                                return e.adapter === t
                            })) && H.splice(e, 1)
                        },
                        highlight: function(e) {
                            for (var t, n = (e || document).querySelectorAll(Y), a = 0; t = n[a++];) E.highlightElement(t)
                        }
                    }), "undefined" != typeof self && self.Prism && self.document && (X = /(?:^|\s)command-line(?:\s|$)/, Q = "command-line-prompt", J = "".startsWith ? function(e, t) {
                        return e.startsWith(t)
                    } : function(e, t) {
                        return 0 === e.indexOf(t)
                    }, E.hooks.add("before-highlight", function(e) {
                        var t = ke(e);
                        if (!t.complete && e.code) {
                            var n = e.element.parentElement;
                            if (n && /pre/i.test(n.nodeName) && (X.test(n.className) || X.test(e.element.className))) {
                                var a = e.element.querySelector("." + Q);
                                a && a.remove();
                                var r = e.code.split("\n");
                                t.numberOfLines = r.length;
                                var o = t.outputLines = [],
                                    i = n.getAttribute("data-output"),
                                    s = n.getAttribute("data-filter-output");
                                if (null !== i) i.split(",").forEach(function(e) {
                                    var t = e.split("-"),
                                        n = parseInt(t[0], 10),
                                        a = 2 === t.length ? parseInt(t[1], 10) : n;
                                    if (!isNaN(n) && !isNaN(a)) {
                                        n < 1 && (n = 1), a > r.length && (a = r.length), a--;
                                        for (var i = --n; i <= a; i++) o[i] = r[i], r[i] = ""
                                    }
                                });
                                else if (s)
                                    for (var l = 0; l < r.length; l++) J(r[l], s) && (o[l] = r[l].slice(s.length), r[l] = "");
                                e.code = r.join("\n")
                            } else t.complete = !0
                        } else t.complete = !0
                    }), E.hooks.add("before-insert", function(e) {
                        var t = ke(e);
                        if (!t.complete) {
                            for (var n = e.highlightedCode.split("\n"), a = t.outputLines || [], i = 0, r = a.length; i < r; i++) a.hasOwnProperty(i) && (n[i] = a[i]);
                            e.highlightedCode = n.join("\n")
                        }
                    }), E.hooks.add("complete", function(e) {
                        var t = ke(e);
                        if (!t.complete) {
                            var n = e.element.parentElement;
                            X.test(e.element.className) && (e.element.className = e.element.className.replace(X, " ")), X.test(n.className) || (n.className += " command-line");
                            var a = t.numberOfLines || 0,
                                i = c("data-prompt", ""),
                                r = we("" !== i ? '<span data-prompt="' + i + '"></span>' : '<span data-user="' + c("data-user", "user") + '" data-host="' + c("data-host", "localhost") + '"></span>', a),
                                o = document.createElement("span");
                            o.className = Q, o.innerHTML = r;
                            for (var s, l = t.outputLines || [], d = 0, u = l.length; d < u; d++) {
                                l.hasOwnProperty(d) && ((s = o.children[d]).removeAttribute("data-user"), s.removeAttribute("data-host"), s.removeAttribute("data-prompt"))
                            }
                            e.element.insertBefore(o, e.element.firstChild), t.complete = !0
                        }

                        function c(e, t) {
                            return (n.getAttribute(e) || t).replace(/"/g, "&quot")
                        }
                    })), "undefined" != typeof self && self.Prism && self.document && (ee = [], te = {}, ne = function() {}, E.plugins.toolbar = {}, ae = E.plugins.toolbar.registerButton = function(e, n) {
                        var t = "function" == typeof n ? n : function(e) {
                            var t;
                            return "function" == typeof n.onClick ? ((t = document.createElement("button")).type = "button", t.addEventListener("click", function() {
                                n.onClick.call(this, e)
                            })) : "string" == typeof n.url ? (t = document.createElement("a")).href = n.url : t = document.createElement("span"), n.className && t.classList.add(n.className), t.textContent = n.text, t
                        };
                        e in te ? console.warn('There is a button with the key "' + e + '" registered already.') : ee.push(te[e] = t)
                    }, ie = E.plugins.toolbar.hook = function(a) {
                        var e, i, t, n, r = a.element.parentNode;
                        r && /pre/i.test(r.nodeName) && !r.parentNode.classList.contains("code-toolbar") && ((e = document.createElement("div")).classList.add("code-toolbar"), r.parentNode.insertBefore(e, r), e.appendChild(r), (i = document.createElement("div")).classList.add("toolbar"), t = ee, (n = function(e) {
                            for (; e;) {
                                var t = e.getAttribute("data-toolbar-order");
                                if (null != t) return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                                e = e.parentElement
                            }
                        }(a.element)) && (t = n.map(function(e) {
                            return te[e] || ne
                        })), t.forEach(function(e) {
                            var t, n = e(a);
                            n && ((t = document.createElement("div")).classList.add("toolbar-item"), t.appendChild(n), i.appendChild(t))
                        }), e.appendChild(i))
                    }, ae("label", function(e) {
                        var t = e.element.parentNode;
                        if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
                            var n, a, i = t.getAttribute("data-label");
                            try {
                                a = document.querySelector("template#" + i)
                            } catch (e) {}
                            return a ? n = a.content : (t.hasAttribute("data-url") ? (n = document.createElement("a")).href = t.getAttribute("data-url") : n = document.createElement("span"), n.textContent = i), n
                        }
                    }), E.hooks.add("complete", ie)), "undefined" != typeof self && self.Prism && self.document && (E.plugins.toolbar ? (re = (re = window.ClipboardJS || void 0) || n(152), oe = [], re || (se = document.createElement("script"), le = document.querySelector("head"), se.onload = function() {
                        if (re = window.ClipboardJS)
                            for (; oe.length;) oe.pop()()
                    }, se.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js", le.appendChild(se)), E.plugins.toolbar.registerButton("copy-to-clipboard", function(e) {
                        var t = document.createElement("button");
                        t.textContent = "Copy", t.setAttribute("type", "button");
                        var n = e.element;
                        return re ? a() : oe.push(a), t;

                        function a() {
                            var e = new re(t, {
                                text: function() {
                                    return n.textContent
                                }
                            });
                            e.on("success", function() {
                                t.textContent = "Copied!", i()
                            }), e.on("error", function() {
                                t.textContent = "Press Ctrl+C to copy", i()
                            })
                        }

                        function i() {
                            setTimeout(function() {
                                t.textContent = "Copy"
                            }, 5e3)
                        }
                    })) : console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."))
            },
            152: function(e) {
                /*!
                 * clipboard.js v2.0.6
                 * https://clipboardjs.com/
                 * 
                 * Licensed MIT © Zeno Rocha
                 */
                var t;
                t = function() {
                    return a = {}, i.m = n = [function(e, t) {
                        e.exports = function(e) {
                            var t, n, a, i = "SELECT" === e.nodeName ? (e.focus(), e.value) : "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName ? ((t = e.hasAttribute("readonly")) || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), t || e.removeAttribute("readonly"), e.value) : (e.hasAttribute("contenteditable") && e.focus(), n = window.getSelection(), (a = document.createRange()).selectNodeContents(e), n.removeAllRanges(), n.addRange(a), n.toString());
                            return i
                        }
                    }, function(e, t) {
                        function n() {}
                        n.prototype = {
                            on: function(e, t, n) {
                                var a = this.e || (this.e = {});
                                return (a[e] || (a[e] = [])).push({
                                    fn: t,
                                    ctx: n
                                }), this
                            },
                            once: function(e, t, n) {
                                var a = this;

                                function i() {
                                    a.off(e, i), t.apply(n, arguments)
                                }
                                return i._ = t, this.on(e, i, n)
                            },
                            emit: function(e) {
                                for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), a = 0, i = n.length; a < i; a++) n[a].fn.apply(n[a].ctx, t);
                                return this
                            },
                            off: function(e, t) {
                                var n = this.e || (this.e = {}),
                                    a = n[e],
                                    i = [];
                                if (a && t)
                                    for (var r = 0, o = a.length; r < o; r++) a[r].fn !== t && a[r].fn._ !== t && i.push(a[r]);
                                return i.length ? n[e] = i : delete n[e], this
                            }
                        }, e.exports = n, e.exports.TinyEmitter = n
                    }, function(e, t, n) {
                        var p = n(3),
                            g = n(4);
                        e.exports = function(e, t, n) {
                            if (!e && !t && !n) throw new Error("Missing required arguments");
                            if (!p.string(t)) throw new TypeError("Second argument must be a String");
                            if (!p.fn(n)) throw new TypeError("Third argument must be a Function");
                            if (p.node(e)) return u = t, c = n, (d = e).addEventListener(u, c), {
                                destroy: function() {
                                    d.removeEventListener(u, c)
                                }
                            };
                            if (p.nodeList(e)) return o = e, s = t, l = n, Array.prototype.forEach.call(o, function(e) {
                                e.addEventListener(s, l)
                            }), {
                                destroy: function() {
                                    Array.prototype.forEach.call(o, function(e) {
                                        e.removeEventListener(s, l)
                                    })
                                }
                            };
                            if (p.string(e)) return a = e, i = t, r = n, g(document.body, a, i, r);
                            throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                            var a, i, r, o, s, l, d, u, c
                        }
                    }, function(e, n) {
                        n.node = function(e) {
                            return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
                        }, n.nodeList = function(e) {
                            var t = Object.prototype.toString.call(e);
                            return void 0 !== e && ("[object NodeList]" === t || "[object HTMLCollection]" === t) && "length" in e && (0 === e.length || n.node(e[0]))
                        }, n.string = function(e) {
                            return "string" == typeof e || e instanceof String
                        }, n.fn = function(e) {
                            return "[object Function]" === Object.prototype.toString.call(e)
                        }
                    }, function(e, t, n) {
                        var o = n(5);

                        function r(e, t, n, a, i) {
                            var r = function(t, n, e, a) {
                                return function(e) {
                                    e.delegateTarget = o(e.target, n), e.delegateTarget && a.call(t, e)
                                }
                            }.apply(this, arguments);
                            return e.addEventListener(n, r, i), {
                                destroy: function() {
                                    e.removeEventListener(n, r, i)
                                }
                            }
                        }
                        e.exports = function(e, t, n, a, i) {
                            return "function" == typeof e.addEventListener ? r.apply(null, arguments) : "function" == typeof n ? r.bind(null, document).apply(null, arguments) : ("string" == typeof e && (e = document.querySelectorAll(e)), Array.prototype.map.call(e, function(e) {
                                return r(e, t, n, a, i)
                            }))
                        }
                    }, function(e, t) {
                        var n;
                        "undefined" == typeof Element || Element.prototype.matches || ((n = Element.prototype).matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector), e.exports = function(e, t) {
                            for (; e && 9 !== e.nodeType;) {
                                if ("function" == typeof e.matches && e.matches(t)) return e;
                                e = e.parentNode
                            }
                        }
                    }, function(e, t, n) {
                        "use strict";
                        n.r(t);
                        var a = n(0),
                            i = n.n(a),
                            r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                return typeof e
                            } : function(e) {
                                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                            };

                        function o(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var a = t[n];
                                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                            }
                        }

                        function s(e) {
                            ! function(e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, s), this.resolveOptions(e), this.initSelection()
                        }
                        var l = (function(e, t, n) {
                                return t && o(e.prototype, t), n && o(e, n), e
                            }(s, [{
                                key: "resolveOptions",
                                value: function(e) {
                                    var t = 0 < arguments.length && void 0 !== e ? e : {};
                                    this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
                                }
                            }, {
                                key: "initSelection",
                                value: function() {
                                    this.text ? this.selectFake() : this.target && this.selectTarget()
                                }
                            }, {
                                key: "selectFake",
                                value: function() {
                                    var e = this,
                                        t = "rtl" == document.documentElement.getAttribute("dir");
                                    this.removeFake(), this.fakeHandlerCallback = function() {
                                        return e.removeFake()
                                    }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";
                                    var n = window.pageYOffset || document.documentElement.scrollTop;
                                    this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = i()(this.fakeElem), this.copyText()
                                }
                            }, {
                                key: "removeFake",
                                value: function() {
                                    this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                                }
                            }, {
                                key: "selectTarget",
                                value: function() {
                                    this.selectedText = i()(this.target), this.copyText()
                                }
                            }, {
                                key: "copyText",
                                value: function() {
                                    var t = void 0;
                                    try {
                                        t = document.execCommand(this.action)
                                    } catch (e) {
                                        t = !1
                                    }
                                    this.handleResult(t)
                                }
                            }, {
                                key: "handleResult",
                                value: function(e) {
                                    this.emitter.emit(e ? "success" : "error", {
                                        action: this.action,
                                        text: this.selectedText,
                                        trigger: this.trigger,
                                        clearSelection: this.clearSelection.bind(this)
                                    })
                                }
                            }, {
                                key: "clearSelection",
                                value: function() {
                                    this.trigger && this.trigger.focus(), document.activeElement.blur(), window.getSelection().removeAllRanges()
                                }
                            }, {
                                key: "destroy",
                                value: function() {
                                    this.removeFake()
                                }
                            }, {
                                key: "action",
                                set: function(e) {
                                    var t = 0 < arguments.length && void 0 !== e ? e : "copy";
                                    if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                                },
                                get: function() {
                                    return this._action
                                }
                            }, {
                                key: "target",
                                set: function(e) {
                                    if (void 0 !== e) {
                                        if (!e || "object" !== (void 0 === e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                        if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                        if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                        this._target = e
                                    }
                                },
                                get: function() {
                                    return this._target
                                }
                            }]), s),
                            d = n(1),
                            u = n.n(d),
                            c = n(2),
                            p = n.n(c),
                            g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                return typeof e
                            } : function(e) {
                                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                            },
                            f = function(e, t, n) {
                                return t && m(e.prototype, t), n && m(e, n), e
                            };

                        function m(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var a = t[n];
                                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                            }
                        }
                        var b = (function(e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(h, u.a), f(h, [{
                            key: "resolveOptions",
                            value: function(e) {
                                var t = 0 < arguments.length && void 0 !== e ? e : {};
                                this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === g(t.container) ? t.container : document.body
                            }
                        }, {
                            key: "listenClick",
                            value: function(e) {
                                var t = this;
                                this.listener = p()(e, "click", function(e) {
                                    return t.onClick(e)
                                })
                            }
                        }, {
                            key: "onClick",
                            value: function(e) {
                                var t = e.delegateTarget || e.currentTarget;
                                this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l({
                                    action: this.action(t),
                                    target: this.target(t),
                                    text: this.text(t),
                                    container: this.container,
                                    trigger: t,
                                    emitter: this
                                })
                            }
                        }, {
                            key: "defaultAction",
                            value: function(e) {
                                return y("action", e)
                            }
                        }, {
                            key: "defaultTarget",
                            value: function(e) {
                                var t = y("target", e);
                                if (t) return document.querySelector(t)
                            }
                        }, {
                            key: "defaultText",
                            value: function(e) {
                                return y("text", e)
                            }
                        }, {
                            key: "destroy",
                            value: function() {
                                this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                            }
                        }], [{
                            key: "isSupported",
                            value: function(e) {
                                var t = 0 < arguments.length && void 0 !== e ? e : ["copy", "cut"],
                                    n = "string" == typeof t ? [t] : t,
                                    a = !!document.queryCommandSupported;
                                return n.forEach(function(e) {
                                    a = a && !!document.queryCommandSupported(e)
                                }), a
                            }
                        }]), h);

                        function h(e, t) {
                            ! function(e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, h);
                            var n = function(e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this));
                            return n.resolveOptions(t), n.listenClick(e), n
                        }

                        function y(e, t) {
                            var n = "data-clipboard-" + e;
                            if (t.hasAttribute(n)) return t.getAttribute(n)
                        }
                        t.default = b
                    }], i.c = a, i.d = function(e, t, n) {
                        i.o(e, t) || Object.defineProperty(e, t, {
                            enumerable: !0,
                            get: n
                        })
                    }, i.r = function(e) {
                        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                            value: "Module"
                        }), Object.defineProperty(e, "__esModule", {
                            value: !0
                        })
                    }, i.t = function(t, e) {
                        if (1 & e && (t = i(t)), 8 & e) return t;
                        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                        var n = Object.create(null);
                        if (i.r(n), Object.defineProperty(n, "default", {
                                enumerable: !0,
                                value: t
                            }), 2 & e && "string" != typeof t)
                            for (var a in t) i.d(n, a, function(e) {
                                return t[e]
                            }.bind(null, a));
                        return n
                    }, i.n = function(e) {
                        var t = e && e.__esModule ? function() {
                            return e.default
                        } : function() {
                            return e
                        };
                        return i.d(t, "a", t), t
                    }, i.o = function(e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }, i.p = "", i(i.s = 6).default;

                    function i(e) {
                        if (a[e]) return a[e].exports;
                        var t = a[e] = {
                            i: e,
                            l: !1,
                            exports: {}
                        };
                        return n[e].call(t.exports, t, t.exports, i), t.l = !0, t.exports
                    }
                    var n, a
                }, e.exports = t()
            }
        },
        i = {};

    function r(e) {
        var t = i[e];
        if (void 0 !== t) return t.exports;
        var n = i[e] = {
            exports: {}
        };
        return a[e].call(n.exports, n, n.exports, r), n.exports
    }
    r.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }();
    r(213)
}();