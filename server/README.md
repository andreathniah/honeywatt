# PH!SH Command and Control Server

PH!SH C2 server acts as command and control server between the browser extension and analysis server.

## Commands

```
// to set up dev environment
docker-compose up --build

// to shut down dev environment
docker-compose down

// to check logs
docker ps
docker logs <CONTAINER_ID> -f
```

## Todo

- [ ] Take screenshots of given URL
- [x] Add NoSQL database
- [ ] Determine logic for whitelist and blacklist entries
- [x] Restructure server to support containerization
- [ ] Ensure persistence data for containerization

## Authors

- [Andrea Thniah](https://github.com/andreathniah)
- [Sylvest Shu](https://github.com/sylvestshu)
- Sylvia Soh
