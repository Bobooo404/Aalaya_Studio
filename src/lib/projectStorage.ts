import { Project } from '../types';

const STORAGE_KEY = 'aalaya_admin_projects';

export type AdminProject = Project;

const readRaw = (): AdminProject[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AdminProject[]) : [];
  } catch {
    return [];
  }
};

export const loadAdminProjects = (): AdminProject[] => readRaw();

export const saveAdminProject = (project: AdminProject): AdminProject[] => {
  const projects = readRaw();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.unshift(project);
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return projects;
};

export const removeAdminProject = (id: string): AdminProject[] => {
  const projects = readRaw().filter((p) => p.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return projects;
};

const MAX_EDGE = 1600;

const downscale = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.onload = () => {
      const src = reader.result as string;
      const img = new Image();
      img.onerror = () => resolve(src);
      img.onload = () => {
        const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
        if (scale === 1 && src.length < 900_000) {
          resolve(src);
          return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });

export const readProjectImages = async (files: FileList | File[]): Promise<string[]> => {
  const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
  const images = await Promise.all(list.map(downscale));
  return images.filter(Boolean);
};
