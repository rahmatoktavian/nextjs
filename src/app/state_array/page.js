'use client'

//memanggil fungsi useState
import React, { useState } from 'react'

export default function StateArray() {
  const data = [
    { id:1, nama:'Loki' },
    { id:2, nama:'Hulk' },
    { id:3, nama:'Iron Man' },
  ]
  //define state : format [namaState, fungsiUbahState] = useState(default value)
  const [listData, setListData] = useState(data)

  return (
    <div>
      <h3>State Array</h3>

      <ul>
      {listData.map(row => 
        <li>ID: {row.id}</li>
      )}
      </ul>

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
    </div>
  )
}
