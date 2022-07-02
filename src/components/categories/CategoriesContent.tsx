import React from 'react'
import { FormControl, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { AddBox, Save } from '@material-ui/icons'
import { v4 as uuid } from 'uuid'
import { useCategoriesState } from './context'
import Content from '../partials/Content'
import Http from '../../services/Http'
import AttributeGroup from './attribute/AttributeGroup'

const useStyles = makeStyles((theme: Theme) => createStyles({
  formRow: {
    margin: theme.spacing(2, 'auto')
  }
}))

export default function CategoriesContent () {
  const styles = useStyles()

  const { state, dispatch } = useCategoriesState()
  const [title, setTitle] = React.useState<string>('')
  const [open, setOpen] = React.useState<boolean>(false)
  const [showNotify, setShowNotify] = React.useState<boolean>(false)

  const handleClose = (e: React.MouseEvent) => {
    setOpen(false)
  }

  const openDialog = (e: React.MouseEvent) => {
    setOpen(true)
  }

  const handleConfirm = (e: React.MouseEvent) => {
    if (title !== '') {
      dispatch({
        type: 'ADD_ATTRIBUTE_CATEGORY',
        payload: {
          hash: uuid(),
          title
        }
      })
      setOpen(false)
    }
  }

  const updateTitle = (title: string) => {
    dispatch({
      type: 'UPDATE_TITLE',
      payload: {
        title
      }
    })
  }

  const updateSlug = (slug: string) => {
    dispatch({
      type: 'UPDATE_SLUG',
      payload: {
        slug
      }
    })
  }

  const saveCategory = () => {
    const httpClient = new Http()

    httpClient.post('/api/v1/admin/categories', {
      ...state
    })
      .then(response => {
        setShowNotify(true)
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleCloseNotification = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setShowNotify(false)
  }

  return (
    <Content title="ویرایش / اضافه کردن دسته بندی">

      <Snackbar open={showNotify} autoHideDuration={3000} onClose={handleCloseNotification}>
        <Alert
          variant="filled"
          elevation={6}
          severity="success"
        >
          دسته بندی با موفقیت ذخیره شد
        </Alert>
      </Snackbar>

      <Dialog open={open} aria-labelledby="form-dialog-title">

        <DialogTitle id="form-dialog-title">عنوان دسته بندی خاصیت ها</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="attributes_group_title"
            label="عنوان دسته بندی خاصیت ها"
            type="text"
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTitle(event.currentTarget.value) }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            بستن
          </Button>
          <Button onClick={handleConfirm} color="primary">
            تایید
          </Button>
        </DialogActions>

      </Dialog>

      <FormControl fullWidth className={styles.formRow}>
        <TextField
          variant="outlined"
          id="title"
          name="title"
          label="عنوان - فارسی"
          defaultValue={state.title}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => updateTitle(e.currentTarget.value)}
        />
      </FormControl >

      <FormControl fullWidth className={styles.formRow}>
        <TextField
          variant="outlined"
          id="slug"
          name="slug"
          label="اسلاگ - انگلیسی"
          defaultValue={state.slug}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => updateSlug(e.currentTarget.value)}
        />
      </FormControl>

      {state.groups.map((group) => (<AttributeGroup key={group.hash} {...group} />))}

      <FormControl className={styles.formRow}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddBox />}
          onClick={openDialog}
        >
          اضافه کردن دسته بندی ویژگی ها
        </Button>
      </FormControl>

      <Grid container justify="flex-end">
        <Button
          color="default"
          variant="contained"
          startIcon={<Save />}
          onClick={saveCategory}
        >
          ذخیره سازی
        </Button>
      </Grid>

    </Content>
  )
}
