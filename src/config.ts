import { config } from 'dotenv';

config();

export const password = process.env.password || "1234" ;
export const user = process.env.user || "root";
export const host = process.env.host || "localhost";

