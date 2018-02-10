# pre-requisite: npm run publish

rsync -avz -e 'ssh' bin/Release/netcoreapp2.0/publish/ ubuntu@lightsail.web-app.io:/home/deploy/apps/techstacks

ssh ubuntu@lightsail.web-app.io "sudo supervisorctl restart web-techstacks"
