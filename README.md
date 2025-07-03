# Expo To Do List App

This app uses React Native on the Expo platform to create a native to-do list app for mobile devices (and web). It's styled with Tailwind through the twrnc package.

## Features and Technologies

The app has many themes that can be toggled in the "Themes" tab. This was accomplished through a combination of the React Context API to allow a React state for the theme color etc. to be globally toggled and reusable components that minimized the number of places the state needed to be used. 

The app was otherwise styled(margins, containers, backgrounds, etc.) through Tailwind CSS (twrnc package) and a constant Colors file. 

A FlexList was used to display the task items and allow for unlimited tasks without significant performance issues. Pressables were used as buttons as they support many mobile touch possibilities and the bottom bar navigator was implemented for ease of use. 

The React Native AsyncStorage package was used to store the to-do list data (I'm also interested in adding the ability to store user-created themes!).

## Video

(Link)[https://youtu.be/s9m4GlzEZbU]


