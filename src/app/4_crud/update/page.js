'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

//memanggil supabase
import { supabase } from '../../../supabase'

export default function CRUDUpdate() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const [nama, setNama] = useState('')

  //first time running
  useEffect(() => {
    getData()
  }, []);

  //get data based on id
  async function getData() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .select('id, nama')
      .eq('id', id)
      .single()
      
      //isi state nama dari db
      setNama(data.nama)
  }

  //update data ke supabase
  async function onSubmit(event) {
    event.preventDefault()
    
    const { data, error } = await supabase
      .from('kategori_buku')
      //field db : state
      .update({ nama:nama })
      .eq('id', id)
    
    router.push('/4_crud/list/')
  }

  async function onDelete() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .delete()
      .eq('id', id)
    
    router.push('/4_crud/list/')
  }

  return (
    <div>
      <h3>Update</h3>

      {/* display if listData not null */}
      <form onSubmit={onSubmit}>
        {/* onchange : isi state nama sesuai input */}
        <input type='text' name='nama' value={nama} onChange={(event) => setNama(event.target.value)} />
        <br />
        <button type='submit'>Save</button>
        <button type='button' onClick={onDelete}>Delete</button>
      </form>

    </div>
  )
}
