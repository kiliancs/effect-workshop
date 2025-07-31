import { expect, test } from 'bun:test';
import { Arbitrary, FastCheck, Schema } from 'effect';
import * as tstyche from 'tstyche';

import { selfType } from 'src/test-utils.ts';
import * as exercise from './schema-3.exercise.ts';
import type { EncodedPerson, Person } from './schema-3.exercise.ts';
import * as solution from './schema-3.solution.ts';

const invalidPersonSchema = Schema.Struct({
  name: Schema.Number,
  dob: Schema.DateTimeUtcFromDate,
});

test('decoded type', () => {
  tstyche.expect(selfType<Person>()).type.toBe<typeof solution.personSchema.Type>();
});

test('encoded type', () => {
  tstyche.expect(selfType<EncodedPerson>()).type.toBe<typeof solution.personSchema.Encoded>();
});

test('person guard', () => {
  const validSamples = FastCheck.sample(Arbitrary.make(solution.personSchema));
  for (const sample of validSamples) {
    expect(exercise.personGuard(sample)).toBe(true);
  }
  const invalidSamples = FastCheck.sample(Arbitrary.make(invalidPersonSchema));
  for (const sample of invalidSamples) {
    expect(exercise.personGuard(sample)).toBe(false);
  }
});

test('person asserts', () => {
  const validSamples = FastCheck.sample(Arbitrary.make(solution.personSchema));
  const validAsserts = Schema.asserts(solution.personSchema);
  for (const sample of validSamples) {
    expect(exercise.personAsserts(sample)).toEqual(validAsserts(sample));
  }
  const invalidSamples = FastCheck.sample(Arbitrary.make(invalidPersonSchema));
  for (const sample of invalidSamples) {
    expect(() => exercise.personAsserts(sample)).toThrow();
  }
});

test('person encode', () => {
  const validSamples = FastCheck.sample(Arbitrary.make(solution.personSchema));
  const validEncoder = Schema.encodeSync(solution.personSchema);
  for (const sample of validSamples) {
    expect(exercise.personEncode(sample)).toEqual(validEncoder(sample));
  }
});

test('person decode', () => {
  const validSamples = FastCheck.sample(Arbitrary.make(solution.personSchema));
  const validEncoder = Schema.encodeSync(solution.personSchema);
  for (const sample of validSamples) {
    const encoded = validEncoder(sample);
    expect(exercise.personDecode(encoded)).toEqual(sample);
  }
});
