import React, { useState } from 'react'
import { FormControl, TextField, Grid, Checkbox, FormControlLabel, Button } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import HttpService from '../../services/Http'
import Content from '../partials/Content'
import Section from '../partials/Section'

const useStyles = makeStyles((theme: Theme) => createStyles({
  formRow: {
    margin: theme.spacing(2, 'auto')
  }
}))

interface CouponRules {
  user: string
  maxPrice: number
  minPrice: number
  firstPurchase: boolean
}

export default function NewCoupon () {
  const styles = useStyles()
  const httpService = React.useMemo(() => (new HttpService()), [])

  const [code, setCode] = useState<string>('')
  const [percent, setPercent] = useState<number>(0)
  const [limit, setLimit] = useState<number>(0)
  const [expiresAt, setExpiresAt] = useState<string>('')
  const [couponRules, setCouponRules] = useState<CouponRules>({
    user: '',
    maxPrice: 0,
    minPrice: 0,
    firstPurchase: false
  })

  const updateCouponRulesUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponRules((prev) => ({ ...prev, user: e.target.value }))
  }

  const updateCouponRulesMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = e.target.value as unknown as number
    setCouponRules((prev) => ({ ...prev, maxPrice }))
  }

  const updateCouponRulesMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = e.target.value as unknown as number
    setCouponRules((prev) => ({ ...prev, minPrice }))
  }

  const updateCouponRulesFirstPurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponRules((prev) => ({ ...prev, firstPurchase: e.target.checked }))
  }

  const saveCoupon = (e: React.MouseEvent) => {
    httpService.post('/api/v1/admin/coupons', {
      code,
      percent,
      limit,
      expiresAt,
      constraints: couponRules
    })
  }

  return (
    <Content title="ایجاد کوپن ">
      <Grid container xs={12} md={6} lg={6} >

        <FormControl fullWidth className={styles.formRow}>
          <TextField
            variant="outlined"
            id="code"
            name="code"
            label="کد تخفیف"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
          />
        </FormControl >

        <FormControl fullWidth className={styles.formRow}>
          <TextField
            variant="outlined"
            id="percent"
            name="percent"
            label="درصد تخفیف"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPercent(e.target.value as unknown as number)}
          />
        </FormControl >

        <FormControl fullWidth className={styles.formRow}>
          <TextField
            variant="outlined"
            id="limit"
            name="limit"
            label="تعداد"
            helperText="تعداد 0 به معنای نامحدود می باشد"
            defaultValue={0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLimit(e.target.value as unknown as number)}
          />
        </FormControl >

        <FormControl fullWidth className={styles.formRow}>
          <TextField
            type="date"
            variant="outlined"
            id="expires_at"
            name="expires_at"
            label="تاریخ انقضاء"
            helperText="عدم ثبت تاریخ یعنی کد هرگز منقضی نمی شود"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpiresAt(e.target.value)}
          />
        </FormControl >

      </Grid>

      <Grid container md={12} >
        <Section fullWidth title="شرایط استفاده">

          <Grid md={6}>

            <FormControl fullWidth className={styles.formRow}>
              <TextField
                variant="outlined"
                id="user"
                name="user"
                label="کاربر"
                helperText="فقط این کاربر می تواند از کد تخفیف استفاده کند"
                onChange={updateCouponRulesUser}
              />
            </FormControl >

            <FormControl fullWidth className={styles.formRow}>
              <TextField
                variant="outlined"
                id="lower_boundary"
                name="lower_boundary"
                label="حداقل قیمت سفارش"
                helperText="زمانی قابل استفاده است که قیمت نهایی سفارش بیشتر از این مقدار باشد"
                onChange={updateCouponRulesMinPrice}
              />
            </FormControl >

            <FormControl fullWidth className={styles.formRow}>
              <TextField
                variant="outlined"
                id="upper_boundary"
                name="upper_boundary"
                label="حداکثر قیمت سفارش"
                helperText="زمانی قابل استفاده است که قیمت نهایی سفارش کمتر از این مقدار باشد"
                onChange={updateCouponRulesMaxPrice}
              />
            </FormControl >

            <FormControl fullWidth className={styles.formRow}>
              <FormControlLabel
                label="فقط برای خرید بار اول"
                control={
                  <Checkbox
                    name="first_purchase"
                    onChange={updateCouponRulesFirstPurchase}
                  />
                }
              />
            </FormControl >

          </Grid>

        </Section>

        <Button
          variant="contained"
          color="primary"
          onClick={saveCoupon}
        >
          ثبت کد تخفیف
        </Button>

      </Grid>
    </Content>
  )
}
