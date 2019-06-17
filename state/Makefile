setup:
	docker volume create state-nodemodules

install:
	docker-compose -f docker-compose.builder.yml run --rm install

build:
	docker-compose up build

test:
  docker-compose up test
