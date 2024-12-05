import express from 'express';
import cors from "cors";
import cipherRouter from "./routes/cipher";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/', cipherRouter);


app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});