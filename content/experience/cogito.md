+++
title = "Software Engineering at Cogito"
draft = false
date = '2021-08-01'
daterange = 'Jan 2021 - Aug 2021'
author = 'Software Engineer Co-op'
description = "I helped build out Cogito's microservice-based platform."
cover = 'experience/cogito-banner.jpeg'
+++
Cogito is a software company that develops an AI-augmented coaching system that integrates directly with a call center's telephony system. When Cogito's Dialog web application is running on a call center agent's machine, they will receive real-time feedback related to their behavior in the call. Dialog will notify the agent in real-time when they are speaking too quickly, when there has been an extended pause in the conversation, when there is an opportunity to meet their customer with empathy, and upon many other unique triggers. Here's what I have on my resume to represent my time at Cogito:

* Developed and maintained RESTful, asynchronous APIs using Java Spring Boot
* Addressed bugs and technical debt associated with the launch of Platform 2, an overhauled, microservice-based platform supporting core functionality of the product
* Supported infrastructural monitoring and maintenance for scalability and performance

### Overview

As part of the Platform team at Cogito, I helped my fellow engineers develop Platform 2. Platform 2 was a ground-up reimplementation of Dialog's first set of platform services, and it was reimagined to be more performant, reliable, and extensible than Platform 1. All of the microservices were developed using Java Spring Boot and deployed via Kubernetes. During the pre-GA stage of Platform 2's release, I tracked down and squashed several bugs that interfered with the usability of the new microservices. I laid down the framework for extensions on the various APIs, and I also improved test coverage to ensure reliability of the overall system.

The coolest part of my time at Cogito was the exposure that I gained to various infrastructure-related tools -- after all, the Platform team tends to wear many hats! I exposed relevant metrics in our microservices via Prometheus, and I used these endpoints to build out dashboards in Grafana. These dashboards were used to monitor Platform 2's general performance and availability, but they were also used to measure the system's overall reliability during webload testing. In addition, there were some points where it became necessary to develop new utility-based microservices to be used by Platform 2 or its users. I used Terraform to create AWS resources for these microservices, as well as the roles necessary for our Kubernetes pods to actually use the resources.

Overall, it was one of the most technically fascinating and rewarding co-ops that I experienced during my time at Northeastern University. By the end of my co-op, I was able to see the first Cogito customer deploy to a Platform 2 environment. Considering that Platform 2 had been conceptualized long before I even interviewed at Cogito, it was truly awesome to have a hand in the culmination of the engineering organization's hard work and dedication.