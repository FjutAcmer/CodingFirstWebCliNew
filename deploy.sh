# 以支持全自动部署
sudo npm install
sudo npm run build
sudo docker pull nginx
sudo docker stop coding_first_web_cli_new
sudo docker rm coding_first_web_cli_new
sudo docker rmi coding_first_web_cli_new
sudo docker build -t coding_first_web_cli_new .
sudo docker run -dp 8885:80 -d --name coding_first_web_cli_new coding_first_web_cli_new





