import { Field, FieldImpl, Table, TableImpl } from 'tsooq';

export class Pgmigrations extends TableImpl {
  private static readonly _TABLE_NAME = 'pgmigrations';
  static readonly ID: Field<number> = new FieldImpl<number>(Pgmigrations._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly NAME: Field<string> = new FieldImpl<string>(Pgmigrations._TABLE_NAME, 2, 'name', undefined, 'character varying', false, false);
  static readonly RUN_ON: Field<Date> = new FieldImpl<Date>(Pgmigrations._TABLE_NAME, 3, 'run_on', undefined, 'timestamp without time zone', false, false);
  private static readonly _FIELDS: Field<any>[] = [Pgmigrations.ID, Pgmigrations.NAME, Pgmigrations.RUN_ON];

  constructor() {
    super(Pgmigrations._TABLE_NAME, undefined, Pgmigrations._FIELDS);
  }
}

export class ShopAddress extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_address';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopAddress._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly FIRST_NAME: Field<string> = new FieldImpl<string>(ShopAddress._TABLE_NAME, 2, 'first_name', undefined, 'character varying', false, false);
  static readonly LAST_NAME: Field<string> = new FieldImpl<string>(ShopAddress._TABLE_NAME, 3, 'last_name', undefined, 'character varying', false, false);
  static readonly COMPANY_NAME: Field<string> = new FieldImpl<string>(ShopAddress._TABLE_NAME, 4, 'company_name', undefined, 'character varying', true, false);
  static readonly STREET: Field<string> = new FieldImpl<string>(ShopAddress._TABLE_NAME, 5, 'street', undefined, 'character varying', false, false);
  static readonly ZIP_CODE: Field<string> = new FieldImpl<string>(ShopAddress._TABLE_NAME, 6, 'zip_code', undefined, 'character varying', false, false);
  static readonly CITY: Field<string> = new FieldImpl<string>(ShopAddress._TABLE_NAME, 7, 'city', undefined, 'character varying', false, false);
  static readonly COUNTRY: Field<string> = new FieldImpl<string>(ShopAddress._TABLE_NAME, 8, 'country', undefined, 'character', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopAddress.ID, ShopAddress.FIRST_NAME, ShopAddress.LAST_NAME, ShopAddress.COMPANY_NAME, ShopAddress.STREET, ShopAddress.ZIP_CODE, ShopAddress.CITY, ShopAddress.COUNTRY];

  constructor() {
    super(ShopAddress._TABLE_NAME, undefined, ShopAddress._FIELDS);
  }
}

export class ShopCategory extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_category';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopCategory._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly NAME: Field<string> = new FieldImpl<string>(ShopCategory._TABLE_NAME, 2, 'name', undefined, 'character varying', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopCategory.ID, ShopCategory.NAME];

  constructor() {
    super(ShopCategory._TABLE_NAME, undefined, ShopCategory._FIELDS);
  }
}

export class ShopCountry extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_country';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopCountry._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly CODE: Field<string> = new FieldImpl<string>(ShopCountry._TABLE_NAME, 2, 'code', undefined, 'character', false, false);
  static readonly NAME: Field<string> = new FieldImpl<string>(ShopCountry._TABLE_NAME, 3, 'name', undefined, 'character varying', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopCountry.ID, ShopCountry.CODE, ShopCountry.NAME];

  constructor() {
    super(ShopCountry._TABLE_NAME, undefined, ShopCountry._FIELDS);
  }
}

export class ShopImage extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_image';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopImage._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly PRODUCT_ID: Field<number> = new FieldImpl<number>(ShopImage._TABLE_NAME, 2, 'product_id', undefined, 'integer', false, false);
  static readonly URL: Field<string> = new FieldImpl<string>(ShopImage._TABLE_NAME, 3, 'url', undefined, 'character varying', false, false);
  static readonly IS_MAIN: Field<boolean> = new FieldImpl<boolean>(ShopImage._TABLE_NAME, 4, 'is_main', undefined, 'boolean', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopImage.ID, ShopImage.PRODUCT_ID, ShopImage.URL, ShopImage.IS_MAIN];

  constructor() {
    super(ShopImage._TABLE_NAME, undefined, ShopImage._FIELDS);
  }
}

export class ShopLogin extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_login';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopLogin._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly PWHASH: Field<string> = new FieldImpl<string>(ShopLogin._TABLE_NAME, 2, 'pwhash', undefined, 'character varying', false, false);
  static readonly ACTIVE: Field<boolean> = new FieldImpl<boolean>(ShopLogin._TABLE_NAME, 3, 'active', undefined, 'boolean', false, false);
  static readonly ACTIVATION_TOKEN: Field<string> = new FieldImpl<string>(ShopLogin._TABLE_NAME, 4, 'activation_token', undefined, 'character varying', true, false);
  static readonly RESET_TOKEN: Field<string> = new FieldImpl<string>(ShopLogin._TABLE_NAME, 5, 'reset_token', undefined, 'character varying', true, false);
  private static readonly _FIELDS: Field<any>[] = [ShopLogin.ID, ShopLogin.PWHASH, ShopLogin.ACTIVE, ShopLogin.ACTIVATION_TOKEN, ShopLogin.RESET_TOKEN];

  constructor() {
    super(ShopLogin._TABLE_NAME, undefined, ShopLogin._FIELDS);
  }
}

export class ShopOrder extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_order';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopOrder._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly ORDER_NUMBER: Field<string> = new FieldImpl<string>(ShopOrder._TABLE_NAME, 2, 'order_number', undefined, 'character varying', false, false);
  static readonly USER_ID: Field<number> = new FieldImpl<number>(ShopOrder._TABLE_NAME, 3, 'user_id', undefined, 'integer', false, false);
  static readonly ORDER_DATE: Field<Date> = new FieldImpl<Date>(ShopOrder._TABLE_NAME, 4, 'order_date', undefined, 'date', false, false);
  static readonly ORDER_STATUS: Field<string> = new FieldImpl<string>(ShopOrder._TABLE_NAME, 5, 'order_status', undefined, 'character varying', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopOrder.ID, ShopOrder.ORDER_NUMBER, ShopOrder.USER_ID, ShopOrder.ORDER_DATE, ShopOrder.ORDER_STATUS];

  constructor() {
    super(ShopOrder._TABLE_NAME, undefined, ShopOrder._FIELDS);
  }
}

export class ShopOrderItem extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_order_item';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopOrderItem._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly ORDER_ID: Field<number> = new FieldImpl<number>(ShopOrderItem._TABLE_NAME, 2, 'order_id', undefined, 'integer', false, false);
  static readonly PRODUCT_ID: Field<number> = new FieldImpl<number>(ShopOrderItem._TABLE_NAME, 3, 'product_id', undefined, 'integer', false, false);
  static readonly QUANTITY: Field<number> = new FieldImpl<number>(ShopOrderItem._TABLE_NAME, 4, 'quantity', undefined, 'integer', false, false);
  static readonly NET_AMOUNT: Field<number> = new FieldImpl<number>(ShopOrderItem._TABLE_NAME, 5, 'net_amount', undefined, 'numeric', false, false);
  static readonly VAT_AMOUNT: Field<number> = new FieldImpl<number>(ShopOrderItem._TABLE_NAME, 6, 'vat_amount', undefined, 'numeric', false, false);
  static readonly GROSS_AMOUNT: Field<number> = new FieldImpl<number>(ShopOrderItem._TABLE_NAME, 7, 'gross_amount', undefined, 'numeric', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopOrderItem.ID, ShopOrderItem.ORDER_ID, ShopOrderItem.PRODUCT_ID, ShopOrderItem.QUANTITY, ShopOrderItem.NET_AMOUNT, ShopOrderItem.VAT_AMOUNT, ShopOrderItem.GROSS_AMOUNT];

  constructor() {
    super(ShopOrderItem._TABLE_NAME, undefined, ShopOrderItem._FIELDS);
  }
}

export class ShopProduct extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_product';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopProduct._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly NAME: Field<string> = new FieldImpl<string>(ShopProduct._TABLE_NAME, 2, 'name', undefined, 'character varying', false, false);
  static readonly DESCRIPTION: Field<string> = new FieldImpl<string>(ShopProduct._TABLE_NAME, 3, 'description', undefined, 'character varying', true, false);
  static readonly CATEGORY_ID: Field<number> = new FieldImpl<number>(ShopProduct._TABLE_NAME, 4, 'category_id', undefined, 'integer', false, false);
  static readonly PRICE: Field<number> = new FieldImpl<number>(ShopProduct._TABLE_NAME, 5, 'price', undefined, 'numeric', false, false);
  static readonly VAT_GROUP_ID: Field<number> = new FieldImpl<number>(ShopProduct._TABLE_NAME, 6, 'vat_group_id', undefined, 'integer', false, false);
  static readonly ACTIVATION_DATE: Field<Date> = new FieldImpl<Date>(ShopProduct._TABLE_NAME, 7, 'activation_date', undefined, 'timestamp without time zone', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopProduct.ID, ShopProduct.NAME, ShopProduct.DESCRIPTION, ShopProduct.CATEGORY_ID, ShopProduct.PRICE, ShopProduct.VAT_GROUP_ID, ShopProduct.ACTIVATION_DATE];

  constructor() {
    super(ShopProduct._TABLE_NAME, undefined, ShopProduct._FIELDS);
  }
}

export class ShopProductAttr extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_product_attr';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopProductAttr._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly PRODUCT_ID: Field<number> = new FieldImpl<number>(ShopProductAttr._TABLE_NAME, 2, 'product_id', undefined, 'integer', false, false);
  static readonly ATTR_TYPE_ID: Field<number> = new FieldImpl<number>(ShopProductAttr._TABLE_NAME, 3, 'attr_type_id', undefined, 'integer', false, false);
  static readonly VALUE: Field<string> = new FieldImpl<string>(ShopProductAttr._TABLE_NAME, 4, 'value', undefined, 'character varying', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopProductAttr.ID, ShopProductAttr.PRODUCT_ID, ShopProductAttr.ATTR_TYPE_ID, ShopProductAttr.VALUE];

  constructor() {
    super(ShopProductAttr._TABLE_NAME, undefined, ShopProductAttr._FIELDS);
  }
}

export class ShopProductAttrCategory extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_product_attr_category';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopProductAttrCategory._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly NAME: Field<string> = new FieldImpl<string>(ShopProductAttrCategory._TABLE_NAME, 2, 'name', undefined, 'character varying', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopProductAttrCategory.ID, ShopProductAttrCategory.NAME];

  constructor() {
    super(ShopProductAttrCategory._TABLE_NAME, undefined, ShopProductAttrCategory._FIELDS);
  }
}

export class ShopProductAttrType extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_product_attr_type';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopProductAttrType._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly NAME: Field<string> = new FieldImpl<string>(ShopProductAttrType._TABLE_NAME, 2, 'name', undefined, 'character varying', false, false);
  static readonly ATTR_CATEGORY_ID: Field<number> = new FieldImpl<number>(ShopProductAttrType._TABLE_NAME, 3, 'attr_category_id', undefined, 'integer', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopProductAttrType.ID, ShopProductAttrType.NAME, ShopProductAttrType.ATTR_CATEGORY_ID];

  constructor() {
    super(ShopProductAttrType._TABLE_NAME, undefined, ShopProductAttrType._FIELDS);
  }
}

export class ShopUser extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_user';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopUser._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly EMAIL: Field<string> = new FieldImpl<string>(ShopUser._TABLE_NAME, 2, 'email', undefined, 'character varying', false, false);
  static readonly LOGIN_ID: Field<number> = new FieldImpl<number>(ShopUser._TABLE_NAME, 3, 'login_id', undefined, 'integer', false, false);
  static readonly BILLING_ADDRESS_ID: Field<number> = new FieldImpl<number>(ShopUser._TABLE_NAME, 4, 'billing_address_id', undefined, 'integer', true, false);
  static readonly SHIPPING_ADDRESS_ID: Field<number> = new FieldImpl<number>(ShopUser._TABLE_NAME, 5, 'shipping_address_id', undefined, 'integer', true, false);
  private static readonly _FIELDS: Field<any>[] = [ShopUser.ID, ShopUser.EMAIL, ShopUser.LOGIN_ID, ShopUser.BILLING_ADDRESS_ID, ShopUser.SHIPPING_ADDRESS_ID];

  constructor() {
    super(ShopUser._TABLE_NAME, undefined, ShopUser._FIELDS);
  }
}

export class ShopVatGroup extends TableImpl {
  private static readonly _TABLE_NAME = 'shop_vat_group';
  static readonly ID: Field<number> = new FieldImpl<number>(ShopVatGroup._TABLE_NAME, 1, 'id', undefined, 'integer', false, true);
  static readonly NAME: Field<string> = new FieldImpl<string>(ShopVatGroup._TABLE_NAME, 2, 'name', undefined, 'character varying', false, false);
  static readonly PERCENTAGE: Field<number> = new FieldImpl<number>(ShopVatGroup._TABLE_NAME, 3, 'percentage', undefined, 'numeric', false, false);
  private static readonly _FIELDS: Field<any>[] = [ShopVatGroup.ID, ShopVatGroup.NAME, ShopVatGroup.PERCENTAGE];

  constructor() {
    super(ShopVatGroup._TABLE_NAME, undefined, ShopVatGroup._FIELDS);
  }
}

export class Tables {
  static readonly PGMIGRATIONS: Table = new Pgmigrations();
  static readonly SHOP_ADDRESS: Table = new ShopAddress();
  static readonly SHOP_CATEGORY: Table = new ShopCategory();
  static readonly SHOP_COUNTRY: Table = new ShopCountry();
  static readonly SHOP_IMAGE: Table = new ShopImage();
  static readonly SHOP_LOGIN: Table = new ShopLogin();
  static readonly SHOP_ORDER: Table = new ShopOrder();
  static readonly SHOP_ORDER_ITEM: Table = new ShopOrderItem();
  static readonly SHOP_PRODUCT: Table = new ShopProduct();
  static readonly SHOP_PRODUCT_ATTR: Table = new ShopProductAttr();
  static readonly SHOP_PRODUCT_ATTR_CATEGORY: Table = new ShopProductAttrCategory();
  static readonly SHOP_PRODUCT_ATTR_TYPE: Table = new ShopProductAttrType();
  static readonly SHOP_USER: Table = new ShopUser();
  static readonly SHOP_VAT_GROUP: Table = new ShopVatGroup();
}
