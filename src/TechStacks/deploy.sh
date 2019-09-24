rsync -avz -e 'ssh' bin/Release/netcoreapp3.0/publish/ ubuntu@forums.servicestack.net:/home/ubuntu/apps/techstacks
ssh ubuntu@forums.servicestack.net "sudo supervisorctl restart app-techstacks"
