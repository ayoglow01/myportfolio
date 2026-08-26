# Ayomide Akinola — Developer Portfolio

A modern, production-ready developer portfolio built with React 19, Vite, and Tailwind CSS v4.

## 🚀 Features

- **Modern Stack**: React 19, Vite, Tailwind CSS v4
- **Fully Responsive**: Perfect on all screen sizes (320px — 4K)
- **Dark/Light Mode**: Smooth theme switching with system preference detection
- **Animations**: Framer Motion powered page transitions and micro-interactions
- **SEO Optimized**: React Helmet Async with Open Graph and Twitter cards
- **Accessible**: WCAG compliant with ARIA labels, keyboard navigation, and focus states
- **Contact Form**: EmailJS integration with validation and loading states
- **Code Splitting**: Lazy loaded pages and sections for optimal performance
- **PWA Ready**: Web manifest and service worker support

## 🛠 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Typewriter**: React Simple Typewriter
- **SEO**: React Helmet Async
- **Email**: EmailJS

## 📁 Project Structure

```
src/
├── components/
│   ├── common/      # Reusable UI components (Button, Badge, Card, etc.)
│   ├── layout/      # Navbar, Footer, Layout
│   ├── hero/        # Hero section components
│   ├── sections/    # Page sections (About, Skills, Experience, etc.)
│   └── cards/       # Card components
├── data/            # Portfolio data (easily editable)
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── routes/          # Route configuration
└── index.css        # Global styles and Tailwind config
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ayomide-akinola/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 🔧 Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a service and email template
3. Copy `.env.example` to `.env`
4. Fill in your credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note**: If EmailJS is not configured, the contact form will run in demo mode (logs form data to console).

### Password-Protected CV

The CV is **not** stored in `public/` and has no predictable public URL. Downloading it requires a password validated **server-side** by Vercel serverless functions:

```text
Click "Download CV"
        ↓
Password modal
        ↓
POST /api/cv/unlock  →  server checks CV_PASSWORD (constant-time compare)
        ↓
Short-lived HMAC token (60 s)
        ↓
GET /api/cv/download?token=…  →  server streams private/cv.pdf
```

Configuration (server-side only — never add a `VITE_` prefix, never commit real values):

```env
CV_PASSWORD=replace-with-your-secure-password
CV_TOKEN_SECRET=replace-with-a-long-random-secret   # optional, recommended
```

Security features:

- Password validated server-side with a timing-safe comparison
- Rate limiting (5 attempts per 15 min per IP)
- Short-lived (60 s) HMAC-signed download token, kept in memory only
- `private/cv.pdf` is never shipped to the client bundle
- Security headers (`no-store`, `nosniff`, `X-Frame-Options: DENY`)
- No password or token in URLs, localStorage, logs, or the frontend bundle

**Local development**: serverless functions require `vercel dev` (Vite's `npm run dev` alone does not serve `/api`). Set the env vars in a local `.env` file, then run `npx vercel dev`.

### Personal Information

Update the data files in `src/data/`:

- `portfolio.js` — Personal info, about, navigation, SEO
- `skills.js` — Skills and technologies
- `experience.js` — Work experience
- `projects.js` — Projects showcase

### SEO

Update `seoDefaults` in `src/data/portfolio.js` with your domain.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables (VITE_EMAILJS_*)
4. Deploy

### Environment Variables

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
CV_PASSWORD=replace-with-your-secure-password
CV_TOKEN_SECRET=replace-with-a-long-random-secret
```

Set all five in **Vercel → Project Settings → Environment Variables** (Production + Preview + Development as needed). The two CV variables are server-side only and are never bundled into client code.

## 📱 Responsive Breakpoints

The portfolio is optimized for:
- **320px** — Small mobile
- **375px** — Mobile
- **425px** — Large mobile
- **640px** — Small tablet
- **768px** — Tablet
- **1024px** — Laptop
- **1280px** — Desktop
- **1536px+** — Large screens / 4K

## ♿ Accessibility

- Skip to main content link
- ARIA labels on all interactive elements
- Keyboard navigable
- Focus indicators
- Semantic HTML
- High contrast colors
- Screen reader friendly

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

## 👤 Author

**Ayomide Akinola**

- GitHub: [@ayomide-akinola](https://github.com/ayomide-akinola)
- LinkedIn: [Ayomide akinola](https://linkedin.com/in/ayomide-akinola)
