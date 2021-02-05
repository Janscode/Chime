# Working with chime-site

First, contact the team to ensure you have the environment variables necessary for running the project.

1. Make sure you have a firebase emulator installed. [Instructions.](https://firebase.google.com/docs/emulator-suite/install_and_configure)
1. In the `chime-site` directory you will want two active terminals. Start the emulator in one with `npm run emulate`
1. In the other `npm run start` -> this is not required but is suggested. This will allow hot reloading for dev work. If you generate a build you can also use `localhost:5000/`
1. Using the suggested steps the app will run on `localhost:3000/` by default

## Problems

To resolve issues with `node-sass` on latest mac versions:
1. You made to do this: https://stackoverflow.com/questions/63300339/npm-install-error-no-xcode-or-clt-version-detected
1. Then this: `npm rebuild node-sass`