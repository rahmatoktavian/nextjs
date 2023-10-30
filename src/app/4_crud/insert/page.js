'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

//memanggil supabase
import { supabase } from '../../../supabase'

export default function CRUDInsert() {
  const router = useRouter()
  const [nama, setNama] = useState('')

  //insert data ke supabase
  async function onSubmit(event) {
    event.preventDefault()
    
    const { data, error } = await supabase
      .from('kategori_buku')
      //field db : state
      .insert({ nama:nama })
    
    router.push('/4_crud/list/')
  }

  return (
    <div>
      <h3>Insert</h3>

      {/* display if listData not null */}
      <form onSubmit={onSubmit}>
        {/* onchange : isi state nama sesuai input */}
        <input type='text' name='nama' value={nama} onChange={(event) => setNama(event.target.value)} required />
        <br />
        <button type='submit'>Save</button>
      </form>

    </div>
  )
}
