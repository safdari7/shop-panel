import React from 'react'
import Content from '../partials/Content'
import IPayment from './IPayment'
import PaymentsList from './List'
import HttpService from '../../services/Http'

export default function Payments () {
  const httpService = React.useMemo(() => (new HttpService()), [])
  const [payments, setPayments] = React.useState<IPayment[]>([])

  React.useEffect(() => {
    const fetchPayments = () => {
      httpService.get<IPayment[]>('/api/v1/admin/payments')
        .then(response => setPayments(response.data))
    }

    fetchPayments()
  }, [])

  return (
    <Content title="لیست پرداخت ها">
      <PaymentsList items={payments} />
    </Content>
  )
}
