import { json, getCookie, sha256 } from '../../_utils.js';
export async function onRequestPost({ request, env }) {
  const token = getCookie(request, 'norda_admin');
  if (token) await env.DB.prepare('DELETE FROM sessions WHERE id_hash=?').bind(await sha256(token)).run();
  return json({ ok: true }, 200, { 'set-cookie': 'norda_admin=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0' });
}
