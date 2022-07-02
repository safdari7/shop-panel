import React from 'react'
import { Route, Switch } from 'react-router'
import EditCategory from '../components/categories/EditCategory'
import Categories from '../components/categories/Categories'
import EditProduct from '../components/products/EditProduct'
import Products from '../components/products/Products'
import Orders from '../components/orders/Orders'
import OrderDetails from '../components/orders/OrderDetails'
import Payments from '../components/payments/Payments'
import Coupons from '../components/coupons/Coupons'
import NewCoupon from '../components/coupons/NewCoupon'
import Shipments from '../components/shipments/Shipments'
import Users from '../components/users/Users'
import Comments from '../components/comments/Comments'
import Settings from '../components/settings/Settings'
import NewSetting from '../components/settings/NewSetting'

interface RouteItem {
  path: string,
  component: any
}

const routes: RouteItem[] = [
  {
    path: '/categories/edit',
    component: EditCategory
  },
  {
    path: '/categories',
    component: Categories
  },
  {
    path: '/products/edit',
    component: EditProduct
  },
  {
    path: '/products',
    component: Products
  },
  {
    path: '/orders',
    component: Orders
  },
  {
    path: '/orders/:orderID',
    component: OrderDetails
  },
  {
    path: '/payments',
    component: Payments
  },
  {
    path: '/coupons',
    component: Coupons
  },
  {
    path: '/coupons/new',
    component: NewCoupon
  },
  {
    path: '/shipments',
    component: Shipments
  },
  {
    path: '/users',
    component: Users
  },
  {
    path: '/comments',
    component: Comments
  },
  {
    path: '/settings',
    component: Settings
  },
  {
    path: '/settings/new',
    component: NewSetting
  }

]

export default function RenderRoutes () {
  return (
    <Switch>
      {
        routes.map((route: RouteItem, index) => {
          return <Route exact key={index} path={route.path} component={route.component} />
        })
      }
    </Switch>
  )
}
