import { Schema } from 'effect';

// For the following schema, you'll be asked to provide types and functions.
// Do note re-implement the wheel. Find the utils Schema provides.
export const personSchema = Schema.Struct({
  name: Schema.String,
  dob: Schema.DateTimeUtcFromDate,
});

/**
 * The type of a (decoded) Person.
 */
export type Person = typeof personSchema.Type;

/**
 * The type of an encoded Person.
 */
export type EncodedPerson = typeof personSchema.Encoded;

/**
 * A guard function that checks if a value is a Person.
 * Must be a type guard.
 */
export const personGuard = Schema.is(personSchema);

/**
 * A function that asserts a value is a Person.
 * Must throws if the value is not a Person.
 */
export const personAsserts = Schema.asserts(personSchema);

/**
 * A function that encodes a Person (Person -> EncodedPerson).
 */
export const personEncode = Schema.encodeSync(personSchema);

/**
 * A function that decodes an EncodedPerson (EncodedPerson -> Person).
 */
export const personDecode = Schema.decodeSync(personSchema);
