# virtusize-homework
Homework for Virtusize, a login page followed by an edit account page. Made with Vue.js/VueX/Vue Router

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Usage

### Logging-in
In order to log-in, simply use the following email with **any password**.
```
haruki@murakami.com
```
You can also check the *remember me* checkbox to create a session.

![How to log-in](https://thomaskim.fr/public_assets/logging-in.gif)

### Editing the account

#### Changing user's fullname
To change the user's name, click on the **little blue pen** next to the user's fullname, then edit the first name and last name.

After you are done with your modifications, click on the "Save Modifications" button at the top of the page.

![Editing User's Fullname](https://thomaskim.fr/public_assets/editing-user-fullname.gif)

#### Changing user's email / gravatar
To change the user's portrait, you need to change its email to match a linked Gravatar portrait.

To edit the email, click on the **little blue pen** next to the user's email and type in your email. If we detect a gravatar linked to that email, it will be displayed automatically.

![Editing User's Email](https://thomaskim.fr/public_assets/editing-user-email.gif)

#### Changing user's password

In order to change the user password, start by entering **any password** ( longer than 1 character ) in the *Current Password* field.

Then add a new password in the *New Password* field, **it must obtain a ZXCVBN score superior or equal to 3**.

Once this is done, click on the "Update Password" button to save your modifications.

> Note: the assignment was stating:  "Password form should have an option to unmask (no confirm password field) and should display a strength meter.", I'm not sure if it meant no current password field, or no "confirm new password a second time" field. In doubt, I went for the second option.

![Editing User's Password](https://thomaskim.fr/public_assets/editing-user-password.gif)

### Logging-out

To log-out, click on the *log-out* link at the bottom of the left sidebar in the dashboard.