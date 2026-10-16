import { json, bad, clean, ticketForVisitor } from '../../../_utils.js';
export async function onRequestPost({ request, env, params }) {
  const visitorId = clean(new URL(request.url).searchParams.get('userId'), 100);
  const ticket = await ticketForVisitor(env, params.id, visitorId);
  if (!ticket) return bad('المحادثة غير موجودة.', 404);
  await env.DB.prepare("UPDATE tickets SET status='closed', closed_at=datetime('now') WHERE id=?").bind(ticket.id).run();
  return json({ ok: true });
}
