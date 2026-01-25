var Kr = Object.defineProperty;
var On = (e) => {
  throw TypeError(e);
};
var Zr = (e, t, n) => t in e ? Kr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var R = (e, t, n) => Zr(e, typeof t != "symbol" ? t + "" : t, n), Gt = (e, t, n) => t.has(e) || On("Cannot " + n);
var h = (e, t, n) => (Gt(e, t, "read from private field"), n ? n.call(e) : t.get(e)), y = (e, t, n) => t.has(e) ? On("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), $ = (e, t, n, r) => (Gt(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), F = (e, t, n) => (Gt(e, t, "access private method"), n);
var Kn;
typeof window < "u" && ((Kn = window.__svelte ?? (window.__svelte = {})).v ?? (Kn.v = /* @__PURE__ */ new Set())).add("5");
const Jr = 1, Xr = 2, Qr = 16, ei = 1, ti = 2, ni = 4, ri = 2, Zn = "[", vn = "[!", _n = "]", ct = {}, D = Symbol(), Jt = !1;
var Jn = Array.isArray, ii = Array.prototype.indexOf, Ht = Array.from, Pt = Object.keys, Dt = Object.defineProperty, et = Object.getOwnPropertyDescriptor, si = Object.prototype, fi = Array.prototype, li = Object.getPrototypeOf, In = Object.isExtensible;
function oi(e) {
  return typeof e == "function";
}
const gt = () => {
};
function ui(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Xn() {
  var e, t, n = new Promise((r, s) => {
    e = r, t = s;
  });
  return { promise: n, resolve: e, reject: t };
}
const q = 2, Lt = 4, zt = 8, Qn = 1 << 24, he = 16, Fe = 32, Pe = 64, pn = 128, ee = 512, B = 1024, H = 2048, Te = 4096, Z = 8192, xe = 16384, Vt = 32768, dt = 65536, Mn = 1 << 17, er = 1 << 18, Ge = 1 << 19, ai = 1 << 20, Ee = 1 << 25, Ue = 32768, Xt = 1 << 21, gn = 1 << 22, Ne = 1 << 23, Kt = Symbol("$state"), ci = Symbol("legacy props"), Xe = new class extends Error {
  constructor() {
    super(...arguments);
    R(this, "name", "StaleReactionError");
    R(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}(), tr = 3, pt = 8;
function di() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function hi() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function vi() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function _i() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function pi() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function gi() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function $i() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Ut(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function wi() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let A = !1;
function De(e) {
  A = e;
}
let C;
function te(e) {
  if (e === null)
    throw Ut(), ct;
  return C = e;
}
function $n() {
  return te(/* @__PURE__ */ Ce(C));
}
function $t(e) {
  if (A) {
    if (/* @__PURE__ */ Ce(C) !== null)
      throw Ut(), ct;
    C = e;
  }
}
function yi(e = 1) {
  if (A) {
    for (var t = e, n = C; t--; )
      n = /** @type {TemplateNode} */
      /* @__PURE__ */ Ce(n);
    C = n;
  }
}
function Qt(e = !0) {
  for (var t = 0, n = C; ; ) {
    if (n.nodeType === pt) {
      var r = (
        /** @type {Comment} */
        n.data
      );
      if (r === _n) {
        if (t === 0) return n;
        t -= 1;
      } else (r === Zn || r === vn) && (t += 1);
    }
    var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Ce(n)
    );
    e && n.remove(), n = s;
  }
}
function mi(e) {
  if (!e || e.nodeType !== pt)
    throw Ut(), ct;
  return (
    /** @type {Comment} */
    e.data
  );
}
function nr(e) {
  return e === this.v;
}
function bi(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function rr(e) {
  return !bi(e, this.v);
}
let Ei = !1, fe = null;
function ht(e) {
  fe = e;
}
function ir(e, t = !1, n) {
  fe = {
    p: fe,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function sr(e) {
  var t = (
    /** @type {ComponentContext} */
    fe
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      ji(r);
  }
  return e !== void 0 && (t.x = e), t.i = !0, fe = t.p, e ?? /** @type {T} */
  {};
}
function fr() {
  return !0;
}
let Le = [];
function lr() {
  var e = Le;
  Le = [], ui(e);
}
function Oe(e) {
  if (Le.length === 0 && !yt) {
    var t = Le;
    queueMicrotask(() => {
      t === Le && lr();
    });
  }
  Le.push(e);
}
function xi() {
  for (; Le.length > 0; )
    lr();
}
function or(e) {
  var t = m;
  if (t === null)
    return w.f |= Ne, e;
  if ((t.f & Vt) === 0) {
    if ((t.f & pn) === 0)
      throw e;
    t.b.error(e);
  } else
    vt(e, t);
}
function vt(e, t) {
  for (; t !== null; ) {
    if ((t.f & pn) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    t = t.parent;
  }
  throw e;
}
const ki = -7169;
function P(e, t) {
  e.f = e.f & ki | t;
}
function wn(e) {
  (e.f & ee) !== 0 || e.deps === null ? P(e, B) : P(e, Te);
}
function ur(e) {
  if (e !== null)
    for (const t of e)
      (t.f & q) === 0 || (t.f & Ue) === 0 || (t.f ^= Ue, ur(
        /** @type {Derived} */
        t.deps
      ));
}
function ar(e, t, n) {
  (e.f & H) !== 0 ? t.add(e) : (e.f & Te) !== 0 && n.add(e), ur(e.deps), P(e, B);
}
const Tt = /* @__PURE__ */ new Set();
let S = null, L = null, K = [], Yt = null, en = !1, yt = !1;
var nt, rt, Be, it, xt, st, ft, lt, de, tn, nn, cr;
const xn = class xn {
  constructor() {
    y(this, de);
    R(this, "committed", !1);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    R(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    R(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    y(this, nt, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    y(this, rt, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    y(this, Be, 0);
    /**
     * The number of async effects that are currently in flight, _not_ inside a pending boundary
     */
    y(this, it, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    y(this, xt, null);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    y(this, st, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    y(this, ft, /* @__PURE__ */ new Set());
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    R(this, "skipped_effects", /* @__PURE__ */ new Set());
    R(this, "is_fork", !1);
    y(this, lt, !1);
  }
  is_deferred() {
    return this.is_fork || h(this, it) > 0;
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    var s;
    K = [], this.apply();
    var n = [], r = [];
    for (const i of t)
      F(this, de, tn).call(this, i, n, r);
    if (this.is_deferred())
      F(this, de, nn).call(this, r), F(this, de, nn).call(this, n);
    else {
      for (const i of h(this, nt)) i();
      h(this, nt).clear(), h(this, Be) === 0 && F(this, de, cr).call(this), S = null, Fn(r), Fn(n), (s = h(this, xt)) == null || s.resolve();
    }
    L = null;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, n) {
    n !== D && !this.previous.has(t) && this.previous.set(t, n), (t.f & Ne) === 0 && (this.current.set(t, t.v), L == null || L.set(t, t.v));
  }
  activate() {
    S = this, this.apply();
  }
  deactivate() {
    S === this && (S = null, L = null);
  }
  flush() {
    if (this.activate(), K.length > 0) {
      if (hr(), S !== null && S !== this)
        return;
    } else h(this, Be) === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of h(this, rt)) t(this);
    h(this, rt).clear();
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    $(this, Be, h(this, Be) + 1), t && $(this, it, h(this, it) + 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(t) {
    $(this, Be, h(this, Be) - 1), t && $(this, it, h(this, it) - 1), !h(this, lt) && ($(this, lt, !0), Oe(() => {
      $(this, lt, !1), this.is_deferred() ? K.length > 0 && this.flush() : this.revive();
    }));
  }
  revive() {
    for (const t of h(this, st))
      h(this, ft).delete(t), P(t, H), Se(t);
    for (const t of h(this, ft))
      P(t, Te), Se(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    h(this, nt).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    h(this, rt).add(t);
  }
  settled() {
    return (h(this, xt) ?? $(this, xt, Xn())).promise;
  }
  static ensure() {
    if (S === null) {
      const t = S = new xn();
      Tt.add(S), yt || Oe(() => {
        S === t && t.flush();
      });
    }
    return S;
  }
  apply() {
  }
};
nt = new WeakMap(), rt = new WeakMap(), Be = new WeakMap(), it = new WeakMap(), xt = new WeakMap(), st = new WeakMap(), ft = new WeakMap(), lt = new WeakMap(), de = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
tn = function(t, n, r) {
  t.f ^= B;
  for (var s = t.first, i = null; s !== null; ) {
    var f = s.f, l = (f & (Fe | Pe)) !== 0, u = l && (f & B) !== 0, o = u || (f & Z) !== 0 || this.skipped_effects.has(s);
    if (!o && s.fn !== null) {
      l ? s.f ^= B : i !== null && (f & (Lt | zt | Qn)) !== 0 ? i.b.defer_effect(s) : (f & Lt) !== 0 ? n.push(s) : St(s) && ((f & he) !== 0 && h(this, st).add(s), Et(s));
      var c = s.first;
      if (c !== null) {
        s = c;
        continue;
      }
    }
    var d = s.parent;
    for (s = s.next; s === null && d !== null; )
      d === i && (i = null), s = d.next, d = d.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
nn = function(t) {
  for (var n = 0; n < t.length; n += 1)
    ar(t[n], h(this, st), h(this, ft));
}, cr = function() {
  var s;
  if (Tt.size > 1) {
    this.previous.clear();
    var t = L, n = !0;
    for (const i of Tt) {
      if (i === this) {
        n = !1;
        continue;
      }
      const f = [];
      for (const [u, o] of this.current) {
        if (i.current.has(u))
          if (n && o !== i.current.get(u))
            i.current.set(u, o);
          else
            continue;
        f.push(u);
      }
      if (f.length === 0)
        continue;
      const l = [...i.current.keys()].filter((u) => !this.current.has(u));
      if (l.length > 0) {
        var r = K;
        K = [];
        const u = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (const c of f)
          vr(c, l, u, o);
        if (K.length > 0) {
          S = i, i.apply();
          for (const c of K)
            F(s = i, de, tn).call(s, c, [], []);
          i.deactivate();
        }
        K = r;
      }
    }
    S = null, L = t;
  }
  this.committed = !0, Tt.delete(this);
};
let ke = xn;
function dr(e) {
  var t = yt;
  yt = !0;
  try {
    for (var n; ; ) {
      if (xi(), K.length === 0 && (S == null || S.flush(), K.length === 0))
        return Yt = null, /** @type {T} */
        n;
      hr();
    }
  } finally {
    yt = t;
  }
}
function hr() {
  en = !0;
  var e = null;
  try {
    for (var t = 0; K.length > 0; ) {
      var n = ke.ensure();
      if (t++ > 1e3) {
        var r, s;
        Si();
      }
      n.process(K), Ie.clear();
    }
  } finally {
    en = !1, Yt = null;
  }
}
function Si() {
  try {
    hi();
  } catch (e) {
    vt(e, Yt);
  }
}
let ie = null;
function Fn(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (xe | Z)) === 0 && St(r) && (ie = /* @__PURE__ */ new Set(), Et(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? Or(r) : r.fn = null), (ie == null ? void 0 : ie.size) > 0)) {
        Ie.clear();
        for (const s of ie) {
          if ((s.f & (xe | Z)) !== 0) continue;
          const i = [s];
          let f = s.parent;
          for (; f !== null; )
            ie.has(f) && (ie.delete(f), i.push(f)), f = f.parent;
          for (let l = i.length - 1; l >= 0; l--) {
            const u = i[l];
            (u.f & (xe | Z)) === 0 && Et(u);
          }
        }
        ie.clear();
      }
    }
    ie = null;
  }
}
function vr(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & q) !== 0 ? vr(
        /** @type {Derived} */
        s,
        t,
        n,
        r
      ) : (i & (gn | he)) !== 0 && (i & H) === 0 && _r(s, t, r) && (P(s, H), Se(
        /** @type {Effect} */
        s
      ));
    }
}
function _r(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (t.includes(s))
        return !0;
      if ((s.f & q) !== 0 && _r(
        /** @type {Derived} */
        s,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          s,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function Se(e) {
  for (var t = Yt = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (en && t === m && (n & he) !== 0 && (n & er) === 0)
      return;
    if ((n & (Pe | Fe)) !== 0) {
      if ((n & B) === 0) return;
      t.f ^= B;
    }
  }
  K.push(t);
}
function Ti(e) {
  let t = 0, n = Ye(0), r;
  return () => {
    bn() && (N(n), Cr(() => (t === 0 && (r = Hr(() => e(() => mt(n)))), t += 1, () => {
      Oe(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, mt(n));
      });
    })));
  };
}
var Ci = dt | Ge | pn;
function Ai(e, t, n) {
  new Ri(e, t, n);
}
var G, kt, oe, je, ue, X, z, ae, $e, Re, He, we, ot, ze, ut, at, ye, jt, O, pr, gr, rn, Nt, Ot, sn;
class Ri {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, n, r) {
    y(this, O);
    /** @type {Boundary | null} */
    R(this, "parent");
    R(this, "is_pending", !1);
    /** @type {TemplateNode} */
    y(this, G);
    /** @type {TemplateNode | null} */
    y(this, kt, A ? C : null);
    /** @type {BoundaryProps} */
    y(this, oe);
    /** @type {((anchor: Node) => void)} */
    y(this, je);
    /** @type {Effect} */
    y(this, ue);
    /** @type {Effect | null} */
    y(this, X, null);
    /** @type {Effect | null} */
    y(this, z, null);
    /** @type {Effect | null} */
    y(this, ae, null);
    /** @type {DocumentFragment | null} */
    y(this, $e, null);
    /** @type {TemplateNode | null} */
    y(this, Re, null);
    y(this, He, 0);
    y(this, we, 0);
    y(this, ot, !1);
    y(this, ze, !1);
    /** @type {Set<Effect>} */
    y(this, ut, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    y(this, at, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    y(this, ye, null);
    y(this, jt, Ti(() => ($(this, ye, Ye(h(this, He))), () => {
      $(this, ye, null);
    })));
    $(this, G, t), $(this, oe, n), $(this, je, r), this.parent = /** @type {Effect} */
    m.b, this.is_pending = !!h(this, oe).pending, $(this, ue, Ar(() => {
      if (m.b = this, A) {
        const i = h(this, kt);
        $n(), /** @type {Comment} */
        i.nodeType === pt && /** @type {Comment} */
        i.data === vn ? F(this, O, gr).call(this) : (F(this, O, pr).call(this), h(this, we) === 0 && (this.is_pending = !1));
      } else {
        var s = F(this, O, rn).call(this);
        try {
          $(this, X, le(() => r(s)));
        } catch (i) {
          this.error(i);
        }
        h(this, we) > 0 ? F(this, O, Ot).call(this) : this.is_pending = !1;
      }
      return () => {
        var i;
        (i = h(this, Re)) == null || i.remove();
      };
    }, Ci)), A && $(this, G, C);
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    ar(t, h(this, ut), h(this, at));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!h(this, oe).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(t) {
    F(this, O, sn).call(this, t), $(this, He, h(this, He) + t), !(!h(this, ye) || h(this, ot)) && ($(this, ot, !0), Oe(() => {
      $(this, ot, !1), h(this, ye) && _t(h(this, ye), h(this, He));
    }));
  }
  get_effect_pending() {
    return h(this, jt).call(this), N(
      /** @type {Source<number>} */
      h(this, ye)
    );
  }
  /** @param {unknown} error */
  error(t) {
    var n = h(this, oe).onerror;
    let r = h(this, oe).failed;
    if (h(this, ze) || !n && !r)
      throw t;
    h(this, X) && (ne(h(this, X)), $(this, X, null)), h(this, z) && (ne(h(this, z)), $(this, z, null)), h(this, ae) && (ne(h(this, ae)), $(this, ae, null)), A && (te(
      /** @type {TemplateNode} */
      h(this, kt)
    ), yi(), te(Qt()));
    var s = !1, i = !1;
    const f = () => {
      if (s) {
        wi();
        return;
      }
      s = !0, i && $i(), ke.ensure(), $(this, He, 0), h(this, ae) !== null && tt(h(this, ae), () => {
        $(this, ae, null);
      }), this.is_pending = this.has_pending_snippet(), $(this, X, F(this, O, Nt).call(this, () => ($(this, ze, !1), le(() => h(this, je).call(this, h(this, G)))))), h(this, we) > 0 ? F(this, O, Ot).call(this) : this.is_pending = !1;
    };
    var l = w;
    try {
      U(null), i = !0, n == null || n(t, f), i = !1;
    } catch (u) {
      vt(u, h(this, ue) && h(this, ue).parent);
    } finally {
      U(l);
    }
    r && Oe(() => {
      $(this, ae, F(this, O, Nt).call(this, () => {
        ke.ensure(), $(this, ze, !0);
        try {
          return le(() => {
            r(
              h(this, G),
              () => t,
              () => f
            );
          });
        } catch (u) {
          return vt(
            u,
            /** @type {Effect} */
            h(this, ue).parent
          ), null;
        } finally {
          $(this, ze, !1);
        }
      }));
    });
  }
}
G = new WeakMap(), kt = new WeakMap(), oe = new WeakMap(), je = new WeakMap(), ue = new WeakMap(), X = new WeakMap(), z = new WeakMap(), ae = new WeakMap(), $e = new WeakMap(), Re = new WeakMap(), He = new WeakMap(), we = new WeakMap(), ot = new WeakMap(), ze = new WeakMap(), ut = new WeakMap(), at = new WeakMap(), ye = new WeakMap(), jt = new WeakMap(), O = new WeakSet(), pr = function() {
  try {
    $(this, X, le(() => h(this, je).call(this, h(this, G))));
  } catch (t) {
    this.error(t);
  }
}, gr = function() {
  const t = h(this, oe).pending;
  t && ($(this, z, le(() => t(h(this, G)))), Oe(() => {
    var n = F(this, O, rn).call(this);
    $(this, X, F(this, O, Nt).call(this, () => (ke.ensure(), le(() => h(this, je).call(this, n))))), h(this, we) > 0 ? F(this, O, Ot).call(this) : (tt(
      /** @type {Effect} */
      h(this, z),
      () => {
        $(this, z, null);
      }
    ), this.is_pending = !1);
  }));
}, rn = function() {
  var t = h(this, G);
  return this.is_pending && ($(this, Re, Me()), h(this, G).before(h(this, Re)), t = h(this, Re)), t;
}, /**
 * @param {() => Effect | null} fn
 */
Nt = function(t) {
  var n = m, r = w, s = fe;
  ce(h(this, ue)), U(h(this, ue)), ht(h(this, ue).ctx);
  try {
    return t();
  } catch (i) {
    return or(i), null;
  } finally {
    ce(n), U(r), ht(s);
  }
}, Ot = function() {
  const t = (
    /** @type {(anchor: Node) => void} */
    h(this, oe).pending
  );
  h(this, X) !== null && ($(this, $e, document.createDocumentFragment()), h(this, $e).append(
    /** @type {TemplateNode} */
    h(this, Re)
  ), Wi(h(this, X), h(this, $e))), h(this, z) === null && $(this, z, le(() => t(h(this, G))));
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 */
sn = function(t) {
  var n;
  if (!this.has_pending_snippet()) {
    this.parent && F(n = this.parent, O, sn).call(n, t);
    return;
  }
  if ($(this, we, h(this, we) + t), h(this, we) === 0) {
    this.is_pending = !1;
    for (const r of h(this, ut))
      P(r, H), Se(r);
    for (const r of h(this, at))
      P(r, Te), Se(r);
    h(this, ut).clear(), h(this, at).clear(), h(this, z) && tt(h(this, z), () => {
      $(this, z, null);
    }), h(this, $e) && (h(this, G).before(h(this, $e)), $(this, $e, null));
  }
};
function Ni(e, t, n, r) {
  const s = yn;
  var i = e.filter((a) => !a.settled);
  if (n.length === 0 && i.length === 0) {
    r(t.map(s));
    return;
  }
  var f = S, l = (
    /** @type {Effect} */
    m
  ), u = Oi(), o = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((a) => a.promise)) : null;
  function c(a) {
    u();
    try {
      r(a);
    } catch (v) {
      (l.f & xe) === 0 && vt(v, l);
    }
    f == null || f.deactivate(), fn();
  }
  if (n.length === 0) {
    o.then(() => c(t.map(s)));
    return;
  }
  function d() {
    u(), Promise.all(n.map((a) => /* @__PURE__ */ Ii(a))).then((a) => c([...t.map(s), ...a])).catch((a) => vt(a, l));
  }
  o ? o.then(d) : d();
}
function Oi() {
  var e = m, t = w, n = fe, r = S;
  return function(i = !0) {
    ce(e), U(t), ht(n), i && (r == null || r.activate());
  };
}
function fn() {
  ce(null), U(null), ht(null);
}
// @__NO_SIDE_EFFECTS__
function yn(e) {
  var t = q | H, n = w !== null && (w.f & q) !== 0 ? (
    /** @type {Derived} */
    w
  ) : null;
  return m !== null && (m.f |= Ge), {
    ctx: fe,
    deps: null,
    effects: null,
    equals: nr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      D
    ),
    wv: 0,
    parent: n ?? m,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Ii(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    m
  );
  r === null && di();
  var s = (
    /** @type {Boundary} */
    r.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), f = Ye(
    /** @type {V} */
    D
  ), l = !w, u = /* @__PURE__ */ new Map();
  return Vi(() => {
    var v;
    var o = Xn();
    i = o.promise;
    try {
      Promise.resolve(e()).then(o.resolve, o.reject).then(() => {
        c === S && c.committed && c.deactivate(), fn();
      });
    } catch (p) {
      o.reject(p), fn();
    }
    var c = (
      /** @type {Batch} */
      S
    );
    if (l) {
      var d = s.is_rendered();
      s.update_pending_count(1), c.increment(d), (v = u.get(c)) == null || v.reject(Xe), u.delete(c), u.set(c, o);
    }
    const a = (p, _ = void 0) => {
      if (c.activate(), _)
        _ !== Xe && (f.f |= Ne, _t(f, _));
      else {
        (f.f & Ne) !== 0 && (f.f ^= Ne), _t(f, p);
        for (const [g, x] of u) {
          if (u.delete(g), g === c) break;
          x.reject(Xe);
        }
      }
      l && (s.update_pending_count(-1), c.decrement(d));
    };
    o.promise.then(a, (p) => a(null, p || "unknown"));
  }), Bi(() => {
    for (const o of u.values())
      o.reject(Xe);
  }), new Promise((o) => {
    function c(d) {
      function a() {
        d === i ? o(f) : c(i);
      }
      d.then(a, a);
    }
    c(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Mi(e) {
  const t = /* @__PURE__ */ yn(e);
  return t.equals = rr, t;
}
function $r(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      ne(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Fi(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & q) === 0)
      return (t.f & xe) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function mn(e) {
  var t, n = m;
  ce(Fi(e));
  try {
    e.f &= ~Ue, $r(e), t = qr(e);
  } finally {
    ce(n);
  }
  return t;
}
function wr(e) {
  var t = mn(e);
  if (!e.equals(t) && (e.wv = Dr(), (!(S != null && S.is_fork) || e.deps === null) && (e.v = t, e.deps === null))) {
    P(e, B);
    return;
  }
  We || (L !== null ? (bn() || S != null && S.is_fork) && L.set(e, t) : wn(e));
}
let ln = /* @__PURE__ */ new Set();
const Ie = /* @__PURE__ */ new Map();
let yr = !1;
function Ye(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: nr,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function pe(e, t) {
  const n = Ye(e);
  return Gi(n), n;
}
// @__NO_SIDE_EFFECTS__
function mr(e, t = !1, n = !0) {
  const r = Ye(e);
  return t || (r.equals = rr), r;
}
function ge(e, t, n = !1) {
  w !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!se || (w.f & Mn) !== 0) && fr() && (w.f & (q | he | gn | Mn)) !== 0 && !(j != null && j.includes(e)) && gi();
  let r = n ? Qe(t) : t;
  return _t(e, r);
}
function _t(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    We ? Ie.set(e, t) : Ie.set(e, n), e.v = t;
    var r = ke.ensure();
    if (r.capture(e, n), (e.f & q) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & H) !== 0 && mn(s), wn(s);
    }
    e.wv = Dr(), br(e, H), m !== null && (m.f & B) !== 0 && (m.f & (Fe | Pe)) === 0 && (J === null ? Ki([e]) : J.push(e)), !r.is_fork && ln.size > 0 && !yr && Pi();
  }
  return t;
}
function Pi() {
  yr = !1;
  for (const e of ln)
    (e.f & B) !== 0 && P(e, Te), St(e) && Et(e);
  ln.clear();
}
function mt(e) {
  ge(e, e.v + 1);
}
function br(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, s = 0; s < r; s++) {
      var i = n[s], f = i.f, l = (f & H) === 0;
      if (l && P(i, t), (f & q) !== 0) {
        var u = (
          /** @type {Derived} */
          i
        );
        L == null || L.delete(u), (f & Ue) === 0 && (f & ee && (i.f |= Ue), br(u, Te));
      } else l && ((f & he) !== 0 && ie !== null && ie.add(
        /** @type {Effect} */
        i
      ), Se(
        /** @type {Effect} */
        i
      ));
    }
}
function Qe(e) {
  if (typeof e != "object" || e === null || Kt in e)
    return e;
  const t = li(e);
  if (t !== si && t !== fi)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Jn(e), s = /* @__PURE__ */ pe(0), i = Ve, f = (l) => {
    if (Ve === i)
      return l();
    var u = w, o = Ve;
    U(null), qn(i);
    var c = l();
    return U(u), qn(o), c;
  };
  return r && n.set("length", /* @__PURE__ */ pe(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, u, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && _i();
        var c = n.get(u);
        return c === void 0 ? c = f(() => {
          var d = /* @__PURE__ */ pe(o.value);
          return n.set(u, d), d;
        }) : ge(c, o.value, !0), !0;
      },
      deleteProperty(l, u) {
        var o = n.get(u);
        if (o === void 0) {
          if (u in l) {
            const c = f(() => /* @__PURE__ */ pe(D));
            n.set(u, c), mt(s);
          }
        } else
          ge(o, D), mt(s);
        return !0;
      },
      get(l, u, o) {
        var v;
        if (u === Kt)
          return e;
        var c = n.get(u), d = u in l;
        if (c === void 0 && (!d || (v = et(l, u)) != null && v.writable) && (c = f(() => {
          var p = Qe(d ? l[u] : D), _ = /* @__PURE__ */ pe(p);
          return _;
        }), n.set(u, c)), c !== void 0) {
          var a = N(c);
          return a === D ? void 0 : a;
        }
        return Reflect.get(l, u, o);
      },
      getOwnPropertyDescriptor(l, u) {
        var o = Reflect.getOwnPropertyDescriptor(l, u);
        if (o && "value" in o) {
          var c = n.get(u);
          c && (o.value = N(c));
        } else if (o === void 0) {
          var d = n.get(u), a = d == null ? void 0 : d.v;
          if (d !== void 0 && a !== D)
            return {
              enumerable: !0,
              configurable: !0,
              value: a,
              writable: !0
            };
        }
        return o;
      },
      has(l, u) {
        var a;
        if (u === Kt)
          return !0;
        var o = n.get(u), c = o !== void 0 && o.v !== D || Reflect.has(l, u);
        if (o !== void 0 || m !== null && (!c || (a = et(l, u)) != null && a.writable)) {
          o === void 0 && (o = f(() => {
            var v = c ? Qe(l[u]) : D, p = /* @__PURE__ */ pe(v);
            return p;
          }), n.set(u, o));
          var d = N(o);
          if (d === D)
            return !1;
        }
        return c;
      },
      set(l, u, o, c) {
        var k;
        var d = n.get(u), a = u in l;
        if (r && u === "length")
          for (var v = o; v < /** @type {Source<number>} */
          d.v; v += 1) {
            var p = n.get(v + "");
            p !== void 0 ? ge(p, D) : v in l && (p = f(() => /* @__PURE__ */ pe(D)), n.set(v + "", p));
          }
        if (d === void 0)
          (!a || (k = et(l, u)) != null && k.writable) && (d = f(() => /* @__PURE__ */ pe(void 0)), ge(d, Qe(o)), n.set(u, d));
        else {
          a = d.v !== D;
          var _ = f(() => Qe(o));
          ge(d, _);
        }
        var g = Reflect.getOwnPropertyDescriptor(l, u);
        if (g != null && g.set && g.set.call(c, o), !a) {
          if (r && typeof u == "string") {
            var x = (
              /** @type {Source<number>} */
              n.get("length")
            ), E = Number(u);
            Number.isInteger(E) && E >= x.v && ge(x, E + 1);
          }
          mt(s);
        }
        return !0;
      },
      ownKeys(l) {
        N(s);
        var u = Reflect.ownKeys(l).filter((d) => {
          var a = n.get(d);
          return a === void 0 || a.v !== D;
        });
        for (var [o, c] of n)
          c.v !== D && !(o in l) && u.push(o);
        return u;
      },
      setPrototypeOf() {
        pi();
      }
    }
  );
}
var Pn, Er, xr, kr;
function on() {
  if (Pn === void 0) {
    Pn = window, Er = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    xr = et(t, "firstChild").get, kr = et(t, "nextSibling").get, In(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), In(n) && (n.__t = void 0);
  }
}
function Me(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function bt(e) {
  return (
    /** @type {TemplateNode | null} */
    xr.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  return (
    /** @type {TemplateNode | null} */
    kr.call(e)
  );
}
function Zt(e, t) {
  if (!A)
    return /* @__PURE__ */ bt(e);
  var n = /* @__PURE__ */ bt(C);
  if (n === null)
    n = C.appendChild(Me());
  else if (t && n.nodeType !== tr) {
    var r = Me();
    return n == null || n.before(r), te(r), r;
  }
  return te(n), n;
}
function Di(e, t = 1, n = !1) {
  let r = A ? C : e;
  for (var s; t--; )
    s = r, r = /** @type {TemplateNode} */
    /* @__PURE__ */ Ce(r);
  if (!A)
    return r;
  if (n && (r == null ? void 0 : r.nodeType) !== tr) {
    var i = Me();
    return r === null ? s == null || s.after(i) : r.before(i), te(i), i;
  }
  return te(r), r;
}
function Sr(e) {
  e.textContent = "";
}
function Li() {
  return !1;
}
function Wt(e) {
  var t = w, n = m;
  U(null), ce(null);
  try {
    return e();
  } finally {
    U(t), ce(n);
  }
}
function qi(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function ve(e, t, n) {
  var r = m;
  r !== null && (r.f & Z) !== 0 && (e |= Z);
  var s = {
    ctx: fe,
    deps: null,
    nodes: null,
    f: e | H | ee,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: r,
    b: r && r.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (n)
    try {
      Et(s), s.f |= Vt;
    } catch (l) {
      throw ne(s), l;
    }
  else t !== null && Se(s);
  var i = s;
  if (n && i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
  (i.f & Ge) === 0 && (i = i.first, (e & he) !== 0 && (e & dt) !== 0 && i !== null && (i.f |= dt)), i !== null && (i.parent = r, r !== null && qi(i, r), w !== null && (w.f & q) !== 0 && (e & Pe) === 0)) {
    var f = (
      /** @type {Derived} */
      w
    );
    (f.effects ?? (f.effects = [])).push(i);
  }
  return s;
}
function bn() {
  return w !== null && !se;
}
function Bi(e) {
  const t = ve(zt, null, !1);
  return P(t, B), t.teardown = e, t;
}
function ji(e) {
  return ve(Lt | ai, e, !1);
}
function Hi(e) {
  ke.ensure();
  const t = ve(Pe | Ge, e, !0);
  return () => {
    ne(t);
  };
}
function zi(e) {
  ke.ensure();
  const t = ve(Pe | Ge, e, !0);
  return (n = {}) => new Promise((r) => {
    n.outro ? tt(t, () => {
      ne(t), r(void 0);
    }) : (ne(t), r(void 0));
  });
}
function Tr(e) {
  return ve(Lt, e, !1);
}
function Vi(e) {
  return ve(gn | Ge, e, !0);
}
function Cr(e, t = 0) {
  return ve(zt | t, e, !0);
}
function Dn(e, t = [], n = [], r = []) {
  Ni(r, t, n, (s) => {
    ve(zt, () => e(...s.map(N)), !0);
  });
}
function Ar(e, t = 0) {
  var n = ve(he | t, e, !0);
  return n;
}
function le(e) {
  return ve(Fe | Ge, e, !0);
}
function Rr(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = We, r = w;
    Ln(!0), U(null);
    try {
      t.call(null);
    } finally {
      Ln(n), U(r);
    }
  }
}
function Nr(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && Wt(() => {
      s.abort(Xe);
    });
    var r = n.next;
    (n.f & Pe) !== 0 ? n.parent = null : ne(n, t), n = r;
  }
}
function Ui(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Fe) === 0 && ne(t), t = n;
  }
}
function ne(e, t = !0) {
  var n = !1;
  (t || (e.f & er) !== 0) && e.nodes !== null && e.nodes.end !== null && (Yi(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), Nr(e, t && !n), qt(e, 0), P(e, xe);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  Rr(e);
  var s = e.parent;
  s !== null && s.first !== null && Or(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function Yi(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Ce(e);
    e.remove(), e = n;
  }
}
function Or(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function tt(e, t, n = !0) {
  var r = [];
  Ir(e, r, !0);
  var s = () => {
    n && ne(e), t && t();
  }, i = r.length;
  if (i > 0) {
    var f = () => --i || s();
    for (var l of r)
      l.out(f);
  } else
    s();
}
function Ir(e, t, n) {
  if ((e.f & Z) === 0) {
    e.f ^= Z;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && t.push(l);
    for (var s = e.first; s !== null; ) {
      var i = s.next, f = (s.f & dt) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (s.f & Fe) !== 0 && (e.f & he) !== 0;
      Ir(s, t, f ? n : !1), s = i;
    }
  }
}
function Mr(e) {
  Fr(e, !0);
}
function Fr(e, t) {
  if ((e.f & Z) !== 0) {
    e.f ^= Z, (e.f & B) === 0 && (P(e, H), Se(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, s = (n.f & dt) !== 0 || (n.f & Fe) !== 0;
      Fr(n, s ? t : !1), n = r;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const f of i)
        (f.is_global || t) && f.in();
  }
}
function Wi(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : /* @__PURE__ */ Ce(n);
      t.append(n), n = s;
    }
}
let It = !1, We = !1;
function Ln(e) {
  We = e;
}
let w = null, se = !1;
function U(e) {
  w = e;
}
let m = null;
function ce(e) {
  m = e;
}
let j = null;
function Gi(e) {
  w !== null && (j === null ? j = [e] : j.push(e));
}
let V = null, W = 0, J = null;
function Ki(e) {
  J = e;
}
let Pr = 1, qe = 0, Ve = qe;
function qn(e) {
  Ve = e;
}
function Dr() {
  return ++Pr;
}
function St(e) {
  var t = e.f;
  if ((t & H) !== 0)
    return !0;
  if (t & q && (e.f &= ~Ue), (t & Te) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, s = 0; s < r; s++) {
      var i = n[s];
      if (St(
        /** @type {Derived} */
        i
      ) && wr(
        /** @type {Derived} */
        i
      ), i.wv > e.wv)
        return !0;
    }
    (t & ee) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    L === null && P(e, B);
  }
  return !1;
}
function Lr(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(j != null && j.includes(e)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & q) !== 0 ? Lr(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? P(i, H) : (i.f & B) !== 0 && P(i, Te), Se(
        /** @type {Effect} */
        i
      ));
    }
}
function qr(e) {
  var p;
  var t = V, n = W, r = J, s = w, i = j, f = fe, l = se, u = Ve, o = e.f;
  V = /** @type {null | Value[]} */
  null, W = 0, J = null, w = (o & (Fe | Pe)) === 0 ? e : null, j = null, ht(e.ctx), se = !1, Ve = ++qe, e.ac !== null && (Wt(() => {
    e.ac.abort(Xe);
  }), e.ac = null);
  try {
    e.f |= Xt;
    var c = (
      /** @type {Function} */
      e.fn
    ), d = c(), a = e.deps;
    if (V !== null) {
      var v;
      if (qt(e, W), a !== null && W > 0)
        for (a.length = W + V.length, v = 0; v < V.length; v++)
          a[W + v] = V[v];
      else
        e.deps = a = V;
      if (bn() && (e.f & ee) !== 0)
        for (v = W; v < a.length; v++)
          ((p = a[v]).reactions ?? (p.reactions = [])).push(e);
    } else a !== null && W < a.length && (qt(e, W), a.length = W);
    if (fr() && J !== null && !se && a !== null && (e.f & (q | Te | H)) === 0)
      for (v = 0; v < /** @type {Source[]} */
      J.length; v++)
        Lr(
          J[v],
          /** @type {Effect} */
          e
        );
    if (s !== null && s !== e) {
      if (qe++, s.deps !== null)
        for (let _ = 0; _ < n; _ += 1)
          s.deps[_].rv = qe;
      if (t !== null)
        for (const _ of t)
          _.rv = qe;
      J !== null && (r === null ? r = J : r.push(.../** @type {Source[]} */
      J));
    }
    return (e.f & Ne) !== 0 && (e.f ^= Ne), d;
  } catch (_) {
    return or(_);
  } finally {
    e.f ^= Xt, V = t, W = n, J = r, w = s, j = i, ht(f), se = l, Ve = u;
  }
}
function Zi(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = ii.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = t.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  if (n === null && (t.f & q) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (V === null || !V.includes(t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & ee) !== 0 && (i.f ^= ee, i.f &= ~Ue), wn(i), $r(i), qt(i, 0);
  }
}
function qt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Zi(e, n[r]);
}
function Et(e) {
  var t = e.f;
  if ((t & xe) === 0) {
    P(e, B);
    var n = m, r = It;
    m = e, It = !0;
    try {
      (t & (he | Qn)) !== 0 ? Ui(e) : Nr(e), Rr(e);
      var s = qr(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = Pr;
      var i;
      Jt && Ei && (e.f & H) !== 0 && e.deps;
    } finally {
      It = r, m = n;
    }
  }
}
function N(e) {
  var t = e.f, n = (t & q) !== 0;
  if (w !== null && !se) {
    var r = m !== null && (m.f & xe) !== 0;
    if (!r && !(j != null && j.includes(e))) {
      var s = w.deps;
      if ((w.f & Xt) !== 0)
        e.rv < qe && (e.rv = qe, V === null && s !== null && s[W] === e ? W++ : V === null ? V = [e] : V.push(e));
      else {
        (w.deps ?? (w.deps = [])).push(e);
        var i = e.reactions;
        i === null ? e.reactions = [w] : i.includes(w) || i.push(w);
      }
    }
  }
  if (We && Ie.has(e))
    return Ie.get(e);
  if (n) {
    var f = (
      /** @type {Derived} */
      e
    );
    if (We) {
      var l = f.v;
      return ((f.f & B) === 0 && f.reactions !== null || jr(f)) && (l = mn(f)), Ie.set(f, l), l;
    }
    var u = (f.f & ee) === 0 && !se && w !== null && (It || (w.f & ee) !== 0), o = f.deps === null;
    St(f) && (u && (f.f |= ee), wr(f)), u && !o && Br(f);
  }
  if (L != null && L.has(e))
    return L.get(e);
  if ((e.f & Ne) !== 0)
    throw e.v;
  return e.v;
}
function Br(e) {
  if (e.deps !== null) {
    e.f |= ee;
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & q) !== 0 && (t.f & ee) === 0 && Br(
        /** @type {Derived} */
        t
      );
  }
}
function jr(e) {
  if (e.v === D) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Ie.has(t) || (t.f & q) !== 0 && jr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Hr(e) {
  var t = se;
  try {
    return se = !0, e();
  } finally {
    se = t;
  }
}
const zr = /* @__PURE__ */ new Set(), un = /* @__PURE__ */ new Set();
function Ji(e) {
  for (var t = 0; t < e.length; t++)
    zr.add(e[t]);
  for (var n of un)
    n(e);
}
let Bn = null;
function Ct(e) {
  var g;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, s = ((g = e.composedPath) == null ? void 0 : g.call(e)) || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  Bn = e;
  var f = 0, l = Bn === e && e.__root;
  if (l) {
    var u = s.indexOf(l);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var o = s.indexOf(t);
    if (o === -1)
      return;
    u <= o && (f = u);
  }
  if (i = /** @type {Element} */
  s[f] || e.target, i !== t) {
    Dt(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var c = w, d = m;
    U(null), ce(null);
    try {
      for (var a, v = []; i !== null; ) {
        var p = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var _ = i["__" + r];
          _ != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && _.call(i, e);
        } catch (x) {
          a ? v.push(x) : a = x;
        }
        if (e.cancelBubble || p === t || p === null)
          break;
        i = p;
      }
      if (a) {
        for (let x of v)
          queueMicrotask(() => {
            throw x;
          });
        throw a;
      }
    } finally {
      e.__root = t, delete e.currentTarget, U(c), ce(d);
    }
  }
}
function Xi(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function an(e, t) {
  var n = (
    /** @type {Effect} */
    m
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function En(e, t) {
  var n = (t & ri) !== 0, r, s = !e.startsWith("<!>");
  return () => {
    if (A)
      return an(C, null), C;
    r === void 0 && (r = Xi(s ? e : "<!>" + e), r = /** @type {TemplateNode} */
    /* @__PURE__ */ bt(r));
    var i = (
      /** @type {TemplateNode} */
      n || Er ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    return an(i, i), i;
  };
}
function Mt(e, t) {
  if (A) {
    var n = (
      /** @type {Effect & { nodes: EffectNodes }} */
      m
    );
    ((n.f & Vt) === 0 || n.nodes.end === null) && (n.nodes.end = C), $n();
    return;
  }
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const Qi = ["touchstart", "touchmove"];
function es(e) {
  return Qi.includes(e);
}
let cn = !0;
function jn(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = n + "");
}
function Vr(e, t) {
  return Ur(e, t);
}
function ts(e, t) {
  on(), t.intro = t.intro ?? !1;
  const n = t.target, r = A, s = C;
  try {
    for (var i = /* @__PURE__ */ bt(n); i && (i.nodeType !== pt || /** @type {Comment} */
    i.data !== Zn); )
      i = /* @__PURE__ */ Ce(i);
    if (!i)
      throw ct;
    De(!0), te(
      /** @type {Comment} */
      i
    );
    const f = Ur(e, { ...t, anchor: i });
    return De(!1), /**  @type {Exports} */
    f;
  } catch (f) {
    if (f instanceof Error && f.message.split(`
`).some((l) => l.startsWith("https://svelte.dev/e/")))
      throw f;
    return f !== ct && console.warn("Failed to hydrate: ", f), t.recover === !1 && vi(), on(), Sr(n), De(!1), Vr(e, t);
  } finally {
    De(r), te(s);
  }
}
const Je = /* @__PURE__ */ new Map();
function Ur(e, { target: t, anchor: n, props: r = {}, events: s, context: i, intro: f = !0 }) {
  on();
  var l = /* @__PURE__ */ new Set(), u = (d) => {
    for (var a = 0; a < d.length; a++) {
      var v = d[a];
      if (!l.has(v)) {
        l.add(v);
        var p = es(v);
        t.addEventListener(v, Ct, { passive: p });
        var _ = Je.get(v);
        _ === void 0 ? (document.addEventListener(v, Ct, { passive: p }), Je.set(v, 1)) : Je.set(v, _ + 1);
      }
    }
  };
  u(Ht(zr)), un.add(u);
  var o = void 0, c = zi(() => {
    var d = n ?? t.appendChild(Me());
    return Ai(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (a) => {
        if (i) {
          ir({});
          var v = (
            /** @type {ComponentContext} */
            fe
          );
          v.c = i;
        }
        if (s && (r.$$events = s), A && an(
          /** @type {TemplateNode} */
          a,
          null
        ), cn = f, o = e(a, r) || {}, cn = !0, A && (m.nodes.end = C, C === null || C.nodeType !== pt || /** @type {Comment} */
        C.data !== _n))
          throw Ut(), ct;
        i && sr();
      }
    ), () => {
      var p;
      for (var a of l) {
        t.removeEventListener(a, Ct);
        var v = (
          /** @type {number} */
          Je.get(a)
        );
        --v === 0 ? (document.removeEventListener(a, Ct), Je.delete(a)) : Je.set(a, v);
      }
      un.delete(u), d !== n && ((p = d.parentNode) == null || p.removeChild(d));
    };
  });
  return dn.set(o, c), o;
}
let dn = /* @__PURE__ */ new WeakMap();
function ns(e, t) {
  const n = dn.get(e);
  return n ? (dn.delete(e), n(t)) : Promise.resolve();
}
function rs(e, t, n) {
  for (var r = [], s = t.length, i, f = t.length, l = 0; l < s; l++) {
    let d = t[l];
    tt(
      d,
      () => {
        if (i) {
          if (i.pending.delete(d), i.done.add(d), i.pending.size === 0) {
            var a = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            hn(Ht(i.done)), a.delete(i), a.size === 0 && (e.outrogroups = null);
          }
        } else
          f -= 1;
      },
      !1
    );
  }
  if (f === 0) {
    var u = r.length === 0 && n !== null;
    if (u) {
      var o = (
        /** @type {Element} */
        n
      ), c = (
        /** @type {Element} */
        o.parentNode
      );
      Sr(c), c.append(o), e.items.clear();
    }
    hn(t, !u);
  } else
    i = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function hn(e, t = !0) {
  for (var n = 0; n < e.length; n++)
    ne(e[n], t);
}
var Hn;
function zn(e, t, n, r, s, i = null) {
  var f = e, l = /* @__PURE__ */ new Map();
  {
    var u = (
      /** @type {Element} */
      e
    );
    f = A ? te(/* @__PURE__ */ bt(u)) : u.appendChild(Me());
  }
  A && $n();
  var o = null, c = /* @__PURE__ */ Mi(() => {
    var g = n();
    return Jn(g) ? g : g == null ? [] : Ht(g);
  }), d, a = !0;
  function v() {
    _.fallback = o, is(_, d, f, t, r), o !== null && (d.length === 0 ? (o.f & Ee) === 0 ? Mr(o) : (o.f ^= Ee, wt(o, null, f)) : tt(o, () => {
      o = null;
    }));
  }
  var p = Ar(() => {
    d = /** @type {V[]} */
    N(c);
    var g = d.length;
    let x = !1;
    if (A) {
      var E = mi(f) === vn;
      E !== (g === 0) && (f = Qt(), te(f), De(!1), x = !0);
    }
    for (var k = /* @__PURE__ */ new Set(), T = (
      /** @type {Batch} */
      S
    ), Y = Li(), b = 0; b < g; b += 1) {
      A && C.nodeType === pt && /** @type {Comment} */
      C.data === _n && (f = /** @type {Comment} */
      C, x = !0, De(!1));
      var M = d[b], re = r(M, b), I = a ? null : l.get(re);
      I ? (I.v && _t(I.v, M), I.i && _t(I.i, b), Y && T.skipped_effects.delete(I.e)) : (I = ss(
        l,
        a ? f : Hn ?? (Hn = Me()),
        M,
        re,
        b,
        s,
        t,
        n
      ), a || (I.e.f |= Ee), l.set(re, I)), k.add(re);
    }
    if (g === 0 && i && !o && (a ? o = le(() => i(f)) : (o = le(() => i(Hn ?? (Hn = Me()))), o.f |= Ee)), A && g > 0 && te(Qt()), !a)
      if (Y) {
        for (const [Ke, Ze] of l)
          k.has(Ke) || T.skipped_effects.add(Ze.e);
        T.oncommit(v), T.ondiscard(() => {
        });
      } else
        v();
    x && De(!0), N(c);
  }), _ = { effect: p, items: l, outrogroups: null, fallback: o };
  a = !1, A && (f = C);
}
function is(e, t, n, r, s) {
  var I, Ke, Ze, kn, Sn, Tn, Cn, An, Rn;
  var i = t.length, f = e.items, l = e.effect.first, u, o = null, c, d = [], a = [], v, p, _, g;
  for (g = 0; g < i; g += 1)
    v = t[g], p = s(v, g), _ = /** @type {EachItem} */
    f.get(p).e, (_.f & Ee) === 0 && ((Ke = (I = _.nodes) == null ? void 0 : I.a) == null || Ke.measure(), (c ?? (c = /* @__PURE__ */ new Set())).add(_));
  for (g = 0; g < i; g += 1) {
    if (v = t[g], p = s(v, g), _ = /** @type {EachItem} */
    f.get(p).e, e.outrogroups !== null)
      for (const _e of e.outrogroups)
        _e.pending.delete(_), _e.done.delete(_);
    if ((_.f & Ee) !== 0)
      if (_.f ^= Ee, _ === l)
        wt(_, null, n);
      else {
        var x = o ? o.next : l;
        _ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Ae(e, o, _), Ae(e, _, x), wt(_, x, n), o = _, d = [], a = [], l = o.next;
        continue;
      }
    if ((_.f & Z) !== 0 && (Mr(_), (kn = (Ze = _.nodes) == null ? void 0 : Ze.a) == null || kn.unfix(), (c ?? (c = /* @__PURE__ */ new Set())).delete(_)), _ !== l) {
      if (u !== void 0 && u.has(_)) {
        if (d.length < a.length) {
          var E = a[0], k;
          o = E.prev;
          var T = d[0], Y = d[d.length - 1];
          for (k = 0; k < d.length; k += 1)
            wt(d[k], E, n);
          for (k = 0; k < a.length; k += 1)
            u.delete(a[k]);
          Ae(e, T.prev, Y.next), Ae(e, o, T), Ae(e, Y, E), l = E, o = Y, g -= 1, d = [], a = [];
        } else
          u.delete(_), wt(_, l, n), Ae(e, _.prev, _.next), Ae(e, _, o === null ? e.effect.first : o.next), Ae(e, o, _), o = _;
        continue;
      }
      for (d = [], a = []; l !== null && l !== _; )
        (u ?? (u = /* @__PURE__ */ new Set())).add(l), a.push(l), l = l.next;
      if (l === null)
        continue;
    }
    (_.f & Ee) === 0 && d.push(_), o = _, l = _.next;
  }
  if (e.outrogroups !== null) {
    for (const _e of e.outrogroups)
      _e.pending.size === 0 && (hn(Ht(_e.done)), (Sn = e.outrogroups) == null || Sn.delete(_e));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (l !== null || u !== void 0) {
    var b = [];
    if (u !== void 0)
      for (_ of u)
        (_.f & Z) === 0 && b.push(_);
    for (; l !== null; )
      (l.f & Z) === 0 && l !== e.fallback && b.push(l), l = l.next;
    var M = b.length;
    if (M > 0) {
      var re = i === 0 ? n : null;
      {
        for (g = 0; g < M; g += 1)
          (Cn = (Tn = b[g].nodes) == null ? void 0 : Tn.a) == null || Cn.measure();
        for (g = 0; g < M; g += 1)
          (Rn = (An = b[g].nodes) == null ? void 0 : An.a) == null || Rn.fix();
      }
      rs(e, b, re);
    }
  }
  Oe(() => {
    var _e, Nn;
    if (c !== void 0)
      for (_ of c)
        (Nn = (_e = _.nodes) == null ? void 0 : _e.a) == null || Nn.apply();
  });
}
function ss(e, t, n, r, s, i, f, l) {
  var u = (f & Jr) !== 0 ? (f & Qr) === 0 ? /* @__PURE__ */ mr(n, !1, !1) : Ye(n) : null, o = (f & Xr) !== 0 ? Ye(s) : null;
  return {
    v: u,
    i: o,
    e: le(() => (i(t, u ?? n, o ?? s, l), () => {
      e.delete(r);
    }))
  };
}
function wt(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, s = e.nodes.end, i = t && (t.f & Ee) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Ce(r)
      );
      if (i.before(r), r === s)
        return;
      r = f;
    }
}
function Ae(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
const fs = () => performance.now(), be = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (e) => requestAnimationFrame(e)
  ),
  now: () => fs(),
  tasks: /* @__PURE__ */ new Set()
};
function Yr() {
  const e = be.now();
  be.tasks.forEach((t) => {
    t.c(e) || (be.tasks.delete(t), t.f());
  }), be.tasks.size !== 0 && be.tick(Yr);
}
function ls(e) {
  let t;
  return be.tasks.size === 0 && be.tick(Yr), {
    promise: new Promise((n) => {
      be.tasks.add(t = { c: e, f: n });
    }),
    abort() {
      be.tasks.delete(t);
    }
  };
}
function At(e, t) {
  Wt(() => {
    e.dispatchEvent(new CustomEvent(t));
  });
}
function os(e) {
  if (e === "float") return "cssFloat";
  if (e === "offset") return "cssOffset";
  if (e.startsWith("--")) return e;
  const t = e.split("-");
  return t.length === 1 ? t[0] : t[0] + t.slice(1).map(
    /** @param {any} word */
    (n) => n[0].toUpperCase() + n.slice(1)
  ).join("");
}
function Vn(e) {
  const t = {}, n = e.split(";");
  for (const r of n) {
    const [s, i] = r.split(":");
    if (!s || i === void 0) break;
    const f = os(s.trim());
    t[f] = i.trim();
  }
  return t;
}
const us = (e) => e;
function Un(e, t, n) {
  var r = (
    /** @type {Effect} */
    m
  ), s = (
    /** @type {EffectNodes} */
    r.nodes
  ), i, f, l, u = null;
  s.a ?? (s.a = {
    element: e,
    measure() {
      i = this.element.getBoundingClientRect();
    },
    apply() {
      if (l == null || l.abort(), f = this.element.getBoundingClientRect(), i.left !== f.left || i.right !== f.right || i.top !== f.top || i.bottom !== f.bottom) {
        const o = t()(this.element, { from: i, to: f }, n == null ? void 0 : n());
        l = Bt(this.element, o, void 0, 1, () => {
          l == null || l.abort(), l = void 0;
        });
      }
    },
    fix() {
      if (!e.getAnimations().length) {
        var { position: o, width: c, height: d } = getComputedStyle(e);
        if (o !== "absolute" && o !== "fixed") {
          var a = (
            /** @type {HTMLElement | SVGElement} */
            e.style
          );
          u = {
            position: a.position,
            width: a.width,
            height: a.height,
            transform: a.transform
          }, a.position = "absolute", a.width = c, a.height = d;
          var v = e.getBoundingClientRect();
          if (i.left !== v.left || i.top !== v.top) {
            var p = `translate(${i.left - v.left}px, ${i.top - v.top}px)`;
            a.transform = a.transform ? `${a.transform} ${p}` : p;
          }
        }
      }
    },
    unfix() {
      if (u) {
        var o = (
          /** @type {HTMLElement | SVGElement} */
          e.style
        );
        o.position = u.position, o.width = u.width, o.height = u.height, o.transform = u.transform;
      }
    }
  }), s.a.element = e;
}
function Rt(e, t, n, r) {
  var k;
  var s = (e & ei) !== 0, i = (e & ti) !== 0, f = s && i, l = (e & ni) !== 0, u = f ? "both" : s ? "in" : "out", o, c = t.inert, d = t.style.overflow, a, v;
  function p() {
    return Wt(() => o ?? (o = n()(t, (r == null ? void 0 : r()) ?? /** @type {P} */
    {}, {
      direction: u
    })));
  }
  var _ = {
    is_global: l,
    in() {
      var T;
      if (t.inert = c, !s) {
        v == null || v.abort(), (T = v == null ? void 0 : v.reset) == null || T.call(v);
        return;
      }
      i || a == null || a.abort(), At(t, "introstart"), a = Bt(t, p(), v, 1, () => {
        At(t, "introend"), a == null || a.abort(), a = o = void 0, t.style.overflow = d;
      });
    },
    out(T) {
      if (!i) {
        T == null || T(), o = void 0;
        return;
      }
      t.inert = !0, At(t, "outrostart"), v = Bt(t, p(), a, 0, () => {
        At(t, "outroend"), T == null || T();
      });
    },
    stop: () => {
      a == null || a.abort(), v == null || v.abort();
    }
  }, g = (
    /** @type {Effect & { nodes: EffectNodes }} */
    m
  );
  if (((k = g.nodes).t ?? (k.t = [])).push(_), s && cn) {
    var x = l;
    if (!x) {
      for (var E = (
        /** @type {Effect | null} */
        g.parent
      ); E && (E.f & dt) !== 0; )
        for (; (E = E.parent) && (E.f & he) === 0; )
          ;
      x = !E || (E.f & Vt) !== 0;
    }
    x && Tr(() => {
      Hr(() => _.in());
    });
  }
}
function Bt(e, t, n, r, s) {
  var i = r === 1;
  if (oi(t)) {
    var f, l = !1;
    return Oe(() => {
      if (!l) {
        var g = t({ direction: i ? "in" : "out" });
        f = Bt(e, g, n, r, s);
      }
    }), {
      abort: () => {
        l = !0, f == null || f.abort();
      },
      deactivate: () => f.deactivate(),
      reset: () => f.reset(),
      t: () => f.t()
    };
  }
  if (n == null || n.deactivate(), !(t != null && t.duration))
    return s(), {
      abort: gt,
      deactivate: gt,
      reset: gt,
      t: () => r
    };
  const { delay: u = 0, css: o, tick: c, easing: d = us } = t;
  var a = [];
  if (i && n === void 0 && (c && c(0, 1), o)) {
    var v = Vn(o(0, 1));
    a.push(v, v);
  }
  var p = () => 1 - r, _ = e.animate(a, { duration: u, fill: "forwards" });
  return _.onfinish = () => {
    _.cancel();
    var g = (n == null ? void 0 : n.t()) ?? 1 - r;
    n == null || n.abort();
    var x = r - g, E = (
      /** @type {number} */
      t.duration * Math.abs(x)
    ), k = [];
    if (E > 0) {
      var T = !1;
      if (o)
        for (var Y = Math.ceil(E / 16.666666666666668), b = 0; b <= Y; b += 1) {
          var M = g + x * d(b / Y), re = Vn(o(M, 1 - M));
          k.push(re), T || (T = re.overflow === "hidden");
        }
      T && (e.style.overflow = "hidden"), p = () => {
        var I = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          _.currentTime
        );
        return g + x * d(I / E);
      }, c && ls(() => {
        if (_.playState !== "running") return !1;
        var I = p();
        return c(I, 1 - I), !0;
      });
    }
    _ = e.animate(k, { duration: E, fill: "forwards" }), _.onfinish = () => {
      p = () => r, c == null || c(r, 1 - r), s();
    };
  }, {
    abort: () => {
      _ && (_.cancel(), _.effect = null, _.onfinish = gt);
    },
    deactivate: () => {
      s = gt;
    },
    reset: () => {
      r === 0 && (c == null || c(1, 0));
    },
    t: () => p()
  };
}
function as(e, t) {
  Tr(() => {
    var n = e.getRootNode(), r = (
      /** @type {ShadowRoot} */
      n.host ? (
        /** @type {ShadowRoot} */
        n
      ) : (
        /** @type {Document} */
        n.head ?? /** @type {Document} */
        n.ownerDocument.head
      )
    );
    if (!r.querySelector("#" + t.hash)) {
      const s = document.createElement("style");
      s.id = t.hash, s.textContent = t.code, r.appendChild(s);
    }
  });
}
function cs(e, t) {
  return e == null ? null : String(e);
}
function Yn(e, t, n, r) {
  var s = e.__style;
  if (A || s !== t) {
    var i = cs(t);
    (!A || i !== e.getAttribute("style")) && (i == null ? e.removeAttribute("style") : e.style.cssText = i), e.__style = t;
  }
  return r;
}
function ds(e, t, n, r) {
  var s = (
    /** @type {V} */
    r
  ), i = !0, f = () => (i && (i = !1, s = /** @type {V} */
  r), s), l;
  l = /** @type {V} */
  e[t], l === void 0 && r !== void 0 && (l = f());
  var u;
  u = () => {
    var a = (
      /** @type {V} */
      e[t]
    );
    return a === void 0 ? f() : (i = !0, a);
  };
  var o = !1, c = /* @__PURE__ */ yn(() => (o = !1, u())), d = (
    /** @type {Effect} */
    m
  );
  return (
    /** @type {() => V} */
    (function(a, v) {
      if (arguments.length > 0) {
        const p = v ? N(c) : a;
        return ge(c, p), o = !0, s !== void 0 && (s = p), a;
      }
      return We && o || (d.f & xe) !== 0 ? c.v : N(c);
    })
  );
}
function hs(e) {
  return new vs(e);
}
var me, Q;
class vs {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(t) {
    /** @type {any} */
    y(this, me);
    /** @type {Record<string, any>} */
    y(this, Q);
    var i;
    var n = /* @__PURE__ */ new Map(), r = (f, l) => {
      var u = /* @__PURE__ */ mr(l, !1, !1);
      return n.set(f, u), u;
    };
    const s = new Proxy(
      { ...t.props || {}, $$events: {} },
      {
        get(f, l) {
          return N(n.get(l) ?? r(l, Reflect.get(f, l)));
        },
        has(f, l) {
          return l === ci ? !0 : (N(n.get(l) ?? r(l, Reflect.get(f, l))), Reflect.has(f, l));
        },
        set(f, l, u) {
          return ge(n.get(l) ?? r(l, u), u), Reflect.set(f, l, u);
        }
      }
    );
    $(this, Q, (t.hydrate ? ts : Vr)(t.component, {
      target: t.target,
      anchor: t.anchor,
      props: s,
      context: t.context,
      intro: t.intro ?? !1,
      recover: t.recover
    })), (!((i = t == null ? void 0 : t.props) != null && i.$$host) || t.sync === !1) && dr(), $(this, me, s.$$events);
    for (const f of Object.keys(h(this, Q)))
      f === "$set" || f === "$destroy" || f === "$on" || Dt(this, f, {
        get() {
          return h(this, Q)[f];
        },
        /** @param {any} value */
        set(l) {
          h(this, Q)[f] = l;
        },
        enumerable: !0
      });
    h(this, Q).$set = /** @param {Record<string, any>} next */
    (f) => {
      Object.assign(s, f);
    }, h(this, Q).$destroy = () => {
      ns(h(this, Q));
    };
  }
  /** @param {Record<string, any>} props */
  $set(t) {
    h(this, Q).$set(t);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(t, n) {
    h(this, me)[t] = h(this, me)[t] || [];
    const r = (...s) => n.call(this, ...s);
    return h(this, me)[t].push(r), () => {
      h(this, me)[t] = h(this, me)[t].filter(
        /** @param {any} fn */
        (s) => s !== r
      );
    };
  }
  $destroy() {
    h(this, Q).$destroy();
  }
}
me = new WeakMap(), Q = new WeakMap();
let Wr;
typeof HTMLElement == "function" && (Wr = class extends HTMLElement {
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(t, n, r) {
    super();
    /** The Svelte component constructor */
    R(this, "$$ctor");
    /** Slots */
    R(this, "$$s");
    /** @type {any} The Svelte component instance */
    R(this, "$$c");
    /** Whether or not the custom element is connected */
    R(this, "$$cn", !1);
    /** @type {Record<string, any>} Component props data */
    R(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    R(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    R(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    R(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    R(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    R(this, "$$me");
    this.$$ctor = t, this.$$s = n, r && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(t, n, r) {
    if (this.$$l[t] = this.$$l[t] || [], this.$$l[t].push(n), this.$$c) {
      const s = this.$$c.$on(t, n);
      this.$$l_u.set(n, s);
    }
    super.addEventListener(t, n, r);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(t, n, r) {
    if (super.removeEventListener(t, n, r), this.$$c) {
      const s = this.$$l_u.get(n);
      s && (s(), this.$$l_u.delete(n));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let n = function(i) {
        return (f) => {
          const l = document.createElement("slot");
          i !== "default" && (l.name = i), Mt(f, l);
        };
      };
      var t = n;
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const r = {}, s = _s(this);
      for (const i of this.$$s)
        i in s && (i === "default" && !this.$$d.children ? (this.$$d.children = n(i), r.default = !0) : r[i] = n(i));
      for (const i of this.attributes) {
        const f = this.$$g_p(i.name);
        f in this.$$d || (this.$$d[f] = Ft(f, i.value, this.$$p_d, "toProp"));
      }
      for (const i in this.$$p_d)
        !(i in this.$$d) && this[i] !== void 0 && (this.$$d[i] = this[i], delete this[i]);
      this.$$c = hs({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: r,
          $$host: this
        }
      }), this.$$me = Hi(() => {
        Cr(() => {
          var i;
          this.$$r = !0;
          for (const f of Pt(this.$$c)) {
            if (!((i = this.$$p_d[f]) != null && i.reflect)) continue;
            this.$$d[f] = this.$$c[f];
            const l = Ft(
              f,
              this.$$d[f],
              this.$$p_d,
              "toAttribute"
            );
            l == null ? this.removeAttribute(this.$$p_d[f].attribute || f) : this.setAttribute(this.$$p_d[f].attribute || f, l);
          }
          this.$$r = !1;
        });
      });
      for (const i in this.$$l)
        for (const f of this.$$l[i]) {
          const l = this.$$c.$on(i, f);
          this.$$l_u.set(f, l);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(t, n, r) {
    var s;
    this.$$r || (t = this.$$g_p(t), this.$$d[t] = Ft(t, r, this.$$p_d, "toProp"), (s = this.$$c) == null || s.$set({ [t]: this.$$d[t] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }
  /**
   * @param {string} attribute_name
   */
  $$g_p(t) {
    return Pt(this.$$p_d).find(
      (n) => this.$$p_d[n].attribute === t || !this.$$p_d[n].attribute && n.toLowerCase() === t
    ) || t;
  }
});
function Ft(e, t, n, r) {
  var i;
  const s = (i = n[e]) == null ? void 0 : i.type;
  if (t = s === "Boolean" && typeof t != "boolean" ? t != null : t, !r || !n[e])
    return t;
  if (r === "toAttribute")
    switch (s) {
      case "Object":
      case "Array":
        return t == null ? null : JSON.stringify(t);
      case "Boolean":
        return t ? "" : null;
      case "Number":
        return t ?? null;
      default:
        return t;
    }
  else
    switch (s) {
      case "Object":
      case "Array":
        return t && JSON.parse(t);
      case "Boolean":
        return t;
      // conversion already handled above
      case "Number":
        return t != null ? +t : t;
      default:
        return t;
    }
}
function _s(e) {
  const t = {};
  return e.childNodes.forEach((n) => {
    t[
      /** @type {Element} node */
      n.slot || "default"
    ] = !0;
  }), t;
}
function ps(e, t, n, r, s, i) {
  let f = class extends Wr {
    constructor() {
      super(e, n, s), this.$$p_d = t;
    }
    static get observedAttributes() {
      return Pt(t).map(
        (l) => (t[l].attribute || l).toLowerCase()
      );
    }
  };
  return Pt(t).forEach((l) => {
    Dt(f.prototype, l, {
      get() {
        return this.$$c && l in this.$$c ? this.$$c[l] : this.$$d[l];
      },
      set(u) {
        var d;
        u = Ft(l, u, t), this.$$d[l] = u;
        var o = this.$$c;
        if (o) {
          var c = (d = et(o, l)) == null ? void 0 : d.get;
          c ? o[l] = u : o.$set({ [l]: u });
        }
      }
    });
  }), r.forEach((l) => {
    Dt(f.prototype, l, {
      get() {
        var u;
        return (u = this.$$c) == null ? void 0 : u[l];
      }
    });
  }), e.element = /** @type {any} */
  f, f;
}
function gs(e) {
  const t = e - 1;
  return t * t * t + 1;
}
function Wn(e, { from: t, to: n }, r = {}) {
  var { delay: s = 0, duration: i = (b) => Math.sqrt(b) * 120, easing: f = gs } = r, l = getComputedStyle(e), u = l.transform === "none" ? "" : l.transform, [o, c] = l.transformOrigin.split(" ").map(parseFloat);
  o /= e.clientWidth, c /= e.clientHeight;
  var d = $s(e), a = e.clientWidth / n.width / d, v = e.clientHeight / n.height / d, p = t.left + t.width * o, _ = t.top + t.height * c, g = n.left + n.width * o, x = n.top + n.height * c, E = (p - g) * a, k = (_ - x) * v, T = t.width / n.width, Y = t.height / n.height;
  return {
    delay: s,
    duration: typeof i == "function" ? i(Math.sqrt(E * E + k * k)) : i,
    easing: f,
    css: (b, M) => {
      var re = M * E, I = M * k, Ke = b + M * T, Ze = b + M * Y;
      return `transform: ${u} translate(${re}px, ${I}px) scale(${Ke}, ${Ze});`;
    }
  };
}
function $s(e) {
  if ("currentCSSZoom" in e)
    return (
      /** @type {number} */
      e.currentCSSZoom
    );
  for (var t = e, n = 1; t !== null; )
    n *= +getComputedStyle(t).zoom, t = /** @type {Element | null} */
    t.parentElement;
  return n;
}
function Gr(e) {
  const t = e - 1;
  return t * t * t + 1;
}
function ws(e, { delay: t = 0, duration: n = 400, easing: r = Gr, start: s = 0, opacity: i = 0 } = {}) {
  const f = getComputedStyle(e), l = +f.opacity, u = f.transform === "none" ? "" : f.transform, o = 1 - s, c = l * (1 - i);
  return {
    delay: t,
    duration: n,
    easing: r,
    css: (d, a) => `
			transform: ${u} scale(${1 - o * a});
			opacity: ${l - c * a}
		`
  };
}
function Gn(e, t) {
  for (const n in t) e[n] = t[n];
  return (
    /** @type {T & S} */
    e
  );
}
function ys({ fallback: e, ...t }) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function s(f, l, u) {
    const {
      delay: o = 0,
      duration: c = (
        /** @param {number} d */
        (b) => Math.sqrt(b) * 30
      ),
      easing: d = Gr
    } = Gn(Gn({}, t), u), a = f.getBoundingClientRect(), v = l.getBoundingClientRect(), p = a.left - v.left, _ = a.top - v.top, g = a.width / v.width, x = a.height / v.height, E = Math.sqrt(p * p + _ * _), k = getComputedStyle(l), T = k.transform === "none" ? "" : k.transform, Y = +k.opacity;
    return {
      delay: o,
      duration: typeof c == "function" ? c(E) : c,
      easing: d,
      css: (b, M) => `
			   opacity: ${b * Y};
			   transform-origin: top left;
			   transform: ${T} translate(${M * p}px,${M * _}px) scale(${b + (1 - b) * g}, ${b + (1 - b) * x});
		   `
    };
  }
  function i(f, l, u) {
    return (o, c) => (f.set(c.key, o), () => {
      if (l.has(c.key)) {
        const d = l.get(c.key);
        return l.delete(c.key), s(
          /** @type {Element} */
          d,
          o,
          c
        );
      }
      return f.delete(c.key), e && e(o, c, u);
    });
  }
  return [i(r, n, !1), i(n, r, !0)];
}
var ms = /* @__PURE__ */ En('<div role="button" tabindex="0" class="svelte-1ac7c51"> </div>'), bs = /* @__PURE__ */ En('<div role="button" tabindex="0" class="svelte-1ac7c51"> </div>'), Es = /* @__PURE__ */ En('<div class="container svelte-1ac7c51"><div class="boingers svelte-1ac7c51"></div> <div class="boingers svelte-1ac7c51"></div></div>');
const xs = {
  hash: "svelte-1ac7c51",
  code: ".container.svelte-1ac7c51 {width:300px;height:200px;display:flex;justify-content:space-between;}.boingers.svelte-1ac7c51 {display:grid;grid-template-rows:repeat(3, 1fr);grid-template-columns:repeat(2, 1fr);grid-gap:10px;}.boingers.svelte-1ac7c51 div:where(.svelte-1ac7c51) {width:50px;height:50px;display:flex;justify-content:center;align-items:center;color:#eee;font-weight:bold;border-radius:2px;cursor:pointer;}"
};
function ks(e, t) {
  ir(t, !0), as(e, xs);
  let n = ds(t, "color", 7, "pink");
  const [r, s] = ys({ fallback: ws });
  let i = /* @__PURE__ */ pe(Qe([
    { val: 1, boinged: !0 },
    { val: 2, boinged: !0 },
    { val: 3, boinged: !1 },
    { val: 4, boinged: !0 },
    { val: 5, boinged: !1 }
  ]));
  function f(d) {
    const a = N(i).findIndex((v) => v.val === d);
    N(i)[a].boinged = !N(i)[a].boinged;
  }
  var l = {
    get color() {
      return n();
    },
    set color(d = "pink") {
      n(d), dr();
    }
  }, u = Es(), o = Zt(u);
  zn(o, 29, () => N(i).filter((d) => !d.boinged), ({ val: d }) => d, (d, a) => {
    let v = () => N(a).val;
    var p = ms();
    p.__click = () => f(v()), p.__keydown = (g) => g.key === "Enter" && f(v());
    var _ = Zt(p, !0);
    $t(p), Dn(() => {
      Yn(p, `background:${n() ?? ""};`), jn(_, v());
    }), Un(p, () => Wn, null), Rt(1, p, () => s, () => ({ key: v() })), Rt(2, p, () => r, () => ({ key: v() })), Mt(d, p);
  }), $t(o);
  var c = Di(o, 2);
  return zn(c, 29, () => N(i).filter((d) => d.boinged), ({ val: d }) => d, (d, a) => {
    let v = () => N(a).val;
    var p = bs();
    p.__click = () => f(v()), p.__keydown = (g) => g.key === "Enter" && f(v());
    var _ = Zt(p, !0);
    $t(p), Dn(() => {
      Yn(p, `background:${n() ?? ""};`), jn(_, v());
    }), Un(p, () => Wn, null), Rt(1, p, () => s, () => ({ key: v() })), Rt(2, p, () => r, () => ({ key: v() })), Mt(d, p);
  }), $t(c), $t(u), Mt(e, u), sr(l);
}
Ji(["click", "keydown"]);
customElements.define("boinger-demo", ps(ks, { color: {} }, [], [], !0));
