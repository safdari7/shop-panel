import React from 'react'
import Content from '../partials/Content'
import { useParams } from 'react-router-dom'
import HttpService from '../../services/Http'
import { Typography, Divider, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, Grid, FormControl, InputLabel, Select, MenuItem, Button }
  from '@material-ui/core'
import IOrder from './IOrder'
import IOrderLine from './IOrderLine'
import OrderStatus from './OrderStatus'

interface IOrderIDI {
  orderID: string
}

export default function OrderDetails () {
  const { orderID } = useParams<IOrderIDI>()

  const [order, setOrder] = React.useState<IOrder | null>(null)
  const httpService = React.useMemo(() => (new HttpService()), [])
  const [orderStatus, setOrderStatus] = React.useState<OrderStatus>(order?.status!)

  React.useEffect(() => {
    document.title = 'جزئیات سفارش'

    const fetchOrder = () => {
      httpService.get<IOrder>(`/api/v1/admin/orders/${orderID}`)
        .then(response => {
          setOrder(response.data as IOrder)
        })
        .catch(error => {
          console.log(error)
        })
    }
    fetchOrder()
  }, [orderID])

  const getFinalPrice = (orderLine: IOrderLine): number => {
    if (orderLine.discountedPrice) {
      return orderLine.discountedPrice * orderLine.count
    }
    return orderLine.price * orderLine.count
  }

  const changeOrderStatus = (e: React.ChangeEvent<{ value: unknown }>) => {
    setOrderStatus(e.target.value as OrderStatus)
  }

  const updateOrderStatus = () => {
    httpService.patch<{ code: string, status: boolean, message: string }>(`/api/v1/admin/orders/${orderID}`, { orderStatus })
      .catch(error => { alert(error.response.data.message) })
  }

  return (
    <Content title="جزئیات سفارش">

      <Typography component="h6">مشخصات مشتری</Typography>

      <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />

      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>نام </TableCell>
              <TableCell> نام خانوادگی </TableCell>
              <TableCell> آدرس ایمیل </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{order?.user.firstName}</TableCell>
              <TableCell> {order?.user.lastName} </TableCell>
              <TableCell> {order?.user.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography style={{ marginTop: '30px' }} component="h6">
        اقلام سفارش
      </Typography>

      <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />

      <TableContainer>
        <Table size="medium">

          <TableHead>
            <TableRow>
              <TableCell>عنوان محصول </TableCell>
              <TableCell> قیمت  </TableCell>
              <TableCell> قیمت با تخفیف  </TableCell>
              <TableCell> تعداد </TableCell>
              <TableCell> قیمت کل </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              order?.orderLines.map((orderLine: IOrderLine, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{orderLine.product.title}</TableCell>
                    <TableCell> {orderLine.price}  </TableCell>
                    <TableCell> {orderLine.discountedPrice} </TableCell>
                    <TableCell> {orderLine.count} </TableCell>
                    <TableCell> {getFinalPrice(orderLine)} </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>

        </Table>
      </TableContainer>

      <Grid container>
        <Grid item>
          <FormControl>

            <InputLabel id="order-status">وضعیت سفارش</InputLabel>

            <Select
              style={{ minWidth: '200px' }}
              labelId="order-status"
              id="order-status"
              value={order?.status}
              onChange={changeOrderStatus}
            >
              <MenuItem value={OrderStatus.PENDING}>در حال بررسی</MenuItem>
              <MenuItem value={OrderStatus.PAID_IN_PROGRESS}>پرداخت شده</MenuItem>
              <MenuItem value={OrderStatus.DELIVERED}>تحویل شده</MenuItem>
              <MenuItem value={OrderStatus.CANCELED}>لغو شده</MenuItem>
              <MenuItem value={OrderStatus.REFUNDED}>مرجوع شده</MenuItem>

            </Select>

          </FormControl>

          <FormControl>
            <Button
              onClick={updateOrderStatus}
              variant="contained"
              color="primary">
              به روز رسانی وضعیت
            </Button>
          </FormControl>

        </Grid>
      </Grid>
    </Content>
  )
}
