# CAMPAIGNPEEL 🍌

**Turn raw content into high-converting marketing assets in seconds.**

CAMPAIGNPEEL is a bold, Neubrutalist-inspired web application that leverages Google's Gemini 3 Flash model to "peel" through your source documents and generate platform-optimized marketing copy. Whether it's a LinkedIn thought-leadership post, a Twitter thread, or a Google Search Ad, CAMPAIGNPEEL transforms your raw pitch into ready-to-use campaigns.

## 🚀 Features

- **Multi-Source Input:** Paste raw text or upload PDF documents for automatic content extraction.
- **Context-Aware Generation:** Define your Brand Voice (Witty, Professional, Aggressive, etc.) and Target Audience for tailored results.
- **Platform-Specific Assets:** Automatically generates:
  - LinkedIn Posts (Thought-leadership style)
  - Twitter Threads (4-tweet hooks)
  - Instagram Captions (Lifestyle & Emojis)
  - Facebook Ads (Direct Response)
  - Google Search Ads (Headlines & Descriptions)
- **Interactive Workspace:** Edit, refine, or delete generated assets directly within the UI.
- **Neubrutalist UI:** A high-contrast, bold aesthetic designed for speed and clarity.

## 🛠 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Neubrutalism style)
- **AI Engine:** [Google Gemini 3 Flash](https://ai.google.dev/) via `@google/genai`
- **PDF Processing:** [pdf.js](https://mozilla.github.io/pdf.js/)
- **Language:** TypeScript

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- A Google AI Studio API Key (Get one [here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/campaign-peel.git
   cd campaign-peel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
   *(Note: The current implementation expects `process.env.API_KEY`, ensure your build environment injects this correctly or update `services/gemini.ts` to use `import.meta.env.VITE_GEMINI_API_KEY`.)*

### Local Development

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📖 Usage

1. **Input:** Paste your product description or upload a PDF pitch deck in the "Source" panel.
2. **Configure:** Select your brand voice from the dropdown and specify your target audience.
3. **Generate:** Click **PEEL ASSETS 🍌** to start the AI generation process.
4. **Refine:** Review the generated cards. You can edit the content directly or delete assets that don't fit your current campaign.

## 📂 Project Structure

```text
├── components/          # UI Components (AssetCards, Buttons, etc.)
├── services/            # Core logic for AI and PDF parsing
│   ├── gemini.ts        # Gemini API integration
│   └── pdfParser.ts     # PDF.js implementation
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main application logic & layout
└── tailwind.config.ts   # Custom Neubrutalist theme configuration
```

---
Built with Neubrutalism & Gemini 3 Flash. 🍌