import dbClient from '../utils/dbClient.js';

export const findAllContactRequests = () =>
  dbClient.contactFormSubmission.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

export const postContactRequest = (
  firstName,
  lastName,
  email,
  businessName,
  projectType,
  phoneNumber,
  location,
  message
) =>
  dbClient.contactFormSubmission.create({
    data: {
      firstName,
      lastName,
      email,
      businessName,
      projectType,
      phoneNumber,
      location,
      message,
    },
  });
