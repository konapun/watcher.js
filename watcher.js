/*
 * Convert an object into one that accepts before/after method modifiers
 *
 * Author: Bremen Braun
 */
var Watcher = typeof watcher !== 'undefined' ? watcher : {};
Watcher.watch = function(obj, hasOwn) {
	hasOwn = typeof hasOwn === 'undefined' ? false : hasOwn;
	
	var modifiers = [],
	    watchable = Object.create(obj);
	for (var m in obj) {
		(function(m) {
			var prop = obj[m];
			if (typeof prop === 'function') {
				if (!hasOwn || (hasOwn && obj.hasOwnProperty(prop))) {
					modifiers[m] = [];
					modifiers[m].before = [];
					modifiers[m].after = [];
					watchable[m] = function() {
						var mod = modifiers[m];
						for (var i = 0; i < mod.before.length; i++) {
							mod.before[i].apply(this, arguments);
						}
						prop.apply(watchable, arguments);
						for (var i = 0; i < mod.after.length; i++) {
							mod.after[i].apply(this, arguments);
						}
					};
				}
			}
		})(m);
	}
	
	watchable.before = function(func, cb) {
		modifiers[func].before.push(cb);
	};
	
	watchable.after = function(func, cb) {
		modifiers[func].after.push(cb);
	};
	
	return watchable;
};
