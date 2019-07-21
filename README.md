# RestaurantFront

## Restaurant dishes ordering & management application frontend

## Features
 * Users management
 * Create dishes
 * Create orders (for today or future dates)
 * Orders state workflow (create, pay and cancel)

### Requirements

 * `node`  >= 10.0
 * `ng-cli` >= 8.0
 * `npm` >= 6.9

### Development server

```bash
npm install
npm start
```
Open http://localhost:4200 on browser (Hot reload included)

### Running unit tests

```bash
npm test
```

### Build

```bash
ng build [--prod]
```

### Docker build

```bash
# Build production ready distribution files
ng build --prod

# Create docker image
docker build -f .\Dockerfile -t restaurant-front .

# Create volatile container from image listening on port 80
docker run -d -p 80:80 --rm --hostname=restaurant-front --name restaurant-front restaurant-front
```

### Usage instruction

#### Development mode

1. Open http://localhost:4200 on browser
2. Login with:
    - user: *Pepe*
    - password: *1234*
3. This mode includes exaple data

#### Production/Docker mode

1. Open http://localhost on browser
2. Create new user
3. This mode not includes exaple data