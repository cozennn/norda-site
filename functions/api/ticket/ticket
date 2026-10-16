import { json, bad, rand, clean, getMessages } from '../../_utils.js';
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const visitorId = clean(body.userId, 100), userName = clean(body.userName, 60) || 'Guest';
    if (!/^[a-zA-Z0-9_-]{8,100}$/.test(visitorId)) return bad('معرّف الزائر غير صالح.');
    const existing = await env.DB.prepare("SELECT * FROM tickets WHERE visitor_id=? AND status='open' ORDER BY id DESC LIMIT 1").bind(visitorId).first();
    if (existing) return json({ ok: true, existing: true, ticket: { ticketId: String(existing.id), status: existing.status, messages: await getMessages(env, existing.id) } });
    const publicId = 'TKT-' + rand(6).toUpperCase();
    const ins = await env.DB.prepare('INSERT INTO tickets (public_id,visitor_id,user_name) VALUES (?,?,?)').bind(publicId, visitorId, userName).run();
    const id = ins.meta.last_row_id;
    return json({ ok: true, existing: false, ticket: { ticketId: String(id), publicId, status: 'open', messages: [] } }, 201);
  } catch (e) { return bad('تعذر إنشاء المحادثة.', 500); }
}
