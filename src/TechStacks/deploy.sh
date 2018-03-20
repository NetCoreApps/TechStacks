# pre-requisite: npm run publish

rsync -avz -e 'ssh' bin/Release/netcoreapp2.0/publish/ ubuntu@lightsail.web-app.io:/home/deploy/apps/techstacks

rsync -avz --exclude node_modules/ -e 'ssh' scripts/ ubuntu@lightsail.web-app.io:/home/deploy/apps/scripts

ssh ubuntu@lightsail.web-app.io "sudo supervisorctl restart all"
