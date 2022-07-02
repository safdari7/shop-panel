import React from 'react'
import { TextField } from '@material-ui/core'
import { debounce } from 'lodash'

interface SearchProps {
  label: string
  onChange: (keyword: string) => void
}

export default function Search ({ label, onChange }: SearchProps) {
  const performSearch = debounce((keyword: string) => {
    onChange(keyword)
  }, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    performSearch(e.target.value)
  }

  return (
    <TextField
      variant="outlined"
      fullWidth
      id="app-search-section"
      label={label}
      onChange={handleChange}
    />
  )
}
