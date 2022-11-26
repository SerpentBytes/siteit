import chalk from 'chalk';
import {
  cmd,
  err,
  flag,
  hdg,
  src,
  success,
  secondary,
} from '../src/cli-display';

describe('Testing cli-display ', () => {
  test('cmd() function output', () => {
    const cmdResult = cmd();
    expect(cmdResult).toBe(chalk.greenBright('siteit'));
  });

  test('flag() function ouput', () => {
    const flagResult = flag('flag');
    expect(flagResult).toBe(chalk.blueBright('flag'));
  });

  test('src() function output', () => {
    const srcResult = src('source');
    expect(srcResult).toEqual(chalk.bold.yellowBright('source'));
  });

  test('hdg() function output', () => {
    const hdgResult = hdg('hdg');
    expect(hdgResult).toEqual(chalk.inverse.bold('hdg'));
  });

  test('err() testing output', () => {
    const errResult = err('error');
    expect(errResult).toEqual(chalk.redBright.bold.inverse('error'));
  });

  test('success() testing output', () => {
    const successResult = success('success');
    expect(successResult).toEqual(chalk.green('success'));
  });

  test('secondary() testing output', () => {
    const secondaryResult = secondary('secondary');
    expect(secondaryResult).toEqual(chalk.yellow('secondary'));
  });
});
