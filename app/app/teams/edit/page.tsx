import React, { Suspense } from 'react'
import EditTeamMembersClient from './client-component'

const EditTeamMembers = () => {
  return (
    <Suspense>
        <EditTeamMembersClient/>
    </Suspense>
  )
}

export default EditTeamMembers