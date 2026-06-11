import  db  from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies }) => {
    const sessionId = cookies.get('session');

    if (sessionId) {
      await db.execute('DELETE FROM sessions WHERE id = ?', [sessionId]);
      cookies.delete('session', { path: '/' });
    }

    redirect(303, '/');
  }
};