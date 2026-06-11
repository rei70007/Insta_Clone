import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/db.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';
 
export const actions = {
    login: async ({ request, cookies }) => {
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');
 
       
        if (!username || !password) {
            return fail(400, { error: 'Please fill in all fields' });
        }
 
       
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
 
        if (rows.length === 0) {
            return fail(400, { error: 'Wrong username or password' });
        }
 
       
        const valid = await verifyPassword(password, rows[0].password_hash);
        if (!valid) {
            return fail(400, { error: 'Wrong username or password' });
        }
 
       
        const sessionId = await createSession(rows[0].id);
        cookies.set('session', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30
        });
 
        redirect(303, '/');
    }
};