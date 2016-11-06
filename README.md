# YouTube Annotation Fetcher
For YouTube video uploaders, the Videos page features a menu for each video that provides links to *Info & Settings*, *Enhancements*, and so on. It includes links to open the video's annotations or the new End Screens feature. However, it does not say whether a video is already annotated.

This little JavaScript file can work in a Chrome (or FireFox, presumably) extension and tell you, without opening the annotations view, whether you have already annotated a video. It provides a count of annotations that have links, or a count of end screen objects, in the menu itself.

# Installation
## Chrome
I use [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija), and added this script for all of `https://www.youtube.com`. If you use this, you do not need to include jQuery, as YouTube already includes it.

## Other
I don't know! Something that lets you execute arbitrary JavaScript on webpages with a specific domain.

# Examples
!["Annotations (5)"](http://i.imgur.com/SJB4tCm.png)
!["End Screen Links (3)"](http://i.imgur.com/xWrdQXC.png)

# License
I didn't even bother licensing. Do whatever you want with it. All I ask is that you don't claim you made it. :)