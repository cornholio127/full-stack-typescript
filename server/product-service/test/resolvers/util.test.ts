import 'mocha';
import chai from 'chai';
import { FieldImpl, Record, FieldLike } from 'tsooq';
import { groupBy, mapGroup } from '../../src/resolvers/util';

class RecordImpl implements Record {
  constructor(private readonly data: { [index: string]: unknown }) {}
  get<T>(field: FieldLike<T>): T {
    return this.data[field.name] as T;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  print(fields: FieldLike<unknown>[]): void {
    // empty
  }
}

const f1 = new FieldImpl<string>('', 1, 'field1', undefined, '', false, false);
const f2 = new FieldImpl<number>('', 2, 'field2', undefined, '', false, false);
const records: Record[] = [
  new RecordImpl({ field1: 'a', field2: 1 }),
  new RecordImpl({ field1: 'a', field2: 2 }),
  new RecordImpl({ field1: 'b', field2: 3 }),
  new RecordImpl({ field1: 'b', field2: 4 }),
  new RecordImpl({ field1: 'b', field2: 5 }),
];

describe.only('util', () => {
  describe('groupBy', () => {
    it('groups records', () => {
      const map = groupBy(records, f1);

      chai.expect(map['a']).to.eql([records[0], records[1]]);
      chai.expect(map['b']).to.eql([records[2], records[3], records[4]]);
    });
  });

  describe('mapGroup', () => {
    it('flattens the group map and maps it to the target shape', () => {
      const map = groupBy(records, f1);
      const fn1 = (rec: Record) => ({ f1: rec.get(f1) });
      const fn2 = (rec: Record) => ({ f2: rec.get(f2) });

      const flat = mapGroup(map, fn1, fn2, 'children').sort((a, b) =>
        a.f1.localeCompare(b.f1)
      );

      chai.expect(flat).to.eql([
        { f1: 'a', children: [{ f2: 1 }, { f2: 2 }] },
        { f1: 'b', children: [{ f2: 3 }, { f2: 4 }, { f2: 5 }] },
      ]);
    });
  });
});
