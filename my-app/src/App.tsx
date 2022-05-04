import React from 'react';
import { Card, Col, Row, Input, Switch, Button, Modal, Form, Space } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { getHouses, HousePayload } from './services';
const { Search } = Input
function App() {
  const [houseList, setHouseList] = React.useState<HousePayload[]>([]);
  const [textSearch, setTextSearch] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isCreating, setIsCreateing] = React.useState<boolean>(false)

  const doCallGetHouse = async () => {
    const response = await getHouses()
    setHouseList(response)
  }

  React.useEffect(() => {
    doCallGetHouse()
  }, []);

  const filterHouse = (house: HousePayload) => {
    if (textSearch === '') return true
    return `${house.houseNumber}`.indexOf(textSearch) !== -1
  }

  return (
    <div className="App">
      <div>
        <div style={{ margin: '20px 0px' }}>
          <Search size='large' allowClear onSearch={(value) => { setTextSearch(value) }} />
        </div>
        <Row gutter={[16, 16]}>
          {houseList.filter(filterHouse).map((house) => {
            return (
              <Col span={12}>
                <Card>
                  <div style={{ fontSize: '1.2rem' }}>
                    บ้านเลขที่ {house.houseNumber}
                  </div>
                  <div style={{ margin: 20 }}>
                    <Switch
                      style={{ transform: 'scale(1.4)' }}
                      checkedChildren="ตรวจแล้ว" unCheckedChildren="ยังไม่ตรวจ"
                      checked={house.checked === 1} />
                  </div>
                  <div>
                    <Switch
                      style={{ transform: 'scale(1.4)' }}
                      checkedChildren="มีคนอยู่" unCheckedChildren="ไม่มีคนอยู่"
                      checked={house.isEmpty === 1} />
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
      {/* <Button shape='circle' size='large' type='primary'
        onClick={() => { setIsCreateing(true) }}
        style={{
          padding: 5,
          position: 'fixed',
          bottom: 0,
          right: 0,
          transform: 'translate(-100%,-100%) scale(1.4)',
        }} >
        เพิ่ม
      </Button> */}
      <Modal visible={isCreating} onCancel={() => { setIsCreateing(false) }}>
        <Form>
          <Form.Item>
            <Space>
              บ้านเลขที่
              <Input />
            </Space>
          </Form.Item>
          <Form.Item>
            <Space>
              <Switch
                style={{ transform: 'scale(1.4)' }}
                checkedChildren="ตรวจแล้ว" unCheckedChildren="ยังไม่ตรวจ"
              />
            </Space>
          </Form.Item>
          <Form.Item>
            <Switch
              style={{ transform: 'scale(1.4)' }}
              checkedChildren="มีคนอยู่" unCheckedChildren="ไม่มีคนอยู่"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
