"use client";
import { useEffect, useState } from "react";

const tabs = [
  { id: "female-hindi", label: "स्त्रीलिंग", content: "This is content for Tab 1" },
  { id: "male-hindi", label: "पुल्लिंग", content: "This is content for Tab 2" }
];

export default function TabsComponent({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium focus:outline-none ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
