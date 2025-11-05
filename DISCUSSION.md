When composing the included ``docker-compose.yml``, the container could did not run and would error out when booting. I manually downloaded the postgres image and created a container using:

```
docker run --net=host --name some-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -d postgres
```

This container ran without issue but, I was unable to connect to the pg server. I am using macOS Sequoia 15.6.1 on Apple Silicon and in the Docker Desktop application, the setting `Enable host networking` was disabled. This must be checked to enable local networking. (Settings > Resouces > Network)

The ``--net=host`` parameter in the command above enables the feature but it only works if the setting is enabled globally.