require([


    // Application.
    "app",

    "dom",

    // Main Router.
    "router"
],

function( App, DOM, Router ) {

    // Define your master router on the Application namespace and trigger all
    // navigation from this instance.
    App.router = new Router();

    Sonic.router = App.router;

    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in App.js.
    Backbone.history.start({
        pushState: true,
        root: App.root
    });

    console.log( "Main:", App );

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    DOM.doc.on( "click", "a[href]:not([data-bypass])", function( evt ) {
        var href, root;

        // Get the absolute anchor href.
        href = {
            prop: $(this).prop("href"),
            attr: $(this).attr("href")
        };

        // Get the absolute root.
        root = location.protocol + "//" + location.host + App.root;

        // Ensure the root is part of the anchor href, meaning it's relative.
        if ( href.prop.slice( 0, root.length ) === root ) {
            // Stop the default event to ensure the link will not cause a page
            // refresh.
            evt.preventDefault();

            // `Backbone.history.navigate` is sufficient for all Routers and will
            // trigger the correct events. The Router's internal `navigate` method
            // calls this anyways.  The fragment is sliced from the root.
            Backbone.history.navigate( href.attr, true );
        }
    });

});
