export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/8 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] text-white/25">
            © 2026 Oriens Systems
          </p>
          <a
            href="mailto:hello@orienssystems.com"
            className="text-[13px] text-white/40 hover:text-white/80 transition-colors duration-200"
          >
            hello@orienssystems.com
          </a>
          <p className="text-[13px] text-white/40">Toronto, ON</p>
        </div>
      </div>
    </footer>
  );
}
