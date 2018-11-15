import usersList from '../components/UsersLists'
import userDetails from '../components/UserDetails'

const routes = [
  {component: userDetails, path: '/user/details'  , name: 'userDetails'},
  { path: '*', component: usersList }
]

export default routes
