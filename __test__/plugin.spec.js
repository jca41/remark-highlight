const remark = require('remark');
const stringify = require('remark-rehype');
const html = require('rehype-stringify');
const remarkHighlight = require('../');
const fs = require('fs');

describe('remarkHighlight', function () {
  it('should parse simple text', function () {
    let { contents } = remark()
      .data('settings', {
        position: false,
      })
      .use(remarkHighlight)
      .use(stringify, { allowDangerousHtml: true })
      .use(html, { allowDangerousHtml: true })
      .processSync(`==highlighted==`);

    expect(contents).toMatchInlineSnapshot(`"<p><mark className=\\"highlight\\">highlighted</mark></p>"`);
  });

  it('should parse multiple highlighted text', function () {
    let { contents } = remark()
      .data('settings', {
        position: false,
      })
      .use(remarkHighlight)
      .use(stringify, { allowDangerousHtml: true })
      .use(html, { allowDangerousHtml: true })
      .processSync(`==highlighted==break==more==`);

    expect(contents).toMatchInlineSnapshot(
      `"<p><mark className=\\"highlight\\">highlighted</mark>break<mark className=\\"highlight\\">more</mark></p>"`
    );
  });

  it('should parse complex markdown', function () {
    let { contents } = remark()
      .data('settings', {
        position: false,
      })
      .use(remarkHighlight)
      .use(stringify, { allowDangerousHtml: true })
      .use(html, { allowDangerousHtml: true })
      .processSync(fs.readFileSync(`${__dirname}/fixtures/note.md`, 'utf8'));

    expect(contents).toMatchInlineSnapshot(`
      "<h1>Some heading</h1>
      <p>This is a paragraph. It contains <mark className=\\"highlight\\">highlighted</mark> text.
      More <mark className=\\"highlight\\">text</mark>, also <mark className=\\"highlight\\">here</mark>.
      <strong>bold</strong> in bold.</p>
      <h1><mark className=\\"highlight\\">Highlighted text in heading</mark></h1>
      <p><a href=\\"http://example.pt\\"><mark className=\\"highlight\\">Some</mark></a></p>"
    `);
  });
});
