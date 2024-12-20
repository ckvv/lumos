import hljs from 'highlight.js';
import markdownItKatexGpt from 'markdown-it-katex-gpt';
import 'highlight.js/styles/github.min.css';

export {
  markdownItKatexGpt,
};

export function highlight(str: string, lang: string) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(str, { language: lang }).value;
    // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (_err: any) {
      return str;
    }
  }
  return str; // use external default escaping
}
