import { Response } from '../types/response';

const isApiSuccess = (response: Response) => {
  return response.status === 0;
};

export { isApiSuccess };
