import { describe, expect, test } from 'bun:test';
import { Arbitrary, FastCheck, Schema } from 'effect';

import { makeAsserts } from 'src/test-utils.ts';
import * as exercise from './schema-2.exercise.ts';

describe('date schema', () => {
  test('encode', () => {
    const encode = Schema.encodeSync(exercise.dateSchema);
    expect(encode(new Date('2021-01-01'))).toBe('2021-01-01T00:00:00.000Z');
  });

  test('decode', () => {
    const decode = Schema.decodeSync(exercise.dateSchema);
    expect(decode('2021-01-01')).toEqual(new Date('2021-01-01'));
  });
});

describe('just date schema', () => {
  test('encode', () => {
    const encode = Schema.encodeSync(exercise.justDateSchema);
    expect(encode(new Date('2021-01-01'))).toBe('2021-01-01');
  });

  test('decode', () => {
    const decode = Schema.decodeSync(exercise.justDateSchema);
    expect(decode('2021-01-01')).toEqual(new Date('2021-01-01'));
  });
});

describe('urn schema', () => {
  const asserts = makeAsserts(exercise.urnSchema);
  for (const sample of FastCheck.sample(Arbitrary.make(Schema.JsonNumber))) {
    expect(asserts(`urn:my-org:user/${sample}`)).not.toThrow();
  }
});

describe('urn uuid schema', () => {
  const asserts = makeAsserts(exercise.urnUUIDSchema);
  for (const sample of FastCheck.sample(Arbitrary.make(Schema.UUID))) {
    expect(asserts(['urn:my-org:user/', sample])).not.toThrow();
  }
  const exampleUUID = '10d05a05-d332-4b67-a8fd-4e9f41220b3c';
  expect(Schema.decodeSync(exercise.urnUUIDSchema)(`urn:my-org:user/${exampleUUID}`)).toEqual([
    'urn:my-org:user/',
    exampleUUID,
  ]);
});

describe('urn uuid only schema', () => {
  const asserts = makeAsserts(exercise.urnUUIDOnlySchema);
  for (const sample of FastCheck.sample(Arbitrary.make(Schema.UUID))) {
    expect(asserts(sample)).not.toThrow();
  }
  const exampleUUID = '10d05a05-d332-4b67-a8fd-4e9f41220b3c';
  expect(Schema.decodeSync(exercise.urnUUIDOnlySchema)(`urn:my-org:user/${exampleUUID}`)).toEqual(exampleUUID);
  expect(Schema.encodeSync(exercise.urnUUIDOnlySchema)(exampleUUID)).toEqual(`urn:my-org:user/${exampleUUID}`);
});
