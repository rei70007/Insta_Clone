import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/db.js';
import { hashPassword } from '$lib/auth.js';

export const actions = {
	register: async ({ request }) => {
		const form = await request.formData();

		const username = form.get('username');
		const password = form.get('password');

		const hash = await hashPassword(password);

		try {
			await pool.query(
				'INSERT INTO users(username,password_hash) VALUES(?,?)',
				[username, hash]
			);
		} catch {
			return fail(400, {
				error: 'User existiert bereits'
			});
		}

		throw redirect(302, '/login');
	}
};