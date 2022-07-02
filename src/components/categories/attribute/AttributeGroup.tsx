import React from 'react'
import { v4 as uuid } from 'uuid'
import { Box, Typography, Divider, FormControl, Button, IconButton } from '@material-ui/core'
import { AddBox, Delete } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import IAttributeGroup from './IAttributeGroup'
import { useCategoriesState } from '../context'
import IAttribute from './IAttribute'
import Attribute from './Attribute'

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    padding: theme.spacing(1),
    fontSize: '.9em'
  },
  formControl: {
    marginTop: theme.spacing(3)
  }
}))

const AttributeGroup: React.FC<IAttributeGroup> = ({ title, hash, attributes }: IAttributeGroup) => {
  const styles = useStyles()

  const { dispatch } = useCategoriesState()

  const addNewAttribute = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_ATTRIBUTE',
      payload: {
        groupID: hash,
        attribute: {
          hash: uuid(),
          title: '',
          slug: '',
          filterable: false,
          hasPrice: false
        }
      }
    })
  }

  const deleteAttributeGroup = (event: React.MouseEvent) => {
    dispatch({
      type: 'DELETE_ATTRIBUTE_GROUP',
      payload: {
        hash
      }
    })
  }

  return (
    <Box>

      <Typography variant="h6" className={styles.title}>
        {title}
        <IconButton aria-label="حذف کردن" onClick={deleteAttributeGroup}>
          <Delete />
        </IconButton>
      </Typography>

      <Divider />

      {
        attributes.map((attribute: IAttribute) => <Attribute key={attribute.hash} {...attribute} />)
      }

      <FormControl className={styles.formControl} >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddBox />}
          onClick={addNewAttribute}
        >
          اضافه کردن ویژگی جدید
        </Button>
      </FormControl>

    </Box>
  )
}

export default AttributeGroup
