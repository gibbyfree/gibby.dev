+++
title = "Hacking Cal-Heatmap to Visualize Boston Marathon Training Plans"
draft = false
date = '2022-04-04'
description = "or: How I Learned To Stop Using R and Love D3"
cover = 'blog/cal-heatmap/calendar.png'
tags = ['data viz', 'javascript', 'd3', 'r', 'journalism']
keywords = ['calendar data viz', 'javascript calendar heatmap', 'cal-heatmap', 'd3 tutorial', 'd3']
+++
## Background
I write this during the spring of '22, where I'm in the midst of wrapping up my final undergraduate requirements. One of the courses that I'm taking is JRNL 3610: Digital Storytelling and Social Media. This course involves working with different project groups throughout the semester to develop digital stories, oftentimes accompanied by multimedia components. For one of these projects, my group decided that we wanted to prepare a timely story about Boston Marathon preparations. 

I considered this topic to be compatible with a more data-driven story, and took this project as an opportunity to refine my experience around data visualization tools. I was initially hoping that we could get some [Strava data](https://labs.strava.com/) from one of our interviewees, and that I could put together a compelling timeline-based visualization that displayed training routes, distance, and intensity. As my team raced against the clock to complete all of the reporting and design work necessary for this assignment, I never got my hands on any of that data. But I *was* able to get access to the paper training plans of several of our interviewees. I had around three days to produce something polished and interactive with these pieces of paper, and I was eager to get started.

## Tangent: Calendars and I Go Waaaay Back

{{< figure src="/blog/cal-heatmap/meme.jpeg" alt="Calendar meme" position="center" style="border-radius: 8px; width: 50%; height: 50%; display: block;" caption="So true!!!" captionPosition="center" captionStyle="color: black; width: 50%; height: 50%; margin: auto;" >}}

For reasons unknown to me, I have always held a passing interest in the form and function of calendars. I like to think of calendars as being my 'gateway drug' into the world of unconventional data viz. In 2017, when I was a mere babe, I participated in a working group at Northeastern University that tentatively dubbed itself the "C+J Working Group". `(C = Computation && J = Journalism)`. This group was dedicated to exploring the intersection of storytelling, computation, and design. (It has since spun off into the [Co-Laboratory for Data Impact](https://camd.northeastern.edu/research-scholarship-creative-practice/co-laboratory-for-data-impact/), which I've also done a bit of work for.) I gained access to huge opportunities through this group, and was able to contribute to data viz projects, [attend conferences](https://www.storybench.org/six-fascinating-projects-from-the-2019-computation-journalism-symposium-in-miami/), and even contribute to academic papers.

Yes, technically, I am a published author! I assisted some faculty members and an upperclassman in writing and reviewing [Newsroom Textual Analysis and Visualization Tools Built With R Shiny](https://gibby.dev/blog/cal-heatmap/paper.pdf), which was a paper focused on the newsroom utility of various data tools developed with R Shiny. Our paper specifically referenced tools developed by Northeastern faculty members, but as students we were asked to take a crack at developing our own data tool in R Shiny. I wanted to develop a calendar heatmap-like tool, where you could feed in a `.csv` of text-date pairings and produce a basic text frequency heatmap based on a user-provided keyword. 

### Tangent: Attempt #1 at Calendar Viz (in R)

This is my first time running my R Shiny app since 2017, and I'm initially impressed by how slick the surrounding UI elements look. I have [shinythemes](https://rstudio.github.io/shinythemes/) to thank for that. I also think that R Studio is a delightful IDE to work with. When I load in a .csv and produce my visualization, here is what I end up with:

{{< figure src="/blog/cal-heatmap/r-shiny.png" alt="R Shiny calendar app" position="center" style="border-radius: 8px; width: 50%; height: 50%; display: block;" caption="'Calendar-ify-er'... Cute, I guess?" captionPosition="center" captionStyle="color: black; width: 50%; height: 50%; margin: auto;" >}}

For the record, I'm pretty sure that this viz is broken. I never actually got this 'prototype' in a working state. I am also almost certain that I pulled the majority of this R code from Stack Overflow. The server-side chunk of this app makes use of [ggplot2](https://ggplot2.tidyverse.org/reference/ggplot.html) and [lubridate](https://lubridate.tidyverse.org/), and I don't understand most of what is written here. Here's a chunk taken out of context:

{{< code language="r" title="black magic of some sort" id="1" isCollapsed="false" >}}
cal        <- merge(cal,df[,c("dates","counts")],all.x=T)
      
print(ggplot(cal, aes(x=cdow,y=-week))+
        geom_tile(aes(fill=counts,colour="grey50"))+
        geom_text(aes(label=day),size=3,colour="grey20")+
        facet_wrap(~cmonth, ncol=3)+
        scale_fill_gradient(low = "moccasin", high = input$selectedColor, na.value="white")+
        scale_color_manual(guide=F,values="grey50")+
        scale_x_discrete(labels=c("S","M","T","W","Th","F","S"))+
        theme(axis.text.y=element_blank(),axis.ticks.y=element_blank())+
        theme(panel.grid=element_blank())+
        labs(x="",y="")+
        coord_fixed())
{{< /code >}}

This is not a post about R, so I don't want to excessively expound on how I feel about it. I think R is powerful, but I don't love how the charts generated by the most popular libraries look. I don't think there is much room for adding interactivity. And despite the fact that people will say "R is just like Python!", I find it very difficult to parse. Although R feels like a scripting language, everything else about it feels alien. I understand that there is a learning curve to all languages, but I think I've been spoiled by more general-purpose languages. Any time spent grinding R, I think, would only improve my ability to programatically create graphs and charts in R. 

When I began this new project, several years after this R moment, I considered revisiting R. There are quite a few libraries out there, especially libraries related to calendar visualizations. However, as I've gained more experience in JavaScript (and web development in general), and as I've already had some successful excursions with [d3.js](https://d3js.org/), I felt much more comfortable in my ability to throw something together with that realm of tools. 

(If you'd like to take a look at my GitHub repo for this trainwreck, you can here: [link](https://github.com/gibbyfree/calendar-headlines). But there's not much to look at :sweat_smile: ...)

## Working with Cal-Heatmap

You can imagine that I was thrilled to find [Cal-Heatmap](https://cal-heatmap.com/). It looked slick, interactive, and there was a lot of room for configuration. Best of all, since it was all open-source and built off of js, I could theoretically hack it however I wanted.

For my viz, I had a clear viz-ion (haha) in my mind from the jump. I wanted to juxtapose the three training plans that I was given, with a heatmap that indicates intensity in some way. Presenting three identical calendars in juxtaposition turned out to be harder than I thought. This library is intended for more GitHub Contribution-esque visualizations. Either way, it's simple enough to construct multiple visualizations with this library.

The required data format of Cal-Heatmap was challenging to work with. Rather than taking dates in a format like `MM-DD-YYYY`, it took in Unix epoch times. Due to limitations in my data, I only graphed two weeks of training plans, but if I were working with a larger date range, I probably would have written something to automate the generation of the input .json rather than going back and forth with [EpochConverter](https://www.epochconverter.com/).

{{< code language="json" title="example of cal-heatmap input" id="2" isCollapsed="false" >}}
{
    "1646136000": 10,
    "1646222400": 6,
    "1646308800": 0,
    "1646395200": 4,
    "1646481600": 6,
    "1646568000": 16,
    "1646654400": 0,
    "1646740800": 7,
    "1646827200": 11,
    "1646913600": 0,
}
{{< /code >}}

Creating the three identical calendars was simple enough, but as I added interactivity to the visualizations I started to run into issues. Although I can provide an `itemNamespace` to an instance of a calendar to isolate click events between namespaces, Cal-Heatmap was evidently not created with this use case in mind. If tooltips are enabled on multiple visualizations, the tooltip's data will be correct but it will always render above the cells of the **first** visualization.

### Debugging Cal-Heatmap

I tried several things to workaround this issue. All failed for various reasons.

#### Change the epoch time by a couple of digits.

I was aware that Cal-HeatMap was calculating tooltip positioning based on the dates of each calendar.

{{< code language="javascript" title="cal-heatmap source code: d.t is datetime" id="3" isCollapsed="false" >}}
var tooltipPositionX = 
        self.positionSubDomainX(d.t, true) - self.tooltip[0][0].offsetWidth/2 + options.cellSize/2;
var tooltipPositionY = 
        self.positionSubDomainY(d.t) - self.tooltip[0][0].offsetHeight - options.cellSize/2;
{{< /code >}}

I thought I could be clever and fool the system by inputting Unix epoch times that corresponded to the same day, but differed by an hour or so each (i.e `1646136000` and `1651011721`). Unfortunately, Cal-HeatMap rounds the provided Unix epoch times after input, up to 11:59PM on that day or something like that. (What's the point of even inputting Unix epoch in the first place then...?)

#### Create isolated contexts for each map by using iframes.

Full disclosure, this is one of the more depraved things that I've ever done. Originally, I had a plain ole `index.html` that I was creating multiple maps in. I knew that the issue was with the calendars being able to 'see' one another's data. So what if they couldn't? I change my base page to look like this:

{{< code language="html" title="monstrosity" id="4" isCollapsed="false" >}}
<iframe src="calendar-a.html"></iframe>
<iframe src="calendar-b.html"></iframe>
<iframe src="calendar-c.html"></iframe>
{{< /code >}}

Should work, right? I had to do some finagling to make everything look correct. I had to do the classic `onload="this.style.height=(this.contentWindow.document.body.scrollHeight+20)+'px';"` hack to ensure that the iframes were sized correctly. But technically, this fix worked! The only issue that I had? I'm bad when it comes to working with HTML and CSS from scratch :slightly_smiling_face:... There's a reason why my personal website is created with Hugo. I really struggled with getting the iframes to align and scale properly, and given my time constraint I didn't have much time to figure it out.

In addition, my team wanted me to construct a third element of the visualization. They wanted to add the ability to click on a calendar and view a popup that describes that runner's training plan in further detail. The front-end of this work would've been nightmarish to coordinate with three separate iframes, so I abandoned this lead.

#### Find calendar months that /look/ the same as April 2021, but are different

I spent about 20 minutes scrolling through calendar pictures on Google Images and then I gave up. But I think it would be fun to write a program that tries to figure this out for you.

#### Final solution: modify the source code

As I mentioned before, Cal-Heatmap calculates tooltip position based on the time that is input. I spent some time staring at the positioning source code before realizing that the fix was much, much simpler than I thought. I created a new property of the calendar object called `nth`, which simply represented the `nth` order of the calendar in a horizontal set of calendars. It's basically the calendar's index.

In the Cal-Heatmap source code, I take in this property and use it to offset the tooltip's x-positioning on render. The x-positioning is the only thing that mattered in my case, but if you had a large enough set of calendars, `nth` would probably have to be a two-dimensional index. The change itself was pretty minor:

{{< code language="javascript" title="nth margin change" id="5" isCollapsed="false" >}}
positionSubDomainX: function(d, b) {
		"use strict";

		var index = this._domainType[this.options.subDomain].position.x(new Date(d));
		var nthMargin = this.options.nth !== 0 && b ? 200 * this.options.nth : 0;
		nthMargin = this.options.nth == 2 && b ? nthMargin - 15 : nthMargin + 0;
		return index * this.options.cellSize + index * this.options.cellPadding + nthMargin;
	},
{{< /code >}}

## Fruits of my Labor

<iframe src="https://gibby.dev/jrnl/"></iframe>