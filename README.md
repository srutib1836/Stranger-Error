# 🧇 Stranger Things CTF: Game Master Guide

## 🔐 1. Player Access Codes (Login Screen)

These are the passwords players enter at the start to access their respective screens.

| Player | Role | Access Code |
|-------|------|-------------|
| **Player 1 – The Fan / Will** | Navigates the "Upside Down" desktop to find errors. | `SCOOPS_AHOY` |
| **Player 2 – The Operator / Dustin** | Uses the terminal to translate errors into technical codes. | `CEREBRO` |

---

## 🕵️ 2. The Objective

The **Fan** is stuck in the Upside Down (a glitchy desktop) and cannot watch the Stranger Things finale because the internet is down.

They must communicate error messages to the **Operator**, who translates them into **HTTP Status Codes** using their manual.

**Goal:**  
Enter the correct sequence of **6 HTTP status codes** into the **“Re-Align Satellite Dish”** box to restore the connection.

---

## 🧩 3. The Puzzle Solution

### 📝 Main Hint: *Joyce's Wall (Yellow Post-it)*

The yellow note on the Fan’s desktop reads:

THE LIGHTS ARE BLINKING:
1. Clearance Denied.
2. Barb is Gone.
3. Signal Interference.
4. Just a Teapot.
5. Gate is Forbidden.
6. Will has Moved.

This list dictates the **exact order** in which codes must be entered.

---

### 🐛 The 6 Glitches (Walkthrough)

| Order | Desktop Icon (Fan View) | Error Message | Meaning (Operator View) | HTTP Code |
|------|---------------------------|---------------|--------------------------|-----------|
| **1** | Hawkins Lab (Microscope) | “ACCESS DENIED… Level 4 Security Clearance Required.” | Unauthorized | **401** |
| **2** | Barb_Search (Glasses) | “404 NOT FOUND… Barb is gone.” | Not Found | **404** |
| **3** | Netflix (TV) | “SIGNAL INTERFERENCE… System Unavailable.” | Service Unavailable | **503** |
| **4** | Eggos (Waffle) | “I’M A TEAPOT… I cannot toast these waffles.” | I'm a Teapot | **418** |
| **5** | The Gate (Lightning) | “FORBIDDEN… Eleven closed this gate.” | Forbidden | **403** |
| **6** | Will_Byers (Boy) | “MOVED… Redirecting to The Upside Down.” | Moved Permanently | **301** |

---

## 🏆 4. The Final Answer

Players must combine the codes in the order given on the Post-it note.

### **Final Code:**  
401404503418403301
