export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const updateProfile = (user) => {
  return {
    type: "UPDATE_PROFILE",
    payload: user,
  };
};
