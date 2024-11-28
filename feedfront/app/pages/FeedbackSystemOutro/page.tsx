import Link from 'next/link';

// Section component
function Section({ title, content }: { title: string; content: string }) {
    return (
        <div className="flex-grow mt-10">
            <div className="my-10 border-b text-center">
                <div className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    {title}
                </div>
            </div>
            <div className="my-10 text-center">
                <div
                    className="px-2 inline-block text-lg text-blue-600 tracking-wide font-medium bg-white whitespace-pre-line"
                >
                    {content}
                </div>
            </div>
        </div>
    );
}

// Feedback Outro component
export default function FeedbackOutro(): JSX.Element {
    return (
        <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-baseline">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
                <div className="lg:w-1/2 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        {/* Title for the feedback outro */}
                        <h1 className="text-2xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 text-center text-transparent bg-clip-text mb-5">
                            Module Feedback
                        </h1>
                        {/* Section for the feedback outro */}
                        <Section title="Conclusion" content={`Your answers have been successfully submitted !\n\n Thank you for taking the time to answer this questionnaire. If you have any additional questions please reach out to your training manager or student success representative.`} />
                        {/* Navigation button to the dashboard */}
                        <Link href="../pages/Dashboard">
                            <button
                                aria-label="Start Evaluation"
                                className="mt-28 tracking-wide font-semibold bg-gradient-to-tl from-blue-500 to-indigo-500 text-gray-100 w-full min-w-[34rem] py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <span className="ml-3">Go Home</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
