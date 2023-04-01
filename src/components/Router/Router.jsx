//-------------- React Imports -------------//
import React from "react";
import { Route, Routes } from "react-router-dom";

//---------------- Component Imports ------------//
import Recent from "../recent_uploads/Recent";
import Recent_dubs from "../recent_uploads/Recent_dubs";
import Details from "../Details/Details";
import Stream from "../Stream.jsx/Stream";
import Popular from "../recent_uploads/Popular";
//---------------- Main Functional Component --------------//

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Recent />} />
      <Route path="/recent-dubs" element={<Recent_dubs/>} />
      <Route path="/popular" element={<Popular/>}/>
      <Route path="/watch/:episodeId" element={<Stream />} />
      <Route path="/anime/:animeTitle" element={<Details />}></Route>
    </Routes>
  );
};

export default Router;
