# Express/Node/React Demo Project

## Description

Materials management component for a smart construction dashboard

## Getting Started

### Dependencies

* Docker
* Docker Compose
* Yarn (https://yarnpkg.com/)

### Setup Development Environment

* Clone repo
```
git clone https://github.com/lukemckinstry/ern-demo.git
```

* Install frontend packages (note: temporary workaround)
```
cd ern-demo/frontend && yarn install
```

* Build containers 
```
.scripts/setup
```

### Executing Program

* Run containers.
* This will start the frontend client on [http://localhost:3204](http://localhost:3204) and the backend server on [http://localhost:4000](http://localhost:4000).
```
./scripts/server
```
* Rebuild containers

```
./scripts/update
```
* Run tests (backend server)
```
./scripts/test
```


### STRTA

This project uses [`scripts-to-rule-them-all`](https://github.com/azavea/architecture/blob/master/doc/arch/adr-0000-scripts-to-rule-them-all.md) to bootstrap, test, and maintain projects consistently across all teams. Below is a quick explanation for the specific usage of each script.

| Script      | Use                                                        |
| ----------- | ---------------------------------------------------------- |
| `server`    | Start the development servers for the server and client on ports 3204 and 4000                        |
| `setup`     | Setup the project development environment                  |
| `update`    | Update project, rebuild containers                   |
| `test`    | Run tests, backend api server unit tests                   |
