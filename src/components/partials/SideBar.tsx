import React from 'react'
import { Divider, List, Paper } from '@material-ui/core'
import Products from '../menu/products/Products'
import Orders from '../menu/orders/Orders'
import Finance from '../menu/finance/Finance'
import Customers from '../menu/customers/Customers'
import FeedBack from '../menu/feedbacks/Feedback'
import Settings from '../menu/settings/Settings'
import Shipment from '../menu/shipment/Shipment'

export default function SideBar () {
  return (
    <Paper elevation={0}>
      <List component="nav">
        <Products />
        <Divider />
        <Orders />
        <Divider />
        <Finance />
        <Divider />
        <Shipment />
        <Divider />
        <Customers />
        <Divider />
        <FeedBack />
        <Divider />
        <Settings />
      </List>
    </Paper>
  )
}
