import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Onboarding from "./pages/Onboarding/Onboarding";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Ready from "./pages/Ready/Reday";
import GuardianPassword from "./pages/Guardian/GuardianPassword";
import GuardianHome from "./pages/Guardian/GuardianHome";
import MissingWords from "./pages/Guardian/MissingWords";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ready" element={<Ready />} />
          <Route path="/guardian/password" element={<GuardianPassword />} />
          <Route path="/guardian" element={<GuardianHome />} />
          <Route path="/guardian/missing-words" element={<MissingWords />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
