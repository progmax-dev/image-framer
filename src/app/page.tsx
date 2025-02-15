"use client";
import ImageFramer from "./image-framer";
import TabsComponent from "./tabs";
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-100">
      <ImageFramer />
    </div>
  );
}
