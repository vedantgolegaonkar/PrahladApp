# Prahlad App

This app is designed to let the users book the Upasana of Prahlad Maharaj at their place (Home). You will have to go to playstore and search for **Prahlad App**. Then download the app. After downloading, if you are a first time user you will have to register yourself withall the details asked. If you have already registered with us then type your username and password. You can start using the app and successfully book the **Upasana** from the available slots.


<!-- For Developers -->
## How to Run the Code in your Local System 

### Step 1: Install Git in your local System and make the Necessary Configurations

To install git you will have to download the git from official website. To properly install git in your local system and make the configurations [Click Here](https://chatgpt.com/share/67055d06-3ba8-8007-9e63-38c742bd87d7)

Once you have the code in your system you will have to install necessary libraries and the framework in your local system

### Step 2: Install all the Dependencies

You will only need to install node js to start creating the project. [Click Here](https://nodejs.org/en) to download the Long Term Support(LTS) version of Node.js

### Step 3: Start the project

To start the project just go into the project folder and open it in the code editor, Eg: **Visual Studio Code** (VScode). Once you are into the project folder just make sure you see the package.json. Now open the terminal in your code editor and run the following command

```bash
npm install
```

This will install all the libraries that is required to run the project. Congratulations, Now you have successfully configured your project. 

### Step 4: Install Expo App on your Mobile

Now you will have to install the expo app in your mobile device. Open the **Google Play Store** in your mobile and download the Expo Go app in your mobile. Install the Application and signup. 

### Step 5: Run the Project

Now go to you code editor and run the following command

```bash
npx expo start
```

This command will run your project. 

### Step 6: See how your UI looks

Now open the expo go application in your mobile. You will see a QR code displaying on your local machine. Scan the QR code from your expo go app. You can now see the UI on your mobile device.

### **Note that your mobile and the system should be connected to the same wifi network.**

Now that you have opened the App you will have to enter the following credentials to login as a user

```
email-id: U
password: U
```

If you are logging in as an Admin, then use the following credentials

```
email-id: A
password: A
```
If you still face any issues logging in that may be due to the credentials change. Just go to the LoginScreen.js file in the screns folder, there you will find a an object named as **userCredentials**. The object has the latest credentials. Use that credentials to login.

If you want to login with the admin account. You can find the latest credentials in the AdminLoginScreen.js file in the screens folder. There you will find a an object named as **adminCredentials**. The object has the latest credentials. Use that credentials to login.


APP_ENV=development npx expo start
APP_ENV=production npx expo start --no-dev --minify