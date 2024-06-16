import { findAllContactRequests } from '../domain/contact.js';
import { myEmitterErrors } from '../event/errorEvents.js';
import {
  BadRequestEvent,
  MissingFieldEvent,
  NotFoundEvent,
  ServerErrorEvent,
} from '../event/utils/errorUtils.js';
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';

export const getAllContactRequests = async (req, res) => {
  console.log('getAllContactRequests');
  
  try {
    const foundRequests = await findAllContactRequests();
    if (!foundRequests) {
      const notFound = new NotFoundEvent(req.user, 'not found', 'not found');
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    // myEmitterUsers.emit('get-all-users', req.user);
    return sendDataResponse(res, 200, foundRequests);
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Get all users`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createNewContactRequest = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    businessName,
    projectType,
    phoneNumber,
    location,
    message,
  } = req.body;

  try {
    if ((!firstName, !lastName, !email, !message)) {
      const missingField = new MissingFieldEvent(
        null,
        'Contact: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    const createdContactRequest = await postContactRequest(
      firstName,
      lastName,
      email,
      businessName,
      projectType,
      phoneNumber,
      location,
      message
    );

    if (!createdContactRequest) {
      const notCreated = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createContactFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    return sendDataResponse(res, 201, 'OK');
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Create contact request failed`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
