import express from "express";
import fetch from "node-fetch";
import path from "path";


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static("public"));


// 🔐 Use environment variable
const API_KEY = process.env.OPENAI_API_KEY;


app.post("/api/chat", async (req, res) => {
try {
const { messages } = req.body;


const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages,
temperature: 0.7
})
});


const data = await response.json();
res.json(data);


} catch (err) {
res.status(500).json({ error: err.message });
}
});


app.listen(PORT, () => {
console.log(`AI Chat running at http://localhost:${PORT}`);
});