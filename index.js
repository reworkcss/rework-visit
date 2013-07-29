
/**
 * Visit `node`'s declarations recursively and
 * invoke `fn(declarations, node)`.
 *
 * @param {Object} node
 * @param {Function} fn
 * @api private
 */

module.exports = function(node, fn){
  node.rules.forEach(function(rule){
    // @media etc
    if (rule.rules) {
      exports.declarations(rule, fn);
      return;
    }

    // keyframes
    if (rule.keyframes) {
      rule.keyframes.forEach(function(keyframe){
        if (keyframe.type == 'keyframe') {
          fn(keyframe.declarations, rule);
        }
      });
      return;
    }

    // @charset, @import etc
    if (!rule.declarations) return;

    fn(rule.declarations, node);
  });
};
