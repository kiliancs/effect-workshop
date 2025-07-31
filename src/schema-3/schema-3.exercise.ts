import { Schema } from 'effect';

// For the following schema, you'll be asked to provide types and functions.
// Do not re-implement the wheel. Find the utils Schema provides.
export const personSchema = Schema.Struct({
  name: Schema.String,
  dob: Schema.DateTimeUtcFromDate,
});

/**
 * The type of a (decoded) Person.
 */
export type Person = any;

/**
 * The type of an encoded Person.
 */
export type EncodedPerson = any;

/**
 * A guard function that checks if a value is a Person.
 * Must be a type guard.
 */
export const personGuard = (_value: any): boolean => {
  throw new Error('Not implemented');
};

/**
 * A function that asserts a value is a Person.
 * Must throws if the value is not a Person.
 */
export const personAsserts = (_value: any): void => {
  throw new Error('Not implemented');
};

/**
 * A function that encodes a Person (Person -> EncodedPerson).
 */
export const personEncode = (_value: any): EncodedPerson => {
  throw new Error('Not implemented');
};

/**
 * A function that decodes an EncodedPerson (EncodedPerson -> Person).
 */
export const personDecode = (_value: any): Person => {
  throw new Error('Not implemented');
};
