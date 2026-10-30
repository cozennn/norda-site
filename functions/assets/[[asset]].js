const REFERENCE_ORIGIN = "https://codeandchill.store";

export async function onRequest({ request, env }) {
  // Keep the files already present in this Pages deployment local.
  const local = await env.ASSETS.fetch(request);
  const contentType = local.headers.get("Content-Type") || "";
  if (local.status !== 404 && !/text\/html/i.test(contentType)) return local;

  // Missing chunks in this deployment are served from the matching reference build.
  const incoming = new URL(request.url);
  const upstream = new URL(incoming.pathname + incoming.search, REFERENCE_ORIGIN);
  return fetch(new Request(upstream, request));
}
