import axios from 'axios'

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const res = await axios.get("http://jsonplaceholder.typicode.com/todos?_limit=30");

    commit('setTodos', res.data);
  },
  async addTodo({ commit }, title) {
    const res = await axios.post("http://jsonplaceholder.typicode.com/todos", { title, completed: false });

    commit('newTodo', res.data);
  },
  async delTodo({ commit }, id) {
    await axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  },
  async filterTodos({ commit }, e) {
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
    const res = await axios.get(`http://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

    commit('setTodos', res.data);
  },
  async updateTodo({ commit }, updTodo) {
    await axios.put(`http://jsonplaceholder.typicode.com/todos/${updTodo.id}`);

    commit('updateTodo', updTodo);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => state.todos = state.todos.filter(t => t.id !== id),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(t => t.id === updTodo.id);
    if(index != -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};
