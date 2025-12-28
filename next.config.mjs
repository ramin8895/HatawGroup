import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin(); // به صورت پیش‌فرض دنبال i18n/request.ts می‌گردد
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
    output: "standalone",

};

export default withNextIntl(nextConfig);