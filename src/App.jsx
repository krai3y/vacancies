import { useEffect, useState } from 'react'
import { useStore } from './store/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

function App() {
  const users = useStore((state) => state.users)
  const loading = useStore((state) => state.loading)
  const error = useStore((state) => state.error)
  const fetchUsers = useStore((state) => state.fetchUsers)
  const deleteUser = useStore((state) => state.deleteUser)
  const updateUser = useStore((state) => state.updateUser)

  const [isEdit, setIsEdit] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  
  
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleUpdate = (id) => {
    setItemToEdit(id);
    setIsEdit(!isEdit);
  }
  
  if (loading) return  <div>Загрузка...</div>
  if (error) return  <div>Ошибка!</div>

  return (
    <div className="flex flex-wrap px-5">
      {users.map( user => { return (
        <div className='p-5 basis-1/5'>
          <div className='flex flex-col basis-1/5 p-5 border rounded-md'>
            {itemToEdit === user.id && isEdit ? <input type="text" value={user.name} onChange={(e) => updateUser(user.id, e.target.value)} /> : <p key={user.id}>{user.name}</p> }
            <button className="w-full" onClick={() => handleUpdate(user.id)}>
              {itemToEdit === user.id && isEdit ? <FontAwesomeIcon icon="fa-solid fa-check" size="sm" /> : <FontAwesomeIcon icon="fa-solid fa-pen" size="sm" />}
            </button>
            <button className="w-full" onClick={() => deleteUser(user.id)}>
              <FontAwesomeIcon icon="fa-solid fa-trash" size="sm" />
            </button>
          </div>
        </div>
      )} )}
    </div>
  )
}

export default App