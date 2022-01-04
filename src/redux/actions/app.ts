export const addExperienceOffline = (content: any) => {
  return {
    type: "ADD_EXPERIENCE",
    payload: {
      content,
    },
    meta: {
      offline: {
        effect: {
          content,
        },
        commit: { type: "ADD_EXPERIENCE", meta: { content } },
        rollback: { type: "ADD_EXPERIENCE_ROLLBACK", meta: { content } },
      },
    },
  };
};

export const syncData = (content: any) => {
  return {
    type: "SYNC_EXPERIENCE",
    payload: {
      content,
    },
  };
};
