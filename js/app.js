requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app"
    },
    "shim": {
        "cell" : ["jquery"],
        "world" : ["cell"],
        "pattern" : ["cell"],
        "life" : ["world"],
        "controls" : ["life"]
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
