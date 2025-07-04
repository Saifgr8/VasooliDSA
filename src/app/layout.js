import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Providers from "./redux/provider/Provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  console.log(googleClientId);
  if (!googleClientId) {
    console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set.");
    return (
      <html lang="en">
        <body>
          <div>Error: Google Client ID not configured. Check .env.local</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <GoogleOAuthProvider clientId={googleClientId}>
            <NavBar />
            {children}
            <Footer />
          </GoogleOAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
