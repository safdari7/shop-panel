import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AddBox, Category, ExpandLess, ExpandMore, List as ListIcon, RedeemRounded, Store } from '@material-ui/icons'

export default function Products () {
  const [open, setOpen] = useState(true)

  const useStyles = makeStyles((theme: Theme) => createStyles({
    nested: {
      paddingLeft: theme.spacing(5)
    },
    nestedText: {
      fontSize: '.99em !important'
    },
    linkItem: {
      textDecoration: 'none',
      color: 'inherit'
    }
  }))

  const classes = useStyles()

  return (
        <React.Fragment>

            <ListItem button onClick={e => setOpen(!open)}>
                <ListItemIcon>
                    <Store />
                </ListItemIcon>
                <ListItemText primary="مدیریت محصولات" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding component="div">

                    <Link className={classes.linkItem} to="/products/edit">
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <AddBox />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.nestedText }} primary="محصول جدید" />
                        </ListItem>
                    </Link>

                    <Link className={classes.linkItem} to="/products">
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.nestedText }} primary="لیست محصولات" />
                        </ListItem>
                    </Link>

                    <Link className={classes.linkItem} to="/categories/edit">
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <AddBox />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.nestedText }} primary="دسته بندی جدید" />
                        </ListItem>
                    </Link>

                    <Link className={classes.linkItem} to="/categories">
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <Category />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.nestedText }} primary="دسته بندی ها" />
                        </ListItem></Link>

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <RedeemRounded />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="پیشنهادهای ویژه" />
                    </ListItem>

                </List>
            </Collapse>

        </React.Fragment>
  )
}
