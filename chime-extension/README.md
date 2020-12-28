To run the extension:

1. Install packages `npm i` in `/Extension`, `/chime-components`, and `/components-server`
1. In the `components-server` directory run `npm run start` and leave that terminal instance running
1. Load the extension manually into chrome or firefox OR run `npm run start` in `Extension` directory.
1. To test the extension in its current form navigate to any webpage (I recommend `infolab.stanford.edu` cause there isn't a lot to load) and in the console input `document.body.append(document.createElement("chime-gmail-tooltip"));`. You should see the tooltip appear in the center of the screen.