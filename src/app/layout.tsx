// app/layout.tsx (RootLayout untuk halaman utama)
import { Nav } from "@/components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Roboto } from "next/font/google";
import Provider from "@/lib/Provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ['latin'],
  weight: "400"
});

export const metadata = {
  title: "Main Site",
  description: "Welcome to the main site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Nav />
          <Provider>
            {children}
            <Toaster />
          </Provider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
