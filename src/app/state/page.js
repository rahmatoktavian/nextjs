'use client'

//memanggil fungsi useState
import React, { useState } from 'react'

export default function Home() {
  //define state : format [namaState, fungsiUbahState] = useState(default value)
  const [number, setNumber] = useState(1)

  function incrementNumber() {
    //tambahkan state number yang ada + 1
    let newNumber = number + 1

    //ubah data state
    setNumber(newNumber)
  }

  return (
    <div>
      <h3>State</h3>

      <p>{number}</p>
      <button onClick={incrementNumber}>Tambah</button>
    </div>
  )
}