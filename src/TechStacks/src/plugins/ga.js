/* eslint-disable */

export default ({app}) => {
    /*
    ** Only run on client-side and only in production mode
    */
    if (process.env.NODE_ENV !== 'production') return
    /*
    ** Include Google Analytics Script
    */
    const gtag = (function (i, s, o, g, r, a, m) {
        i['GoogleTagObject'] = gtag;
        a = s.createElement(o), m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
        i['dataLayer'] = i['dataLayer'] || [];
        function gtag(){i['dataLayer'].push(arguments)}
        return gtag
    })(window, document, 'script', 'https://www.googletagmanager.com/gtag/js?id=G-9EZHMS9ZM6');
    /*
    ** Set the current page
    */
    gtag('js', new Date());
    gtag('config', 'G-9EZHMS9ZM6');
    /*
    ** Every time the route changes (fired on initialization too)
    */
    app.router.afterEach((to, from) => {
        /*
        ** We tell Google Analytics to add a `pageview`
        */
        gtag('set', 'page', to.fullPath)
        gtag('send', 'pageview')
    })
}
