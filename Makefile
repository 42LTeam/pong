NAME				:= $(shell basename $(CURDIR))

SRCS_DIR			:= ./

YML_FILE			:= $(SRCS_DIR)docker-compose.yml
DEV_FILE			:= $(SRCS_DIR)docker-compose.dev.yml
ENV_FILE			:= $(SRCS_DIR).env
DIST_FOLDER			:= $(SRCS_DIR)back/dist

DOCKER_COMPOSE_DEV	:= @docker compose -f $(DEV_FILE) --env-file $(ENV_FILE) -p $(NAME)
DOCKER_COMPOSE		:= @docker compose -f $(YML_FILE) --env-file $(ENV_FILE) -p $(NAME)

VOLUMES				:= $(filter-out local,$(shell docker volume ls | grep $(NAME)))
DATA				:= ./data/

RESET_COLOR			:= "\033[0m"
BLACK				:= "\033[0;30m"
RED					:= "\033[0;31m"
GREEN				:= "\033[0;32m"
YELLOW				:= "\033[0;33m"
BLUE				:= "\033[0;34m"
MAGENTA				:= "\033[0;35m"
CYAN				:= "\033[0;36m"
WHITE				:= "\033[0;37m"
BOLD				:= "\033[0m\033[1m"
BOLD_BLACK			:= "\033[1;30m"
BOLD_RED			:= "\033[1;31m"
BOLD_GREEN			:= "\033[1;32m"
BOLD_YELLOW			:= "\033[1;33m"
BOLD_BLUE			:= "\033[1;34m"
BOLD_MAGENTA		:= "\033[1;35m"
BOLD_CYAN			:= "\033[1;36m"
BOLD_WHITE			:= "\033[1;37m"


all: dist env build up ls

ls:
	@echo $(BOLD_BLUE)Images$(RESET_COLOR)
	@docker image ls -a
	@echo '\n'$(BOLD_BLUE)Volumes$(RESET_COLOR)
	@docker volume ls
	@echo '\n'$(BOLD_BLUE)Network$(RESET_COLOR)
	@docker network ls
	@echo '\n'$(BOLD_BLUE)Containers$(RESET_COLOR)
	@docker ps -a
	@echo

env:
	@echo $(BOLD_GREEN) make env: '✅' - : check .env $(RESET_COLOR)
	@if [ ! -e $(ENV_FILE) ]; then \
		echo $(RED) "$(ENV_FILE) does not exist. Abort" $(RESET_COLOR); \
		exit 1; \
	else \
		echo $(CYAN) "$(ENV_FILE) is already in place" $(RESET_COLOR); \
	fi

env-dev: env
	@chmod 777 ./ip_address.sh
	./ip_address.sh
	@if [ -e "./.env.bak" ]; then \
		rm .env.bak; \
	fi

dist:
	@echo $(BOLD_GREEN) make dist: '🚽' - : erase .dist $(RESET_COLOR)
	@if [ ! -e $(DIST_FOLDER) ]; then \
		echo $(RED) "$(DIST_FOLDER) does not exist." $(RESET_COLOR); \
	else \
		echo $(CYAN) "$(DIST_FOLDER) is already in place => erase it" $(RESET_COLOR) && rm -rf $(DIST_FOLDER); \
	fi

logs:
	@echo $(BOLD_GREEN) make logs: '🔮'  logs of containers $(RESET_COLOR)
	$(DOCKER_COMPOSE) logs -f

build: env dist
	@echo $(BOLD_GREEN) make build: '🚧'  Build development containers + erase dist folder$(RESET_COLOR)
	$(DOCKER_COMPOSE) build

eval: dist env-prod build up
	@echo $(BOLD_GREEN) make evaluation = dist env-prod build up : $(DOCKER_COMPOSE) up --build $(RESET_COLOR)

up: env
	@echo $(GREEN) make up '🚀'  Start development containers$(RESET_COLOR)
	$(DOCKER_COMPOSE) up

action: build
	@echo $(GREEN) make action: '🎬'  Start development containers on github action$(RESET_COLOR)
	$(DOCKER_COMPOSE) up -d

stop:
	@echo $(RED) make stop: '✋'  Stop development containers$(RESET_COLOR)
	$(DOCKER_COMPOSE) stop

down:
	@echo $(BOLD_RED) make down: '🔻'  Remove development containers$(RESET_COLOR)
	$(DOCKER_COMPOSE) down

clean: stop down
	@echo $(BOLD_CYAN) make clean: '✋'  STOP + '🔻' DOWN$(RESET_COLOR)

prune: clean
	@echo $(BOLD_YELLOW) make prune:  - '✋'  STOP + '🔻'  DOWN + '🧼'  PRUNE: Remove all unused Docker resources with confirmation$(RESET_COLOR)
	docker system prune -a

rmvol: clean
	@echo $(BOLD_YELLOW) make rmvol: '✋'  STOP + '🔻'  DOWN + '🛀'  RMVOL: Remove specific volumes with confirmation$(RESET_COLOR)
	docker volume rm $(VOLUMES)

fprune: prune rmvol
	@echo $(BOLD_YELLOW) make fprune: '✋'  STOP + '🔻'  DOWN + '🧼'  PRUNE  + '🛀'  RMVOL $(RESET_COLOR)

re: stop up
	@echo $(BOLD_YELLOW) make re: '✋'  STOP + '🚀'  UP: Restart development containers $(RESET_COLOR)

rebuild: clean all
	@echo $(BOLD_YELLOW) make rebuild: '✋'  STOP + '🔻'  DOWN + '🚧'  BUILD + '🚀'  UP: Clean and rebuild development containers$(RESET_COLOR)

reboot: fprune all
	@echo $(BOLD_YELLOW) make reboot '✋'  STOP + '🔻'  DOWN + '🧼'  PRUNE  + '🛀'  RMVOL + '🚧'  BUILD + '🚀'  UP: Fully prune Docker and 'then' rebuild all containers$(RESET_COLOR)

dev: env-dev dev-build
	$(DOCKER_COMPOSE_dev) up

dev-build: env-dev
	$(DOCKER_COMPOSE_dev) build --no-cache

dev-up: env-dev
	$(DOCKER_COMPOSE_dev) up -d

dev-stop:
	$(DOCKER_COMPOSE_dev) stop

dev-down:
	$(DOCKER_COMPOSE_dev) down

dev-re: dev-stop dev

prettier:
	@echo $(BOLD_YELLOW) make prettier: '🌸' == https://prettier.io/docs/en/install $(RESET_COLOR)
	cd ./back/ && npx prettier . --write
	cd ./front/ && npx prettier . --write

help:
	@echo "Available commands:"
	@echo $(BOLD_GREEN) make env: '✅' - : check .env $(RESET_COLOR) $(DOCKER_COMPOSE) build
	@echo $(BOLD_GREEN) make dist: '🚽' - : erase .dist $(RESET_COLOR)
	@echo $(BOLD_GREEN) make logs: '🔮' - : logs of containers $(RESET_COLOR) $(DOCKER_COMPOSE) logs -f
	@echo $(BOLD_GREEN) make build: '🚧' - : Build development containers + erase dist folder$(RESET_COLOR) $(DOCKER_COMPOSE) build
	@echo $(GREEN) make up '🚀': Start development containers$(RESET_COLOR) $(DOCKER_COMPOSE) up
	@echo $(GREEN) make action: '🎬' Start development containers on github action$(RESET_COLOR)  $(DOCKER_COMPOSE) up -d
	@echo $(RED) make stop: '✋' Stop development containers$(RESET_COLOR) $(DOCKER_COMPOSE) stop
	@echo $(BOLD_RED) make down: '🔻' Remove development containers$(RESET_COLOR) $(DOCKER_COMPOSE) down
	@echo $(BOLD_CYAN) make clean: '✋' STOP + '🔻' DOWN$(RESET_COLOR) $(DOCKER_COMPOSE) stop down
	@echo $(BOLD_YELLOW) make prune:  - '✋' STOP + '🔻' DOWN + '🧼' PRUNE: Remove all unused Docker resources with confirmation$(RESET_COLOR)
	@echo $(BOLD_YELLOW) make rmvol: '✋' STOP + '🔻' DOWN + '🛀' RMVOL: Remove specific volumes with confirmation$(RESET_COLOR)
	@echo $(BOLD_YELLOW) make fprune: '✋' STOP + '🔻' DOWN + '🧼' PRUNE  + '🛀' RMVOL $(RESET_COLOR)
	@echo $(BOLD_YELLOW) make re: '✋' - STOP + '🚀'UP: Restart development containers $(RESET_COLOR)
	@echo $(BOLD_YELLOW) make rebuild: '✋' STOP + '🔻' DOWN + '🚧' BUILD + '🚀' UP: Clean and rebuild development containers$(RESET_COLOR)
	@echo $(BOLD_YELLOW) make reboot '✋' STOP + '🔻' DOWN + '🧼' PRUNE  + '🛀' RMVOL + '🚧' BUILD + '🚀' UP: Fully prune Docker and 'then' rebuild all containers$(RESET_COLOR)
	@echo $(BOLD_YELLOW) make prettier: '🌸' == https://prettier.io/docs/en/install $(RESET_COLOR)


.PHONY: all ls env build up stop down clean prune rmvol fprune re rebuild reboot help
