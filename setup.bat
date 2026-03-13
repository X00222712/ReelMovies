@REM Script for window
@REM Made by Glen

@REM Install
npm install

@REM Remove DB if it exits
@REM I hope this works, I am on Linux Mint
if exist .\local.db rm .\local.db

npm run db:push