interface TInitialState {
  experience?: any;
  status?: any;
  allExperience: any;
}
const initialState: TInitialState = {
  allExperience: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_EXPERIENCE":
      return (state = {
        ...state,
        experience: action.payload.content,
        allExperience: [...state.allExperience, action.payload.content],
      });
    case "SYNC_EXPERIENCE":
      return (state = {
        ...state,
        allExperience: action.payload.content,
      });
    default:
      return state;
  }
};

export default reducer;
