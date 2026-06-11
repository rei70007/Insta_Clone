import  db  from '$lib/server/db.js';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  register: async ({ request }) => {
    const data = await request.formData();

    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      return fail(400, {
        error: 'All fields are required.'
      });
    }

    if (password.length < 6) {
      return fail(400, {
        error: 'Password must be at least 6 characters.'
      });
    }
    

    const hash = await bcrypt.hash(password, 10);

    try {
      await db.execute(
        'INSERT INTO users (username, password_hash) VALUES (?, ?)',
        [username, hash]
      );
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return fail(400, {
          error: 'Username already taken.'
        });
      }

      return fail(500, {
        error: 'Something went wrong.'
      });
    }

    throw redirect(303, '/login');
  }
};