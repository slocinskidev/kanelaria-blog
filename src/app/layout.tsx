import "./globals.css";

import { Container, Section } from "@/components/craft";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { contentMenu, mainMenu } from "@/lib/menu.config";
import { siteConfig } from "@/lib/site.config";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { Merriweather } from "next/font/google";

import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import { useNavigationConfig } from "./use-navigation-config";

const font = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
});

type MetadataProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata(props: MetadataProps) {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans antialiased", font.variable)}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

const Header = () => {
  const t = useTranslations();

  const navItems = useNavigationConfig();

  return (
    <header className="sticky top-0 z-50 bg-white px-4 shadow-sm md:bg-background md:shadow-none xl:px-10">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <p className="max-w-52 text-sm font-bold uppercase text-primary lg:max-w-none lg:text-xl">
              {t("metadata.title")}
            </p>
            <span className="sr-only">{t("homePage")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="mx-2 hidden md:flex">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  asChild
                  variant="ghost"
                  size="sm"
                  className="font-bold"
                >
                  <Link href={item.path}>{item.label}</Link>
                </Button>
              ))}
            </div>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">{siteConfig.site_name}</h3>
              <Image
                src={Logo}
                alt="Logo"
                className="dark:invert"
                width={42}
                height={26.44}
              ></Image>
            </Link>
            <p>
              <Balancer>{siteConfig.site_description}</Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Website</h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Blog</h5>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <ThemeToggle />
          <p className="text-muted-foreground">
            &copy; <a href="https://9d8.dev">9d8</a>. All rights reserved.
            2025-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
