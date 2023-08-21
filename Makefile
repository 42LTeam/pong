NAME			:=	$(shell basename $(CURDIR))

SRCS_DIR		:=	./

YML_FILE		:=	$(SRCS_DIR)docker-compose.yml
ENV_FILE		:=	$(SRCS_DIR).env

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

build:			env
				$(DOCKER_COMPOSE) build

up:				env
				$(DOCKER_COMPOSE) up

stop:
				$(DOCKER_COMPOSE) stop

down:
				$(DOCKER_COMPOSE) down

clean:			stop down

prune:          clean
				@docker system prune -a

rmvol:			clean
				docker volume rm $(VOLUMES)

fprune:         prune rmvol

re:				stop up

rebuild:        clean all

reboot:         fprune all
	
.PHONY: all ls env build up stop down clean prune rmvol fprune re rebuild reboot
