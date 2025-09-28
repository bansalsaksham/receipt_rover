Receipt Rover 🧾
================

**Instantly turn any receipt into a powerful financial and environmental report. Snap a photo or paste text to visualize your spending and its carbon footprint in seconds.**

[**Live Demo**](https://receiptrover.netlify.app/ "null")


About The Project
-----------------

**Receipt Rover** is a sleek, intelligent web application built for the **HackGT 12** hackathon. It transforms messy, unstructured receipts into clear, actionable insights. In a world where valuable financial data is often trapped in emails and images, Receipt Rover provides instant clarity with zero friction.

### Key Features:

-   **📷 OCR Image Upload:** Digitize physical receipts using the powerful Tesseract.js engine running directly in the browser.

-   **🧠 Intelligent Analysis:** A custom-built engine parses, categorizes, and summarizes spending from raw text.

-   **📊 Instant Visualization:** A clean, interactive pie chart from Chart.js displays the spending breakdown by category.

-   **🌱 Eco-Conscious Insight:** Goes beyond finance to provide an estimated carbon footprint for the entire purchase, promoting environmental awareness.

### Built With

This project was built entirely with client-side technologies, making it fast, secure, and easy to deploy.

-   [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript "null")

-   [HTML5 & CSS3](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5 "null")

-   [Tesseract.js](https://tesseract.projectnaptha.com/ "null") - Browser-based OCR Engine

-   [Chart.js](https://www.chartjs.org/ "null") - Data Visualization Library

-   [Netlify](https://www.netlify.com/ "null") - Deployment Platform

Getting Started
---------------

You can run this project locally with just a web browser.

### Prerequisites

No prerequisites needed. Just a modern web browser like Chrome, Firefox, or Safari.

### Installation

1.  Clone the repo

    ```
    git clone [https://github.com/your_username/receipt-rover.git](https://github.com/your_username/receipt-rover.git)

    ```

2.  Open `index.html` in your browser.

How It Works
------------

1.  **Input:** The user either uploads an image or pastes text into the app.

2.  **OCR (if image):** Tesseract.js scans the image locally and converts it into a text string. User privacy is maintained as no data is sent to a server.

3.  **Parsing & Cleaning:** The raw text is cleaned of OCR artifacts and parsed using Regex to identify line items and prices.

4.  **Categorization:** A custom keyword-matching engine categorizes each item into groups like "Groceries," "Dining," etc.

5.  **Calculation:** The app calculates the total spending for each category and the estimated carbon footprint based on pre-defined factors.

6.  **Display:** The results are rendered in a detailed list and a dynamic pie chart using Chart.js.
