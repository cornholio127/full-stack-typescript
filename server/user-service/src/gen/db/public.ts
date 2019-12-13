import { Field, FieldImpl, Table, TableImpl } from 'tsooq';

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

export class Tables {
  static readonly SHOP_ADDRESS: Table = new ShopAddress();
  static readonly SHOP_COUNTRY: Table = new ShopCountry();
  static readonly SHOP_LOGIN: Table = new ShopLogin();
  static readonly SHOP_USER: Table = new ShopUser();
}
