import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import markdownItYamlPlugin from "markdown-it-meta-yaml";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import markdownItAnchors from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import { html5Media as markdownItHtml5Media } from "markdown-it-html5-media";

// ? https://github.com/highlightjs/highlightjs-vue/blob/master/vue.js
hljs.registerLanguage("vue", (hljs) => ({
  subLanguage: "xml",
  contains: [
    hljs.COMMENT("<!--", "-->", {
      relevance: 10,
    }),
    {
      begin: /^(\s*)(<script>)/gm,
      end: /^(\s*)(<\/script>)/gm,
      subLanguage: "javascript",
      excludeBegin: true,
      excludeEnd: true,
    },
    {
      begin: /^(?:\s*)(?:<script\s+lang=(["'])ts\1>)/gm,
      end: /^(\s*)(<\/script>)/gm,
      subLanguage: "typescript",
      excludeBegin: true,
      excludeEnd: true,
    },
    {
      begin: /^(\s*)(<style(\s+scoped)?>)/gm,
      end: /^(\s*)(<\/style>)/gm,
      subLanguage: "css",
      excludeBegin: true,
      excludeEnd: true,
    },
    {
      begin:
        /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])(?:s[ca]ss)\1(?:\s+scoped)?>)/gm,
      end: /^(\s*)(<\/style>)/gm,
      subLanguage: "scss",
      excludeBegin: true,
      excludeEnd: true,
    },
    {
      begin:
        /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])stylus\1(?:\s+scoped)?>)/gm,
      end: /^(\s*)(<\/style>)/gm,
      subLanguage: "stylus",
      excludeBegin: true,
      excludeEnd: true,
    },
  ],
}));

export interface TableOfContentItem {
  title: string;
  level: number;
  link: string;
}
export type TableOfContent = TableOfContentItem[];

const parser = new MarkdownIt({
  // ? From the MdIt doc
  highlight: (code, language) => {
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(code, { language }).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
  linkify: true,
  html: true,
});
//? To open links in a new tab (from the MdIt docs)
parser.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const link = tokens[idx].tag === "a" && tokens[idx].attrGet("href");
  // Add a new `target` attribute, or replace the value of the existing one if the link is an extern one.
  if (!link || link.startsWith("http")) tokens[idx].attrSet("target", "_blank");

  // Pass the token to the default renderer.
  return self.renderToken(tokens, idx, options);
};

let tempMetadatas: object | undefined;
let tempTOC: TableOfContent | undefined;
parser
  .use(markdownItYamlPlugin, {
    cb: (json: object) => (tempMetadatas = json),
  })
  .use(markdownItAnchors, {
    permalinks: true,
  })
  .use(markdownItTocDoneRight, {
    callback(tocCode, ast) {
      tempTOC = [];
      function parse(infos: typeof ast) {
        if (infos.l)
          tempTOC?.push({
            level: infos.l,
            title: infos.n,
            link: encodeURI(`#${infos.n.toLowerCase().split(" ").join("-")}`),
          });
        if (infos.c.length) infos.c.forEach((sub) => parse(sub));
      }

      parse(ast);
    },
  })
  .use(markdownItAttrs)
  .use(markdownItHtml5Media, {
    videoAttrs: `controls autoplay loop muted`,
  });

export default function parseMarkdown<metadata>(raw: string) {
  const md = raw.replace(/---(?:.|[\r\n])*^---/m, "").trim();

  const html = parser.render(raw);
  const result = {
    parsed: { raw, html, md },
    meta: {
      metadata: tempMetadatas as metadata | undefined,
      toc: tempTOC,
    },
  };
  tempMetadatas = tempTOC = undefined;
  return result;
}
