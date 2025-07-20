import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PrivacyAccordion = () => {
  const [open, setOpen] = useState(false);

  const items = [
    "Quyền dữ liệu và lựa chọn về quyền riêng tư",
    "Tìm hiểu về dữ liệu của tôi",
    "Trung tâm an toàn và quyền riêng tư",
  ];

  return (
    <div className="bg-[#1f1f1f] text-white rounded-lg overflow-hidden border border-gray-700">
      <div
        className="flex items-center justify-between p-4 bg-[#2a2a2a] hover:bg-[#333] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 font-semibold text-lg">
          🔒 An toàn và quyền riêng tư
        </div>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      {open && (
        <div className="divide-y divide-gray-700">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-4 hover:bg-[#333] cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrivacyAccordion;
