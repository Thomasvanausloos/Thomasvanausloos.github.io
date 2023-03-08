---
title: Strategy Pattern
description: The Strategy pattern provides a way to define a family of algorithms, encapsulate each one as an object, and make them interchangeable. This way we can decide the wanted algorithm/behaviour at runtime.
external: false
date: 2018-09-14
---

## Strategy Pattern

#### _Category:_

Behavioural pattern

#### _Summary:_

The Strategy pattern provides a way to define a family of algorithms, encapsulate each one as an object, and make them interchangeable. This way we can decide the wanted algorithm/behaviour at runtime.

#### _Head First Definition:_

```
The strategey pattern identifies the aspects of your application  that vary and seperates them form what stays the same.
```

#### _Gang of four Definition:_

```
The strategey pattern defines a set of encapsulated algorithms that  can be swapped to carry out a specific behaviour
```

Stategy pattern is basesd on two OO design principles:

```
1. Program to an interface, not an implementation.
2. Favour composition over inheritance.
```

A simple design rule of strategy pattern is:

```
Seperate what stays the same from what differs. The behaviour that differs can be extracted into an interface. All different types can then implement that interface and decide over their own behaviour.
```

#### _Typical usage:_

The strategy pattern is mostly used when classes differ only in a certain behaviour and there are many possible versions of that behaviour. Typpicly we'll want to decide the implementation of that algorithm/behavior at run time. Saving files in different formats, choosing compression algorithms or sorting algorithms are typpical examples of day-to-day usage of the strategy pattern.

#### _Implementation:_

To implement the strategy pattern we first need to identify the varying behavior and extract it to an interface. Then we use compositon to encapsulate that behavior in our originall class. At runtime we we can add the correct implementation of the interface to choose the correct algortihm/behaviour we use.

![alt text](https://dzone.com/storage/rc-covers/10617-thumb.png "Strategy pattern")

Source: https://dzone.com/refcardz/design-patterns

#### _Example:_

An example of an interface that decides the behaviour of a certain hand (in the game of rock-paper-scissors).

```java
public interface InterfaceHand{

public boolean winsFrom(HandEnum hand);

public boolean loosesFrom(HandEnum hand);

}
```

Each kind of hand (rock, paper or scissors) will implement the interface above and implement its methods on its own way. Each object will decide its own behaviour! Example:

```java
public class Rock implements Interfacehand{

	@Override

	public boolean winsFrom(HandEnum hand){

		if(hand == HandEnum.SCISSORS){
			return true;
		}
		return false;
	}

	@Override
	public boolean loosesFrom(HandEnum hand){

		if(hand == HandEnum.PAPER){
			return true;
		}
		return false;
	}
}
```

In the example above we see that the Rock class defines its own `winsFrom()` and `loosesFrom()` behaviour. We can make sure the class has that certain behaviour by letting it implement the InterfaceHand interface. The player class will encapsulate this behaviour.

```java
public class Player{

	//encapsulated strategy
	private InterfaceHand hand;

	//setter to set the strategy at runtime
	public void setHand(InterfaceHand currentHand){
		this.hand = currentHand;
	}

	//method lets the current strategy decide the behaviour that is being used
	public boolean playerWinsFrom(Interface otherPlayersHand){
		return this.hand.winsFrom(otherPlayersHand);
	}

	//method lets the current strategy decide the behaviour that is being used
	public boolean playerLoosesFrom(InterfaceHand otherPlayersHand){
		return this.hand.loosesFrom(otherPlayersHand);
	}
}
```

In the example we noticed that there were different kinds of behaviour that decided if the players hand would win/loose from another hand depending on the players hand. Instead of making an entire desiciontree inside the Player class we extracted the winsFrom/loosesFrom behaviour to an interface `InterfaceHand`. We made three strategies implementing that interface: `Rock`, `Paper` and `Scissors`. Each will determin when they win/loose form another hand. We encapsulated the behaaviour inside the `Player` class, added a setter to set the players hand at runtime and added two methods that will invoke the strategies `winsFrom()` and `loosesFrom()` methods.
