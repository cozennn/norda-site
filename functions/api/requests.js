import { json, bad, rand, clean } from '../_utils.js';
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    // Honeypot used by the contact form. Do not reveal whether it was triggered.
    if (clean(body.website, 200)) return json({ ok: true });
    const name = clean(body.name, 80), email = clean(body.email, 120);
    const subject = clean(body.subject, 120), message = clean(body.message, 4000);
    if (!name || (!email && !body.whatsapp) || (!subject && !message)) return bad('الرجاء إدخال الاسم ووسيلة تواصل وتفاصيل الطلب.');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('البريد الإلكتروني غير صالح.');
    const publicId = 'REQ-' + rand(5).toUpperCase();
    const formData = JSON.stringify(body.form_data && typeof body.form_data === 'object' ? body.form_data : {});
    await env.DB.prepare('INSERT INTO project_requests (public_id,name,email,whatsapp,subject,message,form_data) VALUES (?,?,?,?,?,?,?)')
      .bind(publicId, name, email || null, clean(body.whatsapp, 40) || null, subject || null, message || null, formData).run();
    return json({ ok: true, requestId: publicId }, 201);
  } catch (e) { return bad('تعذر حفظ الطلب حالياً.', 500); }
}
