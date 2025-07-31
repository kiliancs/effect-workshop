import { describe, expect, test } from 'bun:test';
import { Either, Option, pipe, Schema } from 'effect';
import { ParseError } from 'effect/ParseResult';

import { makeAsserts } from 'src/test-utils.ts';
import * as exercise from './schema-1.exercise.ts';

test('int', () => {
  const asserts = makeAsserts(exercise.intSchema);
  expect(asserts(1.1)).toThrow();
  expect(asserts(NaN)).toThrow();
  expect(asserts(1)).not.toThrow();
  expect(asserts(-1)).not.toThrow();
});

test('positive int', () => {
  const asserts = makeAsserts(exercise.positiveIntSchema);
  expect(asserts(1.1)).toThrow();
  expect(asserts(NaN)).toThrow();
  expect(asserts(1)).not.toThrow();
  expect(asserts(-1)).toThrow();
});

const testBetween30and50 = (schema: Schema.Schema<number>) => {
  for (let i = 0; i < 50; i++) {
    const asserts = makeAsserts(schema);

    const randomNumberBetween100NegativeAndPositive = Math.floor(Math.random() * 201) - 100;

    if (randomNumberBetween100NegativeAndPositive >= 30 && randomNumberBetween100NegativeAndPositive <= 50) {
      expect(asserts(randomNumberBetween100NegativeAndPositive)).not.toThrow();
    } else {
      expect(asserts(randomNumberBetween100NegativeAndPositive)).toThrow();
    }
  }
};

test('between 30 and 50', () => {
  testBetween30and50(exercise.between30And50Schema);
});

describe('between 30 and 50 with custom message', () => {
  test('between 30 and 50', () => {
    testBetween30and50(exercise.between30And50SchemaWithCustomMessage);
  });

  const customMessage = 'Please enter a value between 30 and 50';
  test('custom error if number is not between 30 and 50', () => {
    const error = pipe(
      Schema.validateEither(exercise.between30And50SchemaWithCustomMessage)(1),
      Either.getLeft,
      Option.getOrUndefined,
    );
    expect(error).toBeInstanceOf(ParseError);
    expect(error?.message).toBe(customMessage);
  });

  test('no custom error if not a number', () => {
    const error = pipe(
      Schema.validateEither(exercise.between30And50SchemaWithCustomMessage)('foo'),
      Either.getLeft,
      Option.getOrUndefined,
    );
    expect(error).toBeInstanceOf(ParseError);
    expect(error?.message).not.toBe(customMessage);
  });
});

describe('between 30 and 50 with custom message override', () => {
  test('between 30 and 50', () => {
    testBetween30and50(exercise.between30And50SchemaWitMessageOverride);
  });

  const customMessage = 'Please enter a value between 30 and 50';
  test('custom error if number is not between 30 and 50', () => {
    const error = pipe(
      Schema.validateEither(exercise.between30And50SchemaWitMessageOverride)(1),
      Either.getLeft,
      Option.getOrUndefined,
    );
    expect(error).toBeInstanceOf(ParseError);
    expect(error?.message).toBe(customMessage);
  });

  test('same custom message if not a number', () => {
    const error = pipe(
      Schema.validateEither(exercise.between30And50SchemaWitMessageOverride)('foo'),
      Either.getLeft,
      Option.getOrUndefined,
    );
    expect(error).toBeInstanceOf(ParseError);
    expect(error?.message).toBe(customMessage);
  });
});

describe('between 30 and 50 with multiple messages', () => {
  test('between 30 and 50', () => {
    testBetween30and50(exercise.between30And50SchemaWithMultipleMessages);
  });

  test('custom error if number is not between 30 and 50', () => {
    const customMessage = 'Please enter a value between 30 and 50';
    const error = pipe(
      Schema.validateEither(exercise.between30And50SchemaWithMultipleMessages)(1),
      Either.getLeft,
      Option.getOrUndefined,
    );
    expect(error).toBeInstanceOf(ParseError);
    expect(error?.message).toBe(customMessage);
  });

  test('other custom message if not a number', () => {
    const customMessage = 'Please enter a number';
    const error = pipe(
      Schema.validateEither(exercise.between30And50SchemaWithMultipleMessages)('foo'),
      Either.getLeft,
      Option.getOrUndefined,
    );
    expect(error).toBeInstanceOf(ParseError);
    expect(error?.message).toBe(customMessage);
  });
});
