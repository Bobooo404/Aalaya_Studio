import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Plus, Pencil, Trash2 } from 'lucide-react';
// Lock / LogOut were used by the admin login gate (now commented out):
// import { ArrowUpRight, Lock, Plus, Pencil, Trash2, LogOut } from 'lucide-react';
import { Project } from '../types';
import { loadAdminProjects, saveAdminProject, removeAdminProject } from '../lib/projectStorage';
// Admin login disabled for now — uncomment these two lines to bring the password gate back.
// import { isAdminUnlocked, lockAdmin } from '../lib/adminAuth';
// import { AdminAuthModal, ProjectFormModal } from './AdminProjectModal';
import { ProjectFormModal } from './AdminProjectModal';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  // Login gate commented out — "Add Project" is open to everyone for now.
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [showAuth, setShowAuth] = useState(false);
  const [editing, setEditing] = useState<Project | null | 'new'>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setProjects(loadAdminProjects());
    // setIsAdmin(isAdminUnlocked());
  }, []);

  const handleSave = (project: Project) => {
    try {
      const next = saveAdminProject(project);
      setProjects(next);
      setEditing(null);
      setNotice('');
    } catch {
      setNotice('Could not save. Your browser storage may be full — try fewer or smaller pictures.');
    }
  };

  const handleDelete = (project: Project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setProjects(removeAdminProject(project.id));
  };

  return (
    <section id="projects" className="relative z-10 py-24 sm:py-28 bg-[#F7F3EB]/90 overflow-hidden">
      <div className="absolute inset-0 bg-architect-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#B8620B] mb-3">Selected work</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-semibold">Projects</h2>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-4 sm:max-w-sm">
            <p className="text-sm text-[#666] leading-relaxed sm:text-right">
              A few of our recent spaces, made with good light, strong materials, and comfort for daily life.
            </p>

            {/* Login gate commented out — the Add Project panel is open for now.
            {isAdmin ? ( ... ) : ( ... )}
            */}
            <button
              onClick={() => setEditing('new')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B8620B] hover:bg-[#C85A17] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {notice && (
          <p className="mb-6 text-xs font-medium text-[#C85A17] bg-[#C85A17]/10 border border-[#C85A17]/30 rounded-xl px-4 py-3">
            {notice}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-3xl bg-white border border-[#E8E2D5] shadow-xl shadow-[#6B4E2E]/8 flex flex-col"
            >
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer"
              >
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-semibold">
                  {project.category}
                </span>
              </button>

              <div className="p-7 sm:p-8 flex flex-col flex-1">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#B8620B] mb-3">
                  {project.location} &middot; {project.year}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-semibold mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-[#5F5A53] leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#B8620B] transition-colors cursor-pointer"
                  >
                    View project <ArrowUpRight className="w-4 h-4 text-[#B8620B]" />
                  </button>

                  {projects.some((p) => p.id === project.id) && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(project)}
                        className="p-2 rounded-full bg-[#F5F1E8] hover:bg-[#B8620B] hover:text-white text-[#4A4A4A] transition-colors cursor-pointer"
                        title="Edit project"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
                        className="p-2 rounded-full bg-[#F5F1E8] hover:bg-[#C85A17] hover:text-white text-[#4A4A4A] transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Password gate commented out — re-enable by uncommenting:
      {showAuth && (
        <AdminAuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => {
            setIsAdmin(true);
            setShowAuth(false);
          }}
        />
      )}
      */}

      {editing !== null && (
        <ProjectFormModal
          project={editing === 'new' ? null : editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
