import { json, bad, clean, adminSession, ticketForVisitor } from '../../_utils.js';
export async function onRequestGet({ request, env, params }) {
  if (!env.UPLOADS) return bad('مساحة الملفات غير مفعلة.', 404);
  const key = clean(params.key, 220);
  const match = /^ticket-(\d+)-[a-f0-9-]{20,80}$/i.exec(key);
  if (!match) return bad('الملف غير موجود.', 404);
  const ticketId = Number(match[1]);
  const admin = await adminSession(request, env);
  if (!admin) {
    const visitorId = clean(new URL(request.url).searchParams.get('userId'), 100);
    if (!await ticketForVisitor(env, ticketId, visitorId)) return bad('غير مصرح.', 403);
  }
  const meta = await env.DB.prepare('SELECT attachment_name, attachment_type FROM messages WHERE ticket_id=? AND attachment_key=?').bind(ticketId, key).first();
  if (!meta) return bad('الملف غير موجود.', 404);
  const object = await env.UPLOADS.get(key);
  if (!object) return bad('الملف غير موجود.', 404);
  return new Response(object.body, { headers: { 'content-type': meta.attachment_type || 'application/octet-stream', 'content-disposition': `inline; filename*=UTF-8''${encodeURIComponent(meta.attachment_name || 'attachment')}`, 'cache-control': 'private, no-store', 'x-content-type-options': 'nosniff' } });
}
