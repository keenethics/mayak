import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 translate-x-[50%] translate-y-[50%] transform">
      <CircularProgress />
    </div>
  );
}
