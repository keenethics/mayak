import p from 'prop-types';

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin panel for Mayak',
};

export default function AdminLayout({ children }) {
  return <div className="absolute  top-0 h-full w-full ">{children}</div>;
}

AdminLayout.propTypes = {
  children: p.node,
};
