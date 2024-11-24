import React from "react";
import SharedWidget from "./SharedDashboard";

const TeacherDashboard = () => {
  return (
    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-3">
        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
          <SharedWidget />
          <div className="flex items-center mt-4 gap-x-3">
            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gradient-to-tr from-blue-400 to-sky-300 rounded-lg sm:w-auto gap-x-2 hover:bg-gradient-to-l from-blue-400 to-sky-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>All</span>
            </button>
          </div>
        </div>

        <div className="p-6 pt-0 pb-2 mt-5">
          <table className="w-full min-w-[640px] table-auto max-h-[1050px]">
            <thead className="bg-gradient-to-l from-sky-300 to-indigo-400">
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tl-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Current Surveys</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">End Date</p>
                </th>
                {/* <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Launch</p>
                </th> */}
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tr-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Download</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <div className="gap-4 w-10/12">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Advanced Programming</p>
                  </div>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <div className="w-10/12">
                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                  </div>
                </td>
                {/* <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </button>
                </td> */}

                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle text-sky-500 none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-6 pt-0 pb-2 mt-20">
          <table className="w-full min-w-[640px] table-auto max-h-[1050px]">
            <thead className="bg-gradient-to-l from-sky-300 to-indigo-400">
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tl-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Past Surveys</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">End Date</p>
                </th>
                {/* <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Launch</p>
                </th> */}
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tr-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Download</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <div className="gap-4 w-10/12">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Advanced Programming</p>
                  </div>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <div className="w-10/12">
                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                  </div>
                </td>
                {/* <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </button>
                </td> */}

                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle text-sky-500 none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
