import { Schema } from 'effect';

/**
 * Util to make asserts work with expect.[not.]toThrow()
 *
 * @example
 * const asserts = makeAsserts(Schema.Number);
 * expect(asserts(1)).not.toThrow();
 * expect(asserts(NaN)).toThrow();
 */
export const makeAsserts = <A, I, R>(schema: Schema.Schema<A, I, R>) => {
  const asserts = Schema.asserts(schema);
  return (value: A) => () => asserts(value);
};

/**
 * Util for tstyche tests.
 *
 * @example
 * tstyche.expect(selfType<Person>()).type.toBe<typeof exercise.personSchema.Type>();
 */
export const selfType = <T>(_t?: T): T => undefined as any;
