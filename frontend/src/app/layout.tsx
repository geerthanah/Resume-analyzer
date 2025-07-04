import "../styles/globals.css";

export const metadata = {
  title: "Resume Analyzer",
  description: "Analyze your resume against job descriptions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
