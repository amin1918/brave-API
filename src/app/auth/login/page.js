import React from 'react'
import LoginPage from './clientLogin'
import fetchAPI from '@/utils/fetch-api'

async function fetchLogin() {
  const data = await fetchAPI("http://localhost:8001/users",{method:"GET"})
  return (
    <LoginPage users={data}  />
  )
}

export default fetchLogin

