// ------------------ React Imports ----------------//
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

//-------------- Component Imports -----------//

import LoadingScreen from '../Loading Screen/LoadingScreen';

function Stream() {

  //---------- Navigatation hooks ---------//
  const location = useLocation();
  const history = useNavigate();

  //---------- state for episode id ----------//
  const [episode_id, setEpisodeId] = useState(location.state.episode_id);

  //---------- list of episodes ----------//
  const episode_list = location.state.episode_list;

  //---------- extracting the current episode from episode id ----------//
  const no_hyphen = location.state.episode_id.split('-');
  const current_episode = no_hyphen[no_hyphen.length - 1];

  //----------- background image url ------------//
  const bg_image = location.state.image;

  //------------ Reference of quality of video present ----------//
  const hdQuality = useRef(null);
  const sdQuality = useRef(null);
  const lowQuality = useRef(null);

  //------------- React video player reference ----------------//
  const videoPlayer = useRef(null);

  //--------------- State for the video url ----------------// 
  const [videoSources, setVideoSources] = useState();
  const [selectedQuality, setSelectedQuality] = useState('720');

  //---------------- url for fixing CORS policy ---------------//
  const cors_handle_url = "https://corsanywhere.herokuapp.com/";

  //----------------- url for detail of the anime episode ---------------//
  const url = `https://api.consumet.org/anime/gogoanime/watch/${episode_id}`

  //-------------- function to handle change episode -------------//
  const goToEpisode = (item) => {
    const episode_id = item.id;
    setEpisodeId(episode_id);
    history(`/watch/${episode_id}`, {
      state : {episode_id, episode_list, bg_image}
    })
  };


//------------- Function to get the video url --------------//
  async function getVideo () {
    const result = (await axios.get(url)).data.sources;
    hdQuality.current = result.filter(vid => vid.quality === '1080p');
    sdQuality.current = result.filter(vid => vid.quality === '720p');
    lowQuality.current = result.filter(vid => vid.quality === '480p');
    let sources = [];
    if(hdQuality.current[0]) sources.push({ src: `${cors_handle_url + hdQuality.current[0].url}`,
    label: '1080p',
    res: '1080'});
    if(sdQuality.current[0]) sources.push({
      src: `${cors_handle_url + sdQuality.current[0].url}`,
      label: '720p',
      res: '720'
    });
    if(lowQuality.current[0]) sources.push({src: `${cors_handle_url + lowQuality.current[0].url}`,
    label: '480p',
    res: '480'});
    setVideoSources(sources);
  }

  //----------------- updating video State on change of episode -------------//

  useEffect(()=>{
      getVideo();
  },[episode_id])

  return (
    <>
      {videoSources !== undefined && episode_id !== undefined ? (
        <>
        <div className=' p-5 pl-10 truncate lg:p-5 lg:pl-10  uppercase text-text_color font-semibold bg-black'><span className='dot'></span>{(episode_id).split('-').join(' ')}</div>
            <div className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden'>
              <div className="absolute overflow-hidden top-0 left-0 right-0 bottom-0 transform scale-150 details_background" style={{background:`url(${bg_image})`}}></div>
            </div>
          <div className='p-5 flex flex-col-reverse overflow-hidden w-screen relative scrollbar-hide h-auto lg:p-10 lg:flex-row lg:h-5/6'>
            <div className='bg-black cursor-pointer mt-2 w-full overflow-scroll scrollbar-hide pb-2 h-72 lg:mt-0 lg:w-1/4 lg:h-full'>
              <p
                className="green text-text_color p-2"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "800",
                  textTransform: "capitalize",
                }}
              >
                List Of episodes:
              </p>
              <div className='relative m-0'>
              {episode_list.map((items, index) =>(
              <ul key={index}>
                <div
                  className={(index === current_episode-1 ? ("bg-grey_list_color text-text_color border border-l-4 border-text_color"): (index % 2 === 0 ? ("bg-black_list_color") : ("bg-grey_list_color")))+" p-3"}>
                  <li onClick={() => goToEpisode(items)}>Episode : {items.number}</li>
                </div>
              </ul>
              
            ))}</div>
        </div>
        <div className='player-wrapper relative bg-black w-full'>
          <ReactPlayer
            width='100%'
            height='100%'
            controls
            className="react-player"
            playing
            url={videoSources && videoSources.filter((source) => source.res === selectedQuality)[0].src}
            ref={videoPlayer}
            />
          </div>
      </div></>) : (<LoadingScreen/>)}
    </>
  )
}

export default Stream