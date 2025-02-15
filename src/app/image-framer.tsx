"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from '../components/button';

export default function ImageOverlay() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefLogo = useRef<HTMLCanvasElement>(null);
  const placeholderX = 35; // Adjust X position
  const placeholderY = 270; // Adjust Y position
  const placeholderWidth = 200;
  const placeholderHeight = 200;
  let img_parent:HTMLImageElement;
  let img_logo:HTMLImageElement;
  useEffect(() => {
    img_logo = document.createElement("img");
    loadLogo();
  }, []);

  useEffect(() => {
    img_parent = document.createElement("img");
    loadParentImage();
  }, []);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    img_parent = document.createElement("img");
    loadParentImage();
    drawOverlay(ctx, img_parent);
  }, [uploadedImage]);


  const loadParentImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    img_parent.src = "https://i.ibb.co/k6r8Df8J/Whats-App-Image-2025-02-15-at-15-31-33.jpg"; // Ensure the image is inside the "public" folder
    img_parent.crossOrigin = "anonymous"; // Allows CORS images
  }

  const loadLogo = () => {
    const canvas2 = canvasRefLogo.current;
    if (!canvas2) return;
    img_logo.src = "https://i.ibb.co/YBzfQgsL/aolf-logo-1.png"; // Ensure the image is inside the "public" folder
    img_logo.crossOrigin = "anonymous"; // Allows CORS images
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setUploadedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'satsang-invite.png';
    if (canvas) {
      link.href = canvas.toDataURL('image/png');
    }
    link.click();
  };

  const drawOverlay = (ctx: { clearRect: (x: number, y: number, w: number, h: number) => void; drawImage: (arg0: HTMLImageElement, arg1: number, arg2: number, arg3: number, arg4: number) => void; save: () => void; beginPath: () => void; arc: (arg0: number, arg1: number, arg2: number, arg3: number, arg4: number) => void; closePath: () => void; clip: () => void; restore: () => void; }, baseImage: HTMLImageElement) => {
    if (canvasRef.current === null) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(baseImage, 0, 0, 500, 500);

    if (uploadedImage) {
      const overlayImage = document.createElement('img');
      overlayImage.src = uploadedImage;
      overlayImage.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          placeholderX + placeholderWidth / 2,
          placeholderY + placeholderHeight / 2,
          placeholderWidth / 2,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(overlayImage, placeholderX, placeholderY, placeholderWidth, placeholderHeight);
        ctx.restore();
      };
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Image src="https://i.ibb.co/YBzfQgsL/aolf-logo-1.png" width={200} height={50} alt="123" className="border rounded-lg" />
      <canvas ref={canvasRef} width={500} height={500} className="border rounded-lg" />
      <input placeholder="Upload Image" type="file" accept="image/*" onChange={handleImageUpload} />
      <Button onClick={handleDownload}>Download Image</Button>
    </div>
  );
}