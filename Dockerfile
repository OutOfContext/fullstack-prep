FROM openjdk:21
LABEL authors="rhueh"

ADD /backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","-Dspring.profiles.active=dev","app.jar"]