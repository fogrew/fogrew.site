'use strict';

/**
 * Short name of querySelector
 * @param  {String} query called DOM element
 * @return {NodeList} native js DOM element call
 * @example
 * // returns DOM element
 * $('.search')
 */
let $ = (query) => {
  let nodes = document.querySelectorAll(query);
  if(nodes.length > 1) {
    if(!nodes.forEach) {
      nodes = Array.from(nodes);
    }
  } else {
    nodes = nodes[0];
  }
  return nodes;
};

module.exports = $;
