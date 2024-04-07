import { describe, it, expect } from 'vitest';
import { transformHtmlToText } from '../transformHTMLToText';

describe('transformHTMLToText', () => {
  it('should transform the HTML to a plain text', () => {
    const html = '<div><p>Hello <strong>World</strong></p></div>';
    const expectedText = 'Hello World';
    const result = transformHtmlToText(html);
    expect(result).toBe(expectedText);
  });

  it('should handle empty HTML', () => {
    const html = '';
    const expectedText = '';
    const result = transformHtmlToText(html);
    expect(result).toBe(expectedText);
  });

  it('should handle HTML with no body', () => {
    const html = '<html><head><title>Test</title></head></html>';
    const expectedText = '';
    const result = transformHtmlToText(html);
    expect(result).toBe(expectedText);
  });
});
