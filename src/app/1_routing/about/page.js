'use client'

//memanggil fungsi useRouter (pindah halaman)
import { useRouter } from 'next/navigation'

export default function Home() {
  //define useRoute menjadi router
  const router = useRouter()

  function goBack() {
    router.push('/routing')
  }

  return (
    <div>
      <h3>About</h3>

      {/* cara pindah halaman menggunakan Button secara langsung */}
      <button onClick={() => router.push('/routing')}>Kembali</button>
      
      <br />

      {/* cara pindah halaman menggunakan Button melalui function goBack */}
      <button onClick={goBack}>Kembali (2)</button>
    </div>
  )
}
