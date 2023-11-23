'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Upload, Button, Image, notification, Popconfirm } from 'antd';
import { ArrowLeftOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';

//memanggil supabase
import { supabase } from '../../../supabase'

export default function KategoriUpload() {
  const router = useRouter()

  //param
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  //state
  const [cover, setCover] = useState(null)

  //first time running
  useEffect(() => {
    getData()
  }, []);

  //get data based on id
  async function getData() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .select('id, cover')
      .eq('id', id)
      .single()
      
      setCover(data.cover);
  }

  async function uploadFile(event) {
    // get uploaded file
    const fileIndex = event.fileList.length - 1;
    const fileUpload = event.fileList[fileIndex].originFileObj;

    // create file name : timestamp + extension
    const fileExt = event.file.type.split('/');
    const fileName = Date.now()+'.'+fileExt[1];

    //file path
    const filePath = 'kategori/'+fileName;
    
    //upload file to storage
    const { data, error } = await supabase
      .storage
      .from('hmd')
      .upload(filePath, fileUpload, {
        cacheControl: '3600',
        upsert: false
      })

    if(error) {
      notification.error({ message:error.message, duration:1 });
    } else {
      //get file URL
      const { data:fileURL } = supabase
                  .storage
                  .from('hmd')
                  .getPublicUrl(filePath);
  
      //update cover URL into table
      await supabase
            .from('kategori_buku')
            .update({ cover:fileURL.publicUrl })
            .eq('id', id);
      
      //update state cover to display delete button
      setCover(fileURL.publicUrl);

      notification.success({ message:'Berhasil upload file', duration:1 });
    }
  };

  async function onDelete() {
    //get file name from cover state (URL)
    const fileCover = cover.split('/');
    const fileName = fileCover[9]
    
    //delete file from storage
    const { data, error } = await supabase
              .storage
              .from('hmd')
              .remove(['kategori/'+fileName])
              
      if(error) {
        notification.error({ message:error.message, duration:1 });

      } else {

        //update cover URL = null
        await supabase
          .from('kategori_buku')
          .update({ cover:null })
          .eq('id', id)
        
        //update state cover to hide delete button
        setCover(null);

        notification.success({ message:'Berhasil hapus data', duration:1 });
      }
  }

  return (
    <div>
      <h3>Update</h3>

      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => router.push('/7_upload/list')}
      >
        Back
      </Button>
      <br /><br />
      
      {/* delete file, display if file uploaded before */}
      {cover ?
      <>
        <Image
          src={cover}
          width={300}
          style={{marginTop:10, marginBottom:10}}
        />
        <br />

        <Popconfirm
          title="Delete File"
          description="Are you sure to delete this file?"
          onConfirm={onDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </>

      // cover not uploaded
      :
      <Upload 
        accept=".jpg, .jpeg, .png"
        onChange={uploadFile}
        showUploadList={false}
        beforeUpload={() => false}
      >
        <Button type='primary' icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      }

    </div>
  )
}
