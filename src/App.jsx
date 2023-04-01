import './App.css'

import { BrowserRouter } from "react-router-dom";

import Router from './components/Router/Router'
import TopNav from './components/navbar/TopNav';

function App() {

  return (
    <>
      <div className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden'>
        <div className="absolute overflow-hidden top-0 left-0 right-0 bottom-0 transform scale-150 details_background" style={{background:`url("https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-zoom-virtual-background-_Tcjok-d9b4.jpg")`}}></div>
      </div>
    <div className="App h-screen w-screen z-10 text-title_color bg-bg_color overflow-scroll scrollbar-hide">
      <BrowserRouter>
        <TopNav/>
        <Router/>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
