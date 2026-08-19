import NetworkField from "./NetworkField";

/**
 * The world the page floats in: a fixed, full-viewport backdrop that sits
 * behind every section rather than only behind the hero.
 *
 * This replaces the old matrix-rain canvas, which repainted the whole
 * page with rgba(0,0,0,.05) on every frame — it was continuously
 * flooding the document black and burying everything layered under it,
 * which is why the site read as a black void.
 *
 * Layers, cheapest first: a graded base, drifting colour fields, a
 * horizon grid, and the node network on top. Everything except the
 * network is plain CSS, so the whole backdrop costs one canvas.
 */
export default function CosmicBackground() {
  return (
    <div className="cosmos" aria-hidden="true">
      <div className="cosmos__base" />
      <div className="cosmos__nebula cosmos__nebula--a" />
      <div className="cosmos__nebula cosmos__nebula--b" />
      <div className="cosmos__nebula cosmos__nebula--c" />
      <div className="cosmos__grid" />
      <NetworkField />
      <div className="cosmos__vignette" />
    </div>
  );
}
