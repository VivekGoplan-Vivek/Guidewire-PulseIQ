import { Poppins } from "next/font/google";
import "./globals.css";
// import ChatbotIcon from "./components/Chatbot/ChatbotIcon";

const PoppinsFont = Poppins({weight: ['100','200','300','400','500','600', '700'], subsets: ["latin"] });

export const metadata = {
  title: "Pulse IQ",
  description: "Real Time pulse check of a Program",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

{/* <meta name="google-adsense-account" content="ca-pub-1999142928444728"/> */}
         {/* <link rel="preconnect" href="https://fonts.googleapis.com"/> */}
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/> */}
          {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/> */}
      </head>
      <body >
        {children}
        {/* <ChatbotIcon /> */}
      </body>
    </html>
  );
}
