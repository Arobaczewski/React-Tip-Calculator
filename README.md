# 🧮 Ayr Dispensary Tip Calculator

A modern, responsive React application designed specifically for cannabis dispensary employees to calculate and track tip distributions between Front of House and Back of House staff.

![Tip Calculator Demo](https://img.shields.io/badge/React-18.0+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Mobile Responsive](https://img.shields.io/badge/mobile-responsive-brightgreen.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Business Logic](#-business-logic)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Contact](#-contact)

## ✨ Features

### 🧮 **Calculator Interface**
- Beautiful, responsive number pad with tactile button feedback
- Decimal point validation (prevents multiple decimals)
- Backspace and clear functionality
- Large, readable display
- Keyboard support for enhanced productivity

### 🏪 **Front of House Calculator**
- Employee count input (full-time and part-time)
- Automatic hour calculation (8 hours for full-time, 5.5 for part-time)
- Back of House inclusion toggle
- Individual hours worked tracking
- Real-time tip distribution calculation

### 🍳 **Back of House Calculator**
- Dedicated 15% tip allocation when included
- Employee count and hours tracking
- Proportional distribution based on hours worked
- Independent tip management

### 💾 **Data Management**
- Persistent tip history using localStorage
- Individual tip deletion with trash icon
- Bulk deletion option
- Real-time running totals
- Cross-session data retention

### 📱 **User Experience**
- Fully responsive design (mobile, tablet, desktop)
- Touch-friendly button sizes (44px minimum)
- Smooth animations and hover effects
- Error validation with user-friendly messages
- Accessibility considerations

### ⌨️ **Keyboard Shortcuts**
- Number keys (0-9) for input
- Decimal point key
- Backspace for deletion
- Escape/Delete for clearing
- Enter for tip collection (Front of House)



## 🛠 Technology Stack

- **Frontend Framework:** React 18+ with Hooks
- **Styling:** Pure CSS with CSS Grid & Flexbox
- **Icons:** Lucide React
- **Build Tool:** Vite
- **State Management:** React useState & useEffect
- **Data Persistence:** Browser localStorage
- **Responsive Design:** CSS Media Queries

## 📦 Installation

### Prerequisites
- Node.js (version 16.0 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tip-calculator.git
   cd tip-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🎯 Usage

### Basic Workflow

1. **Enter Tip Amount**: Use the calculator or keyboard to input the total tip amount
2. **Configure Front of House**:
   - Select whether Back of House is included
   - Enter number of full-time employees (8 hours each)
   - Enter number of part-time employees (5.5 hours each)
   - Enter your individual hours worked
   - Click "Collect Tips"
3. **Configure Back of House** (if applicable):
   - Enter total number of Back of House employees
   - Enter your individual hours worked
   - Click "Collect Tips"
4. **View Results**: See individual tip amounts and running totals
5. **Manage Tips**: Delete individual entries or clear all tips

### Example Scenarios

#### Scenario 1: Front of House Only
- Total tips: $100
- 2 full-time employees (16 total hours)
- You worked 8 hours
- **Your share**: $50.00

#### Scenario 2: Front + Back of House
- Total tips: $100
- Front of House: 2 full-time employees (16 hours)
- Back of House: 3 employees (24 hours)
- You're Front of House, worked 8 hours
- **Front of House gets**: $85 (85% of total)
- **Your share**: $42.50

#### Scenario 3: Back of House Only
- Total tips: $100
- 4 Back of House employees (32 total hours)
- You worked 8 hours
- **Back of House gets**: $15 (15% of total)
- **Your share**: $3.75

## 📁 Project Structure

```
tip-calculator/
├── public/
│   └── index.html
├── src/
│   ├── Components/
│   │   ├── Frontofhouse.jsx      # Front of House calculator
│   │   ├── Frontofhouse.css      # Front of House styles
│   │   ├── Backofhouse.jsx       # Back of House calculator
│   │   └── Backofhouse.css       # Back of House styles
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # Calculator and layout styles
│   ├── index.css                 # Global styles
│   └── main.jsx                  # React entry point
├── package.json
└── README.md
```

## 📊 Business Logic

### Tip Distribution Formula

#### Front of House (with Back of House included):
```
Individual Tip = (Total Tips × 0.85) ÷ Total Team Hours × Individual Hours
```

#### Front of House (without Back of House):
```
Individual Tip = Total Tips ÷ Total Team Hours × Individual Hours
```

#### Back of House:
```
Individual Tip = (Total Tips × 0.15) ÷ Total Team Hours × Individual Hours
```

### Hour Calculations
- **Full-time employees**: Count × 8 hours
- **Part-time employees**: Count × 5.5 hours
- **Total team hours**: Full-time hours + Part-time hours

### Validation Rules
- Tip amount must be positive number
- Employee counts must be valid integers
- Individual hours must be positive
- At least one employee type must have hours
- Back of House inclusion must be selected

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Enter numbers |
| `.` | Add decimal point |
| `Backspace` | Delete last character |
| `Escape` / `Delete` | Clear display |
| `Enter` | Collect Front of House tips |

**Note**: Keyboard shortcuts are disabled when form inputs are focused to prevent interference.

## 📞 Contact

**Developer**: [Your Name]
- GitHub: [@Arobaczewski](https://github.com/Arobaczewski)
- LinkedIn: [Alexander Robaczewski](https://linkedin.com/in/alexander-robaczewski)
- Email: alexander.robaczewski@gmail.com

---

⭐ **Star this repo if you found it helpful!** ⭐

*Built with ❤️ for the cannabis industry*