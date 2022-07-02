import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Paper, Typography, Divider, Box } from '@material-ui/core'

interface ContentProps {
  title: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  paperTitle: {
    padding: theme.spacing(1, 2),
    fontSize: '0.99rem',
    fontWeight: 'bold'
  },
  paperContent: {
    padding: theme.spacing(3)
  }
}))

function Content ({ title, children }: React.PropsWithChildren<ContentProps>) {
  const classes = useStyles()

  return (
    <Paper elevation={0} >

      <Typography className={classes.paperTitle} variant="h6">
        {title}
      </Typography>

      <Divider />

      <Box className={classes.paperContent} component="div" >
        {children}
      </Box>

    </Paper>
  )
}

export default Content
