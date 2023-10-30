'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

//memanggil supabase
import { supabase } from '../../../supabase'

export default function ManyUpdate() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  //state untuk isi dropdown (selectbox)
  const [kategoriList, setKategoriList] = useState([])

  const [kategoriID, setKategoriID] = useState('')
  const [judul, setJudul] = useState('')

  //first time running
  useEffect(() => {
    getData()
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

  //get data based on id
  async function getData() {
    const { data, error } = await supabase
      .from('buku')
      .select('id, kategori_id, judul')
      .eq('id', id)
      .single()
      
      //isi state nama dari db
      setKategoriID(data.kategori_id)
      setJudul(data.judul)
  }

  //update data ke supabase
  async function onSubmit(event) {
    event.preventDefault()
    
    const { data, error } = await supabase
      .from('buku')
      .update({ kategori_id:kategoriID, judul:judul })
      .eq('id', id)
    
    router.push('/5_1many/list/')
  }

  async function onDelete() {
    const { data, error } = await supabase
      .from('buku')
      .delete()
      .eq('id', id)
    
    router.push('/5_1many/list/')
  }

  return (
    <div>
      <h3>Update</h3>

      {/* display if listData not null */}
      <form onSubmit={onSubmit}>
        {/* onchange : isi state nama sesuai input */}
        <select 
          name='kategorID' 
          onChange={(event) => setKategoriID(event.target.value)} 
          value={kategoriID}
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
        <button type='button' onClick={onDelete}>Delete</button>
      </form>

    </div>
  )
}
