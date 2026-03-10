# Jay E. Pahilanga — Construction & Engineering Virtual Assistant Website

A professional single-page portfolio website for Jay E. Pahilanga, Construction & Engineering Virtual Assistant.

---

## 📁 Files

| File | Description |
|------|-------------|
| `index.html` | Main website — fully self-contained, no dependencies |

---

## 🚀 Deployment

This is a **single-file static website**. No build tools, no server, no dependencies required.

### Option 1 — Netlify (Recommended, Free)
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag and drop `index.html`
3. Your site is live instantly

### Option 2 — GitHub Pages (Free)
1. Create a new GitHub repository
2. Upload `index.html` to the root
3. Go to **Settings → Pages → Source → main branch**
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 3 — Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo or drag and drop
3. Deploy with one click

### Option 4 — cPanel / Shared Hosting
1. Log in to your hosting control panel
2. Open **File Manager → public_html**
3. Upload `index.html`
4. Visit your domain — done

---

## 🌐 Website Sections

1. **Hero** — Headline, photo, contact links, Hire Me button
2. **Stats Bar** — Key metrics (12+ years, 100% compliance, etc.)
3. **About** — Background, specializations, skills overview
4. **Services** — Remote Estimation, Project Coordination, Compliance & Safety
5. **Experience** — Airtech Systems / Texas Instruments PH, Coca-Cola Philippines
6. **Case Study** — Sample project metrics and outcomes
7. **Education & Certifications** — Degrees and professional certifications
8. **Call to Action** — Contact section with consultation button

---

## 🎨 Design Specs

| Element | Value |
|---------|-------|
| Primary Color | Dark Navy `#1E2A38` |
| Accent Color | Orange `#F57C00` |
| Highlight | Cyan `#00BCD4` |
| Heading Font | Montserrat |
| Body Font | Open Sans |
| Mono Font | Roboto Mono |
| Layout | Responsive, mobile-friendly |

---

## ✏️ Customization

To update content, open `index.html` in any text editor (VS Code, Notepad++, etc.) and search for the section you want to edit.

### Update contact details
Search for `jayepahilanga@gmail.com` or `+63 950 326 9056` and replace with new info.

### Update the photo
The photo is embedded as a base64 string. To replace it:
1. Convert your new photo to base64 (use [base64.guru](https://base64.guru))
2. Find `data:image/jpeg;base64,` in the HTML
3. Replace the base64 string that follows

### Add new sections
Insert new `<section>` blocks between existing ones following the same pattern.

---

## 📞 Contact

**Jay E. Pahilanga**
- 📧 jayepahilanga@gmail.com
- 📱 WhatsApp: +63 950 326 9056
- 🔗 [LinkedIn](https://www.linkedin.com/in/jay-pahilanga-1a37453b0)
- 🇵🇭 Philippines — Available for Remote Work

---

*Built with HTML, CSS, and vanilla JavaScript. No frameworks or build tools required.*
