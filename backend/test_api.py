import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/posts/"
AUTH = ('admin', 'password123')

def test_api():
    # 1. List Posts (expect empty or existing)
    print("Testing GET list...")
    response = requests.get(BASE_URL)
    print(f"Status: {response.status_code}")
    print(f"Initial Content: {response.json()}")

    # 2. Create Post
    print("\nTesting POST create...")
    data = {
        "title": "Python Test Post",
        "slug": "python-test-post",
        "content": "Content from python script",
        "is_published": True
    }
    response = requests.post(BASE_URL, json=data, auth=AUTH)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 201:
        post_id = response.json()['id']
        
        # 3. Get Detail
        print(f"\nTesting GET detail for {post_id}...")
        response = requests.get(f"{BASE_URL}{post_id}/")
        print(f"Status: {response.status_code}")
        print(f"Content: {response.json()}")

test_api()
