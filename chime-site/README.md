# Working with chime-site

First, contact the team to ensure you have the environment variables necessary for running the project.

1. Make sure you have a firebase emulator installed. [Instructions.](https://firebase.google.com/docs/emulator-suite/install_and_configure)
1. Start the emulator in the `firebase-emulator` folder
1. `npm run start`
1. App will run on `localhost:3000/` by default

## Problems

To resolve issues with `node-sass` on latest mac versions:
1. You made to do this: https://stackoverflow.com/questions/63300339/npm-install-error-no-xcode-or-clt-version-detected
1. Then this: `npm rebuild node-sass`