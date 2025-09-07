# 🏛️ Lesotho eGovernment Portal

A modern, comprehensive digital government platform for the Kingdom of Lesotho, providing seamless access to government services, civic engagement tools, and cultural heritage exploration.

![Lesotho eGov Portal](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Latest-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### 🏠 **Public Portal**
- **Hero Landing Page** with mountain landscapes and government branding
- **Ministry & Agency Directory** with interactive cards and images
- **Breaking News Banner** with auto-rotating urgent announcements
- **Cultural Heritage Section** showcasing Basotho traditions and locations
- **Multi-language Support** (English/Sesotho) with localStorage persistence

### 🔐 **Authenticated Services**
- **Personal Dashboard** with service statistics and quick actions
- **Interactive ID Card** display with user information
- **eWallet Integration** for government payments
- **Service Search** with intelligent filtering and suggestions

### 🗣️ **Civic Voice Platform**
- **Real-time Chat Support** with government agents
- **Problem Reporting System** with case tracking
- **Community Participation** in surveys and governance
- **Local Alerts** for community announcements

### 📰 **News & Information**
- **Dynamic News Grid** with filtering and search capabilities  
- **Featured Articles** with high-quality images
- **Category-based Organization** (Legal, Economy, Government, etc.)
- **Read time estimation** and view tracking

### 🌍 **Explore Lesotho**
- **Interactive Map Explorer** with geographic insights
- **Cultural Heritage** documentation and artifacts
- **Tourist Information** and attractions
- **Historical Landmarks** with detailed descriptions

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Kellybrackets/E_GOVERNANCE-WEBSITE-lesotho.git
   cd E_GOVERNANCE-WEBSITE-lesotho
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration values.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
lesotho-egov/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Authentication layouts
│   ├── civic-voice/              # Civic engagement features
│   │   ├── chat/                 # Real-time support chat
│   │   ├── report/               # Problem reporting
│   │   ├── participate/          # Governance participation
│   │   └── local-alerts/         # Community alerts
│   ├── explore-lesotho/          # Cultural & tourism content
│   ├── home/                     # Authenticated dashboard
│   ├── ministries/               # Government ministry pages
│   └── page.tsx                  # Main landing page
├── components/                   # Reusable UI components
│   ├── ui/                       # Shadcn/ui components
│   ├── breaking-news-banner.tsx  # News banner component
│   ├── news-grid.tsx            # News display grid
│   ├── safe-image.tsx           # Error-handling image component
│   └── ...
├── lib/                          # Utility functions
│   ├── translations.ts          # Multi-language support
│   └── auth.ts                  # Authentication utilities
├── public/                       # Static assets
│   └── images/                   # Stock images organized by category
│       ├── hero/                 # Hero section backgrounds
│       ├── ministries/           # Government building images
│       ├── cultural/             # Lesotho cultural images
│       ├── news/                 # News article images
│       └── general/              # General purpose images
└── styles/                       # Global styles and CSS
```

## 🖼️ Image Management

### Image Organization
Images are organized in `/public/images/stock/` with the following structure:
- `hero/` - Hero section backgrounds
- `ministries/` - Government building photos  
- `cultural/` - Basotho heritage and cultural images
- `news/` - News article featured images
- `services/` - Service illustration images
- `general/` - Profile pictures and general use

### Supported Formats
- **WebP** (recommended for web optimization)
- **JPEG/JPG** (high-quality photos)
- **PNG** (with transparency support)

### Error Handling
The `SafeImage` component provides automatic fallback handling:
```tsx
<SafeImage
  src="/images/stock/hero/mountain-landscape.jpg"
  fallbackSrc="/images/stock/general/flag.jpg"
  alt="Lesotho mountains"
  fill
  className="object-cover"
/>
```

## 🌐 Multi-Language Support

### Current Languages
- **English** (en) - Default
- **Sesotho** (st) - Local language

### Usage
```tsx
import { useTranslation } from '@/lib/translations'

const { t } = useTranslation(currentLanguage)
return <h1>{t('Government of Lesotho')}</h1>
```

### Adding Translations
Update `/lib/translations.ts`:
```typescript
export const translations = {
  'New Text': 'Mongolo o Mocha',
  // Add more translations...
}
```

## 🎨 Styling & Theming

### Design System
- **Primary Blue**: `#002F6C` (Government official color)
- **Secondary Green**: `#007849` (Lesotho flag green)
- **Typography**: System fonts with Tailwind CSS classes
- **Spacing**: Consistent 8px grid system

### Component Styling
- **Hover Effects**: `hover-lift` class for subtle 3D effects
- **Card Shadows**: `card-shadow` for consistent depth
- **Animations**: CSS transitions with `page-content-fade-in`

## 🔐 Authentication

### Auth System
- **withAuth HOC** for protected routes
- **localStorage** for session persistence  
- **Mock Authentication** (development)
- **Role-based Access** planning for future

### Protected Routes
```tsx
import { withAuth } from '@/lib/auth'

function ProtectedPage() {
  return <div>Protected Content</div>
}

export default withAuth(ProtectedPage)
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- **Bottom Navigation** for authenticated users
- **Touch-friendly** interactions
- **Responsive images** with proper aspect ratios
- **Mobile-optimized** forms and inputs

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Testing
npm run test         # Run test suite (when implemented)
npm run e2e          # Run end-to-end tests (when implemented)
```

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting (configure as needed)
- **Tailwind CSS** for consistent styling

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local` for local development:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.gov.ls
DATABASE_URL=your_database_connection
AUTH_SECRET=your_jwt_secret
```

### Deployment Platforms
- **Vercel** (recommended for Next.js)
- **Netlify** 
- **AWS Amplify**
- **Traditional hosting** with Node.js support

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow **TypeScript** best practices
- Use **semantic commit messages**
- Maintain **component documentation**
- Ensure **responsive design** compatibility
- Add **proper error handling**

## 📋 Recent Updates

### Version History
- **v1.3.0** - Enhanced image management with SafeImage component
- **v1.2.0** - Fixed breaking news banner persistence issues
- **v1.1.0** - Added comprehensive ministry images and cultural heritage
- **v1.0.0** - Initial release with core features

### Bug Fixes
- ✅ Fixed image display issues across all pages
- ✅ Resolved breaking news banner disappearing
- ✅ Improved localStorage error handling
- ✅ Enhanced responsive design for mobile devices

## 🆘 Support

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/Kellybrackets/E_GOVERNANCE-WEBSITE-lesotho/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Kellybrackets/E_GOVERNANCE-WEBSITE-lesotho/discussions)
- **Email**: support@gov.ls (for government inquiries)

### Common Issues
1. **Images not loading**: Ensure images are placed in `/public/images/stock/` directories
2. **Breaking news not showing**: Check localStorage for dismissed items
3. **Build errors**: Run `npm run lint` and `npm run type-check`

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🏛️ Government Information

**Official Project**: Kingdom of Lesotho Digital Government Initiative  
**Department**: Ministry of Communications, Science and Technology  
**Version**: 1.3.0  
**Last Updated**: September 2025

---

**Built with ❤️ for the people of Lesotho** 🇱🇸