import { useEffect, useState } from 'react'
import { useStore } from './store/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



function App() {
  const { users, loading, error, fetchUsers, deleteUser, updateUser } = useStore()

  const [isEdit, setIsEdit] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  
  useEffect(() => {

    fetchUsers()

  }, [fetchUsers])

  const handleUpdateButton = (id) => {

    if (Number.isInteger(itemToEdit)) return setItemToEdit(null);

    setItemToEdit(id);
  }
  
  if (loading) return  <div>Загрузка...</div>
  if (error) return  <div>Ошибка!</div>

  return (
    <div className="flex flex-wrap justify-center px-5">
      {users.map(
        user => { 
          return (
            <div className='p-5'>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  className='w-[70%] mx-auto'
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                />
                <CardContent>
                  <Typography className='truncate' gutterBottom variant="h5" component="div">
                    {itemToEdit === user.id ? <input type="text" value={user.name} onChange={(e) => updateUser(user.id, e.target.value)} /> : <p key={user.id}>{user.name}</p> }
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    <FontAwesomeIcon icon="fa-solid fa-at" /> {user.email}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    <FontAwesomeIcon icon="fa-solid fa-house" /> {user.address.city}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" className="w-full" onClick={() => handleUpdateButton(user.id)}>
                    {itemToEdit === user.id ? <FontAwesomeIcon icon="fa-solid fa-check" size="sm" /> : <FontAwesomeIcon icon="fa-solid fa-pen" size="sm" />}
                  </Button>
                  <Button variant="contained" className="w-full" onClick={() => deleteUser(user.id)}>
                    <FontAwesomeIcon icon="fa-solid fa-trash" size="sm" />
                  </Button>
                </CardActions>
              </Card>
            </div>
          )
        }
      )}
    </div>
  )
}

export default App