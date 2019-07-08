const state = {
  user: false,
}

const mutations = {
  updateUser (state,data) {
    state.user = data;
  }
}

const actions = {
  tryLogin({commit, state}, params) {
    return new Promise((resolve, reject) => {
      // The login logic should go there, as this is just a homework, I will fake the HTTP request delay with a timeout for realistic purposes.
      setTimeout(function() {
        let md5 = require('md5');
        // Fake API answer, returning the user.
        let api_answer = {
          _id: 267,
          username: 'Murakami Haruki'
        }
        // Demo code follows, simply returning a user as long as the provided email was haruki@murakami.com
        if(params.email == 'haruki@murakami.com') {
          // Updating the store
          commit('updateUser', api_answer);
          // Creating a session
          //sessionStorage.setItem('session_user', JSON.stringify(api_answer));
          resolve('Now logged.')
        } else {
          reject(Error('Incorrect logs. You should try with haruki@murakami.com ;)'))
        }
      }, 600);
    })
  },
  forceLogin({commit, state}, user) {
    commit('updateUser', user);
  },
  logOut({commit, state}) {
    commit('updateUser', false);
    sessionStorage.setItem('session_user', false);
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