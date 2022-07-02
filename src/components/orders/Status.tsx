import { Chip } from '@material-ui/core'
import React from 'react'
import OrderStatus from './OrderStatus'

interface statusProps {
  status: OrderStatus
}

function Status ({ status }: statusProps) {
  return (
    <>
      {status === OrderStatus.PENDING && <Chip style={{ backgroundColor: '#ff9800' }} label='ثبت اولیه' />}
      {status === OrderStatus.CANCELED && <Chip style={{ backgroundColor: '#f44336' }} label='لغو شده' />}
      {status === OrderStatus.DELIVERED && <Chip style={{ backgroundColor: '#4caf50' }} label='تحویل شده' />}
      {status === OrderStatus.PAID_IN_PROGRESS && <Chip style={{ backgroundColor: '#4caf50' }} label='پرداخت شده' />}
      {status === OrderStatus.REFUNDED && <Chip style={{ backgroundColor: '#f44336' }} label='مرجوع شده' />}

    </>
  )
}

export default React.memo(Status)
