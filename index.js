const express =require('express');
const cors  =require( 'cors');
const dotenv  =require( 'dotenv');
const chatRoute  =require( './routes/chat.js');
const docsRoute  =require( './routes/docs.js');

const app = express();
dotenv.config();







app.use(cors());
app.use(express.json());

app.use("/", chatRoute);
app.use("/", docsRoute);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});