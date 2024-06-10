import React from 'react'
import { useParams } from 'react-router-dom'

const Document = () => {
    const {id} = useParams<{id:string}>()
  return (
    <div>
      Document : {id}
    </div>
  )
}

export default Document
