'use client'

import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { supabase } from '../../supabase';

//export excel
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default function LaporanDetail() {
  //data state
  const [listData, setListData] = useState([]);

  //initial function (first function will run in this page)
  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    const { data, error } = await supabase
      .from('kategori_buku')
      .select('id, nama')
      .order('id', {ascending:true})

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
      <Table columns={tableColumn} dataSource={listData} />
      <Button type="primary" onClick={() => exportExcel()} icon={<DownloadOutlined />} style={{backgroundColor:'green'}}> Excel</Button>
    </>
  )
}
