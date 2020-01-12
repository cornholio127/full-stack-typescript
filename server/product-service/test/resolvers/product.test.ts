/* eslint-disable @typescript-eslint/camelcase */
import 'mocha';
import chai from 'chai';
import sinon from 'sinon';
import { productById } from '../../src/resolvers/product';
import { create } from '../../src/db';

afterEach(() => {
  sinon.restore();
});

const mockQuery = (mockResult: unknown[]) => {
  sinon
    .stub(create.getDb(), 'query')
    .callsFake((queryString, params, callback) => {
      callback(undefined, {
        rows: mockResult,
        command: '',
        rowCount: mockResult.length,
        oid: 1,
        fields: [],
      });
    });
};

describe.only('product resolver', () => {
  describe('productById', () => {
    it('returns null for empty result', async () => {
      mockQuery([]);
      const result = await productById('1');

      chai.expect(result).to.be.null;
    });

    it('returns a product', async () => {
      const now = new Date();
      mockQuery([
        {
          id: 1,
          name: 'Name',
          description: 'Description',
          category_id: 3,
          price: 11.25,
          vat_group_id: 5,
          percentage: 7.7,
          activation_date: now,
          category_name: 'Category Name',
          image_id: 207,
          url: 'http://imagehost/image.jpg',
          is_main: true,
        },
      ]);
      const result = await productById('1');

      chai.expect(result).to.eql({
        id: '1',
        name: 'Name',
        description: 'Description',
        category: {
          id: '3',
          name: 'Category Name',
          products: [],
        },
        price: {
          amount: '11.25',
          vatPct: '7.7',
        },
        activationDate: now.toISOString(),
        images: [
          {
            id: '207',
            url: 'http://imagehost/image.jpg',
            isMain: true,
          },
        ],
        specification: [],
      });
    });
  });
});
