const plugin = require('tailwindcss/plugin')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: ["./index.html","./src/**/*.{html, js, jsx}"],
  theme: {
    extend: {
      screens: {
        'md-lg': {'min': '824px'},
      },
      colors: {
        bg_color: "#191919",
        bg_color2: "#334756",
        title_color: "#EADEDE",
        transparent_grey: "#000000dd",
        text_color: "#cae962",
        black_list_color: "#414248",
        grey_list_color: "#202125"
      },
      boxShadow: {
        'bottom': '10px 20px 30px 5px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }){
      addUtilities({
        '.scrollbar-hide': {
          /* width */
          "&::-webkit-scrollbar": {
            width: "4px"
          },
        /* Track */
          "&::-webkit-scrollbar-track": {
            background: "#334756"
          },

        /* Handle */
          "&::-webkit-scrollbar-thumb": {
            background: "#cae962"
          },

        /* Handle on hover */
          "::-webkit-scrollbar-thumb:hover": {
              background: "#555"
          },
          "&::-webkit-scrollbar:horizontal": {
            height: '0',
            width: '0',
            display: 'none'
          },
          
          "&::-webkit-scrollbar-thumb:horizontal": {
            display: "none"
          }
        },

        '.notActive': {
          display: 'none'
        },

        '.ellipsis-after-two-lines': {
          height: "60px",
          display: "-webkit-box",
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        ".dot": {
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,.3)',
          display: 'inline-block',
          margin: '3px 6px'
        },

        ".details_background": {
          backgroundRepeat:"no-repeat !important",
          backgroundSize:"cover !important",
          backgroundPosition:"center !important",
          filter:"blur(20px)",
          opacity:".35",
          transform:"scale(1.2)"
        }, 

        ".episodelist": {
            height:"600px"
        }
      })
    })
  ],
}
