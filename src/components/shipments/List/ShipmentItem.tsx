import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { toPersianNumber } from '../../../services/Lang'
import Status from '../Status'
import ShipmentStatus from '../ShipmentStatus'
import IShipment from '../../shipments/IShipment'

export default function ShipmentItem (props: IShipment) {
  return (
        <TableRow>
            <TableCell align="center">
                {`${props.employee.firstName} ${props.employee.lastName}`}
            </TableCell>
            <TableCell align="center">
                {props.order.id}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(props.selectedDateTime)}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(props.deliveredAt)}
            </TableCell>
            <TableCell align="center">
                {<Status status={props.status as ShipmentStatus} />}
            </TableCell>
        </TableRow>
  )
}
