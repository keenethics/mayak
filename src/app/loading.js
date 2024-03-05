import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="fixed bottom-0 top-0 grid w-full place-content-center">
      <CircularProgress />
    </div>
  );
}
