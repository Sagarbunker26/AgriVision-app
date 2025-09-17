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
-   [Git](https://git-scm.com/) for version control.

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
    This command starts the Next.js application in development mode. Open a terminal window and run:
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

5.  **Run the Genkit AI Flows**
    For the AI features to work, you need to run the Genkit development server in a separate terminal. This allows Genkit to manage and expose the AI flows to the Next.js application.
    
    Open a **new terminal window** and run:
    ```bash
    npm run genkit:watch
    ```
    This will start the Genkit server, and it will automatically restart if you make changes to the AI flow files in `src/ai/flows/`.

You can now start editing the application. The page will auto-update as you make changes to the code.

## Uploading to GitHub

To upload your project to your own GitHub repository, follow these steps:

1.  **Initialize a Git Repository**
    If you haven't already, initialize a Git repository in your project's root directory.
    ```bash
    git init -b main
    ```

2.  **Add Files to Staging**
    Add all the files in your project to the staging area to be committed. The `.gitignore` file will ensure that unnecessary files (like `node_modules`) are excluded.
    ```bash
    git add .
    ```

3.  **Commit Your Files**
    Commit the staged files with a message describing the commit.
    ```bash
    git commit -m "Initial commit"
    ```

4.  **Create a New Repository on GitHub**
    -   Go to [GitHub](https://github.com/) and log in.
    -   Click the **+** icon in the top-right corner and select **"New repository"**.
    -   Give your repository a name (e.g., `agrivision-app`).
    -   Choose whether you want the repository to be public or private.
    -   **Do not** initialize the repository with a `README`, `.gitignore`, or license, as your project already has these.
    -   Click **"Create repository"**.

5.  **Link Your Local Repository to GitHub**
    On the new repository page, GitHub will provide you with a URL. Copy it and use the following commands to link your local project to the remote repository. Replace `<repository-url>` with the URL you copied.
    ```bash
    git remote add origin <repository-url>
    ```

6.  **Push Your Code**
    Push your committed code from your local `main` branch to the `origin` remote on GitHub.
    ```bash
    git push -u origin main
    ```

Your project is now successfully uploaded to your GitHub repository!
