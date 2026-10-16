import { json, bad, rand, sha256, clean } from '../../_utils.js';
async function derive(password, saltHex) {
  const salt = Uint8Array.from(saltHex.match(/.{2}/g) || [], h => parseInt(h, 16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 180000, hash: 'SHA-256' }, key, 256);
  return [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
}
export async function onRequestPost({ request, env }) {
  try {
    if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) return bad('يجب ضبط ADMIN_USERNAME وADMIN_PASSWORD في Cloudflare Pages Secrets.', 503);
    const body = await request.json(), username = clean(body.username, 100), password = String(body.password || '');
    if (!username || !password || username !== env.ADMIN_USERNAME) return bad('بيانات الدخول غير صحيحة.', 401);
    let admin = await env.DB.prepare('SELECT id, username, password_hash FROM admin_users WHERE username=?').bind(username).first();
    if (!admin) {
      if (password !== env.ADMIN_PASSWORD) return bad('بيانات الدخول غير صحيحة.', 401);
      const salt = rand(16), hash = await derive(password, salt);
      await env.DB.prepare('INSERT INTO admin_users (username,password_hash) VALUES (?,?)').bind(username, `${salt}:${hash}`).run();
      admin = await env.DB.prepare('SELECT id, username, password_hash FROM admin_users WHERE username=?').bind(username).first();
    }
    const [salt, stored] = String(admin.password_hash).split(':');
    const computed = await derive(password, salt || '');
    if (!stored || computed !== stored || password !== env.ADMIN_PASSWORD) return bad('بيانات الدخول غير صحيحة.', 401);
    const token = rand(32), tokenHash = await sha256(token);
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19);
    await env.DB.prepare('DELETE FROM sessions WHERE expires_at <= datetime(\'now\')').run();
    await env.DB.prepare('INSERT INTO sessions (id_hash,admin_id,expires_at) VALUES (?,?,?)').bind(tokenHash, admin.id, expiresAt).run();
    return json({ ok: true, username }, 200, { 'set-cookie': `norda_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800` });
  } catch (e) { return bad('تعذر تسجيل الدخول.', 500); }
}
