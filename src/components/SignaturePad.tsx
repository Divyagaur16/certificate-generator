
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Save } from "lucide-react";

interface SignaturePadProps {
  onSave: (signatureUrl: string) => void;
  width?: number;
  height?: number;
}

const SignaturePad = ({ onSave, width = 400, height = 200 }: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
    setCtx(context);

    // Clear the canvas initially
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx) return;

    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling on touch devices
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx) return;
    setIsDrawing(false);
    ctx.closePath();
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveSignature = () => {
    if (!canvasRef.current) return;
    const signatureUrl = canvasRef.current.toDataURL("image/png");
    onSave(signatureUrl);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="touch-none"
        />
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={clearCanvas}
          className="flex items-center"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
        <Button 
          onClick={saveSignature}
          className="flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Signature
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
