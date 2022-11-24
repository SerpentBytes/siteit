import { describe, test, expect } from '@jest/globals';
import FileParser from '../src/file-parser';

let fileParser;

describe('testing FileParser class functionality', () => {
  test('calling FileParser constructor with valid file', () => {
    fileParser = new FileParser([
      '-i',
      ['-i', './tests/sample-files/sample.txt'],
    ]);
    expect(fileParser.source).toBe('./tests/sample-files/sample.txt');
  });
  test('calling the FileParser constructor with valid directory', () => {
    fileParser = new FileParser(['-i', ['-i', './tests/sample-files']]);
    expect(fileParser.source).toBe('./tests/sample-files');
  });
});
