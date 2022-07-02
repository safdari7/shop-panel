import React from 'react'
import { Paper, Divider, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

interface SkeletonTableProps {
  columns?: number;
  rows?: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ columns, rows }: SkeletonTableProps) => (

  <Paper elevation={0} style={{ margin: '20px' }}>

    <Grid container spacing={5}>
      {
        [1, 2, 3, 4, 5, 6].map((item, i) => (
          <Grid item key={i} md={2} justify="center">
            <Skeleton
              style={{ margin: '0 auto' }}
              component="div"
              width={40}
              height={40}
              variant="circle"
              animation="wave" />
          </Grid>
        ))
      }
    </Grid>

    {
      [1, 2, 3, 4, 5, 6].map((item, i) => (
        <>
          <Grid container key={i} spacing={10}>
            {
              [1, 2, 3, 4, 5, 6].map((item, i) => (
                <Grid item key={i} xs={2}>
                  <Skeleton animation="wave" />
                </Grid>
              ))
            }
          </Grid>
          <Divider style={{ margin: '20px auto' }} />
        </>
      )
      )
    }

  </Paper>

)

export default SkeletonTable
