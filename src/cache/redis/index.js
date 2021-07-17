const redis = require("redis");

function redisClient(configuration) 
{
    const client = redis.createClient(
        configuration.password ?
        {
            host: configuration.redis.host,
            port: configuration.redis.port,
            password: configuration.redis.password
        }:
        {
            host: configuration.redis.host,
            port: configuration.redis.port
        }
    );

    client.on('error', err => {
        console.log('Error ' + err);
    });

    const setAsync = async (key, value) => {
        return new Promise(resolve => {
            client.set(key, JSON.stringify(value), (err, res) => {
                if (err) resolve(undefined);
                resolve(res);
            })
        })
    };
    
    const getAsync = async (key) => {
        return new Promise(resolve => {
                client.get(key, (err, res) => {
                    if (err) resolve(undefined);
                    resolve(JSON.parse(res));
                })
            }
        )
    };

    const getOrSetAsync = async (key, callback) => {
        let data;
        data = await getAsync(key)
        if(data === null)
        {
            data = await callback();
            const res = await setAsync(key, data)
            if(res === undefined) return res
        }
        return data
    };

    const deleteAsync = async (key) => {
        return new Promise(resolve => {
            client.del(key, (err, res) => {
                if (res == 1) resolve(true);
                resolve(false);
            })
        }
    )
    };

    return {
        getAsync: getAsync,
        setAsync: setAsync,
        getOrSetAsync: getOrSetAsync,
        deleteAsync: deleteAsync
    };
}
  
module.exports = redisClient;