import React from 'react'
import { CategoriesProvider } from './context'
import CategoriesContent from './CategoriesContent'

export default function EditCategory () {
  return (
    <CategoriesProvider>
      <CategoriesContent />
    </CategoriesProvider>
  )
}
