"use strict";

const STORAGE_KEY =
  "interactive-expense-tracker-expenses";

const THEME_KEY =
  "interactive-expense-tracker-theme";

let expenses = loadExpenses();

let editingExpenseId = null;

/* -----------------------------
   DOM
----------------------------- */

const expenseForm =
  document.getElementById(
    "expenseForm"
  );

const expenseTitle =
  document.getElementById(
    "expenseTitle"
  );

const expenseAmount =
  document.getElementById(
    "expenseAmount"
  );

const expenseCategory =
  document.getElementById(
    "expenseCategory"
  );

const expenseDate =
  document.getElementById(
    "expenseDate"
  );

const submitButton =
  document.getElementById(
    "submitButton"
  );

const cancelEditButton =
  document.getElementById(
    "cancelEditButton"
  );

const formMessage =
  document.getElementById(
    "formMessage"
  );

const expenseList =
  document.getElementById(
    "expenseList"
  );

const emptyState =
  document.getElementById(
    "emptyState"
  );

const emptyAddButton =
  document.getElementById(
    "emptyAddButton"
  );

const totalExpense =
  document.getElementById(
    "totalExpense"
  );

const monthlyExpense =
  document.getElementById(
    "monthlyExpense"
  );

const transactionCount =
  document.getElementById(
    "transactionCount"
  );

const visibleTransactionCount =
  document.getElementById(
    "visibleTransactionCount"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const filterCategory =
  document.getElementById(
    "filterCategory"
  );

const filterDate =
  document.getElementById(
    "filterDate"
  );

const sortExpenses =
  document.getElementById(
    "sortExpenses"
  );

const scrollToFormButton =
  document.getElementById(
    "scrollToFormButton"
  );

const themeToggle =
  document.getElementById(
    "themeToggle"
  );

const themeIcon =
  document.getElementById(
    "themeIcon"
  );

const categoryBreakdown =
  document.getElementById(
    "categoryBreakdown"
  );

const overviewContent =
  document.getElementById(
    "overviewContent"
  );

const exportCsvButton =
  document.getElementById(
    "exportCsvButton"
  );

const importJsonButton =
  document.getElementById(
    "importJsonButton"
  );

const importFileInput =
  document.getElementById(
    "importFileInput"
  );

const clearAllButton =
  document.getElementById(
    "clearAllButton"
  );

const currentYear =
  document.getElementById(
    "currentYear"
  );

/* -----------------------------
   Initialization
----------------------------- */

initializeTheme();

setDefaultDate();

currentYear.textContent =
  new Date().getFullYear();

renderApplication();

/* -----------------------------
   Events
----------------------------- */

expenseForm.addEventListener(
  "submit",
  handleFormSubmit
);

searchInput.addEventListener(
  "input",
  renderApplication
);

filterCategory.addEventListener(
  "change",
  renderApplication
);

filterDate.addEventListener(
  "change",
  renderApplication
);

sortExpenses.addEventListener(
  "change",
  renderApplication
);

cancelEditButton.addEventListener(
  "click",
  resetForm
);

scrollToFormButton.addEventListener(
  "click",
  scrollToForm
);

emptyAddButton.addEventListener(
  "click",
  scrollToForm
);

themeToggle.addEventListener(
  "click",
  toggleTheme
);

exportCsvButton.addEventListener(
  "click",
  exportCSV
);

importJsonButton.addEventListener(
  "click",
  () => {
    importFileInput.click();
  }
);

importFileInput.addEventListener(
  "change",
  handleImport
);

clearAllButton.addEventListener(
  "click",
  clearAllExpenses
);

expenseList.addEventListener(
  "click",
  handleExpenseListClick
);

/* -----------------------------
   Form
----------------------------- */

function handleFormSubmit(event) {
  event.preventDefault();

  const title =
    expenseTitle.value.trim();

  const amount =
    Number(expenseAmount.value);

  const category =
    expenseCategory.value;

  const date =
    expenseDate.value;

  const validationError =
    validateExpense({
      title,
      amount,
      category,
      date,
    });

  if (validationError) {
    showFormMessage(
      validationError,
      true
    );

    return;
  }

  if (editingExpenseId) {
    updateExpense({
      title,
      amount,
      category,
      date,
    });

    return;
  }

  addExpense({
    title,
    amount,
    category,
    date,
  });
}

function validateExpense(expense) {
  if (!expense.title) {
    return "Please enter an expense title.";
  }

  if (expense.title.length < 2) {
    return "Expense title must contain at least 2 characters.";
  }

  if (!Number.isFinite(expense.amount)) {
    return "Please enter a valid amount.";
  }

  if (expense.amount <= 0) {
    return "Amount must be greater than zero.";
  }

  if (!expense.category) {
    return "Please select a category.";
  }

  if (!expense.date) {
    return "Please select a date.";
  }

  return "";
}

function addExpense(expenseData) {
  const expense = {
    id: generateId(),
    title: expenseData.title,
    amount: expenseData.amount,
    category: expenseData.category,
    date: expenseData.date,
    createdAt:
      new Date().toISOString(),
  };

  expenses.push(expense);

  saveExpenses();

  resetForm();

  renderApplication();

  showFormMessage(
    "Expense added successfully."
  );
}

function updateExpense(expenseData) {
  const index =
    expenses.findIndex(
      (expense) =>
        expense.id ===
        editingExpenseId
    );

  if (index === -1) {
    showFormMessage(
      "Unable to find the selected expense.",
      true
    );

    return;
  }

  expenses[index] = {
    ...expenses[index],
    ...expenseData,
  };

  saveExpenses();

  resetForm();

  renderApplication();

  showFormMessage(
    "Expense updated successfully."
  );
}

function resetForm() {
  expenseForm.reset();

  editingExpenseId = null;

  submitButton.textContent =
    "Add Expense";

  cancelEditButton.classList.add(
    "hidden"
  );

  setDefaultDate();

  clearFormMessage();
}

function startEditing(id) {
  const expense =
    expenses.find(
      (item) => item.id === id
    );

  if (!expense) {
    return;
  }

  editingExpenseId = id;

  expenseTitle.value =
    expense.title;

  expenseAmount.value =
    expense.amount;

  expenseCategory.value =
    expense.category;

  expenseDate.value =
    expense.date;

  submitButton.textContent =
    "Update Expense";

  cancelEditButton.classList.remove(
    "hidden"
  );

  showFormMessage(
    "Editing selected expense."
  );

  scrollToForm();

  expenseTitle.focus();
}

/* -----------------------------
   Delete
----------------------------- */

function deleteExpense(id) {
  const expense =
    expenses.find(
      (item) => item.id === id
    );

  if (!expense) {
    return;
  }

  const confirmed =
    window.confirm(
      `Delete "${expense.title}"?\n\nThis action cannot be undone.`
    );

  if (!confirmed) {
    return;
  }

  expenses =
    expenses.filter(
      (item) => item.id !== id
    );

  saveExpenses();

  renderApplication();

  if (editingExpenseId === id) {
    resetForm();
  }
}

/* -----------------------------
   Rendering
----------------------------- */

function renderApplication() {
  const filteredExpenses =
    getFilteredExpenses();

  renderExpenseList(
    filteredExpenses
  );

  renderSummary();

  renderCategoryBreakdown();

  renderOverview();
}

function renderExpenseList(
  filteredExpenses
) {
  expenseList.innerHTML = "";

  visibleTransactionCount.textContent =
    filteredExpenses.length;

  if (filteredExpenses.length === 0) {
    emptyState.classList.add(
      "visible"
    );

    return;
  }

  emptyState.classList.remove(
    "visible"
  );

  const fragment =
    document.createDocumentFragment();

  filteredExpenses.forEach(
    (expense) => {
      fragment.appendChild(
        createExpenseElement(
          expense
        )
      );
    }
  );

  expenseList.appendChild(
    fragment
  );
}

function createExpenseElement(
  expense
) {
  const article =
    document.createElement(
      "article"
    );

  article.className =
    "expense-item";

  article.innerHTML = `
    <div class="expense-main">
      <div class="expense-title">
        ${escapeHTML(expense.title)}
      </div>

      <div class="expense-meta">
        <span class="category-badge">
          ${escapeHTML(expense.category)}
        </span>

        <span>
          ${formatDate(expense.date)}
        </span>
      </div>
    </div>

    <div class="expense-amount">
      ${formatCurrency(expense.amount)}
    </div>

    <div class="expense-actions">

      <button
        class="icon-button"
        type="button"
        data-action="edit"
        data-id="${expense.id}"
        aria-label="Edit ${escapeHTML(expense.title)}"
        title="Edit"
      >
        ✎
      </button>

      <button
        class="icon-button delete"
        type="button"
        data-action="delete"
        data-id="${expense.id}"
        aria-label="Delete ${escapeHTML(expense.title)}"
        title="Delete"
      >
        ×
      </button>

    </div>
  `;

  return article;
}

function handleExpenseListClick(
  event
) {
  const button =
    event.target.closest(
      "[data-action]"
    );

  if (!button) {
    return;
  }

  const action =
    button.dataset.action;

  const id =
    button.dataset.id;

  if (action === "edit") {
    startEditing(id);
  }

  if (action === "delete") {
    deleteExpense(id);
  }
}

/* -----------------------------
   Filtering
----------------------------- */

function getFilteredExpenses() {
  const search =
    searchInput.value
      .trim()
      .toLowerCase();

  const category =
    filterCategory.value;

  const dateFilter =
    filterDate.value;

  const filtered =
    expenses.filter(
      (expense) => {
        const matchesSearch =
          !search ||
          expense.title
            .toLowerCase()
            .includes(search) ||
          expense.category
            .toLowerCase()
            .includes(search);

        const matchesCategory =
          category === "all" ||
          expense.category ===
            category;

        const matchesDate =
          matchesDateFilter(
            expense.date,
            dateFilter
          );

        return (
          matchesSearch &&
          matchesCategory &&
          matchesDate
        );
      }
    );

  return sortExpenseList(
    filtered,
    sortExpenses.value
  );
}

function matchesDateFilter(
  dateString,
  filter
) {
  if (filter === "all") {
    return true;
  }

  const expenseDate =
    parseLocalDate(dateString);

  const today =
    new Date();

  const startOfToday =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

  if (filter === "today") {
    return (
      expenseDate.getTime() ===
      startOfToday.getTime()
    );
  }

  if (filter === "week") {
    const sevenDaysAgo =
      new Date(startOfToday);

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 6
    );

    return (
      expenseDate >= sevenDaysAgo &&
      expenseDate <= startOfToday
    );
  }

  if (filter === "month") {
    return (
      expenseDate.getFullYear() ===
        today.getFullYear() &&
      expenseDate.getMonth() ===
        today.getMonth()
    );
  }

  return true;
}

function sortExpenseList(
  list,
  sortType
) {
  return [...list].sort(
    (a, b) => {
      if (sortType === "newest") {
        return (
          parseLocalDate(b.date) -
          parseLocalDate(a.date)
        );
      }

      if (sortType === "oldest") {
        return (
          parseLocalDate(a.date) -
          parseLocalDate(b.date)
        );
      }

      if (sortType === "highest") {
        return b.amount - a.amount;
      }

      if (sortType === "lowest") {
        return a.amount - b.amount;
      }

      return 0;
    }
  );
}

/* -----------------------------
   Summary
----------------------------- */

function renderSummary() {
  const total =
    expenses.reduce(
      (sum, expense) =>
        sum + expense.amount,
      0
    );

  const monthTotal =
    getCurrentMonthTotal();

  totalExpense.textContent =
    formatCurrency(total);

  monthlyExpense.textContent =
    formatCurrency(monthTotal);

  transactionCount.textContent =
    expenses.length;
}

function getCurrentMonthTotal() {
  const today =
    new Date();

  return expenses
    .filter((expense) => {
      const date =
        parseLocalDate(
          expense.date
        );

      return (
        date.getFullYear() ===
          today.getFullYear() &&
        date.getMonth() ===
          today.getMonth()
      );
    })
    .reduce(
      (sum, expense) =>
        sum + expense.amount,
      0
    );
}

/* -----------------------------
   Category analytics
----------------------------- */

function renderCategoryBreakdown() {
  categoryBreakdown.innerHTML =
    "";

  if (expenses.length === 0) {
    categoryBreakdown.innerHTML = `
      <p class="muted-message">
        Add expenses to see category analytics.
      </p>
    `;

    return;
  }

  const totals = {};

  expenses.forEach(
    (expense) => {
      totals[expense.category] =
        (totals[expense.category] ||
          0) + expense.amount;
    }
  );

  const total =
    Object.values(totals).reduce(
      (sum, value) =>
        sum + value,
      0
    );

  const sorted =
    Object.entries(totals)
      .sort(
        ([, amountA], [, amountB]) =>
          amountB - amountA
      );

  sorted.forEach(
    ([category, amount]) => {
      const percentage =
        total > 0
          ? (amount / total) * 100
          : 0;

      const row =
        document.createElement(
          "div"
        );

      row.className =
        "category-row";

      row.innerHTML = `
        <span class="category-name">
          ${escapeHTML(category)}
        </span>

        <div class="category-track">
          <div
            class="category-bar"
            style="width: ${percentage}%"
          ></div>
        </div>

        <span class="category-value">
          ${formatCurrency(amount)}
        </span>
      `;

      categoryBreakdown.appendChild(
        row
      );
    }
  );
}

/* -----------------------------
   Overview
----------------------------- */

function renderOverview() {
  if (expenses.length === 0) {
    overviewContent.innerHTML = `
      <div class="overview-stat">
        <span>Status</span>
        <strong>No data yet</strong>
      </div>

      <div class="overview-stat">
        <span>Next step</span>
        <strong>Add an expense</strong>
      </div>
    `;

    return;
  }

  const total =
    expenses.reduce(
      (sum, expense) =>
        sum + expense.amount,
      0
    );

  const average =
    total / expenses.length;

  const highest =
    expenses.reduce(
      (max, expense) =>
        expense.amount > max.amount
          ? expense
          : max,
      expenses[0]
    );

  const categories =
    new Set(
      expenses.map(
        (expense) =>
          expense.category
      )
    ).size;

  overviewContent.innerHTML = `
    <div class="overview-stat">
      <span>Average expense</span>
      <strong>
        ${formatCurrency(average)}
      </strong>
    </div>

    <div class="overview-stat">
      <span>Categories used</span>
      <strong>
        ${categories}
      </strong>
    </div>

    <div class="overview-stat">
      <span>Largest expense</span>
      <strong>
        ${formatCurrency(highest.amount)}
      </strong>
    </div>

    <div class="overview-stat">
      <span>Top expense</span>
      <strong>
        ${escapeHTML(highest.title)}
      </strong>
    </div>
  `;
}

/* -----------------------------
   LocalStorage
----------------------------- */

function loadExpenses() {
  try {
    const stored =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(isValidExpense)
      .map(normalizeExpense);
  } catch (error) {
    console.error(
      "Unable to load expenses:",
      error
    );

    return [];
  }
}

function saveExpenses() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(expenses)
    );
  } catch (error) {
    console.error(
      "Unable to save expenses:",
      error
    );

    showFormMessage(
      "Unable to save data in LocalStorage.",
      true
    );
  }
}

function isValidExpense(
  expense
) {
  return (
    expense &&
    typeof expense.title ===
      "string" &&
    Number.isFinite(
      Number(expense.amount)
    ) &&
    typeof expense.category ===
      "string" &&
    typeof expense.date ===
      "string"
  );
}

function normalizeExpense(
  expense
) {
  return {
    id:
      expense.id ||
      generateId(),

    title:
      expense.title.trim(),

    amount:
      Number(expense.amount),

    category:
      expense.category,

    date:
      expense.date,

    createdAt:
      expense.createdAt ||
      new Date().toISOString(),
  };
}

/* -----------------------------
   Clear all
----------------------------- */

function clearAllExpenses() {
  if (expenses.length === 0) {
    showFormMessage(
      "There are no expenses to clear.",
      true
    );

    return;
  }

  const confirmed =
    window.confirm(
      "Delete ALL expenses?\n\nThis will permanently remove every saved transaction."
    );

  if (!confirmed) {
    return;
  }

  expenses = [];

  saveExpenses();

  resetForm();

  renderApplication();

  showFormMessage(
    "All expenses have been cleared."
  );
}

/* -----------------------------
   CSV Export
----------------------------- */

function exportCSV() {
  if (expenses.length === 0) {
    showFormMessage(
      "Add at least one expense before exporting.",
      true
    );

    return;
  }

  const headers = [
    "Title",
    "Amount",
    "Category",
    "Date",
  ];

  const rows =
    expenses.map(
      (expense) => [
        csvEscape(expense.title),
        expense.amount.toFixed(2),
        csvEscape(expense.category),
        expense.date,
      ]
    );

  const csv = [
    headers.join(","),
    ...rows.map(
      (row) =>
        row.join(",")
    ),
  ].join("\n");

  downloadFile(
    csv,
    `expenses-${getTodayString()}.csv`,
    "text/csv;charset=utf-8;"
  );
}

function csvEscape(value) {
  const string =
    String(value);

  if (
    string.includes(",") ||
    string.includes('"') ||
    string.includes("\n")
  ) {
    return `"${string.replace(
      /"/g,
      '""'
    )}"`;
  }

  return string;
}

/* -----------------------------
   JSON Import
----------------------------- */

async function handleImport(
  event
) {
  const file =
    event.target.files?.[0];

  if (!file) {
    return;
  }

  try {
    const text =
      await file.text();

    const parsed =
      JSON.parse(text);

    if (!Array.isArray(parsed)) {
      throw new Error(
        "Backup must contain an array of expenses."
      );
    }

    const imported =
      parsed
        .filter(isValidExpense)
        .map(normalizeExpense);

    if (imported.length === 0) {
      throw new Error(
        "No valid expenses were found in the backup."
      );
    }

    const confirmed =
      window.confirm(
        `Import ${imported.length} expense(s)?\n\nChoose OK to replace your current data.`
      );

    if (!confirmed) {
      return;
    }

    expenses = imported;

    saveExpenses();

    resetForm();

    renderApplication();

    showFormMessage(
      `${imported.length} expense(s) imported successfully.`
    );
  } catch (error) {
    console.error(
      "Import failed:",
      error
    );

    showFormMessage(
      error.message ||
        "Unable to import the backup file.",
      true
    );
  } finally {
    importFileInput.value = "";
  }
}

/*
 * A JSON backup can be created using this
 * helper from the browser console if needed:
 *
 * downloadJSONBackup();
 */

function downloadJSONBackup() {
  if (expenses.length === 0) {
    showFormMessage(
      "There are no expenses to back up.",
      true
    );

    return;
  }

  const json =
    JSON.stringify(
      expenses,
      null,
      2
    );

  downloadFile(
    json,
    `expenses-backup-${getTodayString()}.json`,
    "application/json"
  );
}

/* -----------------------------
   Theme
----------------------------- */

function initializeTheme() {
  const savedTheme =
    localStorage.getItem(
      THEME_KEY
    );

  const theme =
    savedTheme === "dark"
      ? "dark"
      : "light";

  applyTheme(theme);
}

function toggleTheme() {
  const current =
    document.documentElement
      .dataset.theme;

  applyTheme(
    current === "dark"
      ? "light"
      : "dark"
  );
}

function applyTheme(theme) {
  document.documentElement.dataset.theme =
    theme;

  localStorage.setItem(
    THEME_KEY,
    theme
  );

  themeIcon.textContent =
    theme === "dark"
      ? "☀"
      : "☾";
}

/* -----------------------------
   Utilities
----------------------------- */

function scrollToForm() {
  document
    .getElementById(
      "expenseFormSection"
    )
    .scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  setTimeout(() => {
    expenseTitle.focus();
  }, 500);
}

function generateId() {
  if (
    window.crypto &&
    typeof window.crypto
      .randomUUID ===
      "function"
  ) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

function parseLocalDate(
  dateString
) {
  const [
    year,
    month,
    day,
  ] = dateString
    .split("-")
    .map(Number);

  return new Date(
    year,
    month - 1,
    day
  );
}

function formatCurrency(amount) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }
  ).format(amount);
}

function formatDate(
  dateString
) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(
    parseLocalDate(
      dateString
    )
  );
}

function escapeHTML(value) {
  const div =
    document.createElement(
      "div"
    );

  div.textContent = value;

  return div.innerHTML;
}

function setDefaultDate() {
  if (!expenseDate.value) {
    expenseDate.value =
      getTodayString();
  }
}

function getTodayString() {
  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    String(
      today.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      today.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function downloadFile(
  content,
  filename,
  type
) {
  const blob =
    new Blob(
      [content],
      { type }
    );

  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement(
      "a"
    );

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(
    anchor
  );

  anchor.click();

  anchor.remove();

  URL.revokeObjectURL(url);
}

function showFormMessage(
  message,
  isError = false
) {
  formMessage.textContent =
    message;

  formMessage.style.color =
    isError
      ? "var(--danger)"
      : "var(--success)";
}

function clearFormMessage() {
  formMessage.textContent = "";
}