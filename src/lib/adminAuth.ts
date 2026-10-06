const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'aalaya@2026';
const SESSION_KEY = 'aalaya_admin_unlocked';

export const isAdminUnlocked = (): boolean => {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
};

export const unlockAdmin = (password: string): boolean => {
  if (password.trim() !== PASSWORD) return false;
  try {
    window.sessionStorage.setItem(SESSION_KEY, 'true');
  } catch {
    return false;
  }
  return true;
};

export const lockAdmin = (): void => {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
};
