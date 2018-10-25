---
title: Template Pattern
teaser: The template pattern provides us with hooks to add custom behaviour to a template algorithm.
category: Design Patterns
tags: [java]
---

## Template Pattern

Subclasses are responsible for the implementation of specific parts of the algorithm. The template pattern lets us offer hooks that a subclass may or may not implement to hook into the algorithm at any certain point. Real life examples of hooks are very present at Angular (think of the lifecycle hooks of a component like ngOnInit() etc... ).

```java
public abstract class Template{
	public int someAlgorithm(){
		concreteMethod1();
		concreteMethod2();
		abstractMethod1();
		abstractMethod2();
		hook();
	}
		public void concreteMethod1(){
			//some implementation
		}

		public void concreteMethod2(){
			//some implementation
		}

		//abstract method to be implemented by the concrete subclass
		public abstract void abstractMethod1();

		//abstract method to be implemented by the concrete subclass
		public abstract void abstractMethod2();

		hook(){
		//empty
		}


}
```

### Design principles:

- Hollywood Principle:
  `Don't call us, we'll call you`
  Definition
