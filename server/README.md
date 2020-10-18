# PH!SH Command and Control Server

PH!SH C2 server acts as command and control server between the browser extension and analysis server.

## Commands

### Set up docker environment

```javascript
// to set up dev environment
docker-compose up -d

// to shut down dev environment
docker-compose down

// if MongoNetworkError: connect ECONNREFUSED xx.xx.xx.xx:27017
docker-compose build
docker-compose up

// to check logs
docker ps
docker logs <CONTAINER_ID> -f
```

### Running Unit Tests

```
npm test
```

## Todo

- [x] Add NoSQL database
- [ ] Determine logic for whitelist and blacklist entries
- [x] Ensure persistence data for containerization
- [x] Restructure server to support containerization
- [x] Setup structure for unit tests
- [x] Setup VSCode NodeJS debugger
- [x] Take screenshots of given URL

## Authors

- [Andrea Thniah](https://github.com/andreathniah)
- [Sylvest Shu](https://github.com/sylvestshu)
- Sylvia Soh

## References

- [Unit Testing](www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai)
