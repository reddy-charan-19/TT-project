# ✈️ SkyVault - Encrypted Flight Gateway

> A next-generation, high-security flight reservation system featuring **AES-256 GCM client-side encryption** and a vibrant, fully responsive **Glassmorphic** interface.

![SkyVault Demo](https://img.shields.io/badge/Status-Active-success) ![Encryption](https://img.shields.io/badge/Security-AES--256%20GCM-blueviolet) ![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)

SkyVault fundamentally reimagines how secure travel portals should look and feel. We've bridged the gap between military-grade data protection and incredibly energetic, dynamic UI designs.

---

## 🌟 Key Features
- **Client-Side E2EE Data Protection**: Every single payload (from auth to flight booking/canceling) is natively encrypted in the browser utilizing the Web Crypto API (`AES-GCM`) before it even touches the network layer.
- **Dual-Pane Dashboard Architecture**: A beautifully designed enterprise layout with an affixed blurred sidebar and a dynamic top application bar.
- **My Tickets Dashboard**: Automatically persists unencrypted flight schedules client-side. Track real-time cancellations, reschedules, and instantly generate **"Printable Passes"**.
- **Dynamic Ambient Backgrounds**: The global styling utilizes deep space radial gradients that slowly shift hues dynamically over a 20-second infinite loop.
- **Glassmorphism at Scale**: Almost all actionable cards and panels utilize heavy `blur()` filter layering, offering brilliant translucency over the animated background.

---

## 🧬 Repository Structure
This repository perfectly compartmentalizes the application logic across two branches:
- **`main` Branch**: Contains the entire **React/Vite Frontend** application (which you're looking at right now).
- **`backend` Branch**: Contains the entire **Java Spring Boot** secure API handling server-side decryption and ledger management. Switch branches via GitHub to view backend internals.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and NPM installed on your local environment.

### Installation
1. Clone this repository directly:
   ```bash
   git clone https://github.com/reddy-charan-19/TT-project.git
   ```
2. Move into the project directory:
   ```bash
   cd TT-project
   ```
3. Install the high-performance dependencies natively via node:
   ```bash
   npm install
   ```
4. Start the rapid-refresh Vite environment:
   ```bash
   npm run dev
   ```

### Booting the local Backend
Since the backend code lives on its own branch, clone it into an adjacent directory and run it via Maven. 
```bash
git clone -b backend https://github.com/reddy-charan-19/TT-project.git skyvault-backend
cd skyvault-backend
./mvnw spring-boot:run
```
*(Note: If the backend fails to connect, the Frontend is automatically equipped with a graceful fallback architecture that generates high-fidelity local mock data so you can test the UI securely).*

---

### 🎨 Design Tokens & UI Architecture
To maintain an extraordinarily premium aesthetic, we avoided standard CSS frameworks like Tailwind and instead wrote meticulously coupled vanilla CSS.
- Core Variables (`--bg-primary`, `--accent-glow`) are managed inside `index.css`.
- We utilize modular component tracking: `FlightSearch.css`, `Forms.css`, `Modals.css` cleanly isolate styles tightly to their matching React components.

---

**Developed with 💜 for Zero-Knowledge Web Travel.**
