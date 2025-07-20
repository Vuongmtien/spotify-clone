import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SupportAccordion = () => {
  const [openMain, setOpenMain] = useState(false);

  const topics = [
    "Chủ đề đề xuất",
    "Quản lý thanh toán",
    "Phương thức thanh toán",
    "Trợ giúp về tính phí",
  ];

  return (
    <div className="bg-[#1f1f1f] text-white rounded-lg overflow-hidden border border-gray-700">
      <div
        className="flex items-center justify-between p-4 bg-[#2a2a2a] hover:bg-[#333] cursor-pointer"
        onClick={() => setOpenMain(!openMain)}
      >
        <div className="flex items-center gap-2 font-semibold text-lg">
          🧾 Thanh toán và hóa đơn
        </div>
        {openMain ? <ChevronUp /> : <ChevronDown />}
      </div>

      {openMain && (
        <div className="divide-y divide-gray-700">
          {topics.map((item, idx) => (
            <div
              key={idx}
              className="p-4 hover:bg-[#333] cursor-pointer text-white flex justify-between items-center"
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

export default SupportAccordion;
