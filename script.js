// ====== CONFIG ======
const WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbzXuEhYvkD8Kzu_X6K32shXtJjxAdysAyuAA5p-Y1BlAefAjFxLJp2dRAJ_yE7G1EGL/exec';

// ====== FETCH (no headers => no CORS preflight) ======
async function postJSON(body) {
  const res = await fetch(WEB_APP_URL, { method: 'POST', body: JSON.stringify(body) });
  let data;
  try { data = await res.json(); }
  catch {
    throw new Error('Backend not returning JSON. In Apps Script, set Web App access to “Anyone”.');
  }
  if (!data.success && data.error) throw new Error(data.error);
  return data;
}

// ====== SESSION (localStorage) ======
const USER_KEY = 'ltn_user';
function saveUser(user) { localStorage.setItem(USER_KEY, JSON.stringify(user)); }
function getUser() { try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; } }
function clearUser() { localStorage.removeItem(USER_KEY); }
function requireUserOrRedirect() { if (!getUser()) location.replace('/index.html'); }
function signOut() { clearUser(); location.replace('/index.html'); }

// (optional) expose globally
window.postJSON = postJSON;
window.saveUser = saveUser;
window.getUser = getUser;
window.clearUser = clearUser;
window.requireUserOrRedirect = requireUserOrRedirect;
window.signOut = signOut;
