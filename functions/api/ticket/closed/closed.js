import { json, clean, getMessages } from '../../../_utils.js';
export async function onRequestGet({ request, env }) {
  const visitorId = clean(new URL(request.url).searchParams.get('userId'), 100);
  if (!visitorId) return json({ ok: true, tickets: [] });
  const { results = [] } = await env.DB.prepare("SELECT id, public_id, status, created_at, closed_at FROM tickets WHERE visitor_id=? AND status='closed' ORDER BY id DESC LIMIT 30").bind(visitorId).all();
  const tickets = await Promise.all(results.map(async t => ({ ticketId: String(t.id), status: t.status, closedAt: t.closed_at, updatedAt: t.closed_at, messages: await getMessages(env, t.id) })));
  return json({ ok: true, tickets });
}
