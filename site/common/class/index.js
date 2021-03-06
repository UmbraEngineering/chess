
// 
// Simple JavaScript Inheritance
// By John Resig http://ejohn.org/
// MIT Licensed.
// 
// Inspired by base2 and Prototype
// 
// Modified for use in Cloak.js by James Brumond
// 

var merge = require('merge-recursive');

var initializing = false;

/*jshint ignore:start */
var fnTest = /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;
/*jshint ignore:end */

// The base Class implementation (does nothing)
var Class = module.exports = function(){};

// Here we allow setting of a callback to run whenever this model is extended
Class.onExtend = null;

// Add this just to help with inheritence chaining, in case anyone cares
Class._parent = Object;

// This function just passes the first param to the constructor. This is limited
// in the sense that the default only allows one param, but anything needing more
// than one is likely custom and will be written accordingly
Class.create = function(param) {
	return new this(param);
};

// Create a new Class that inherits from this class
Class.extend = function(prop) {
	var _super = this.prototype;

	// If more than one property object is given, merge them before running
	// (pseudo-support for mixins)
	if (arguments.length > 1) {
		var args = [ ];
		for (var i = 0, c = arguments.length; i < c; i++) {
			var mixin = arguments[i];
			args[i] = (typeof mixin === 'function') ? mixin.prototype : mixin;
		}
		args.unshift({ });
		prop = merge.apply(merge, args);
	}
 
	// Instantiate a base class (but only create the instance,
	// don't run the init constructor)
	initializing = true;
	var prototype = new this();
	initializing = false;
 
	// Copy the properties over onto the new prototype
	/*jshint loopfunc:true */
	for (var name in prop) {
		// Check if we're overwriting an existing function
		prototype[name] = typeof prop[name] == "function" &&
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name, fn){
				return function() {
					var tmp = this._super;
				 
					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = _super[name];
				 
					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret = fn.apply(this, arguments);        
					this._super = tmp;
				 
					return ret;
				};
			})(name, prop[name]) :
			prop[name];
	}
 
	// The dummy class constructor
	function Class() {
		// All construction is actually done in the init method
		if (! initializing && this.init) {
			this.init.apply(this, arguments);
		}
	}
 
	// Populate our constructed prototype object
	Class.prototype = prototype;
 
	// Enforce the constructor to be what we expect
	Class.prototype.constructor = Class;

	// Expose the parent class
	Class._parent = this;

	// And make this class extendable
	Class.extend = arguments.callee;

	// Add the create method to this class
	Class.create = this.create;

	// This method tests if the class extends another given class
	Class.inherits = function(Parent) {
		var Scope = this;
		do {
			if (Scope === Parent) {return true;}
			if (Scope === Object) {return false;}
		}
		// Work our way up the scope
		while (Scope = Scope._parent);
	};

	// If this class has an onExtend method, call it now with the completed class
	if (typeof this.onExtend === 'function') {
		this.onExtend.call(Class);
	}
 
	return Class;
};
