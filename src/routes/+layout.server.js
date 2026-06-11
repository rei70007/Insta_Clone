export async function load({ locals }) {
  return {
    user: locals.user // this is set in hooks.server.js
  };
}
 