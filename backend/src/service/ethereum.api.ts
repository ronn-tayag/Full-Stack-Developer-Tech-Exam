import axios from 'axios';
import { config } from 'dotenv';

config({path:'.env'})

const instance = axios.create({
  baseURL: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
  headers: {
    "Content-Type": "application/json"
  },
});

export default instance