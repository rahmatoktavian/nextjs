'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Home() {
  const router = useRouter();
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkUser()
  }, []);

  async function checkUser() {
    const session = await supabase.auth.getSession()
    if(session.data) {
      router.push('/menu/chart')
    } else {
      router.push('/signin')
    }
  }
}
