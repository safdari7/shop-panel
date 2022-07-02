import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import ISetting from '../ISetting'
import Scope from '../Scope'

export default function SettingItem (props: ISetting) {
  return (
        <TableRow>
            <TableCell align="center">
                {props.title}
            </TableCell>
            <TableCell align="center">
                {props.settingKey}
            </TableCell>
            <TableCell align="center">
                {props.settingValue}
            </TableCell>
            <TableCell align="center">
                <Scope value={props.scope} />
            </TableCell>
            <TableCell align="center">
                {props.version}
            </TableCell>
        </TableRow>
  )
}
