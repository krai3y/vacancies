export const createUserSlice = (set) => ({
  users: [],
  loading: false,
  error: null,
  
  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      set({ users: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }

})