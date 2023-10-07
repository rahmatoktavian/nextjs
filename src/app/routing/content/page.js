'use client'

import Link from 'next/link'

//memanggil fungsi useRouter, useSearchParams (menangkap parameter)
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  //define useRoute menjadi router
  const router = useRouter()

  //menangkap parameter tipe dari home
  const searchParams = useSearchParams()

  return (
    <div>
      <Link href='/routing'>Kembali</Link>

      {/* cara mendapatkan parameter tipe */}
      <h3>Content : {searchParams.get('tipe')}</h3>
    </div>
  )
}
