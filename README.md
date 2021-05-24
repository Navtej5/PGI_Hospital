# Getting Started with PGI INVENTORY MANAGEMENT SYSTEM
## Cloning via github:
Skip this method if you already have the code base zip file.
Clone the project with the following command (in the git bash terminal).
$ git clone -b navtej https://github.com/Navtej5/PGI_Hospital.git 
## Running via code base:
- Extract the zip file and navigate inside the folder.
### Preparation
- Install latest nodejs engine according to your machine from [here](https://nodejs.org/en/)
- After extracting the file, Open terminal write the following command in the git bash/terminal: $ cd PGI_Hospital

- Write the following commands in the terminal:
    - create virtual environment (recommended).
    - $ pip install -r requirements.txt
    - $ cd frontend
    - $ npm install
    - $ npm run build (need to do it every time you make changes.)
    
### Running the service
- navigate to your root directory in terminal after opening a new terminal (root directory contains manage.py file).
- run the following command in terminal:
    - $ python manage.py makemigrations
    - $ python manage.py migrate 
    - $ python manage.py runserver
- Now a url is shown in the terminal paste it in the browser or ctrl+click on it to run the app.
- The app has now started.


