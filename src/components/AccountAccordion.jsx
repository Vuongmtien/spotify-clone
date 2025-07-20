import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const AccountAccordion = () => {
  const [open, setOpen] = useState(false);

  const items = [
    "Đang đăng nhập",
    "Trợ giúp về hồ sơ",
    "Cài đặt tài khoản",
    "Bảo mật",
  ];

  return (
    <div className="bg-[#1f1f1f] text-white rounded-lg overflow-hidden border border-gray-700">
      <div
        className="flex items-center justify-between p-4 bg-[#2a2a2a] hover:bg-[#333] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 font-semibold text-lg">
          🧑‍💼 Quản lý tài khoản của bạn
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

export default AccountAccordion;
