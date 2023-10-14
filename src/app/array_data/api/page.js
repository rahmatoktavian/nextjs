'use client'

//memanggil fungsi useState
import React, { useState } from 'react'

export default function ArrayAPI() {
  //define state : format [namaState, fungsiUbahState] = useState(default [])
  const [listData, setListData] = useState([])

  //function get data from API
  function getData() {
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then(response => response.json())
      //data dari api dimasukan ke state
      .then(json => setListData(json))
  }

  return (
    <div>
      <h3>Array API</h3>

      {/* tombol untuk panggil function getdata API */}
      <button onClick={getData}>Display Data</button>
      <br /><br />

      {/* display if listData not null */}
      {listData.length > 0 &&
        <table border='1'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
          </tr>
          {/* looping data state dari API */}
          {listData.map(row => 
            <tr>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.address.city}</td>
            </tr>
          )}
        </table>
      }

    </div>
  )
}
