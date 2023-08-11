all: build up

VOLUMES = docker volume ls -q

build:
	@docker-compose -f docker-compose.yml build

volumes:
	@docker volume ls -q

rmvol:
	@docker volume rm 

up:
	@docker-compose -f docker-compose.yml up -d

down:
	@docker-compose -f docker-compose.yml down

debug: build
	@docker-compose -f docker-compose.yml up

stop:
	@docker-compose -f docker-compose.yml stop

prune:
	@docker system prune -a

re: stop down build up
	@docker ps
clean: stop down

.PHONY: all build up down debug stop clean
