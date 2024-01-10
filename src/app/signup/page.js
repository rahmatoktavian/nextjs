'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Form, Button, Input, message } from 'antd';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Singup() {
  //supabase auth
  const supabase = createClientComponentClient()

  //route for page movemenet
  const router = useRouter();

  //form data
  const [form] = Form.useForm();

  //calling message library
  const [messageApi, messageApiDisplay] = message.useMessage();

  //login process
  const onSubmit = async(input) => {
    // signup
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    })

    const { data:anggota } = await supabase
      .from('anggota')
      .insert({ nim:input.nim, nama:input.nama, email:input.email })
      .select()

    //insert table user
    await supabase
      .from('user')
      .insert({ email:input.email, anggota_id:anggota[0].id })

    //display message
    if(error) {
      messageApi.error(error.message, 1);
    } else {
      messageApi.success('Berhasil Register', 3);
      router.push('/signin')
    }
  }

  return (
    <Row>
      {messageApiDisplay}

      <Col span={9}></Col>
      <Col span={6}>
        <Form
          name="signup"
          layout="vertical"
          onFinish={onSubmit}
          form={form}
          
        >
          <Form.Item 
            label="NIM" 
            name="nim"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Nama" 
            name="nama"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Email" 
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Password" 
            name="password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Register Anggota
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="default" block onClick={() => router.push('signin')}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={9}></Col>

    </Row>
  )
}