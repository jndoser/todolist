import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import GlobalStyleProvider from "./providers/GlobalStyleProvider";
import { ClerkProvider, auth } from "@clerk/nextjs";
import ContextProvider from "./providers/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AntdRegistry>
            {userId ? (
              <ContextProvider>
                <GlobalStyleProvider>{children}</GlobalStyleProvider>
              </ContextProvider>
            ) : (
              <div className="h-screen">{children}</div>
            )}
          </AntdRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
