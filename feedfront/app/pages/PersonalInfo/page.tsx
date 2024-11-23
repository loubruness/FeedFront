"use client";

import Link from 'next/link';
import Section from '../../components/Section';
import StaticInput from '../../components/StaticInput';
import { useUserProfile } from '../../hooks/useUserProfile';

export default function PersonalInfo() {
    const { email, firstName, lastName, errorInfo, loading } = useUserProfile();

    return (
        <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-baseline">
            <Link href="/">
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
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
                <div className="lg:w-1/2 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text mb-5">
                            Your Profile
                        </h1>
                        {loading ? (
                            <p className="text-gray-500 mt-8">Loading...</p>
                        ) : (
                            <form className="mx-auto max-w-xs mt-14">
                                <StaticInput value={email} placeholder="Email" disabled={true}/>
                                <StaticInput value={firstName} placeholder="First Name" disabled={true}/>
                                <StaticInput value={lastName} placeholder="Last Name" disabled={true}/>
                                {errorInfo && <p className="text-red-500 mt-4">{errorInfo}</p>}
                            </form>
                        )}
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



// "use client";

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Section from '../../components/Section';
// import StaticInput from '../../components/StaticInput';

// export default function PersonalInfo() {
//     const [email, setEmail] = useState<string>('');
//     const [firstName, setFirstName] = useState<string>('');
//     const [lastName, setLastName] = useState<string>('');
//     const [errorInfo, setErrorInfo] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(true);

//     const loadUserData = async () => {
//         setErrorInfo('');
//         setLoading(true);

//         const token = localStorage.getItem('token');
//         try {
//             const response = await fetch('/api/profile_page', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ token }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to load profile data');
//             }

//             const data = await response.json();
//             setEmail(data.email);
//             setFirstName(data.firstName);
//             setLastName(data.lastName);
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 setErrorInfo(error.message);
//             } else {
//                 console.error('Unknown error:', error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadUserData();
//     }, []);

//     return (
//         <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-baseline">
//             <Link href="/">
//                 <button className="xl:mr-[12px] xl:-ml-[39px] sm:mr-0 sm:ml-0">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="white"
//                         className="w-10 h-10 text-inherit"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
//                     </svg>
//                 </button>
//             </Link>
//             <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
//                 <div className="lg:w-1/2 p-6 sm:p-12">
//                     <div className="mt-12 flex flex-col items-center">
//                         <h1 className="text-2xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text mb-5">
//                             Your Profile
//                         </h1>
//                         {loading ? (
//                             <p className="text-gray-500 mt-8">Loading...</p>
//                         ) : (
//                             <form className="mx-auto max-w-xs mt-14">
//                                 <StaticInput value={email} placeholder="Email" />
//                                 <StaticInput value={firstName} placeholder="First Name" />
//                                 <StaticInput value={lastName} placeholder="Last Name" />
//                                 {errorInfo && <p className="text-red-500 mt-4">{errorInfo}</p>}
//                             </form>
//                         )}
//                         <Section
//                             title="Additional Information"
//                             content="This data is shared with us by your organization, EFREI. If you wish to make any demands or inquiries about this data, please refer directly to them."
//                         />
//                         <Section
//                             title="Finality & Storage"
//                             content={`We solely use your information for authentication and security purposes, and the collection of this data is strictly necessary for the functioning of the website.\n\nNone of the collected data is, nor will be, shared with any third party.\n\nData is cleansed every semester (6 months) for feedback forms, and every 12 months for the rest.`}
//                         />
//                         <Section
//                             title="Contact EFREI"
//                             content={`Please write to:\n\nThe Data Protection Officer (DPO)\nEfrei\n30-32 Avenue de la République\n94800 VILLEJUIF\ndpo@efrei.fr\n\nOr visit:\n\n`}
//                         />
//                         <Link
//                             href="https://www.myefrei.fr/portal/student/donnees-personnelles"
//                             className="text-blue-700 hover:text-indigo-500 flex text-center items-center justify-center hover:underline"
//                         >
//                             MyEfrei, Personal Data
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



// "use client";

// import { useEffect, useState } from 'react';
// import Link from 'next/link';


// export default function PersonalInfo() {
//     const [email, setEmail] = useState<string>('');
// 	const [firstName, setFirstName] = useState<string>('');
// 	const [lastName, setLastName] = useState<string>('');

//     // const [id, setId] = useState<string>('');
// 	const [errorInfo, setErrorInfo] = useState<string>('');
// 	const [loadingInfo, setLoadingInfo] = useState<string>('');

//     const Load = async () => {
//         setErrorInfo('');
// 		const token = localStorage.getItem('token');

// 		try {
// 			const response = await fetch('/api/profile_page', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({ token }),
// 			});

// 			if (!response.ok) {
// 				const errorData = await response.json();
// 				throw new Error(errorData.message || 'Failed to sign in');
// 			}

// 			const data = await response.json();

// 			setEmail(data.email);
// 			setFirstName(data.firstName);
// 			setLastName(data.lastName);
// 			const radioButton = document.getElementById(data.avatar) as HTMLInputElement | null;

// 			if (radioButton && radioButton.id == data.avatar) {
// 				console.log("found");
// 				radioButton.checked = true;
// 			}
// 			// setId(data.id);
// 		} catch (error: unknown) {
//             if (error instanceof Error) {
//                 setErrorInfo(error.message);
//                 console.error('Error logging in:', error);
//             } else {
//                 console.error('Unknown error:', error);
//             }
//         }finally {
// 			setLoadingInfo('');
// 		}
// 	};

//     useEffect(() => {
// 		Load();
// 	}, []);
	
//     return (
//         <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-baseline">
//             <button className="xl:mr-[12px] xl:-ml-[39px] sm:mr-0 sm:ml-0">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-10 text-inherit">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
//                 </svg>
//             </button>
//             <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
//                 <div className="lg:w-1/2 p-6 sm:p-12">
//                     <div className="mt-12 flex flex-col items-center">
//                         <h1 className="text-2xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text mb-5">
//                             Your Profile
//                         </h1>
//                         <h1 className="text-2xl xl:text-3xl font-extrabold">

//                         </h1>
//                         <div className="w-full flex-1 mt-8">
//                         <form className="mx-auto max-w-xs mb-32">
// 								<input
// 									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
// 									type="text" placeholder="Email" value={email} />
// 								{/* Show name fields only if user is a teacher */}
//                                 <input
// 									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
// 									type="text" placeholder="First Name" value={firstName} />
// 								<input
// 									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
// 									type="text" placeholder="Last Name" value={lastName} />
// 								{loadingInfo && <p className="text-grey-500 mt-4">{loadingInfo}</p>}
// 								{errorInfo && <p className="text-red-500 mt-4">{errorInfo}</p>}
// 							</form>
//                             <div className="w-full flex-1 mt-8">
//                                 <div className="my-12 border-b text-center">
//                                     <div
//                                         className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
//                                         Additional information
//                                     </div>
//                                 </div>
//                                 <div className="my-12 text-center">
//                                     <div
//                                         className=" px-2 inline-block text-lg text-blue-600 tracking-wide font-medium bg-white">
//                                         This data is shared with us by your organization, EFREI. If you wish to make any demands or inquiries about this data, please refer directly to them.
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="w-full flex-1 mt-40">
//                                 <div className="my-12 border-b text-center">
//                                     <div
//                                         className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
//                                         Finality & Storage
//                                     </div>
//                                 </div>
//                                 <div className="my-12 text-center">
//                                     <div
//                                         className=" px-2 inline-block text-lg text-blue-600 tracking-wide font-medium bg-white">
//                                         We solely use your information for authentication and security purposes, and the collection of this data is strictly necessary for the functioning of the website.  <br /><br />None of the collected data is, nor will be, shared with any third party. <br /><br /> Data is cleansed every semester (6 months) for feedback forms, and every 12 months for the rest.
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="w-full flex-1 mt-40">
//                                 <div className="my-12 border-b text-center">
//                                     <div
//                                         className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
//                                         Contact EFREI
//                                     </div>
//                                 </div>
//                                 <div className="my-12 text-center">
//                                     <div
//                                         className=" px-2 inline-block text-lg text-blue-600 tracking-wide font-medium bg-white">
//                                        <i>Please write to :</i>  <br /> <br />
//                                         The Data Protection Officer (DPO) <br />
//                                         Efrei <br />
//                                         30-32 Avenue de la République <br />
//                                         94800 VILLEJUIF <br />
//                                         dpo@efrei.fr <br /> <br /> <br />
                                        
//                                         <i>Or visit :</i>  <br /> <br />
//                                         <Link href="https://www.myefrei.fr/portal/student/donnees-personnelles" className="text-blue-700 hover:text-indigo-500 flex text-center items-center justify-center hover:underline">MyEfrei, Personal Data</Link>
//                             </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>);
// }