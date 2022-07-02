import React, { useEffect, useState, useMemo } from 'react'
import Content from '../partials/Content'
import SkeletonTable from '../utils/SkeletonTable'
import HttpService from '../../services/Http'
import { Color } from '@material-ui/lab/Alert'
import Notify from '../partials/Notify'
import ProductsList from './list'
import IProduct from './IProduct'

interface notifyState {
  open: boolean
  message: string
  type: Color
}

export default function Products () {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [notifyState, setNotifyState] = useState<notifyState>({
    open: false,
    message: '',
    type: 'success'
  })

  const httpService = useMemo(() => (new HttpService()), [])

  useEffect(() => {
    const fetchProducts = () => {
      httpService.get<IProduct[]>('/api/v1/admin/products')
        .then(response => {
          setProducts(response.data)
          setIsLoading(false)
        })
        .catch(() => {
          setNotifyState({
            open: true,
            message: 'دریافت لیست محصولات با خطا مواجه شد',
            type: 'error'
          })
        })
    }

    fetchProducts()
  }, [])

  return (
    <Content title="لیست محصولات">

      <Notify {...notifyState} />

      {isLoading && <SkeletonTable />}

      {!isLoading && <ProductsList items={products} />}

    </Content>
  )
}
