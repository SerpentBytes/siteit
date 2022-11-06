import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';

export const mdParser = (content = '') => {
  const md = new Remarkable('full');

  md.set({
    html: true,
    xhtmlOut: false,
    breaks: false,
    typographer: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    linkify: true,
    linkTarget: '',
    // eslint-disable-next-line func-names
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {
          // do nothing
        }
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (__) {
        // do nothing
      }

      return ''; // use external default escaping
    },
  });
  return md.render(content);
};

export default mdParser;
