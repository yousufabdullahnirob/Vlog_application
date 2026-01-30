import requests
import time

BASE_URL = "http://127.0.0.1:8000/api"

def test_full_flow():
    # 1. Register
    reg_url = f"{BASE_URL}/user/register/"
    username = f"newuser_{int(time.time())}"
    password = "password123"
    email = f"{username}@example.com"
    
    reg_data = {
        "username": username,
        "password": password,
        "email": email
    }
    
    print(f"1. Registering user: {username}")
    try:
        reg_res = requests.post(reg_url, json=reg_data)
        print(f"   Register Status: {reg_res.status_code}")
        print(f"   Register Response: {reg_res.text}")
        
        if reg_res.status_code != 201:
            print("   [!] Registration Failed")
            return
            
    except Exception as e:
        print(f"   [!] Exception during registration: {e}")
        return

    # 2. Login
    login_url = f"{BASE_URL}/token/"
    login_data = {
        "username": username,
        "password": password
    }
    
    print(f"2. Logging in user: {username}")
    try:
        login_res = requests.post(login_url, json=login_data)
        print(f"   Login Status: {login_res.status_code}")
        
        if login_res.status_code == 200:
            tokens = login_res.json()
            access = tokens.get("access")
            if access:
                print(f"   Login SUCCESS! Access token received.")
            else:
                print(f"   Login SUCCEEDED but no access token?")
        else:
             print(f"   Login FAILED. Response: {login_res.text}")

    except Exception as e:
        print(f"   [!] Exception during login: {e}")

if __name__ == "__main__":
    test_full_flow()
