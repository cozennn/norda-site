import { json, bad, clean, ticketForVisitor, getMessages } from '../../../_utils.js';
export async function onRequestPost({ request, env, params }) {
  try {
    const url = new URL(request.url), visitorId = clean(url.searchParams.get('userId'), 100);
    const ticket = await ticketForVisitor(env, params.id, visitorId);
    if (!ticket || ticket.status !== 'open') return bad('المحادثة غير متاحة أو مغلقة.', 404);
    const body = await request.json();
    const text = clean(body.text, 1000);
    let attachmentKey = null, attachmentName = null, attachmentType = null;
    if (body.file) {
      if (!env.UPLOADS) return bad('إرفاق الملفات يحتاج إعداد مساحة Cloudflare R2 أولاً. يمكنك إرسال الرسالة النصية الآن.', 400);
      if (typeof body.file !== 'string' || !body.file.startsWith('data:') || body.file.length > 3_000_000) return bad('الملف غير صالح أو أكبر من الحد المسموح.', 400);
      const match = body.file.match(/^data:([^;,]+)?;base64,([\s\S]+)$/);
      if (!match) return bad('صيغة الملف غير مدعومة.', 400);
      const raw = atob(match[2]);
      if (raw.length > 2 * 1024 * 1024) return bad('الحد الأقصى لحجم الملف 2 ميغابايت.', 400);
      attachmentKey = `ticket-${ticket.id}-${crypto.randomUUID()}`;
      attachmentName = clean(body.fileName, 180) || 'attachment';
      attachmentType = clean(body.fileType || match[1], 100) || 'application/octet-stream';
      const bytes = Uint8Array.from(raw, c => c.charCodeAt(0));
      await env.UPLOADS.put(attachmentKey, bytes, { httpMetadata: { contentType: attachmentType } });
    }
    if (!text && !attachmentKey) return bad('اكتبي رسالة أو أرفقي ملفاً.');
    await env.DB.prepare('INSERT INTO messages (ticket_id,sender_type,message_text,attachment_key,attachment_name,attachment_type) VALUES (?,?,?,?,?,?)')
      .bind(ticket.id, 'visitor', text, attachmentKey, attachmentName, attachmentType).run();
    const messages = await getMessages(env, ticket.id);
    messages.forEach(m => { if (m.file && m.file.url) m.file.url += '?userId=' + encodeURIComponent(visitorId); });
    return json({ ok: true, messages }, 201);
  } catch (e) { return bad('تعذر إرسال الرسالة.', 500); }
}
