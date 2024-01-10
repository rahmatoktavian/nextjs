'use client'

import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

//export excel
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default function LaporanDetail() {
  const supabase = createClientComponentClient()
  
  //state for table
  const [listData, setListData] = useState([]);

  //state for searching
  const [searchNama, setSearchNama] = useState('');

  //initial function (first function will run in this page)
  useEffect(() => {
    getData();

  // state searchNama diletakan disini agar setiap ada perubahan data memanggil getData
  }, [searchNama]);

  const getData = async() => {
    let query = supabase
    .from('kategori_buku')
    .select('id, nama')
    .order('id', {ascending:true})

    //if searchNam tidak kosong, maka query ditambahkan where like
    if(searchNama) {
      query = query.ilike('nama', '%'+searchNama+'%')
    }

    //execute query
    const { data, error } = await query

    setListData(data)
  }

  //list of table column
  const tableColumn = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama'
    },
  ];

  //export excel
  const exportExcel = () => {
    let exportData = []

    //arrange export data based on table data state
    listData.map(row =>
      exportData.push({
        "ID": row.id,
        "Nama": row.nama,
      })
    )

    //export excel setting
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    FileSaver.saveAs(data, 'kategori_buku.xlsx');
  };


  //display data
  return (
    <>
      <Input 
        prefix={<SearchOutlined />}
        placeholder="Cari Nama" 
        onChange={(event) => setSearchNama(event.target.value)} 
        style={{width:250}}
      />

      <Table columns={tableColumn} dataSource={listData} rowKey="id" />
      <Button type="primary" onClick={() => exportExcel()} icon={<DownloadOutlined />} style={{backgroundColor:'green'}}> Excel</Button>
    </>
  )
}
