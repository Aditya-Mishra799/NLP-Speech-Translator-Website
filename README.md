Here's the revised README file with corrections and clickable Table of Contents:

# NLP Speech Recognition and Translation Project

**Welcome to the NLP Speech Recognition and Translation Project!** 🌍🔊

In today's globalized world, effective communication across different languages is more important than ever. Our project addresses this need by providing a seamless and intuitive solution for real-time speech translation and text-to-speech conversion. Whether you're traveling, working with international teams, or learning a new language, our application is designed to make language barriers a thing of the past.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Speech to Text Translation** 🎤➡️📝: Speak in your native language, and watch as your words are translated into text in another language in real-time.
- **Text to Speech Conversion** 📝➡️🔊: Convert written text into natural-sounding speech in both the source and target languages.
- **Manual Text Input** 🖊️: Double-click on the editor to manually enter text if you prefer typing over speaking.
- **Copy Text Functionality** 📋: Easily copy the translated text with a single click.
- **User-Friendly Interface** 🖥️: Our application features a clean and intuitive UI built with Chakra UI, ensuring a smooth user experience.

## Technologies Used

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,docker,react,js,css,html,fastapi,vscode,github,nodejs,npm,nextjs,python" />
  </a>
</p>

### Frontend

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **Chakra UI**: A simple, modular, and accessible component library that gives you the building blocks to build React applications.

### Backend

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
- **Google Translator**: Library for translating text.
- **gTTS (Google Text-to-Speech)**: A Python library and CLI tool to interface with Google Translate’s text-to-speech API.

### Containerization

- **Docker**: Containerization platform to package applications and their dependencies.

## Project Structure

```plaintext
.
├── backend
│   ├── Dockerfile
│   ├── app.py
│   ├── requirements.txt
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── public
│   ├── app
│   │   ├── api
│   │   ├── pages
|   ├── components
├── docker-compose.yml
```

## Installation

### Prerequisites

- **Docker**: Make sure Docker is installed and running on your machine.
- **Node.js**: Node 18+ is required if running the frontend manually.

### Running with Docker

1. Clone the repository:

   ```sh
   git clone https://github.com/Aditya-Mishra799/NLP-Speech-Translator-Website.git
   cd NLP-Speech-Translator-Website
   ```

2. Build and start the containers:

   ```sh
   docker-compose up --build -d
   ```

3. Access the application:

   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`

### Running Manually (skip if using Docker)

#### Backend

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Install dependencies:

   ```sh
   pip install -r requirements.txt
   ```

3. Start the backend server:

   ```sh
   uvicorn app:app --host 0.0.0.0 --port 8000
   ```

#### Frontend

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Add a `.env.local` file in the root (frontend).

3. In the `.env.local` file, add the following environment variable for the frontend to access the backend API:

   ```sh
   # Or you may add the IP at which the Python backend is running here
   NEXT_PUBLIC_TRANSLATOR_API_URL=http://localhost:8000
   ```

4. Install dependencies:

   ```sh
   npm install
   ```

5. Start the frontend server:

   ```sh
   npm run dev
   ```

6. Access the frontend:

   - Frontend: `http://localhost:3000`

## Usage

- **Speak to Translate**: Click the microphone icon to start speaking. The spoken words will be translated into text in the target language.
- **Text to Speech**: Click the speaker icon to convert text to speech in the selected language.
- **Manual Text Input**: Double-click the editor to enter text manually.
- **Copy Text**: Use the copy button to copy translated text.

## Configuration

### Environment Variables

The `docker-compose.yml` file includes environment variables for the frontend service. These variables are set to interact with the backend service running at `http://172.17.0.1:8000`.

```yaml
environment:
  - NEXT_PUBLIC_TRANSLATOR_API_URL=http://172.17.0.1:8000
```

You can modify these values based on your setup.

### CORS Configuration

The `app.py` file in the backend specifies allowed origins for CORS. By default, it includes:

```python
origins = [
    "http://localhost:3000",
    "http://172.17.0.1:3000",
]
```

Add or modify origins as needed.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Developed by [Aditya Mishra](https://github.com/Aditya-Mishra799). For any inquiries, please contact me via [adityamishra9124@gmail.com](mailto:adityamishra9124@gmail.com).

**LinkedIn:** [Aditya Mishra](https://www.linkedin.com/in/aditya-mishra-b4050a291/)

**LeetCode:** [Aditya Mishra](https://leetcode.com/aditya-mishr)

---

Thank you for using the NLP Speech Recognition and Translation Project! We hope you find it helpful and easy to use.
