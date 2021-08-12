//add form component renderer
import React, { useState } from "react";
import Nav from "../Header/Header";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ProductForm from "../add-product/AddProduct";
import MachineFrom from "../add-machine/AddMachine";
import MaterialFrom from "../add-material/AddMaterial";
import AssignFrom from "../orders/GenerateOrderForm";
const AddForm = () => {
  const [form, setForm] = useState(0);
  return (
    <div>
      <Nav></Nav>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className='mt-3 d-flex justify-content-between align-items-center'>
              <input
                type='radio'
                name='form'
                checked={form === 0 && true}
                onChange={() => setForm(0)}
              />
              <label>Add Product</label>
              <input
                type='radio'
                name='form'
                checked={form === 1 && true}
                onChange={() => setForm(1)}
              />
              <label>Add Machine</label>
              <input
                type='radio'
                name='form'
                checked={form === 2 && true}
                onChange={() => setForm(2)}
              />
              <label>Add Raw Material</label>
              <input
                type='radio'
                checked={form === 3 && true}
                name='form'
                onChange={() => setForm(3)}
              />
              <label>Assign Order</label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {form == 0 ? (
              <ProductForm></ProductForm>
            ) : form == 1 ? (
              <MachineFrom></MachineFrom>
            ) : form == 2 ? (
              <MaterialFrom></MaterialFrom>
            ) : form == 3 ? (
              <AssignFrom></AssignFrom>
            ) : (
              <ProductForm></ProductForm>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddForm;
