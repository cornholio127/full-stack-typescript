/* eslint-disable @typescript-eslint/camelcase */
import 'mocha';
import chai from 'chai';
import { createTestClient } from 'apollo-server-testing';
import { gql, ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from '../../src/schema';
import resolvers from '../../src/resolvers';
import { create } from '../../src/db';
import sinon from 'sinon';

const mockQuery = (resultFn: (queryString: string) => unknown[]) => {
  sinon
    .stub(create.getDb(), 'query')
    .callsFake((queryString, params, callback) => {
      const mockResult = resultFn(queryString);
      callback(undefined, {
        rows: mockResult,
        command: '',
        rowCount: mockResult.length,
        oid: 1,
        fields: [],
      });
    });
};

describe.only('product resolver integration', () => {
  describe('productById', () => {
    it('resolves specification', async () => {
      const now = new Date();
      mockQuery(queryString =>
        queryString.startsWith('SELECT shop_product.id')
          ? [
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
            ]
          : [
              {
                attr_cat_id: 11,
                attr_cat_name: 'General',
                attr_type_id: 21,
                attr_type_name: 'Color',
                attr_id: 31,
                value: 'green',
              },
            ]
      );
      const server = new ApolloServer({
        schema: buildFederatedSchema([{ typeDefs, resolvers }]),
      });
      try {
        await server.listen({ port: 0 });
        const { query } = createTestClient(server);
        const queryDoc = gql`
          query ProductDetails($id: ID!) {
            productById(id: $id) {
              id
              name
              specification {
                name
                attributes {
                  name
                  value
                }
              }
            }
          }
        `;

        const result = await query({ query: queryDoc, variables: { id: '1' } });

        chai.expect(result.data.productById).to.eql({
          id: '1',
          name: 'Name',
          specification: [
            {
              name: 'General',
              attributes: [
                {
                  name: 'Color',
                  value: 'green',
                },
              ],
            },
          ],
        });
      } finally {
        await server.stop();
      }
    });
  });
});
