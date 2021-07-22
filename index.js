const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

module.exports = function () {
  const highlightRegex = /==(.+?)==/g;

  return function (ast) {
    visit(ast, 'text', (node) => {
      const paragraph = toString(node);

      if (paragraph.match(highlightRegex)) {
        const html = paragraph.replace(highlightRegex, `<mark className="highlight">$1</mark>`);

        node.type = 'html';
        node.children = undefined;
        node.value = html;
      }
    });
  };
};
