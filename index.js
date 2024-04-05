const express = require(`express`);
const app = express();
const port = 8080;
const cors = require(`cors`);

app.use(cors());

const userRoute = require(`./routes/user.route`);
app.use(`/user`, userRoute);

const eventRoute = require(`./routes/event.route`)
app.use(`/event`,eventRoute)

app.use(express.static(__dirname))

//run server
app.listen(port, () => {
  console.log(`jalan server run on port ${port}`);
});
