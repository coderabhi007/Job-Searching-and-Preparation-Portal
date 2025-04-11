import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Interviewer = () => {
  const { loading, user }=useSelector(store => store.auth);
  console.log(user)
  return (
    <div>
      <h1>Interviewer1</h1>
      <h1>{user}</h1>
    </div>
  )
}

export default Interviewer;