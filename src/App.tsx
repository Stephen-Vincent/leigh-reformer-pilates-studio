import { Analytics } from "@vercel/analytics/react";
import { BookingModalProvider } from "./components/shared/BookingModal";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BookingModalProvider>
      <HomePage />
      <Analytics />
    </BookingModalProvider>
  );
}
