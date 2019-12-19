import React from 'react';
import List, { HorizontalItems } from '../list';
import Link from '../link';

const Footer: React.FC = () => {
  return (
    <HorizontalItems>
      <List title="Contact">
        <Link>Contact form</Link>
      </List>
      <List title="Help">
        <Link>Delivery</Link>
        <Link>Payment opetions</Link>
        <Link>Return policy</Link>
        <Link>Warranty</Link>
      </List>
      <List title="About us">
        <Link>Shop AG</Link>
        <Link>Company</Link>
        <Link>Board members</Link>
        <Link>Terms &amp; conditions</Link>
        <Link>Privacy</Link>
        <Link>Disclaimer</Link>
      </List>
      <List title="Locations">
        <Link>Zurich</Link>
        <Link>Bern</Link>
        <Link>Lausanne</Link>
      </List>
    </HorizontalItems>
  );
};

export default Footer;
