import React from 'react';
import List, { HorizontalItems } from '../list';
import Link from '../link';

const Footer: React.FC = () => {
  return (
    <HorizontalItems>
      <List title="Contact">
        <Link url="/cms/contact/form">Contact form</Link>
      </List>
      <List title="Help">
        <Link url="/cms/help/delivery">Delivery</Link>
        <Link url="/cms/help/payment-options">Payment opetions</Link>
        <Link url="/cms/help/return-policy">Return policy</Link>
        <Link url="/cms/help/warranty">Warranty</Link>
      </List>
      <List title="About us">
        <Link url="/cms/about/shop-ag">Shop AG</Link>
        <Link url="/cms/about/company">Company</Link>
        <Link url="/cms/about/board-members">Board members</Link>
        <Link url="/cms/about/terms-and-conditions">
          Terms &amp; conditions
        </Link>
        <Link url="/cms/about/privacy">Privacy</Link>
        <Link url="/cms/about/disclaimer">Disclaimer</Link>
      </List>
      <List title="Locations">
        <Link url="/locations/zurich">Zurich</Link>
        <Link url="/locations/bern">Bern</Link>
        <Link url="/locations/lausanne">Lausanne</Link>
      </List>
    </HorizontalItems>
  );
};

export default Footer;
