# 📊 ChartX

> A lightweight and interactive data visualization tool for creating beautiful charts directly from custom data.

ChartX is a simple browser-based data visualization application built with **HTML, CSS, JavaScript, and Chart.js**. It allows users to enter or import data, choose a chart type, and instantly transform their data into an interactive visualization.

**No backend. No database. No complicated setup.**

Just enter your data, generate your chart, and visualize it.

---

## ✨ Features

### 📊 Multiple Chart Types

Create different types of visualizations using the same dataset:

* 📊 Bar Chart
* 📈 Line Chart
* 🥧 Pie Chart
* 🍩 Doughnut Chart
* 🔵 Scatter Chart

### 📝 Custom Data Input

* Add unlimited data rows
* Edit labels directly in the table
* Enter numeric values
* Remove individual rows
* Validate data before generating charts

### 📂 CSV Import

Import chart data directly from a CSV file.

Example:

```csv
Label,Value
January,120
February,180
March,150
April,220
May,190
June,260
```

ChartX automatically processes the CSV data and generates the visualization.

### 🎨 Chart Customization

Customize your visualization with options such as:

* Chart title
* Chart type
* Chart color
* Legend visibility
* Grid visibility
* Y-axis starting point

### ⚡ Instant Visualization

Generate interactive charts instantly without page reloads.

### 💾 PNG Export

Download your generated chart as a PNG image for:

* Reports
* Presentations
* Assignments
* Documentation
* Data analysis

### 🔄 Reset

Reset the application and restore the default dataset with one click.

### ⌨️ Keyboard Shortcuts

| Shortcut       | Action         |
| -------------- | -------------- |
| `Ctrl + Enter` | Generate Chart |
| `Esc`          | Clear Chart    |

---

## 🖥️ Preview

### Dashboard

![ChartX Dashboard](screenshots/dashboard.png)

### Generated Chart

![ChartX Chart Preview](screenshots/chart-preview.png)



---

## 🛠️ Tech Stack

| Technology         | Purpose                           |
| ------------------ | --------------------------------- |
| HTML5              | Application structure             |
| CSS3               | Styling and responsive layout     |
| JavaScript         | Application logic and interaction |
| Chart.js           | Interactive chart rendering       |
| FileReader API     | CSV file importing                |
| Browser Canvas API | Chart rendering and PNG export    |

---

## 📁 Project Structure

```text
ChartX/
│
├── index.html
├── README.md
├── LICENSE
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    ├── chart.js
    └── data.js

```

---

## 🧩 Application Architecture

ChartX follows a lightweight modular JavaScript architecture.

```text
                    ┌───────────────────┐
                    │    index.html     │
                    │   User Interface  │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │      app.js       │
                    │ Application       │
                    │ Controller        │
                    └───────┬─────┬──────┘
                            │     │
                ┌───────────┘     └───────────┐
                ▼                             ▼
        ┌───────────────────┐       ┌───────────────────┐
        │      data.js      │       │      chart.js     │
        │  Data Management  │       │  Chart Rendering  │
        └─────────┬─────────┘       └─────────┬─────────┘
                  │                           │
                  └─────────────┬─────────────┘
                                ▼
                       ┌─────────────────┐
                       │    Chart.js     │
                       │  Visualization  │
                       └─────────────────┘
```

---

## 📦 JavaScript Modules

### `app.js`

The main application controller.

Responsible for:

* UI initialization
* Data table rendering
* User interactions
* Adding and removing rows
* Generate button handling
* CSV import
* Reset functionality
* Chart download functionality
* Keyboard shortcuts

### `data.js`

The data management module.

Responsible for:

* Default data
* Data storage
* Data retrieval
* Data validation
* Data normalization
* Adding data points
* Updating data points
* Removing data points

### `chart.js`

The chart rendering engine.

Responsible for:

* Creating charts
* Destroying existing charts
* Updating charts
* Chart configuration
* Chart customization
* Scatter chart handling
* PNG export
* Empty chart state

---

## 📊 Supported Data Format

ChartX uses a simple two-column data structure:

| Label    | Value |
| -------- | ----: |
| January  |   120 |
| February |   180 |
| March    |   150 |
| April    |   220 |
| May      |   190 |
| June     |   260 |

The **Label** represents the category or identifier, while **Value** represents the numeric data used for visualization.

---

## 📂 CSV Format

ChartX accepts CSV files with a header row.

### Example

```csv
Label,Value
January,120
February,180
March,150
April,220
May,190
June,260
```

### CSV Requirements

* File must use the `.csv` extension.
* The first row should contain column headers.
* The first column should contain labels.
* The second column should contain numeric values.
* Empty or invalid rows are ignored.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pokhrelsamir/ChartX.git
```

### 2. Navigate to the Project

```bash
cd ChartX
```

### 3. Open the Application

You can simply open:

```text
index.html
```

in your browser.

For the best development experience, use **Visual Studio Code with Live Server**.

---

## 🌐 Running with Live Server

If you use Visual Studio Code:

1. Open the `ChartX` folder.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. The application will open in your browser.

---

## 🎯 How to Use

### Step 1 — Enter Data

Enter labels and numeric values in the data table.

Example:

```text
January     120
February    180
March       150
April       220
```

### Step 2 — Add More Data

Click:

```text
+ Add Data
```

to create additional rows.

### Step 3 — Choose Chart Type

Select one of the available chart types:

* Bar Chart
* Line Chart
* Pie Chart
* Doughnut Chart
* Scatter Chart

### Step 4 — Add a Title

Enter a meaningful title such as:

```text
Monthly Sales
```

### Step 5 — Generate

Click:

```text
📊 Generate Chart
```

ChartX will instantly render the visualization.

### Step 6 — Export

Click:

```text
↓ Download PNG
```

to save the generated chart as an image.

---

## 🧪 Example Dataset

The default ChartX dataset is:

| Month    | Sales |
| -------- | ----: |
| January  |   120 |
| February |   180 |
| March    |   150 |
| April    |   220 |
| May      |   190 |
| June     |   260 |

This dataset can be used to test all supported chart types.

---

## 📱 Responsive Design

ChartX is designed to work across different screen sizes.

Supported layouts include:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

The workspace automatically changes from a two-column layout to a single-column layout on smaller screens.

---

## 🔐 Privacy

ChartX processes user-entered data directly in the browser.

* No backend server is required.
* No database is required.
* CSV files are processed locally using the browser's `FileReader` API.
* User datasets do not need to be uploaded to a remote server.

ChartX is designed to keep data processing client-side.

---

## ⚡ Performance

ChartX is intentionally lightweight.

The application uses:

* Vanilla JavaScript
* Native browser APIs
* CSS
* Chart.js

There is no frontend framework or backend dependency.

---

## 🔮 Future Improvements

Possible future versions may include:

* Multiple datasets
* Area charts
* Radar charts
* Polar area charts
* Custom color palettes
* Chart background customization
* CSV export
* JSON import/export
* LocalStorage history
* Saved charts
* Chart editing
* Dark mode
* Advanced axis configuration
* Data statistics
* Shareable chart links
* PDF export

---

## 🤝 Contributing

Contributions are welcome and appreciated.

### Fork the Repository

Fork the ChartX repository on GitHub.

### Create a Feature Branch

```bash
git checkout -b feature/your-feature
```

### Commit Your Changes

```bash
git commit -m "Add your feature"
```

### Push the Branch

```bash
git push origin feature/your-feature
```

Then open a **Pull Request** describing your changes.

---

## 🐛 Bug Reports

If you discover a bug, please create an issue with:

* Description of the problem
* Steps to reproduce it
* Expected behavior
* Actual behavior
* Browser and version
* Screenshot, if applicable

Clear and detailed bug reports help improve ChartX.

---

## 💡 Use Cases

ChartX can be used for:

* 📚 Academic assignments
* 📊 Data visualization
* 📈 Business reports
* 💼 Portfolio projects
* 🧪 Data analysis demonstrations
* 📝 Presentations
* 🎓 Learning Chart.js
* 🧑‍💻 JavaScript practice

---

## 📚 Learning Objectives

This project demonstrates practical concepts including:

* DOM manipulation
* JavaScript modules
* Event handling
* Form handling
* Data validation
* Array manipulation
* File handling
* CSV parsing
* Canvas rendering
* Chart.js integration
* Responsive web design
* Client-side data processing

---

## 📜 License

ChartX is released under the **MIT License**.

See the [`LICENSE`](LICENSE) file for complete license terms.

---

# 👨‍💻 Author

<div align="center">

### Samir Pokhrel

**B.Sc. CSIT Student | Web Developer | Networking Enthusiast**

Built using **HTML, CSS, and JavaScript**

<br>

<a href="https://github.com/pokhrelsamir">
  <img src="https://img.shields.io/badge/GitHub-pokhrelsamir-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>
<a href="https://www.linkedin.com/in/samirpokhrel/">
  <img src="https://img.shields.io/badge/LinkedIn-Samir%20Pokhrel-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>

</div>

---

## ⭐ Support

If you find ChartX useful or interesting:

* ⭐ Star the repository
* 🍴 Fork the project
* 🐛 Report bugs
* 💡 Suggest improvements
* 🤝 Contribute to the project

Your support and feedback are greatly appreciated.

---

<div align="center">

# 📊 ChartX

**Turn data into visual insights.**

Built using **HTML, CSS, JavaScript & Chart.js**

⭐ **Star the repository if you like the project!**

</div>
