import requests

def test_login():
    url = "http://127.0.0.1:8000/api/token/"
    data = {
        "username": "fixuser",
        "password": "password123"
    }
    print(f"Attempting to log in with: {data}")
    
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("Login SUCCESS!")
        else:
            print("Login FAILED!")
            
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_login()
