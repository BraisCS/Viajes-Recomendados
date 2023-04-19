import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RecommendationPage } from "./pages/RecomendationPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { EditUserPage } from "./pages/EditUserPage";
import { UserProfilePage } from "./pages/UserProfilePage/UserProfilePage";
import { NewRecommendationPage } from "./pages/NewRecommendationPage/NewRecommendationPage";
import { AllRecommendationsPage } from "./pages/AllRecommendationsPage/AllRecommendationsPage";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <main>
      {/* Mostrar el encabezado solo si no estamos en la página de registro ni de inicio de sesión */}
      {!isLoginPage && !isRegisterPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendations/:id" element={<RecommendationPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/users/:id" element={<EditUserPage />} />
        <Route path="/user/:idUser" element={<UserProfilePage />} />
        <Route path="/newrecommendation" element={<NewRecommendationPage />} />
        <Route
          path="/allrecommendations"
          element={<AllRecommendationsPage />}
        />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
