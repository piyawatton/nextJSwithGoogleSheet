import React from 'react';
import { Card, Col, Row, Input, Switch, Checkbox, Button, Modal, Tag, Spin, Divider } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { getHouses, HousePayload, toggleAllowedHouse, toggleCheckHouse, toggleEmptyHouse } from './services';
import { InfoOutlined } from '@ant-design/icons';
const { Search } = Input
function App() {
  const [houseList, setHouseList] = React.useState<HousePayload[]>([]);
  const [textSearch, setTextSearch] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isSetting, setIsSetting] = React.useState<boolean>(false)

  const [overview, setOverview] = React.useState({
    totalChecked: 0,
    totalEmpty: 0,
    totalNotAllow: 0,
  })

  const doCallGetHouse = async () => {
    setIsLoading(true)
    const response = await getHouses()
    setHouseList(response)
    setOverview({
      totalChecked: response.filter((_h) => _h.checked === 1).length,
      totalEmpty: response.filter((_h) => _h.isEmpty === 1).length,
      totalNotAllow: response.filter((_h) => _h.allowed !== 1).length,
    })
    setIsLoading(false)
  }

  React.useEffect(() => {
    doCallGetHouse()
  }, []);

  const filterHouse = (house: HousePayload) => {
    if (textSearch === '') return true
    return `${house.houseNumber}`.indexOf(textSearch) !== -1
  }

  const callToggleCheckHouse = async (house: HousePayload) => {
    setIsLoading(true)
    await toggleCheckHouse(house.id)
    await doCallGetHouse()
    setIsLoading(false)
  }

  const callToggleEmptyHouse = async (house: HousePayload) => {
    setIsLoading(true)
    await toggleEmptyHouse(house.id)
    await doCallGetHouse()
    setIsLoading(false)
  }

  const callToggleAllowedHouse = async (house: HousePayload) => {
    setIsLoading(true)
    await toggleAllowedHouse(house.id)
    await doCallGetHouse()
    setIsLoading(false)
  }

  return (
    <div className="App">
      <div>
        <div style={{
          padding: '20px 0px',
          position: 'fixed',
          top: 0, right: 0, left: 0,
          zIndex: 1000,
          background: 'white'
        }}>
          <Search size='large' allowClear onSearch={(value) => { setTextSearch(value) }} />
          <br />
          <h2 style={{ margin: 0 }}>
            เปรมประชา ซีซั่น
          </h2>
        </div>
        <Spin spinning={isLoading}>
          <Row gutter={[16, 16]} style={{ marginTop: 100 }}>
            {houseList.filter(filterHouse).map((house) => {
              return (
                <Col span={12} md={8}>
                  <Card>
                    <div style={{ fontSize: '1.2rem' }}>
                      บ้านเลขที่ {house.houseNumber}
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <Switch
                        style={{ transform: 'scale(1.4)' }}
                        checkedChildren="ได้ข้อมูลแล้ว" unCheckedChildren="ยังไม่ได้ทำ"
                        checked={house.checked === 1}
                        onChange={(checked) => { callToggleCheckHouse(house) }}
                      />
                    </div>
                    <div style={{ marginTop: 25 }}>
                      <Checkbox
                        style={{ transform: 'scale(1.3)' }}
                        checked={house.isEmpty === 1}
                        onChange={() => { callToggleEmptyHouse(house) }}
                      >
                        ไม่มีคนอยู่
                      </Checkbox>
                    </div>
                    <div style={{ marginTop: 25 }}>
                      <Checkbox
                        style={{ transform: 'scale(1.3)' }}
                        checked={house.allowed !== 1}
                        onChange={() => { callToggleAllowedHouse(house) }}
                      >
                        ไม่สะดวกให้ข้อมูล
                      </Checkbox>
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Spin>
      </div>
      <Button shape='circle' size='large' type='primary'
        onClick={() => { setIsSetting(true) }}
        style={{
          padding: 5,
          position: 'fixed',
          bottom: 0,
          right: 0,
          transform: 'translate(-100%,-200%) scale(1.4)',
        }} >
        <InfoOutlined />
      </Button>
      <Modal centered visible={isSetting} onCancel={() => { setIsSetting(false) }} footer={null} >
        <Row gutter={[16, 16]}>
          <Col span={12} style={{ textAlign: 'right' }}>ได้ข้อมูลแล้ว</Col>
          <Col span={12}>{overview.totalChecked}/{houseList.length}</Col>
          <Col span={12} style={{ textAlign: 'right' }}>ไม่มีคนอยู่</Col>
          <Col span={12}>{overview.totalEmpty}/{houseList.length}</Col>
          <Col span={12} style={{ textAlign: 'right' }}>ไม่สะดวกให้ข้อมูล</Col>
          <Col span={12}>{overview.totalNotAllow}/{houseList.length}</Col>
          <Divider />
          <Col span={24} style={{ textAlign: 'center' }}>บ้านที่ยังไม่ได้ทำ</Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            {houseList.filter((house) => house.checked !== 1).map((house) => <Tag>{house.houseNumber}</Tag>)}
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default App;
