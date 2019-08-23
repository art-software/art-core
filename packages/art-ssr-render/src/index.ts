const LEFT = '<!--';
const RIGHT = '-->';

const ENCODE = [
  ['&', '&amp;'],
  ['>', '&gt;'],
];

const DATA_KEY = 'ssr-key';
const DATA_ID = 'ssr-id';

function uuid() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (x) => (x ^ Math.random() * 16 >> x / 4).toString(16)
  );
}

function encode(obj) {
  return ENCODE.reduce((str, coding) => {
    const [encodeChar, htmlEntity] = coding;
    return str.replace(new RegExp(encodeChar, 'g'), htmlEntity);
  }, JSON.stringify(obj));
}

function decode(res) {
  const jsonPayload = ENCODE.reduceRight((str, coding) => {
    const [encodeChar, htmlEntity] = coding;
    return str.replace(new RegExp(htmlEntity, 'g'), encodeChar);
  }, res);

  return JSON.parse(jsonPayload);
}

function makeValidDataAttribute(attr: string, value: string): string {
  const encodedAttr = attr.toLowerCase().replace(/[^0-9a-z_-]/g, '');
  const encodedValue = value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return `data-${encodedAttr}="${encodedValue}"`;
}

export function toScript(attrs: any, data: any) {
  const dataAttributes = Object.keys(attrs).map((name) => {
    return makeValidDataAttribute(name, attrs[name]);
  });

  return `<script type="application/json" ${dataAttributes.join(' ')}>${LEFT}${encode(data)}${RIGHT}</script>`;
}

export function fromScript(attrs) {
  const selectors = Object.keys(attrs)
    .map((name) => {
      return `[${makeValidDataAttribute(name, attrs[name])}]`;
    })
    .join('');

  const node = document.querySelector(`script${selectors}`);
  if (!node) { return null; }
  const jsonPayload = node.innerHTML;

  return decode(jsonPayload.slice(LEFT.length, jsonPayload.length - RIGHT.length));
}

export function serialize(name: string, html: string, data: string) {
  const key = name.replace(/\W/g, '');
  const id = uuid();
  const markup = `<div data-${DATA_KEY}="${key}" data-${DATA_ID}="${id}">${html}</div>`;
  const script = toScript({
    [DATA_KEY]: key,
    [DATA_ID]: id,
  }, data);
  return `${markup}\n${script}`;
}

export function load(name: string) {
  const key = name.replace(/\W/g, '');
  const nodes = document.querySelectorAll(`div[data-${DATA_KEY}="${key}"]`);

  return Array.prototype.map.call(nodes, (node) => {
    const id = node.getAttribute(`data-${DATA_ID}`);
    const data = fromScript({
      [DATA_KEY]: key,
      [DATA_ID]: id,
    });
    return { node, data };
  });
}

export function ssrRender(runner) {
  return typeof window === 'undefined'
    ? runner.server()
    : runner.client();
}