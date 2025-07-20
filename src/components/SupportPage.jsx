import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { texts } from "../constants/texts";
import SupportAccordion from "./SupportAccordion";
import AccountAccordion from "./AccountAccordion";
import PremiumAccordion from "./PremiumAccordion"; 
import FeaturesAccordion from "./FeaturesAccordion";
import DevicesAccordion from "./DevicesAccordion"; 
import PrivacyAccordion from "./PrivacyAccordion"; 


const SupportPage = () => {
  const { language } = useLanguage();
  const t = texts[language] || texts.vi;

  const filteredSections = t.supportSections.filter(
  (s) =>
    s !== "Thanh toán và hóa đơn" &&
    s !== "Quản lý tài khoản của bạn" &&
    s !== "Các gói Premium"&&
    s !== "Tính năng trong ứng dụng"&&
    s !== "Thiết bị và khắc phục sự cố"&&
    s !== "An toàn và quyền riêng tư"
);

  return (
    <div className="text-white bg-black min-h-screen p-8 pt-24">
      <h1 className="text-4xl font-bold mb-4">{t.supportTitle}</h1>
      <p className="mb-6 text-lg">{t.supportSubtitle}</p>

      <input
        type="text"
        placeholder={t.supportPlaceholder}
        className="w-full max-w-md p-2 rounded bg-gray-800 border border-gray-600 text-white"
      />

      <div className="mt-8 space-y-4">
        <SupportAccordion />
        <AccountAccordion />
        <PremiumAccordion />
        <FeaturesAccordion />
         <DevicesAccordion />
          <PrivacyAccordion />

        {filteredSections.map((title, i) => (
          <div
            key={i}
            className="bg-[#1f1f1f] p-4 rounded hover:bg-[#2a2a2a] transition cursor-pointer"
          >
            <span className="font-medium">{title}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#2b2b2b] p-6 rounded">
        <h2 className="text-xl font-semibold mb-2">{t.supportQuickHelp}</h2>
        <ul className="space-y-2 list-disc pl-5">
          {t.supportQuickList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SupportPage;
