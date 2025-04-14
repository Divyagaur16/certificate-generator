
import React from "react";
import { CertificateData } from "@/types/certificate";
import { getTemplateById } from "@/data/templates";
import { format } from "date-fns";

interface CertificatePreviewProps {
  certificateData: CertificateData;
  scale?: number;
}

const CertificatePreview = React.forwardRef<HTMLDivElement, CertificatePreviewProps>(
  ({ certificateData, scale = 1 }, ref) => {
    const template = getTemplateById(certificateData.templateId);
    
    // Format date if it's a valid date string
    let formattedDate = certificateData.date;
    try {
      if (certificateData.date) {
        const date = new Date(certificateData.date);
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, "MMMM d, yyyy");
        }
      }
    } catch (error) {
      console.error("Invalid date format", error);
    }

    return (
      <div 
        ref={ref}
        className="certificate-container relative bg-white rounded-lg overflow-hidden"
        style={{ 
          width: `${8.5 * scale}in`, 
          height: `${11 * scale}in`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          padding: `${0.5 * scale}in`,
          border: `${8 * scale}px solid ${template.color}`,
        }}
      >
        {/* Border Design */}
        <div 
          className="absolute inset-0 border-[1px] border-gray-200 m-4"
          style={{ borderColor: template.color + "40" }}
        ></div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold uppercase tracking-wide mb-2"
            style={{ color: template.secondaryTextColor }}
          >
            Certificate of Achievement
          </h1>
          <div 
            className="h-1 w-32 mx-auto rounded-full"
            style={{ backgroundColor: template.color }}
          ></div>
        </div>
        
        {/* Body */}
        <div className="text-center flex flex-col items-center justify-center h-[60%]">
          <p className="text-xl mb-6" style={{ color: template.primaryTextColor }}>
            This is to certify that
          </p>
          <h2 
            className="text-4xl font-bold mb-6 font-serif"
            style={{ color: template.primaryTextColor }}
          >
            {certificateData.recipientName || "Recipient Name"}
          </h2>
          <p className="text-xl mb-10" style={{ color: template.primaryTextColor }}>
            has successfully completed
          </p>
          <h3 
            className="text-3xl font-semibold mb-10 max-w-md"
            style={{ color: template.secondaryTextColor }}
          >
            {certificateData.achievement || "Achievement Title"}
          </h3>
          <p className="text-xl" style={{ color: template.primaryTextColor }}>
            {formattedDate || "Date"}
          </p>
        </div>
        
        {/* Signature */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-center w-64">
            <div className="h-16 flex items-end justify-center">
              {certificateData.signatureUrl ? (
                <img 
                  src={certificateData.signatureUrl} 
                  alt="Signature" 
                  className="h-16 object-contain"
                />
              ) : (
                <div 
                  className="w-full border-b border-gray-400"
                  style={{ borderColor: template.primaryTextColor }}
                ></div>
              )}
            </div>
            <p 
              className="text-sm mt-2 font-medium"
              style={{ color: template.primaryTextColor }}
            >
              {certificateData.issuerName || "Issuer Name"}
            </p>
            <p 
              className="text-xs"
              style={{ color: template.primaryTextColor }}
            >
              {certificateData.issuerTitle || "Issuer Title"}
            </p>
          </div>
          
          <div 
            className="w-24 h-24 border-2 rounded-full flex items-center justify-center"
            style={{ borderColor: template.color }}
          >
            <span className="text-xs text-center opacity-70">SEAL</span>
          </div>
        </div>
      </div>
    );
  }
);

CertificatePreview.displayName = "CertificatePreview";

export default CertificatePreview;
