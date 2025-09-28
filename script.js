// =======================
// Categories & Carbon Factors
// =======================
const categories = {
  Alcohol: ["beer", "wine", "vodka", "whiskey", "rum", "gin", "coronita"],
  Bakery: ["bread", "croiss", "bagel", "donut", "cake"],
  Produce: ["apple", "banana", "orange", "nectarine", "mandarin", "spinach", "mango"],
  Dairy: ["milk", "cheese", "butter", "yogurt", "cow", "cream"],
  PersonalCare: ["shampoo", "soap", "toothpaste", "lotion", "deodorant"],
  Household: ["detergent", "cleaner", "towel", "napkin"],
  Other: []
};

const carbonFactors = {
  Alcohol: 0.7,
  Bakery: 0.5,
  Produce: 0.3,
  Dairy: 0.8,
  PersonalCare: 0.4,
  Household: 0.6,
  Other: 0.2
};

// =======================
// OCR Cleanup
// =======================
function cleanOCRText(rawText) {
  return rawText
    .replace(/[^a-zA-Z0-9.\s$]/g, " ")   // remove junk
    .replace(/\s+/g, " ")                // normalize whitespace
    .trim();
}

// =======================
// Parse Items
// =======================
function parseItems(cleanText) {
  const itemRegex = /([a-zA-Z ]+)\s+(\d+\.\d{2})/g;
  let matches, items = [];
  while ((matches = itemRegex.exec(cleanText)) !== null) {
    items.push({
      name: matches[1].trim(),
      price: parseFloat(matches[2])
    });
  }
  return items;
}

// =======================
// Categorization
// =======================
function categorizeItem(name) {
  const lowered = name.toLowerCase();
  for (let [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowered.includes(keyword))) {
      return category;
    }
  }
  return "Other";
}

// =======================
// Analyze Receipt
// =======================
function analyzeReceipt(rawText) {
  const cleanText = cleanOCRText(rawText);
  const items = parseItems(cleanText).map(item => ({
    ...item,
    category: categorizeItem(item.name)
  }));

  let summary = {};
  let carbonSummary = {};
  let total = 0, totalCarbon = 0;

  items.forEach(item => {
    total += item.price;
    summary[item.category] = (summary[item.category] || 0) + item.price;

    const carbon = item.price * (carbonFactors[item.category] || 0.2);
    totalCarbon += carbon;
    carbonSummary[item.category] = (carbonSummary[item.category] || 0) + carbon;
  });

  return { items, summary, carbonSummary, total, totalCarbon };
}

// =======================
// Display Results
// =======================
function displayResults(result) {
  const outputDiv = document.getElementById("output");
  // Added a div for the totals to style them better
  outputDiv.innerHTML = `
    <h2>Receipt Analysis</h2>
    <div class="summary-totals">
      <p><strong>Total Spent:</strong> $${result.total.toFixed(2)}</p>
      <p><strong>Total Carbon Footprint:</strong> ${result.totalCarbon.toFixed(2)} kg CO₂</p>
    </div>
    <h3>Items</h3>
    <ul>
      ${result.items.map(item => `<li>${item.name} - $${item.price.toFixed(2)} <strong>[${item.category}]</strong></li>`).join("")}
    </ul>
  `;

  renderChart(result.summary, result.carbonSummary);
}

// =======================
// CHART RENDERING (NOW A PIE CHART)
// =======================
function renderChart(spendingSummary, carbonSummary) {
  const ctx = document.getElementById("chart").getContext("2d");

  if (window.receiptChart) {
    window.receiptChart.destroy();
  }

  window.receiptChart = new Chart(ctx, {
    type: "pie", // <<<< CHANGED FROM "bar" TO "pie"
    data: {
      labels: Object.keys(spendingSummary),
      datasets: [
        {
          label: "Spending ($)",
          data: Object.values(spendingSummary),
          backgroundColor: [ // Added more colors for pie chart segments
            'rgba(79, 172, 254, 0.8)',
            'rgba(0, 242, 254, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          borderColor: '#1e1e1e', // Match card background for a clean look
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#e0e0e0' // Light text for dark mode legend
          }
        },
        title: {
          display: true,
          text: 'Spending by Category',
          color: '#e0e0e0', // Light text for dark mode title
          font: {
            size: 18
          }
        }
      }
      // "scales" option is removed as it's not used for pie charts
    }
  });
}

// =======================
// OCR Upload Handling
// =======================
document.getElementById("receiptImage").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  document.getElementById("output").innerHTML = "<p>Running OCR...</p>";

  const { data: { text } } = await Tesseract.recognize(file, 'eng', {
    logger: m => console.log(m) // logs progress
  });

  document.getElementById("receiptInput").value = text;
  document.getElementById("output").innerHTML = "<p>OCR complete! Click 'Analyze' to see the results.</p>";
});

// =======================
// Analyze Button
// =======================
document.getElementById("analyzeBtn").addEventListener("click", () => {
  const rawText = document.getElementById("receiptInput").value;
  if (!rawText.trim()) {
    document.getElementById("output").innerHTML = "<p style='color:red'>No receipt text found. Upload an image or paste text.</p>";
    return;
  }
  const result = analyzeReceipt(rawText);
  displayResults(result);
});