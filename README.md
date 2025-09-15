<<<<<<< HEAD
# AgriVision: AI-Powered Agricultural Advisor

AgriVision is a modern, AI-driven web application designed to assist farmers with critical agricultural decisions. Built with Next.js and powered by Google's Gemini models through Genkit, this application provides a suite of tools to enhance farm productivity and sustainability.

## Features

-   **Dashboard**: A central hub providing quick access to all the main features of the application.
-   **AI Crop Recommendation**: Get intelligent suggestions for the best crops to plant. The AI considers factors like soil pH, NPK values, local weather conditions, and current market data to provide recommendations that also include a sustainability score.
-   **Image-Based Disease Detection**: Upload a photo of a crop leaf, and the AI will analyze it to detect potential diseases, providing a confidence score and treatment advice.
-   **Agricultural Q&A Chatbot**: An interactive chatbot where you can ask any farming-related question and get instant, expert-backed answers from an AI.
-   **Localized Weather Forecast**: Access real-time weather forecasts for your specific farm location to make timely decisions.
-   **Market Price Tracking**: Stay updated with AI-generated market prices for various crops to help you decide the best time to sell.
-   **User Profile Management**: A dedicated page to manage your personal and farm-related information.
-   **Customizable Settings**: Personalize your experience by switching between light and dark themes and choosing your preferred language (English or Hindi).

## Tech Stack

-   **Framework**: Next.js (App Router)
-   **UI Library**: React with ShadCN UI components
-   **Styling**: Tailwind CSS
-   **AI/Generative**: Google Genkit with Gemini Models
-   **Language**: TypeScript

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:
-   [Node.js](https://nodejs.org/) (v20 or later recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Local Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install Dependencies**
    Install all the required npm packages.
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    This project uses Google's Generative AI models. You will need a Gemini API key.

    -   Create a file named `.env` in the root of the project.
    -   Add your API key to the `.env` file:
        ```env
        GEMINI_API_KEY=your_gemini_api_key_here
        ```
    -   You can obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the Development Server**
    This command starts the Next.js application in development mode.
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

5.  **Run the Genkit AI Flows**
    For the AI features to work, you need to run the Genkit development server in a separate terminal. This allows Genkit to manage and expose the AI flows to the Next.js application.
    ```bash
    npm run genkit:watch
    ```
    This will start the Genkit server, and it will automatically restart if you make changes to the AI flow files in `src/ai/flows/`.

You can now start editing the application. The page will auto-update as you make changes to the code.
=======
# Agrivision
>>>>>>> d504ac476e4ec0c256555266fc648ac962b29c12
