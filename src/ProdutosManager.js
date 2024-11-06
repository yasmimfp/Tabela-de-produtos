import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Form, InputNumber, Layout } from 'antd';
import api from './api'; 
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

function ProdutoManager() {
  const [form] = Form.useForm();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/'); 
      setProdutos(response.data); 
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await api.post('/', values); 
      setProdutos([...produtos, response.data]); 
      form.resetFields(); 
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(`/${id}`); // Correção do uso de crase
      setProdutos(produtos.filter((produto) => produto.id !== id)); 
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome do Produto',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Preço de Custo',
      dataIndex: 'precoCusto',
      key: 'precoCusto',
    },
    {
      title: 'Preço de Venda',
      dataIndex: 'precoVenda',
      key: 'precoVenda',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
    {
      title: 'Ação',
      key: 'acao',
      render: (_, record) => (
        <Button type="link" onClick={() => handleRemove(record.id)} danger>
          Remover
        </Button>
      ),
    },
  ];

  return (
    <Layout
      style={{
        minHeight: '100vh',
        padding: '24px',
        backgroundImage: 'url("/imagens/grama.png")', // Caminho absoluto corrigido
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
      }}
    >
      <Header
        style={{
          backgroundColor: '#0458c4',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          borderRadius: '8px', 
          marginBottom: '20px', 
        }}
      >
        <h1 style={{ color: 'white', margin: 0 }}>Tabela de Produtos</h1>
      </Header>

      <Content style={{ marginTop: '24px' }}>
        <Form
          form={form}
          layout="inline"
          onFinish={onFinish}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <Form.Item
            name="nome"
            rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
          >
            <Input placeholder="Nome do Produto" />
          </Form.Item>
          <Form.Item
            name="precoCusto"
            rules={[{ required: true, message: 'Por favor, insira o preço de custo!' }]}
          >
            <InputNumber placeholder="Preço de Custo" min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="precoVenda"
            rules={[{ required: true, message: 'Por favor, insira o preço de venda!' }]}
          >
            <InputNumber placeholder="Preço de Venda" min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="quantidade"
            rules={[{ required: true, message: 'Por favor, insira a quantidade!' }]}
          >
            <InputNumber placeholder="Quantidade" min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>

        <Table
          dataSource={produtos}
          columns={columns}
          rowKey="id"
          pagination={false}
          style={{
            margin: '0 auto',
            maxWidth: '80%',
            backgroundColor: 'white',
            borderRadius: '8px', 
            overflow: 'hidden', 
            border: '2px solid white' 
          }}
        />
      </Content>
    </Layout>
  );
}

export default ProdutoManager;
