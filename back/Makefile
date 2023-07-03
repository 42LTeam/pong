all: build up

VOLUMES = docker volume ls -q

build:
	@docker-compose -f docker-compose.yml build

volumes:
	@docker volume ls -q

rmvol:
	@docker volume rm srcs_mariadb srcs_nginx srcs_wordpress

up:
	@docker-compose -f docker-compose.yml up -d

down:
	@docker-compose -f docker-compose.yml down

debug: build
	@docker-compose -f docker-compose.yml up

stop:
	@docker-compose -f srcs/docker-compose.yml stop

prune:
	@docker system prune -a

re: stop down rmvol build up
	@docker ps
clean: stop down

.PHONY: all build up down debug stop clean
