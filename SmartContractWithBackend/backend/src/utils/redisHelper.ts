import { createClient } from "redis";

class RedisHelper {
  client;
  isReady = false;

  constructor() {
    this.client = createClient();
  }

  async initialize() {
    this.client.on("error", (err) => console.log(`Redis Error: ${err}`));
    this.client.on("connect", () => console.log("Redis connected"));
    this.client.on("reconnecting", () => console.log("Redis reconnecting"));
    this.client.on("ready", () => {
        console.log("Redis ready!");
        this.isReady = true;
    });
    await this.client.connect();
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, value: string) {
    return this.client.set(key, value);
  }

  async setWithDelay(key: string, value: string, inSecond: number) {
    return this.client.set(key, value, { EX: inSecond });
  }
    
    async deleteKey(key:string){
     return this.client.del(key);
    }
}

export default RedisHelper;
