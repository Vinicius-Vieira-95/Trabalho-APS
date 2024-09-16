import { errorCodes } from '@/presentation/errors/error-codes';
import { ServerError } from '@/presentation/errors';

type IBadRequest = {
  name: string;
  stack: string;
  message: string;
};

export const badRequest = (
  error: Error,
): {
  error: IBadRequest;
} => ({
  error: {
    name: error.name,
    stack: error.stack,
    message: error.message,
  },
});

export const multipleBadRequest = (
  errors: Error[],
): {
  errors: IBadRequest[];
} => ({
  errors: errors.map((error) => ({
    name: error.name,
    stack: error.stack,
    message: error.message,
  })),
});

export const serverError = (error: Error): { error: ServerError } => ({
  error: new ServerError(error.stack),
});

export const ok = <T>(data: T): T => data;

export const handleError = (error: Error) => {
  if ([errorCodes.MULTIPLE_INVALID_PARAM_ERRORS].includes(error.stack)) {
    return multipleBadRequest(error['errors'] as Error[]);
  }

  if (process.env.NODE_ENV === 'development')
    console.log(`🟢🟢🟢🟢 ${error.stack} 🟢🟢🟢🟢`);

  if (
    [
      errorCodes.MISSING_PARAM_ERROR,
      errorCodes.INVALID_PARAM_ERROR,
      errorCodes.UNAUTHORIZED_ERROR,
    ].includes(error.stack)
  ) {
    return badRequest(error);
  } else return serverError(error);
};
