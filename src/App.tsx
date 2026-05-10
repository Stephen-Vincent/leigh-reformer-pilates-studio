import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { BookingModalProvider } from "./components/shared/BookingModal";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";

export default function App() {
  return (
    <BrowserRouter>
      <BookingModalProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
        <Analytics />
      </BookingModalProvider>
    </BrowserRouter>
  );
}
