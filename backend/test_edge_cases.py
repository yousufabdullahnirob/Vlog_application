import requests
import random

BASE_URL = "http://127.0.0.1:8000/api"
AUTH_URL = "http://127.0.0.1:8000/api/token/"

def get_token():
    r = requests.post(AUTH_URL, json={"username": "fixuser", "password": "password123"})
    if r.status_code == 200:
        return r.json()["access"]
    else:
        print("Failed to get token:", r.text)
        return None

def test_collision(token):
    print("\n--- Testing Slug Collision ---")
    headers = {"Authorization": f"Bearer {token}"}
    slug = "collision-test"
    
    # First create
    data = {"title": "Collision Test", "slug": slug, "content": "First", "is_published": True}
    requests.post(f"{BASE_URL}/posts/", json=data, headers=headers)
    
    # Second create (should fail)
    r = requests.post(f"{BASE_URL}/posts/", json=data, headers=headers)
    print(f"Status: {r.status_code}")
    print(f"Response: {r.text}")
    if r.status_code == 500:
        print("!!! DETECTED 500 ERROR ON COLLISION !!!")

def test_missing_fields(token):
    print("\n--- Testing Missing Fields ---")
    headers = {"Authorization": f"Bearer {token}"}
    data = {"title": "No Content"} # Missing content, slug
    r = requests.post(f"{BASE_URL}/posts/", headers=headers, json=data)
    print(f"Status: {r.status_code}")
    print(f"Response: {r.text}")
    if r.status_code == 500:
        print("!!! DETECTED 500 ERROR ON MISSING FIELDS !!!")

def test_success(token):
    print("\n--- Testing Success Case ---")
    headers = {"Authorization": f"Bearer {token}"}
    slug = f"ok-{random.randint(10000,99999)}"
    data = {"title": "Success", "slug": slug, "content": "Content", "is_published": True}
    r = requests.post(f"{BASE_URL}/posts/", headers=headers, json=data)
    print(f"Status: {r.status_code}")
    if r.status_code == 201:
        print("Success")
    else:
        print(f"Failed: {r.text}")

if __name__ == "__main__":
    token = get_token()
    if token:
        test_collision(token)
        test_missing_fields(token)
        test_success(token)
