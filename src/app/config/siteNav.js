import React from 'react';
import { Facebook, Instagram } from '@icons';

const siteNav = {
  mainNav: [
    {
      title: 'Mayak home',
      href: '/',
    },
  ],
  innerLinks: [
    { title: 'Спеціалісти', href: '/specialist' },
    { title: 'Події', href: '/events' },
  ],
  links: [
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/',
      svg: <Instagram />,
    },
    { title: 'Facebook', href: 'https://www.facebook.com/', svg: <Facebook /> },
  ],
};

export default siteNav;
