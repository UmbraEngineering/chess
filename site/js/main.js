
var auth    = require('auth');
var router  = require('router');

auth.checkForToken()
	.then(router.init);
