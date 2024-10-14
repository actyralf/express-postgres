const Redis = require("redis");
const redisClient = Redis.createClient();

async function connectRedisClient() {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log("Connected to Redis successfully!");
    } catch (error) {
      console.error("Error connecting to Redis:", error);
    }
  } else {
    console.log("Redis connection is already open.");
  }
}

const KeyValueStore = {
  /**
   * The Redis client.
   */
  redisClient,
  /**
   * Delete all data from the key value store.
   * @returns {Promise<string>}
   */
  flushData: async function flushData() {
    await connectRedisClient();
    const result = await redisClient.flushAll();
    return result;
  },
  /**
   * Insert data into the key value store.
   * @param {string} key
   * @param {object} data
   * @returns {Promise<number>}
   */
  insertData: async function insertData(key = "", data = {}) {
    const dataString = JSON.stringify(data);
    await connectRedisClient();
    const result = await redisClient.sendCommand(["RPUSH", key, dataString]);
    if (typeof result === "number" && result < 1) {
      throw new Error(result);
    }
    return result;
  },
  /**
   * Get data from the key value store.
   * @param {string} key
   * @returns {Promise<object[]>}
   */
  getData: async function getData(key = "") {
    await connectRedisClient();
    const dataArray = await redisClient.sendCommand(["LRANGE", key, "0", "-1"]);
    const json = dataArray.map((entry) => {
      console.debug(entry);
      return JSON.parse(entry);
    });
    console.debug({ json });
    return json;
  },
};

module.exports = KeyValueStore;
