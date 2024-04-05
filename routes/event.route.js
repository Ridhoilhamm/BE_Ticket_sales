const express = require(`express`);
const app = express();

app.use(express.json());
const eventController = require(`../controllers/event.controller`);
//method yang digunakan untuk megecek dipostman
app.get("/", eventController.getAllEvent);
app.get("/:key", eventController.findEvent); // mendapatkan data berdasarkan pencarian
app.post("/", eventController.addEvent); //digunakan untuk menambahkan event
app.put("/:id", eventController.updateEvent); //digunakan untuk mengupdate data
app.delete("/:id", eventController.deleteEvent); // digunakan untuk menghapus event

module.exports = app;
