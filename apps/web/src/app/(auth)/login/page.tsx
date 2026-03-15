import Link from 'next/link'
import { login } from '../actions'

export default function LoginPage() {
    return (
        <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12 bg-[#f5f8f8] min-h-screen">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden font-sans">
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

                <div className="p-8 -mt-12 relative z-10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Welcome to Navitra</h2>
                        <p className="text-slate-500 mt-2">Access your intelligent hospitality dashboard</p>
                    </div>

                    <form action={login} className="space-y-5">
                        {/* User Role dropdown removed as requested by the user */}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="name@navitra.com"
                                    className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-xs font-semibold text-[#00AEEF] hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 bg-[#00AEEF] text-white font-bold rounded-lg shadow-lg shadow-[#00AEEF]/20 hover:shadow-[#00AEEF]/40 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            Sign In to Navitra
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-slate-100 text-center flex flex-col gap-2">
                        <p className="text-slate-500 text-sm">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-[#00AEEF] font-semibold hover:underline">
                                Sign up
                            </Link>
                        </p>
                        <p className="text-slate-400 text-xs mt-2">
                            Enterprise partner? <a href="#" className="font-semibold hover:underline">Log in with SSO</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
