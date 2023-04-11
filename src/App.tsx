import { useEffect, useState } from 'react'
import { Header, Bonuses } from './components/index'

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>('')

  const accessKey: string = process.env.REACT_APP_ACCESS_KEY || ''
  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'AccessKey': accessKey,
  }
  const headers: HeadersInit = new Headers(requestHeaders)
  const getAccessTokenBody = JSON.stringify({
    idClient: process.env.REACT_APP_CLIENT_ID,
    accessToken: '',
    paramName: 'device',
    paramValue: process.env.REACT_APP_DEVICE_ID,
    latitude: 0,
    longitude: 0,
    sourceQuery: 0,
  })
  const getAccessToken = () => {
    fetch('http://84.201.188.117:5021/api/v3/clients/accesstoken', {
      method: 'POST',
      body: getAccessTokenBody,
      headers,
    })
      .then(response => response.json())
      .then(value => setAccessToken(value.accessToken))
      .catch(e => console.log(e))
  }
  useEffect(() => getAccessToken, [])

  return (
    <div className="App">
      <Header />
      { accessToken && <Bonuses accessToken={accessToken} /> }
    </div>
  )
}


export default App
