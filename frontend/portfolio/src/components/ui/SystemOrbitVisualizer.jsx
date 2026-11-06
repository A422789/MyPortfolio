import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const NODES_DATA = [
  {
    id: 'gateway',
    name: 'Node.js & Express REST Core',
    type: 'Backend Runtime',
    tag: 'REST / MVC Architecture',
    description: 'Event-driven Node.js backend executing stateless Express REST APIs, middleware validation, and secure MongoDB data pipelines.',
    metric: 'Stateless API Layer',
    color: '#68a063',
    icon: (
      <svg className="w-6 h-6 text-[#68a063]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a1.64 1.64 0 00-.82.22L3.38 6.95a1.64 1.64 0 00-.82 1.42v9.26c0 .59.32 1.13.82 1.42l7.8 4.5a1.65 1.65 0 001.64 0l7.8-4.5c.5-.29.82-.83.82-1.42V8.37c0-.59-.32-1.13-.82-1.42L12.82 2.22A1.64 1.64 0 0012 2zm0 2.4l6.64 3.84v7.12L12 19.2l-6.64-3.84V8.24L12 4.4z" />
        <path d="M12 7.2L7.5 9.8v4.4L12 16.8l4.5-2.6V9.8L12 7.2z" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'client',
    name: 'React 19 SPA Client',
    type: 'Frontend Tier',
    tag: 'React Router / Redux',
    description: 'Responsive single-page and multi-route interfaces with structured state management, dynamic routing, and Framer Motion interactions.',
    metric: 'Component Architecture',
    color: '#61dafb',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2.2" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'database',
    name: 'MongoDB Atlas',
    type: 'Data Tier',
    tag: 'Mongoose ODM',
    description: 'Document database with strict Mongoose schema validation, compound indexing, and relational reference modeling.',
    metric: 'Indexed Pipelines',
    color: '#47a248',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C11.5 2 7 8 7 13.5C7 17.5 9.5 21 12 22C14.5 21 17 17.5 17 13.5C17 8 12.5 2 12 2ZM12 19.8C10.5 19 9 16.5 9 13.5C9 10 11.2 5.5 12 4.2C12.8 5.5 15 10 15 13.5C15 16.5 13.5 19 12 19.8Z" />
      </svg>
    ),
  },
  {
    id: 'security',
    name: 'JWT & RBAC Security',
    type: 'Auth Guard',
    tag: 'HTTP-Only Cookies',
    description: 'Role-based access control, cryptographic token verification, and secure HTTP-only cookie refresh rotation.',
    metric: 'Access + Refresh Rotation',
    color: '#f59e0b',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'cloud',
    name: 'Cloud & Containers',
    type: 'Infrastructure',
    tag: 'Docker / Kubernetes',
    description: 'Containerized service deployments with Docker and Kubernetes, automated GitHub Actions CI/CD pipelines, and cloud media delivery.',
    metric: 'CI/CD & Containers',
    color: '#a855f7',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 001.5-7.7A5 5 0 009 8a5 5 0 00-6 7z" />
      </svg>
    ),
  },
];

const SystemOrbitVisualizer = () => {
  const [activeNode, setActiveNode] = useState(NODES_DATA[0]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[500px] h-[520px] mx-auto flex flex-col items-center justify-between select-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="relative w-full h-[370px] flex items-center justify-center shrink-0"
      >
        <div className="absolute w-72 h-72 rounded-full bg-[#cea605]/10 blur-3xl pointer-events-none" />

        <div
          className="absolute w-[310px] h-[310px] sm:w-[340px] sm:h-[340px] rounded-full border border-dashed border-[#cea605]/20 animate-spin pointer-events-none"
          style={{ animationDuration: '38s', animationTimingFunction: 'linear' }}
        >
          <button
            type="button"
            onPointerDown={() => setActiveNode(NODES_DATA[1])}
            onClick={() => setActiveNode(NODES_DATA[1])}
            style={{ animation: 'spin 38s linear infinite reverse' }}
            className={`pointer-events-auto z-30 before:content-[''] before:absolute before:-inset-4 absolute -top-5 left-1/2 -translate-x-1/2 p-2.5 rounded-2xl bg-black/90 border ${activeNode.id === 'client' ? 'border-[#61dafb] shadow-[0_0_25px_rgba(97,218,251,0.6)] scale-110' : 'border-[#61dafb]/40'
              } text-[#61dafb] hover:scale-115 transition-all duration-300 cursor-pointer group shadow-lg backdrop-blur-md`}
            title="React 19 SPA Client"
          >
            {NODES_DATA[1].icon}
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-wider text-[#61dafb] opacity-80 whitespace-nowrap">
              React SPA
            </span>
          </button>

          <button
            type="button"
            onPointerDown={() => setActiveNode(NODES_DATA[4])}
            onClick={() => setActiveNode(NODES_DATA[4])}
            style={{ animation: 'spin 38s linear infinite reverse' }}
            className={`pointer-events-auto z-30 before:content-[''] before:absolute before:-inset-4 absolute -bottom-5 left-1/2 -translate-x-1/2 p-2.5 rounded-2xl bg-black/90 border ${activeNode.id === 'cloud' ? 'border-[#a855f7] shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-110' : 'border-[#a855f7]/40'
              } text-[#a855f7] hover:scale-115 transition-all duration-300 cursor-pointer group shadow-lg backdrop-blur-md`}
            title="Cloud & Containers"
          >
            {NODES_DATA[4].icon}
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-wider text-[#a855f7] opacity-80 whitespace-nowrap">
              Docker / K8s
            </span>
          </button>
        </div>

        <div
          className="absolute w-[205px] h-[205px] sm:w-[225px] sm:h-[225px] rounded-full border border-dotted border-[#cea605]/35 animate-spin pointer-events-none"
          style={{ animationDuration: '24s', animationDirection: 'reverse', animationTimingFunction: 'linear' }}
        >
          <button
            type="button"
            onPointerDown={() => setActiveNode(NODES_DATA[2])}
            onClick={() => setActiveNode(NODES_DATA[2])}
            style={{ animation: 'spin 24s linear infinite' }}
            className={`pointer-events-auto z-30 before:content-[''] before:absolute before:-inset-4 absolute -right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl bg-black/90 border ${activeNode.id === 'database' ? 'border-[#47a248] shadow-[0_0_25px_rgba(71,162,72,0.6)] scale-110' : 'border-[#47a248]/40'
              } text-[#47a248] hover:scale-115 transition-all duration-300 cursor-pointer group shadow-lg backdrop-blur-md`}
            title="MongoDB Atlas"
          >
            {NODES_DATA[2].icon}
            <span className="absolute -left-16 top-1/2 -translate-y-1/2 text-[9px] font-mono tracking-wider text-[#47a248] opacity-80 whitespace-nowrap">
              MongoDB
            </span>
          </button>

          <button
            type="button"
            onPointerDown={() => setActiveNode(NODES_DATA[3])}
            onClick={() => setActiveNode(NODES_DATA[3])}
            style={{ animation: 'spin 24s linear infinite' }}
            className={`pointer-events-auto z-30 before:content-[''] before:absolute before:-inset-4 absolute -left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl bg-black/90 border ${activeNode.id === 'security' ? 'border-[#f59e0b] shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-110' : 'border-[#f59e0b]/40'
              } text-[#f59e0b] hover:scale-115 transition-all duration-300 cursor-pointer group shadow-lg backdrop-blur-md`}
            title="JWT & RBAC Security"
          >
            {NODES_DATA[3].icon}
            <span className="absolute -right-16 top-1/2 -translate-y-1/2 text-[9px] font-mono tracking-wider text-[#f59e0b] opacity-80 whitespace-nowrap">
              JWT / Auth
            </span>
          </button>
        </div>

        <button
          type="button"
          onPointerDown={() => setActiveNode(NODES_DATA[0])}
          onClick={() => setActiveNode(NODES_DATA[0])}
          className={`relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#1c190f] via-black to-[#0d0c07] border-2 ${activeNode.id === 'gateway' ? 'border-[#cea605] shadow-[0_0_45px_rgba(206,166,5,0.7)]' : 'border-[#725c02]'
            } flex flex-col items-center justify-center p-2 transition-all duration-300 cursor-pointer group active:scale-95`}
        >
          <span className="absolute inset-0 rounded-full border border-[#cea605]/50 animate-ping opacity-35" />

          <div className="text-[#68a063] group-hover:scale-110 transition-transform duration-300">
            {NODES_DATA[0].icon}
          </div>
          <span className="text-[11px] font-bold text-white tracking-wider mt-1 group-hover:text-[#83cd29] transition-colors">
            NODE.JS
          </span>
          <span className="text-[9px] font-mono text-[#cea605] tracking-widest uppercase">
            EXPRESS CORE
          </span>
        </button>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
          <line x1="200" y1="45" x2="200" y2="355" stroke="#cea605" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.25" />
          <line x1="45" y1="200" x2="355" y2="200" stroke="#cea605" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.25" />
        </svg>
      </motion.div>

      <div className="w-full shrink-0 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-1 w-full px-1">
          {NODES_DATA.map((node) => {
            const isActive = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all duration-200 cursor-pointer truncate text-center ${isActive
                    ? 'bg-[#cea605]/20 text-[#f2de8c] border border-[#cea605]/60 font-medium shadow-[0_0_10px_rgba(206,166,5,0.25)]'
                    : 'bg-white/[0.02] text-[#808080] hover:text-[#b3b3b3] border border-white/5'
                  }`}
              >
                {node.id === 'gateway' ? 'Node.js' : node.id === 'client' ? 'React' : node.id === 'database' ? 'MongoDB' : node.id === 'security' ? 'Auth' : 'Cloud'}
              </button>
            );
          })}
        </div>

        <div className="w-full h-[110px] bg-white/[0.03] border border-[#725c02]/50 hover:border-[#cea605]/60 rounded-2xl p-4 backdrop-blur-xl shadow-xl shadow-black/60 transition-colors flex flex-col justify-center overflow-hidden">
          <div key={activeNode.id} className="transition-opacity duration-200 ease-out">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeNode.color }} />
                <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
                  {activeNode.type}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#a3a3a3] font-light">
                  {activeNode.tag}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#f2de8c]">
                {activeNode.metric}
              </span>
            </div>

            <p className="text-sm font-medium text-white mb-1">
              {activeNode.name}
            </p>
            <p className="text-xs text-[#a3a3a3] font-light leading-relaxed line-clamp-2">
              {activeNode.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOrbitVisualizer;
