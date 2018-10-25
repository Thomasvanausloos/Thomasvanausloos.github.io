---
title: Factory patterns
teaser: In this post we will describe some of the available factory patterns.
category: Java Development
tags: [java]
---

# **Simple Factory**

## **Example**

Imagine a `class Canvas`. The Canvas uses a method `createShape()` to create a new shape and then draws this shape.

```java
public class Canvas{

    private Shape shape;


    public void createShape(String kindOfShape){

        if(kindOfShape.equals("circle")){
            shape = new Circle();
        }
        if(kindOfShape.equals("rectangle")){
            shape = new Rectangle();
        }
        if(kindOfShape.equals("circle")){
            shape = new Square();
        }

    }

    public void drawCanvas(String kindOfShape){
        createShape(kindOfShape);
        shape.draw();
    }

}
```

For this (polymorphism) to work we need `Cirle` `Rectangle` and `Square` to implement the same interface (or inherit from the same superclass).
We will call this interface `Shape`.

```java
public interface Shape{
   draw();
}
```

### **Disadvantage**

What if we want to add more subtypes of `Shape`? Each time we want to add more subtypes we would need to change the
code in our `createShape()` method. This method is in our `Canvas` class. Not immediately the place where we would expect it right?

### **Solution**

Encapsulate the `createShape()` into a Factory class.

```java
public class ShapeFactory{

   public Shape createShape(String kindOfShape){
           Shape shape;

           if(kindOfShape.equals("circle")){
               shape = new Circle();
           }
           if(kindOfShape.equals("rectangle")){
               shape = new Rectangle();
           }
           if(kindOfShape.equals("circle")){
               shape = new Square();
           }

           return shape;
       }

}
```

This will make our `Canvas` implementation as follows:

```java
import ShapeFactory;

public class Canvas{

    private Shape shape;
    private ShapeFactory shapeFactory = new ShapeFactory();

    public void drawCanvas(String kindOfShape){
        shape = shapeFactory.createShape(kindOfShape);
        shape.draw();
    }

}
```

This way we would only have to change the code in one place, in the `ShapeFactory` class.
![alt text](https://github.com/VanausloosThomas/PersonalDevelopment/tree/master/knowledge/factory-pattern/simple_factory_pattern_uml_diagram.png "Simple Factory")

### **Advantages**

- Great way to encapsulate code!
- Good way to use abstractions instead of concrete classes (you can work with shapes instead of circles, retangles and squares...).
- BUT: This is not a real pattern!

# **Factory Method**

Imagine we now want two different kinds of a canvas, a small one and a big one.
Let's say that the `LargeCanvas` uses a `BigCircle` where the `SmallCanvas` uses a `SmallCircle`, both implementations of a shape ofcourse.
Our previous factory class now has no clue what shape to return, a big one or a small one?
The Factory Method pattern comes to the rescue!

```
TheFactory Method Patters defines an interface (or abstract method) for the creation of objects
but lets the sublasses decide wich classes to instantiate. The subclasses will have to give an
implementation for their Factory Methods.
```

So instead of using a factory class, we will delegate the deciding over and creation of concrete classes to
the subclasses.
This mean that our `Canvas` class will now become an abstract class with an abstract method `createShape()`.
It will be the subclasses of `Canvas` that will implement the abstract factory method and decide what classes to use!

```java
import ShapeFactory;

public abstract class Canvas{

    private Shape shape;

    public void drawCanvas(String kindOfShape){
        shape = createShape(kindOfShape);
        shape.draw();
    }

    public abstract Shape createShape(String kindOfShape);

}
```

```java
public class SmallCanvas extends Canvas{

    // SmallCanvas' implementation of the createShape() method! => The Factory Method!
    @Override
    public Shape createShape(String kindOfShape){

        if(kindOfShape.equals("circle")){
            shape = new SmallCircle();
        }
        if(kindOfShape.equals("rectangle")){
            shape = new SmallRectangle();
        }
        if(kindOfShape.equals("circle")){
            shape = new SmallSquare();
        }

    }

    public void drawCanvas(String kindOfShape){
        // Thos will create a small shape!
        createShape(kindOfShape);
        shape.draw();
    }
}
```

```java
public class LargeCanvas extends Canvas{

    //LargeCanvas' implementation of the createShape() method! => The Factory Method!
    @Override
    public Shape createShape(String kindOfShape){

        if(kindOfShape.equals("circle")){
            shape = new BigCircle();
        }
        if(kindOfShape.equals("rectangle")){
            shape = new BigRectangle();
        }
        if(kindOfShape.equals("circle")){
            shape = new BigSquare();
        }

    }

    public void drawCanvas(String kindOfShape){
        //This will create a big shape!
        createShape(kindOfShape);
        shape.draw();
    }
}
```

This gives us the following diagram:

![alt text](https://sourcemaking.com/files/v2/content/patterns/Factory_Method.svg "Factory Method")

### **To Sum up:**

- Factory method delegates the concrete creations to the subclasses. It relies on inheritance!
- Uses abstraction as much as possible! Only the factory method will choose of the concrete classes!

# **Abstract Factory**

This is the second Factory design pattern (next to our Factory Method pattern!).
We will start with a small definition:

```
The Abstract Factory Pattern provides an interface for creating families of related or dependent
objects without speifying their concrete classes.
```

So how would we implement our example using the Abstract Factory pattern?
First we will make some additions to the example. Right now our Canvas objects only paint a certain shape.
We want some more color! So let's add a background color!

As the definition says: we first need to make an abstract Factory. This can be an interface for example with some unimplemented methods in it.

```java
public abstract class AbstractFactory {

   abstract Color getColor(String color);
   abstract Shape getShape(String shape) ;

}
```

We can now implement this `AbstractFactory` in two concrete Factories: the `ColorFactory` and the `ShapeFactory`.

```java
public class ShapeFactory extends AbstractFactory {

   @Override
   public Shape getShape(String shapeType){

      if(shapeType == null){
         return null;
      }

      if(shapeType.equals("circle")){
         return new Circle();

      }else if(shapeType.equals("rectangle")){
         return new Rectangle();

      }else if(shapeType.equals("square")){
         return new Square();
      }

      return null;
   }

   @Override
   Color getColor(String color) {
      return null;
   }
}
```

```java
public class ColorFactory extends AbstractFactory {

   @Override
   public Shape getShape(String shapeType){
      return null;
   }

   @Override
   Color getColor(String color) {

      if(color == null){
         return null;
      }

      if(color.equals("red")){
         return new Red();

      }else if(color.equals("green")){
         return new Green();

      }else if(color.equals("blue")){
         return new Blue();
      }

      return null;
   }
}
```

Of course the different subclasses of `Color` implement the `Color Interface`!
Right now there are two options:

1. We either make a concrete factory in our concrete canvas instance.
2. We implement a factory producer. This keeps the abstraction within the canvas class to a max.

First option diagram:

![alt text](http://www.oodesign.com/images/creational/abstract-factory-pattern.png "Abstract Factory")

Second option diagram:

![alt text](https://github.com/VanausloosThomas/PersonalDevelopment/tree/master/knowledge/factory-pattern/abstractfactory_pattern_uml_diagram.png "Abstract Factory with factory producer")

Here is the example for option two. The factory producer:

```java
public class FactoryProducer {
   public static AbstractFactory getFactory(String choice){

      if(choice.equals("shape")){
         return new ShapeFactory();

      }else if(choice.equals("color")){
         return new ColorFactory();
      }

      return null;
   }
}
```

And the client class `Canvas`:

```java
 import AbstractFactory;

 public abstract class Canvas{

     private Shape shape;
     private Color color;

     public static void main(String ... args){
        AbstractFactory shapeFactory = FactoryProducer.getFactory("shape");
        AbstractFactory colorFactory = FactoryProducer.getFactory("color");

        // Using the shape factory
        shape = shapeFactory.getShape("square");
        shape.draw();

        // Using the color factory
        color = colorFactory.getColor("red");
        color.fill();
     }

 }
```

### **To Sum up:**

- Factory method delegates the concrete creations to different factories. It relies on composition!
- Uses abstraction as much as possible! Only the concrete factory will choose of the concrete classes!
