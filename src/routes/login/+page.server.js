// SvelteKit-Funktionen für Fehler und Weiterleitungen
import { fail, redirect } from '@sveltejs/kit';

// Datenbankverbindung importieren
import pool from '$lib/server/db.js';

// Funktionen für Passwortprüfung und Session-Erstellung importieren
import { verifyPassword, createSession } from '$lib/server/auth.js';

// Formular-Actions
export const actions = {
  login: async ({ request, cookies }) => {

    // Formulardaten auslesen
    const form = await request.formData();

    // Benutzername und Passwort holen
    const username = form.get('username');
    const password = form.get('password');

    // Prüfen, ob alle Felder ausgefüllt sind
    if (!username || !password) {
      return fail(400, {
        error: 'Please fill in all fields'
      });
    }

    // Benutzer in der Datenbank suchen
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    // Fehler, wenn Benutzer nicht gefunden wurde
    if (rows.length === 0) {
      return fail(400, {
        error: 'Wrong username or password'
      });
    }

    // Passwort mit dem gespeicherten Hash vergleichen
    const valid = await verifyPassword(
      password,
      rows[0].password_hash
    );

    // Fehler bei falschem Passwort
    if (!valid) {
      return fail(400, {
        error: 'Wrong username or password'
      });
    }

    // Neue Session erstellen
    const sessionId = await createSession(rows[0].id);

    // Session-ID als Cookie speichern
    cookies.set('session', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 Tage
    });

    // Nach erfolgreichem Login zur Startseite weiterleiten
    throw redirect(303, '/');
  }
};