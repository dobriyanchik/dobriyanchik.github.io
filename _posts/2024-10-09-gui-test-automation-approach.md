---
layout: post
title:  "GUI test automation approach"
date:   2024-10-09 13:00:00
categories: Automated-Testing
tags: automated-testing gui unicorn-taf
author: Dobriyanchik
---

* content
{:toc}

There are a lot of different tools and frameworks for GUI testing available to test automation community. It's really great that one is able to choose the tool best suitable for specific needs from a big number of options. But most of them are low-level tools designed to be a "driver" to specific platform or GUI implementation. Test automation engineer is a human who wants to interact with GUI independently on specific GUI nature. The world of free tools lacks in comprehensive and unified high-level approach for GUI testing (everything is better in world of proprietary tools, but let's focus on "free" world)





## Problem statement

### 1. Different APIs 
All GUI testing libraries have different APIs which is worsed by the presence of different platforms (Web, Desktop, Mobile). 
 - description of the same GUI for different platform or using different libs is completely differ.
 - some libs support PageObject approach from the box, some - not
 - checks on UI elements are different everywhere

So for the same user experience one gets completely different code. Below an example for the same Sign In form designed for web and desktop platforms:

#### Web
```csharp
// PageObject description using Selenium.
public class SignInBlock
{
    private readonly WebDriver _driver;

    private readonly By _usernameBy = By.Id("email");
    private readonly By _passwordBy = By.Id("password");
    private readonly By _signInButtonBy = By.Name("Sign In");

    public SignInBlock(WebDriver driver)
    {
        _driver = driver;
    }

    public void LoginValidUser(string userName, string password)
    {
        driver.FindElement(_usernameBy).SendKeys(userName);
        driver.FindElement(_passwordBy).SendKeys(password);
        driver.FindElement(_signInButtonBy).Click();
    }
}
```

#### Desktop
```csharp
// PageObject description using Microsoft UI Automation.
public class SignInBlock
{
    private readonly CUIAutomation8 _driver;

    public SignInBlock(CUIAutomation8 driver)
    {
        _driver = driver;
    }

    private IUIAutomationCondition UsernameCnd =>
        driver.CreatePropertyCondition(UIA_AutomationIdPropertyId, "email");

    private IUIAutomationCondition PasswordCnd =>
        driver.CreatePropertyCondition(UIA_AutomationIdPropertyId, "password");

    private IUIAutomationCondition SignInButtonCnd =>
        driver.CreatePropertyCondition(UIA_NamePropertyId, "Sign In");

    public void LoginValidUser(string userName, string password)
    {
        SetText(GetElementBy(UsernameCnd), userName);
        SetText(GetElementBy(PasswordCnd), password);
        ClickOn(GetElementBy(SignInButtonCnd));
    }

    //... 
    // and more code for implementation of GetElementBy, SetText and ClickOn
}
```

**That's disgusting! Both code snippets are totally different**

By the fact both forms have absolutely same set of controls: two text fields and one button. And in my code I assume to do absolutely same actions on them: set text and click. That's very logical and simple, right?

### 2. Complex controls

By the fact each complex GUI control is a set of some more primitive controls baked together (some kind of mini PageObject) which assumably can be reused many times as a single entity.

```
 ┌───────────────────────┐                                                     
 │      PageObject       │                                                     
 │                       │                                                     
 │  ┌──────────┐         │                                                     
 │  │WebControl│         │                                                     
 │  └──────────┘         │    ┌─────────────────┐    ┌───────────────────────┐ 
 │  ┌──────────────┐     │    │  ComplexControl │    │      PageObject       │ 
 │  │ComplexControl├─────┼────┤                 │    │                       │ 
 │  └──────────────┘     │    │  ┌──────────┐   │    │  ┌──────────┐         │ 
 │  ┌──────────┐         │    │  │WebControl│   │    │  │WebControl│         │ 
 │  │WebControl│         │    │  └──────────┘   │    │  └──────────┘         │ 
 │  └──────────┘         │    │  ┌──────────┐   │    │  ┌──────────────┐     │ 
 │  ┌──────────┐         │    │  │WebControl│   ├────┼──┤ComplexControl│     │ 
 │  │WebControl│         │    │  └──────────┘   │    │  └──────────────┘     │ 
 │  └──────────┘         │    └─────────────────┘    │                       │ 
 └───────────────────────┘                           └───────────────────────┘ 
```

But there is one more property which describes complex controls: complex control is not only a combination of primitives, it's also a combination of "behaviors". There are few very basic actions that could be done on most of elements: click and send keys (and those are usually part of most of tools/frameworks). But complex control in addition to these primitive actions have some behaviors describing interaction with it. As an example: standard Dropdown is a combination of behaviors let's call them `IExpandable` and `IHasItemSelection` (of course custom implementations can have additional behaviors)

```
     ┌────────────────┐   ┌───────────────────┐
     │  IExpandable   │   │ IHasItemSelection │
     └────────────┬───┘   └───┬───────────────┘
                  │           │             
            ┌─────┴───────────┴─────┐       
            │        Dropdown       │       
            │  ┌─────────────────┐  │       
            │  │    WebControl   │  │       
            │  └─────────────────┘  │       
            └───────────────────────┘              
```

And I think such approach should be a standard when one works on GUI test automation.

## Unicorn.TAF
When I started to develop UI modules of [Unicorn.TAF](https://unicorn-taf.github.io), aspects I highlighted above were most significant drivers for me. I wanted to free test automation from using different UI libs APIs, co-living assertion libs or approaches to check UI on different platforms.

Unicorn provides with common and unified mechanism of work with GUI which is platform and UI independent and could be extended to use any underlying "driver" lib keeping the same unified API. it provides with set of already defined "behaviors" described by interfaces such as `IExpandable`, `ISelectable`, `ILoadable` etc. what makes possible to reuse common UI asssertions among all platforms and UI types and to obtain high level of reusability and to speed up coding process.

For the same example with Sign In form presented in first section code for Web and Desktop with Unicorn will look almost the same:

#### Web
```csharp
public class SignInBlock : WebPage
{
    [ById("email")]
    private readonly TextInput _username;

    [ById("password")]
    private readonly TextInput _password;

    [Find(Using.Name, "Sign In")]
    private readonly WebControl _signInButton;

    public SignInBlock(IWebDriver driver) : base(driver) { }

    public void LoginValidUser(string userName, string password)
    {
        _username.SendKeys(userName);
        _password.SendKeys(password);
        _signInButton.Click();
    }
}
```

#### Desktop
```csharp
public class SignInBlock : Window
{
    [ById("email")]
    private readonly TextInput _username;

    [ById("password")]
    private readonly TextInput _password;

    [Find(Using.Name, "Sign In")]
    private readonly WinControl _signInButton;

    public SignInBlock(IWebDriver driver) : base(driver) { }

    public void LoginValidUser(string userName, string password)
    {
        _username.SendKeys(userName);
        _password.SendKeys(password);
        _signInButton.Click();
    }
}
```
**Magic!**

Even such code is possible with Unicorn:

```csharp
// Create new unicorn Chrome driver
IDriver driver = new DesktopWebDriver(BrowserType.Chrome);

// Search for web element in browser
IControl someControl = driver.Find<WebControl>(ByLocator.Id("someId"));

// Perofrm some check on the element
Assert.That(someControl, UI.Control.HasTextMatching("[0-9]*"));

// web driver becomes Windows desktop driver
driver = WinDriver.Instance;

// someElement web element becomes Windows GUI element
someControl = driver.Find<WinControl>(ByLocator.Class("Button"));

// Perform the same check on new element
Assert.That(someControl, UI.Control.HasTextMatching("[0-9]*"));
```

 > For more references see [repo with framework usage examples](https://github.com/Unicorn-TAF/examples)