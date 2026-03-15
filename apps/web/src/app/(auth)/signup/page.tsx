'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup } from '../actions'

export default function SignupPage() {
    const [role, setRole] = useState('')

    return (
        <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12 bg-[#f5f8f8] min-h-screen">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden font-sans my-8">
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtYbUPLuP_SQipaEUO4wtouB3DJKOQe-_eljjn7H2ns79PLAHBDzILaQ4DoF3MyJ0KPtcU_R24JgOcOqkBtc3Cda1v0xdi875CsFkJcHpropP_jc8k3nUI6-lGmD8G9tgHrI7fpX2FRor5v3SXs-ZM9pGkt5pS3rtAVwyvBJLBN9uC_G7NSdTjd1yzPnnmueRefUoOz4rgxVjwewlqm-dUyMEd_DBGdyX7_cFDFPj1BthGivmEnNvpDA3b3gVyBgTUpd5ehaKvfnE')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                </div>

                <div className="p-8 -mt-12 relative z-10 bg-white shadow-sm rounded-t-3xl">
                    <div className="mb-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#00AEEF] bg-opacity-10 text-[#00AEEF] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Create your Navitra account</h2>
                        <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-xs mx-auto">Join the intelligent enterprise platform for hospitality management.</p>
                    </div>

                    <form action={signup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="userRole">
                                User Role
                            </label>
                            <select
                                id="userRole"
                                name="userRole"
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent outline-none cursor-pointer appearance-none"
                                style={{
                                    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="" disabled>Select your professional role</option>
                                <option value="traveler">Traveler</option>
                                <option value="hotel-staff">Hotel Manager</option>
                                <option value="tour-guide">Tour Guide</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="fullName">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                placeholder="e.g. Alex Johnson"
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="alex@company.com"
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">
                                Create Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                minLength={8}
                                placeholder="Min. 8 characters"
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Conditional Hotel Manager Fields */}
                        {role === 'hotel-staff' && (
                            <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl space-y-4 mt-4 animate-in fade-in slide-in-from-top-4">
                                <h3 className="font-semibold text-sky-900 border-b border-sky-200 pb-2">Hotel Details</h3>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="hotelName">
                                        Hotel Name
                                    </label>
                                    <input
                                        id="hotelName"
                                        name="hotelName"
                                        type="text"
                                        required
                                        placeholder="e.g. Grand Plaza Resort"
                                        className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="hotelAddress">
                                        Hotel Address
                                    </label>
                                    <textarea
                                        id="hotelAddress"
                                        name="hotelAddress"
                                        required
                                        rows={2}
                                        placeholder="Full street address..."
                                        className="w-full p-3 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="exteriorPics">
                                        Hotel Exterior Pictures
                                    </label>
                                    <input
                                        id="exteriorPics"
                                        name="exteriorPics"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        required
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 transition-all cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="interiorPics">
                                        Hotel Interior Pictures
                                    </label>
                                    <input
                                        id="interiorPics"
                                        name="interiorPics"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        required
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 transition-all cursor-pointer"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full h-12 bg-[#00AEEF] text-white font-bold rounded-lg shadow-lg shadow-[#00AEEF]/20 hover:shadow-[#00AEEF]/40 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6"
                        >
                            Create Account <span className="ml-1 text-lg">→</span>
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-slate-100">
                        <p className="text-slate-500 text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-[#00AEEF] font-semibold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
