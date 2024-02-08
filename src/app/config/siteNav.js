import React from 'react';
import Instagram from '@icons/instagram.svg';
import Facebook from '@icons/facebook.svg';
import XSocial from '@icons/xsocial.svg';

const siteNav = {
  mainNav: [
    {
      title: 'Mayak home',
      href: '/',
    },
  ],
  innerLinks: [
    { title: 'Спеціалісти', href: '/specialists' },
    { title: 'Події', href: '/events' },
  ],
  links: [
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/',
      svg: <Instagram />,
    },
    { title: 'Facebook', href: 'https://www.facebook.com/', svg: <Facebook /> },
    { title: 'XTwitter', href: 'https://twitter.com/', svg: <XSocial /> },
  ],
};

export default siteNav;
