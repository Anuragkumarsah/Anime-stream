//-------------- React Imports -------------//
import React from 'react'
import { useState } from 'react';

//---------------- Component Imports ------------//
import SearchBar from './SearchBar'
import header_logo from '../../assets/img/header_logo.png'

function Topnav() {
  
  //------------- State for toggling mobile view -------------//

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  //------------- NavBar elements ----------------//

  const topNavElements = [
    {
      id: 1,
      text: "Home",
      to: "/",
    },
    {
      id: 2,
      text: "Popular",
      to: "/popular",
    },
    {
      id: 3,
      text: "Dub Anime",
      to: "/recent-dubs",
    },
  ]
  
//---------------- Main Functional Component --------------//
  return (
    <div className="topnav z-30 relative shadow-bottom bg-black bg-opacity-25">
      <nav className="bg-bg_color2">

        <div className="w-full mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href='/' className="text-text_color"><img className='object-cover w-32 h-16' src={header_logo} alt="Logo" /></a>
            </div>
            <div className="hidden md-lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <SearchBar/>
                {topNavElements.map((items, key) => (
                <a key={key} href={items.to} className="cursor-pointer underline text-text_color hover:bg-gray-700 hover:text_color px-3 py-2 rounded-md text-xl font-medium">{items.text}</a>
                ))}
              </div>
            </div>
            <div className="-mr-2 flex md-lg:hidden">
              <button onClick={toggleMobileMenu} type="button" className="bg-bg_color inline-flex items-center justify-center p-2 rounded-md text-text_color hover:text-text_color hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                <span className="sr-only">Open main menu</span>
                {/* Heroicon name: menu */}
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Heroicon name: x */}
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`md-lg:hidden ${isMobileMenuOpen ? '' : 'hidden'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <SearchBar />
            {topNavElements.map((items, key) => (
              <a key={key} href={items.to} className="cursor-pointer underline text-text_color px-3 py-2 rounded-md text-xl font-medium flex">{items.text}</a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Topnav