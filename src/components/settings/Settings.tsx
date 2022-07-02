import React from 'react'
import Content from '../partials/Content'
import ISetting from './ISetting'
import SettingsList from './List'
import HttpService from '../../services/Http'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

export default function Settings () {
  const httpService = React.useMemo(() => (new HttpService()), [])
  const [settings, setSettings] = React.useState<ISetting[]>([])

  React.useEffect(() => {
    const fetchShipments = () => {
      httpService.get<ISetting[]>('/api/v1/settings')
        .then(response => setSettings(response.data))
    }

    fetchShipments()
  }, [])

  return (
    <Content title="لیست تنظیمات">
      <Link to="/settings/new">
        <Button
          variant="contained"
          color="primary"
        >
          ایجاد تنظیمات
        </Button>
      </Link>

      <SettingsList list={settings} />
    </Content>
  )
}
