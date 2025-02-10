import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-blue-950 via-blue-900 to-indigo-950 py-4 text-white mt-2 relative">
      <div className="absolute inset-0 backdrop-blur-md"></div>

      {/* Burbujas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-4 w-4 rounded-full bg-blue-400/10 animate-float top-4 left-[10%]"></div>
        <div className="absolute h-3 w-3 rounded-full bg-blue-400/10 animate-float top-8 left-[20%] [animation-delay:0.5s]"></div>
        <div className="absolute h-5 w-5 rounded-full bg-blue-400/10 animate-float top-6 left-[80%] [animation-delay:1s]"></div>
        <div className="absolute h-6 w-6 rounded-full bg-blue-400/10 animate-float top-2 left-[60%] [animation-delay:1.5s]"></div>
        {/* Más burbujas */}
        <div className="absolute h-4 w-4 rounded-full bg-blue-400/10 animate-float top-10 left-[30%] [animation-delay:2s]"></div>
        <div className="absolute h-3 w-3 rounded-full bg-blue-400/10 animate-float top-12 left-[50%] [animation-delay:2.5s]"></div>
        <div className="absolute h-5 w-5 rounded-full bg-blue-400/10 animate-float top-14 left-[70%] [animation-delay:3s]"></div>
      </div>

      <div className="container mx-auto flex flex-col items-center relative z-10">
        {/* SVG de la dona en el medio */}
        <div className="relative mb-2">
          <svg
            className="relative w-8 sm:w-10 h-8 sm:h-10 text-white transform group-hover:scale-110 transition-transform duration-300"
            width="215px"
            height="215px"
            viewBox="0 0 24.00 24.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff">
            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="#ffffff"
              stroke-width="1.44"></circle>
            <path
              d="M14.5 7L16 5"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
            <path
              opacity="0.5"
              d="M19 7L20 6"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
            <path
              d="M12 5L11 4"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
            <path
              opacity="0.5"
              d="M10.5 7L9.13397 7.36603"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
            <path
              opacity="0.5"
              d="M7 5L6 4"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
            <path
              d="M6.79245 9.14385L6.20722 7.85641"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
            <path
              d="M12.5 22L12.5343 22.7492C12.811 22.7365 13.0582 22.5724 13.1772 22.3222C13.2963 22.0721 13.2677 21.7768 13.103 21.554L12.5 22ZM12.944 19.6276L13.3899 20.2306L12.944 19.6276ZM19.4787 14.7949L19.0327 14.1919L19.4787 14.7949ZM14.6191 18.8552L15.2221 18.4092L15.2221 18.4092L14.6191 18.8552ZM15.3194 16.0052L15.7654 16.6083L15.3194 16.0052ZM18.2495 16.1704L18.8525 15.7244L18.8525 15.7244L18.2495 16.1704ZM21.6265 14.7168L21.14 15.2876C21.3346 15.4534 21.6002 15.5087 21.8447 15.4343C22.0893 15.36 22.2792 15.1662 22.3484 14.9201L21.6265 14.7168ZM18.584 16.6226L17.9809 17.0686C18.1107 17.2441 18.3106 17.3544 18.5283 17.3706C18.746 17.3868 18.9599 17.3073 19.1143 17.153L18.584 16.6226ZM18.6854 16.5212L19.2157 17.0515C19.3871 16.8801 19.4651 16.6365 19.4251 16.3974L18.6854 16.5212ZM14.6191 19.291L14.3938 20.0064C14.6605 20.0904 14.9517 20.019 15.1494 19.8213L14.6191 19.291ZM14.8044 19.1057L15.3347 19.6361C15.5973 19.3735 15.6282 18.9583 15.4074 18.6598L14.8044 19.1057ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM12 2.75C17.1086 2.75 21.25 6.89137 21.25 12H22.75C22.75 6.06294 17.9371 1.25 12 1.25V2.75ZM13.103 21.554C12.8699 21.2389 12.9028 20.5909 13.3899 20.2306L12.498 19.0246C11.3811 19.8506 11.1449 21.429 11.897 22.446L13.103 21.554ZM15.2221 18.4092C14.9266 18.0097 14.9862 17.1845 15.7654 16.6083L14.8735 15.4022C13.6476 16.3088 13.0801 18.0355 14.0161 19.3011L15.2221 18.4092ZM15.7654 16.6083C16.5445 16.0321 17.351 16.2168 17.6465 16.6163L18.8525 15.7244C17.9165 14.4588 16.0993 14.4957 14.8735 15.4022L15.7654 16.6083ZM19.9246 15.398C20.4213 15.0306 20.9259 15.105 21.14 15.2876L22.1131 14.146C21.2462 13.4071 19.9508 13.5129 19.0327 14.1919L19.9246 15.398ZM21.25 12C21.25 12.8723 21.1295 13.7151 20.9046 14.5135L22.3484 14.9201C22.6102 13.9907 22.75 13.0111 22.75 12H21.25ZM12.4657 21.2508C12.332 21.2569 12.2017 21.25 12 21.25V22.75C12.1103 22.75 12.3595 22.7572 12.5343 22.7492L12.4657 21.2508ZM17.6465 16.6163L17.9809 17.0686L19.187 16.1767L18.8525 15.7244L17.6465 16.6163ZM19.4251 16.3974C19.3792 16.1229 19.5124 15.7028 19.9246 15.398L19.0327 14.1919C18.2419 14.7768 17.7921 15.7276 17.9457 16.645L19.4251 16.3974ZM19.1143 17.153L19.2157 17.0515L18.1551 15.9909L18.0536 16.0923L19.1143 17.153ZM13.3899 20.2306C13.747 19.9665 14.1352 19.9249 14.3938 20.0064L14.8444 18.5756C14.0774 18.3341 13.1961 18.5083 12.498 19.0246L13.3899 20.2306ZM14.0161 19.3011L14.2014 19.5517L15.4074 18.6598L15.2221 18.4092L14.0161 19.3011ZM15.1494 19.8213L15.3347 19.6361L14.274 18.5754L14.0888 18.7607L15.1494 19.8213Z"
              fill="#ffffff"></path>
            <path
              opacity="0.5"
              d="M2 13C2 13 4.20085 15 6 15C7.21199 15 8.60628 14.0924 9.38725 13.5"
              stroke="#ffffff"
              stroke-width="1.44"></path>
            <path
              opacity="0.5"
              d="M16 15.5C15.5 15 14.4713 14.6389 14 14.2236"
              stroke="#ffffff"
              stroke-width="1.44"></path>
            <path
              opacity="0.5"
              d="M16.6497 8.9766L16.7161 10.3893"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
            <path
              d="M20.6777 10.085L18.9996 11.5629"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
            <path
              d="M5.66477 12.6412L6.5 11.5"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
            <path
              opacity="0.5"
              d="M3.68293 10.3498L3.60427 8.93781"
              stroke="#ffffff"
              stroke-width="1.44"
              stroke-linecap="round"></path>
          </svg>
        </div>

        <div className="flex space-x-10 mb-2">
          <Link href="https://github.com/DiDonna29" target="_blank">
            <FaGithub className="w-6 h-6 hover:text-blue-400 transition-colors transform hover:scale-110" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/john-di-donna-607263295/"
            target="_blank">
            <FaLinkedin className="w-6 h-6 hover:text-blue-400 transition-colors transform hover:scale-110" />
          </Link>
          <Link href="https://facebook.com" target="_blank">
            <FaFacebook className="w-6 h-6 hover:text-blue-400 transition-colors transform hover:scale-110" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <FaInstagram className="w-6 h-6 hover:text-blue-400 transition-colors transform hover:scale-110" />
          </Link>
          <Link href="https://twitter.com" target="_blank">
            <FaTwitter className="w-6 h-6 hover:text-blue-400 transition-colors transform hover:scale-110" />
          </Link>
        </div>
        <p className="text-sm text-white cursor-none">
          &copy; 2025 Tienda DonnaTech. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
