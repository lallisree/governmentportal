# Government Issues Management Portal

A modern, responsive, and professional **Government Sector Management Landing Page & Public Grievance Portal** built with **React.js**, **Tailwind CSS**, and **Vite**.

## 🏛️ Live Demo
- **GitHub Pages**: [https://lallisree.github.io/governmentportal/](https://lallisree.github.io/governmentportal/)

---

## 🌟 Key Architecture & Features

### 1. Master System Hierarchy
The platform establishes a strict, relational 4-tier civic governance pipeline:
$$\text{Category} \longrightarrow \text{Department} \longrightarrow \text{Service} \longrightarrow \text{Public Grievance Ticket}$$

### 2. Four Integrated Management Modules
- **Category Management**: Top-level public utility sectors (Water Supply, Roads & Infrastructure, Electricity, Sanitation).
- **Department Management**: Executive authorities and municipal boards mapped directly to their parent Category.
- **Service Management**: Public complaint services mapped to Category & Department with dynamic dependent filtering.
- **Public Issues Management**: End-to-end citizen grievance tracking with ticket IDs, priority ratings (Critical, High, Medium, Low), SLA statuses (Open, In Progress, Resolved), and reporter details.

### 3. Dynamic Cascading Form Logic
- Adding a **Department** requires selecting an existing **Category**.
- Adding a **Service** dynamically filters the department selector to only show departments belonging to the selected category.
- Reporting a **Public Issue** guides the user through the complete 3-tier cascade:
  1. Select Category
  2. Select Department (filtered by Category)
  3. Select Service (filtered by Department)

### 4. Professional Government Theme
- Clean civic design (`#F8FAFC`, Navy `#0F172A`, Blue `#1E3A8A` / `#2563EB`).
- Official Government Seal / Vector Emblem with instant logo replacement support.
- Fully responsive layout for Desktop, Tablet, and Mobile with a collapsible navigation drawer.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/lallisree/governmentportal.git
cd governmentportal

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Building & Deploying
```bash
# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
