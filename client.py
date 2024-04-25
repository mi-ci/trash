import pyrebase

config = {
    "apiKey": "AIzaSyAEiuF044Rb24Lhkh8xwYZf6MFlDkIleNk",
    "authDomain": "suhwa-mbc.firebaseapp.com",
    "databaseURL": "https://suhwa-mbc-default-rtdb.asia-southeast1.firebasedatabase.app",
    "storageBucket": "suhwa-mbc.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

# Data you want to send
data = "산"

# Sending data to Firebase
db.child("suhwa_data").push(data)

print("Data sent to Firebase")
