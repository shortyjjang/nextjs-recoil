import type { NextPage } from 'next'
import Login from '../components/login'
import { useRecoilValue } from 'recoil'
import { userState } from '../states/user'
import Home from '../components/home'

const Landing: NextPage = () => {
  const user = useRecoilValue(userState)
  return ( <>
    {user.email ?
        <Home />
      : <Login />}
  </>
  )
}

export default Landing
