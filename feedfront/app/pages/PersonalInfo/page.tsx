"use client";

import Link from 'next/link';
import Section from '../../components/Section';
import StaticInput from '../../components/StaticInput';
import { useUserProfile } from '../../hooks/useUserProfile';

export default function PersonalInfo() {
    const { email, firstName, lastName, errorInfo, loading } = useUserProfile();

    return (
        <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-baseline">
            {/* Navigation button to the dashboard */}
            <Link href="Dashboard">
                <button className="xl:mr-[12px] xl:-ml-[39px] sm:mr-0 sm:ml-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="white"
                        className="w-10 h-10 text-inherit"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </Link>
            {/* Personal Info component */}
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
                <div className="lg:w-1/2 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text mb-5">
                            Your Profile
                        </h1>
                        {/* Personal Data */}
                        {loading ? (
                            <p className="text-gray-500 mt-8">Loading...</p>
                        ) : (
                            <form className="mx-auto max-w-xs mt-14">
                                {email &&
                                    <StaticInput value={email} placeholder="Email" disabled={true} />
                                }
                                {firstName && (
                                    <StaticInput value={firstName} placeholder="First Name" disabled={true} />
                                )}
                                {lastName && (
                                    <StaticInput value={lastName} placeholder="Last Name" disabled={true} />
                                )}
                                {errorInfo && <p className="text-red-500 mt-4">{errorInfo}</p>}
                            </form>
                        )}
                        {/* Legal Data */}
                        <Section
                            title="Additional Information"
                            content="This data is shared with us by your organization, EFREI. If you wish to make any demands or inquiries about this data, please refer directly to them."
                        />
                        <Section
                            title="Finality & Storage"
                            content={`We solely use your information for authentication and security purposes, and the collection of this data is strictly necessary for the functioning of the website.\n\nNone of the collected data is, nor will be, shared with any third party.\n\nData is cleansed every semester (6 months) for feedback forms, and every 12 months for the rest.`}
                        />
                        <Section
                            title="Contact EFREI"
                            content={`Please write to:\n\nThe Data Protection Officer (DPO)\nEfrei\n30-32 Avenue de la République\n94800 VILLEJUIF\ndpo@efrei.fr\n\nOr visit:`}
                        />
                        <Link
                            href="https://www.myefrei.fr/portal/student/donnees-personnelles"
                            className="text-blue-700 tracking-wide font-medium text-lg hover:text-indigo-500 flex text-center items-center justify-center hover:underline"
                        >
                            MyEfrei, Personal Data
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

