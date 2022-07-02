import React from 'react'
import IComment from '../IComment'
import { TableRow, TableCell } from '@material-ui/core'
import { toPersianNumber } from '../../../services/Lang'
import Status from '../Status'
import CommentStatus from '../CommentStatus'

export default function CommentItem (props: IComment) {
  return (
        <TableRow>
            <TableCell align="center">
                {`${props.user.firstName} ${props.user.lastName}`}
            </TableCell>
            <TableCell align="center">
                {props.title}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(props.createdAt)}
            </TableCell>
            <TableCell align="center">
                {props.isBuyer}
            </TableCell>
            <TableCell align="center">
                {props.adviceToBuy}
            </TableCell>
            <TableCell align="center">
                {<Status status={props.status as CommentStatus} />}
            </TableCell>
        </TableRow>
  )
}
