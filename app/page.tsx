"use client"

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth'
import { useToast } from '@/components/ui/use-toast'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LogIn, UserPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Tabs } from '@/components/ui/tabs'
import { SpaceBackground } from './components/space-background'

export default function AuthPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [rememberMe, setRememberMe] = useState(false)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('login')
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      if (activeTab === "login") {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
        await signInWithEmailAndPassword(auth, values.email, values.password)
      } else {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
      }
      toast({
        title: activeTab === "login" ? "Welcome back!" : "Account created!",
        description: "You've successfully signed in.",
        duration: 5000,
      })
      router.replace('/dashboard')
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true)
    try {
      const provider = new (await import('firebase/auth')).GoogleAuthProvider()
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
      await (await import('firebase/auth')).signInWithPopup(auth, provider)
      toast({
        title: 'Google authentication successful',
        description: "You've successfully signed in with Google.",
        duration: 5000,
      })
      router.replace('/dashboard')
    } catch (err) {
      toast({
        title: 'Error',
        description: (err as Error).message,
        variant: 'destructive',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        <span className="ml-2 text-zinc-400">Loading...</span>
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        <span className="ml-2 text-zinc-400">Redirecting...</span>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <SpaceBackground className="pointer-events-none" />
      <div className="flex min-h-screen items-center justify-center relative z-10">
        <div className="w-full max-w-xl bg-zinc-900/90 rounded-xl shadow-2xl border border-zinc-800 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Cosmic</h1>
            <p className="text-slate-400 mt-1">Create an account or sign in to continue</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 mb-6">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            {...field}
                            className="border-slate-700 bg-slate-900/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            className="border-slate-700 bg-slate-900/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <label className="flex items-center gap-2 text-sm text-slate-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="accent-blue-600"
                    />
                    Remember me
                  </label>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-900 px-2 text-slate-400">OR CONTINUE WITH</span>
                </div>
              </div>
              <Button
                variant="outline"
                type="button"
                className="w-full border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800/50"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                )}
                {isLoading ? "Signing in..." : "Google"}
              </Button>
            </TabsContent>
            <TabsContent value="signup">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            {...field}
                            className="border-slate-700 bg-slate-900/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            className="border-slate-700 bg-slate-900/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-900 px-2 text-slate-400">OR CONTINUE WITH</span>
                </div>
              </div>
              <Button
                variant="outline"
                type="button"
                className="w-full border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800/50"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                )}
                {isLoading ? "Signing in..." : "Google"}
              </Button>
            </TabsContent>
          </Tabs>
          <div className="mt-8 text-center text-xs text-slate-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  )
}
