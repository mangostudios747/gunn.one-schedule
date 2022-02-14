export default async function EliminationPersistPlugin(store) {
  // called when the store is initialized
  // fetch the user

  if (store.state.auth.loggedIn){
    console.info('Schoology user detected, checking for elimination login on server.')
    const {error, user} = await fetch('/api/auth/elimination/user', {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth._token.schoology')}),
    }).then(e=>e.json());
    if (user) {
      console.info('Elimination user found, logging in.')
      store.commit('elimination/setUser', user);
    }
    else {
      console.log(error)
    }

  }
  else {
    console.info('Guest mode detected, checking for elimination user locally.')
    const user = localStorage.getItem('g1.eliminationUser')
    if (user){

    }

  }

  store.subscribe(async (mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    const namespace = mutation.type.split('/')[0];
    if (mutation.type === 'elimination/setUser') {
      const eState = state[namespace];

      // save the user
      if (state.auth.loggedIn){
        const response = await fetch('/api/auth/elimination/user', {
          method: 'POST',
          body: JSON.stringify({user: eState.user}),
          headers: new Headers({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('auth._token.schoology')}),

        });
        console.log(await response.json())
      }
      else {
        // no G1 user logged in
        localStorage.setItem('g1.eliminationUser', eState.user)
      }



    }
  })
}