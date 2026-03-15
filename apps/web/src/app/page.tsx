import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plane, Hotel, Map, Shield, BarChart3, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 pb-4 pt-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
            N
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Navitra</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-sky-500 text-white px-5 py-2.5 rounded-full hover:bg-sky-600 transition-all shadow-sm hover:shadow-sky-200"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden mx-auto max-w-7xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-50 rounded-bl-[100px] -z-10 opacity-50 blur-3xl"></div>
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-sm font-medium mb-6 border border-sky-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Intelligent End-to-End Travel Planning
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8">
            Travel <span className="text-sky-500">Smarter.</span><br />
            Manage <span className="text-sky-500">Better.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
            Unify bookings, itineraries, and hospitality operations in one intelligent platform.
            Navitra bridges the gap between travelers aiming for perfect trips and businesses aiming for operational excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 bg-sky-500 text-white px-8 py-4 rounded-full font-medium hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-300"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section id="features" className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">One Platform. Three Perspectives.</h2>
            <p className="text-gray-500 text-lg">
              Designed specifically to eliminate delivery risk for travelers, hotels, and tour operators by breaking down data silos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Travelers */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[100px] -z-10 group-hover:bg-sky-100 transition-colors"></div>
              <div className="h-14 w-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                <Map className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Travelers</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Experience Wanderlog-style visual trip planning. Drag-and-drop itineraries, unified flight and hotel bookings, and real-time alerts.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">✓</span> Interactive map routing
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">✓</span> Automated schedule sync
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">✓</span> Budget tracking
                </li>
              </ul>
            </div>

            {/* For Hotel Managers */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[100px] -z-10 group-hover:bg-sky-100 transition-colors"></div>
              <div className="h-14 w-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                <Hotel className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Hotel Managers</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Mews-style property management. Gain deep operational intelligence with RevPAR charts, occupancy grids, and automated staff workflows.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">✓</span> Live occupancy dashboard
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">✓</span> Dynamic pricing insights
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">✓</span> Housekeeping state transitions
                </li>
              </ul>
            </div>

            {/* For Tour Guides */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[100px] -z-10 group-hover:bg-sky-100 transition-colors"></div>
              <div className="h-14 w-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Tour Guides</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Take control of your schedules. Manage group rosters, broadcast real-time updates to participants, and collect secure payments.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">✓</span> Roster & Manifest view
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">✓</span> Push notification broadcasts
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">✓</span> Integrated tipping & reviews
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Architecture Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Scale and Reliability</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Navitra isn't just a prototype; it's designed with an industry-ready architecture. From role-based access control to robust data indexing, your operations run securely.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex gap-4">
                <Shield className="w-8 h-8 text-sky-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Secure Auth</h4>
                  <p className="text-sm text-gray-500">Strict RLS policies and role-based access.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Plane className="w-8 h-8 text-sky-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Fast APIs</h4>
                  <p className="text-sm text-gray-500">Service-oriented backend with aggressive caching.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <BarChart3 className="w-8 h-8 text-sky-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Observability</h4>
                  <p className="text-sm text-gray-500">Structured logging and real-time health metrics.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full bg-gray-50 rounded-3xl p-8 border border-gray-100 relative h-96 flex items-center justify-center overflow-hidden">
            {/* Abstract Dashboard Representation */}
            <div className="absolute w-full h-full inset-0 bg-gradient-to-br from-sky-50 to-white"></div>
            <div className="relative z-10 w-full max-w-sm space-y-4">
              <div className="h-12 w-full bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-32 w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse"></div>
                <div className="h-32 w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse delay-75"></div>
              </div>
              <div className="h-24 w-full bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-sky-900 text-white py-16 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your travel ecosystem?</h2>
          <p className="text-sky-200 text-lg mb-10">
            Join thousands of travelers and hospitality managers building better experiences together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="bg-white text-sky-900 px-8 py-4 rounded-full font-bold hover:bg-sky-50 transition-colors"
            >
              Create Free Account
            </Link>
          </div>
          <div className="border-t border-sky-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sky-400 text-sm">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-6 w-6 rounded flex items-center justify-center bg-sky-800 text-white font-bold text-xs">
                N
              </div>
              <span className="font-bold tracking-tight text-white">Navitra</span>
              <span className="mx-2">•</span>
              <span>© {new Date().getFullYear()} Navitra Inc.</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">API Docs</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
