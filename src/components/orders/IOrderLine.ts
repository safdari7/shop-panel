/* eslint-disable no-unused-vars */
import IProduct from '../products/IProduct'

export default interface IOrderLine {
    count: number,
    createdAt: string,
    discountedPrice: number,
    price: number,
    product: IProduct
}
