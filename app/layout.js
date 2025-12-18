
import "./globals.css";
import "../public/styles/retro-comic-light.css";
import StructuredData from "@/components/StructuredData";

export const metadata = {
  title: "Judy's Jokes for Kids",
  description: "Clean, hilarious jokes for kids"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
