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
  country char(3) NOT NULL,
  CONSTRAINT shop_address_pkey PRIMARY KEY (id)
);

CREATE TABLE shop_login
(
  id serial NOT NULL,
  pwhash varchar(100) NOT NULL,
  active boolean NOT NULL,
  activation_token varchar(20),
  reset_token varchar(20),
  CONSTRAINT shop_login_pkey PRIMARY KEY (id)
);

CREATE TABLE shop_user
(
  id serial NOT NULL,
  email varchar(100) NOT NULL,
  login_id int NOT NULL,
  billing_address_id int,
  shipping_address_id int,
  CONSTRAINT shop_user_pkey PRIMARY KEY (id),
  CONSTRAINT shop_user_email_unique UNIQUE (email),
  CONSTRAINT shop_user_login_fkey FOREIGN KEY (login_id)
    REFERENCES shop_login (id),
  CONSTRAINT shop_user_billing_address_fkey FOREIGN KEY (billing_address_id)
    REFERENCES shop_address (id),
  CONSTRAINT shop_user_shipping_address_fkey FOREIGN KEY (shipping_address_id)
    REFERENCES shop_address (id)
);

CREATE TABLE shop_category
(
  id serial NOT NULL,
  name varchar(100) NOT NULL,
  CONSTRAINT shop_category_pkey PRIMARY KEY (id)
);

CREATE TABLE shop_vat_group
(
  id serial NOT NULL,
  name varchar(20) NOT NULL,
  percentage decimal(8, 2) NOT NULL,
  CONSTRAINT shop_vat_group_pkey PRIMARY KEY (id)
);

CREATE TABLE shop_product
(
  id serial NOT NULL,
  name varchar(100) NOT NULL,
  description varchar(1000),
  category_id int NOT NULL,
  price decimal(8, 2) NOT NULL,
  vat_group_id int NOT NULL,
  activation_date timestamp NOT NULL,
  CONSTRAINT shop_product_pkey PRIMARY KEY (id),
  CONSTRAINT shop_product_vat_group_fkey FOREIGN KEY (vat_group_id)
    REFERENCES shop_vat_group (id)
);

CREATE TABLE shop_image
(
  id serial NOT NULL,
  product_id int NOT NULL,
  url varchar(100) NOT NULL,
  is_main boolean NOT NULL,
  CONSTRAINT shop_image_pkey PRIMARY KEY (id),
  CONSTRAINT shop_image_product_fkey FOREIGN KEY (product_id)
    REFERENCES shop_product (id)
);
