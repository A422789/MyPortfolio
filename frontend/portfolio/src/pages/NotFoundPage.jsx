import ActionButton from '../components/ui/ActionButton';

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-28 text-center text-white">
      <p className="font-mono text-[#f2de8c]">404</p>
      <h1 className="text-3xl sm:text-5xl font-light">Page not found</h1>
      <p className="text-[#b3b3b3]">Explore my projects or return to the overview.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <ActionButton variant="outline-glow" to="/">Overview</ActionButton>
        <ActionButton variant="glass" to="/projects">Case Studies</ActionButton>
      </div>
    </section>
  );
}
