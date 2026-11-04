import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Onboarding from "./pages/Onboarding/Onboarding";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Ready from "./pages/Ready/Reday";
import GuardianPassword from "./pages/Guardian/GuardianPassword";
import GuardianHome from "./pages/Guardian/GuardianHome";
import MissingWords from "./pages/Guardian/MissingWords";
import WeeklyReport from "./pages/Guardian/WeeklyReport";
import ChildHome from "./pages/Child/ChildHome";
import MoyaSelect from "./pages/Child/MoyaSelect";
import HomePreview from "./pages/Child/HomePreview";
import Settings from "./pages/Guardian/Settings";
import ChildProfileEdit from "./pages/Guardian/ChildProfileEdit";
import ChildAdd from "./pages/Guardian/ChildAdd";
import WordNotebook from "./pages/Child/WordNotebook";
import WordCardDetail from "./pages/Child/WordCardDetail";
import WordSong from "./pages/Child/WordSong";
import SongPlayer from "./pages/Child/SongPlayer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ready" element={<Ready />} />
          <Route path="/moya-select" element={<MoyaSelect />} />
          <Route path="/home-preview" element={<HomePreview />} />
          <Route path="/home" element={<ChildHome />} />
          <Route path="/guardian/password" element={<GuardianPassword />} />
          <Route path="/guardian" element={<GuardianHome />} />
          <Route
            path="/guardian/missing-words/:childId"
            element={<MissingWords />}
          />
          <Route path="/guardian/report/:childId" element={<WeeklyReport />} />
          <Route path="/guardian/settings" element={<Settings />} />
          <Route
            path="/guardian/settings/child/:childId"
            element={<ChildProfileEdit />}
          />
          <Route path="/guardian/settings/child/new" element={<ChildAdd />} />
          <Route path="/notebook" element={<WordNotebook />} />
          <Route path="/notebook/:wordId" element={<WordCardDetail />} />
          <Route path="/song" element={<WordSong />} />
          <Route path="/song/:songId" element={<SongPlayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
