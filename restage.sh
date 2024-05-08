#!/bin/sh

GITHUB_REPO="aadrika123/J-PFMS"
GITHUB_BRANCH=sanjiv_dev

cloneRepo(){
    echo -n "Enter your username :"
    read username

    echo -n "Enter your branch :" 
    read branch

    echo -n "Enter your github token :"
    read token
    
    git clone -b $branch https://$username:$token@github.com/$GITHUB_REPO
}

cd ..

rm -rf './J-PFMS'

cloneRepo

cd 'J-PFMS'

chmod +x stage.sh

./stage.sh