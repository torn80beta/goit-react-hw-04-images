import { toast } from 'react-toastify';

export const endNotification = () => {
  toast.info("You've reached the end of the list.", {
    position: 'top-center',
    autoClose: 1250,
    theme: 'colored',
  });
};
