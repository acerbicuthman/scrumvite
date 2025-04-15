import React from 'react'
import { Outlet } from 'react-router'

const Educator = () => {
  return (
    <div>
      <h1>Educatior Page</h1>
      <div>
        {<Outlet/>}
      </div>
    </div>
  )
}

export default Educator
