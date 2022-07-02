import React from 'react'
import ICategoryItem from '../contracts/ICategoryItem'
import Http from '../../services/Http'
import Content from '../partials/Content'
import SkeletonTable from '../utils/SkeletonTable'
import Table from '../utils/Table'

export default function Categories () {
  const [categories, setCategories] = React.useState<ICategoryItem[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const http = new Http()

  React.useEffect(() => {
    const loadCategories = () => {
      http.get<ICategoryItem[]>('/api/v1/admin/categories')
        .then(response => {
          setCategories(response.data)
          setIsLoading(false)
        })
        .catch(error => {
          console.log(error.message)
        })
    }

    loadCategories()
  }, [])

  return (
    <Content title="لیست دسته بندی ها">

      {isLoading && <SkeletonTable />}

      {!isLoading &&
        <Table
          columns={['عنوان', 'اسلاگ']}
          data={categories}
          attributes={['title', 'slug']}
        />}

    </Content>
  )
}
