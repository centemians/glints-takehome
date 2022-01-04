interface TInitialState {
  todoItem?: any;
  status?: any;
  allTodos: any;
}
const initialState: TInitialState = {
  allTodos: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_TODO":
      console.log("this got triggered!");
      return (state = {
        ...state,
        todoItem: action.payload.content,
        allTodos: [...state.allTodos, action.payload.content],
      });
    case "SYNC_TODO":
      return (state = {
        ...state,
        allTodos: action.payload.content,
      });
    default:
      return state;
  }
};

export default reducer;
