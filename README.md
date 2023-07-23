## Description

Experiment repo to test a "headers" RabbitMQ exchange.

## TODO

- send actual updates to SSE listeners upon receiving a message
- handle multiple open SSE on different instances
- handle taking over past updates for SSE connections when an instance goes down (DLX)

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
