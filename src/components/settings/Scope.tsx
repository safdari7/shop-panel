/* eslint-disable no-unused-vars */
import { Chip } from '@material-ui/core'
import React from 'react'
import SettingScope from './SettingScope'

interface statusProps {
  value: SettingScope
}

function Scope ({ value }: statusProps) {
  return (
    <>
      {value === SettingScope.PRIVATE && <Chip variant="outlined" label='خصوصی' color="primary" />}
      {value === SettingScope.PUBLIC && <Chip variant="outlined" label='عمومی' />}
    </>
  )
}

export default React.memo(Scope)
