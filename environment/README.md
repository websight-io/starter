# Local Environment

**Prerequisites**

> To use the latest version of WebSight you need access to AWS. Please follow the `AWS Account && CLI configuration` and `AWS CodeArtifact` instructions from https://bitbucket.org/teamds-workspace/websight-dev-tools/src/main/.

---

Build the distribution & Docker images running the following commands from this directory:

```bash
export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain websight --domain-owner 299371835903 --query authorizationToken --output text`
mvn -f ../pom.xml clean install
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

- [localhost:8080](http://localhost:8080/) - ICE admin panel (`wsadmin`/`wsadmin`)
- [localhost](http://localhost/) - the published pages

## References
Look for more information in [WebSight](https://www.websight.io/).
