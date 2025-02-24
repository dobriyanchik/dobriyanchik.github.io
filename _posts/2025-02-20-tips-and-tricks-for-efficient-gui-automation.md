---
layout:     post
title:      "Tips and tricks for efficient GUI automation"
date:       2025-02-20 09:50:00
categories: ["Automated testing"]
tags:       coding .net automated-testing gui unicorn-taf
series:     "GUI test automation"
---

* content
{:toc}

GUI automated tests are the most slow, unstable and harmful among all automated tests types. Thus they require more careful handling and more efforts to not to make them a pain in your ... test automation  
![](https://imgs.xkcd.com/comics/automation.png)

* * *

# Increase stability

## 1. Avoid hardcoded waits

`Thread.Sleep()` is evil. Forget about it, use fluent waits, wait for specific things to happen (mostly they exist and could be caught).

But there could be exceptions (everyone still uses sleeps anyway (´｡• ᵕ •｡`) ). There could be some animations not influencing html content or it's not trivial to wait for. In such cases it's possible to use hardcoded waits:
 - it's better to know exact animation time (you could ask frontend team to provide with timing).
 - it's better to wrap it by some dedicated method with a self-explanatory name >> it's easier to track it usages later and after some time you'll still remember why it was used.


## 2. Handle loading indicators in right manner

It's not enough just to wait for loading indicator to disappear, usually it takes time for loader even to appear, firstly frontend could do some operations on its side and just then show loader, it could take even seconds. So it's better to wait for loader to appear and then wait for it to disappear. Unicorn has built-in mechanism to perform such waits using [LoaderHandler](https://github.com/Unicorn-TAF/ui-core/blob/master/src/Unicorn.UI.Core/Synchronization/LoaderHandler.cs). The advices here are:
 - wait for appearance safely, does not fail here: sometimes appearance could be too fast to be caught and waiter can miss loader appearance and continue waiting
 - carefully select indicator appearance timeout to not to loose much time on possible unhandled cases


# Increase speed

## 1. Functionality variations testing

Often functionality (not the UI itself) is tested through UI. In such case when variations are not tied directly with UI it makes sense to test just one functional test though UI and to cover all of it's variations via API. Suppose you remember [testing pyramid](https://martinfowler.com/bliki/TestPyramid.html), do you?


## 2. Handle loading indicators smartly

Let's consider a case when you have a form with a loading indicator. And suppose there is a dropdown within the form: when you select an item from the dropdown, the form is being refreshed and the loading indicator appears. To make your test stable you have to wait for the indicator to disappear before you can continue with the test. The thing is that mostly GUI implemented in such way that a form is not refreshed and/or loading indicator does not appear if you try to select already selected value. So, you can just check if the selected value is already selected and if it is, you can skip waiting for the indicator to disappear. This will make your test faster and more stable. How it is done in Unicorn.TAF:  
The general approach which also tells about concept of reusable elements was already mentioned [here](../../../../2024/10/09/gui-test-automation-approach). Most of the UI controls interfaces in `Unicorn.UI.Core` have methods returning `bool` which purpose is to indicate whether action you tried to perform was actually performed or not. Let's return to our initial example with dropdown: it's implied that any custom dropdown has to implement [`IItemSelectable`](https://github.com/Unicorn-TAF/ui-core/blob/master/src/Unicorn.UI.Core/Controls/Interfaces/IItemSelectable.cs) interface.

Thus implementation of our custom dropdown selection logic will look like this (schematically): 

```csharp
public bool Select(string itemName)
{
    // if a dropdown shows selected item, then make quick check
    if (SelectedValue == itemName)
    {
        return false;
    }

    Expand();

    WebControl item = GetItem(itemName);

    // sometimes a dropdown does not show selected value
    // so we can optionally check the item directly for some specific attributes
    bool needToSelect = item.GetAttribute("class").Contains("selected");

    if (needToSelect)
    {
        item.Click();
    }
    else
    {
        Collapse();
    }

    // here is an essence: 
    // we return the result whether the selection was really performed or not
    return needToSelect;
}
```

After this in the scenario or test step we just need to call:

```csharp
if (dropdown.Select("some-item"))
{
    // waiting for the loader or refresh
}
```

So you need to implement such logic only once and then reuse it in any relevant case. This will help you to avoid duplicating the same logic in multiple places, make your tests more maintainable and to shorten execution time (it could be noticeable when running a big number of tests)


## 3. Prepare your test data in non GUI way

If you have such ability, handle test data preparation in non GUI way. Spending significant part of tests execution on "some preparations" is counterproductive, the goal of the launch is to test in first order. So try to use any ability to handle it more efficient way, there are bunch of options to do this:
 - for static data: try to move such data into a database dumps which could be easily restored when necessary. Also external files like JSON, XML, CSV, etc. could be used and then quickly uploaded into a system.
 - for dynamic data: use any API or service to enter test data. Considering you followed section **Functionality variations testing** you should have most of APIs covered, just need to use them.

The advice here is to try to avoid entering the data directly to database, there is a big risk to introduce inconsistency into your system as you can miss some relations with other tables or other parts of the system.
 

## 4. Optimize UI scenarios to replace frequent complex GUI actions with non GUI ones

It's often happens that to test some specific thing you need to perform chain of actions leading to desired results (some of business workflows can require some base common things to be made). If such actions are complex and frequent, it's worth to think about how to replace them with non GUI actions. With high probability you already have a separate test with tests this chain of actions in GUI (if you don't it's time to create one), there is no need to retest it many times in other tests which have different focus. This will not only speed up, but also stabilize your tests as in case of some unexpected changes in GUI, you will not get all dependent on this UI flow tests failed and they will test exactly what they are supposed to test.

Also some more minor actions could be optimized, for example you don't have to navigate to some page through user menus or buttons/links (again it's better to have a separate test for this), you can just directly navigate to the page using URL (if the page is reachable that way). Sometimes it's even possible to navigate to the page with additional flags in URL which open the page in desired state avoiding you to perform additional actions in GUI to get the same state. 

# Reduce support

## Do not create God-controls

Following the approach of reusable controls should be smart. Consider the following example: you have an application and there are different implementations of complex controls presenting generic **dropdown**: ordinary dropdowns, multiselect dropdowns, dropdowns with tree items structure, etc. Even if whole app UI uses one defined style these dropdown types will differ because of their nature. 

You can create a single control covering all these cases, but it will be a God-control: is hard to support it, hard to understand which part of code or child locator corresponds to which dropdown type. This will lead to increased support costs and the control will become _"a place in code which it's better not to touch at all"_. Better to create separate controls for each type of dropdown. This way you can easily support and understand each control. 

 > In case of our example with dropdown there could be also additional _bonus_, if you are lucky and your app follows common UI style you can re-use the whole TreeView control (if you have such) as a options frame of dropdown with tree items structure >> so there will be less efforts to implement this type of dropdown.

