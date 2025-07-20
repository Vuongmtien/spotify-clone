import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const DevicesAccordion = () => {
  const [open, setOpen] = useState(false);

  const items = [
    "Loa",
    "Đồng hồ thông minh",
    "TV",
    "Chơi game",
    "Ô tô",
    "Trợ lý Giọng nói",
  ];

  return (
    <div className="bg-[#1f1f1f] text-white rounded-lg overflow-hidden border border-gray-700">
      <div
        className="flex items-center justify-between p-4 bg-[#2a2a2a] hover:bg-[#333] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 font-semibold text-lg">
          🖥️ Thiết bị và khắc phục sự cố
        </div>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      {open && (
        <div className="divide-y divide-gray-700">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-4 hover:bg-[#333] cursor-pointer flex justify-between items-center"
            >
              {item}
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevicesAccordion;
