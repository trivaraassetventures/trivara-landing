/**
 * CSS-only fallback shown when WebGL is unavailable or the 3D scene crashes.
 * Keeps the page premium: a soft, breathing "data sphere" rendered with
 * pure gradients — no GPU required.
 */
export default function StaticBackdrop() {
  return <div className="static-backdrop" aria-hidden="true" />
}
