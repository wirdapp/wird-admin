import React from 'react';
import Container from './loder.styles';
import { Spin } from 'antd';

export default function Loader() {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
}
