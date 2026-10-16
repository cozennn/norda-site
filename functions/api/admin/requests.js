import { json, bad, adminSession, clean } from '../../_utils.js';
async function listRequests({ request, env }) {
  if (!await adminSession(request, env)) return bad('يلزم تسجيل الدخول.', 401);
  const { results = [] } = await env.DB.prepare('SELECT id, public_id, name, email, whatsapp, subject, message, form_data, status, created_at FROM project_requests ORDER BY id DESC LIMIT 200').all();
  return json({ ok: true, requests: results.map(r => ({ ...r, form_data: (() => { try { return JSON.parse(r.form_data || '{}'); } catch { return {}; } })() })) });
}
async function updateRequest({ request, env }) {
  if (!await adminSession(request, env)) return bad('يلزم تسجيل الدخول.', 401);
  const body = await request.json(), id = Number(body.id), status = clean(body.status, 30);
  if (!id || !['new','in_progress','completed','cancelled'].includes(status)) return bad('حالة الطلب غير صالحة.');
  await env.DB.prepare('UPDATE project_requests SET status=? WHERE id=?').bind(status, id).run();
  return json({ ok: true });
}

export async function onRequest(context) {
  if (context.request.method === 'GET') return listRequests(context);
  if (context.request.method === 'PATCH') return updateRequest(context);
  return bad('الطريقة غير مدعومة.', 405);
}
