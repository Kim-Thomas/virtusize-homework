const state = {
  user: {},
}

const mutations = {
  updateUser (state,data) {
    Object.assign(state.user, data);
  }
}

const actions = {
  /**
   * Try to log in a user
   * Parameters:
   * - (String) params.email : user email.
   * - (String) params.password : user password.
   * - (Boolean) params.remember : whether to create a session or not. default to false.
   */
  tryLogin({commit, state}, params) {
    return new Promise((resolve, reject) => {
      // The login logic should go there, as this is just a homework, I will fake the HTTP request delay with a timeout for realistic purposes.
      setTimeout(function() {
        // Demo code follows, simply returning a user as long as the provided email was haruki@murakami.com
        if(params.email.toLowerCase() == 'haruki@murakami.com') {
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
  /**
   * Updates the user in the store, and calls the API for updating the user in the DB.
   * Parameters:
   * - (Object) user : a user.
   */
  updateUser({ commit, state }, user) {
    return new Promise((resolve, reject) => {
      // Here we should do some sanitizing and checking before updating the store.
      commit('updateUser', user);
      resolve('User has been updated.');
    });
  },
  /**
   * Updates the user password.
   * Parameters:
   * - (Int) user_id : the user id of the user willing to change his password.
   * - (String) password : the new password.
   */
  updateUserPassword({ commit, state }, user_id, password) {
    return new Promise((resolve, reject) => {
      // Here we should do some sanitizing and checking before updating the store.
      // Update the user password.
      resolve('User password has been updated.');
    });
  },
  /**
   * Logs the user out:
   * - Empty the user in the store.
   * - Destroys the session.
   */
  logOut({commit, state}) {
    return new Promise((resolve, reject) => {
      commit('updateUser', false);
      // Destroying the session
      sessionStorage.setItem('session_user', false);
      resolve('Now logged out.');
    });
  },
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