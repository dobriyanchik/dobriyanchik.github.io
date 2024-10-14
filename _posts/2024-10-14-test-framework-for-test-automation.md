---
layout:     post
title:      "Test framework for test automation"
date:       2024-10-14 19:30:00
categories: Automated-Testing
tags:       coding automated-testing unicorn-taf
author:     Dobriyanchik
---

* content
{:toc}

Recently my [colleague](https://ummshsh.github.io) sent me a link to a [video about new test library](https://youtu.be/dtdgm8lKJZU) by [Nick Chapsas](https://nickchapsas.com). Nick made brief showcase of the library (it looks good, but I'm not ready to say I was impressed), but more interesting for me was one of the comments below the video, which was saying:
 > "We need test frameworks not just unit test frameworks (we use them for more than just unit tests)"

And really what's wrong with them?  
Spoiler: nothing, but ...





## But what?

Many of the well-known unit testing frameworks are really good, popular and used across the whole world, some of them are full of different useful fefatures like NUnit, some of them are simplier but in the same time more flexible and extenbale like XUnit. Each can find more suitable framework. But... all of them are UNIT testing frameworks.

So what test automation engineers may miss in all of them?

My personal near 15 years experience in test automation briefly highlights several points:

### Reports
Automated testing likes meaningful readable reports. Why? Because at least in case of fail one can read the report and should be able to reproduce the test manually. If manual testers are involved in test automation results analysis, humanized and easy readable reports are vital. So powerful and user-friendly reports such as [ReportPortal](https://reportportal.io), [Allure](https://allurereport.org), [TestIT](https://testit.software) are the first reason.

 > Of course all of popular unit test frameworks have adapters for majority of known reporting tools.

The thing is that all of these frameworks does not have built-in  very common attributes/features used in test automation (and they don't have to because they are unit testing frameworks :) )

Some of features I mean are:
 - Test steps
    > Common automated test is based on some manual test which has steps. Steps make autotest readable and allow to report it in a way close to manual test description
 - Connection with a manual test
    > Basically it's just simple attribute specifying ID of manual test case in TMS which could be added in report as link or used to report results in TMS like in Allure TestOps
 - Connection with defects
    > Yes, sometimes autotests fail, and part of fails is related to some existing product defects which are reported in a bug-tracking system. It's good to have ability to point test to a bug by some attribute and to use it to handle test fails related to the bug.

Some of these features are part of reporting libraries. Steps are supported by ReportPortal, Allure, TestIT. Connection to manual test case is supported by Allure and TestIT. But they are baked into reporting libs, not the framework itself. 

Let's imagine a case when one uses Allure static report as current reporting system. The report has steps, links to test cases and bugs test related to, but it's not suitable for team work and not editable. And one day team decides to change reporting to ReportPortal (with all hundres or thousands of already existing autotests). That's where the hell comes in. Report Portal has it's own implementations of these features and the team needs to replace all Allure stuff by ReportPortal stuff. For steps it will be just mass replacement of usages and possibly steps attributes, but links to test cases and bugs will just disappear as report portal lib does not support it from the box.
As test automation engineer I just want to change one/few lines in my framework to move to another reporting system, not to refactor everything!

### GUI Automated testing

As I already mentioned in [my previos post about GUI automated testing](./2024/10/09/gui-test-automation-approach) "Test automation engineer is a human who wants to interact with GUI in the same way independently on specific GUI nature". 

It's logical and obvious to have same api for working with GUI regardless on it's nature and platform.

## Unicorn.TAF
I tried to write core of [Unicorn.TAF](https://unicorn-taf.github.io) framework considering aspects above. My goal was to make a framework for test automation engineers, not for developers.

In Unicorn.TAF I can change reporting from Allure to ReportPortal preserving all benefits including steps reporting just by replacing 
```csharp
reporter = new AllureReporterInstance();
```
with
```csharp
reporter = new ReportPortalReporterInstance();
```

and using reporter related config file.

**And that's all**

In Unicorn I can use same common built-in assertion mechanism to make checks on data, web service responses and any GUI supported by the framework. And these assertions are already tied with Steps feature so could be automatically handled by reporters or any other stuff subscribed to Step events.

All Unicorn GUI features I already mentioned in my previous post. Of course there is still some room for improvements and making the framework even more test automation framework, but at the current stage it's already do the job.

 > For more references see [repo with framework usage examples](https://github.com/Unicorn-TAF/examples)