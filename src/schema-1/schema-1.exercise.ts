import { Schema } from 'effect';

/**
 * A schema for an integer.
 */
export const intSchema = Schema.Any;

/**
 * A schema for a > 0 integer.
 */
export const positiveIntSchema = Schema.Any;

/**
 * A schema for a number (even non-int) between 30 and 50.
 */
export const between30And50Schema = Schema.Any;

// This is provided as a convenience for the exercises below.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const between30And50ErrorMessage = 'Please enter a value between 30 and 50';

/**
 * A number (even non-int) between 30 and 50.
 * In case of failure, the error message will be "Please enter a value between 30 and 50".
 */
export const between30And50SchemaWithCustomMessage = Schema.Any;

/**
 * A number between 30 and 50.
 * If the number is not between 30 and 50, the error message will be "Please enter a value between 30 and 50".
 * But if the issue is that it's not a number to begin with, the error message will be "Please enter a number".
 */
export const between30And50SchemaWitMessageOverride = Schema.Any;

/**
 * A number between 30 and 50.
 * If the number is not between 30 and 50, the error message will be "Please enter a value between 30 and 50".
 * But if the issue is that it's not a number to begin with, the error message will be "Please enter a number".
 */
export const between30And50SchemaWithMultipleMessages = Schema.Any;
