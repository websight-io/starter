# Local Environment

Build the distribution & Docker images running the following command from this directory:

```bash
../../mvnw -f ../pom.xml clean install
```

* Deploy the new environment with:
  ```bash
  docker compose up
  ```
  > Note: hitting `ctrl+c` just stops the environment. It will not delete the content.

* Completely delete the environment (including content):
  ```bash
  sh delete.sh
  ```

Services are available with URLs:

- [localhost:8080](http://localhost:8080/) - CMS admin panel (`wsadmin`/`wsadmin`)
- [localhost](http://localhost/) - after publishing pages will be available on the standard `:80` port, e.g. http://localhost/Homepage.html
