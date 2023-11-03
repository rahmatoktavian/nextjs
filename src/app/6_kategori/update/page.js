'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Form, Input, Space, Button, notification, Popconfirm } from 'antd';
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';

//memanggil supabase
import { supabase } from '../../../supabase'

export default function KategoriUpdate() {
  const router = useRouter()

  //param
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  //form
  const [form] = Form.useForm();

  //first time running
  useEffect(() => {
    getData()
  }, []);

  //get data based on id
  async function getData() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .select('id, nama')
      .eq('id', id)
      .single()
      
      //isi form values dari db
      form.setFieldsValue({ nama: data.nama });
  }

  async function onFinish(values) {
    const { data, error } = await supabase
      .from('kategori_buku')
      //field db : values form (bukan state)
      .update({ nama: values.nama })
      .eq('id', id)
    
    if(error) {
      notification.error({ message:error.message, duration:1 });
    } else {
      notification.success({ message:'Berhasil ubah data', duration:1 });
    }
    router.push('/6_kategori/list/')
  };

  async function onDelete() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .delete()
      .eq('id', id)
    
    router.push('/6_kategori/list/')
  }

  return (
    <div>
      <h3>Update</h3>

      <Form
        name="form_insert"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
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
          <Space>

            {/* save */}
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              Save
            </Button>

            {/* delete */}
            <Popconfirm
              title="Delete Data"
              description="Are you sure to delete this data?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                type="default" 
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Popconfirm>

          </Space>
        </Form.Item>
      </Form>

    </div>
  )
}
