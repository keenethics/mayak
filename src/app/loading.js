import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="fixed bottom-0 left-0 grid h-full w-full place-content-center">
      <CircularProgress />
    </div>
  );
}
