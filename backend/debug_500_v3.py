import requests
import random

BASE_URL = "http://127.0.0.1:8000/api"
AUTH_URL = "http://127.0.0.1:8000/api/token/"

def get_token():
    # Login with fixuser
    r = requests.post(AUTH_URL, json={"username": "fixuser", "password": "password123"})
    if r.status_code == 200:
        return r.json()["access"]
    else:
        print("Failed to get token:", r.text)
        return None

def test_create_post(token):
    print("Testing POST /posts/ (Create)...")
    headers = {"Authorization": f"Bearer {token}"}
    slug = f"debug-post-{random.randint(1000,9999)}"
    data = {"title": "Debug Post", "slug": slug, "content": "This is a test post.", "is_published": True}
    try:
        r = requests.post(f"{BASE_URL}/posts/", json=data, headers=headers)
        print(f"Status: {r.status_code}")
        if r.status_code == 500:
            print("Response:", r.text)
        elif r.status_code == 201:
            print("Post created successfully.")
            return r.json().get("id")
        else:
             print("Create Failed:", r.text)
        return None
    except Exception as e:
        print("Error:", e)
        return None

def test_get_post_detail(post_id):
    if not post_id:
        print("Skipping detail test (no ID)")
        return
    print(f"Testing GET /posts/{post_id}/...")
    try:
        r = requests.get(f"{BASE_URL}/posts/{post_id}/")
        print(f"Status: {r.status_code}")
        if r.status_code == 500:
            print("Response:", r.text)
        elif r.status_code == 200:
            print("Get Detail Successful.")
        else:
            print("Get Detail Failed:", r.text)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    token = get_token()
    if token:
        post_id = test_create_post(token)
        test_get_post_detail(post_id)
