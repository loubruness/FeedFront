import Link from 'next/link';


export default function PersonalInfo() {

    return (
        <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-baseline">
            <button className="xl:mr-[12px] xl:-ml-[39px] sm:mr-0 sm:ml-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-10 text-inherit">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
                <div className="lg:w-1/2 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 text-center inline-block text-transparent bg-clip-text mb-5">
                            Module Feedback
                        </h1>
                        <h1 className="text-2xl xl:text-3xl font-extrabold">

                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="w-full flex-1 mt-8">
                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Welcome
                                    </div>
                                </div>
                                <div className="my-12 text-center">
                                    <div
                                        className=" px-2 inline-block text-lg text-blue-600 tracking-wide font-medium bg-white">
                                        Your opinion is important ! You are invited to complete the evaluation of your modules and the learning experience offered by your teachers.<br /><br /> Your comments will be greatly appreciated !
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex-1 mt-20">
                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Reminder
                                    </div>
                                </div>
                                <div className="my-12 text-center">
                                    <div
                                        className=" px-2 inline-block text-lg text-blue-600 tracking-wide font-medium bg-white">
                                        Your feedback and comments are 100% anonymized, and none of this information will be provided to third party organizations.
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex-1 mt-20">
                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Disclaimer
                                    </div>
                                </div>
                                <div className="my-12 text-center">
                                    <div
                                        className=" px-2 inline-block text-lg text-blue-600 tracking-wide font-medium bg-white">
                                        The information collected on this form is used by the school to improve its teaching services. <br /><br />The survey concerns the modules of the current school year, the responses are treated anonymously. The results are communicated to teachers and the administration (still anonymously). <br /><br />The data will be kept until the end of the current semester.
                                    </div>
                                </div>
                            </div>
                            <Link href="../FeedbackSystem">
                                <button
                                    className="mt-40 tracking-wide font-semibold bg-gradient-to-tl from-blue-500 to-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                    </svg>

                                    <span className="ml-3">
                                        Start Evaluation
                                    </span>
                                </button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}