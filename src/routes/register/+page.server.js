// Datenbankverbindung importieren
import db from '$lib/server/db.js';

// Bibliothek zum Hashen von Passwörtern
import bcrypt from 'bcrypt';

// SvelteKit-Funktionen für Fehler und Weiterleitungen
import { fail, redirect } from '@sveltejs/kit';

// Actions für Formulare
export const actions = {
  register: async ({ request }) => {

    // Formulardaten auslesen
    const data = await request.formData();

    // Benutzername und Passwort aus dem Formular holen
    const username = data.get('username');
    const password = data.get('password');

    // Prüfen, ob alle Felder ausgefüllt wurden
    if (!username || !password) {
      return fail(400, {
        error: 'All fields are required.'
      });
    }

    // Passwort muss mindestens 6 Zeichen lang sein
    if (password.length < 6) {
      return fail(400, {
        error: 'Password must be at least 6 characters.'
      });
    }

    // Passwort verschlüsseln (hashen)
    const hash = await bcrypt.hash(password, 10);

    try {

      // Neuen Benutzer in die Datenbank einfügen
      await db.execute(
        'INSERT INTO users (username, password_hash) VALUES (?, ?)',
        [username, hash]
      );

    } catch (err) {

      // Fehler, wenn der Benutzername bereits existiert
      if (err.code === 'ER_DUP_ENTRY') {
        return fail(400, {
          error: 'Username already taken.'
        });
      }

      // Allgemeiner Serverfehler
      return fail(500, {
        error: 'Something went wrong.'
      });
    }

    // Nach erfolgreicher Registrierung zur Login-Seite weiterleiten
    throw redirect(303, '/login');
  }
};