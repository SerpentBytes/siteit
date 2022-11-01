import { Remarkable } from 'remarkable'
import hljs from 'highlight.js'

export const mdParser = (content = '') => {
    let md = new Remarkable('full')

    md.set({
        html: true,
        xhtmlOut: false,
        breaks: false,
        typographer: true,
        langPrefix: 'language-',
        quotes: '“”‘’',
        linkify: true,
        linkTarget: '',
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value
                } catch (__) {}
            }

            try {
                return hljs.highlightAuto(str).value
            } catch (__) {}

            return '' // use external default escaping
        },
    })
    return md.render(content)
}

export default mdParser
