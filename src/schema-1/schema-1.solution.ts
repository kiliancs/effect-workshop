import { Schema } from 'effect';
import { positive } from 'effect/Schema';

/**
 * A schema for an integer.
 */
export const intSchema = Schema.Int;

/**
 * A schema for a > 0 integer.
 */
export const positiveIntSchema = Schema.Int.pipe(positive());

/**
 * A schema for a number (even non-int) between 30 and 50.
 */
export const between30And50Schema = Schema.Number.pipe(
  Schema.between(30, 50),
);

// This is provided as a convenience for the exercises below.
const between30And50ErrorMessage = 'Please enter a value between 30 and 50';

/**
 * A number (even non-int) between 30 and 50.
 * In case of failure, the error message will be "Please enter a value between 30 and 50".
 */
export const between30And50SchemaWithCustomMessage = Schema.Number.pipe(
  Schema.between(30, 50, { message: () => between30And50ErrorMessage }),
);

/**
 * A number between 30 and 50.
 * If the number is not between 30 and 50, the error message will be "Please enter a value between 30 and 50".
 * But if the issue is that it's not a number to begin with, the error message will be "Please enter a number".
 */
export const between30And50SchemaWitMessageOverride = Schema.Number.pipe(
  Schema.between(30, 50, { message: () => ({ message: between30And50ErrorMessage, override: true }) }),
);

/**
 * A number between 30 and 50.
 * If the number is not between 30 and 50, the error message will be "Please enter a value between 30 and 50".
 * But if the issue is that it's not a number to begin with, the error message will be "Please enter a number".
 */
export const between30And50SchemaWithMultipleMessages = Schema.Number.pipe(
  Schema.annotations({
    message: () => ({ message: 'Please enter a number', override: true }),
  }),
  Schema.between(30, 50, { message: () => between30And50ErrorMessage }),
);
