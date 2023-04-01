//---------- React Imports ---------//
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay} from "@fortawesome/free-solid-svg-icons"

//-------------- Components Imports -----------//

import LoadingScreen from '../Loading Screen/LoadingScreen';

function Details() {
    //--------------- Navigation Hooks -------------//
    const location = useLocation();
    const history = useNavigate();
    //---------------- Getting the Url for details --------------//
    const url = location.state.url;

    //------------ State for storing Details -------------//
    const [details, setDetails] = useState(null);

    //------------- fetch details for the anime ---------//
    async function getDetails () {
        const results = await axios.get(url);
        setDetails(results.data);
    }

    //----------- Funtion to navigate to stream page ----------//

    function goToWatch() {
        const episode_list = details.episodes;
        const episode_id = details.episodes[0].id;
        const image = details.image;
        history(`/watch/${episode_id}`, {
            state : {episode_id, episode_list, image}
        })
    }

    //--------------- getting details at page mount ------------//

    useEffect(() => {
        getDetails(); 
    },[url])

    return (
        <>
            { details !== null ? (
                <div className="bg-bg_color">
                    <div className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden'>
                        <div className="absolute overflow-hidden top-0 left-0 right-0 bottom-0 transform scale-150 details_background" style={{background:`url(${details.image})`}}></div>
                    </div>
                    <div className="mx-auto py-6 sm:px-6 lg:px-8 relative">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="bg-transparent overflow-hidden shadow-xl sm:rounded-lg">
                                <div className="md:flex ">
                                    <div className=" flex flex-shrink-0 justify-center p-4">
                                        <img
                                            className="h-72 object-cover w-48 rounded-md"
                                            src={details.image}
                                            alt={details.title}
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col items-center lg:items-start">
                                        <p
                                            className="block mt-1 text-3xl mb-2 tracking-wider leading-tight font-medium text-white "
                                        >
                                            {details.title}
                                        </p>
                                        <p>
                                            {details.type}
                                            <span className='dot'></span>
                                            <span className='uppercase'>{details.subOrDub}</span>
                                        </p>
                                        <button className="mt-6 mb-10 bg-text_color hover:scale-110 text-black font-normal py-2 px-4 rounded-full tracking-widest" onClick={goToWatch}>
                                            <FontAwesomeIcon icon={faPlay} className="mr-2"/>
                                            Watch Now
                                        </button>
                                        <p className=" mb-10">{details.description}</p>
                                        <div className='mb-6'>
                                            <p className='text-sm my-4'>
                                                <span className='font-bold text-text_color mr-1'>Released : </span>
                                                {details.releaseDate}
                                            </p>
                                            <p className='text-sm my-4'>
                                                <span className='font-bold text-text_color mr-1'>Status : </span>
                                                {details.status}
                                            </p>
                                            <p className='text-sm my-4'>
                                                <span className='font-bold text-text_color mr-1'>Alternate Titles : </span>
                                                {details.otherName}
                                            </p>
                                            <p>
                                                <span className='font-bold text-text_color mr-1'>Genre : </span>
                                                {details.genres.map((genre, index)=>(
                                                <span key={index} className="uppercase cursor-pointer border hover:border-text_color bg-transparent p-2 rounded-3xl mr-2 tracking-wide text-xs text-gray-200 hover:text-text_color">
                                                    {genre}
                                                </span>))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <LoadingScreen/>
            )}
        </>
    )
}

export default Details