export const getFilteredTasks = (state) =>{
    switch (state.todo.filter) {
        case 'All':{
            return state.todo.tasks
        }
        case 'Completed':{
            return state.todo.tasks.filter(t => t.done === true)
        }
        case 'Active':{
            return state.todo.tasks.filter(t => t.done === false)
        }

        default:
          return  state.todo.tasks;
    }

}