import React from 'react'
import { toast } from '@lib/Toast'

export function showAsyncError(data: IErrorData) {
  if (data.errors) {
    Object.entries(data.errors).forEach(([key, errors]) => {
      toast.error(
        <>
          <div>{key}</div>
          {(errors as string[]).map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </>
      )
    })
  } else {
    toast.error(data.message || 'Error')
  }
}
