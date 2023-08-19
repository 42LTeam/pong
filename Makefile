NAME := $(shell basename $(CURDIR))
SRCS_DIR := ./
YML_FILE := $(SRCS_DIR)docker-compose.yml
ENV_FILE := $(SRCS_DIR).env

DOCKER_COMPOSE := @docker compose --env-file $(ENV_FILE) -p $(NAME)
DOCKER_COMPOSE_DEV := $(DOCKER_COMPOSE) -f docker-compose.dev.yml
DOCKER_COMPOSE_BUILD := $(DOCKER_COMPOSE) -f docker-compose.build.yml
DOCKER_COMPOSE_PROD := $(DOCKER_COMPOSE) -f docker-compose.prod.yml

VOLUMES := $(filter-out local,$(shell docker volume ls | grep $(NAME)))
DATA := ./data/

# Colors for printing
RESET_COLOR		:= "\033[0m"
RED				:= "\033[0;31m"
GREEN			:= "\033[0;32m"
YELLOW			:= "\033[0;33m"
BLUE			:= "\033[0;34m"
CYAN			:= "\033[0;36m"
BOLD			:= "\033[0m\033[1m"
BOLD_RED		:= "\033[1;31m"
BOLD_GREEN		:= "\033[1;32m"
BOLD_YELLOW		:= "\033[1;33m"
BOLD_BLUE		:= "\033[1;34m"
BOLD_CYAN		:= "\033[1;36m"

all: build up

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
	@if [ ! -e $(ENV_FILE) ]; then \
		echo $(RED) "$(ENV_FILE) does not exist. Abort" $(RESET_COLOR); \
		exit 1; \
	else \
		echo $(CYAN) "$(ENV_FILE) is already in place" $(RESET_COLOR); \
	fi

build: env
	$(DOCKER_COMPOSE_DEV) build

up: env
	$(DOCKER_COMPOSE_DEV) up -d

stop:
	$(DOCKER_COMPOSE_DEV) stop

down:
	$(DOCKER_COMPOSE_DEV) down

dev-build: env
	$(DOCKER_COMPOSE_DEV) build

dev-up: env
	$(DOCKER_COMPOSE_DEV) up -d

dev-stop:
	$(DOCKER_COMPOSE_DEV) stop

dev-down:
	$(DOCKER_COMPOSE_DEV) down

build-build: env
	$(DOCKER_COMPOSE_BUILD) build

build-up: env
	$(DOCKER_COMPOSE_BUILD) up -d

build-stop:
	$(DOCKER_COMPOSE_BUILD) stop

build-down:
	$(DOCKER_COMPOSE_BUILD) down

prod-build: env
	$(DOCKER_COMPOSE_PROD) build

prod-up: env
	$(DOCKER_COMPOSE_PROD) up -d

prod-stop:
	$(DOCKER_COMPOSE_PROD) stop

prod-down:
	$(DOCKER_COMPOSE_PROD) down

clean: stop down

prune: clean
	@echo $(BOLD_RED) "Warning: This will remove all unused Docker resources." $(RESET_COLOR)
	@read -p "Continue (y/N)? " choice; \
	if [ "$$choice" = "y" ] || [ "$$choice" = "Y" ]; then \
		docker system prune -a; \
	else \
		echo "Prune cancelled."; \
	fi

rmvol: clean
	@echo $(BOLD_RED) "Warning: This will remove the following volumes: $(VOLUMES)" $(RESET_COLOR)
	@read -p "Continue (y/N)? " choice; \
	if [ "$$choice" = "y" ] || [ "$$choice" = "Y" ]; then \
		docker volume rm $(VOLUMES); \
	else \
		echo "Volume removal cancelled."; \
	fi

fprune: prune rmvol

re: stop up

rebuild: clean all

reboot: fprune all

help:
	@echo "Available commands:"
	@echo "  make build       - Build development containers"
	@echo "  make up          - Start development containers"
	@echo "  make stop        - Stop development containers"
	@echo "  make down        - Remove development containers"
	@echo "  make dev-build   - Build containers for development"
	@echo "  make dev-up      - Start containers for development"
	@echo "  make dev-stop    - Stop containers for development"
	@echo "  make dev-down    - Remove containers for development"
	@echo "  make build-build - Build containers for the build environment"
	@echo "  make build-up    - Start containers for the build environment"
	@echo "  make build-stop  - Stop containers for the build environment"
	@echo "  make build-down  - Remove containers for the build environment"
	@echo "  make prod-build  - Build containers for production"
	@echo "  make prod-up     - Start containers for production"
	@echo "  make prod-stop   - Stop containers for production"
	@echo "  make prod-down   - Remove containers for production"
	@echo "  make clean       - Stop and remove development containers"
	@echo "  make prune       - Remove all unused Docker resources with confirmation"
	@echo "  make rmvol       - Remove specific volumes with confirmation"
	@echo "  make fprune      - Execute prune and rmvol commands"
	@echo "  make re          - Restart development containers"
	@echo "  make rebuild     - Clean and rebuild development containers"
	@echo "  make reboot      - Fully prune Docker and then rebuild all containers"
	@echo "  make help        - Show this help message"

.PHONY: all ls env build up stop down clean prune rmvol fprune re rebuild reboot dev-build dev-up dev-stop dev-down build-build build-up build-stop build-down prod-build prod-up prod-stop prod-down help
