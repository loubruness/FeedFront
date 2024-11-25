import React from "react";
import SharedWidget from "./SharedDashboard";
import Link from "next/link";

const AdminDashboard = () => {
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
            <Link href="./FeedbackSystem">
              <button className="flex items-center justify-center w-1/2 px-5 py-3 text-sm tracking-wide text-white transition-colors duration-200 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-lg sm:w-auto gap-x-2 hover:bg-gradient-to-l from-blue-600 to-indigo-400">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="">
                    <path d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span>Create</span>
              </button></Link>
          </div>
        </div>

        <div className="p-6 pt-0 pb-2 mt-5">
          <table className="w-full min-w-[640px] table-auto max-h-[1050px]">
            <thead className="bg-gradient-to-l from-sky-300 to-indigo-400">
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tl-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Draft Surveys</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">End Date</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Edit</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-4 text-left rounded-tr-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Delete</p>
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
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Link href="./FeedbackSystem">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                      </svg>
                    </button>
                  </Link>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button
                    className="text-sm font-semibold text-red-500 rounded-lg hover:bg-red-600 focus:outline-none hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Current Surveys</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">End Date</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Launch</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Download</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-4 text-left rounded-tr-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Delete</p>
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
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Link href="./FeedbackSystem">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                      </svg>
                    </button>
                  </Link>
                </td>

                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle text-sky-500 none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </button>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button
                    className="text-sm font-semibold text-red-500 rounded-lg hover:bg-red-600 focus:outline-none hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Launch</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Download</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-4 text-left rounded-tr-xl">
                  <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Delete</p>
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
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Link href="./FeedbackSystem"><button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </button></Link>
                </td>

                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle text-sky-500 none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </button>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button
                    className="text-sm font-semibold text-red-500 rounded-lg hover:bg-red-600 focus:outline-none hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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

export default AdminDashboard;
