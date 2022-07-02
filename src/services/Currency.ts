const persianFormatter = new Intl.NumberFormat('fa-IR', {
  style: 'currency',
  currency: 'IRR'
})

export const toPersianCurrency = (value: number) => persianFormatter.format(value)
