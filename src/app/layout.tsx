import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rabbit hole",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider loginUrl="/api/auth/login" profileUrl="/api/auth/me">
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
