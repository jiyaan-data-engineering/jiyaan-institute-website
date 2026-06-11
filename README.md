# 🚀 Jiyaan Institute Website

A modern, interactive educational website for Jiyaan Institute featuring cutting-edge web design with smooth animations, responsive layouts, and engaging user experiences.

![Jiyaan Institute](./assets/images/logo.webp)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Jiyaan Institute Website** is a premium educational platform that showcases world-class tech and data engineering courses. Built with vanilla HTML, CSS, and JavaScript, it delivers an exceptional user experience with:

- ⚡ Lightning-fast performance (no build process)
- 🎨 Modern glassmorphism design
- 📱 Fully responsive across all devices
- ✨ Smooth animations and transitions
- 🔐 Security-focused implementation
- ♿ Accessibility-compliant

---

## ✨ Features

### 🎭 Interactive Components
- **Custom Cursor** - Animated cursor with glow effect that follows mouse movement
- **3D Card Effects** - Perspective transforms on hover for depth perception
- **Magnetic Buttons** - Buttons that follow cursor proximity
- **Auto-rotating Carousel** - Hero section with automatic slide transitions
- **Infinite Scroll** - Continuously scrolling course cards

### 🎨 Visual Design
- **Dark Modern Theme** - Eye-friendly dark background with cyan accents
- **Glassmorphism** - Frosted glass effect on cards and modals
- **Gradient Animations** - Animated gradient text and borders
- **Smooth Transitions** - All elements transition smoothly on interaction

### 📱 Responsive Design
- **Mobile-First** - Optimized for mobile devices first
- **Adaptive Layout** - Automatic adjustment from 320px to 4K screens
- **Touch-Friendly** - Large touch targets for mobile users
- **Hamburger Menu** - Collapsible navigation for small screens

### 📝 Contact & Conversion
- **Contact Form** - Email and phone validation with real-time feedback
- **Duplicate Checking** - Prevents duplicate registrations
- **WhatsApp Integration** - Direct messaging link (security-encoded)
- **Form Validation** - Client and server-side validation

### 🔍 SEO & Discovery
- **Sitemap** - XML sitemap for search engines
- **Robots.txt** - Crawler instructions
- **Semantic HTML** - Proper semantic structure
- **Meta Tags** - Ready for social sharing and SEO

### ♿ Accessibility
- **Motion Preferences** - Respects `prefers-reduced-motion`
- **Keyboard Navigation** - Full keyboard support
- **Color Contrast** - WCAG AA compliant contrast ratios
- **Screen Reader Ready** - Semantic HTML for assistive technologies

---

## 🚀 Quick Start

### Easiest Way - Download and Open

1. Download the repository
2. Open any HTML file in your browser
3. Start exploring!

That's it! No installation, build process, or dependencies needed.

### Using Local Server (Recommended)

For form submission features to work properly, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (npm)
npx http-server

# Using Ruby
ruby -run -ehttpd . -p8000
```

Then visit: `http://localhost:8000`

---

## 📁 Project Structure

```
Jiyaan-website-code/
├── README.md                    # This file
├── PROJECT.md                   # Detailed project documentation
├── assets/
│   ├── css/                     # Stylesheets (8 files)
│   │   ├── global.css          # Global styles & media queries
│   │   ├── main.css            # Primary styles
│   │   ├── courses.css         # Course grid styling
│   │   ├── contact.css         # Contact form styling
│   │   ├── course-detail.css   # Course page styles
│   │   ├── about.css           # About page styles
│   │   ├── mindmap.css         # Mindmap styles
│   │   └── sql.css             # SQL course styles
│   │
│   ├── js/                      # JavaScript files (4 files)
│   │   ├── main.js             # Core interactions & animations
│   │   ├── contact.js          # Form validation & submission
│   │   ├── course-details.js   # Course page functionality
│   │   └── scroll.js           # Scroll animations
│   │
│   └── images/                  # WebP images (15 files)
│       ├── logo.webp           # Main logo
│       ├── python.webp         # Course icons
│       ├── sql.webp            # ... (and more)
│       └── [other course icons]
│
├── *.docx files                 # Design documentation
│   ├── index.docx              # Homepage design
│   ├── courses.docx            # Courses page design
│   ├── contact.docx            # Contact page design
│   ├── about.docx              # About page design
│   ├── course-detail.docx      # Course detail design
│   ├── card-preview.docx       # Card design reference
│   └── robots.docx             # SEO documentation
│
├── sitemap.xml                  # Search engine sitemap
├── robots.txt                   # Crawler instructions
└── BingSiteAuth.xml             # Bing verification
```

---

## 🛠️ Technologies

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, custom properties
- **JavaScript (ES6+)** - Interactive features and animations

### Libraries
- **AOS (Animate On Scroll)** - Scroll-triggered animations
- **Google Fonts** - Outfit, Inter typography
- **DevIcons** - Technology icon library

### Backend (Optional)
- **Netlify Functions** - Serverless contact form handling
- **Netlify Forms** - Form submission service

### DevOps
- **Git** - Version control
- **GitHub** - Repository hosting

---

## 💻 Installation

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Code editor (VS Code, Sublime Text, etc.)
- Optional: Git for version control

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jiyaan-data-engineering/Jiyaan-website-code.git
   cd Jiyaan-website-code
   ```

2. **Start a Local Server**
   ```bash
   # Choose your preferred method above
   python -m http.server 8000
   ```

3. **Open in Browser**
   ```
   http://localhost:8000
   ```

4. **Start Developing**
   - Edit CSS files in `assets/css/`
   - Modify JavaScript in `assets/js/`
   - Update HTML content in `.docx` files
   - Add new images to `assets/images/`

---

## 🎮 Usage Guide

### For Students/Visitors
1. **Explore Courses** - Browse available courses in the main carousel
2. **Learn Skills** - See featured tech skills with icons
3. **Get Details** - Click course cards for detailed information
4. **Contact Us** - Use the contact form to submit inquiries
5. **WhatsApp** - Click the WhatsApp button for instant messaging

### For Developers
1. **Customize Colors** - Edit CSS custom properties in `:root`
2. **Modify Content** - Update HTML pages (convert .docx to proper HTML)
3. **Add Courses** - Add new course cards to the grid
4. **Create Pages** - Follow existing page structure
5. **Deploy** - Push to Netlify, GitHub Pages, or your hosting

### Code Examples

#### Add a New Course Card
```html
<div class="card">
  <img class="card-icon" src="assets/images/your-course.webp" alt="Course Name">
  <h3>Course Name</h3>
  <p>Brief course description</p>
</div>
```

#### Customize Primary Color
```css
:root {
  --primary: #00ffcc; /* Change this */
}
```

#### Add Smooth Scroll
Already implemented! Just use anchor links:
```html
<a href="#courses">Go to Courses</a>
```

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Full Support |
| Firefox | Latest | ✅ Full Support |
| Safari | Latest | ✅ Full Support |
| Edge | Latest | ✅ Full Support |
| Opera | Latest | ✅ Full Support |
| IE 11 | - | ❌ Not Supported |

### Modern Features Used
- CSS Grid & Flexbox
- CSS Custom Properties
- CSS Backdrop Filter
- CSS Clamp Function
- Fetch API
- Promise & Async/Await

---

## 📊 Performance

### Optimization Features
- ✅ No external frameworks (vanilla JS)
- ✅ WebP image format for compression
- ✅ CSS caching strategies
- ✅ Fluid typography (responsive without media queries)
- ✅ Lazy loading support for images
- ✅ Hardware-accelerated animations
- ✅ Minimal CSS with utility approach

### Performance Metrics (Target)
- **Page Load:** < 2 seconds
- **Lighthouse Score:** 90+
- **Core Web Vitals:** Green
- **Mobile Speed:** Excellent

### Image Optimization
All images are in WebP format for 25-35% smaller file sizes compared to PNG/JPG.

---

## 🔧 Customization Guide

### Change Brand Colors
Edit `assets/css/main.css`:
```css
:root {
  --primary: #00ffcc;        /* Main accent color */
  --bg-dark: #0a0f1c;        /* Background color */
}
```

### Update Course List
Add/edit courses in the appropriate HTML file:
```html
<div class="courses-grid">
  <div class="card">
    <!-- Your course -->
  </div>
</div>
```

### Modify Animations
Adjust animation durations and effects in CSS:
```css
@keyframes gradientMove {
  0% { background-position: 0% }
  50% { background-position: 100% }
  100% { background-position: 0% }
}
```

### Configure Form Endpoint
Update the API endpoint in `assets/js/contact.js`:
```javascript
const res = await fetch("/.netlify/functions/submit", {
  // Change this path to your backend
});
```

---

## 🚀 Deployment

### Deploy to Netlify (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Configure build settings:
   - Build command: (leave blank)
   - Publish directory: `.`
4. Set environment variables if needed
5. Deploy!

```bash
# Or deploy directly via Netlify CLI
npm install -g netlify-cli
netlify deploy
```

### Deploy to GitHub Pages
```bash
git push origin main
# Enable GitHub Pages in repository settings
# Select 'main' branch as source
```

### Deploy to Traditional Hosting
1. FTP all files to your hosting server
2. Ensure `.htaccess` is configured for routing
3. Test thoroughly
4. Done!

### Environment Variables
Create `.env` file for sensitive data:
```
CONTACT_API_ENDPOINT=https://your-api.com/submit
WHATSAPP_NUMBER=919876543210
```

---

## 🐛 Troubleshooting

### Form Not Submitting
- Ensure backend API endpoint is correct
- Check browser console for errors (F12)
- Verify network tab shows request
- Test with valid email and 10-digit phone

### Images Not Loading
- Verify image paths are correct
- Check file extensions (.webp)
- Ensure images are in `assets/images/`
- Clear browser cache (Ctrl+Shift+Del)

### Animations Not Smooth
- Check `prefers-reduced-motion` setting
- Disable browser extensions
- Try different browser
- Check GPU acceleration settings

### Styling Issues
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check for CSS specificity conflicts
- Verify viewport meta tag exists

---

## 📚 Additional Resources

### Documentation
- [PROJECT.md](./PROJECT.md) - Detailed technical documentation
- [CSS Guidelines](./assets/css/) - Styling approach documentation
- [JavaScript Comments](./assets/js/) - Code-level documentation

### External Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)
- [Google Fonts](https://fonts.google.com/)

### Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [GTmetrix](https://gtmetrix.com/)
- [WebP Converter](https://cloudconvert.com/)

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Maintain existing code style
- Test changes on multiple browsers
- Ensure responsive design works
- Update documentation
- Add meaningful commit messages

---

## 📝 License

All rights reserved © Jiyaan Institute 2026. This website and its content are proprietary and confidential.

For licensing inquiries, please contact Jiyaan Institute.

---

## 📞 Support

- **Website:** [Jiyaan Institute](#)
- **Email:** Contact through form on website
- **WhatsApp:** Available through website
- **GitHub Issues:** [Report bugs here](https://github.com/jiyaan-data-engineering/Jiyaan-website-code/issues)

---

## 🙏 Acknowledgments

- **Design Inspiration:** Modern web design trends
- **Icons:** DevIcons Community
- **Fonts:** Google Fonts
- **Hosting:** Netlify

---

## 📈 Roadmap

- [ ] Student login system
- [ ] Course enrollment functionality
- [ ] Progress tracking dashboard
- [ ] Payment integration
- [ ] Blog and resource center
- [ ] Live chat support
- [ ] Mobile app version
- [ ] Video course library
- [ ] Certificate generation
- [ ] Community forum

---

## 🎓 Learning Path

Want to learn from this project?

1. **HTML Structure** - Study how content is organized semantically
2. **CSS Styling** - Learn responsive design with media queries
3. **Vanilla JavaScript** - Understand DOM manipulation and events
4. **Animations** - See CSS and JS animation techniques
5. **Form Handling** - Learn validation and async operations
6. **SEO** - Understand search engine optimization basics

---

**Made with ❤️ by Jiyaan Institute | Last Updated: June 2026**

---

## 📊 Quick Stats

- 📄 **8 CSS Files** - 2000+ lines of styling
- 📝 **4 JS Files** - 400+ lines of functionality
- 🖼️ **15+ Images** - All in WebP format
- ⚡ **Zero Dependencies** - Pure HTML/CSS/JS
- 🎨 **12 Courses** - Fully showcased
- 📱 **4 Breakpoints** - Responsive design
- ♿ **WCAG AA** - Accessible
- 🚀 **Fast** - Loads in seconds

---

*Start learning, start creating, start succeeding with Jiyaan Institute!*
