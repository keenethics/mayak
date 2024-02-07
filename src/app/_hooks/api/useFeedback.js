import ky from 'ky';
import { useMutation } from '@tanstack/react-query';

export const createFeedback = async ({
  name, phone, callMe, email, message,
}) => ky
  .post('/api/feedback', {
    json: {
      name,
      phone,
      callMe,
      email,
      message,
    },
  })
  .json();

export const useCreateFeedback = () => useMutation({
  mutationFn: ({
    name, phone, callMe, email, message,
  }) => createFeedback({
    name,
    phone,
    callMe,
    email,
    message,
  }),
});
