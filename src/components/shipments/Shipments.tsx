import React from 'react'
import Content from '../partials/Content'
import IShipment from './IShipment'
import ShipmentsList from './List'
import HttpService from '../../services/Http'

export default function Shipments () {
  const httpService = React.useMemo(() => (new HttpService()), [])
  const [shipments, setShipments] = React.useState<IShipment[]>([])

  React.useEffect(() => {
    const fetchShipments = () => {
      httpService.get<IShipment[]>('/api/v1/shipments')
        .then(response => setShipments(response.data))
        .catch(error => console.log(error))
    }

    fetchShipments()
  }, [])

  return (
    <Content title="لیست مرسوله ها">
      <ShipmentsList items={shipments} />
    </Content>
  )
}
