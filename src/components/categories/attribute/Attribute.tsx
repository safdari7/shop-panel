import React from 'react'
import { TextField, Switch, FormControlLabel, Box } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import IAttribute from './IAttribute'
import { useCategoriesState } from '../context'

const useStyles = makeStyles((theme: Theme) => createStyles({
  attributeItem: {
    margin: theme.spacing(0, 1)
  },
  box: {
    padding: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(0, 1),
    minWidth: 200
  }
}))

export default function Attribute ({ hash, title, slug, filterable, hasPrice }: IAttribute) {
  const styles = useStyles()

  const { dispatch } = useCategoriesState()

  const updateFiled = (field: string, value: string | boolean) => {
    dispatch({
      type: 'UPDATE_ATTRIBUTE',
      payload: {
        attributeID: hash,
        data: {
          [field]: value
        }
      }
    })
  }

  return (
    <Box className={styles.box}>

      <TextField
        className={styles.attributeItem}
        variant="outlined"
        label="عنوان فارسی"
        id="title"
        name="title"
        defaultValue={title}
        onBlur={
          (event: React.FocusEvent<HTMLInputElement>) => updateFiled(event.currentTarget.name, event.currentTarget.value)
        }
      />

      <TextField
        className={styles.attributeItem}
        variant="outlined"
        label="عنوان انگلیسی"
        id="slug"
        name="slug"
        defaultValue={slug}
        onBlur={
          (event: React.FocusEvent<HTMLInputElement>) => updateFiled(event.currentTarget.name, event.currentTarget.value)
        }
      />

      <FormControlLabel
        className={styles.attributeItem}
        label="استفاده برای فیلتر"
        control={
          <Switch
            color="primary"
            id="filterable"
            name="filterable"
            defaultChecked={filterable}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => updateFiled(event.currentTarget.name, event.currentTarget.checked)
            }
          />
        }
      />

      <FormControlLabel
        className={styles.attributeItem}
        label="استفاده برای قیمت"
        control={
          <Switch
            color="primary"
            id="hasPrice"
            name="hasPrice"
            defaultChecked={hasPrice}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => updateFiled(event.currentTarget.name, event.currentTarget.checked)
            }
          />
        } />

    </Box>
  )
}
