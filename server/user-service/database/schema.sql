CREATE TABLE shop_country
(
  id serial NOT NULL,
  code char(3) NOT NULL,
  name varchar(100) NOT NULL,
  CONSTRAINT shop_country_pkey PRIMARY KEY (id)
);

CREATE TABLE shop_address
(
  id serial NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  company_name varchar(100),
  street varchar(100) NOT NULL,
  zip_code varchar(10) NOT NULL,
  city varchar(100) NOT NULL,
  country_id int NOT NULL,
  CONSTRAINT shop_address_pkey PRIMARY KEY (id),
  CONSTRAINT shop_address_country_fkey FOREIGN KEY (country_id)
    REFERENCES shop_country (id)
);

CREATE TABLE shop_user
(
  id serial NOT NULL,
  email varchar(100) NOT NULL,
  billing_address_id int,
  shipping_address_id int,
  CONSTRAINT shop_user_pkey PRIMARY KEY (id),
  CONSTRAINT shop_user_billing_address_fkey FOREIGN KEY (billing_address_id)
    REFERENCES shop_address (id),
  CONSTRAINT shop_user_shipping_address_fkey FOREIGN KEY (shipping_address_id)
    REFERENCES shop_address (id)
);
