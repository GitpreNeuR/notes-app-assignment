import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-center items-center p-6 text-slate-100">
      <main className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Capture Ideas, <br />
          <span className="text-slate-300">Boost Productivity</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-slate-300">
          Streamline your thoughts and supercharge your workflow with our intuitive note-taking app.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
          <Link
            to="/sign-in"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-slate-100 border-2 border-slate-100 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors duration-300"
          >
            Login
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <FeatureCard
            title="Smart Organization"
            description="Effortlessly categorize and find your notes with AI-powered tagging."
          />
          <FeatureCard
            title="Collaborative Editing"
            description="Work together in real-time with team members on shared projects."
          />
          <FeatureCard
            title="Cross-Platform Sync"
            description="Access your notes seamlessly across all your devices, always up-to-date."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-slate-300">
        <p>&copy; 2023 YourNotesApp. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-slate-700 bg-opacity-20 p-6 rounded-lg backdrop-blur-lg border border-slate-600">
      <CheckCircle className="text-slate-300 mb-4" size={24} />
      <h3 className="text-xl font-semibold mb-2 text-slate-100">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
}