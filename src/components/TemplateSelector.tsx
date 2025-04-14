
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { certificateTemplates } from "@/data/templates";
import { CertificateTemplate } from "@/types/certificate";

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector = ({ 
  selectedTemplateId, 
  onSelectTemplate 
}: TemplateSelectorProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-3">Select Template</h3>
      <ScrollArea className="h-[200px] pb-4">
        <div className="grid grid-cols-2 gap-4 pr-4">
          {certificateTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={template.id === selectedTemplateId}
              onSelect={() => onSelectTemplate(template.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface TemplateCardProps {
  template: CertificateTemplate;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard = ({ template, isSelected, onSelect }: TemplateCardProps) => {
  return (
    <div 
      className={`relative cursor-pointer transition-all duration-200 ${
        isSelected ? "scale-105 shadow-lg" : "hover:scale-105"
      }`}
      onClick={onSelect}
    >
      <Card className={`overflow-hidden border-2 ${
        isSelected ? `border-primary` : "border-transparent"
      }`}>
        <CardContent className="p-0">
          <div 
            className="h-24 w-full bg-gray-100 flex items-center justify-center"
            style={{ backgroundColor: template.color + "20" }}
          >
            <div className="text-sm font-medium" style={{ color: template.color }}>
              {template.name}
            </div>
          </div>
        </CardContent>
      </Card>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
          <Check size={12} />
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
