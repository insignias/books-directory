import { config } from 'dotenv';
import { db } from './db';
import { createServer } from './app';

config({path: '.env'})

const port = process.env.PORT || 4000;

const app = createServer();

app.listen(port, async () => {
    console.log(`Server started at port: ${port}`)

    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('Connected to Database'))
    db.on('disconnected', () => 'Disconnected from Database')
});

export default app;