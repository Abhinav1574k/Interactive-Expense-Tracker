# 💰 Interactive Expense Tracker
A responsive browser-based expense management application built using **HTML5, CSS3, and Vanilla JavaScript**.

The application allows users to add, edit, delete, categorize, filter, sort, and analyze their expenses. All expense data is persisted in the browser using **LocalStorage**, so the application works without a backend or database.

---

## 📌 Project Overview
1. The Interactive Expense Tracker is a client-side web application designed to help users manage personal expenses directly from their browser.
2. The application provides an intuitive dashboard where users can:
- Add expenses
- Edit expenses
- Delete expenses
- Categorize expenses
- Search expenses
- Filter by category
- Filter by date
- Sort transactions
- Calculate total spending
- Calculate monthly spending
- View transaction counts
- View category spending breakdown
- View spending insights
- Store data using LocalStorage
- Export expenses as CSV
- Import expense backups as JSON
- Switch between light and dark themes
3. No backend or external database is required.


## ✨ Features
### Expense Management
1. Add Expense
Users can enter:
- Expense title
- Amount
- Category
- Date
The application validates the input before saving the expense.

2. Edit Expense
Existing expenses can be edited without refreshing the page.

3. Delete Expense
Users can delete individual expenses after a confirmation prompt.


### 🔎 Search and Filtering
The application supports:
1. Search
Search expenses by:
- Expense title
- Category

2. Category Filtering
Available categories include:
- Food
- Transport
- Shopping
- Bills
- Entertainment
- Health
- Education
- Other

3. Date Filtering
Users can filter expenses by:
- Today
- Last 7 days
- This month
- All dates


### ↕️ Sorting
Expenses can be sorted using:
- Newest first
- Oldest first
- Highest amount
- Lowest amount


### 📊 Expense Dashboard
The dashboard dynamically displays:
1. Total Spent
Total value of all recorded expenses.

2. This Month
Total expenses belonging to the current month.

3. Transactions
Total number of recorded expenses.


### 📈 Spending Analytics
The application provides a category spending breakdown.
1. Each category displays:
- Category name
- Total amount
- Relative spending bar

2. The application also calculates:
- Average expense
- Number of categories used
- Largest expense
- Name of the largest expense


### 💾 LocalStorage Persistence
1. Expense data is stored in the browser using:
localStorage

2. Storage key:
interactive-expense-tracker-expenses

3. This means expenses remain available after refreshing or reopening the browser.
4. The selected theme is also persisted using LocalStorage.


### 📤 Data Export
1. Expenses can be exported as a CSV file.
2. Example:
- Title,Amount,Category,Date
- Groceries,850.00,Food,2026-10-04
- Uber,300.00,Transport,2026-10-03
3. The exported file can be opened using spreadsheet applications such as Microsoft Excel or Google Sheets.


### 📥 Data Import
- The application supports importing JSON expense backups.
- This allows users to restore previously exported application data.
- Imported data is validated before being added to the application.


### 🌙 Dark Mode
- The application includes a light/dark theme switcher.
- The selected theme is stored in LocalStorage, allowing the preference to persist across browser sessions.


### 📱 Responsive Design
The interface is designed to work across:
- Desktop
- Laptop
- Tablet
- Mobile devices
The layout automatically adapts to smaller screen sizes.


## 🛠️ Technologies Used
1. HTML5
Used for:
- Page structure
- Forms
- Semantic sections
- Accessibility attributes
- Input controls

2. CSS3
Used for:
- Responsive layouts
- Grid and Flexbox
- Cards
- Buttons
- Forms
- Dark mode
- Animations and transitions
- Mobile responsiveness

3. JavaScript
Vanilla JavaScript is used for:
- DOM manipulation
- Event handling
- Form validation
- Expense CRUD operations
- Searching
- Filtering
- Sorting
- Calculations
- LocalStorage
- CSV generation
- JSON import
- Theme management
- Dynamic UI updates

4. Browser LocalStorage
Used for persistent client-side storage.

5. Git & GitHub
Used for:
- Version control
- Source code management
- Project hosting


## 🧱 Project Structure
interactive-expense-tracker/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore


## 🔄 Application Architecture
The application follows a simple client-side architecture:
                User
                  │
                  ▼
          ┌───────────────┐
          │   HTML Form   │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │  JavaScript   │
          │ Application   │
          └───────┬───────┘
                  │
          ┌───────┴────────┐
          │                │
          ▼                ▼
     DOM Updates      LocalStorage
          │                │
          └───────┬────────┘
                  │
                  ▼
             User Interface


## 🧠 JavaScript Concepts Used
The project demonstrates practical JavaScript concepts including:
- Variables
- Functions
- Objects
- Arrays
- Array filter()
- Array map()
- Array reduce()
- Array sort()
- Event listeners
- Event delegation
- DOM manipulation
- Template literals
- Destructuring
- Spread syntax
- JSON parsing
- JSON stringification
- LocalStorage
- Browser APIs
- Form validation
- Date handling
- Intl.NumberFormat
- Intl.DateTimeFormat


## 🗃️ Expense Data Structure
1. Each expense is stored as a JavaScript object.
Example:
{
  id: "unique-id",
  title: "Groceries",
  amount: 850,
  category: "Food",
  date: "2026-10-04",
  createdAt: "2026-10-04T12:00:00.000Z"
}

2. Multiple expenses are stored inside an array:
[
  {
    id: "expense-1",
    title: "Groceries",
    amount: 850,
    category: "Food",
    date: "2026-10-04"
  },
  {
    id: "expense-2",
    title: "Uber",
    amount: 300,
    category: "Transport",
    date: "2026-10-03"
  }
]

3. The array is serialized and stored in LocalStorage.


## 🧮 Expense Calculation
1. Total expenses are calculated using JavaScript's reduce() method.
2. Conceptually:
const total = expenses.reduce(
  (sum, expense) =>
    sum + expense.amount,
  0
);

3. Monthly spending is calculated by filtering expenses belonging to the current month and then reducing their amounts.


## 🔍 Filtering
1. Filtering is implemented using JavaScript's filter() method.
2. The application combines:
- Search filtering
- Category filtering
- Date filtering
3. before rendering the final transaction list.


## 🎨 User Interface
The interface includes:
- Dashboard summary cards
- Expense form
- Transaction list
- Search controls
- Category filter
- Date filter
- Sorting controls
- Category analytics
- Spending overview
- Import/export controls
- Theme switcher
- Empty states
- Responsive layouts


## 🧪 Testing Checklist
1. Expense Management
- [x] Add expense
- [x] Edit expense
- [x] Delete expense
- [x] Form validation
- [x] Empty state

2. Filtering
- [x] Search
- [x] Category filter
- [x] Today filter
- [x] Last 7 days filter
- [x] Current month filter

3. Sorting
- [x] Newest first
- [x] Oldest first
- [x] Highest amount
- [x] Lowest amount

4. Calculations
- [x] Total expense
- [x] Monthly expense
- [x] Transaction count
- [x] Average expense
- [x] Largest expense
- [x] Category totals

5. Storage
- [x] LocalStorage save
- [x] LocalStorage load
- [x] Data persistence after refresh
- [x] Theme persistence

6. Data Management
- [x] CSV export
- [x] JSON backup import
- [x] Clear all expenses

7. UI
- [x] Responsive design
- [x] Mobile layout
- [x] Dark mode
- [x] Empty state
- [x] Keyboard focus states


## ▶️ How to Run
1. No backend installation is required.

2. Clone the repository:
git clone https://github.com/Abhinav1574k/interactive-expense-tracker.git

3. Enter the directory:
cd interactive-expense-tracker

4. Then open:
index.html

5. Alternatively, use the VS Code Live Server extension.


## 🎯 Internship Objectives Covered
The project satisfies the following internship requirements:
- Expense entry form
- Expense listing
- Edit functionality
- Delete functionality
- Category filtering
- Date filtering
- Total expense calculation
- LocalStorage persistence
- Responsive UI
- JavaScript DOM manipulation
- Event handling
- Arrays and objects
- Filtering
- Sorting
- Form validation
- Dynamic UI updates
- Git
- GitHub
- README documentation


## 📚 Learning Outcomes
Through this project, I gained practical experience in:
- Vanilla JavaScript development
- DOM manipulation
- Browser event handling
- Form processing
- LocalStorage
- Array methods
- Client-side data management
- Responsive CSS
- UI state management
- Data filtering and sorting
- File generation
- JSON processing
- Git version control
- GitHub project management
The project helped strengthen my understanding of how JavaScript can be used to build a complete interactive web application without requiring a frontend framework or backend.


## 🚀 Future Improvements
Possible future enhancements include:
- Expense charts using a charting library
- Recurring expenses
- Budget limits
- Monthly budget tracking
- Expense reminders
- Multiple currency support
- User accounts
- Cloud synchronization
- Backend API
- Database persistence
- Authentication
- Advanced financial reports


## 👨‍💻 Developer
Abhinav Upadhyay
Full Stack Developer
GitHub:
https://github.com/Abhinav1574k
LinkedIn:
https://www.linkedin.com/in/abhinav-upadhyay-019b7029a


### 🏢 Internship Project
Developed as part of my Web Development Internship at:
Veda Technology

## ⭐ Acknowledgement
I would like to thank Veda Technology for providing the opportunity to work on practical web development projects and gain hands-on experience with modern development practices.