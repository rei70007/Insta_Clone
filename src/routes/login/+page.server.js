import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/db.js';
import { verifyPassword, createSession } from '$lib/auth.js';

export const actions = {
	login: async ({ request, cookies }) => {
		const form = await request.formData();

		const username = form.get('username');
		const password = form.get('password');

		const [rows] = await pool.query(
			'SELECT * FROM users WHERE username=?',
			[username]
		);

		if (!rows.length) {
			return fail(400, { error: 'User nicht gefunden' });
		}

		const user = rows[0];

		const valid = await verifyPassword(
			password,
			user.password_hash
		);

		if (!valid) {
			return fail(400, { error: 'Falsches Passwort' });
		}

		const sessionId = await createSession(user.id);

		cookies.set('session', sessionId, {
			path: '/'
		});

		throw redirect(302, '/');
	}
};