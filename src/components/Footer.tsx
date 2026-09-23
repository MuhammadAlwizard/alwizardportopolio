export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-6xl mx-auto px-5 md:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 meta">
        <p>© {new Date().getFullYear()} Muhammad Alwizard</p>
        <a href="#top" className="hover:text-accent transition-colors">
          Back to top
        </a>
      </div>
    </footer>
  );
}
