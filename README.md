# Character Counter

An app that counts the characters, words, and sentences within a text box.

Live URL: [victorbruce.github.io/character-count](https://victorbruce.github.io/character-count)

## 📌 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [🛠️ Tech Stack](#-tech-stack)
- [📦 Installing](#-installing)
- [💻 Running the Application](#-running-the-application)
- [📋 Approach](#-approach)
- [📸 Screenshots](#-screenshots)
- [🚀 Deployment](#-deployment)
- [👤 Author](#-author)

## 🚀 Getting Started

This project is built using **HTML**, **SCSS**, **JavaScript** and hosted on **GitHub Pages**.

## 🛠️ Tech Stack

- HTML
- SCSS
- JavaScript

## 📦 Installing

Clone the repository and run the command:

```sh
git clone https://github.com/victorbruce/character-count
cd character-count
```

## 💻 Running the Application

To start the development server:

- Install the **Live Server extension**(by Ritwick Dey) in VsCode
- Right-click anywhere in the html code
- Select _Open with Live Server_ from the menu to start the development server

Or

Double click the `index.html` file to open the code in the browser of your choice.

## 📸 Screenshots

## 📋 Approach

1. I started with the **toggle theme-functionality**. I made sure that when a user clicks on the light/dark theme icon button, the background of the app changes to the right theme. Once I got this working, I moved on to defining the general stylings especially the colors used for both dark and light theme modes.
2. Using a mobile-first approach, I implemented each section of the web page one by one while ensuring each section is accessible and responsive across all major devices.
3. Started writing the functionality of getting the character count when the user starts typing in the text box in real-time.
4. Next, I worked on excluding spaces from the text the user has typed to get the count of characters typed without spaces.
5. I then, worked on the limit exceeded functionality. There I added feedback such as red border color and a warning message to alert the user that they have exceeded their limit
6. Next, I implemented showing the approximate reading time base on the characters typed in the text area.
7. Next was the word and sentence count functionality. Here I displayed the count for each word typed and each sentence formed
8. Also, I worked on the empty state of the letter density by showing the right message when no character has been entered in the textarea field.
9. After, I made sure the letter density worked as expected by displaying how much a charcter has been typed in terms of percentage with the highest character first in that order.
10. Lastly, I implemented the collapse functionality for displaying more characters analyzed or less.

## 🚀 Deployment

GitHub Pages

## 👤 Author

Victor Bruce
