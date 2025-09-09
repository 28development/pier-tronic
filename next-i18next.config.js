/** @type {import('next-i18next').UserConfig} */
const config = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'de', 'nl'],
        localeDetection: true,
    },
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'en',
    reloadOnPrerender: process.env.NODE_ENV === 'development',
};

module.exports = config;


