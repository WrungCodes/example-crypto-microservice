# Crypto Service

This (Micro)Service is meant to process crypto request and handle core crytpo Functionalists abstracting it for other (micro)services that wishes to use it, this also abstract the crypto providers being used as they can be exchanged or swapped at any time.

## PROJECT OVERVIEW

The Crypto service has three(3) major functionalities that would be building

- Core Crypto Implemetations
- Admin Implementation
- Client Implementation

**Core Crypto Implemetations**
The Core Crypto Implementation handles the core crypto functionality

- implementing the crypto provider
- setting up strategy pattern and adaptors for each provider
- implementing send, address-generation, address-validation, webhook

**Admin Implemetations**
The Admin Crypto Implementation handles the actions admin can take on this service

- Creating of accounts for other (Micro) services and generating API-KEYS for them
- enabling and disabling accounts
- enabling and disabling certain crypto functionalities (i.e send, address-generation, address-validation ...etc)

**Client Implemetations**
The Client Implementation handles the following functionality

- generating & storing of crypto addresses
- validation of crypto addresses
- alerting & storing of transactions or events on generated & stored crypto addresses
- sending of crypto to an address


## Technologies & Tooling

1. **Redis (In-memory DB)** [https://redislabs.com/lp/python-redis/](https://redislabs.com/lp/python-redis/)

2. **Express (Web Framework)** [https://expressjs.com/](https://expressjs.com/)

3. **Sequilize (Postgres) (ORM)** [https://sequelize.org/](https://sequelize.org/)

4. **Docker...**

### The Crypto Service:

... coming soon

### **The Crypto Service uses Clean Architecture**

- **Independent of Frameworks.** The architecture does not depend on the existence of some library of feature-laden software. This allows you to use such frameworks as tools, rather than having to cram your system into their limited constraints. ✅
- **Testable.** The business rules can be tested without the UI, Database, Web Server, or any other external element. ✅
- **Independent of Domain.** The Domain can change easily, without changing the rest of the system. A RestAPI could be replaced with a Message Queue, for example, without changing the business rules. ✅
- **Independent of Database.** You can swap out Oracle or SQL Server, for Mongo, BigTable, CouchDB, or something else. Your business rules are not bound to the database. ✅
- **Independent of any external agency.** In fact, your business rules simply don’t know anything at all about the outside world. ✅

**Flow Diagram:**
... coming soon

## Project Structure

The service uses the following project layout:

      .
      ├── .docker                   Docker configuration files
      ├── script                    contains application startup scripts
      ├── docs                      documentaion that includes Style guide Etc
      ├── src                       main application of the project
      │   ├── api                   restAPI Functionalists
      │   │   ├── routers           http api routes
      │   │   ├── controllers       http controllers
      │   │   ├── middlewares       routes middlewares
      │   ├── config                Common Application configuration & Rules, startup events, logging.
      │   ├── database              database functions
      │   ├── cache                 cache functions
      │   ├── jobs                  contains background jobs
      │   ├── loader                loading configurations
      │   ├── core                  core of the application
      │   │   ├── domain            the domain of the application
      │   │   ├── repositories      the repositories of the application
      │   │   ├── usecases          the usecases of the application
      │   ├── subscribers           all subscribers to events
      │   ├── services              integration of all external services
      │   ├── test                  Package integration and unit tests.
      │   ├── logs                  all project logs
      │   │   ├── errors            error logs
      │   │   ├── outputs           stout logs

## Requirements
- NodeJS
- docker & docker-compose
- npm

## Project Setup

### Step 1:

Clone the Repository [repo link]()

### Step 2:

Download docker & docker compose

## Setp 3:

      # Start the application
      $ docker-compose up
      $ npm run http:start

      # Stop the application
      $ docker-compose down

## Documentation 

**Postman Documentation** [link](https://www.getpostman.com/collections/8477fbd24316f4ffca8d)

to use `sequelize-cli` change directory to src/database/sequelize 

docker exec -it payercoin_queue redis-cli FLUSHALL  // reset redis database