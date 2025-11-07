## Initial Setup Notes

When composing the included ``docker-compose.yml``, the container could did not run and would error out when booting. I manually downloaded the postgres image and created a container using:

```
docker run --net=host --name some-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -d postgres
```

This container ran without issue but, I was unable to connect to the pg server. I am using macOS Sequoia 15.6.1 on Apple Silicon and in the Docker Desktop application, the setting `Enable host networking` was disabled. This must be checked to enable local networking. (Settings > Resouces > Network)

The ``--net=host`` parameter in the command above enables the feature but it only works if the setting is enabled globally.

## Development Notes

I spent more than two hours on things outside of writing code. For example, the initial database setup was buggy on my system so I had to work that out. My familiarty with Next.js and Drizzle was minimal and the experience that I did have was based on a crash course I did on Next.js 15 so some things I had to look up. I spent the bulk of my time on styling and I did it all manually with tailwinds classes; no UI framework used although I have worked with design and ui systems before. If I had all the time, I would have added tests and proper accessbility attributes. The HTML is semantically correct so tabbing across works as expected. For larger datasets, pagination would have been added to search page and api route.