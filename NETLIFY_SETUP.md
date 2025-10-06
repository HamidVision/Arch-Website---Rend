# Netlify Deployment Setup Guide

## ✅ Completed Configuration

### 1. **Netlify Configuration File (`netlify.toml`)**
- ✅ Build command: `npm run build`
- ✅ Publish directory: `out`
- ✅ Node version: 18
- ✅ Security headers configured
- ✅ Caching rules optimized
- ✅ SPA redirect rules enabled

### 2. **Next.js Configuration Updated**
- ✅ Netlify environment detection added
- ✅ BasePath disabled for Netlify (only used for GitHub Pages)
- ✅ Static export maintained

### 3. **Files Cleaned Up**
- ✅ Removed `vercel.json`
- ✅ Created `.netlifyignore`
- ✅ Documentation updated

## 🔍 What to Check Now

### A. **Test Your Deployed Site**

Visit your Netlify URL and test these pages:

1. **Homepage** (`/`)
   - [ ] Hero image loads correctly
   - [ ] Portfolio overlay opens and closes
   - [ ] All project tiles are visible

2. **Project Pages**
   - [ ] `/design-philosophy` - Design philosophy page
   - [ ] `/graduate-projects` - Graduate projects grid
   - [ ] `/graduate-projects/momentum-hub` - Individual project
   - [ ] `/graduate-projects/the-nook` - Individual project
   - [ ] `/graduate-projects/wellness-bazaar` - Individual project
   - [ ] `/undergrad-projects` - Undergrad projects grid
   - [ ] `/undergrad-projects/site-analysis` - Individual project
   - [ ] `/undergrad-projects/border-crossing` - Individual project
   - [ ] `/undergrad-projects/congregation-center` - Individual project

3. **Coming Soon Pages**
   - [ ] `/computer-science` - Computer Science Coming Soon
   - [ ] `/research-papers` - Research Papers Coming Soon

4. **Other Pages**
   - [ ] `/about` - About page
   - [ ] `/contact` - Contact page

### B. **Check Navigation**

- [ ] Header logo links back to home
- [ ] Portfolio button toggles overlay correctly
- [ ] All navigation links work without errors
- [ ] Back buttons work on project pages
- [ ] Direct URL navigation works (type URL in browser)

### C. **Check Assets**

- [ ] All images load correctly
- [ ] Fonts render properly
- [ ] Videos play (if any)
- [ ] Icons display correctly

### D. **Performance Checks**

- [ ] Page load speed is fast
- [ ] Animations work smoothly
- [ ] No console errors in browser dev tools
- [ ] Mobile responsive design works

## 🔧 Common Issues & Solutions

### Issue 1: 404 Errors on Page Refresh
**Solution:** Already configured in `netlify.toml` with redirect rules.

### Issue 2: Images Not Loading
**Possible causes:**
- Check image paths (should be relative from `/public`)
- Verify images are in the `out` directory after build

### Issue 3: Navigation Not Working
**Check:**
- Browser console for JavaScript errors
- Netlify deploy log for build warnings

### Issue 4: Styles Not Applied
**Check:**
- CSS files are in the `out/_next/static` directory
- No CORS issues in browser console

## 🚀 Next Steps (Optional)

### 1. **Custom Domain Setup**
In Netlify Dashboard:
1. Go to **Domain Settings**
2. Click **Add custom domain**
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Let's Encrypt)

### 2. **Form Handling Setup**
For your contact form:
1. Update your contact form HTML:
   ```html
   <form name="contact" method="POST" data-netlify="true">
     <input type="hidden" name="form-name" value="contact" />
     <!-- your form fields -->
   </form>
   ```
2. Netlify will automatically handle form submissions
3. Configure form notifications in Netlify Dashboard

### 3. **Environment Variables**
If you need environment variables:
1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add your variables
3. Redeploy

### 4. **Analytics Setup**
Enable Netlify Analytics:
1. Go to **Analytics** tab in Netlify Dashboard
2. Enable analytics (paid feature)
3. Or integrate Google Analytics for free

### 5. **Deploy Previews**
Netlify automatically creates preview deployments for pull requests!

### 6. **Performance Optimization**
Already configured:
- ✅ Asset compression enabled
- ✅ Caching headers set
- ✅ Image optimization (unoptimized for static export)

## 📊 Monitoring

### Check Deployment Status
- **Netlify Dashboard**: See all deployments and logs
- **Deploy Log**: Check for any warnings or errors
- **Functions Log**: (if you add serverless functions later)

### Analytics
- **Netlify Analytics**: Visitor data (paid)
- **Google Analytics**: Free alternative

## 🐛 Troubleshooting Commands

If you need to test locally with Netlify CLI:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link your site
netlify link

# Test build locally
netlify build

# Test site locally with Netlify environment
netlify dev

# Deploy manually
netlify deploy --prod
```

## 📝 Important Notes

1. **Build Time**: Your site builds in ~1-2 minutes on Netlify
2. **Deploy Frequency**: Every push to `main` triggers auto-deploy
3. **Rollback**: You can rollback to any previous deployment in Netlify Dashboard
4. **Bandwidth**: Free tier includes 100GB/month (plenty for a portfolio)
5. **Build Minutes**: Free tier includes 300 build minutes/month

## ✨ What You Get with Netlify

Compared to GitHub Pages, you now have:
- ✅ Faster global CDN
- ✅ Better security headers
- ✅ Form handling capability
- ✅ Deploy previews for pull requests
- ✅ Easy custom domain setup
- ✅ Better analytics options
- ✅ Serverless function support (if needed)
- ✅ Edge functions (if needed)

## 🔗 Useful Links

- **Netlify Dashboard**: https://app.netlify.com
- **Netlify Docs**: https://docs.netlify.com
- **Next.js + Netlify**: https://docs.netlify.com/frameworks/next-js/
- **Deploy Logs**: Check in your Netlify Dashboard

---

## Need Help?

If you encounter any issues:
1. Check the Netlify deploy log
2. Check browser console for errors
3. Verify all files are in the `out` directory after build
4. Test locally with `npm run build` and check the `out` folder

**Your site should now be live and working perfectly on Netlify! 🎉**

