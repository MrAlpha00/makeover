'use client';

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()

      if (data?.session) {
        router.push("/admin")
      }
    }

    checkUser()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      console.log("Login success:", data)

      router.refresh()
      router.push("/admin")

    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`
        }
      })
      if (error) alert(error.message)
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-500 via-rose-500 to-pink-500 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d1f3d] to-[#1a1a1a]">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
                <circle cx="50" cy="50" r="30" fill="white" opacity="0.1" />
                <circle cx="350" cy="150" r="50" fill="white" opacity="0.05" />
                <circle cx="100" cy="500" r="80" fill="white" opacity="0.08" />
                <circle cx="300" cy="450" r="40" fill="white" opacity="0.06" />
              </svg>
            </div>
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-center px-8 py-12 text-center">
            <div className="mb-8">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image 
                  src="/logo.png" 
                  alt="Party Hub Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide">
                Party <span className="text-coral-400 italic">Hub</span>
              </h1>
              <p className="text-white/70 text-sm md:text-base max-w-xs mx-auto leading-relaxed">
                Make every celebration unforgettable. Your gateway to extraordinary events.
              </p>
            </div>

            <div className="flex items-center gap-4 text-white/50 text-xs">
              <span className="w-8 h-px bg-white/30" />
              <span>Admin Portal</span>
              <span className="w-8 h-px bg-white/30" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center min-h-[400px] md:min-h-[600px]">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h2>
              <p className="text-gray-500 text-sm">Login to access your admin dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 outline-none transition-all text-gray-900 bg-gray-50/50"
                  placeholder="Email address"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 outline-none transition-all text-gray-900 bg-gray-50/50"
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-sm text-coral-500 hover:text-coral-600 font-medium">
                  Forgot your password?
                </button>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 group"
              >
                {loading ? (
                  <><Loader2 className="animate-spin w-5 h-5" /> Signing in...</>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3.5 rounded-xl border border-gray-200 transition-all disabled:opacity-70"
            >
              {googleLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don&apos;t have an account? <span className="text-coral-500 font-medium cursor-pointer hover:text-coral-600">Contact Admin</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
