import "./globals.css";

export const metadata = {
  title: "Resume Analyzer",
  description: "Analyze your resume against job descriptions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="bg-blue-600 dark:bg-blue-700 text-white shadow-md">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wide">Resume Analyzer</h1>
            <span className="text-sm font-medium opacity-90">AI-Powered Tool</span>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-blue-600 dark:bg-blue-800 text-white text-center py-4 text-sm mt-10">
          © {new Date().getFullYear()} Resume Analyzer
        </footer>
      </body>
    </html>
  );
}
