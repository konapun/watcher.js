# Watcher
Add before/after method modifiers to your objects


This is just a project I did to play around with Function.apply and is not meant
to be used in production.

### Usage
```js
var myObj = {
	sayHello: function(name) {
		console.log("Hello, " + name);
	}
};

var watchedObj = Watcher.watch(myObj);

watchedObj.before('sayHello', function(name) {
	console.log("About to say hello...");
});
watchedObj.after('sayHello' function(name) {
	console.log("You're a real nice person, " + name);
});

watchedObj.sayHello('konapun'); // writes "About to say hello..." "Hello, konapun" "You're a real nice person, konapun"
```
