# Codeflux Labs Template

Welcome to the **Codeflux Labs Template**! This template is designed to kickstart your Expo application development using React Native, integrating essential libraries like RealmDB, Styled Components, Formik, and React Navigation.

## Features

-   **RealmDB**: A mobile database that enables you to store data locally and perform queries easily.
-   **Styled Components**: Write CSS-in-JS to style your components, providing a modular approach to styling.
-   **Formik**: A powerful library for managing form state and validation.
-   **React Navigation**: Easy navigation between different screens in your app.
-   **Expo**: A framework for building React Native applications with a set of tools and services.

## Getting Started

### Prerequisites

-   Node.js installed on your machine.
-   Expo CLI installed globally. You can install it using the following command:

```bash
npm install -g expo-cli
```

### Clone the Template

To create a new project using this template, run the following command:

```bash
npx create-expo-app --template codeflux-labs-template
```

### Running the App

1. Navigate to your project directory:

```bash
cd your-project-name
```

2. Start the development server:

```bash
yarn start
```

3. Follow the instructions in the terminal to run the app on an emulator or your physical device.

## Project Structure

```
/your-repo-name
│
├── /src
│   ├── /assets          # Assets like images and fonts
│   ├── /components      # Reusable components
│   ├── /context         # Global context
│   ├── /hooks           # Global hooks
│   └── /realmDB         # RealmDB setup
│   ├── /screens         # Application screens
│   ├── /styles-global   # Global Styled components
│   └── /utils           # Utility functions and constants
│
├── App.tsx              # Main application file
├── app.json             # Expo configuration file
└── package.json         # NPM package file
```

## Developer Instructions

To customize and develop your application further, follow these steps:

1. **Install Dependencies**: Run the following command to install necessary dependencies:

```bash
npm install
```

2. **Modify the Code**: Start modifying the source code in the `src` directory to fit your application's needs.

3. **Use RealmDB**: For database operations, navigate to the `src/realmDB` folder where you can manage your RealmDB configurations.

4. **Styling**: Customize the styles using Styled Components found in the `src/styles` directory.

## License

This template is open-source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Feel free to submit a pull request or create an issue to discuss potential improvements.
