import React from 'react'
import { useRouteError } from 'react-router'
import { errorClass } from '../styles/common'

function ErrorBoundary() {
 
    const {data,status,statusText} = useRouteError()
  return (
    <div>
    <p className={errorClass}>{data}</p>
    <p className={errorClass}>{status}-{statusText}</p>
    </div>
  )
}

export default ErrorBoundary
