
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Download, 
  Pencil, 
  Palette, 
  Award
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Certificate Canvas Creator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create beautiful, professional certificates in minutes. Customize templates, add your signature, and download instantly.
          </p>
          <Link to="/editor">
            <Button size="lg" className="animate-fade-in">
              Create Certificate
              <FileText className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Create Professional Certificates Easily</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Palette className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Beautiful Templates</h3>
            <p className="text-gray-600">
              Choose from a variety of professionally designed templates to suit any occasion or achievement.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Pencil className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Add Your Signature</h3>
            <p className="text-gray-600">
              Draw or upload your signature to personalize certificates with an authentic touch.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Download</h3>
            <p className="text-gray-600">
              Download your certificates immediately as high-quality images, ready to print or share.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Creating Your Certificate Now
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Whether for academic achievements, work recognition, or special events, create professional certificates in minutes.
          </p>
          <Link to="/editor">
            <Button size="lg" variant="secondary" className="font-semibold">
              Get Started
              <Award className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
