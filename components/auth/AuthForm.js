'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default function AuthForm() {
  const [tab, setTab] = useState('login')

  return (
    <div className='max-w-md mx-auto mt-20 p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-lg'>
      <Tabs value={tab} onValueChange={setTab} className='w-full'>
        <TabsList className='w-full flex mb-6'>
          <TabsTrigger value='login' className='flex-1'>Sign In</TabsTrigger>
          <TabsTrigger value='signup' className='flex-1'>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <SignInForm />
        </TabsContent>
        <TabsContent value='signup'>
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  )
} 