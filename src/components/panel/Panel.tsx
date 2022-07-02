import React from 'react'
import { Container, Grid } from '@material-ui/core'
import RTL from '../../theme/rtl'
import SideBar from '../partials/SideBar'
import RenderRoutes from '../../router/Routes'

const Panel: React.FC = (): JSX.Element => {
  return (
        <RTL>
            <div className="app">
                <Container maxWidth={'xl'}>
                    <Grid container spacing={3}>
                        <Grid item md={3} xl={2}>
                            <SideBar />
                        </Grid>
                        <Grid item md={9} xl={10}>
                            <RenderRoutes />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </RTL>
  )
}

export default Panel
