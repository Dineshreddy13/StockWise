import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import WatchList from "./pages/WatchList";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/watchlist" element={<WatchList/>} />
        </Route>
      </Routes>
    </Router> 
    </>
  )
}

export default App
