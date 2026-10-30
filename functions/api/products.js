// Serve the storefront catalogue through the same-origin API expected by the storefront bundle.
export async function onRequestGet({ request, env }) {
  if (!env.ASSETS) {
    return new Response(JSON.stringify({ error: "Store catalogue is temporarily unavailable." }), {
      status: 503,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
    });
  }

  const assetUrl = new URL(request.url);
  assetUrl.pathname = "/store/api/products";
  assetUrl.search = "";
  const response = await env.ASSETS.fetch(new Request(assetUrl.toString(), { method: "GET" }));
  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Store catalogue could not be loaded." }), {
      status: 502,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
    });
  }
  return new Response(response.body, {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60, s-maxage=300"
    }
  });
}
