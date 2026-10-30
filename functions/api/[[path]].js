const API_ORIGIN = "https://codeandchill.store";

export async function onRequest({ request }) {
  const incoming = new URL(request.url);
  const upstream = new URL(incoming.pathname + incoming.search, API_ORIGIN);
  const response = await fetch(new Request(upstream, request));

  // API responses can include account or order data; do not cache them on Pages.
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
