import Image from "next/image";
import { useState, useRef } from "react";
import im1 from '../../satsang-g.jpeg';

export default function ImageFramer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDownload = () => {
    console.log('hi');
    const canvas = canvasRef.current;
    console.log(canvas);
    if (canvas && imageSrc) {
      const ctx = canvas.getContext('2d');
      console.log('hello');
      if (ctx) {
        const baseImage = new window.Image();
        baseImage.src = im1.src;
        baseImage.onload = () => {
          canvas.width = baseImage.width;
          canvas.height = baseImage.height;
          ctx.drawImage(baseImage, 0, 0);
          const overlayImage = new window.Image();
          overlayImage.src = imageSrc;
          overlayImage.onload = () => {
            ctx.drawImage(overlayImage, 0, 0, baseImage.width / 4, baseImage.height / 4);
            const link = document.createElement('a');
            link.download = 'result.png';
            link.href = canvas.toDataURL();
            link.click();
          };
        };
      }
    }
  };
  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-100">
      <h1 className="text-5xl font-extrabold mb-10 text-blue-600">Image Framer</h1>
      <Image src={im1} alt="Sample Image" className="mb-8" />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {imageSrc && (
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download Resultant Image
        </button>
      )}
            <canvas ref={canvasRef} className="hidden"></canvas>

    </div>
  );
}
