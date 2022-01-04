interface TInitialState {
  user: any;
}
const initialState: TInitialState = {
  user: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.content,
      };
    default:
      return state;
  }
};

export default reducer;
