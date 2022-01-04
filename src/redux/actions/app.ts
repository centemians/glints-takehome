export const addTodoOffline = (content: any) => {
  console.log("content is: ", content);
  return {
    type: "ADD_TODO",
    payload: {
      content,
    },
    meta: {
      offline: {
        effect: {
          content,
        },
        commit: { type: "ADD_TODO", meta: { content } },
        rollback: { type: "ADD_TODO_ROLLBACK", meta: { content } },
      },
    },
  };
};

export const syncData = (content: any) => {
  return {
    type: "SYNC_TODO",
    payload: {
      content,
    },
  };
};
