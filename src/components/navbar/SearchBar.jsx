import React, { useEffect, useRef, useState } from "react";
import SearchItems from "./SearchItems";
import search from '../../assets/img/search.png'
import axios from "axios";



const SearchBar = () => {
  const toggle_ref = useRef(null);
  const content_ref = useRef(null);
  const input_ref = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleOnChange = async (e) => {
    const searchWord = e.target.value;
    const url = `https://api.consumet.org/anime/gogoanime/${searchWord}`;
    const results = await axios.get(url);
    setSearchResults(results.data.results);
  };
  
  const closeSearchResults = () => {
    const searchInputfield = input_ref.current;
    searchInputfield.value = "";
    setSearchResults([]);
  }

  

  // useEffect(()=>{
  //   console.log(searchResults);
  // })

  return (
    <div className="px-3 py-2 lg:w-96 md:w-auto">
      <div className="topnav__search relative bg-white px-2 rounded-lg flex items-center" ref={toggle_ref}>
        
        {/* <img className="" src={search} alt="" /> */}
        <input
         className="p-1 rounded-md text-black flex-grow outline-none"
          type="text"
          placeholder="Search here..."
          onChange={handleOnChange}
          id="search_input"
          ref={input_ref}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 ml-2 cursor-pointer text-black"
          onClick={closeSearchResults}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      {searchResults &&
      (<ul className=" bg-bg_color left-0 shadow-bottom dataResult absolute z-50 top-full max-h-96 rounded-lg overflow-x-auto w-full scrollbar-hide flex flex-col justify-self-center overflow-y-auto" ref={content_ref}>
        
          {searchResults.map((data, key) => (
            <li key={key} onClick={closeSearchResults} className="cursor-pointer">
                <SearchItems Data={data} />
            </li>
            
          ))}
      </ul>)}
      </div>

    </div>
  );
};

export default SearchBar;
