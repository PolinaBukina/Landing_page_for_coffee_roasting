import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Onest } from 'next/font/google';

import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
});

/** Адрес сайта для превью ссылок: на Vercel берём из окружения, локально — localhost. */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

const title = 'Кварта — обжарка кофе в Минске';
const description =
  'Обжариваем партиями по 5 кг каждый четверг и привозим в пятницу. Зерно у вас на 1–3 день после обжарки. Подписка от 54 BYN в месяц.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'ru_BY',
    siteName: 'Кварта',
    images: [{ url: '/images/hero.jpg', alt: 'Свежая обжарка «Кварта»' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/hero.jpg'] },
};

export const viewport: Viewport = {
  themeColor: '#f6eee2',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${onest.variable}`}>
      <body>
        <a className="skip" href="#zayavka">
          Перейти к заявке
        </a>
        {children}
      </body>
    </html>
  );
}
