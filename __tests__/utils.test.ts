import { describe, expect, it } from '@jest/globals';

import capitalizeFirstLetter from '../components/capitalizeFirstLetter';
import getCountryFlag from '../libs/getCountryFlag';
import isItALink from '../libs/isItALink';
import trimLongString from '../libs/trimLongString';

describe('isItALink', () => {
  it('detects web links, with or without a protocol', () => {
    expect(isItALink('https://google.com')).toBe(true);
    expect(isItALink('www.engtalk.app')).toBe(true);
    expect(isItALink('google.com/search?q=english')).toBe(true);
  });

  it('detects email addresses and phone numbers', () => {
    expect(isItALink('hello@example.com')).toBe(true);
    expect(isItALink('555-123-4567')).toBe(true);
  });

  it('ignores surrounding spaces', () => {
    expect(isItALink('  https://google.com  ')).toBe(true);
  });

  it('treats normal chat text as plain text', () => {
    expect(isItALink('hello')).toBe(false);
    expect(isItALink('how are you today')).toBe(false);
    expect(isItALink('')).toBe(false);
  });
});

describe('trimLongString', () => {
  it('leaves short text unchanged', () => {
    expect(trimLongString({ text: 'Sonet' })).toBe('Sonet');
  });

  it('cuts long text at 15 characters by default and adds an ellipsis', () => {
    expect(trimLongString({ text: 'abcdefghijklmnopqrstuvwxyz' })).toBe('abcdefghijklmno...');
  });

  it('respects a custom size', () => {
    expect(trimLongString({ text: 'abcdefghij', size: 4 })).toBe('abcd...');
  });

  it('does not cut text that is exactly the limit', () => {
    expect(trimLongString({ text: 'abcd', size: 4 })).toBe('abcd');
  });
});

describe('capitalizeFirstLetter', () => {
  it('uppercases only the first letter', () => {
    expect(capitalizeFirstLetter('engTalk')).toBe('EngTalk');
  });

  it('handles an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });
});

describe('getCountryFlag', () => {
  it('returns the flag for a known country code', () => {
    expect(getCountryFlag('BD')).toBe('🇧🇩');
    expect(getCountryFlag('US')).toBe('🇺🇸');
  });

  it('returns undefined for an unknown or missing code', () => {
    expect(getCountryFlag('XX')).toBeUndefined();
    expect(getCountryFlag(null)).toBeUndefined();
  });
});
