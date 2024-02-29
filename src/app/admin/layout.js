import p from 'prop-types';

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin panel for Mayak',
};

export default function AdminLayout({ children }) {
  // Div is needed to avoid root layout overlap with admin panel
  return <div className="absolute top-0 z-[99999999] h-full w-full">{children}</div>;
}

AdminLayout.propTypes = {
  children: p.node,
};
