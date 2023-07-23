## Description

Experiment repo to test a "headers" RabbitMQ exchange.

## TODO

- handle taking over past updates for SSE connections when an instance goes down (DLX)
- add second type of updates

## Installation

```bash
$ yarn install
```

## Setting up dependencies

```bash
docker compose up -d
```

## Running the app

```bash
# single instance (development)
$ yarn start:dev

# 2 instances
$ yarn go

# ...then shutting down 2 instances
$ yarn stop
```
