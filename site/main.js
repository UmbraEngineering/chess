
var auth    = require('auth');
var router  = require('router');

auth.checkForToken()
	.then(router.init)
	.catch(function(err) {
		console.error(err.stack || err);
	});
