export const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers }
});
export const bad = (message, status = 400) => json({ ok: false, error: message }, status);
export const rand = (n = 18) => {
  const bytes = crypto.getRandomValues(new Uint8Array(n));
  return [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
};
export async function sha256(value) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}
export function clean(value, max = 2000) {
  return String(value ?? '').trim().slice(0, max);
}
export function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const part = cookie.split(';').map(s => s.trim()).find(s => s.startsWith(name + '='));
  return part ? decodeURIComponent(part.slice(name.length + 1)) : '';
}
export async function adminSession(request, env) {
  const token = getCookie(request, 'norda_admin');
  if (!token) return null;
  const hash = await sha256(token);
  const row = await env.DB.prepare(`SELECT a.id, a.username FROM sessions s JOIN admin_users a ON a.id=s.admin_id WHERE s.id_hash=? AND s.expires_at > datetime('now')`).bind(hash).first();
  return row || null;
}
export async function ticketForVisitor(env, ticketId, visitorId) {
  return env.DB.prepare('SELECT * FROM tickets WHERE id=? AND visitor_id=?').bind(Number(ticketId), visitorId).first();
}
export async function getMessages(env, ticketId) {
  const { results = [] } = await env.DB.prepare('SELECT id, sender_type, message_text, attachment_key, attachment_name, attachment_type, created_at FROM messages WHERE ticket_id=? ORDER BY id ASC').bind(Number(ticketId)).all();
  return results.map(m => ({
    id: m.id,
    from: m.sender_type === 'visitor' ? 'user' : 'admin',
    text: m.message_text || '',
    time: Date.parse(m.created_at.replace(' ', 'T') + 'Z') || Date.now(),
    ...(m.attachment_name ? { file: { name: m.attachment_name, type: m.attachment_type || 'application/octet-stream', url: m.attachment_key ? '/api/files/' + encodeURIComponent(m.attachment_key) : '' } } : {})
  }));
}
