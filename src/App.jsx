// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🌱 Seeder
import Seeder from "./components/Seeder";
import PublicProfile from "./pages/PublicProfile"; // yangi sahifa

// <Routes> ichida:
<Route path="/public/:username" element={<PublicProfile />} />


// 📌 Asosiy sahifalar
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Question from "./Question";
import Profile from "./Profile";
import Search from "./pages/Search";
import PublicProfile from "./PublicProfile";
import About from "./pages/About"; // 🆕 About sahifa qo‘shildi

// 🔐 Kiberxavfsizlik
import CyberIntro from "./CyberIntro";
import CyberForm from "./CyberForm";
import CyberResult from "./CyberResult";
import CyberProfile from "./profiles/CyberProfile";


// 📐 Matematika
import MathIntro from "./pages/MathIntro";
import MathForm from "./forms/MathForm";
import MathResult from "./pages/MathResult";
import MathProfile from "./profiles/MathProfile";

// 🧪 Kimyo
import ChemistryIntro from "./pages/ChemistryIntro";
import ChemistryForm from "./forms/ChemistryForm";
import ChemistryResult from "./pages/ChemistryResult";
import ChemistryProfile from "./profiles/ChemistryProfile";
import ChemistryTeacher from "./pages/ChemistryTeacher";

// 🧬 Biologiya
import BiologyIntro from "./pages/BiologyIntro";
import BiologyForm from "./forms/BiologyForm";
import BiologyResult from "./pages/BiologyResult";
import BiologyProfile from "./profiles/BiologyProfile";
import BiologyTeacher from "./pages/BiologyTeacher";

// 📘 Tarix
import HistoryIntro from "./pages/HistoryIntro";
import HistoryForm from "./forms/HistoryForm";
import HistoryResult from "./pages/HistoryResult";
import HistoryProfile from "./profiles/HistoryProfile";
import HistoryTeacher from "./pages/HistoryTeacher";

// 🌍 Geografiya
import GeographyIntro from "./pages/GeographyIntro";
import GeographyForm from "./forms/GeographyForm";
import GeographyResult from "./pages/GeographyResult";
import GeographyProfile from "./profiles/GeographyProfile";
import GeographyTeacher from "./pages/GeographyTeacher";

// 📚 Ona Tili
import UzbekIntro from "./pages/OnaTiliIntro";
import UzbekForm from "./forms/OnaTiliForm";
import UzbekResult from "./pages/OnaTiliResult";
import UzbekProfile from "./profiles/OnaTiliProfile";
import OnaTiliteacher from "./pages/OnaTiliteacher";

// 🧠 Mantiq
import LogicIntro from "./pages/LogicIntro";
import LogicForm from "./forms/LogicForm";
import LogicResult from "./pages/LogicResult";
import LogicProfile from "./profiles/LogicProfile";

// 📖 Ingliz Tili
import EnglishIntro from "./pages/EnglishIntro";
import EnglishForm from "./forms/EnglishForm";
import EnglishResult from "./pages/EnglishResult";
import EnglishProfile from "./profiles/EnglishProfile";
import EnglishTeacher from "./pages/EnglishTeacher";

// 💻 Informatika
import InformaticsIntro from "./pages/InformaticsIntro";
import InformaticsForm from "./forms/InformaticsForm";
import InformaticsResult from "./pages/InformaticsResult";
import InformaticsProfile from "./profiles/InformaticsProfile";
import InformaticsTeacher from "./pages/InformaticsTeacher";

// 👨‍⚕️ Shifokor
import Doctor from "./pages/Doctor";

// 👨‍💻 Dasturchi
import Developer from "./pages/Developer";

// ⚖️ Yurist
import Lawyer from "./pages/Lawyer";

// 🎥 Bloger (asosiy sahifalar)
import BloggerIntro from "./pages/BloggerIntro";
import BloggerForm from "./forms/BloggerForm";
import BloggerFollowers from "./forms/BloggerFollowers";
import BloggerResult from "./pages/BloggerResult";
import BloggerProfile from "./profiles/BloggerProfile";

// 🎥 Bloger profillar
import BloggerProfile1Low from "./profiles/blogger/BloggerProfile1Low";
import BloggerProfile1Mid from "./profiles/blogger/BloggerProfile1Mid";
import BloggerProfile1High from "./profiles/blogger/BloggerProfile1High";
import BloggerProfile2Low from "./profiles/blogger/BloggerProfile2Low";
import BloggerProfile2Mid from "./profiles/blogger/BloggerProfile2Mid";
import BloggerProfile2High from "./profiles/blogger/BloggerProfile2High";
import BloggerProfile3Low from "./profiles/blogger/BloggerProfile3Low";
import BloggerProfile3Mid from "./profiles/blogger/BloggerProfile3Mid";
import BloggerProfile3High from "./profiles/blogger/BloggerProfile3High";

// 🎮 PUBG
import PUBGForm from "./forms/PUBGForm";

// 🧾 Basic Profil
import BasicProfile from "./profiles/BasicProfile";

// 🧭 CareerPath
import CareerPath from "./pages/CareerPath";

// 🎯 Level Selection va Level Details
import LevelSelection from "./pages/LevelSelection";
import LevelDetails from "./pages/LevelDetails";

// 🏫 Universitetlar
import Universities from "./pages/Universities";

export default function App() {
  const storedUser = JSON.parse(localStorage.getItem("level99_user")) || {};

  return (
    <BrowserRouter>
      <Seeder />
      <Routes>
        {/* 📌 Asosiy sahifalar */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/question" element={<Question />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/public/:username" element={<PublicProfile />} />
        <Route path="/about" element={<About />} /> {/* 🆕 About sahifa */}

        {/* 🔐 Kiberxavfsizlik */}
        <Route path="/cyber-intro" element={<CyberIntro />} />
        <Route path="/cyber" element={<CyberForm />} />
        <Route path="/cyber-result" element={<CyberResult />} />
        <Route path="/profiles/CyberProfile" element={<CyberProfile />} />



        {/* 📐 Matematika */}
        <Route path="/math-intro" element={<MathIntro />} />
        <Route path="/math" element={<MathForm />} />
        <Route path="/math-result" element={<MathResult />} />
        <Route path="/profiles/math" element={<MathProfile />} />

        {/* 🧪 Kimyo */}
        <Route path="/chemistry-intro" element={<ChemistryIntro />} />
        <Route path="/chemistry" element={<ChemistryForm />} />
        <Route path="/chemistry-result" element={<ChemistryResult />} />
        <Route path="/profiles/chemistry" element={<ChemistryProfile />} />
        <Route path="/chemistry-teacher" element={<ChemistryTeacher />} />

        {/* 🧬 Biologiya */}
        <Route path="/biology-intro" element={<BiologyIntro />} />
        <Route path="/biology" element={<BiologyForm />} />
        <Route path="/biology-result" element={<BiologyResult />} />
        <Route path="/profiles/biology" element={<BiologyProfile />} />
        <Route path="/biology-teacher" element={<BiologyTeacher />} />

        {/* 📘 Tarix */}
        <Route path="/history-intro" element={<HistoryIntro />} />
        <Route path="/history" element={<HistoryForm />} />
        <Route path="/history-result" element={<HistoryResult />} />
        <Route path="/profiles/history" element={<HistoryProfile />} />
        <Route path="/history-teacher" element={<HistoryTeacher />} />

        {/* 🌍 Geografiya */}
        <Route path="/geography-intro" element={<GeographyIntro />} />
        <Route path="/geography" element={<GeographyForm />} />
        <Route path="/geography-result" element={<GeographyResult />} />
        <Route path="/profiles/geography" element={<GeographyProfile />} />
        <Route path="/geography-teacher" element={<GeographyTeacher />} />

        {/* 📚 Ona Tili */}
        <Route path="/uzbek-intro" element={<UzbekIntro />} />
        <Route path="/uzbek" element={<UzbekForm />} />
        <Route path="/uzbek-result" element={<UzbekResult />} />
        <Route path="/profiles/uzbek" element={<UzbekProfile />} />
        <Route path="/onatili-teacher" element={<OnaTiliteacher />} />

        {/* 🧠 Mantiq */}
        <Route path="/logic-intro" element={<LogicIntro />} />
        <Route path="/logic" element={<LogicForm />} />
        <Route path="/logic-result" element={<LogicResult />} />
        <Route path="/profiles/logic" element={<LogicProfile />} />

        {/* 📖 Ingliz Tili */}
        <Route path="/english-intro" element={<EnglishIntro />} />
        <Route path="/english" element={<EnglishForm />} />
        <Route path="/english-result" element={<EnglishResult />} />
        <Route path="/profiles/english" element={<EnglishProfile />} />
        <Route path="/english-teacher" element={<EnglishTeacher />} />

        {/* 💻 Informatika */}
        <Route path="/informatics-intro" element={<InformaticsIntro />} />
        <Route path="/informatics" element={<InformaticsForm />} />
        <Route path="/informatics-result" element={<InformaticsResult />} />
        <Route path="/profiles/informatics" element={<InformaticsProfile />} />
        <Route path="/informatics-teacher" element={<InformaticsTeacher />} />

        {/* 👨‍⚕️ Shifokor */}
        <Route path="/doctor" element={<Doctor />} />

        {/* 👨‍💻 Dasturchi */}
        <Route path="/developer" element={<Developer />} />

        {/* ⚖️ Yurist */}
        <Route path="/lawyer" element={<Lawyer />} />

        {/* 🎥 Bloger sahifalar */}
        <Route path="/blogger-intro" element={<BloggerIntro />} />
        <Route path="/blogger" element={<BloggerForm />} />
        <Route path="/blogger-followers" element={<BloggerFollowers />} />
        <Route path="/blogger-result" element={<BloggerResult />} />
        <Route
          path="/profiles/blogger"
          element={<BloggerProfile user={storedUser} />}
        />

        {/* 🎥 Bloger daraja marshrutlar */}
        <Route
          path="/profiles/blogger-1-low"
          element={<BloggerProfile1Low user={storedUser} />}
        />
        <Route
          path="/profiles/blogger-1-mid"
          element={<BloggerProfile1Mid user={storedUser} />}
        />
        <Route
          path="/profiles/blogger-1-high"
          element={<BloggerProfile1High user={storedUser} />}
        />
        <Route
          path="/profiles/blogger-2-low"
          element={<BloggerProfile2Low user={storedUser} />}
        />
        <Route
          path="/profiles/blogger-2-mid"
          element={<BloggerProfile2Mid user={storedUser} />}
        />
        <Route
          path="/profiles/blogger-2-high"
          element={<BloggerProfile2High user={storedUser} />}
        />
        <Route
          path="/profiles/blogger-3-low"
          element={<BloggerProfile3Low user={storedUser} />}
        />
        <Route
          path="/profiles/blogger-3-mid"
          element={<BloggerProfile3Mid user={storedUser} />}
        />
        <Route
          path="/profiles/blogger-3-high"
          element={<BloggerProfile3High user={storedUser} />}
        />

        {/* 🎮 PUBG */}
        <Route path="/pubg" element={<PUBGForm />} />

        {/* 🧾 Basic Profil */}
        <Route path="/profiles/basic" element={<BasicProfile />} />

        {/* 🧭 CareerPath */}
        <Route path="/career-path" element={<CareerPath />} />

        {/* 🎯 Level Selection */}
        <Route path="/level-selection" element={<LevelSelection />} />

        {/* 🔍 Level Details */}
        <Route path="/level-details" element={<LevelDetails />} />

        {/* 🏫 Universitetlar */}
        <Route path="/universities" element={<Universities />} />
      </Routes>
    </BrowserRouter>
  );
}
