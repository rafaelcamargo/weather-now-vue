#!/bin/sh

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

if [ "$branch" = "master" ]; then
    npm install firebase-tools --unsafe-perm
    npm run build -- --env=production
    ./node_modules/firebase-tools/bin/firebase deploy --token=$FIREBASE_TOKEN --non-interactive
else
    echo "skipped"
fi
