import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const metadata = {
  title: 'IoT Resources — Party Hub',
  description: 'Download and view IoT related files including PDF, Markdown, and Text files.',
};

export default async function IotPage() {
  const filePath = join(process.cwd(), 'iot1.md');
  const fileContent = await readFile(filePath, 'utf-8');

  const files = [
    { name: 'IOT.pdf', url: '/IOT.pdf', type: 'PDF' },
    { name: 'iot1.md', url: '/iot1.md', type: 'Markdown' },
    { name: 'iot1.txt', url: '/iot1.txt', type: 'Text' },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />

      <section className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="badge mb-4">IoT Resources</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            IoT <span className="italic text-coral-400">Files & Resources</span>
          </h1>
          <p className="text-white/50 leading-relaxed mb-8">
            Download or view IoT related files. Below you'll find the full content of the markdown file.
          </p>
        </div>

        {/* File Download/View Section */}
        <div className="mb-16">
          <h2 className="section-title mb-8">Available Files</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {files.map((file) => (
              <div key={file.name} className="card-dark p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-base">{file.name}</h3>
                  <span className="badge text-xs">{file.type}</span>
                </div>
                <div className="flex gap-3">
                  <a
                    href={file.url}
                    download
                    className="btn-coral text-sm px-4 py-2"
                  >
                    Download
                  </a>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-coral text-sm px-4 py-2"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Markdown Content Section */}
        <div>
          <h2 className="section-title mb-8">iot1.md Full Content</h2>
          <div className="card-dark p-8 overflow-x-auto">
            <pre className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-mono">
              {fileContent}
            </pre>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
