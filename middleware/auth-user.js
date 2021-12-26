export default async function ({ app, route, redirect }) {
  // the following look directly for the cookie created by nuxtjs/auth
  // instead of using $auth.loggedIn
  console.log(route.path)
  const freeRoutes = ['/']
  const guestRegex =  /^\/(login|register)\/?$/
  const user = await app.$cookies.get('auth._token.local')
  // if the user is logged in
  if (freeRoutes.includes(route.path)){
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
    if (user) {
      // let the user see the page if it isnt guest
    } else {
      // redirect to homepage
      redirect('/login')
    }
  }
}
