import React from 'react'
import { VariationItem } from './Variation'
import { ListItem, ListItemText } from '@material-ui/core'

export default function ColorItem ({ title, value }: VariationItem) {
  return (
    <ListItem>

      <ListItemText primary={title} />

      <div style={{
        width: '50px',
        height: '50px',
        backgroundColor: value
      }}
      >
      </div>

    </ListItem>
  )
}
