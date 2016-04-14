Qanvast Web
============
 * https://qanvast.com
 * Flux / React isomorphic app.
 * Connects to Qanvast API.

## Roadmap
 * Homepage with featured article and project listing.
 * Article Listing with category filters.
 * Project listing with filters.

## Installation

1. Install and run redis-server (used by the Mock backend API to store session)
2. `npm install -g gulp`
3. `gulp` to compile and run the code

## NOTES

1. For API service related for client side, refer to `/src/api/User.js`
2. `/src/api/Proxy.js` is meant for Proxy server to call backend API
3. Please take note of React Router version, which is Version 2.0.0, so refer to the right documentation
4. `/src/components/Home` & `/src/components/User` is for reference only
5. The login button on Navbar will not show anything if clicked, but it silently login a user to get the access token. You can see the effect by first clicking any of the Green button, which will show "Unauthorized" alert, then click "Login" and try click the green button again, you should not see the alert anymore.
6. Another thing to take note, there must be a `sessionId` and `csrfToken` in the cookie. If you delete the cookie from browser control, if will return "Forbidden". To resolve this, refresh/reload the page.
7. Authentication flow has not been fully implemented, step5 only provides you with example on how to make authentication network call

### Possible development workflow:

1. define routes in Routes.jsx
2. develop components (try to be as modular as possible, such as a component only concern on certain state info/data that is passed over through its attributes)
3. develop actions and stores needed
