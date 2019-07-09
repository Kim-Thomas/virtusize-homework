const state = {
  user: {},
}

const mutations = {
  updateUser (state,data) {
    Object.assign(state.user, data);
  }
}

const actions = {
  tryLogin({commit, state}, params) {
    return new Promise((resolve, reject) => {
      // The login logic should go there, as this is just a homework, I will fake the HTTP request delay with a timeout for realistic purposes.
      setTimeout(function() {
        // Demo code follows, simply returning a user as long as the provided email was haruki@murakami.com
        if(params.email == 'haruki@murakami.com') {
          // Fake API answer, returning the user.
          let api_answer = {
            _id: 267,
            first_name: 'Haruki',
            last_name: 'Murakami',
            email: 'haruki@murakami.com',
          }
          // Updating the store
          commit('updateUser', api_answer);
          // Creating a session if remember me was checked
          if(params.remember) {
            sessionStorage.setItem('session_user', JSON.stringify(api_answer));
          }
          resolve('Now logged.')
        } else {
          reject(Error('Incorrect logs. You should try with haruki@murakami.com ;)'))
        }
      }, 600);
    })
  },
  // Would be used when detecting a session. But not this time as it's a demo.
  forceLogin({commit, state}, user) {
    return new Promise((resolve, reject) => {
      commit('updateUser', user);
      resolve('Now logged.');
    });
  },
  logOut({commit, state}) {
    return new Promise((resolve, reject) => {
      commit('updateUser', false);
      // Destroying the session
      sessionStorage.setItem('session_user', false);
      resolve('Now logged out.');
    });
  }
}

const getters = {
}

const user = {
    state,
    getters,
    mutations,
    actions,
    strict: false
}

export default user