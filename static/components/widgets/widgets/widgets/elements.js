var Ar = Object.defineProperty;
var _n = (e) => {
  throw TypeError(e);
};
var Rr = (e, t, n) => t in e ? Ar(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var S = (e, t, n) => Rr(e, typeof t != "symbol" ? t + "" : t, n), Lt = (e, t, n) => t.has(e) || _n("Cannot " + n);
var a = (e, t, n) => (Lt(e, t, "read from private field"), n ? n.call(e) : t.get(e)), m = (e, t, n) => t.has(e) ? _n("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), p = (e, t, n, r) => (Lt(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), C = (e, t, n) => (Lt(e, t, "access private method"), n);
var Rn;
typeof window < "u" && ((Rn = window.__svelte ?? (window.__svelte = {})).v ?? (Rn.v = /* @__PURE__ */ new Set())).add("5");
const Cr = 1, Nr = 2, Or = 16, kr = 2, Cn = "[", nn = "[!", rn = "]", lt = {}, k = Symbol(), jt = !1;
var Nn = Array.isArray, Dr = Array.prototype.indexOf, Ft = Array.from, Ct = Object.keys, Nt = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, Fr = Object.prototype, Ir = Array.prototype, Pr = Object.getPrototypeOf, pn = Object.isExtensible;
function Mr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function On() {
  var e, t, n = new Promise((r, s) => {
    e = r, t = s;
  });
  return { promise: n, resolve: e, reject: t };
}
const F = 2, Ot = 4, It = 8, kn = 1 << 24, $e = 16, Ce = 32, Ne = 64, sn = 128, J = 512, P = 1024, L = 2048, me = 4096, U = 8192, _e = 16384, ln = 32768, pt = 65536, gn = 1 << 17, Dn = 1 << 18, Ye = 1 << 19, Lr = 1 << 20, xe = 1 << 25, Be = 32768, Bt = 1 << 21, fn = 1 << 22, Se = 1 << 23, zt = Symbol("$state"), zr = Symbol("legacy props"), We = new class extends Error {
  constructor() {
    super(...arguments);
    S(this, "name", "StaleReactionError");
    S(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}(), Fn = 3, at = 8;
function qr() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function jr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Br() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function Hr() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Vr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Yr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ur() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Pt(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Wr() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let x = !1;
function De(e) {
  x = e;
}
let T;
function X(e) {
  if (e === null)
    throw Pt(), lt;
  return T = e;
}
function un() {
  return X(/* @__PURE__ */ we(T));
}
function Et(e) {
  if (x) {
    if (/* @__PURE__ */ we(T) !== null)
      throw Pt(), lt;
    T = e;
  }
}
function Kr(e = 1) {
  if (x) {
    for (var t = e, n = T; t--; )
      n = /** @type {TemplateNode} */
      /* @__PURE__ */ we(n);
    T = n;
  }
}
function Ht(e = !0) {
  for (var t = 0, n = T; ; ) {
    if (n.nodeType === at) {
      var r = (
        /** @type {Comment} */
        n.data
      );
      if (r === rn) {
        if (t === 0) return n;
        t -= 1;
      } else (r === Cn || r === nn) && (t += 1);
    }
    var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ we(n)
    );
    e && n.remove(), n = s;
  }
}
function Gr(e) {
  if (!e || e.nodeType !== at)
    throw Pt(), lt;
  return (
    /** @type {Comment} */
    e.data
  );
}
function In(e) {
  return e === this.v;
}
function Jr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Pn(e) {
  return !Jr(e, this.v);
}
let Xr = !1, te = null;
function ft(e) {
  te = e;
}
function Mn(e, t = !1, n) {
  te = {
    p: te,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function Ln(e) {
  var t = (
    /** @type {ComponentContext} */
    te
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      vi(r);
  }
  return e !== void 0 && (t.x = e), t.i = !0, te = t.p, e ?? /** @type {T} */
  {};
}
function zn() {
  return !0;
}
let Fe = [];
function qn() {
  var e = Fe;
  Fe = [], Mr(e);
}
function qe(e) {
  if (Fe.length === 0 && !vt) {
    var t = Fe;
    queueMicrotask(() => {
      t === Fe && qn();
    });
  }
  Fe.push(e);
}
function Zr() {
  for (; Fe.length > 0; )
    qn();
}
function jn(e) {
  var t = y;
  if (t === null)
    return $.f |= Se, e;
  if ((t.f & ln) === 0) {
    if ((t.f & sn) === 0)
      throw e;
    t.b.error(e);
  } else
    ut(e, t);
}
function ut(e, t) {
  for (; t !== null; ) {
    if ((t.f & sn) !== 0)
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
const Qr = -7169;
function N(e, t) {
  e.f = e.f & Qr | t;
}
function on(e) {
  (e.f & J) !== 0 || e.deps === null ? N(e, P) : N(e, me);
}
function Bn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & F) === 0 || (t.f & Be) === 0 || (t.f ^= Be, Bn(
        /** @type {Derived} */
        t.deps
      ));
}
function Hn(e, t, n) {
  (e.f & L) !== 0 ? t.add(e) : (e.f & me) !== 0 && n.add(e), Bn(e.deps), N(e, P);
}
const bt = /* @__PURE__ */ new Set();
let b = null, D = null, V = [], Mt = null, Vt = !1, vt = !1;
var Xe, Ze, Pe, Qe, mt, et, tt, nt, oe, Yt, Ut, Vn;
const vn = class vn {
  constructor() {
    m(this, oe);
    S(this, "committed", !1);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    S(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    S(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    m(this, Xe, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    m(this, Ze, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    m(this, Pe, 0);
    /**
     * The number of async effects that are currently in flight, _not_ inside a pending boundary
     */
    m(this, Qe, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    m(this, mt, null);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    m(this, et, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    m(this, tt, /* @__PURE__ */ new Set());
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    S(this, "skipped_effects", /* @__PURE__ */ new Set());
    S(this, "is_fork", !1);
    m(this, nt, !1);
  }
  is_deferred() {
    return this.is_fork || a(this, Qe) > 0;
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    var s;
    V = [], this.apply();
    var n = [], r = [];
    for (const i of t)
      C(this, oe, Yt).call(this, i, n, r);
    if (this.is_deferred())
      C(this, oe, Ut).call(this, r), C(this, oe, Ut).call(this, n);
    else {
      for (const i of a(this, Xe)) i();
      a(this, Xe).clear(), a(this, Pe) === 0 && C(this, oe, Vn).call(this), b = null, $n(r), $n(n), (s = a(this, mt)) == null || s.resolve();
    }
    D = null;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, n) {
    n !== k && !this.previous.has(t) && this.previous.set(t, n), (t.f & Se) === 0 && (this.current.set(t, t.v), D == null || D.set(t, t.v));
  }
  activate() {
    b = this, this.apply();
  }
  deactivate() {
    b === this && (b = null, D = null);
  }
  flush() {
    if (this.activate(), V.length > 0) {
      if (Un(), b !== null && b !== this)
        return;
    } else a(this, Pe) === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of a(this, Ze)) t(this);
    a(this, Ze).clear();
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    p(this, Pe, a(this, Pe) + 1), t && p(this, Qe, a(this, Qe) + 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(t) {
    p(this, Pe, a(this, Pe) - 1), t && p(this, Qe, a(this, Qe) - 1), !a(this, nt) && (p(this, nt, !0), qe(() => {
      p(this, nt, !1), this.is_deferred() ? V.length > 0 && this.flush() : this.revive();
    }));
  }
  revive() {
    for (const t of a(this, et))
      a(this, tt).delete(t), N(t, L), ge(t);
    for (const t of a(this, tt))
      N(t, me), ge(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    a(this, Xe).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    a(this, Ze).add(t);
  }
  settled() {
    return (a(this, mt) ?? p(this, mt, On())).promise;
  }
  static ensure() {
    if (b === null) {
      const t = b = new vn();
      bt.add(b), vt || qe(() => {
        b === t && t.flush();
      });
    }
    return b;
  }
  apply() {
  }
};
Xe = new WeakMap(), Ze = new WeakMap(), Pe = new WeakMap(), Qe = new WeakMap(), mt = new WeakMap(), et = new WeakMap(), tt = new WeakMap(), nt = new WeakMap(), oe = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Yt = function(t, n, r) {
  t.f ^= P;
  for (var s = t.first, i = null; s !== null; ) {
    var l = s.f, f = (l & (Ce | Ne)) !== 0, u = f && (l & P) !== 0, o = u || (l & U) !== 0 || this.skipped_effects.has(s);
    if (!o && s.fn !== null) {
      f ? s.f ^= P : i !== null && (l & (Ot | It | kn)) !== 0 ? i.b.defer_effect(s) : (l & Ot) !== 0 ? n.push(s) : yt(s) && ((l & $e) !== 0 && a(this, et).add(s), $t(s));
      var h = s.first;
      if (h !== null) {
        s = h;
        continue;
      }
    }
    var v = s.parent;
    for (s = s.next; s === null && v !== null; )
      v === i && (i = null), s = v.next, v = v.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
Ut = function(t) {
  for (var n = 0; n < t.length; n += 1)
    Hn(t[n], a(this, et), a(this, tt));
}, Vn = function() {
  var s;
  if (bt.size > 1) {
    this.previous.clear();
    var t = D, n = !0;
    for (const i of bt) {
      if (i === this) {
        n = !1;
        continue;
      }
      const l = [];
      for (const [u, o] of this.current) {
        if (i.current.has(u))
          if (n && o !== i.current.get(u))
            i.current.set(u, o);
          else
            continue;
        l.push(u);
      }
      if (l.length === 0)
        continue;
      const f = [...i.current.keys()].filter((u) => !this.current.has(u));
      if (f.length > 0) {
        var r = V;
        V = [];
        const u = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (const h of l)
          Wn(h, f, u, o);
        if (V.length > 0) {
          b = i, i.apply();
          for (const h of V)
            C(s = i, oe, Yt).call(s, h, [], []);
          i.deactivate();
        }
        V = r;
      }
    }
    b = null, D = t;
  }
  this.committed = !0, bt.delete(this);
};
let pe = vn;
function Yn(e) {
  var t = vt;
  vt = !0;
  try {
    for (var n; ; ) {
      if (Zr(), V.length === 0 && (b == null || b.flush(), V.length === 0))
        return Mt = null, /** @type {T} */
        n;
      Un();
    }
  } finally {
    vt = t;
  }
}
function Un() {
  Vt = !0;
  var e = null;
  try {
    for (var t = 0; V.length > 0; ) {
      var n = pe.ensure();
      if (t++ > 1e3) {
        var r, s;
        ei();
      }
      n.process(V), Ae.clear();
    }
  } finally {
    Vt = !1, Mt = null;
  }
}
function ei() {
  try {
    jr();
  } catch (e) {
    ut(e, Mt);
  }
}
let Q = null;
function $n(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (_e | U)) === 0 && yt(r) && (Q = /* @__PURE__ */ new Set(), $t(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? cr(r) : r.fn = null), (Q == null ? void 0 : Q.size) > 0)) {
        Ae.clear();
        for (const s of Q) {
          if ((s.f & (_e | U)) !== 0) continue;
          const i = [s];
          let l = s.parent;
          for (; l !== null; )
            Q.has(l) && (Q.delete(l), i.push(l)), l = l.parent;
          for (let f = i.length - 1; f >= 0; f--) {
            const u = i[f];
            (u.f & (_e | U)) === 0 && $t(u);
          }
        }
        Q.clear();
      }
    }
    Q = null;
  }
}
function Wn(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & F) !== 0 ? Wn(
        /** @type {Derived} */
        s,
        t,
        n,
        r
      ) : (i & (fn | $e)) !== 0 && (i & L) === 0 && Kn(s, t, r) && (N(s, L), ge(
        /** @type {Effect} */
        s
      ));
    }
}
function Kn(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (t.includes(s))
        return !0;
      if ((s.f & F) !== 0 && Kn(
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
function ge(e) {
  for (var t = Mt = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (Vt && t === y && (n & $e) !== 0 && (n & Dn) === 0)
      return;
    if ((n & (Ne | Ce)) !== 0) {
      if ((n & P) === 0) return;
      t.f ^= P;
    }
  }
  V.push(t);
}
function ti(e) {
  let t = 0, n = He(0), r;
  return () => {
    dn() && (A(n), fr(() => (t === 0 && (r = xi(() => e(() => _t(n)))), t += 1, () => {
      qe(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, _t(n));
      });
    })));
  };
}
var ni = pt | Ye | sn;
function ri(e, t, n) {
  new ii(e, t, n);
}
var H, wt, se, Me, le, K, z, fe, ce, Te, Le, he, rt, ze, it, st, de, Dt, R, Gn, Jn, Wt, xt, St, Kt;
class ii {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, n, r) {
    m(this, R);
    /** @type {Boundary | null} */
    S(this, "parent");
    S(this, "is_pending", !1);
    /** @type {TemplateNode} */
    m(this, H);
    /** @type {TemplateNode | null} */
    m(this, wt, x ? T : null);
    /** @type {BoundaryProps} */
    m(this, se);
    /** @type {((anchor: Node) => void)} */
    m(this, Me);
    /** @type {Effect} */
    m(this, le);
    /** @type {Effect | null} */
    m(this, K, null);
    /** @type {Effect | null} */
    m(this, z, null);
    /** @type {Effect | null} */
    m(this, fe, null);
    /** @type {DocumentFragment | null} */
    m(this, ce, null);
    /** @type {TemplateNode | null} */
    m(this, Te, null);
    m(this, Le, 0);
    m(this, he, 0);
    m(this, rt, !1);
    m(this, ze, !1);
    /** @type {Set<Effect>} */
    m(this, it, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    m(this, st, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    m(this, de, null);
    m(this, Dt, ti(() => (p(this, de, He(a(this, Le))), () => {
      p(this, de, null);
    })));
    p(this, H, t), p(this, se, n), p(this, Me, r), this.parent = /** @type {Effect} */
    y.b, this.is_pending = !!a(this, se).pending, p(this, le, ur(() => {
      if (y.b = this, x) {
        const i = a(this, wt);
        un(), /** @type {Comment} */
        i.nodeType === at && /** @type {Comment} */
        i.data === nn ? C(this, R, Jn).call(this) : (C(this, R, Gn).call(this), a(this, he) === 0 && (this.is_pending = !1));
      } else {
        var s = C(this, R, Wt).call(this);
        try {
          p(this, K, ie(() => r(s)));
        } catch (i) {
          this.error(i);
        }
        a(this, he) > 0 ? C(this, R, St).call(this) : this.is_pending = !1;
      }
      return () => {
        var i;
        (i = a(this, Te)) == null || i.remove();
      };
    }, ni)), x && p(this, H, T);
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Hn(t, a(this, it), a(this, st));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!a(this, se).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(t) {
    C(this, R, Kt).call(this, t), p(this, Le, a(this, Le) + t), !(!a(this, de) || a(this, rt)) && (p(this, rt, !0), qe(() => {
      p(this, rt, !1), a(this, de) && ot(a(this, de), a(this, Le));
    }));
  }
  get_effect_pending() {
    return a(this, Dt).call(this), A(
      /** @type {Source<number>} */
      a(this, de)
    );
  }
  /** @param {unknown} error */
  error(t) {
    var n = a(this, se).onerror;
    let r = a(this, se).failed;
    if (a(this, ze) || !n && !r)
      throw t;
    a(this, K) && (Z(a(this, K)), p(this, K, null)), a(this, z) && (Z(a(this, z)), p(this, z, null)), a(this, fe) && (Z(a(this, fe)), p(this, fe, null)), x && (X(
      /** @type {TemplateNode} */
      a(this, wt)
    ), Kr(), X(Ht()));
    var s = !1, i = !1;
    const l = () => {
      if (s) {
        Wr();
        return;
      }
      s = !0, i && Ur(), pe.ensure(), p(this, Le, 0), a(this, fe) !== null && Je(a(this, fe), () => {
        p(this, fe, null);
      }), this.is_pending = this.has_pending_snippet(), p(this, K, C(this, R, xt).call(this, () => (p(this, ze, !1), ie(() => a(this, Me).call(this, a(this, H)))))), a(this, he) > 0 ? C(this, R, St).call(this) : this.is_pending = !1;
    };
    var f = $;
    try {
      j(null), i = !0, n == null || n(t, l), i = !1;
    } catch (u) {
      ut(u, a(this, le) && a(this, le).parent);
    } finally {
      j(f);
    }
    r && qe(() => {
      p(this, fe, C(this, R, xt).call(this, () => {
        pe.ensure(), p(this, ze, !0);
        try {
          return ie(() => {
            r(
              a(this, H),
              () => t,
              () => l
            );
          });
        } catch (u) {
          return ut(
            u,
            /** @type {Effect} */
            a(this, le).parent
          ), null;
        } finally {
          p(this, ze, !1);
        }
      }));
    });
  }
}
H = new WeakMap(), wt = new WeakMap(), se = new WeakMap(), Me = new WeakMap(), le = new WeakMap(), K = new WeakMap(), z = new WeakMap(), fe = new WeakMap(), ce = new WeakMap(), Te = new WeakMap(), Le = new WeakMap(), he = new WeakMap(), rt = new WeakMap(), ze = new WeakMap(), it = new WeakMap(), st = new WeakMap(), de = new WeakMap(), Dt = new WeakMap(), R = new WeakSet(), Gn = function() {
  try {
    p(this, K, ie(() => a(this, Me).call(this, a(this, H))));
  } catch (t) {
    this.error(t);
  }
}, Jn = function() {
  const t = a(this, se).pending;
  t && (p(this, z, ie(() => t(a(this, H)))), qe(() => {
    var n = C(this, R, Wt).call(this);
    p(this, K, C(this, R, xt).call(this, () => (pe.ensure(), ie(() => a(this, Me).call(this, n))))), a(this, he) > 0 ? C(this, R, St).call(this) : (Je(
      /** @type {Effect} */
      a(this, z),
      () => {
        p(this, z, null);
      }
    ), this.is_pending = !1);
  }));
}, Wt = function() {
  var t = a(this, H);
  return this.is_pending && (p(this, Te, Re()), a(this, H).before(a(this, Te)), t = a(this, Te)), t;
}, /**
 * @param {() => Effect | null} fn
 */
xt = function(t) {
  var n = y, r = $, s = te;
  ue(a(this, le)), j(a(this, le)), ft(a(this, le).ctx);
  try {
    return t();
  } catch (i) {
    return jn(i), null;
  } finally {
    ue(n), j(r), ft(s);
  }
}, St = function() {
  const t = (
    /** @type {(anchor: Node) => void} */
    a(this, se).pending
  );
  a(this, K) !== null && (p(this, ce, document.createDocumentFragment()), a(this, ce).append(
    /** @type {TemplateNode} */
    a(this, Te)
  ), yi(a(this, K), a(this, ce))), a(this, z) === null && p(this, z, ie(() => t(a(this, H))));
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 */
Kt = function(t) {
  var n;
  if (!this.has_pending_snippet()) {
    this.parent && C(n = this.parent, R, Kt).call(n, t);
    return;
  }
  if (p(this, he, a(this, he) + t), a(this, he) === 0) {
    this.is_pending = !1;
    for (const r of a(this, it))
      N(r, L), ge(r);
    for (const r of a(this, st))
      N(r, me), ge(r);
    a(this, it).clear(), a(this, st).clear(), a(this, z) && Je(a(this, z), () => {
      p(this, z, null);
    }), a(this, ce) && (a(this, H).before(a(this, ce)), p(this, ce, null));
  }
};
function si(e, t, n, r) {
  const s = an;
  var i = e.filter((c) => !c.settled);
  if (n.length === 0 && i.length === 0) {
    r(t.map(s));
    return;
  }
  var l = b, f = (
    /** @type {Effect} */
    y
  ), u = li(), o = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((c) => c.promise)) : null;
  function h(c) {
    u();
    try {
      r(c);
    } catch (_) {
      (f.f & _e) === 0 && ut(_, f);
    }
    l == null || l.deactivate(), Gt();
  }
  if (n.length === 0) {
    o.then(() => h(t.map(s)));
    return;
  }
  function v() {
    u(), Promise.all(n.map((c) => /* @__PURE__ */ fi(c))).then((c) => h([...t.map(s), ...c])).catch((c) => ut(c, f));
  }
  o ? o.then(v) : v();
}
function li() {
  var e = y, t = $, n = te, r = b;
  return function(i = !0) {
    ue(e), j(t), ft(n), i && (r == null || r.activate());
  };
}
function Gt() {
  ue(null), j(null), ft(null);
}
// @__NO_SIDE_EFFECTS__
function an(e) {
  var t = F | L, n = $ !== null && ($.f & F) !== 0 ? (
    /** @type {Derived} */
    $
  ) : null;
  return y !== null && (y.f |= Ye), {
    ctx: te,
    deps: null,
    effects: null,
    equals: In,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      k
    ),
    wv: 0,
    parent: n ?? y,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function fi(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    y
  );
  r === null && qr();
  var s = (
    /** @type {Boundary} */
    r.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = He(
    /** @type {V} */
    k
  ), f = !$, u = /* @__PURE__ */ new Map();
  return $i(() => {
    var _;
    var o = On();
    i = o.promise;
    try {
      Promise.resolve(e()).then(o.resolve, o.reject).then(() => {
        h === b && h.committed && h.deactivate(), Gt();
      });
    } catch (d) {
      o.reject(d), Gt();
    }
    var h = (
      /** @type {Batch} */
      b
    );
    if (f) {
      var v = s.is_rendered();
      s.update_pending_count(1), h.increment(v), (_ = u.get(h)) == null || _.reject(We), u.delete(h), u.set(h, o);
    }
    const c = (d, g = void 0) => {
      if (h.activate(), g)
        g !== We && (l.f |= Se, ot(l, g));
      else {
        (l.f & Se) !== 0 && (l.f ^= Se), ot(l, d);
        for (const [w, E] of u) {
          if (u.delete(w), w === h) break;
          E.reject(We);
        }
      }
      f && (s.update_pending_count(-1), h.decrement(v));
    };
    o.promise.then(c, (d) => c(null, d || "unknown"));
  }), lr(() => {
    for (const o of u.values())
      o.reject(We);
  }), new Promise((o) => {
    function h(v) {
      function c() {
        v === i ? o(l) : h(i);
      }
      v.then(c, c);
    }
    h(i);
  });
}
// @__NO_SIDE_EFFECTS__
function ui(e) {
  const t = /* @__PURE__ */ an(e);
  return t.equals = Pn, t;
}
function Xn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      Z(
        /** @type {Effect} */
        t[n]
      );
  }
}
function oi(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & F) === 0)
      return (t.f & _e) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function cn(e) {
  var t, n = y;
  ue(oi(e));
  try {
    e.f &= ~Be, Xn(e), t = $r(e);
  } finally {
    ue(n);
  }
  return t;
}
function Zn(e) {
  var t = cn(e);
  if (!e.equals(t) && (e.wv = pr(), (!(b != null && b.is_fork) || e.deps === null) && (e.v = t, e.deps === null))) {
    N(e, P);
    return;
  }
  Ve || (D !== null ? (dn() || b != null && b.is_fork) && D.set(e, t) : on(e));
}
let Jt = /* @__PURE__ */ new Set();
const Ae = /* @__PURE__ */ new Map();
let Qn = !1;
function He(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: In,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function re(e, t) {
  const n = He(e);
  return Ei(n), n;
}
// @__NO_SIDE_EFFECTS__
function er(e, t = !1, n = !0) {
  const r = He(e);
  return t || (r.equals = Pn), r;
}
function Y(e, t, n = !1) {
  $ !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ee || ($.f & gn) !== 0) && zn() && ($.f & (F | $e | fn | gn)) !== 0 && !(M != null && M.includes(e)) && Yr();
  let r = n ? Ke(t) : t;
  return ot(e, r);
}
function ot(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    Ve ? Ae.set(e, t) : Ae.set(e, n), e.v = t;
    var r = pe.ensure();
    if (r.capture(e, n), (e.f & F) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & L) !== 0 && cn(s), on(s);
    }
    e.wv = pr(), tr(e, L), y !== null && (y.f & P) !== 0 && (y.f & (Ce | Ne)) === 0 && (W === null ? bi([e]) : W.push(e)), !r.is_fork && Jt.size > 0 && !Qn && ai();
  }
  return t;
}
function ai() {
  Qn = !1;
  for (const e of Jt)
    (e.f & P) !== 0 && N(e, me), yt(e) && $t(e);
  Jt.clear();
}
function _t(e) {
  Y(e, e.v + 1);
}
function tr(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, s = 0; s < r; s++) {
      var i = n[s], l = i.f, f = (l & L) === 0;
      if (f && N(i, t), (l & F) !== 0) {
        var u = (
          /** @type {Derived} */
          i
        );
        D == null || D.delete(u), (l & Be) === 0 && (l & J && (i.f |= Be), tr(u, me));
      } else f && ((l & $e) !== 0 && Q !== null && Q.add(
        /** @type {Effect} */
        i
      ), ge(
        /** @type {Effect} */
        i
      ));
    }
}
function Ke(e) {
  if (typeof e != "object" || e === null || zt in e)
    return e;
  const t = Pr(e);
  if (t !== Fr && t !== Ir)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Nn(e), s = /* @__PURE__ */ re(0), i = je, l = (f) => {
    if (je === i)
      return f();
    var u = $, o = je;
    j(null), En(i);
    var h = f();
    return j(u), En(o), h;
  };
  return r && n.set("length", /* @__PURE__ */ re(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(f, u, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && Hr();
        var h = n.get(u);
        return h === void 0 ? h = l(() => {
          var v = /* @__PURE__ */ re(o.value);
          return n.set(u, v), v;
        }) : Y(h, o.value, !0), !0;
      },
      deleteProperty(f, u) {
        var o = n.get(u);
        if (o === void 0) {
          if (u in f) {
            const h = l(() => /* @__PURE__ */ re(k));
            n.set(u, h), _t(s);
          }
        } else
          Y(o, k), _t(s);
        return !0;
      },
      get(f, u, o) {
        var _;
        if (u === zt)
          return e;
        var h = n.get(u), v = u in f;
        if (h === void 0 && (!v || (_ = Ge(f, u)) != null && _.writable) && (h = l(() => {
          var d = Ke(v ? f[u] : k), g = /* @__PURE__ */ re(d);
          return g;
        }), n.set(u, h)), h !== void 0) {
          var c = A(h);
          return c === k ? void 0 : c;
        }
        return Reflect.get(f, u, o);
      },
      getOwnPropertyDescriptor(f, u) {
        var o = Reflect.getOwnPropertyDescriptor(f, u);
        if (o && "value" in o) {
          var h = n.get(u);
          h && (o.value = A(h));
        } else if (o === void 0) {
          var v = n.get(u), c = v == null ? void 0 : v.v;
          if (v !== void 0 && c !== k)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return o;
      },
      has(f, u) {
        var c;
        if (u === zt)
          return !0;
        var o = n.get(u), h = o !== void 0 && o.v !== k || Reflect.has(f, u);
        if (o !== void 0 || y !== null && (!h || (c = Ge(f, u)) != null && c.writable)) {
          o === void 0 && (o = l(() => {
            var _ = h ? Ke(f[u]) : k, d = /* @__PURE__ */ re(_);
            return d;
          }), n.set(u, o));
          var v = A(o);
          if (v === k)
            return !1;
        }
        return h;
      },
      set(f, u, o, h) {
        var ne;
        var v = n.get(u), c = u in f;
        if (r && u === "length")
          for (var _ = o; _ < /** @type {Source<number>} */
          v.v; _ += 1) {
            var d = n.get(_ + "");
            d !== void 0 ? Y(d, k) : _ in f && (d = l(() => /* @__PURE__ */ re(k)), n.set(_ + "", d));
          }
        if (v === void 0)
          (!c || (ne = Ge(f, u)) != null && ne.writable) && (v = l(() => /* @__PURE__ */ re(void 0)), Y(v, Ke(o)), n.set(u, v));
        else {
          c = v.v !== k;
          var g = l(() => Ke(o));
          Y(v, g);
        }
        var w = Reflect.getOwnPropertyDescriptor(f, u);
        if (w != null && w.set && w.set.call(h, o), !c) {
          if (r && typeof u == "string") {
            var E = (
              /** @type {Source<number>} */
              n.get("length")
            ), O = Number(u);
            Number.isInteger(O) && O >= E.v && Y(E, O + 1);
          }
          _t(s);
        }
        return !0;
      },
      ownKeys(f) {
        A(s);
        var u = Reflect.ownKeys(f).filter((v) => {
          var c = n.get(v);
          return c === void 0 || c.v !== k;
        });
        for (var [o, h] of n)
          h.v !== k && !(o in f) && u.push(o);
        return u;
      },
      setPrototypeOf() {
        Vr();
      }
    }
  );
}
var mn, nr, rr, ir;
function Xt() {
  if (mn === void 0) {
    mn = window, nr = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    rr = Ge(t, "firstChild").get, ir = Ge(t, "nextSibling").get, pn(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), pn(n) && (n.__t = void 0);
  }
}
function Re(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function gt(e) {
  return (
    /** @type {TemplateNode | null} */
    rr.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function we(e) {
  return (
    /** @type {TemplateNode | null} */
    ir.call(e)
  );
}
function qt(e, t) {
  if (!x)
    return /* @__PURE__ */ gt(e);
  var n = /* @__PURE__ */ gt(T);
  if (n === null)
    n = T.appendChild(Re());
  else if (t && n.nodeType !== Fn) {
    var r = Re();
    return n == null || n.before(r), X(r), r;
  }
  return X(n), n;
}
function ci(e, t = 1, n = !1) {
  let r = x ? T : e;
  for (var s; t--; )
    s = r, r = /** @type {TemplateNode} */
    /* @__PURE__ */ we(r);
  if (!x)
    return r;
  if (n && (r == null ? void 0 : r.nodeType) !== Fn) {
    var i = Re();
    return r === null ? s == null || s.after(i) : r.before(i), X(i), i;
  }
  return X(r), r;
}
function sr(e) {
  e.textContent = "";
}
function hi() {
  return !1;
}
function hn(e) {
  var t = $, n = y;
  j(null), ue(null);
  try {
    return e();
  } finally {
    j(t), ue(n);
  }
}
function di(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function ae(e, t, n) {
  var r = y;
  r !== null && (r.f & U) !== 0 && (e |= U);
  var s = {
    ctx: te,
    deps: null,
    nodes: null,
    f: e | L | J,
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
      $t(s), s.f |= ln;
    } catch (f) {
      throw Z(s), f;
    }
  else t !== null && ge(s);
  var i = s;
  if (n && i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
  (i.f & Ye) === 0 && (i = i.first, (e & $e) !== 0 && (e & pt) !== 0 && i !== null && (i.f |= pt)), i !== null && (i.parent = r, r !== null && di(i, r), $ !== null && ($.f & F) !== 0 && (e & Ne) === 0)) {
    var l = (
      /** @type {Derived} */
      $
    );
    (l.effects ?? (l.effects = [])).push(i);
  }
  return s;
}
function dn() {
  return $ !== null && !ee;
}
function lr(e) {
  const t = ae(It, null, !1);
  return N(t, P), t.teardown = e, t;
}
function vi(e) {
  return ae(Ot | Lr, e, !1);
}
function _i(e) {
  pe.ensure();
  const t = ae(Ne | Ye, e, !0);
  return () => {
    Z(t);
  };
}
function pi(e) {
  pe.ensure();
  const t = ae(Ne | Ye, e, !0);
  return (n = {}) => new Promise((r) => {
    n.outro ? Je(t, () => {
      Z(t), r(void 0);
    }) : (Z(t), r(void 0));
  });
}
function gi(e) {
  return ae(Ot, e, !1);
}
function $i(e) {
  return ae(fn | Ye, e, !0);
}
function fr(e, t = 0) {
  return ae(It | t, e, !0);
}
function wn(e, t = [], n = [], r = []) {
  si(r, t, n, (s) => {
    ae(It, () => e(...s.map(A)), !0);
  });
}
function ur(e, t = 0) {
  var n = ae($e | t, e, !0);
  return n;
}
function ie(e) {
  return ae(Ce | Ye, e, !0);
}
function or(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Ve, r = $;
    yn(!0), j(null);
    try {
      t.call(null);
    } finally {
      yn(n), j(r);
    }
  }
}
function ar(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && hn(() => {
      s.abort(We);
    });
    var r = n.next;
    (n.f & Ne) !== 0 ? n.parent = null : Z(n, t), n = r;
  }
}
function mi(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Ce) === 0 && Z(t), t = n;
  }
}
function Z(e, t = !0) {
  var n = !1;
  (t || (e.f & Dn) !== 0) && e.nodes !== null && e.nodes.end !== null && (wi(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), ar(e, t && !n), kt(e, 0), N(e, _e);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  or(e);
  var s = e.parent;
  s !== null && s.first !== null && cr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function wi(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ we(e);
    e.remove(), e = n;
  }
}
function cr(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Je(e, t, n = !0) {
  var r = [];
  hr(e, r, !0);
  var s = () => {
    n && Z(e), t && t();
  }, i = r.length;
  if (i > 0) {
    var l = () => --i || s();
    for (var f of r)
      f.out(l);
  } else
    s();
}
function hr(e, t, n) {
  if ((e.f & U) === 0) {
    e.f ^= U;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const f of r)
        (f.is_global || n) && t.push(f);
    for (var s = e.first; s !== null; ) {
      var i = s.next, l = (s.f & pt) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (s.f & Ce) !== 0 && (e.f & $e) !== 0;
      hr(s, t, l ? n : !1), s = i;
    }
  }
}
function dr(e) {
  vr(e, !0);
}
function vr(e, t) {
  if ((e.f & U) !== 0) {
    e.f ^= U, (e.f & P) === 0 && (N(e, L), ge(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, s = (n.f & pt) !== 0 || (n.f & Ce) !== 0;
      vr(n, s ? t : !1), n = r;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || t) && l.in();
  }
}
function yi(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : /* @__PURE__ */ we(n);
      t.append(n), n = s;
    }
}
let At = !1, Ve = !1;
function yn(e) {
  Ve = e;
}
let $ = null, ee = !1;
function j(e) {
  $ = e;
}
let y = null;
function ue(e) {
  y = e;
}
let M = null;
function Ei(e) {
  $ !== null && (M === null ? M = [e] : M.push(e));
}
let q = null, B = 0, W = null;
function bi(e) {
  W = e;
}
let _r = 1, Ie = 0, je = Ie;
function En(e) {
  je = e;
}
function pr() {
  return ++_r;
}
function yt(e) {
  var t = e.f;
  if ((t & L) !== 0)
    return !0;
  if (t & F && (e.f &= ~Be), (t & me) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, s = 0; s < r; s++) {
      var i = n[s];
      if (yt(
        /** @type {Derived} */
        i
      ) && Zn(
        /** @type {Derived} */
        i
      ), i.wv > e.wv)
        return !0;
    }
    (t & J) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    D === null && N(e, P);
  }
  return !1;
}
function gr(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(M != null && M.includes(e)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & F) !== 0 ? gr(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? N(i, L) : (i.f & P) !== 0 && N(i, me), ge(
        /** @type {Effect} */
        i
      ));
    }
}
function $r(e) {
  var d;
  var t = q, n = B, r = W, s = $, i = M, l = te, f = ee, u = je, o = e.f;
  q = /** @type {null | Value[]} */
  null, B = 0, W = null, $ = (o & (Ce | Ne)) === 0 ? e : null, M = null, ft(e.ctx), ee = !1, je = ++Ie, e.ac !== null && (hn(() => {
    e.ac.abort(We);
  }), e.ac = null);
  try {
    e.f |= Bt;
    var h = (
      /** @type {Function} */
      e.fn
    ), v = h(), c = e.deps;
    if (q !== null) {
      var _;
      if (kt(e, B), c !== null && B > 0)
        for (c.length = B + q.length, _ = 0; _ < q.length; _++)
          c[B + _] = q[_];
      else
        e.deps = c = q;
      if (dn() && (e.f & J) !== 0)
        for (_ = B; _ < c.length; _++)
          ((d = c[_]).reactions ?? (d.reactions = [])).push(e);
    } else c !== null && B < c.length && (kt(e, B), c.length = B);
    if (zn() && W !== null && !ee && c !== null && (e.f & (F | me | L)) === 0)
      for (_ = 0; _ < /** @type {Source[]} */
      W.length; _++)
        gr(
          W[_],
          /** @type {Effect} */
          e
        );
    if (s !== null && s !== e) {
      if (Ie++, s.deps !== null)
        for (let g = 0; g < n; g += 1)
          s.deps[g].rv = Ie;
      if (t !== null)
        for (const g of t)
          g.rv = Ie;
      W !== null && (r === null ? r = W : r.push(.../** @type {Source[]} */
      W));
    }
    return (e.f & Se) !== 0 && (e.f ^= Se), v;
  } catch (g) {
    return jn(g);
  } finally {
    e.f ^= Bt, q = t, B = n, W = r, $ = s, M = i, ft(l), ee = f, je = u;
  }
}
function Ti(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Dr.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = t.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  if (n === null && (t.f & F) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (q === null || !q.includes(t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & J) !== 0 && (i.f ^= J, i.f &= ~Be), on(i), Xn(i), kt(i, 0);
  }
}
function kt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Ti(e, n[r]);
}
function $t(e) {
  var t = e.f;
  if ((t & _e) === 0) {
    N(e, P);
    var n = y, r = At;
    y = e, At = !0;
    try {
      (t & ($e | kn)) !== 0 ? mi(e) : ar(e), or(e);
      var s = $r(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = _r;
      var i;
      jt && Xr && (e.f & L) !== 0 && e.deps;
    } finally {
      At = r, y = n;
    }
  }
}
function A(e) {
  var t = e.f, n = (t & F) !== 0;
  if ($ !== null && !ee) {
    var r = y !== null && (y.f & _e) !== 0;
    if (!r && !(M != null && M.includes(e))) {
      var s = $.deps;
      if (($.f & Bt) !== 0)
        e.rv < Ie && (e.rv = Ie, q === null && s !== null && s[B] === e ? B++ : q === null ? q = [e] : q.push(e));
      else {
        ($.deps ?? ($.deps = [])).push(e);
        var i = e.reactions;
        i === null ? e.reactions = [$] : i.includes($) || i.push($);
      }
    }
  }
  if (Ve && Ae.has(e))
    return Ae.get(e);
  if (n) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (Ve) {
      var f = l.v;
      return ((l.f & P) === 0 && l.reactions !== null || wr(l)) && (f = cn(l)), Ae.set(l, f), f;
    }
    var u = (l.f & J) === 0 && !ee && $ !== null && (At || ($.f & J) !== 0), o = l.deps === null;
    yt(l) && (u && (l.f |= J), Zn(l)), u && !o && mr(l);
  }
  if (D != null && D.has(e))
    return D.get(e);
  if ((e.f & Se) !== 0)
    throw e.v;
  return e.v;
}
function mr(e) {
  if (e.deps !== null) {
    e.f |= J;
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & F) !== 0 && (t.f & J) === 0 && mr(
        /** @type {Derived} */
        t
      );
  }
}
function wr(e) {
  if (e.v === k) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Ae.has(t) || (t.f & F) !== 0 && wr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function xi(e) {
  var t = ee;
  try {
    return ee = !0, e();
  } finally {
    ee = t;
  }
}
const Si = /* @__PURE__ */ new Set(), bn = /* @__PURE__ */ new Set();
function Ai(e, t, n, r = {}) {
  function s(i) {
    if (r.capture || ht.call(t, i), !i.cancelBubble)
      return hn(() => n == null ? void 0 : n.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? qe(() => {
    t.addEventListener(e, s, r);
  }) : t.addEventListener(e, s, r), s;
}
function Tt(e, t, n, r, s) {
  var i = { capture: r, passive: s }, l = Ai(e, t, n, i);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && lr(() => {
    t.removeEventListener(e, l, i);
  });
}
let Tn = null;
function ht(e) {
  var w;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, s = ((w = e.composedPath) == null ? void 0 : w.call(e)) || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  Tn = e;
  var l = 0, f = Tn === e && e.__root;
  if (f) {
    var u = s.indexOf(f);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var o = s.indexOf(t);
    if (o === -1)
      return;
    u <= o && (l = u);
  }
  if (i = /** @type {Element} */
  s[l] || e.target, i !== t) {
    Nt(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var h = $, v = y;
    j(null), ue(null);
    try {
      for (var c, _ = []; i !== null; ) {
        var d = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var g = i["__" + r];
          g != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && g.call(i, e);
        } catch (E) {
          c ? _.push(E) : c = E;
        }
        if (e.cancelBubble || d === t || d === null)
          break;
        i = d;
      }
      if (c) {
        for (let E of _)
          queueMicrotask(() => {
            throw E;
          });
        throw c;
      }
    } finally {
      e.__root = t, delete e.currentTarget, j(h), ue(v);
    }
  }
}
function Ri(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function Zt(e, t) {
  var n = (
    /** @type {Effect} */
    y
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
  var n = (t & kr) !== 0, r, s = !e.startsWith("<!>");
  return () => {
    if (x)
      return Zt(T, null), T;
    r === void 0 && (r = Ri(s ? e : "<!>" + e), r = /** @type {TemplateNode} */
    /* @__PURE__ */ gt(r));
    var i = (
      /** @type {TemplateNode} */
      n || nr ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    return Zt(i, i), i;
  };
}
function Qt(e, t) {
  if (x) {
    var n = (
      /** @type {Effect & { nodes: EffectNodes }} */
      y
    );
    ((n.f & ln) === 0 || n.nodes.end === null) && (n.nodes.end = T), un();
    return;
  }
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const Ci = ["touchstart", "touchmove"];
function Ni(e) {
  return Ci.includes(e);
}
function xn(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = n + "");
}
function Er(e, t) {
  return br(e, t);
}
function Oi(e, t) {
  Xt(), t.intro = t.intro ?? !1;
  const n = t.target, r = x, s = T;
  try {
    for (var i = /* @__PURE__ */ gt(n); i && (i.nodeType !== at || /** @type {Comment} */
    i.data !== Cn); )
      i = /* @__PURE__ */ we(i);
    if (!i)
      throw lt;
    De(!0), X(
      /** @type {Comment} */
      i
    );
    const l = br(e, { ...t, anchor: i });
    return De(!1), /**  @type {Exports} */
    l;
  } catch (l) {
    if (l instanceof Error && l.message.split(`
`).some((f) => f.startsWith("https://svelte.dev/e/")))
      throw l;
    return l !== lt && console.warn("Failed to hydrate: ", l), t.recover === !1 && Br(), Xt(), sr(n), De(!1), Er(e, t);
  } finally {
    De(r), X(s);
  }
}
const Ue = /* @__PURE__ */ new Map();
function br(e, { target: t, anchor: n, props: r = {}, events: s, context: i, intro: l = !0 }) {
  Xt();
  var f = /* @__PURE__ */ new Set(), u = (v) => {
    for (var c = 0; c < v.length; c++) {
      var _ = v[c];
      if (!f.has(_)) {
        f.add(_);
        var d = Ni(_);
        t.addEventListener(_, ht, { passive: d });
        var g = Ue.get(_);
        g === void 0 ? (document.addEventListener(_, ht, { passive: d }), Ue.set(_, 1)) : Ue.set(_, g + 1);
      }
    }
  };
  u(Ft(Si)), bn.add(u);
  var o = void 0, h = pi(() => {
    var v = n ?? t.appendChild(Re());
    return ri(
      /** @type {TemplateNode} */
      v,
      {
        pending: () => {
        }
      },
      (c) => {
        if (i) {
          Mn({});
          var _ = (
            /** @type {ComponentContext} */
            te
          );
          _.c = i;
        }
        if (s && (r.$$events = s), x && Zt(
          /** @type {TemplateNode} */
          c,
          null
        ), o = e(c, r) || {}, x && (y.nodes.end = T, T === null || T.nodeType !== at || /** @type {Comment} */
        T.data !== rn))
          throw Pt(), lt;
        i && Ln();
      }
    ), () => {
      var d;
      for (var c of f) {
        t.removeEventListener(c, ht);
        var _ = (
          /** @type {number} */
          Ue.get(c)
        );
        --_ === 0 ? (document.removeEventListener(c, ht), Ue.delete(c)) : Ue.set(c, _);
      }
      bn.delete(u), v !== n && ((d = v.parentNode) == null || d.removeChild(v));
    };
  });
  return en.set(o, h), o;
}
let en = /* @__PURE__ */ new WeakMap();
function ki(e, t) {
  const n = en.get(e);
  return n ? (en.delete(e), n(t)) : Promise.resolve();
}
function Di(e, t) {
  return t;
}
function Fi(e, t, n) {
  for (var r = [], s = t.length, i, l = t.length, f = 0; f < s; f++) {
    let v = t[f];
    Je(
      v,
      () => {
        if (i) {
          if (i.pending.delete(v), i.done.add(v), i.pending.size === 0) {
            var c = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            tn(Ft(i.done)), c.delete(i), c.size === 0 && (e.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var u = r.length === 0 && n !== null;
    if (u) {
      var o = (
        /** @type {Element} */
        n
      ), h = (
        /** @type {Element} */
        o.parentNode
      );
      sr(h), h.append(o), e.items.clear();
    }
    tn(t, !u);
  } else
    i = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function tn(e, t = !0) {
  for (var n = 0; n < e.length; n++)
    Z(e[n], t);
}
var Sn;
function Ii(e, t, n, r, s, i = null) {
  var l = e, f = /* @__PURE__ */ new Map();
  {
    var u = (
      /** @type {Element} */
      e
    );
    l = x ? X(/* @__PURE__ */ gt(u)) : u.appendChild(Re());
  }
  x && un();
  var o = null, h = /* @__PURE__ */ ui(() => {
    var w = n();
    return Nn(w) ? w : w == null ? [] : Ft(w);
  }), v, c = !0;
  function _() {
    g.fallback = o, Pi(g, v, l, t, r), o !== null && (v.length === 0 ? (o.f & xe) === 0 ? dr(o) : (o.f ^= xe, dt(o, null, l)) : Je(o, () => {
      o = null;
    }));
  }
  var d = ur(() => {
    v = /** @type {V[]} */
    A(h);
    var w = v.length;
    let E = !1;
    if (x) {
      var O = Gr(l) === nn;
      O !== (w === 0) && (l = Ht(), X(l), De(!1), E = !0);
    }
    for (var ne = /* @__PURE__ */ new Set(), ye = (
      /** @type {Batch} */
      b
    ), Oe = hi(), Ee = 0; Ee < w; Ee += 1) {
      x && T.nodeType === at && /** @type {Comment} */
      T.data === rn && (l = /** @type {Comment} */
      T, E = !0, De(!1));
      var ct = v[Ee], ke = r(ct, Ee), I = c ? null : f.get(ke);
      I ? (I.v && ot(I.v, ct), I.i && ot(I.i, Ee), Oe && ye.skipped_effects.delete(I.e)) : (I = Mi(
        f,
        c ? l : Sn ?? (Sn = Re()),
        ct,
        ke,
        Ee,
        s,
        t,
        n
      ), c || (I.e.f |= xe), f.set(ke, I)), ne.add(ke);
    }
    if (w === 0 && i && !o && (c ? o = ie(() => i(l)) : (o = ie(() => i(Sn ?? (Sn = Re()))), o.f |= xe)), x && w > 0 && X(Ht()), !c)
      if (Oe) {
        for (const [xr, Sr] of f)
          ne.has(xr) || ye.skipped_effects.add(Sr.e);
        ye.oncommit(_), ye.ondiscard(() => {
        });
      } else
        _();
    E && De(!0), A(h);
  }), g = { effect: d, items: f, outrogroups: null, fallback: o };
  c = !1, x && (l = T);
}
function Pi(e, t, n, r, s) {
  var ke;
  var i = t.length, l = e.items, f = e.effect.first, u, o = null, h = [], v = [], c, _, d, g;
  for (g = 0; g < i; g += 1) {
    if (c = t[g], _ = s(c, g), d = /** @type {EachItem} */
    l.get(_).e, e.outrogroups !== null)
      for (const I of e.outrogroups)
        I.pending.delete(d), I.done.delete(d);
    if ((d.f & xe) !== 0)
      if (d.f ^= xe, d === f)
        dt(d, null, n);
      else {
        var w = o ? o.next : f;
        d === e.effect.last && (e.effect.last = d.prev), d.prev && (d.prev.next = d.next), d.next && (d.next.prev = d.prev), be(e, o, d), be(e, d, w), dt(d, w, n), o = d, h = [], v = [], f = o.next;
        continue;
      }
    if ((d.f & U) !== 0 && dr(d), d !== f) {
      if (u !== void 0 && u.has(d)) {
        if (h.length < v.length) {
          var E = v[0], O;
          o = E.prev;
          var ne = h[0], ye = h[h.length - 1];
          for (O = 0; O < h.length; O += 1)
            dt(h[O], E, n);
          for (O = 0; O < v.length; O += 1)
            u.delete(v[O]);
          be(e, ne.prev, ye.next), be(e, o, ne), be(e, ye, E), f = E, o = ye, g -= 1, h = [], v = [];
        } else
          u.delete(d), dt(d, f, n), be(e, d.prev, d.next), be(e, d, o === null ? e.effect.first : o.next), be(e, o, d), o = d;
        continue;
      }
      for (h = [], v = []; f !== null && f !== d; )
        (u ?? (u = /* @__PURE__ */ new Set())).add(f), v.push(f), f = f.next;
      if (f === null)
        continue;
    }
    (d.f & xe) === 0 && h.push(d), o = d, f = d.next;
  }
  if (e.outrogroups !== null) {
    for (const I of e.outrogroups)
      I.pending.size === 0 && (tn(Ft(I.done)), (ke = e.outrogroups) == null || ke.delete(I));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (f !== null || u !== void 0) {
    var Oe = [];
    if (u !== void 0)
      for (d of u)
        (d.f & U) === 0 && Oe.push(d);
    for (; f !== null; )
      (f.f & U) === 0 && f !== e.fallback && Oe.push(f), f = f.next;
    var Ee = Oe.length;
    if (Ee > 0) {
      var ct = i === 0 ? n : null;
      Fi(e, Oe, ct);
    }
  }
}
function Mi(e, t, n, r, s, i, l, f) {
  var u = (l & Cr) !== 0 ? (l & Or) === 0 ? /* @__PURE__ */ er(n, !1, !1) : He(n) : null, o = (l & Nr) !== 0 ? He(s) : null;
  return {
    v: u,
    i: o,
    e: ie(() => (i(t, u ?? n, o ?? s, f), () => {
      e.delete(r);
    }))
  };
}
function dt(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, s = e.nodes.end, i = t && (t.f & xe) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ we(r)
      );
      if (i.before(r), r === s)
        return;
      r = l;
    }
}
function be(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Li(e, t) {
  gi(() => {
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
const An = [...` 	
\r\f \v\uFEFF`];
function zi(e, t, n) {
  var r = "" + e;
  if (n) {
    for (var s in n)
      if (n[s])
        r = r ? r + " " + s : s;
      else if (r.length)
        for (var i = s.length, l = 0; (l = r.indexOf(s, l)) >= 0; ) {
          var f = l + i;
          (l === 0 || An.includes(r[l - 1])) && (f === r.length || An.includes(r[f])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(f + 1) : l = f;
        }
  }
  return r === "" ? null : r;
}
function qi(e, t, n, r, s, i) {
  var l = e.__className;
  if (x || l !== n || l === void 0) {
    var f = zi(n, r, i);
    (!x || f !== e.getAttribute("class")) && (f == null ? e.removeAttribute("class") : e.className = f), e.__className = n;
  } else if (i && s !== i)
    for (var u in i) {
      var o = !!i[u];
      (s == null || o !== !!s[u]) && e.classList.toggle(u, o);
    }
  return i;
}
function ji(e, t, n, r) {
  var s = (
    /** @type {V} */
    r
  ), i = !0, l = () => (i && (i = !1, s = /** @type {V} */
  r), s), f;
  f = /** @type {V} */
  e[t], f === void 0 && r !== void 0 && (f = l());
  var u;
  u = () => {
    var c = (
      /** @type {V} */
      e[t]
    );
    return c === void 0 ? l() : (i = !0, c);
  };
  var o = !1, h = /* @__PURE__ */ an(() => (o = !1, u())), v = (
    /** @type {Effect} */
    y
  );
  return (
    /** @type {() => V} */
    (function(c, _) {
      if (arguments.length > 0) {
        const d = _ ? A(h) : c;
        return Y(h, d), o = !0, s !== void 0 && (s = d), c;
      }
      return Ve && o || (v.f & _e) !== 0 ? h.v : A(h);
    })
  );
}
function Bi(e) {
  return new Hi(e);
}
var ve, G;
class Hi {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(t) {
    /** @type {any} */
    m(this, ve);
    /** @type {Record<string, any>} */
    m(this, G);
    var i;
    var n = /* @__PURE__ */ new Map(), r = (l, f) => {
      var u = /* @__PURE__ */ er(f, !1, !1);
      return n.set(l, u), u;
    };
    const s = new Proxy(
      { ...t.props || {}, $$events: {} },
      {
        get(l, f) {
          return A(n.get(f) ?? r(f, Reflect.get(l, f)));
        },
        has(l, f) {
          return f === zr ? !0 : (A(n.get(f) ?? r(f, Reflect.get(l, f))), Reflect.has(l, f));
        },
        set(l, f, u) {
          return Y(n.get(f) ?? r(f, u), u), Reflect.set(l, f, u);
        }
      }
    );
    p(this, G, (t.hydrate ? Oi : Er)(t.component, {
      target: t.target,
      anchor: t.anchor,
      props: s,
      context: t.context,
      intro: t.intro ?? !1,
      recover: t.recover
    })), (!((i = t == null ? void 0 : t.props) != null && i.$$host) || t.sync === !1) && Yn(), p(this, ve, s.$$events);
    for (const l of Object.keys(a(this, G)))
      l === "$set" || l === "$destroy" || l === "$on" || Nt(this, l, {
        get() {
          return a(this, G)[l];
        },
        /** @param {any} value */
        set(f) {
          a(this, G)[l] = f;
        },
        enumerable: !0
      });
    a(this, G).$set = /** @param {Record<string, any>} next */
    (l) => {
      Object.assign(s, l);
    }, a(this, G).$destroy = () => {
      ki(a(this, G));
    };
  }
  /** @param {Record<string, any>} props */
  $set(t) {
    a(this, G).$set(t);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(t, n) {
    a(this, ve)[t] = a(this, ve)[t] || [];
    const r = (...s) => n.call(this, ...s);
    return a(this, ve)[t].push(r), () => {
      a(this, ve)[t] = a(this, ve)[t].filter(
        /** @param {any} fn */
        (s) => s !== r
      );
    };
  }
  $destroy() {
    a(this, G).$destroy();
  }
}
ve = new WeakMap(), G = new WeakMap();
let Tr;
typeof HTMLElement == "function" && (Tr = class extends HTMLElement {
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(t, n, r) {
    super();
    /** The Svelte component constructor */
    S(this, "$$ctor");
    /** Slots */
    S(this, "$$s");
    /** @type {any} The Svelte component instance */
    S(this, "$$c");
    /** Whether or not the custom element is connected */
    S(this, "$$cn", !1);
    /** @type {Record<string, any>} Component props data */
    S(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    S(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    S(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    S(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    S(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    S(this, "$$me");
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
        return (l) => {
          const f = document.createElement("slot");
          i !== "default" && (f.name = i), Qt(l, f);
        };
      };
      var t = n;
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const r = {}, s = Vi(this);
      for (const i of this.$$s)
        i in s && (i === "default" && !this.$$d.children ? (this.$$d.children = n(i), r.default = !0) : r[i] = n(i));
      for (const i of this.attributes) {
        const l = this.$$g_p(i.name);
        l in this.$$d || (this.$$d[l] = Rt(l, i.value, this.$$p_d, "toProp"));
      }
      for (const i in this.$$p_d)
        !(i in this.$$d) && this[i] !== void 0 && (this.$$d[i] = this[i], delete this[i]);
      this.$$c = Bi({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: r,
          $$host: this
        }
      }), this.$$me = _i(() => {
        fr(() => {
          var i;
          this.$$r = !0;
          for (const l of Ct(this.$$c)) {
            if (!((i = this.$$p_d[l]) != null && i.reflect)) continue;
            this.$$d[l] = this.$$c[l];
            const f = Rt(
              l,
              this.$$d[l],
              this.$$p_d,
              "toAttribute"
            );
            f == null ? this.removeAttribute(this.$$p_d[l].attribute || l) : this.setAttribute(this.$$p_d[l].attribute || l, f);
          }
          this.$$r = !1;
        });
      });
      for (const i in this.$$l)
        for (const l of this.$$l[i]) {
          const f = this.$$c.$on(i, l);
          this.$$l_u.set(l, f);
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
    this.$$r || (t = this.$$g_p(t), this.$$d[t] = Rt(t, r, this.$$p_d, "toProp"), (s = this.$$c) == null || s.$set({ [t]: this.$$d[t] }));
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
    return Ct(this.$$p_d).find(
      (n) => this.$$p_d[n].attribute === t || !this.$$p_d[n].attribute && n.toLowerCase() === t
    ) || t;
  }
});
function Rt(e, t, n, r) {
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
function Vi(e) {
  const t = {};
  return e.childNodes.forEach((n) => {
    t[
      /** @type {Element} node */
      n.slot || "default"
    ] = !0;
  }), t;
}
function Yi(e, t, n, r, s, i) {
  let l = class extends Tr {
    constructor() {
      super(e, n, s), this.$$p_d = t;
    }
    static get observedAttributes() {
      return Ct(t).map(
        (f) => (t[f].attribute || f).toLowerCase()
      );
    }
  };
  return Ct(t).forEach((f) => {
    Nt(l.prototype, f, {
      get() {
        return this.$$c && f in this.$$c ? this.$$c[f] : this.$$d[f];
      },
      set(u) {
        var v;
        u = Rt(f, u, t), this.$$d[f] = u;
        var o = this.$$c;
        if (o) {
          var h = (v = Ge(o, f)) == null ? void 0 : v.get;
          h ? o[f] = u : o.$set({ [f]: u });
        }
      }
    });
  }), r.forEach((f) => {
    Nt(l.prototype, f, {
      get() {
        var u;
        return (u = this.$$c) == null ? void 0 : u[f];
      }
    });
  }), e.element = /** @type {any} */
  l, l;
}
var Ui = /* @__PURE__ */ yr('<div draggable="true" role="listitem"> </div>'), Wi = /* @__PURE__ */ yr('<div class="box svelte-1i1lpz1"><p class="prompt svelte-1i1lpz1"> </p> <div class="items svelte-1i1lpz1"></div></div>');
const Ki = {
  hash: "svelte-1i1lpz1",
  code: ".box.svelte-1i1lpz1 {border:1px solid currentColor;padding:12px;border-radius:12px;font-family:inherit;}.prompt.svelte-1i1lpz1 {margin:0 0 12px 0;font-weight:500;}.items.svelte-1i1lpz1 {display:flex;flex-direction:column;gap:8px;}.item.svelte-1i1lpz1 {padding:8px 12px;background:rgba(128, 128, 128, 0.1);border-radius:6px;cursor:grab;user-select:none;transition:opacity 0.2s, transform 0.2s;}.item.svelte-1i1lpz1:hover {background:rgba(128, 128, 128, 0.2);}.item.dragging.svelte-1i1lpz1 {opacity:0.5;cursor:grabbing;}"
};
function Gi(e, t) {
  Mn(t, !0), Li(e, Ki);
  let n = ji(t, "prompt", 7, "Drag things around"), r = /* @__PURE__ */ re(Ke(["Item 1", "Item 2", "Item 3"])), s = /* @__PURE__ */ re(null);
  function i(d) {
    Y(s, d, !0);
  }
  function l(d) {
    d.preventDefault();
  }
  function f(d) {
    if (A(s) !== null && A(s) !== d) {
      const g = [...A(r)], [w] = g.splice(A(s), 1);
      g.splice(d, 0, w), Y(r, g, !0);
    }
    Y(s, null);
  }
  function u() {
    Y(s, null);
  }
  var o = {
    get prompt() {
      return n();
    },
    set prompt(d = "Drag things around") {
      n(d), Yn();
    }
  }, h = Wi(), v = qt(h), c = qt(v, !0);
  Et(v);
  var _ = ci(v, 2);
  return Ii(_, 21, () => A(r), Di, (d, g, w) => {
    var E = Ui();
    let O;
    var ne = qt(E, !0);
    Et(E), wn(() => {
      O = qi(E, 1, "item svelte-1i1lpz1", null, O, { dragging: A(s) === w }), xn(ne, A(g));
    }), Tt("dragstart", E, () => i(w)), Tt("dragover", E, l), Tt("drop", E, () => f(w)), Tt("dragend", E, u), Qt(d, E);
  }), Et(_), Et(h), wn(() => xn(c, n())), Qt(e, h), Ln(o);
}
customElements.define("drag-drop-box", Yi(Gi, { prompt: {} }, [], [], !0));
