import React from 'react'
import IUser from '../IUser'
import UserItem from './UserItem'
import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody } from '@material-ui/core'

interface UsersProps {
  items: IUser[]
}

export default function UsersList ({ items }: UsersProps) {
  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell align="center">نام و نام خانوادگی</TableCell>
            <TableCell align="center"> ایمیل </TableCell>
            <TableCell align="center">موبایل</TableCell>
            <TableCell align="center"> ثبت نام </TableCell>
            <TableCell align="center"> عملیات </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            items.map((item: IUser) => <UserItem key={item.id} {...item} />)
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
