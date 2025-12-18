
import "./globals.css";
import "../public/styles/retro-comic-light.css";
import StructuredData from "@/components/StructuredData";

export const metadata = {
  title: "Judy's Jokes for Kids",
  description: "Clean, hilarious jokes for children of all ages",
};

export default function RootLayout({ children }) {
  const websiteData = {
    name: "Judy's Jokes for Kids",
    url: "https://saintjudy.vercel.app",
    description: "Clean, funny jokes for children of all ages. Browse by category and find the perfect joke!"
  };

  return (
    <html lang="en">
      <head>
        <StructuredData type="website" data={websiteData} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
