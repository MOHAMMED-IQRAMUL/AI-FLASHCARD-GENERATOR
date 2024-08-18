---

# FlashLearn

FlashLearn is an AI-powered flashcard generation web application that allows users to create, store, and review flashcards. The app offers features such as secure authentication, topic-based flashcard generation, and a user-friendly interface for organizing and viewing collections. It also includes a demonstration of payment integration using Stripe.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **User Authentication**: Secure sign-up and sign-in using Clerk.
- **AI Flashcard Generator**: Generate flashcards based on a provided topic and save them to a Firebase database.
- **Collections Management**: View and manage flashcard collections, organized by unique names.
- **Flashcard Viewing**: Browse individual flashcards within selected collections.
- **Payment Integration**: Demonstration of payment processing using Stripe (for educational purposes).
- **Responsive Design**: A mobile-friendly user interface built with Material UI and Tailwind CSS.
- **Google Analytics Integration**: Track user interactions and usage metrics.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/flashlearn.git
   cd flashlearn
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```
   
## Usage

1. **Sign up or Sign in**: Create a new account or log in using your existing credentials.
2. **Generate Flashcards**: Navigate to the `/generate` page to create flashcards based on a topic.
3. **View Collections**: Access the `/flashcards` page to see your saved flashcard collections.
4. **View Flashcards**: Click on a collection to view the individual flashcards within it.
5. **Demonstrate Payment Integration**: Optionally explore the Stripe payment integration on the `/order-details` page.

## Project Structure

```
/app
    /api
        /checkout_session
            route.js
        /generate
            route.js
    /flashcard
        page.js
    /flashcards
        page.js
    /generate
        page.js
    /order-details
        page.js
    /result
        page.js
    /sign-in
        /[[..sign-in]]
            page.js
    /sign-up
        /[[..sign-up]]
            page.js
    globals.css
    layout.js
    page.js
/utils
    /get-stripe.js
/firebase.js
/middleware.ts
```

## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **Firebase**: Backend services for authentication and database management.
- **Clerk**: Authentication management for sign-up and sign-in flows.
- **Stripe**: Payment processing (demonstration purposes).
- **Material UI**: React components for faster and easier web development.
- **Tailwind CSS**: A utility-first CSS framework.
- **Google Analytics**: Track and report website traffic.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

