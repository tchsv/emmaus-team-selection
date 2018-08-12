FROM node:6

MAINTAINER Matthias Luebken, matthias@catalyst-zero.com

WORKDIR /home/mean


# Install Mean.JS Prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower

RUN npm install -g  jshint@2.5.11 
RUN npm install -g   nodemon@1.2.1 
#RUN npm install -g   node-inspector@0.9.2 



# Install Mean.JS packages
#ADD package.json /home/mean/package.json

# Manually trigger bower. Why doesnt this work via npm install?
#ADD .bowerrc /home/mean/.bowerrc
#ADD bower.json /home/mean/bower.json

# Make everything available for start
ADD . /home/mean
RUN npm install
RUN bower install  --allow-root

# currently only works for development
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3700 35729
CMD ["node","server.js"]
