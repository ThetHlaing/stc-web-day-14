const state = {
    todos: [
        {
            id: 0,
            task: "Buy food at the supermarket.",
            completed: false
        },
        {
            id: 1,
            task: "Organize the living room.",
            completed: true
        },
        {
            id: 2,
            task: "Read every class and tutorial on Sabe.io.",
            completed: false
        }
    ]
};

//Vuex pass the state object to getters
const getters = {
    getTodos: state => state.todos
};

// mutation functions are capitalized to distinguish them from other functions.
const mutations = {
    ADD_TODO: (state, payload) => {

        const newTask = {
            id: payload.newId,
            task: payload.task,
            completed: false
        }

        state.todos.unshift(newTask);
    },
    TOGGLE_TODO: (state, payload) => {
        const item = state.todos.find(todo => todo.id === payload);
        item.completed = !item.completed;
    },
    DELETE_TODO: (state, payload) => {
        const index = state.todos.findIndex(todo => todo.id === payload);
        state.todos.splice(index, 1);
    }
};

//context => store 
// commit is a function name that calls a mutation function with the provited payload
const actions = {
    addTodo: (context, payload) => {
        context.commit("ADD_TODO", payload)
    },
    toggleTodo: (context, payload) => {
        context.commit("TOGGLE_TODO", payload)
    },
    deleteTodo: (context, payload) => {
        context.commit("DELETE_TODO", payload)
    }
}

const store = new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
});


Vue.component("todo-list", {
    computed: {
        todos() {
            return this.$store.getters.getTodos;
        }
    },
    methods: {
        toggleTodo: function(id) {
            this.$store.dispatch("toggleTodo", id);
        },
        deleteTodo: function(id) {
            this.$store.dispatch("deleteTodo", id);
        }
    },
    template: "#todo-list"
});

const app = new Vue({
    data: () => ({
        task: "",
        newId: 3
    }),
    methods: {
        addTodo: function() {
            this.$store.dispatch("addTodo", this);
            this.newId ++;
            this.task = "";
        }
    },
    store: store,
    el: "#app",
    template: "#app-template"
});
