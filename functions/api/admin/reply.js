import { json, bad, adminSession, clean, getMessages } from '../../_utils.js';
export async function onRequestPost({ request, env }) {
  const admin = await adminSession(request, env);
  if (!admin) return bad('يلزم تسجيل الدخول.', 401);
  const body = await request.json(), ticketId = Number(body.ticketId), text = clean(body.text, 2000);
  if (!ticketId || !text) return bad('اكتبي ردّاً صالحاً.');
  const ticket = await env.DB.prepare('SELECT id, status FROM tickets WHERE id=?').bind(ticketId).first();
  if (!ticket) return bad('المحادثة غير موجودة.', 404);
  await env.DB.prepare('INSERT INTO messages (ticket_id,sender_type,message_text) VALUES (?,?,?)').bind(ticketId, 'admin', text).run();
  return json({ ok: true, messages: await getMessages(env, ticketId) }, 201);
}
