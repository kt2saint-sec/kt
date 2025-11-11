# Karl's Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, featuring an automated invoice system with Stripe integration.

## 🏗️ Architecture

This project uses a **two-tier deployment architecture**:

### Frontend (Vercel)
- **Location**: This repository
- **Technology**: React + Vite + Tailwind CSS
- **Deployment**: Vercel
- **URL**: Your Vercel deployment URL

### Backend (Supabase Edge Functions)
- **Location**: `/supabase/functions/server/`
- **Technology**: Deno + Hono web framework
- **Deployment**: Supabase Edge Functions (separate deployment)
- **URL**: `https://hnehoutiwbkgsnswnmgv.supabase.co/functions/v1/make-server-2a8be528`

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Configure Vercel**:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables** (8 required):
   ```
   SUPABASE_URL
   SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   STRIPE_SECRET_KEY
   RESEND_API_KEY
   KARL_EMAIL
   ADMIN_USERNAME
   ADMIN_PASSWORD
   ```

### Backend Deployment (Supabase)

The backend is already deployed to Supabase Edge Functions. No action needed unless you need to update server logic.

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Features

- ✅ Responsive navigation with smooth scrolling
- ✅ Hero section with animated background effects
- ✅ About Me section
- ✅ Experience timeline
- ✅ Certifications display
- ✅ Automated invoice system with Stripe
- ✅ Email confirmations via Resend API
- ✅ Admin dashboard for invoice/client management
- ✅ Contact information

## 🔐 Environment Setup

Create a `.env` file based on `.env.example` and fill in your credentials.

## 📄 License

© 2025 Karl. All rights reserved.
