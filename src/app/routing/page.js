'use client'

import Link from 'next/link'

export default function Routing() {
  return (
    <div>
      <h3>Routing</h3>

      {/* cara pindah halaman menggunakan Link */}
      <Link href='/routing/about'>About</Link>
      <br /><br />

      {/* cara pindah halaman menggunakan Link dengan parameter */}
      <Link href={{ pathname:'/routing/content', query:{ tipe:'web' } }}>Content: Web</Link>
      <br />
      <Link href={{ pathname:'/routing/content', query:{ tipe:'mobile' } }}>Content: Mobile</Link>
      <br />

      
    </div>
  )
}
