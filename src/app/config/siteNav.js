import React from 'react';
import Instagram from '@logo/instagram.svg';
import Facebook from '@logo/facebook.svg';
import XSocial from '@logo/xsocial.svg';

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
