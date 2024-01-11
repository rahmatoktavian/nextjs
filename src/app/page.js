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
      const email = session?.data ? session.data.session.user.email : null
      const { data:data_user } = await supabase
        .from('user')
        .select('anggota_id, petugas_id')
        .eq('email', email)
        .single()
      
      //if user login : petugas
      if(data_user.petugas_id !== null) {
        router.push('menu/chart')

      //if user login : anggota
      } else if(data_user.anggota_id !== null) {
        router.push('menu/peminjaman_saya')
      }

    } else {
      router.push('/signin')
    }
  }
}
