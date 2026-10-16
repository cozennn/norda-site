import { json, bad, adminSession, getMessages } from '../../_utils.js';
export async function onRequestGet({ request, env }) {
  if (!await adminSession(request, env)) return bad('يلزم تسجيل الدخول.', 401);
  const { results = [] } = await env.DB.prepare('SELECT id, public_id, visitor_id, user_name, status, created_at, closed_at FROM tickets ORDER BY id DESC LIMIT 100').all();
  const tickets = await Promise.all(results.map(async t => ({ ...t, messages: await getMessages(env, t.id) })));
  return json({ ok: true, tickets });
}
