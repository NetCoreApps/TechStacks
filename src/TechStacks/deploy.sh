#!/usr/bin/env bash
rsync -avz -e 'ssh' bin/Release/net5/publish/ deploy@ec2-34-232-4-72.compute-1.amazonaws.com:/home/deploy/apps/techstacks
ssh deploy@ec2-34-232-4-72.compute-1.amazonaws.com "sudo supervisorctl restart app-techstacks"
