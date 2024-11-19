import os
import json
import requests

username = input("Insert the username of the player: ")
url = f'https://api.collectionlog.net/collectionlog/user/{username}'
response = requests.get(url).json()

if (len(response) == 1 and 'error' in response):
    print(response['error'])
    exit()

if not os.path.exists('./users'):
    os.mkdir('users')

with open(f'users/{response["collectionLog"]["username"]}.json', 'w') as output_file:
    json.dump(response, output_file, indent=4)