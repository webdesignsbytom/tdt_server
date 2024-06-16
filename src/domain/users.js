import dbClient from '../utils/dbClient.js';

export const findUserById = (userId) =>
  dbClient.user.findUnique({
    where: {
      id: userId,
    },
  });
export const findUserByEmail = (userEmail) =>
  dbClient.user.findUnique({
    where: {
      email: userEmail,
    },
  });


export const deleteUserById = (userId) =>
  dbClient.user.delete({
    where: {
      id: userId,
    },
  });
