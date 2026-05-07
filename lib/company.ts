export const COMPANY = {
  name: {
    en: "Di Corporations",
    ko: "주식회사 디아이코퍼레이션",
  },
  acronymMeaning: "Digital Innovation",
  registrationNumber: "268-87-03171",
  foundedAt: "2025-11-09",
  address: {
    en: "B-439, Songdo Centum Hive, 30-6 Songdo-dong, Yeonsu-gu, Incheon 22007, Republic of Korea",
    ko: "(22007) 인천광역시 연수구 송도동 30-6 송도센텀하이브 B동 439호",
  },
  email: "manager@dicorporations.com",
  domain: "dicorporations.com",
  url: "https://dicorporations.com",
} as const;

export type Company = typeof COMPANY;
