// ------------------ React Imports ----------------//

import React from "react";
import { useNavigate } from "react-router-dom";

function SearchItems({ Data }) {
  
  //---------- Navigatation hooks ---------//
  const history = useNavigate();

  //----------------- url for detail of the anime ---------------//

  const url = `https://api.consumet.org/anime/gogoanime/info/${Data.id}`

  //----------------- navigate function for Anime Details Page --------------//

  const gotoAnimeDetails = async () => {
    history(`/anime/${Data.id}`, {
      state: {url},
    });
  };

  
  return (
    <div className="search-items border border-gray-500 flex flex-row items-center m-1 h-24 p-2" onClick={gotoAnimeDetails}>
      {Data && (
        <>
          <img src={Data.image} alt="" className="search-img w-12 h-16 mr-3 object-cover" />
          <div className="searchTitles">
            <div id="main-title" className="text-text_color ellipsis-after-two-lines">{Data.title}</div>
            <div className="text-gray-400">{Data.releaseDate} <span className="dot"></span> <span className="uppercase">{Data.subOrDub}</span></div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchItems;
