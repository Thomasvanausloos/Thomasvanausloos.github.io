---
title: Decorator Pattern
teaser: The decorator pattern is a structuran pattern that adds functionallity to an existing object without altering its structure.
category: Design Patterns
tags: [markdown, workflow, foss]
---

The decorator pattern is a structural pattern. It has two different ways of using it:

The first way of using the decorator patters is to add functionality to an existing object without altering its structure. The already existing object will be wrapped by a new class, adding the new functionallity.

A second way of using the decorator pattern is by wrapping an object into different layers where each layer adds for example a piece of a price or description. This follows the same logic as the builder pattern.

Example of case 1:

Note that using the interface here is a usage of the strategy pattern...

```java
public interface Shape{

    public void draw();

}

public class Rectangle implements Shape{

    public void draw(){
    	sout("Shape: Rectangle");
    }

}

public class ShapeDecorator implements Shape{

    private Shape shapeToDecorate;

    public ShapeDecorator(Shape shape){
    	this.shapeToDecorate = shape;
    }

    public void draw(){

    	shapeToDecorate.draw();
    	sout("Extra decoration");
    }

}
```

The shapeDecorator will wrap itself around the shape object and store it in its instance field. It will then add functionallity to it's draw() function by calling the draw function of the shape and then adding its own functionallity.

Example of case 2:

In the second example we can have many different and independant layers and one base-layer. this will be the base that we will wrap in the other layers.

Each layer class will implement the same interface, have a field to store an object of type of that interface (the previous layer that will be encapsulated). The current class's methods will call the methods of the previous object (stored in its field at the moment of creation) and add some of its own info.

The interface:

```java
public interface PricePackage{

    public int getPrice();

}
The base layer:

public class BasePackage implements PricePackage{

    // Implement the method
    public int getPrice(){
    	return 1000;
    }

}
```

Note that the class above is the base layer and thus has no field to store a previous pricePackage! This class will be wrapped by other layers but it wont wrap anything itself.

An example of another layer:

```java
public class WrapperLayer(){

    // Field to hold the previous layers
    private PricePackage previousPackage;

    //Constructor stores the previous layer into its field
    public WrapperLayer(PrivePackage pack){
    	this.previousPackage = pack;
    }

    //Implement the method by adding info to the previous layer(s)
    public int getPrice(){
    	return previousPackage.getPrince() + 50;
    }

}

Using the example above:

public class TestClass{

    public static void Main(String ... args[]){

    	PricePackage package = new WrapperLayer(new BasePackage());

    	// Will return 1050
    	package.getPrice();
    }

}
```
