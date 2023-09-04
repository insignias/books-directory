import mongoose from 'mongoose';
import { config } from 'dotenv';

config({path: '.env'})

mongoose.connect(process.env.DATABASE_URL!, {
    dbName: 'booksDirectory'
});

export const db = mongoose.connection;
