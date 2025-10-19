import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import WatchList from "./pages/WatchList";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/watchlist" element={<WatchList/>} />
        </Route>
      </Routes>
    </Router> 
    </>
  )
}

export default App
