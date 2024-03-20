'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Table } from 'antd';

export default function PeminjamanSaya() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [listData, setListData] = useState([])

  useEffect(() => {
    getDataRealtime()
    getData()
  }, []);

  async function getData() {
    //get user login session
    const session = await supabase.auth.getSession()
    const email = session?.data ? session.data.session.user.email : null

     const { data, error } = await supabase
      .from('peminjaman')
      .select('id, tanggal_pinjam, anggota!inner(nim, nama), petugas(nama)')
      .eq('anggota.email', email)
      .order('tanggal_pinjam', {ascending:false})
    
    setListData(data)
  }

  async function getDataRealtime() {
    const taskListener = supabase
      .channel('room1')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'peminjaman' }, payload => {
        console.log('Change received!', payload)
        getData()
      })
      .subscribe()

      // return taskListener.unsubscribe();
  }

  //table column
  const tableColumn = [
    {
      title: 'Tanggal Pinjam',
      dataIndex: 'tanggal_pinjam',
      key: 'tanggal_pinjam'
    },
    {
      title: 'Petugas',
      dataIndex: 'petugas',
      key: 'petugas',
      render: (petugas) => petugas.nama
    },
  ];
  

  return (
    <div>
      <h3>Peminjaman Saya</h3>
      
      <Table columns={tableColumn} dataSource={listData} rowKey="id" />
    </div>
  )
}
