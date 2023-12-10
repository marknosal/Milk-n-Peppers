from bs4 import BeautifulSoup
import requests

headers = {'user-agent': 'my-app/0.0.1'}
html = requests.get('https://www.depop.com/milknpeppers/selling/', headers=headers)
doc = BeautifulSoup(html.text, 'html.parser')