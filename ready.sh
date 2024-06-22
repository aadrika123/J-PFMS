# link, build, install etc. after merging with other branches or changes in pfmslib or adding new library

cd ./pfmslib
npm install
npm run build
npm link

cd ..

cd ./frontend
npm install
npm link pfmslib

cd ..

cd ./backend
npm install
npm link pfmslib


# reset the database fully
rm -rf ./prisma/migrations
npx prisma migrate dev --name init

cd ..



