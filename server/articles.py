# -*- coding: utf-8 -*-
# import libraries
try:
    # For Python 3.0 and later
    from urllib.request import urlopen
except ImportError:
    # Fall back to Python 2 urllib2
    from urllib2 import urlopen
from bs4 import BeautifulSoup
import csv
import requests
import json

# specify the url
bears_news_page = "https://bearswire.usatoday.com/"

# query the website and return the html to the variable
page = urlopen(bears_news_page)

# parse the html using beautiful soup and store in variable `soup`
soup = BeautifulSoup(page, "lxml")

# Create a file to write to, add headers row
f = csv.writer(open('article.csv', 'w'))
f.writerow(['article', 'link'])

# Pull all text from the l-chunk class
article_name_list = soup.find(class_='site-main')

# removed unwanted div to clean up json formatting
for span in soup("span"):
    span.decompose()

# Pull text from all instances of <a> tag within site-main class
article_name_list_items = article_name_list.find_all('a', limit=4)

# Create for loop to print out all articles names
for article_name in article_name_list_items:
    names = article_name.contents[1].text.strip()
    links = article_name.get('href')

    # Add each article title and associated link to a row
    f.writerow([names, links])

# Open the CSV
f = open('article.csv', 'r')
# Change each fieldname to the appropriate field name
reader = csv.DictReader(f)
# Parse the CSV into JSON
out = json.dumps([row for row in reader], indent=4)
print(out)
print("JSON parsed!")
# Save the JSON
f = open('server/public/articles.json', 'w')
f.write(out)
print("JSON saved!")
