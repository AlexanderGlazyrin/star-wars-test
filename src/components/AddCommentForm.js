import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Row, Col, Modal} from 'antd';
import {Link, useParams, useHistory} from 'react-router-dom';
import {LoadingOutlined} from '@ant-design/icons';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 16},
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
  },
};

const AddCommentForm = () => {
  const {id} = useParams();
  const history = useHistory()
  const [filmName, setFilmName] = useState(null);
  const [showLoader, changeShowLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await (await fetch(`https://swapi.dev/api/films/${id}`)).json();
      setFilmName(response.title)
    }
    fetchData();
  }, [id])

  const info = (data) => {
    Modal.info({
      title: `Review about "${filmName}" successfully added`,
      content: (
        <div>
          <p>{`Name: ${data.name}`}</p>
          <p>{`Email: ${data.email}`}</p>
          <p>{`Review: ${data.review}`}</p>
        </div>
      ),
      onOk() {history.push('/')},
    });
  }

  const onFinish = values => {
    changeShowLoader(true)
    new Promise((resolve) => { setTimeout(resolve, 1000) })
      .then(() => {
        changeShowLoader(false)
        info(values.comment);
      })
  };

  return (
    <>
      <Row>
        <Col span={layout.wrapperCol} offset={4}>
          <Link to='/'>Home</Link>
          <h2>{filmName ? `Write a review about "${filmName}"` : null}</h2>
        </Col>
      </Row>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['comment', 'name']} label="Name" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['comment', 'email']} label="Email" rules={[{required: true, type: 'email'}]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['comment', 'review']} label="Review" rules={[{required: true}]}>
          <Input.TextArea/>
        </Form.Item>
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
          <Button type="primary" htmlType="submit">
            {showLoader ? <LoadingOutlined /> : null}
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCommentForm;
