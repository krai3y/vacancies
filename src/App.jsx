import { useEffect, useState } from 'react'
import { useStore } from './store/index'

function App() {
  const users = useStore((state) => state.users)
  const loading = useStore((state) => state.loading)
  const error = useStore((state) => state.error)
  const fetchUsers = useStore((state) => state.fetchUsers)
  console.log(users[1]);
  
  
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
  
  if (loading) return  <div>Загрузка...</div>
  if (error) return  <div>Ошибка!</div>
 
  return (
    <div style={{ padding: '20px' }}>
      {users.map( user => { return <p key={user.id}>{user.name}</p>} )}
    </div>
  )
}

export default App