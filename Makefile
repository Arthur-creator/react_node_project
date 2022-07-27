#npm run start --workspace=front include .env

start-front:
	npm run start --workspace=front
start-server:
	npm run start --workspace=server
build-front:
	npm run build --workspace=front
test:
	echo ${NX_CLOUD_ACCESS_TOKEN}