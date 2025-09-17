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
-   [Git](https://git-scm.com/)

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

## Pushing to a New GitHub Repository

Follow these steps to upload your project to a new repository on your GitHub account.

### 1. Create a New Repository on GitHub
- Go to [GitHub](https://github.com/) and log in.
- Click the **+** icon in the top-right corner and select **"New repository"**.
- Give your repository a name (e.g., `agrivision-app`).
- Choose whether to make it public or private.
- **Do not** initialize it with a README, .gitignore, or license file, as your project already has these.
- Click **"Create repository"**.

### 2. Initialize Git in Your Project
Open a terminal in your project's root directory and run the following command to initialize a local Git repository:
```bash
git init -b main
```

### 3. Add and Commit Your Code
Stage all your files for the first commit and then commit them:
```bash
git add .
git commit -m "Initial commit"
```

### 4. Connect to Your GitHub Repository
Copy the repository URL from the GitHub page you created in step 1. It should look something like `https_//github.com/YourUsername/YourRepositoryName.git`.

Now, link your local repository to the one on GitHub by running:
```bash
git remote add origin YOUR_REPOSITORY_URL_HERE
```
*Replace `YOUR_REPOSITORY_URL_HERE` with your actual repository URL.*

### 5. Push Your Code to GitHub
Finally, push your committed files to the repository on GitHub:
```bash
git push -u origin main
```
You may be asked to enter your GitHub username and password (or a personal access token). After this, your code will be on GitHub.

### Troubleshooting

**Error: `remote origin already exists.`**

This error means you already have a remote repository configured, but it might be pointing to the wrong URL. To fix this, update the URL of the existing remote instead of trying to add a new one.

Run the following command, making sure to use your correct repository URL:
```bash
git remote set-url origin YOUR_REPOSITORY_URL_HERE
```
After updating the URL, you can try pushing your code again with `git push -u origin main`.

**Error: `Repository not found.`**

This usually means there is a typo in the repository URL you provided. Double-check the URL from your GitHub repository page. You can see your current remote URL by running `git remote -v`. If it's incorrect, use the `git remote set-url` command mentioned above to fix it.
