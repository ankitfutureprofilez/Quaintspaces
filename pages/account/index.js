import React from 'react'
import Account from './Account'
import Layout from "../layout/Layout"
import AuthLayout from '../layout/AuthLayout'

export default function index() {
  return (
    <div>
      <AuthLayout>
      <Account/>
      </AuthLayout>
    </div>
  )
}
