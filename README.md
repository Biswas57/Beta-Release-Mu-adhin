# Mu'adhin Project

## Table of Contents
1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Research and Data Collection](#research-and-data-collection)
4. [Technology Stack](#technology-stack)
5. [Design and Development](#design-and-development)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Maintenance and Updates](#maintenance-and-updates)

## Project Overview
### What is Mu'adhin?
- Mu'adhin is an Islamic calendar ICS app designed to create calendar subscriptions that inform Muslims of the correct prayer times. The app will provide accurate prayer times, Hijri calendar dates, and notifications to help users stay updated with their religious obligations with the very crucially added feature of including dates, times and locations of both UNSWMSA and ISOC events for uni students.
### Inspiration for the project
- When I came to Uni as a fresh muslim revert, one of the biggest things i struggled with was finding a community of muslims that I could hang out with. I'm gonna be honest, I still don't have a muslim group that I see extremely often but we make do I guess you know.
- Anyways it took me quite a while after converting to establish habits like praying, reading Qur'an, making wudhu, all these things. 
- A combination of the above two reasons is what inspired me to start creating Mu'adhin. I wanted to make it easier for muslims to establish habits like praying and attending events by making it easier for them to know when and where these events are happening.
    - Especially for reverts this can be very important, as not only does it make it easier for them to establish habits, but it also makes it easier for them to find a community of muslims to hang out with.
    - Keeps them away from a lot of Haram activities that they might otherwise be doing. Instead they are hanging around in a Halal environment, Alhamdulillah.

## Requirements
- **Functionalities:**
  - Display accurate prayer times.
  - Show Hijri calendar dates.
  - Event reminders and notifications.
- **Geographical Scope:**
  - National support (Australian) with accurate local prayer times.

## Research and Data Collection
- **Prayer Times Data Sources:**
  - API providers: Aladhan, Muslim Pro.
  - Initially the design will be just to inclue prayer times and then later Hijri calendar events will be added
- **Hijri Calendar Data Sources:**
  - Reliable Islamic calendar APIs.
- **Accuracy and Reliability:**
  - Ensure data from sources is accurate and consistent.
  - Verify data with multiple sources.
  - Perform usability testing with users and JUnit & possibly mockito testing.

## Technology Stack
- **Frontend:**
  - React, CSS.
- **Backend:**
  - Java, Springboot, Node.js or Python.
- **Database:**
  - PostgreSQL if needed

## Design and Development
- **UI/UX Design:**
  - Create simple UI for easy navigation.
  - Design calendar view with prayer times and Hijri dates.
  - Adjustable notification settings.
- **Development:**
  - Set up development environment.
  - Implement core functionalities:
    - Prayer times API integration.
    - Calendar view with prayer times and Hijri dates.
    - Notification functionality.
    
## Testing
- **Thorough Testing:**
    - Usability testing of users for the entire application.
    - Unit testing for backend and frontend.
    - mockito testing for backend
    - Integration testing for API and database.
    - User acceptance testing.
  
## Deployment
- **Web Deployment:**
  - Deploy using Vercel initially and then something like AWS when I need space for DB.
- **Mobile App Deployment:**
  - Further develop the app for mobile devices.
    - Deploy on Google Play Store and Apple App Store.
