'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

//memanggil supabase
import { supabase } from '../../../supabase'

export default function ManyInsert() {
  const router = useRouter()

  //state untuk isi dropdown (selectbox)
  const [kategoriList, setKategoriList] = useState([])

  const [kategoriID, setKategoriID] = useState('')
  const [judul, setJudul] = useState('')

  useEffect(() => {
    getDataKategori()
  }, []);

  //get data kategori untuk dropdown
  async function getDataKategori() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .select('id, nama')
      .order('nama', {ascending:true})
    
      setKategoriList(data)
  }

  //insert data ke supabase
  async function onSubmit(event) {
    event.preventDefault()
    
    const { data, error } = await supabase
      .from('buku')
      //field db : state
      .insert({ kategori_id:kategoriID, judul:judul })
    
    router.push('/5_1many/list/')
  }

  return (
    <div>
      <h3>Insert</h3>

      {/* display if listData not null */}
      <form onSubmit={onSubmit}>
        <select 
          name='kategorID' 
          onChange={(event) => setKategoriID(event.target.value)} 
          required
        >
          <option value=''>Pilih Kategori</option>
          {kategoriList && kategoriList.map((row,index) => 
            <option key={index} value={row.id}>{row.nama}</option>
          )}
        </select>
        <br />
        <input type='text' name='nama' placeholder='Nama' value={judul} onChange={(event) => setJudul(event.target.value)} required/>
        <br />
        <button type='submit'>Save</button>
      </form>

    </div>
  )
}
