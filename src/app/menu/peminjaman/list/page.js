'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function PeminjamanList() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [listData, setListData] = useState([])

  useEffect(() => {
    getData()
  }, []);

  async function getData() {
    //get user login session
    const session = await supabase.auth.getSession()
    const email = session?.data ? session.data.session.user.email : null

    const { data, error } = await supabase
      .from('peminjaman')
      .select('id, tanggal_pinjam, petugas!inner(id), anggota(nim, nama)')
      .eq('petugas.email', email)
      .order('tanggal_pinjam', {ascending:false})
    
    setListData(data)
  }

  //table column
  const tableColumn = [
    {
      title: 'Tanggal Pinjam',
      dataIndex: 'tanggal_pinjam',
      key: 'tanggal_pinjam'
    },
    {
      title: 'NIM',
      dataIndex: 'anggota',
      key: 'nim',
      render: (anggota) => anggota.nim
    },
    {
      title: 'Nama',
      dataIndex: 'anggota',
      key: 'nama',
      render: (anggota) => anggota.nama
    },
  ];
  

  return (
    <div>
      <h3>Peminjaman</h3>

      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => router.push('/menu/peminjaman/insert')}
      >
        Insert
      </Button>
      
      <Table columns={tableColumn} dataSource={listData} rowKey="id" />
    </div>
  )
}
