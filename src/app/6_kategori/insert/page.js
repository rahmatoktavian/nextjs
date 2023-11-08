'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Form, Input, Button, notification } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

//memanggil supabase
import { supabase } from '../../../supabase'

export default function KategoriInsert() {
  const router = useRouter()

  async function onFinish(values) {
    const { data, error } = await supabase
      .from('kategori_buku')
      //field db : values form (bukan state)
      .insert({ nama: values.nama })
    
    if(error) {
      notification.error({ message:error.message, duration:1 });
    } else {
      notification.success({ message:'Berhasil tambah data', duration:1 });
    }
    router.push('/6_kategori/list/')
  };

  return (
    <div>
      <h3>Insert</h3>

      <Form
        name="form_insert"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Nama"
          name="nama"
          rules={[
            {
              required: true,
              message: 'Please input nama!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          {/* save */}
          <Button 
            type="primary" 
            htmlType="submit"
            icon={<SaveOutlined />}
          >
            Save
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}
