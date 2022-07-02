import React from 'react'
import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody } from '@material-ui/core'
import ProductItem from './OrderItem'
import IOrder from '../IOrder'

interface OrdersListProps {
    items: IOrder[],
}

export default function index ({ items }: OrdersListProps) {
  return (
        <TableContainer>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>مشتری</TableCell>
                        <TableCell> قیمت </TableCell>
                        <TableCell> تعداد آیتم ها </TableCell>
                        <TableCell> ایجاد </TableCell>
                        <TableCell> به روز رسانی </TableCell>
                        <TableCell> وضعیت </TableCell>
                        <TableCell> عملیات </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items.map((item: IOrder) => <ProductItem key={item.id} {...item} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
  )
}
