import React from 'react'
import ClientRegister from './clientRegister'
import fetchAPI from '@/utils/fetch-api'

export async function register() {
  const data = await fetchAPI("http://localhost:8001/users",{method:"GET"})
  return (
    <ClientRegister users={data}  />
  )
}

export default register