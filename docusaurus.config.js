// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'SIA API - Documentation',
    tagline: 'Documentation du système de compte et du système de réservation de l\'exposition SIA - Entre deux rives',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: 'https://docs.sia-exposition.fr',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'leolesimple', // Usually your GitHub org/user name.
    projectName: 'sia-docs', // Usually your repo name.

    onBrokenLinks: 'throw',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'fr',
        locales: ['fr'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/logosiatranspa.png',
            colorMode: {
                respectPrefersColorScheme: true,
            },
            navbar: {
                title: 'SIA API',
                logo: {
                    alt: '',
                    src: 'img/logosiatranspa.png',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Docs',
                    }
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Documentation',
                        items: [
                            {
                                label: 'Authentification',
                                to: '/docs/authentification',
                            },
                            {
                                label: 'Billetterie',
                                to: '/docs/billetterie',
                            },
                            {
                                label: 'SAV',
                                to: '/docs/sav',
                            },
                        ],
                    },
                    {
                        title: 'Autour de l\'API',
                        items: [
                            {
                                label: 'SIA - Entre deux rives',
                                href: 'https://sia-exposition.fr',
                            },
                            {
                                label: 'Kaleido (Agence)',
                                href: 'https://kaleido-agency.fr',
                            },
                            {
                                label: 'Réservation en ligne',
                                href: 'https://sia-exposition.fr/billetterie',
                            },
                        ],
                    },
                    {
                        title: 'Équipe',
                        items: [
                            {
                                label: 'Léo Lesimple',
                                href: 'https://leolesimple.fr',
                            },
                            {
                                label: 'Alex Fiol',
                                href: 'https://acfiol.fr',
                            },
                            {
                                label: 'Mariam Sarr',
                                href: 'https://mariamsarr.fr/',
                            },
                            {
                                label: 'Thelma Tabury',
                                href: 'https://thelmatabury.fr',
                            },
                            {
                                label: 'Inès Tahi',
                                href: 'https://www.linkedin.com/in/ines-tahi-4a062a348/',
                            },
                            {
                                label: 'Mariam Zoukrou',
                                href: 'https://www.linkedin.com/in/mariam-zoukrou-68863b34b/',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
