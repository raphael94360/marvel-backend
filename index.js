require("dotenv").config()
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const apiKey = process.env.MARVEL_API_KEY

const app = express()
app.use(cors())

console.log(apiKey)

app.get("/", (req, res) => {
  res.json({ message: "mon backend marvel" })
})

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get("https://raphael-marvel-backend.herokuapp.com/characters?apiKey=" + apiKey)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(`https://raphael-marvel-backend.herokuapp.com/comics?apiKey=${apiKey}&limit=${req.query.limit}`)

    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.get("/characters/:characterID", async (req, res) => {
  try {
    const response = await axios.get(`https://raphael-marvel-backend.herokuapp.com/character/${req.params.characterID}?apiKey=${apiKey}`)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.get("/comics/:characterID", async (req, res) => {
  try {
    const response = await axios.get(`https://raphael-marvel-backend.herokuapp.com/comics/${req.params.characterID}?apiKey=${apiKey}`)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.listen(process.env.PORT || 4000, () => {
  console.log("server started")
})
