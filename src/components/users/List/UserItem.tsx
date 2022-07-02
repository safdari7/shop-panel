import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { toPersianNumber } from '../../../services/Lang'
import IUser from '../IUser'

export default function UserItem (props: IUser) {
  return (
        <TableRow>
            <TableCell align="center">
                {`${props.firstName} ${props.lastName}`}
            </TableCell>
            <TableCell align="center">
                {props.email}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(props.mobile)}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(props.createdAt)}
            </TableCell>
        </TableRow>
  )
}
