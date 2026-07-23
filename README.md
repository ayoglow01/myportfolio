# Ayomide Akinola — Developer Portfolio

A modern, production-ready developer portfolio built with React 19, Vite, and Tailwind CSS v4.

![Portfolio Preview](public/images/profile.jpg)

## 🚀 Features

- **Modern Stack**: React 19, Vite, Tailwind CSS v4
- **Responsive Design**: Perfect on all screen sizes (320px — 1920px)
- **Dark/Light Mode**: Smooth theme switching with system preference detection
- **Animations**: Framer Motion powered page transitions and micro-interactions
- **SEO Optimized**: React Helmet Async with Open Graph and Twitter cards
- **Accessible**: WCAG friendly with ARIA labels, keyboard navigation, and focus states
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
├── assets/          # Static assets
├── components/
│   ├── common/      # Reusable UI components
│   ├── layout/      # Navbar, Footer, Layout
│   ├── hero/        # Hero section components
│   ├── sections/    # Page sections
│   └── cards/       # Card components
├── data/            # Portfolio data
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── routes/          # Route configuration
└── styles/          # Additional styles
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ayomide-Akinola/portfolio.git
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

### EmailJS

Replace the following in `src/components/sections/Contact.jsx`:

```javascript
"YOUR_SERVICE_ID"    → Your EmailJS service ID
"YOUR_TEMPLATE_ID"   → Your EmailJS template ID
"YOUR_PUBLIC_KEY"     → Your EmailJS public key
```

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
3. Framework Preset: Vite
4. Deploy

### Environment Variables

No environment variables are required for the base build. For EmailJS, configure your keys in the Contact component or use environment variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

## 👤 Author

**Ayomide Akinola**

- GitHub: [@ayomide-Akinola](https://github.com/ayomide-Akinola)
- LinkedIn: [Ayomide Akinola](https://linkedin.com/in/ayomide-Akinola)
