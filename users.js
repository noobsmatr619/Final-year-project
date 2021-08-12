//make server users for security test 
const users = [];

const addUser = ({ id, name, profile }) => {
  const user = { id, name, profile };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.name === id);

module.exports = {
  addUser,
  removeUser,
  getUser,
};
