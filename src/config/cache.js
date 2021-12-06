const mongoose = require( 'mongoose');
const exec = mongoose.Query.prototype.exec;


const redis = require("redis");
const util  = require("util");
const redisUrl = 'redis://127.0.0.1:6379';

const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);
// client.hset = util.promisify(client.hset);

// const GET_ASYNC = promisify(client.get).bind(client);
// const SET_ASYNC = promisify(client.set).bind(client);
mongoose.Query.prototype.cache = function( options = {} ) {
    // this.useCache = true;
    // this.hashinGkey = JSON.stringify(options.Key || '' ); 
    // return this;
    this.useCache = true;
    this.hashinGkey = JSON.stringify(options.Key || '');
    return this;
}

mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) {
      return exec.apply(this, arguments);
    }
    console.log('IM ABOUT TO RUN A QUERY'); 
        const key = JSON.stringify(Object.assign({} , this.getQuery() , { 
        collection: this.mongooseCollection.name
    }));
    // So if we have a value of key for redis
    const cacheValue = await client.hget(this.hashinGkey, key);
    //if yes then retunr it
    if (cacheValue) {
      const doc = JSON.parse(cacheValue);

      return Array.isArray(doc)
        ? doc.map((d) => new this.model(d))
        : new this.model(doc);
    }
    //Otherwise Run query and store (query-result) it in Redis
    const result = await exec.apply(this, arguments);
    await client.hset(this.hashinGkey, key, JSON.stringify(result));
    return result;
}


module.exports = {
    clearHash(hashinGkey){
        client.del(JSON.stringify(hashinGkey));

    }
} 