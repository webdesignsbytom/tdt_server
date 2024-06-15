import { response } from 'express';
import { EVENT_MESSAGES, sendDataResponse, sendMessageResponse } from '../utils/responses.js';

export const getAllContactRequests = async (req, res) => {
  console.log('getAllContactRequests');
  try {
    const foundRequests = await findAllContactRequests();
    if (!foundRequests) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.allUsersNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    // myEmitterUsers.emit('get-all-users', req.user);
    return sendDataResponse(res, 200, { response: foundRequests });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Get all users`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};