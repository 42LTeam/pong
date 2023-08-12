NAME=$(shell basename $(CURDIR))

CMD=docker-compose -f
VOLUMES=$(filter-out local,$(shell docker volume ls | grep $(NAME)))
DATA=./data/

all:
	$(CMD) docker-compose.yml up --build -d
	docker-compose logs --follow

build:
	$(CMD) docker-compose.yml build

re: down up

up:
	$(CMD) docker-compose.yml up -d

down:
	$(CMD) docker-compose.yml down 

rmvol:	down
	 docker volume rm $(VOLUMES)
	
.PHONY: all build re up down rmvol
