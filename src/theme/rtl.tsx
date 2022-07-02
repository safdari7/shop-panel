import React from 'react'
import { create } from 'jss'
import rtl from 'jss-rtl'
import { StylesProvider, jssPreset, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f5f5f5'
    }
  },
  direction: 'rtl',
  typography: {
    fontFamily: 'iranyekan'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          padding: '50px'
        }
      }
    }
  }
})

function RTL (props: React.PropsWithChildren<{}>) {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          {props.children}
        </CssBaseline>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default RTL
