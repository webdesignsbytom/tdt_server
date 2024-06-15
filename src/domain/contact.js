import dbClient from '../utils/dbClient.js';

export const findAllContactRequests = () =>
  dbClient.contactFormSubmission.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
