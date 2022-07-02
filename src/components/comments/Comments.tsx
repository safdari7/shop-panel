import React from 'react'
import Content from '../partials/Content'
import IComment from './IComment'
import CommentsList from './List'
import HttpService from '../../services/Http'

export default function Comments () {
  const httpService = React.useMemo(() => (new HttpService()), [])
  const [comments, setComments] = React.useState<IComment[]>([])

  React.useEffect(() => {
    const fetchComments = () => {
      httpService.get<IComment[]>('/api/v1/comments')
        .then(response => setComments(response.data))
    }

    fetchComments()
  }, [])

  return (
    <Content title="لیست دیدگاه ها">
      <CommentsList items={comments} />
    </Content>
  )
}
