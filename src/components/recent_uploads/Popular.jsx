// ------------------ React Imports ----------------//

import React, { useEffect, useRef, useState } from 'react'
import spinner from '../../assets/img/Spinner.gif'
import axios from 'axios';


//------------ Component Imports -----------------//

import Cards from '../cards/Cards';
import { Waypoint } from 'react-waypoint';
import LoadingScreen from '../Loading Screen/LoadingScreen';

function Popular() {

  //--------- State for storing the anime Card details ---------//
    const [data,setData] = useState([]);
  //--------- Page Number reference ------------//
    const page = useRef(1);
    //------------ url for top-airing anime ------------//
    const url = "https://api.consumet.org/anime/gogoanime/top-airing";

    //-------------- fetching data at page mount -----------//
  
    useEffect(() => {
        async function fetch_data() {
          const response = await axios.get(url, {params: { page: page.current}});
          setData(
            [...data, ...response.data.results]
          );
          page.current = page.current + 1;
        }
        if(data[0] === undefined)
          fetch_data();
    }, []);
  
    //-------------- fetching more anime data -----------//
    async function get_more_recent() {
      const response = await axios.get(url, {params : {page: page.current}});
      setData(
        [...data, ...response.data.results]
      );
      page.current = page.current + 1;
    }
  
  return (
    <>
      {data.length !== 0 ? (<div className="h-screen my-5 lg:mx-20 sm:mx-3 flex flex-row flex-wrap justify-items-stretch justify-center">
          {data.map((item, index) => (
            <div className="flex justify-center items-center" key={index}>
              <Cards 
                  thumbnailUrl={item.image}
                  title={item.title}
                  episodeNumber={1}
                  id={item.id}
                  episodeId={item.episodeId}
                  type="Popular"
              />
                {index >= (data.length - 1) && (
                  <>
                    <img className="w-8 h-8 flex relative left-auto right-auto" src={spinner} alt={<p>Loading....</p>}/>
                    <Waypoint onEnter={get_more_recent}/>
                  </>
                )}
              </div>
          ))}
      </div>):(
        <LoadingScreen/>
      )}
    </>
  )
}

export default Popular