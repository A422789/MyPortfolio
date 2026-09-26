import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Trash2, Mail, CheckCircle, Clock, RefreshCw, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { version } = useTheme();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await API.get('/admin/contacts');
      setMessages(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch messages');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id, currentStatus) => {
    try {
      // Toggle read status API
      await API.put(`/admin/contacts/${id}/read`);
      setMessages(messages.map(msg => msg._id === id ? { ...msg, isRead: !currentStatus } : msg));
      toast.success(currentStatus ? 'Marked as unread' : 'Marked as read');
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await API.delete(`/admin/contacts/${id}`);
      setMessages(messages.filter(msg => msg._id !== id));
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse bg-[var(--color-surface-1)] h-32 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--color-text-2)] bg-[var(--color-surface-1)] rounded-2xl border border-[var(--color-border)]">
        <AlertTriangle size={48} className="text-[var(--color-danger)] mb-4 opacity-80" />
        <p className="mb-4">Failed to load messages.</p>
        <button onClick={fetchMessages} className="btn-secondary flex items-center gap-2">
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10 transition-colors duration-[var(--duration-color)] text-[var(--color-text-1)]">
      <div className="flex justify-between items-end border-b border-[var(--color-border)] pb-4">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-[var(--color-text-2)] mt-2">Manage submissions from your portfolio contact form.</p>
        </div>
        <div className="bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-lg px-4 py-2">
          <span className="text-[var(--color-accent)] font-bold">{unreadCount}</span> Unread
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-2)] bg-[var(--color-surface-1)] rounded-2xl border border-[var(--color-border)]">
          <Mail size={48} className="mx-auto mb-4 opacity-50" />
          <p>No messages found. Inbox is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <div 
              key={msg._id} 
              className={`p-6 rounded-2xl border transition-all ${
                msg.isRead 
                  ? 'bg-[var(--color-surface-1)] border-[var(--color-border)]' 
                  : 'bg-[var(--color-surface-2)] border-[var(--color-border-accent)] shadow-[var(--glow-sm,var(--elevation-1))]'
              }`}
            >
              <div className="flex justify-between items-start gap-4 flex-col md:flex-row">
                
                {/* Header info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="text-xl font-bold text-[var(--color-text-1)] flex items-center gap-2">
                      {msg.name}
                      {!msg.isRead && <span className="bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>}
                    </h3>
                    <a href={`mailto:${msg.email}`} className="text-[var(--color-accent)] hover:underline flex items-center gap-1 text-sm">
                      <Mail size={14} /> {msg.email}
                    </a>
                  </div>
                  
                  <p className="text-[var(--color-text-2)] leading-relaxed bg-[var(--color-bg)]/50 p-4 rounded-xl border border-[var(--color-border)] whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-3)]">
                    <Clock size={12} />
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:flex-col md:w-32">
                  <button 
                    onClick={() => markAsRead(msg._id, msg.isRead)}
                    className="flex-1 flex justify-center items-center gap-2 bg-[var(--color-surface-1)] hover:bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-1)] px-3 py-2 rounded-lg transition-colors text-sm w-full"
                  >
                    <CheckCircle size={16} className={msg.isRead ? 'text-[var(--color-text-3)]' : 'text-[var(--color-success)]'} />
                    {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button 
                    onClick={() => deleteMessage(msg._id)}
                    className="flex-1 flex justify-center items-center gap-2 bg-[var(--color-danger)]/10 hover:bg-[var(--color-danger)]/20 border border-[var(--color-danger)]/30 text-[var(--color-danger)] px-3 py-2 rounded-lg transition-colors text-sm w-full"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
