import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut, getSession } from "next-auth/react";

import Nav from '@/components/Nav';
import { useState } from 'react';
import Logo from './Logo';

function Layout({ children }) {
    const { data: session, status } = useSession();
    const [showNav, setShowNav] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false
        })
    }


    if (!session) {
        return (
            <>
                <div className='bg-bgGray w-screen pt-44 flex items-center'>
                    <div className='text-center w-full'>
                        <button className="bg-blue-400 p-2 px-4 rounded-lg" onClick={() => signIn('google')}>Login With Google</button>
                    </div>
                </div>

                <div class="bg-bgGray flex min-h-full flex-col justify-center px-6  lg:px-8">
                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <hr />
                        <form class="space-y-6" action="#" method="POST">
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div class="mt-2">
                                    <input
                                        value={email}
                                        placeholder="abc@gmail.com"
                                        name="email" type="email"
                                        autocomplete="email"
                                        required
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                                </div>
                            </div>
                            <div>
                                <div class="flex items-center justify-between">
                                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                </div>
                                <div class="mt-2">
                                    <input
                                        value={password}
                                        placeholder='password'
                                        name="password"
                                        type="password"
                                        autocomplete="current-password"
                                        required
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                                </div>
                            </div>

                            <div>
                                <button onClick={(e) => handleLogin(e)} type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div className='bg-bgGray min-h-screen'>
                <div className='block md:hidden flex items-center p-4'>
                    <button onClick={() => setShowNav(!showNav)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <div className='justify-center flex grow mr-6'>
                        <Logo />
                    </div>

                </div>
                <div className=' flex'>
                    <Nav show={showNav} />
                    <div className='flex-grow  p-4'>
                        {children}
                    </div>

                </div>
            </div>
        )
    }
}



export default Layout;