# Luna project
Contains the luna project.

Build
```
mvn clean install
```

Build with e2e tests
```
mvn clean install -P e2e
```

Build with local deployment
```
mvn clean install -P autoInstallBundle,autoInstallPackage
```