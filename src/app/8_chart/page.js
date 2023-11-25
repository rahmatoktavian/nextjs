'use client'

import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { supabase } from '../../supabase';

export default function Chart() {
  //data state
  const [data, setData] = useState ([]);

  //initial function (first function will run in this page)
  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    //calling stored procedure (rpc)
    const { data:dataView, error } = await supabase.from('kategori_view').select('nama, buku_total');
    
    //set state chartdata
    setData(dataView);
  }

  // chart config
  const config = {
    // chart data
    data,
    appendPadding: 10,
    angleField: 'buku_total',
    colorField: 'nama',
    radius: 0.9,
  };

  //display data
  return (
    <>
      <Pie {...config} />
    </>
  )
}
