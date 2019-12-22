INSERT INTO shop_product_attr_category (id, name) VALUES (1, 'General');
INSERT INTO shop_product_attr_category (id, name) VALUES (2, 'Color');
INSERT INTO shop_product_attr_category (id, name) VALUES (3, 'Dimensions');

INSERT INTO shop_product_attr_type (id, name, attr_category_id) VALUES (1, 'Manufacturer', 1);
INSERT INTO shop_product_attr_type (id, name, attr_category_id) VALUES (2, 'Product type', 1);
INSERT INTO shop_product_attr_type (id, name, attr_category_id) VALUES (3, 'Article number', 1);

INSERT INTO shop_product_attr_type (id, name, attr_category_id) VALUES (4, 'Color group', 2);
INSERT INTO shop_product_attr_type (id, name, attr_category_id) VALUES (5, 'Exact color', 2);

INSERT INTO shop_product_attr_type (id, name, attr_category_id) VALUES (6, 'Width', 3);
INSERT INTO shop_product_attr_type (id, name, attr_category_id) VALUES (7, 'Height', 3);
INSERT INTO shop_product_attr_type (id, name, attr_category_id) VALUES (8, 'Depth', 3);
INSERT INTO shop_product_attr_type (id, name, attr_category_id) VALUES (9, 'Weight', 3);
