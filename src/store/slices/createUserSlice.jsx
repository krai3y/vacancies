export const userSlice = (set, get) => ({
  users: [],
  loading: false,
  error: null,
  
  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      set({ users: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteUser: (id) => {
    set(state => ({
      users: state.users.filter(user => user.id !== id)
    }));
  },

    updateUser: (id, name) => {
    set(state => ({
      users: state.users.map(user =>
        user.id === id ? { ...user, name: name } : user
      )
    }));
  }

})