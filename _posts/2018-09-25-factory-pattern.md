---
title: Factory Pattern
teaser: While there are many forms of the factory patters, it will always play the role of object-creator.
category: Design Patterns
tags: [java]
---

## Factory Pattern

### Static Factory

Create a static method within a class that is responsible of creating new instances of that class. We can use such methods to validate info before we make an actual object for example. To make sure this validation is performed it is typpical to make the classes' constructor private.

```java
public class Person(){

    private String firstName;
    private String lastName;

	//Private constructor
	private Person(String firstName, String lastName){

    	this.firstName = firstName;
        this.lastName = lastName;
	}


    //Factory method
    public static Person createPerson(String firstName, String lastName){

    	if(isValid(firstName,lastName)){
        	return new Person(firstName,lastName);
        }
        throw new ValidationException("invalid name");
    }
}
```

### Simple Factory

Create a factory class with the purpose of creating new objects.

```java
public class PersonFactory{

	public Person createPerson(String firstName, String lastName){
    	return new Person(firstName, lastName);
    }
}
```

```java
public class TestClass{

	private PersonFactory personFactory;

    public static void main(String ... args[]){

    	personFactory = new PersonFactory();
        Person testPerson = personFactory.createPerson("aFirstName","aLastName");
    }
}
``
```
