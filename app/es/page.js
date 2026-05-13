import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'ES Resources — Party Hub',
  description: 'Download and view ES related PDF files.',
};

export default async function EsPage() {
  const files = [
    { name: 'ESD_IPCC_Lab_Manual.pdf', url: '/ESD_IPCC_Lab_Manual.pdf', type: 'PDF' },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />

      <section className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="badge mb-4">ES Resources</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            ES <span className="italic text-coral-400">Files & Resources</span>
          </h1>
          <p className="text-white/50 leading-relaxed mb-8">
            Download or view ES related files.
          </p>
        </div>

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
      </section>

      <Footer />
    </div>
  );
}
