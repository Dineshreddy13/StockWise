import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/StocksPage";
import WatchList from "./pages/WatchList";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./auth/ProtectedRoute"; // ✅ import this


function App() {
  return (
    <Router>
      <Routes>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stocks/:symbol" element={<StockPage />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Route>
        </Route>

        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
