/** @typedef {{ depth: number, slug: string, text: string }} Heading */
/** @typedef {Heading & { children: OutlineNode[] }} OutlineNode */

/** Build a hierarchy without inventing headings for skipped Markdown levels.
 * @param {Heading[]} headings
 * @returns {OutlineNode[]}
 */
export function buildOutline(headings) {
  /** @type {OutlineNode[]} */
  const roots = [];
  /** @type {OutlineNode[]} */
  const stack = [];
  for (const heading of headings) {
    const node = { ...heading, children: [] };
    while (stack.length && stack.at(-1).depth >= heading.depth) stack.pop();
    (stack.at(-1)?.children ?? roots).push(node);
    stack.push(node);
  }
  return roots;
}

/** Select the last heading above the reading line, including after large scroll jumps.
 * @param {number[]} tops Heading positions relative to the viewport, in document order.
 * @param {number} readingLine
 * @param {boolean} atEnd
 */
export function activeHeadingIndex(tops, readingLine, atEnd = false) {
  if (!tops.length) return -1;
  if (atEnd) return tops.length - 1;
  let active = 0;
  for (let i = 0; i < tops.length; i++) {
    if (tops[i] > readingLine) break;
    active = i;
  }
  return active;
}
