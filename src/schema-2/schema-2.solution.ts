import { Schema } from 'effect';

/**
 * Without using Schema.Date and friends, implement a Schema that takes an
 * encoded String and decodes it to a Date.
 * An ISO String (`Date.toISOString()`) is a valid encoded String.
 */
export const dateSchema = Schema.transform(Schema.String, Schema.instanceOf(Date), {
  decode: (value) => new Date(value),
  encode: (value) => value.toISOString(),
});

/**
 * Implement a Schema that encodes to `YYYY-MM-DD` format (the first 10
 * characters of the ISO string), and decodes to a Date.
 */
export const justDateSchema = Schema.transform(Schema.String, Schema.instanceOf(Date), {
  decode: (value) => new Date(value),
  encode: (value) => value.toISOString().split('T')[0],
});

/**
 * A Schema that:
 * - accepts URNs in format "urn:my-org:user/<number>", such as:
 *   - "urn:my-org:user/1234"
 *   - "urn:my-org:user/-1234"
 * - DOES NOT accept strings such as:
 *   - "foo"
 *   - "urn:foo"
 *   - "urn:my-org:foo"
 *   - "urn:my-org:user/foo"
 *   - "urn:my-org:user/1234/foo"
 */
export const urnSchema = Schema.TemplateLiteral('urn:my-org:user/', Schema.Number);

/**
 * A Schema that:
 * - accepts URNs in format "urn:my-org:user/<uuid>", such as:
 *   - "urn:my-org:user/10d05a05-d332-4b67-a8fd-4e9f41220b3c"
 * - DOES NOT accept strings such as:
 *   - "foo"
 *   - "urn:foo"
 *   - "urn:my-org:foo"
 *   - "urn:my-org:user"
 *   - "urn:my-org:user/"
 *   - "urn:my-org:foo/foo"
 *   - "urn:my-org:user/10d05a05-d332-4b67-a8fd-4e9f41220b3c/foo"
 * - Has an encoded value that is an array of ['urn:my-org:user/', theUUID]
 */
export const urnUUIDSchema = Schema.TemplateLiteralParser('urn:my-org:user/', Schema.UUID);

/**
 * Take the previous exercise a step further, and make it decode to the UUID
 * only.
 */
export const urnUUIDOnlySchema = Schema.transform(urnUUIDSchema, Schema.UUID, {
  decode: (value) => value[1],
  encode: (value) => ['urn:my-org:user/', value],
  strict: false,
});
