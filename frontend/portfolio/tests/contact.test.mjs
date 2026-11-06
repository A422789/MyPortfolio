import test from 'node:test';
import assert from 'node:assert/strict';
import { contactResolver } from '../src/utils/contactValidation.js';

const options = { criteriaMode: 'firstError', fields: {}, shouldUseNativeValidation: false };

test('deferred contact validation retains trimming, optional subject and validation limits', async () => {
  const valid = await contactResolver({ name: ' Ahmed ', email: 'ahmed@example.com', subject: '', message: ' A valid project inquiry. ' }, undefined, options);
  assert.deepEqual(valid.errors, {});
  assert.equal(valid.values.name, 'Ahmed');
  assert.equal(valid.values.message, 'A valid project inquiry.');
  const invalid = await contactResolver({ name: 'A', email: 'invalid', subject: 'x'.repeat(121), message: 'x'.repeat(2001) }, undefined, options);
  assert.deepEqual(Object.keys(invalid.errors).sort(), ['email', 'message', 'name', 'subject']);
});
