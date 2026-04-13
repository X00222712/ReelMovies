# Script for linux
# Made by Glen

# Install
npm install

# Remove DB if it exits
[ -e local.db ] && rm local.db

npm run db:push

npm run dev