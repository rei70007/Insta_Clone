import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db.js';

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const username = form.get('username');
    const password = form.get('password');

    const [existing] = await db.execute(
      'SELECT id FROM users WHERE username = ?', [username]
    );
    if (existing.length > 0)
      return fail(409, { error: 'Benutzername bereits vergeben.' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hash]
    );

    const id = randomUUID();
    await db.execute(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
      [id, result.insertId]
    );

    cookies.set('session', id, { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
    throw redirect(302, '/');
  }
};