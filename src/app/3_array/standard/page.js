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

  //array ditaruh di state
  const [listData, setListData] = useState(data)
  
  return (
    <div>
      <h3>Array</h3>

      <ul>
      {/* looping data state listData */}
      {listData.map(row => 
        // display data array
        <li>Name : {row.id}</li>
      )}
      </ul>

      <table border='1'>
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {listData.map(row => 
          <tr>
            <td>{row.id}</td>
            <td>{row.name}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}
