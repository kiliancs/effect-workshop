import { Schema } from 'effect';

// Define schemas matching each type.
// But pay attention to additional requirements as well!

// Property is null or string
export const userSchema: Schema.Schema<{ email: string; auth0Id: string | null }> = Schema.Any;

// Optional property is string or undefined
// ...WITHOUT using Schema.UndefinedOr
export const personSchema: Schema.Schema<{ name: string; theme?: string | undefined }> = Schema.Any;

// Property is null, undefined or string
export const operationResultSchema: Schema.Schema<{ success: boolean; error: string | undefined | null }> = Schema.Any;

// Optional property is null or string
export const createUserSchema: Schema.Schema<{ email: string; auth0Id?: string | null }> = Schema.Any;

// Null property is interpreted as not provided
// E.g. decode({ email: 'test@test.com', auth0Id: null }) -> { email: 'test@test.com' }
export const ignoreNullSchema: Schema.Schema<
  { email: string; auth0Id?: string | undefined },
  { email: string; auth0Id?: string | null | undefined }
> = Schema.Any;
