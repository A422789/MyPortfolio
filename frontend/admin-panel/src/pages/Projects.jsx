import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { version } = useTheme();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', repoLink: '', liveLink: '', order: 0, featured: false
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingId(project._id);
      setFormData({
        title: project.title,
        description: project.description,
        techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack,
        repoLink: project.repoLink || '',
        liveLink: project.liveLink || '',
        order: project.order || 0,
        featured: project.featured || false,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '', description: '', techStack: '', repoLink: '', liveLink: '', order: 0, featured: false
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    
    if (selectedFile) {
      submitData.append('image', selectedFile);
    }

    const toastId = toast.loading(editingId ? 'Updating project...' : 'Creating project...');

    try {
      if (editingId) {
        await API.put(`/admin/projects/${editingId}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Project updated', { id: toastId });
      } else {
        await API.post('/admin/projects', submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Project created', { id: toastId });
      }
      fetchProjects();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project', { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await API.delete(`/admin/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
      toast.success('Project deleted');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) return <div className="text-[var(--color-text-2)]">Loading projects...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-10 text-[var(--color-text-1)] transition-colors duration-[var(--duration-color)]">
      <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-[var(--color-text-2)] mt-1">Manage your portfolio projects showcase.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 btn-primary shadow-[var(--glow-sm,none)]">
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-[var(--color-surface-1)] rounded-2xl border border-[var(--color-border)] overflow-hidden flex flex-col group hover:border-[var(--color-border-accent)] transition-colors shadow-[var(--glow-card,var(--elevation-1))]">
            <div className="h-48 relative overflow-hidden bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
              {project.image?.url ? (
                <img src={project.image.url} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-text-3)]">
                  <ImageIcon size={40} />
                </div>
              )}
              {project.featured && (
                <span className="absolute top-2 right-2 bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-bold px-2 py-1 rounded shadow-md">Featured</span>
              )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-[var(--color-text-1)] mb-2 line-clamp-1 group-hover:text-[var(--color-accent)] transition-colors">{project.title}</h3>
              <p className="text-sm text-[var(--color-text-2)] line-clamp-2 mb-4 flex-1">{project.description}</p>
              
              <div className="flex gap-2 mt-auto pt-4 border-t border-[var(--color-border)]">
                <button onClick={() => openModal(project)} className="flex-1 flex justify-center items-center gap-2 bg-[var(--color-surface-2)] hover:bg-[var(--color-border)] text-[var(--color-text-1)] py-2 rounded-lg transition-colors border border-[var(--color-border)] text-sm">
                  <Edit2 size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(project._id)} className="flex-1 flex justify-center items-center gap-2 bg-[var(--color-danger)]/10 hover:bg-[var(--color-danger)]/20 border border-[var(--color-danger)]/30 text-[var(--color-danger)] py-2 rounded-lg transition-colors text-sm">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--color-surface-1)] rounded-2xl border border-[var(--color-border-accent)] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[var(--elevation-3)]">
            <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)]">
              <h2 className="text-2xl font-bold text-[var(--color-text-1)]">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={closeModal} className="text-[var(--color-text-3)] hover:text-[var(--color-text-1)] transition-colors p-1 bg-[var(--color-surface-2)] rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-modal-scroll">
              <form id="projectForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-text-2)]">Project Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="form-input" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-text-2)]">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="form-input" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-text-2)]">Tech Stack (comma separated)</label>
                  <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="form-input" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-2)]">Repository Link</label>
                    <input type="url" name="repoLink" value={formData.repoLink} onChange={handleChange} className="form-input" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-2)]">Live Demo Link</label>
                    <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-2)]">Display Order</label>
                    <input type="number" name="order" value={formData.order} onChange={handleChange} className="form-input" />
                  </div>
                  
                  <div className="flex items-center gap-3 pt-8">
                    <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 accent-[var(--color-accent)]" />
                    <label htmlFor="featured" className="text-sm text-[var(--color-text-1)] cursor-pointer font-medium">Featured Project</label>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium text-[var(--color-text-2)]">Project Image {editingId ? '(Optional to replace)' : '*'}</label>
                  <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} required={!editingId} className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-2 text-[var(--color-text-1)] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-accent-light)] file:text-[var(--color-accent)] hover:file:bg-[var(--color-accent)] hover:file:text-[var(--color-accent-fg)] transition-colors" />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-[var(--color-border)] flex justify-end gap-3 bg-[var(--color-surface-2)] rounded-b-2xl">
              <button onClick={closeModal} className="px-6 py-2 rounded-xl text-[var(--color-text-2)] hover:text-[var(--color-text-1)] bg-[var(--color-surface-1)] border border-[var(--color-border)] transition-colors">Cancel</button>
              <button form="projectForm" type="submit" className="btn-primary shadow-[var(--glow-sm,none)]">
                {editingId ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
