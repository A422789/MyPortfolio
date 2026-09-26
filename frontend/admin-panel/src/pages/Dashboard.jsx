import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Briefcase, Code, Award, MessageSquare, Users, TrendingUp, Activity, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const StatCard = ({ title, value, subValue, icon, accentColor = 'gold', loading }) => {
  const isRed = accentColor === 'red';
  const colorMap = {
    gold: {
      border: 'border-[#cea605]/30',
      bg: 'from-[#cea605]/15 to-transparent',
      iconBg: 'bg-[#cea605]/10 border-[#cea605]/20',
      badge: 'bg-[#cea605]/10 text-[#cea605]',
    },
    red: {
      border: 'border-red-500/30',
      bg: 'from-red-500/15 to-transparent',
      iconBg: 'bg-red-500/10 border-red-500/20',
      badge: 'bg-red-500/10 text-red-400',
    },
    blue: {
      border: 'border-blue-500/30',
      bg: 'from-blue-500/15 to-transparent',
      iconBg: 'bg-blue-500/10 border-blue-500/20',
      badge: 'bg-blue-500/10 text-blue-400',
    },
  };

  const colors = colorMap[accentColor] || colorMap.gold;

  return (
    <div
      className={`relative bg-gradient-to-br ${colors.bg} bg-[#0d0d0d] p-6 rounded-2xl border ${colors.border} 
        flex items-center justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)]
        hover:shadow-[0_0_25px_rgba(206,166,5,0.1)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}
    >
      {/* Subtle glow in background */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${isRed ? 'bg-red-500' : 'bg-[#cea605]'}`} />

      <div className="relative z-10">
        <p className="text-gray-400 text-sm font-medium mb-2 tracking-wide uppercase">{title}</p>
        {loading ? (
          <div className="h-10 w-16 bg-white/5 rounded-lg animate-pulse mb-1" />
        ) : (
          <h3 className="text-4xl font-bold text-white mb-1 tabular-nums">{value?.toLocaleString()}</h3>
        )}
        {subValue && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
            {subValue}
          </span>
        )}
      </div>

      <div className={`relative z-10 p-4 rounded-2xl border ${colors.iconBg}`}>
        {icon}
      </div>
    </div>
  );
};

const ActivityItem = ({ log }) => {
  const actionColors = {
    CREATE: 'text-green-400 bg-green-500/10',
    UPDATE: 'text-blue-400 bg-blue-500/10',
    DELETE: 'text-red-400 bg-red-500/10',
  };
  const colorClass = actionColors[log.action] || 'text-gray-400 bg-white/5';

  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
      <span className={`text-[10px] font-bold px-2 py-1 rounded-md shrink-0 mt-0.5 ${colorClass}`}>
        {log.action}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 truncate">
          <span className="text-white font-medium">{log.entity}</span>
          {log.details && <span className="text-gray-500"> — {log.details}</span>}
        </p>
        <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
          <Clock size={10} />
          {new Date(log.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/admin/stats');
        setStats(res.data.data);
      } catch (error) {
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Visits',
      value: stats?.totalVisits ?? 0,
      icon: <Users size={28} className="text-[#cea605]" />,
      subValue: 'Unique browsers',
      accentColor: 'gold',
    },
    {
      title: 'Total Projects',
      value: stats?.totalProjects ?? 0,
      icon: <Briefcase size={28} className="text-[#cea605]" />,
      accentColor: 'gold',
    },
    {
      title: 'Skills Added',
      value: stats?.totalSkills ?? 0,
      icon: <Code size={28} className="text-[#cea605]" />,
      accentColor: 'gold',
    },
    {
      title: 'Certificates',
      value: stats?.totalCertificates ?? 0,
      icon: <Award size={28} className="text-[#cea605]" />,
      accentColor: 'gold',
    },
    {
      title: 'Contact Messages',
      value: stats?.totalMessages ?? 0,
      icon: <MessageSquare size={28} className={stats?.unreadMessages > 0 ? 'text-red-400' : 'text-[#cea605]'} />,
      subValue: stats?.unreadMessages > 0 ? `${stats.unreadMessages} Unread` : 'All read',
      accentColor: stats?.unreadMessages > 0 ? 'red' : 'gold',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end border-b border-[#cea605]/20 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Dashboard</h1>
          <p className="text-gray-400 mt-1.5 text-sm">Welcome back! Here's a snapshot of your portfolio.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
          <Activity size={14} className="text-[#cea605]" />
          Live data
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {statCards.map((card, index) => (
          <StatCard key={index} loading={loading} {...card} />
        ))}
      </div>

      {/* Recent Activity Log */}
      {(stats?.recentLogs?.length > 0 || loading) && (
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-[#cea605]" />
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div>
              {stats.recentLogs.map((log, i) => (
                <ActivityItem key={log._id || i} log={log} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
