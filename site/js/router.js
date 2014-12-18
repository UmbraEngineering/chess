
var WelcomeView = require('views/welcome');

// 
// Define the app router
// 
var router = module.exports = {

	// 
	// Map pathnames to the functions they invoke
	// 
	routes: {
		'/':        'welcome'
	},

	// 
	// 
	// 
	welcome: function() {
		document.title = 'Welcome - Web Chess';

		var view = new WelcomeView();

		this.main
			.appendChild(view.draw());
	},

	// 
	// Called when the client redirects to a route not defined in the router
	// 
	// @param {state} the History.js state object
	// @return void
	// 
	notfound: function(state) {
		document.title = 'Not Found - Web Chess';
		console.log('NOT FOUND', state.hash);
	}

};

// --------------------------------------------------------

// 
// Start up the router
// 
// @return void
// 
router.init = function() {
	router.init = function() { };
	router.main = document.querySelector('#wrapper > main');

	router.routes = Object.keys(router.routes).map(function(route) {
		return prepareRoute(route, router.routes[route]);
	});

	History.Adapter.bind(window, 'statechange', function() {
		handleStateChange(History.getState());
	});

	handleStateChange(History.getState());
};

// 
// Redirect the client
// 
// @param {path} the new path to redirect to
// @return void
// 
router.go = function(path) {
	if (typeof path === 'number') {
		History.go(path);
	} else {
		History.pushState(null, null, path);
	}
};

// --------------------------------------------------------

// 
// Parses for variable spots in pathnames
// 
var pathVariable = /:([^\/]+)/g;

// 
// Parse the routes object into regex->function associations
// 
// @param {path} the route path string
// @param {funcName} the function name
// @return object
// 
function prepareRoute(path, funcName) {
	if (typeof router[funcName] !== 'function') {
		throw new Error('Router: cannot bind URI "' + uri + '" to missing method "' + method + '"');
	}

	var result = {
		path: path,
		func: router[funcName].bind(router),
		params: [ ]
	};

	result.regex = path.replace(pathVariable, function(match, $1) {
		result.params.push($1);
		return '([^/]+)';
	});

	pathVariable.lastIndex = 0;

	result.regex += (result.regex.slice(-1) === '/') ? '?' : '/?';
	result.regex = new RegExp('^' + result.regex + '$');

	return result;
}

// 
// Called when the onstatechange event is fired; handles the actual routing
// 
// @param {state} the history state object
// @return void
// 
function handleStateChange(state) {
	var route = findRoute(state.hash);

	if (! route) {
		router.notfound(state);
		return;
	}

	route.func(route.params, state);
}

// 
// Find the correct route object for the given path string
// 
// @param {path} the path to route to
// @return object
// 
function findRoute(path) {
	path = path.split('?')[0];
	path = path.replace('#', '');

	for (var i = 0, c = router.routes.length; i < c; i++) {
		var route = router.routes[i];
		var match = route.regex.exec(path);
		if (match) {
			return prepareMatch(path, route, match);
		}
	}
}

// 
// When a matching route is found, prepare it for use, parsing out params
// 
// @param {path} the pathname redirected to
// @param {route} the route object
// @param {match} the matched param values
// @return object
// 
function prepareMatch(path, route, match) {
	var params = { };
	
	route.params.forEach(function(param, index) {
		params[param] = match[index + 1] || null;
	});

	return {
		path: path,
		func: route.func,
		params: params
	};
}
