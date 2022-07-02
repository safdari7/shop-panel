import React from 'react'
import { VariationItem } from './Variation'
import { ListItem, ListItemText } from '@material-ui/core'

export default function DropDownItem ({ title, value }: VariationItem) {
  return (
    <ListItem>
      <ListItemText primary={title} secondary={value} />
    </ListItem>
  )
}
