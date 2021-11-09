up: docker-up
down: docker-down
restart: docker-down docker-up
build: docker-build
init: docker-down docker-pull docker-build docker-up

logs: docker-logs
#-----------------------------------------------------

#COMMON#
docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

docker-logs:
	docker-compose logs

#API#
api-install:
	docker-compose exec api npm install -f

api-install-prod:
	docker-compose exec api npm install --production

api-serve:
	docker-compose exec api npm run start:dev

api-start-prod:
	docker-compose exec api npm run start:prod

api-build:
	docker-compose exec api npm run build

api-debug:
	docker-compose exec api npm run start:debug
