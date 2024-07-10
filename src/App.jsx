import { Route, Routes } from "react-router-dom";
import Navabar from "./Components/Navbar/Navabar";
import Home from "./Pages/Home/Home.jsx";
import Video from './Pages/Video/Video.jsx'
import { useState } from "react";

function App() {

  const[sidebar,setSidebar]=useState(true)

  return (
    <>
      <Navabar setSidebar={setSidebar}/>

      <Routes>
        <Route path="/" element={<Home sidebar={sidebar}/>} />
        <Route path="/video/:categoryId/:videoId" element={<Video/>}/>
      </Routes>
    </>
  );
}

export default App;
