'use client'

//memanggil fungsi useState
import React, { useState, useEffect } from 'react'

//memanggil supabase
import { supabase } from '../../../supabase'

export default function CRUDList() {
  //define state : format [namaState, fungsiUbahState] = useState(default [])
  const [listData, setListData] = useState([])

  //agar ketika screen diakses, langsung memanggil getdata
  useEffect(() => {
    getData2()
  }, []);

  //function get data from API
  async function getData() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .select('id,nama')

    setListData(data)
  }

  function getData2() {
    fetch('https://cdjndiwlkguoekmsamkv.supabase.co/rest/v1/kategori_buku?select=id,nama', {
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkam5kaXdsa2d1b2VrbXNhbWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTczNjI1NTIsImV4cCI6MTk3MjkzODU1Mn0.fZzlfdwRpKp5e3nkw-8FrmSGYJyejnz5Dlh_21o-MW4',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkam5kaXdsa2d1b2VrbXNhbWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTczNjI1NTIsImV4cCI6MTk3MjkzODU1Mn0.fZzlfdwRpKp5e3nkw-8FrmSGYJyejnz5Dlh_21o-MW4'
      }
    })
      .then(response => response.json())
      .then(data => setListData(data))
  }

  return (
    <div>
      <h3>Array API</h3>

      {/* display if listData not null */}
      {listData.length > 0 &&
        <table border='1'>
          <tr>
            <th>ID</th>
            <th>Nama</th>
          </tr>
          {listData.map(row => 
            <tr>
              <td>{row.id}</td>
              <td>{row.nama}</td>
            </tr>
          )}
        </table>
      }

    </div>
  )
}
