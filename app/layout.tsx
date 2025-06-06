import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { getBaseUrl, defaultSeoConfig } from "@/lib/seo-config"

const inter = Inter({ subsets: ["latin"] })

// 获取基础URL
const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: defaultSeoConfig.title,
  description: defaultSeoConfig.description,
  keywords: defaultSeoConfig.keywords,
  generator: 'v0.dev',
  robots: defaultSeoConfig.robots,
  icons: {
    icon: '/sheep-icon.svg',
    shortcut: '/sheep-icon.svg',
    apple: '/sheep-icon.svg',
  },
  // 添加规范URL元数据
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  // 添加OpenGraph元数据
  openGraph: {
    title: defaultSeoConfig.openGraph.title,
    description: defaultSeoConfig.openGraph.description,
    url: baseUrl,
    siteName: defaultSeoConfig.openGraph.site_name,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Crazy Cattle 3D',
      }
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  // 添加Twitter卡片元数据
  twitter: {
    card: 'summary_large_image',
    title: defaultSeoConfig.title,
    description: defaultSeoConfig.description,
    creator: defaultSeoConfig.twitter.handle,
    site: defaultSeoConfig.twitter.site,
    images: [`${baseUrl}/og-image.jpg`],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2660471109682751"
     crossOrigin="anonymous"></script>
        <link rel="icon" href="/sheep-icon.svg" sizes="any" />
        {/* 添加规范URL标签 */}
        <link rel="canonical" href={baseUrl} />
        
        {/* 手动添加meta描述标签，确保长度正确 */}
        <meta 
          name="description" 
          content="Play Crazy Cattle 3D fun free farm simulation. Control cattle, explore worlds, build your farm empire. Enjoy realistic graphics. Download now!" 
        />
        
        {/* 手动添加OpenGraph和Twitter元标签 */}
        <meta property="og:description" content="Play Crazy Cattle 3D fun free farm simulation. Control cattle, explore worlds, build your empire. Download now!" />
        <meta property="twitter:description" content="Play Crazy Cattle 3D fun free farm simulation. Control cattle, explore worlds, build your empire." />
        
        {/* 添加结构化数据 JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'VideoGame',
              name: defaultSeoConfig.title,
              description: defaultSeoConfig.description,
              image: `${baseUrl}/og-image.jpg`,
              url: baseUrl,
              genre: ['Simulation', 'Farming', '3D'],
              applicationCategory: 'Game',
              operatingSystem: ['Windows', 'macOS', 'Linux'],
              author: {
                '@type': 'Organization',
                name: 'Crazy Cattle 3D Team',
                url: baseUrl
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '245'
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false} 
          disableTransitionOnChange
          storageKey="crazy-cattle-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
