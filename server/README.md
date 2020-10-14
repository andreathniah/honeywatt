# PH!SH Command and Control Server

PH!SH C2 server acts as command and control server between the browser extension and analysis server.

## Commands

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

## Todo

- [ ] Determine logic for whitelist and blacklist entries
- [ ] Take screenshots of given URL
- [x] Add NoSQL database
- [x] Ensure persistence data for containerization
- [x] Restructure server to support containerization

## Authors

- [Andrea Thniah](https://github.com/andreathniah)
- [Sylvest Shu](https://github.com/sylvestshu)
- Sylvia Soh
