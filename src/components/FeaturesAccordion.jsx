import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FeaturesAccordion = () => {
  const [open, setOpen] = useState(false);

  const items = [
    "Bắt đầu",
    "Cài đặt ứng dụng",
    "Xử lý sự cố",
    "Playlist",
    "Tính năng",
    "Các tính năng mạng xã hội",
    "Podcast",
    "Sách nói",
    "Sự kiện trực tiếp",
    "Quyền riêng tư nghe nhạc",
  ];

  return (
    <div className="bg-[#1f1f1f] text-white rounded-lg overflow-hidden border border-gray-700">
      <div
        className="flex items-center justify-between p-4 bg-[#2a2a2a] hover:bg-[#333] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 font-semibold text-lg">
          🧩 Tính năng trong ứng dụng
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

export default FeaturesAccordion;
