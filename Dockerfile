FROM node:18
WORKDIR /home/banco-app
COPY package*.json ./ 
RUN npm install
COPY . .
EXPOSE "3000"
CMD ["npm" , "start"]

