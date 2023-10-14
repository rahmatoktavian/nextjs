'use client'

//memanggil fungsi useState
import React, { useState } from 'react'

export default function ArrayStandard() {
  
  //array javascript static
  const data = [
    { id:1, name:'Loki' },
    { id:2, name:'Hulk' },
    { id:3, name:'Iron Man' },
  ]

  //define state : format [namaState, fungsiUbahState] = useState(default value)
  const [listData, setListData] = useState(data)

  return (
    <div>
      <h3>Array</h3>

      <ul>
      {listData.map(row => 
        <li>Name : {row.name}</li>
      )}
      </ul>

      <table border='1'>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
        {listData.map(row => 
          <tr>
            <td>{row.id}</td>
            <td>{row.name}</td>
          </tr>
        )}
      </table>
    </div>
  )
}
