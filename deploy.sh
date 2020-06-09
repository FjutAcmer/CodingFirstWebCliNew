# 暂不支持自动化部署，等待进一步更新
npm install
npm run build
docker pull nginx
docker stop coding_first_web_cli_new
docker rm coding_first_web_cli_new
docker build -t coding_first_web_cli_new .
docker run -dp 9999:80 -d --name coding_first_web_cli_new coding_first_web_cli_new




