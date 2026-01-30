import requests

BASE_URL = "http://127.0.0.1:8000/api"

def test_get_posts():
    print("Testing GET /posts/...")
    try:
        r = requests.get(f"{BASE_URL}/posts/")
        print(f"Status: {r.status_code}")
        if r.status_code == 500:
            print("Response:", r.text)
    except Exception as e:
        print("Error:", e)

def test_register():
    print("Testing POST /user/register/...")
    try:
        r = requests.post(f"{BASE_URL}/user/register/", json={"username": "debug_user", "password": "password", "email": "debug@test.com"})
        print(f"Status: {r.status_code}")
        if r.status_code == 500:
            print("Response:", r.text)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    test_get_posts()
    test_register()
