# Luna project
Contains the luna project.

Build
```
../mvnw clean install
```

Build with e2e tests
```
../mvnw clean install -P e2e
```

Build with local deployment
```
../mvnw clean install -P autoInstallBundle,autoInstallPackage
```