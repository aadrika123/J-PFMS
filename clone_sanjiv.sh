#!/bin/sh

GITHUB_REPO="aadrika123/J-PFMS"
GITHUB_BRANCH=sanjiv_dev


GITHUB_USER=sanjivgit
GT=


cloneRepo(){
    git clone -b $GITHUB_BRANCH https://$GITHUB_USER:$GT@github.com/$GITHUB_REPO
}

cloneRepo
