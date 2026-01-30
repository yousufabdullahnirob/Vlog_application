import requests

BASE_URL = "http://127.0.0.1:8000/api/token/"
DATA = {
    "username": "admin",
    "password": "password123"
}

def test_token():
    try:
        response = requests.post(BASE_URL, json=DATA)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("Success! Token received.")
            print(f"Access Token: {response.json()['access'][:20]}...")
            print(f"Refresh Token: {response.json()['refresh'][:20]}...")
        else:
            print(f"Failed. Response: {response.text}")
    except requests.exceptions.ConnectionError:
        print("Connection failed. Is the server running?")

if __name__ == "__main__":
    test_token()
