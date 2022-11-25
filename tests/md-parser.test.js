import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { describe, test, expect, beforeAll, jest } from '@jest/globals';
import mdParser from '../src/md-parser.js';

jest.mock('fs');
let content;
beforeAll(() => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  content = fs.readFileSync(`${dirname}/sample-files/sample.md`, {
    encoding: 'utf8',
  });
});

describe('test mdParser method functionality', () => {
  test('passing valid File should generate valid html', () => {
    const response = mdParser(content);
    expect(response).toMatchSnapshot();
  });
  test('passing no argument to mdParser should match empty string', () => {
    const response = mdParser();
    expect(response).toBe('');
  });
});
