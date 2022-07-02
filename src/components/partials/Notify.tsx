import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Color } from '@material-ui/lab/Alert'
import Alert from './Alert'

interface notifyProps {
  open: boolean
  message: string
  type: Color
}

export default function Notify ({ open, message, type }: notifyProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = (e: React.SyntheticEvent, reason?: string) => {
    setIsOpen(false)
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}
