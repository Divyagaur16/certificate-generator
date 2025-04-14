
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Download, Save, Upload, Pen, Image, Text, ArrowLeft 
} from "lucide-react";
import CertificatePreview from "@/components/CertificatePreview";
import SignaturePad from "@/components/SignaturePad";
import TemplateSelector from "@/components/TemplateSelector";
import { CertificateData, SignatureType } from "@/types/certificate";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

const Editor = () => {
  const { toast } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [certificateData, setCertificateData] = useState<CertificateData>({
    recipientName: "",
    achievement: "",
    issuerName: "",
    issuerTitle: "",
    date: new Date().toISOString().split("T")[0],
    signatureType: "draw",
    templateId: "classic-blue"
  });

  const [activeTab, setActiveTab] = useState("template");
  const [signatureTab, setSignatureTab] = useState<SignatureType>("draw");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCertificateData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectTemplate = (templateId: string) => {
    setCertificateData(prev => ({ ...prev, templateId }));
  };

  const handleSaveSignature = (signatureUrl: string) => {
    setCertificateData(prev => ({ 
      ...prev, 
      signatureUrl,
      signatureType: signatureTab
    }));
    
    toast({
      title: "Signature Saved",
      description: "Your signature has been added to the certificate.",
    });
  };

  const handleUploadSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCertificateData(prev => ({ 
          ...prev, 
          signatureUrl: event.target.result as string,
          signatureType: "upload"
        }));
        
        toast({
          title: "Signature Uploaded",
          description: "Your signature has been added to the certificate.",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    toast({
      title: "Preparing Download",
      description: "Your certificate is being prepared for download...",
    });
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "white",
        logging: false,
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${certificateData.recipientName.replace(/\s+/g, "_")}_certificate.png`;
      link.click();
      
      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been saved to your device.",
      });
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Certificate Editor</h1>
        </div>
        
        <Button onClick={downloadCertificate}>
          <Download className="mr-2 h-4 w-4" />
          Download Certificate
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="template">Template</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="signature">Signature</TabsTrigger>
                </TabsList>
                
                <TabsContent value="template">
                  <TemplateSelector 
                    selectedTemplateId={certificateData.templateId}
                    onSelectTemplate={handleSelectTemplate}
                  />
                </TabsContent>
                
                <TabsContent value="content">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipientName">Recipient Name</Label>
                      <Input
                        id="recipientName"
                        name="recipientName"
                        value={certificateData.recipientName}
                        onChange={handleChange}
                        placeholder="Enter recipient name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="achievement">Achievement</Label>
                      <Input
                        id="achievement"
                        name="achievement"
                        value={certificateData.achievement}
                        onChange={handleChange}
                        placeholder="Enter achievement or course"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={certificateData.date}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="issuerName">Issuer Name</Label>
                      <Input
                        id="issuerName"
                        name="issuerName"
                        value={certificateData.issuerName}
                        onChange={handleChange}
                        placeholder="Enter issuer name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="issuerTitle">Issuer Title</Label>
                      <Input
                        id="issuerTitle"
                        name="issuerTitle"
                        value={certificateData.issuerTitle}
                        onChange={handleChange}
                        placeholder="Enter issuer title"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="signature">
                  <div className="space-y-6">
                    <Tabs value={signatureTab} onValueChange={(value) => setSignatureTab(value as SignatureType)}>
                      <TabsList className="grid grid-cols-2 mb-6">
                        <TabsTrigger value="draw" className="flex items-center gap-1">
                          <Pen className="h-3 w-3" />
                          Draw
                        </TabsTrigger>
                        <TabsTrigger value="upload" className="flex items-center gap-1">
                          <Upload className="h-3 w-3" />
                          Upload
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="draw">
                        <SignaturePad onSave={handleSaveSignature} width={300} height={150} />
                      </TabsContent>
                      
                      <TabsContent value="upload">
                        <div className="space-y-4">
                          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-[150px]">
                            <Image className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 mb-2">Upload a signature image</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Select File
                            </Button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleUploadSignature}
                              accept="image/*"
                              className="hidden"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Certificate Preview */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-4 flex items-center justify-center bg-gray-50 min-h-[600px]">
              <div className="transform scale-[0.55] origin-top-left overflow-auto">
                <CertificatePreview 
                  ref={certificateRef}
                  certificateData={certificateData}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Editor;
