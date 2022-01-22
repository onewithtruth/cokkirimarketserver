#!/bin/bash
cd /home/ubuntu/cokkirimarketserver/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export CLOUDFLARE_ACCOUNT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names CLOUDFLARE_ACCOUNT_ID --query Parameters[0].Value | sed 's/"//g')
export CLOUDFLARE_API_TOKEN=$(aws ssm get-parameters --region ap-northeast-2 --names CLOUDFLARE_API_TOKEN --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export GITHUB_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GITHUB_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GITHUB_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GITHUB_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_REDIRECT_URL=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_REDIRECT_URL --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URL=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URL --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js