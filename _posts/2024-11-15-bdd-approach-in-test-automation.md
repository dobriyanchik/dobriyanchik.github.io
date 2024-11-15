---
layout:     post
title:      "BDD approach in test automation"
date:       2024-11-15
categories: ["Automated testing"]
tags:       automated-testing
---

* content
{:toc}

From my point of view and my personal (and not only mine) experience in test automation area BDD is a very controversial approach. From one side according to many resources and examples it looks cool and promising, should solve some typical problems and make life better. From the other side by some magic reason personally me don't have at least one real world example (even in my colleagues experience) where the approach reached this goal. It's time to dive deeper to see why this happens...





## What is BDD

For those who didn't hear about BDD: shortly the approach and underlying toolset (frameworks like [JBehave](https://jbehave.org), [Cucumber](https://cucumber.io), [SpecFlow](https://specflow.org) etc.) allow business analysts to write acceptance criterias using "special language" at the stage of forming business requirements for a product. And later those criterias **automagically** with help of the frameworks become acceptance tests: so the scenarios are "ready" when even development is not started yet. Gherkin is an example of such language used for writing, and some typical scenario from an average example is:

```gherkin
Feature: Money Transfer
  As a bank customer
  I want to transfer money to another account 
  So that I can pay my bills

Scenario 1: Successful Money Transfer
  Given the user is logged into their online banking account
  And the user has enough balance in their account
  When the user initiates a transfer of $150 to another account
  Then the transfer should be successful
  And the user's account balance should be reduced by $150
  And the recipient's account balance should be increased by $150

Scenario 2: Insufficient Balance for Transfer
  Given the user is logged into their online banking account
  And the user does not have enough balance in their account
  When the user attempts to transfer $150 to another account
  Then the transfer should be declined
  And the user should see an error message indicating insufficient funds
```

Sounds and looks cool, right? I decided to investigate why this is not cool in real world (again, I talk about my and my colleagues experience)

## Investigation

In real life I usually see or face with very typical situations:
 - Instead of business cases BDD is used to automate functional tests. Moreover I really confused when in such case BDD is proposed or initiated by developers or test automation team, it looks counterintuitive (the max degree of absurdity is when they then create scenarios themselves)
 - I often see pretty long and complex scenarios (dozens, even sometimes hundreds of lines) parameterized with a big number of parameters what makes scenarios look not like business but old school KDT approach
 - I want to specially separate case when BDD is used to automate API or even DB tests
 - Sometimes I hear such arguments as
    > It's easier to read scenarios and understand them, so entry treshold is lower

    Yes, maybe, but it's not for free: test automation team wastes more efforts to create and support BDD interlayer within test automation framework, so in total it does not bring any benefits.

## Remarks and conclusions
1. BDD is **BEHAVIOR**, not functional driven testing approach. So it's suitable for acceptance, but not functional testing
2. Ideally BDD scenarios should be written by analysts on business requirements forming stage. This means that BDD approach should be integrated into project processes and be supported by them, it's not only tool which allows to write human readable test scenarios
3. Don't choose BDD just because of you want manual QA will start white tests for you, they often won't :)

Looks like all of above leads to more or less specific conditions for BDD application areas: whole project should support BDD paradygm where BDD is used for real acceptance tests created by analysts on early stages. Possibly the project should not be too big as efforts to support automation framework BDD interlayer will grow.

## BDD and AI

Potentially there could be very interesting synergy of BDD and AI. Suppose BDD will benefit from AI and could significantly simplify and improve a process. As an example LLM could take a work to generate all acceptance scenarios based on business requirements (this type of work is one of the main areas where LLM is really good).

## P.S.
I found [this post](https://gasparnagy.com/2019/05/clean-up-bad-bdd-scenarios/) bringing right thoughts in part of work on creation or adatation of BDD scenarios.  
Personally for me **"right"** BDD is still a white spot on the map of my experience, but it would be interesting for me to face with such real world example.