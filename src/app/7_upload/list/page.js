'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Table, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

//memanggil supabase
import { supabase } from '../../../supabase'

export default function KategoriList() {
  //routing
  const router = useRouter()

  //define state : format [namaState, fungsiUbahState] = useState(default [])
  const [listData, setListData] = useState([])

  //agar ketika screen diakses, langsung memanggil getdata
  useEffect(() => {
    getData()
  }, []);

  //cara akses api via libary supabase
  async function getData() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .select('id, nama')
      .order('id', {ascending:false})
    
    setListData(data)
  }

  //table column
  const tableColumn = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama'
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Button 
                      type="default" 
                      icon={<UploadOutlined />} 
                      onClick={() => router.push('/7_upload/upload?id='+id)}
                    >
                      Upload
                    </Button>
    },
  ];
  

  return (
    <div>
      <h3>List</h3>
      <Table columns={tableColumn} dataSource={listData} />
    </div>
  )
}
