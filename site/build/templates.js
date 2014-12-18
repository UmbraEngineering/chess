module.exports["app"] = module.exports["app"] || {};
module.exports["app"]["board"] = {"1":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "	<tr data-rank=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\">\n";
  stack1 = helpers.each.call(depth0, (depths[1] != null ? depths[1].files : depths[1]), {"name":"each","hash":{},"fn":this.program(2, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</tr>\n";
},"2":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "		<td data-rank=\""
    + escapeExpression(lambda(depths[1], depth0))
    + "\" data-file=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\" data-square=\""
    + escapeExpression(lambda(depth0, depth0))
    + escapeExpression(lambda(depths[1], depth0))
    + "\"></td>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "<table>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.ranks : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</table>";
},"useData":true,"useDepths":true};
module.exports["app"]["welcome"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Welcome!</h2>\n<p>\n	Here we have just plain old, simple chess. Play online with friends or with strangers worldwide.\n</p>";
  },"useData":true};