# Does COVID-19 lockdown measures correlates with new cases?

This narrative visualization will explore Stringency Index correlation to new Covid-19 cases accross different country around the globe

## About Stringency Index
The Oxford COVID-19 Government Response Tracker (OxCGRT) systematically collects information on several different common policy responses that governments have taken to respond to the pandemic on 17 indicators such as school closures and travel restrictions. It now has data from more than 160 countries. 

the original stringency index records the strictness of ‘lockdown style’ policies that primarily restrict people’s behaviour. Later, the index also includes an overall government response index, which records how the response of governments has varied over all indicators in the database, becoming stronger or weaker over the course of the outbreak. The index also measures containment and health index which combines ‘lockdown’ restrictions and closures with measures such as testing policy and contact tracing, short term investment in healthcare, as well investments in vaccine.

Note that these indices simply record the number and strictness of government policies, and should not be interpreted as ‘scoring’ the appropriateness or effectiveness of a country’s response. A higher position in an index does not necessarily mean that a country's response is ‘better’ than others lower on the index.

Wall Street Journal: Measuring the Strictness of Your Lockdown: A University Boils It Down to One Number https://www.wsj.com/articles/measuring-the-strictness-of-your-lockdown-a-university-boils-it-down-to-one-number-11590246001

### Data Source
Collection of the COVID-19 data maintained by Our World in Data. Data is updated daily and includes data on confirmed cases, deaths, and testing, as well as other variables of potential interest, in this narrative, we take a look at stringency index.

## Scene-1: World Stringency Index Data

Bloomberg Why Acting Fast Is the Key to Beating a Second Wave of Covid-19: https://www.bloomberg.com/graphics/2020-swift-covid-19-lockdowns-more-effective/

## Scene-2: Stringency Index and New COVID-19 Cases

This scene is to explore the difference between country governments in responding to COVID-19 Cases. There are 9 countries picked by the author, to visualize the difference of the stringency index over time.

US
UK
Italy
China
Japan
South Korea
Singapore
New Zealand
India

## Scene-3: World Stringency Index and New COVID-19 Cases Data

India
The Guardian: India had one of the world's strictest lockdowns. Why are cases still rising? https://www.theguardian.com/commentisfree/2020/jul/04/india-lockdowns-cases-rising-
Hindustan Times: Coronavirus update: India’s nationwide lockdown move to contain Covid-19 spread quicker than most nations, shows study https://www.hindustantimes.com/india-news/india-s-nationwide-lockdown-move-to-contain-covid-19-spread-quicker-than-most-nations-study/story-0X4nUF6rhaNTcsH07k3P2H.html

Australia
ABC News Australia: How does Melbourne's coronavirus lockdown compare with overseas responses to community transmission? https://www.abc.net.au/news/2020-07-10/coronavirus-victoria-what-australia-learned-about-lockdowns/12429484
Vox: Australia was a coronavirus success story. Now, an outbreak is prompting new lockdowns. https://www.vox.com/2020/7/10/21317918/australia-melbourne-victoria-coronavirus-covid-19-lockdown

Japan
The Conversation: Coronavirus in Japan: why is the infection rate relatively low? https://theconversation.com/coronavirus-in-japan-why-is-the-infection-rate-relatively-low-133648
BBC: Coronavirus: Japan's mysteriously low virus death rate https://www.bbc.com/news/world-asia-53188847
Bloomberg: Japan Dodged Surge in Total Fatalities During Peak Virus Month
WSJ:How Japan Beat Coronavirus Without Lockdowns https://www.wsj.com/articles/how-japan-beat-coronavirus-without-lockdowns-11594163172

## About Narrative Visualisation

This narrative visualisation was build as a final project for CS498: Data Visualisation course at the

Resources:
- Data on COVID-19 (coronavirus) by Our World in Data https://github.com/owid/covid-19-data/tree/master/public/data
- CORONAVIRUS GOVERNMENT RESPONSE TRACKER https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker

D3 resources:
- Bar Chart with update https://bl.ocks.org/saraquigley/fff2204cde6fa769696ef143273560ec
- Most basic choropleth map in d3.js https://www.d3-graph-gallery.com/graph/choropleth_basic.html

