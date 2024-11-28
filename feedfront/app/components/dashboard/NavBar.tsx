import Link from 'next/link'; // Importing the Link component for navigation in Next.js

const NavBar = () => {
  return (
    <aside 
      className="bg-gradient-to-r from-blue-100 to-blue-50 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0"
    >
      {/* Sidebar container with gradient background and responsive positioning */}
      <div className="m-4">
        {/* Main container for sidebar content */}

        {/* Navigation Section */}
        <ul className="mb-4 flex flex-col gap-1">
          {/* List of navigation items */}
          <li>
            {/* Dashboard Button */}
            <button 
              className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" 
              type="button"
            >
              {/* Home Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                aria-hidden="true" 
                className="w-5 h-5 text-inherit"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
              </svg>
              {/* Link to Dashboard */}
              <Link href="./Dashboard">
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  dashboard
                </p>
              </Link>
            </button>
          </li>

          {/* Personal Information Button */}
          <li>
            <button 
              className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" 
              type="button"
            >
              {/* User Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="size-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              {/* Link to Personal Information */}
              <Link href="PersonalInfo">
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  personal information
                </p>
              </Link>
            </button>
          </li>
        </ul>

        {/* Logs Section */}
        <ul className="mb-4 flex flex-col gap-1">
          {/* Section Header */}
          <li className="mx-3.5 mt-4 mb-2">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-700 font-black uppercase opacity-50">
              Logs
            </p>
          </li>

          {/* Sign Out Button */}
          <li>
            <button 
              className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" 
              type="button"
            >
              {/* Logout Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                aria-hidden="true" 
                className="w-5 h-5 text-inherit"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" 
                  clipRule="evenodd"
                ></path>
              </svg>
              {/* Link to Sign Out */}
              <Link href="./Login">
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  sign out
                </p>
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default NavBar;
