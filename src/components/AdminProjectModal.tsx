import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X, Lock, ImagePlus, Trash2, Loader2 } from 'lucide-react';
import { Project } from '../types';
import { readProjectImages } from '../lib/projectStorage';
import { unlockAdmin } from '../lib/adminAuth';

const CATEGORIES: { value: Project['category']; label: string }[] = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Interior' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'sustainable', label: 'Sustainable' },
];

const overlayClasses =
  'fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 overflow-y-auto';

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white border border-[#E0D9CC] text-sm text-[#1A1A1A] placeholder-[#9A948C] focus:outline-none focus:border-[#B8620B] transition-colors';

const labelClasses =
  'block text-xs uppercase font-mono tracking-wider text-[#666] mb-1.5';

interface AdminAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockAdmin(password)) {
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className={overlayClasses}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EBE5DA] overflow-hidden my-auto"
      >
        <div className="px-6 py-4 border-b border-[#F0EBE1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#B8620B]/15 text-[#B8620B] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Admin Access</h3>
              <p className="text-[11px] uppercase tracking-widest text-[#B8620B]">
                Manage Projects
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F5F1E8] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={labelClasses}>Password</label>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter admin password"
              className={inputClasses}
            />
            {error && (
              <p className="text-xs text-[#C85A17] mt-2 font-medium">
                Wrong password. Please try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B8620B] transition-colors cursor-pointer"
          >
            Unlock Panel
          </button>
        </form>
      </motion.div>
    </div>
  );
};

interface ProjectFormModalProps {
  project: Project | null;
  onSave: (project: Project) => void;
  onClose: () => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  project,
  onSave,
  onClose,
}) => {
  const existingImages = project
    ? Array.from(new Set([project.heroImage, ...(project.galleryImages || [])]))
    : [];

  const [title, setTitle] = useState(project?.title || '');
  const [tagline, setTagline] = useState(project?.tagline || '');
  const [description, setDescription] = useState(project?.description || '');
  const [location, setLocation] = useState(project?.location || '');
  const [year, setYear] = useState(project?.year || String(new Date().getFullYear()));
  const [area, setArea] = useState(project?.area || '');
  const [category, setCategory] = useState<Project['category']>(
    project?.category || 'residential'
  );
  const [images, setImages] = useState<string[]>(existingImages);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsReading(true);
    setError('');
    try {
      const added = await readProjectImages(files);
      setImages((prev) => Array.from(new Set([...prev, ...added])));
    } catch {
      setError('Some images could not be read. Please try other files.');
    } finally {
      setIsReading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please add a title and a description.');
      return;
    }
    if (images.length === 0) {
      setError('Please upload at least one picture.');
      return;
    }

    onSave({
      id: project?.id || `admin-${Date.now()}`,
      title: title.trim(),
      tagline: tagline.trim() || 'Added by the studio',
      category,
      location: location.trim() || '—',
      year: year.trim() || String(new Date().getFullYear()),
      area: area.trim() || '—',
      heroImage: images[0],
      blueprintImage: images[0],
      galleryImages: images.slice(1),
      description: description.trim(),
      architecturalPhilosophy:
        project?.architecturalPhilosophy || description.trim(),
      materials: project?.materials || [],
      keyFeatures: project?.keyFeatures || [],
      clientType: project?.clientType || 'Aalaya AS Studios',
      ...(project?.award ? { award: project.award } : {}),
    });
  };

  return createPortal(
    <div className={overlayClasses}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#EBE5DA] bg-white shadow-2xl my-auto"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#F0EBE1] bg-white/95 px-6 py-4 backdrop-blur-md">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              {project ? 'Edit Project' : 'Add a Project'}
            </h3>
            <p className="text-[11px] uppercase tracking-widest text-[#B8620B]">
              Upload pictures & write a description
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F5F1E8] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">
          <div>
            <label className={labelClasses}>Pictures *</label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-8 rounded-2xl border-2 border-dashed border-[#DDD5C7] bg-[#FBF9F5] hover:border-[#B8620B] hover:bg-[#F5F1E8] transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              {isReading ? (
                <Loader2 className="w-6 h-6 text-[#B8620B] animate-spin" />
              ) : (
                <ImagePlus className="w-6 h-6 text-[#B8620B]" />
              )}
              <span className="text-xs uppercase tracking-widest font-semibold text-[#4A4A4A]">
                {isReading ? 'Processing images...' : 'Click to upload pictures'}
              </span>
              <span className="text-[11px] text-[#8A847C]">
                First picture becomes the cover. JPG, PNG or WebP.
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                {images.map((img, idx) => (
                  <div
                    key={`${img.slice(-24)}-${idx}`}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#EBE5DA] group"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {idx === 0 && (
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/70 text-white text-[9px] uppercase tracking-wider">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C85A17] cursor-pointer"
                      aria-label="Remove picture"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClasses}>Project Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Courtyard Residence"
                className={inputClasses}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClasses}>Description *</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the space, materials, light and feel of the project..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <div>
              <label className={labelClasses}>Short Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. A bright home with open views"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Project['category'])}
                className={inputClasses}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClasses}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, India"
                className={inputClasses}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2026"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Area</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="2,400 sq.ft"
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-xs text-[#C85A17] font-medium">{error}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={isReading}
              className="flex-1 py-3.5 rounded-full bg-[#B8620B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C85A17] transition-colors cursor-pointer disabled:opacity-50"
            >
              {project ? 'Save Changes' : 'Publish Project'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="sm:w-44 py-3.5 rounded-full bg-[#F5F1E8] text-[#1A1A1A] text-xs uppercase tracking-widest font-semibold hover:bg-[#EBE5DA] transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>,
    document.body
  );
};
