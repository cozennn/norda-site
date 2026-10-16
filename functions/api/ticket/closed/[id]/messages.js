import { json, bad, clean, ticketForVisitor, getMessages } from '../../../_utils.js';
export async function onRequestGet({ request, env, params }) {
  const visitorId = clean(new URL(request.url).searchParams.get('userId'), 100);
  const ticket = await ticketForVisitor(env, params.id, visitorId);
  if (!ticket) return bad('المحادثة غير موجودة.', 404);
  const messages = await getMessages(env, ticket.id);
  messages.forEach(m => { if (m.file && m.file.url) m.file.url += '?userId=' + encodeURIComponent(visitorId); });
  return json({ ok: true, ticketId: String(ticket.id), status: ticket.status, messages });
}
