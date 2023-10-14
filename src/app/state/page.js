'use client'

//memanggil fungsi useState
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function State() {
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

      <button onClick={incrementNumber}>Tambah</button>
      
      <p>State : {number}</p>
    </div>
  )
}
