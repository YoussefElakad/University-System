# spring-boot-java11
This example demonstrates what Spring Boot 2.1.3.RELEASE not correct working with the JAVA 9-11 module system. 

After update to Spring boot 2.1.3.RELEASE and Java 11, compatibility with the jigsaw (java module system) was broken.
Now fat-jars not running with the --module-path and --module params.
How to reproduce.

1) Set JDK 11 and Maven 3.6 and run

```
mvn clean install
```
2) Run compiled spring-boot fat-jar:

```
java --add-modules java.sql -p target/spring-demo-1.0.0.jar -m com.revkov.spring
```
3) We got an error:

```
Error occurred during initialization of boot layer
java.lang.module.FindException: Error reading module: spring-demo-1.0.0.jar
Caused by: java.lang.module.InvalidModuleDescriptorException: Package com.revkov.spring not found in module
```

If we change spring-boot to 2.1.2.RELEASE and retry 1-3 then it's working!

```
java --add-modules java.sql -p target/spring-demo-1.0.0.jar -m spring.demo
```


```
[main] INFO com.revkov.spring.SpringBreakApplication - Hello from spring boot 2.1.3 application and Java 11
```

I think it apply after https://github.com/spring-projects/spring-boot/issues/15810 fix

In 2.1.3 module-info.class now place in root of fat-jar, but in 2.1.2 he was in BOOT-INF/classes folder and module was an automatic, but now not automatic and structure of spring-boot jar not correctly for java module jars, because my classes in wrong place /BOOT-INF/classes/com.revkov , correct - /com.revkov. Maybe it's wrong, but fat-jar with java modules not working in 2.1.3