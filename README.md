# URL shortener

Derusting some react and trying out Graphql and some related technologies.

Things to try: MobX, Redux, Vanilla, Relay, TypeORM, Prisma, ?

## Docker (compose) setup

"Prod" style deployment that compiles backend to JS and packages CRA app, setups all dependencies:

```sh
docker-compose -f stack.yml down
ENV_FILE_PATH=env.example docker-compose -f stack.yml up --build --force-recreate -d
```

```
               +---------+
               |   CRA   |
     +-------->|  NGINX  |
     |         +---------+
     |
+----+----+
| Ingress |
|  NGINX  |
+----+----+    +---------+   +----------+
     |         |   API   |   |    DB    |
     +-------->|  NODE   +-->| POSTGRES |
               +---------+   +----------+
```

## Screenshot

![App](/sc.jpg "Screenshot")
