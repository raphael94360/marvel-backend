require("dotenv").config()
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(cors())

const apiKey = process.env.apiKey

console.log(apiKey)

app.get("/", (req, res) => {
  res.json({ message: "mon backend marvel" })
})

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:4000/comics?apiKey=${apiKey}`)

    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.listen(process.env.PORT || 4000, () => {
  console.log("server started")
})
