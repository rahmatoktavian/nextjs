'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

//memanggil supabase
import { supabase } from '../../../supabase'

export default function ManyList() {
  //define state : format [namaState, fungsiUbahState] = useState(default [])
  const [listData, setListData] = useState([])

  //agar ketika screen diakses, langsung memanggil getdata
  useEffect(() => {
    getData()
  }, []);

  //cara akses api via libary supabase
  async function getData() {
    const { data, error } = await supabase
      .from('buku')
      .select('id, judul, kategori_buku(nama)')
      .order('id', {ascending:false})
    
    setListData(data)
  }

  return (
    <div>
      <h3>List</h3>

      <Link href='/5_1many/insert'>Insert</Link>
      <br />

      {/* display if listData not null */}
      <table border='1'>
        <thead>
        <tr>
          <th>Judul</th>
          <th>Kategori</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {listData && listData.map((row,index) => 
          <tr key={index}>
            <td>{row.judul}</td>
            <td>{row.kategori_buku.nama}</td>
            <td><Link href={{ pathname:'/5_1many/update', query:{ id:row.id } }}>Update</Link></td>
          </tr>
        )}
        </tbody>
      </table>

    </div>
  )
}
