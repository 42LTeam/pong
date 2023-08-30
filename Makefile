NAME			:=	$(shell basename $(CURDIR))

SRCS_DIR		:=	./

YML_FILE		:=	$(SRCS_DIR)docker-compose.yml
ENV_FILE		:=	$(SRCS_DIR).env
DIST_FOLDER		:=	$(SRCS_DIR)back/dist

DOCKER_COMPOSE	:=	@docker compose -f $(YML_FILE) --env-file $(ENV_FILE) -p $(NAME)


VOLUMES			:=	$(filter-out local,$(shell docker volume ls | grep $(NAME)))
DATA			:=	./data/

RESET_COLOR		:=      "\033[0m"
BLACK			:=      "\033[0;30m"
RED				:=      "\033[0;31m"
GREEN			:=      "\033[0;32m"
YELLOW			:=      "\033[0;33m"
BLUE			:=      "\033[0;34m"
MAGENTA			:=      "\033[0;35m"
CYAN			:=      "\033[0;36m"
WHITE			:=      "\033[0;37m"
BOLD			:=      "\033[0m\033[1m"
BOLD_BLACK		:=      "\033[1;30m"
BOLD_RED		:=      "\033[1;31m"
BOLD_GREEN		:=      "\033[1;32m"
BOLD_YELLOW		:=      "\033[1;33m"
BOLD_BLUE		:=      "\033[1;34m"
BOLD_MAGENTA	:=      "\033[1;35m"
BOLD_CYAN		:=      "\033[1;36m"
BOLD_WHITE		:=      "\033[1;37m"


all:			build up

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

dist:
				@if [ ! -e $(DIST_FOLDER) ]; then \
					echo $(RED) "$(DIST_FOLDER) does not exist." $(RESET_COLOR); \
				else \
					echo $(CYAN) "$(DIST_FOLDER) is already in place => erase it" $(RESET_COLOR) && rm -rf $(DIST_FOLDER); \
				fi


logs:
	@echo $(BOLD_GREEN) '🔮' - LOGS: logs of containers $(RESET_COLOR)
	$(DOCKER_COMPOSE) logs -f

build: env dist
	@echo $(BOLD_GREEN) '🚧' - BUILD: Build development containers + erase dist folder$(RESET_COLOR)
	$(DOCKER_COMPOSE) build

up: env
	@echo $(GREEN) '🚀' - UP: Start development containers$(RESET_COLOR)
	$(DOCKER_COMPOSE) up

action: build
	@echo $(GREEN) '🚀' - UP: Start development containers$(RESET_COLOR)
	$(DOCKER_COMPOSE) up -d

stop:
	@echo $(RED) '✋' - STOP: Stop development containers$(RESET_COLOR)
	$(DOCKER_COMPOSE) stop

down:
	@echo $(BOLD_RED) '🔻' - DOWN: Remove development containers$(RESET_COLOR)
	$(DOCKER_COMPOSE) down

clean: stop down
	@echo $(BOLD_CYAN) '🧹' - CLEAN: Stop and remove development containers$(RESET_COLOR)

prune: clean
	@echo $(BOLD_YELLOW)  '🧼' - PRUNE: Remove all unused Docker resources with confirmation$(RESET_COLOR)
	docker system prune -a

rmvol: clean
	@echo $(BOLD_YELLOW) '🛀' - RMVOL: Remove specific volumes with confirmation$(RESET_COLOR)
	docker volume rm $(VOLUMES)

fprune: prune rmvol
	@echo $(BOLD_YELLOW) '🧼' - PRUNE + '🛀' RMVOL - FPRUNE: Execute prune and rmvol commands$(RESET_COLOR)

re: stop up
	@echo $(BOLD_YELLOW) '✋' - STOP + '🚀'UP - RE: Restart development containers $(RESET_COLOR)

rebuild: clean all
	@echo $(BOLD_YELLOW) '🧹' CLEAN + '🚧' BUILD + '🚀' UP - REBUILD: Clean and rebuild development containers$(RESET_COLOR)

reboot: fprune all
	@echo $(BOLD_YELLOW) '♻️' - REBOOT: Fully prune Docker and 'then' rebuild all containers$(RESET_COLOR)

help:
	@echo "Available commands:"
	@echo "  make build       - Build development containers"
	@echo "  make up          - Start development containers"
	@echo "  make stop        - Stop development containers"
	@echo "  make down        - Remove development containers"
	@echo "  make clean       - Stop and remove development containers"
	@echo "  make prune       - Remove all unused Docker resources with confirmation"
	@echo "  make rmvol       - Remove specific volumes with confirmation"
	@echo "  make fprune      - Execute prune and rmvol commands"
	@echo "  make re          - Restart development containers"
	@echo "  make rebuild     - Clean and rebuild development containers"
	@echo "  make reboot      - Fully prune Docker and then rebuild all containers"
	@echo "  make help        - Show this help message"

.PHONY: all ls env build up stop down clean prune rmvol fprune re rebuild reboot help
