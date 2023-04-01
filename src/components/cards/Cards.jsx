//-------------- React Imports -------------//

import React from 'react'
import { useNavigate } from "react-router-dom";

//-------------- Main Functional Component -----------//
function Cards(props) {

  const history = useNavigate();

  //----------- Anime Details Url ------------//
  const url = `https://api.consumet.org/anime/gogoanime/info/${props.id}`

  //----------- Navigate function to Details Page -----------//
  const gotoAnimeDetails = async () => {
    history(`/anime/${props.id}`, {
      state: {url},
    });
  };
  return (
    <div className="video-card relative bg-bg_color2 shadow-bottom flex flex-col hover:scale-110 transform transition items-center duration-300 mb-4 mx-1 w-36 lg:w-44  h-72 rounded-lg  cursor-pointer" onClick={gotoAnimeDetails}>
        <div className="video-thumbnail w-full h-48">
            <img className="w-full h-full  object-cover rounded-lg" src={props.thumbnailUrl} alt={props.title} />
        </div>
        <div className="video-info p-1 h-20 flex flex-col group">
            <div className="video-title text-sm text-text_color font-bold w-32 lg:w-40 ellipsis-after-two-lines group-hover:text-bg_color2">{props.title}</div>
            <div className="episode-number mt-1 text-gray-400 group-hover:text-bg_color2">EP: {props.episodeNumber}<span className='dot'></span>{props.type}</div>
            <div className=" opacity-0 bg-transparent_grey flex justify-center items-center rounded-lg group-hover:opacity-100 duration-100 absolute inset-0 z-10 text-center text-base font-semibold p-2">{props.title+"  EP: "+props.episodeNumber}</div>
        </div>
    </div>
    
  )
}

export default Cards;