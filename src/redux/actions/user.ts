export const updateUser = (content: any) => {
  return {
    type: "UPDATE_USER",
    payload: {
      content,
    },
  };
};
