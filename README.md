nvm install && nvm use 
yarn
cp .env.example .env
docker-compose up -d mongo
yarn run start
yarn run commander bulk-create
yarn run commander create-index-and-test
yarn run commander remove-index-and-test