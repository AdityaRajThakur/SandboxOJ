FROM openjdk:17.0.1-jdk-slim
WORKDIR /app 
COPY execute.sh /execute.sh
RUN chmod +x /execute.sh 
ENTRYPOINT ["/bin/bash", "/execute.sh"] 