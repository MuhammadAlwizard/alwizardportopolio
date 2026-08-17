export default function Footer() {
  return (
    <footer className="border-t border-gold-500/10 py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ivory/50">
        <p>© {new Date().getFullYear()} Muhammad Alwizard. Built with Next.js &amp; MySQL.</p>
        <div className="flex gap-6">
          <a href="mailto:alwizard659@gmail.com" className="hover:text-gold-500 transition-colors">
            Email
          </a>
          <a
            href="https://linkedin.com/in/alwizard"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold-500 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
