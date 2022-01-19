export default async function ({ app, route, redirect }) {
  // the following look directly for the cookie created by nuxtjs/auth
  // instead of using $auth.loggedIn
  console.log(route.path)
  // routes ALSO accessible by people not logged in (e.g. home page, basic plan)
  const freeRoutes = ['/']
  const freeRegex = /^\/app(\/(settings|utilities|people(\/.+)?)\/?)?$/
  // routes ONLY accessible by people not logged in
  const guestRegex =  /^\/(login|register)\/?$/

  // name of cookie
  const user = await app.$cookies.get('auth._token.schoology')
  console.log(user);
  // if the user is logged in
  if (freeRoutes.includes(route.path) || freeRegex.test(route.path)) {
    // do nothing
  }
  else if (guestRegex.test(route.path)){
    if (user) {
      redirect('/app')
    } else {
      // do nothing

    }
  }
  else {
    if (user || true) { // this should be temporary!
      // let the user see the page if it isnt guest
    } else {
      // redirect to homepage
      redirect('/login')
    }
  }
}
