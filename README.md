# Personal Website

A modern personal website built with Astro and Supabase, inspired by coryzue.com.

## Features

- 🚀 **Astro** - Fast, modern static site generator
- 💾 **Supabase** - Backend database and authentication
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Works on all devices
- 📝 **Blog System** - Write and publish posts
- 🚀 **Project Showcase** - Display your projects
- 📊 **Open Dashboard** - Share your metrics transparently
- 📧 **Newsletter** - Collect email subscribers

## Pages

- **Home** - Personal introduction and overview
- **Projects** - Showcase of your work and projects
- **Writing** - Blog posts and articles
- **On Software** - Technical posts about software development
- **Open Project Dashboard** - Transparent metrics and updates
- **About** - Detailed background and contact information

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Supabase credentials:
```env
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the database migration:
```sql
-- Copy and paste the contents of supabase/migrations/001_initial_schema.sql
-- into your Supabase SQL editor and run it
```

3. Get your project URL and anon key from the Supabase dashboard

### Development

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Building for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

## Customization

### Personal Information

Update the following files with your personal information:

- `src/layouts/Layout.astro` - Update name, email, and social links
- `src/pages/index.astro` - Update bio and introduction
- `src/pages/about.astro` - Update background and skills
- `public/images/avatar.jpg` - Replace with your photo

### Styling

The site uses Tailwind CSS. You can customize the design by:

- Editing `tailwind.config.mjs` for theme customization
- Modifying component styles in the `.astro` files
- Adding custom CSS in the layout files

### Content Management

#### Adding Blog Posts

Posts are stored in the Supabase `posts` table. You can:

1. Add posts directly through the Supabase dashboard
2. Create an admin interface (not included in this template)
3. Use the Supabase API to programmatically add posts

#### Managing Projects

Projects are stored in the `projects` table and can be managed similarly to posts.

#### Newsletter Subscribers

Email subscribers are automatically stored in the `newsletter_subscribers` table when users submit the newsletter form.

## Database Schema

The site uses the following main tables:

- `profiles` - User profiles
- `posts` - Blog posts and articles
- `projects` - Project showcase items
- `newsletter_subscribers` - Email subscribers

See `supabase/migrations/001_initial_schema.sql` for the complete schema.

## 🚀 Deployment

### GitHub Pages (Recommended & Free)

This project is pre-configured for GitHub Pages deployment with automatic CI/CD!

#### Quick Start (5 minutes)
1. 📖 Follow the [Quick Start Guide](QUICK_START.md) - Deploy in 5 minutes
2. 📚 Read the [Complete Deployment Guide](GITHUB_PAGES_DEPLOYMENT.md) - Detailed instructions
3. 🔧 Check [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues & solutions

#### Deployment Commands
```bash
# Check pre-deployment configuration
npm run pre-deploy

# Build for GitHub Pages
npm run build:github

# Verify deployment
npm run verify-deployment https://yourusername.github.io
```

### Other Platforms

#### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

#### Netlify
1. Build the site: `npm run build`
2. Deploy the `dist/` directory to Netlify
3. Add environment variables in the Netlify dashboard

#### Other Static Hosting
Since this is a static site, you can deploy it to any platform like:
- Cloudflare Pages
- AWS S3 + CloudFront
- DigitalOcean App Platform

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by [coryzue.com](https://www.coryzue.com/)
- Built with [Astro](https://astro.build/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
