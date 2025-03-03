---

# Personal Portfolio

A portfolio website designed with performance and scalability in mind. It utilizes modern web technologies to ensure responsiveness, speed, and a smooth user experience. The website serves as both a portfolio and a learning ground for implementing and experimenting with various web development practices.
![Main Page](./public/main.png)

## Features
- **Responsive Design:** Works seamlessly across devices.
- **Optimized Performance:** Efficient use of resources through Next.js' optimization features.
- **Dockerized Setup:** Allows easy deployment through Docker containers.
- **Hosted on Azure VM:** Scalable and flexible hosting solution.
- **Continuous Integration/Deployment (CI/CD):** Automated pipeline for deployment and updates.

## Technologies Used
- **Frontend:** Next.js, React, TailwindCSS, HTML5, CSS3, JavaScript (ES6+)
- **Containerization:** Docker
- **Hosting:** Microsoft Azure VM, Nginx
- **CI/CD:** GitHub Actions (for automated testing and deployment)
- **Monitoring:** Azure Insights (for performance monitoring and error tracking)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wildanazz/personal-portfolio.git
   ```

2. **Navigate to the directory**:
   ```bash
   cd personal-portfolio
   ```

3. **Install dependencies**:
   ```bash
   yarn install
   ```

4. **Run the development server**:
   ```bash
   yarn dev
   ```

   By default, the application runs on `http://localhost:3000`.

## Configuration

- **Environment Variables**:
  The app uses various environment variables for configuration, particularly for connecting to external APIs and services (e.g., analytics, Azure settings). An `.env.local` file should be created in the root directory containing keys such as:
  
   ```bash
   AZURE_APP_SERVICE=<azure-settings>
   DEV_API_KEY=<api-key>
   ```

- **Docker Configuration**:
  A `Dockerfile` is included for building Docker images, and a `docker-compose.yml` for managing local environments. To build the Docker image:
   ```bash
   docker build -t personal-portfolio .
   ```

## Deployment

To deploy the project to Azure, Docker images are pushed to an Azure Container Registry, and an Azure VM is configured to pull and run these containers using Nginx as the reverse proxy. Continuous integration and delivery are managed using GitHub Actions, which automate deployment on each push to the main branch.

---
