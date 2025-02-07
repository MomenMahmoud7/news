# Build

### Install libraries `npx expo install`

<br />

---

# Run

### Expo Go

- Start bundler `yarn start`
- Then
  - Scan QR Code by mobile device with ExpoGo app installed
  - Press `a` to open Android
  - Press `i` to open iOS

### Development Build

- IOS run `yarn ios` for production build add `--configuration Releas`
- Android run `yarn android` for production build add `--variant release`

<br />

---

# Test

### Run Tests `yarn test`

<br />

---

# Linking Schema

### Settings

- Development | [exp://192.168.1.6:8081/--/settings](exp://192.168.1.6:8081/--/settings)
- Production | [news:///settings](exp://192.168.1.6:8081/--/settings)

### News

- Development | [exp://192.168.1.6:8081/--/articles](exp://192.168.1.6:8081/--/articles)
- Production | [news:///articles](exp://192.168.1.6:8081/--/articles)

### Article

- Development | [exp://192.168.1.6:8081/--/articles/:articleTitle](exp://192.168.1.6:8081/--/articles/:articleTitle)
- Production | [news:///articles/:articleTitle](exp://192.168.1.6:8081/--/articles/:articleTitle)

<br />
<br />

---
---

<br />
<br />

---

# Task Description

Develop a Newsfeed mobile application using **React Native** and **Typescript**.
The application should fetch data from a public source and display the news articles. Use <https://newsapi.org/> or another public source.

Main functionalities:

- Have a main screen that shows a list of News article headings and pictures.
- Clicking on a heading should open a detailed screen with the whole news text, bigger picture, and meta data like author, creation date etc.
- On top of the main screen, there should be a Search field that will dynamically filter the news by the typed word.
- The main screen should have a Pull to refresh the news on the screen.
- Write type definitions for the News DTOs. Clean your app of `any` types.

<br />

# Requirements

While implementing your solution **please take care of the following requirements**:

### Functional requirements

- Internationalization:
  - Add Multiple language support: English and 1 more of your choice.
  - Introduce a bottom tab menu with 2 Menu items: "News" and "Settings".
  - Have a language switcher in the Settings.
- Dark mode:
  - Add dark mode support for the application with different colors for dark background and light text.
  - Have a mode switcher in the Settings that changes the styles without a full restart.
- Add support for deep linking. Opening a deep link to the application with a specific news article should directly open the application focused on that article.

### Non-functional requirements

- The project must be buildable via React Native CLI or Expo and runnable locally;
- The project must have Unit tests;
- The project must have a README file with build/run/test instructions;
- Follow the principals of [Conventional Commit Messages](https://www.conventionalcommits.org) and [Atomic Change Commits](https://dev.to/samuelfaure/how-atomic-git-commits-dramatically-increased-my-productivity-and-will-increase-yours-too-4a84).
