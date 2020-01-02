import { Record, Field } from 'tsooq';

type GroupMap = { [index: string]: Record[] };

type MapFn<T> = (rec: Record) => T;

export const groupBy = <T extends string | number>(
  records: Record[],
  groupField: Field<T>
): GroupMap => {
  const map: GroupMap = {};
  for (const rec of records) {
    const key = '' + rec.get(groupField);
    const arr = map[key];
    if (!arr) {
      map[key] = [rec];
    } else {
      arr.push(rec);
    }
  }
  return map;
};

export const mapGroup = <T1, T2>(
  groupMap: GroupMap,
  mapFn: MapFn<T1>,
  childMapFn: MapFn<T2>,
  targetField: string
): T1[] => {
  return Object.values(groupMap).map(recs => {
    const obj = mapFn(recs[0]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (obj as any)[targetField] = recs.map(childMapFn);
    return obj;
  });
};
