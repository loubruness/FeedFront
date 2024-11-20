"use client";

import { ChangeEvent, FormEvent, useState } from 'react';

import Image from "next/image";
// import Link from 'next/link';
import logo from '../assets/logo.png';
import chouette from '../assets/chouette2.jpeg';
import { useRouter } from 'next/navigation';


export default function Login() {
    const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<string>('');

    const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading('Loading...');
		setError('');

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to sign in');
			}
			const data = await response.json();
			localStorage.setItem('token', data.token);
			const token = data.token;
			console.log('Login successful:', data);

			const responseName = await fetch('/api/profile_page', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			});

			if (!response.ok) {
				const errorData = await responseName.json();
				throw new Error(errorData.message || 'Failed to sign in');
			}

			const dataName = await responseName.json();
			localStorage.setItem('userId', dataName.id);
			localStorage.setItem('userName', dataName.username);
			localStorage.setItem('userId', dataName.id);
			console.log('Login successful:', dataName);

			router.push('/homepage');
		} catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                console.error('Error logging in:', error);
            } else {
                console.error('Unknown error:', error);
            }
        } finally {
			setLoading('');
		}
	};

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-700 text-gray-900 flex justify-center">
            <div className="max-w-screen-2xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className=" flex flex-col items-center">
                        <Image
                            src={logo}
                            alt="logo"
                        />
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-10">
                            <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
                                    
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-gradient-to-tl from-sky-500 to-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Log In
                                    </span>
                                </button>
                            </form>
                            {loading && <p className="text-grey-500 mt-4">{loading}</p>}
							{error && <p className="text-red-500 mt-4">{error}</p>}
                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Forgot your id ? Call the +33 188 289 250
                                </div>
                            </div>

                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    By connecting, I accept the conditions of use of the SSO Efrei service, particularly in terms of personal data.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative flex justify-center align-center items-center overflow-hidden bg-indigo-100  hidden lg:flex sm:rounded-tr-lg sm:rounded-br-lg">
                    <div className="relative z-10 w-full h-full">
                        <div className="w-full h-full object-cover">
                            <Image
                                src={chouette}
                                alt="chouette"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}