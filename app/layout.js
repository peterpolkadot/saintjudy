
import "./globals.css";
import "../public/styles/retro-comic-light.css";

export const metadata = {
  title: "Judy's Jokes",
  description: "Hilarious jokes for kids",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
