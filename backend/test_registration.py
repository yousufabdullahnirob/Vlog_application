import requests
import sys

BASE_URL = "http://127.0.0.1:8000/api"
USERNAME = "testuser_api_verify"
PASSWORD = "testpassword123"
EMAIL = "test_api@example.com"

def test_registration():
    print(f"Testing Registration for user: {USERNAME}")
    url = f"{BASE_URL}/user/register/"
    data = {
        "username": USERNAME,
        "password": PASSWORD,
        "email": EMAIL
    }
    try:
        response = requests.post(url, json=data)
        if response.status_code == 201:
            print("[\u2713] Registration Successful (201 Created)")
            return True
        elif response.status_code == 400 and "username" in response.json() and "already exists" in str(response.json()):
             print("[\u2713] User already exists (Verified constraint)")
             return True
        else:
            print(f"[X] Registration Failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"[X] Exception during registration: {e}")
        return False

def test_login():
    print(f"Testing Login for user: {USERNAME}")
    url = f"{BASE_URL}/token/"
    data = {
        "username": USERNAME,
        "password": PASSWORD
    }
    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            print("[\u2713] Login Successful (200 OK)")
            print(f"   Token: {response.json().get('access')[:20]}...")
            return True
        else:
            print(f"[X] Login Failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"[X] Exception during login: {e}")
        return False

if __name__ == "__main__":
    reg_success = test_registration()
    if reg_success:
        login_success = test_login()
        if login_success:
            print("\nAPI VERIFICATION COMPLETED: SUCCESS")
            sys.exit(0)
    
    print("\nAPI VERIFICATION COMPLETED: FAILURE")
    sys.exit(1)
