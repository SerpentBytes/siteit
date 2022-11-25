// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from '@jest/globals';
import main from '../src/main.js';
import { handleImproperUsage } from '../src/utility.js';

describe('test main function', () => {
  test('returns false if args is not specified', () => {
    const response = main();
    expect(response).toBe(false);
  });
  test('return false if args is an empty string', () => {
    const response = main('');
    expect(response).toBe(false);
  });
  test('print usage info if user does not enter an option', () => {
    const response = main('\n');
    expect(response).toBe(handleImproperUsage('\n'));
  });
  test('print usage info if user enters an invalid option', () => {
    const response = main('-z');
    expect(response).toBe(handleImproperUsage('-z'));
  });
  test('print usage info if user enters a syntactically wrong option', () => {
    const response = main('-- -z');
    expect(response).toBe(handleImproperUsage('-- -z'));
  });
});
