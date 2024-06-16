import { findAllContactRequests, postContactRequest } from '../domain/contact.js';
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

    const validProjectTypes = ['WEB', 'APP', 'SOFTWARE', 'CIRCUITS', 'OTHER'];
    if (projectType && !validProjectTypes.includes(projectType)) {
      throw new Error(`Invalid projectType: ${projectType}`);
    }

    const createdContactRequest = await postContactRequest(
      firstName,
      lastName,
      email,
      businessName,
      projectType || null,
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
    const serverError = new ServerErrorEvent(
      req.user,
      `Create contact request failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const deleteContactRequest = async (req, res) => {
  console.log('deleteContactRequest');
  const { contactId } = req.params;

  try {
    const foundRequest = await prisma.contactRequest.findUnique({
      where: {
        id: contactId,
      },
    });

    if (!foundRequest) {
      const notFound = new NotFoundEvent(
        req.user,
        'Contact request not found',
        'The contact request with the specified ID was not found.'
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    await prisma.contactRequest.delete({
      where: {
        id: contactId,
      },
    });

    return sendDataResponse(res, 200, {
      message: 'Contact request deleted successfully.',
    });
  } catch (err) {
    const serverError = new ServerErrorEvent(
      req.user,
      'Delete contact request'
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
