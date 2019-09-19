# Pagination on Django using React.js
Implementing the Django's paginator using React.js as frontend
#### Video demo: https://www.youtube.com/watch?v=KCVwYL5gFvs
## Getting Started
We are using
```
Please use npm version that is >= 3.0.0 and < 5.0.0
Much better install node.js version 5.11.1
ReactJS 16 is not working on latest version of node.js

Django 1.11
ReactJS version 16.4.1
```
### Installing
Make sure you already installed virtual environment for django in your computer.
```
#open first terminal
git clone https://github.com/bossajie/Pagination-Django-React.js.git
cd Pagination-Django-React.js
virtualenv environment
environment\scripts\activate
pip install -r requirements.txt
npm install
python manage.py createsuperuser  <--*optional* (create account to admin for django admin dashboard)
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

# open your 2nd/another terminal
node server.js

open to your browser: 127.0.0.1:8000/
```
