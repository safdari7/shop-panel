import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { toPersianNumber } from '../../../services/Lang'
import ICoupon from '../ICoupon'
import Status from '../Status'
import CouponStatus from '../CouponStatus'

export default function CouponItem (props: ICoupon) {
  return (
        <TableRow>
            <TableCell align="center">
                {props.code}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(props.percent)} %
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(props.limit)}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(props.expiresAt as unknown as string)}
            </TableCell>
            <TableCell align="center">
                {<Status status={props.status as CouponStatus} />}
            </TableCell>
        </TableRow>
  )
}
