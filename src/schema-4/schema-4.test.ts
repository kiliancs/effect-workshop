import { expect, test } from 'bun:test';
import { Arbitrary, FastCheck, Schema } from 'effect';
import * as tstyche from 'tstyche';

import * as exercise from './schema-4.exercise.ts';
import * as solution from './schema-4.solution.ts';

test('user schema', () => {
  expect(exercise.userSchema).not.toBe(Schema.Any);

  tstyche.expect(exercise.userSchema).type.toBe<typeof solution.userSchema>();

  const validSamples = FastCheck.sample(Arbitrary.make(solution.userSchema));
  const validator = Schema.is(solution.userSchema);
  for (const sample of validSamples) {
    expect(validator(sample)).toBe(true);
  }
});

test('person schema', () => {
  expect(exercise.personSchema).not.toBe(Schema.Any);

  tstyche.expect(exercise.personSchema).type.toBe<typeof solution.personSchema>();

  const validSamples = FastCheck.sample(Arbitrary.make(solution.personSchema));
  const validator = Schema.is(solution.personSchema);
  for (const sample of validSamples) {
    expect(validator(sample)).toBe(true);
  }
});

test('operation result schema', () => {
  expect(exercise.operationResultSchema).not.toBe(Schema.Any);

  tstyche.expect(exercise.operationResultSchema).type.toBe<typeof solution.operationResultSchema>();

  const validSamples = FastCheck.sample(Arbitrary.make(solution.operationResultSchema));
  const validator = Schema.is(solution.operationResultSchema);
  for (const sample of validSamples) {
    expect(validator(sample)).toBe(true);
  }
});

test('create user schema', () => {
  expect(exercise.createUserSchema).not.toBe(Schema.Any);

  tstyche.expect(exercise.createUserSchema).type.toBe<typeof solution.createUserSchema>();

  const validSamples = FastCheck.sample(Arbitrary.make(solution.createUserSchema));
  const validator = Schema.is(solution.createUserSchema);
  for (const sample of validSamples) {
    expect(validator(sample)).toBe(true);
  }
});

test('ignore null schema', () => {
  expect(exercise.ignoreNullSchema).not.toBe(Schema.Any);

  tstyche.expect(exercise.ignoreNullSchema).type.toBe<typeof solution.ignoreNullSchema>();

  const exerciseDecode = Schema.decodeSync(solution.ignoreNullSchema);
  expect(exerciseDecode({ email: 'test@test.com', auth0Id: null })).toEqual({ email: 'test@test.com' });
  expect(exerciseDecode({ email: 'test@test.com' })).toEqual({ email: 'test@test.com' });

  const encodedSchema = Schema.encodedSchema(solution.ignoreNullSchema);
  const validSamples = FastCheck.sample(Arbitrary.make(encodedSchema));

  const solutionDecode = Schema.decodeSync(solution.ignoreNullSchema);
  for (const sample of validSamples) {
    expect(exerciseDecode(sample)).toEqual(solutionDecode(sample));
  }
});
