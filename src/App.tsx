import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Onboarding from "./pages/Onboarding/Onboarding";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Onboarding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}