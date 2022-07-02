import React from 'react'
import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody } from '@material-ui/core'
import IPayment from '../IPayment'
import PaymentItem from './PaymentItem'

interface PaymentsListProps {
    items: IPayment[]
}

export default function PaymentsList ({ items }: PaymentsListProps) {
  return (
        <TableContainer>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>مشتری</TableCell>
                        <TableCell> سفارش </TableCell>
                        <TableCell> مبلغ </TableCell>
                        <TableCell> پرداخت </TableCell>
                        <TableCell> ایجاد </TableCell>
                        <TableCell> به روز رسانی </TableCell>
                        <TableCell> وضعیت </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items.map((item: IPayment) => <PaymentItem key={item.id} {...item} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
  )
}
