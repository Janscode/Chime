const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static('./node_modules/chime-components/dist/chime-components'));

const port = 5050;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {console.log(`Listening on port: ${port}`)})