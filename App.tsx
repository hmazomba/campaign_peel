
import React, { useState } from 'react';
import NeubrutalButton from './components/NeubrutalButton';
import AssetCard from './components/AssetCard';
import { extractTextFromPdf } from './services/pdfParser';
import { generateMarketingAssets } from './services/gemini';
import { MarketingAsset } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('Professional & Engaging');
  const [audience, setAudience] = useState('Small business owners');
  const [isGenerating, setIsGenerating] = useState(false);
  const [assets, setAssets] = useState<MarketingAsset[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      const extractedText = await extractTextFromPdf(file);
      setInputText(extractedText);
    } catch (err) {
      setError('Failed to parse PDF. Please copy and paste the text manually.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError('Provide some content first. Feed the banana!');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const generated = await generateMarketingAssets({
        sourceText: inputText,
        tone: tone,
        targetAudience: audience
      });
      setAssets(generated);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. The peel slipped!');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateAsset = (id: string, newContent: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, content: newContent } : a));
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-orange-50 text-black pb-24">
      {/* Header */}
      <header className="bg-yellow-400 border-b-4 border-black p-8 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter transform -rotate-1">
              CAMPAIGN<span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">PEEL</span>
            </h1>
            <p className="font-bold text-xs mt-2 uppercase tracking-widest bg-black text-white px-2 py-0.5 inline-block">
              Powered by Nano Banana
            </p>
          </div>
          <div className="hidden md:block">
            <span className="font-black text-sm border-2 border-black p-2 bg-white neubrutalism-shadow">v1.0.0</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Input Panel */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white border-2 border-black neubrutalism-shadow p-6 space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-black pb-2">
                <span className="bg-black text-white w-6 h-6 flex items-center justify-center font-black text-sm">1</span>
                <h2 className="text-xl font-black uppercase">The Source</h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-slate-500">Paste Copy / Pitch</label>
                <textarea 
                  className="w-full h-48 border-2 border-black p-3 font-medium focus:outline-none focus:bg-yellow-50 transition-colors"
                  placeholder="Paste your product description, blog post, or raw notes here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-slate-500">Or Upload PDF</label>
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="w-full border-2 border-black p-2 bg-slate-50 text-xs font-bold file:mr-4 file:py-1 file:px-4 file:border-2 file:border-black file:bg-yellow-400 file:font-black file:uppercase file:cursor-pointer hover:file:bg-yellow-300"
                />
              </div>
            </section>

            <section className="bg-white border-2 border-black neubrutalism-shadow p-6 space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-black pb-2">
                <span className="bg-black text-white w-6 h-6 flex items-center justify-center font-black text-sm">2</span>
                <h2 className="text-xl font-black uppercase">The Context</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase text-slate-500">Brand Voice</label>
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full border-2 border-black p-3 font-bold bg-white focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                  >
                    <option>Professional & Engaging</option>
                    <option>Witty & Viral</option>
                    <option>Aggressive & Direct</option>
                    <option>Luxury & Minimalist</option>
                    <option>Friendly & Community-Focused</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase text-slate-500">Target Audience</label>
                  <input 
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. CMOs at SaaS companies"
                    className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:bg-yellow-50 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-100 border-2 border-black text-red-600 font-bold text-sm neubrutalism-shadow">
                  {error}
                </div>
              )}

              <NeubrutalButton 
                onClick={handleGenerate}
                isLoading={isGenerating}
                className="w-full text-lg py-4"
              >
                PEEL ASSETS 🍌
              </NeubrutalButton>
            </section>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-8 space-y-8" id="results">
            {isGenerating && assets.length === 0 ? (
              <div className="h-full min-h-[500px] bg-white border-2 border-black neubrutalism-shadow flex flex-col items-center justify-center p-12 text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-yellow-400 border-4 border-black animate-spin duration-1000 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-2xl">?</div>
                </div>
                <p className="font-black uppercase text-3xl italic">Peeling the content...</p>
                <p className="font-bold text-sm mt-4 text-slate-500 max-w-xs">Our AI is currently shredding your source text into high-converting social bites.</p>
              </div>
            ) : assets.length === 0 ? (
              <div className="h-full min-h-[500px] border-4 border-dashed border-black/20 flex flex-col items-center justify-center p-12 text-center">
                <div className="text-8xl mb-6 grayscale opacity-20">🎨</div>
                <h3 className="font-black uppercase text-4xl text-black/20">Empty Campaign</h3>
                <p className="font-bold text-black/30 mt-2">Fill the source panel to start generating assets.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {assets.map((asset) => (
                  <AssetCard 
                    key={asset.id} 
                    asset={asset} 
                    onUpdate={updateAsset} 
                    onDelete={deleteAsset}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 mt-20 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Built with Neubrutalism & Gemini 3 Flash
        </p>
      </footer>
    </div>
  );
};

export default App;
