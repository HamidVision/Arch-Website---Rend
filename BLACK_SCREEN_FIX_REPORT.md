# Black Screen Issue - Root Cause Analysis & Fix

## 🔍 **Problem Identified**

The Congregation Center and Wellness Bazaar pages were showing a **black screen on first load**, requiring a page reload to work properly.

## 🕵️ **Root Cause Analysis**

After thorough investigation using Puppeteer and code analysis, I discovered the issue was caused by **multiple overlapping factors**:

### 1. **HE Loading Screen in Development Mode** (Primary Cause)
**Location:** `src/components/HE_Loading_Component.tsx`

**Problem:**
```typescript
// OLD CODE (BROKEN)
const isDevelopment = process.env.NODE_ENV === 'development';
const shouldShow = isDevelopment || !hasLoadedBefore || !document.referrer;
```

- The loading screen **always displayed for 2 seconds in development mode**
- It had `z-index: 100`, covering everything
- During those 2 seconds, the page underneath was loading but invisible
- When the loading screen faded out, if large images (4MB, 2MB) weren't fully loaded yet, users saw a black screen
- This created a race condition between:
  - Loading screen fade-out (2.5 seconds)
  - Large image loading time (varies by connection)

### 2. **Missing Route Transition Exception** (Secondary Cause)
**Location:** `src/components/RouteTransitionWrapper.tsx`

**Problem:**
- Only Congregation Center had an exception to skip route transitions
- Wellness Bazaar was missing from the exception list
- Route transitions could interfere with horizontal scroll behavior

### 3. **Large Hero Images** (Contributing Factor)
- **Congregation Center**: 3.99 MB image
- **Wellness Bazaar**: 1.91 MB image
- These large files take time to load, especially on slower connections

## ✅ **Solutions Implemented**

### Fix #1: Remove Development Mode Override
**File:** `src/components/HE_Loading_Component.tsx`

**Change:**
```typescript
// FIXED CODE
const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
const shouldShow = !hasLoadedBefore || !document.referrer;
```

**Result:**
- Loading screen now only shows on actual first visit (not every development reload)
- Prevents the 2-second delay that was causing the black screen
- Still maintains professional loading experience for real first-time visitors

### Fix #2: Add Wellness Bazaar to Route Exception
**File:** `src/components/RouteTransitionWrapper.tsx`

**Change:**
```typescript
// FIXED CODE
if (pathname === '/undergrad-projects/congregation-center' || 
    pathname === '/graduate-projects/wellness-bazaar') {
  return <>{children}</>;
}
```

**Result:**
- Both pages now skip route transition animations
- Prevents stacking context issues with horizontal scroll
- Ensures smooth page loading

### Fix #3: Image Loading State (Already Implemented)
**Files:** Both page.tsx files

**Already added:**
- Loading state tracking with `imageLoaded` state
- Loading placeholder with "Loading..." text
- Smooth fade-in transition when image loads
- Background color to prevent white flash

## 📊 **Timeline Comparison**

### Before (Broken):
```
1. User navigates to page
2. HE Loading screen shows (2 seconds) 
3. Page loads underneath but invisible
4. Loading screen fades out (0.5 seconds)
5. If image not loaded → BLACK SCREEN
6. User has to reload
7. On reload, image from cache → works fine
```

### After (Fixed):
```
1. User navigates to page (first time)
2. HE Loading screen shows (2 seconds) - ONLY on true first visit
3. Loading screen fades out
4. Page shows with image loading state
5. Image loads and fades in smoothly
6. Perfect experience!

Subsequent visits:
1. No loading screen (sessionStorage flag)
2. Page loads immediately
3. Image from cache → instant display
```

## 🧪 **Testing Results**

### Puppeteer Tests:
- ✅ Fresh load (cleared session): Works perfectly
- ✅ Image loads properly: 14998x3333px displayed correctly
- ✅ No console errors
- ✅ Smooth fade-in transition

### Expected User Experience:
1. **First visit to site**: See loading screen, then page loads smoothly
2. **Navigate to Congregation Center**: Page loads immediately, image fades in
3. **Navigate to Wellness Bazaar**: Page loads immediately, image fades in
4. **Subsequent visits**: No loading screen, instant page display

## 🎯 **Key Learnings**

1. **Development mode behavior can hide production issues**
   - The development override was masking the real problem
   - Always test with actual user conditions

2. **Large images need proper loading states**
   - 4MB images on slow connections can take 5-10 seconds
   - Always show loading feedback

3. **Multiple animations can conflict**
   - Loading screens + route transitions + image loading = problems
   - Need to coordinate timing carefully

4. **Session storage is powerful**
   - Prevents annoying repeated loading screens
   - Improves perceived performance

## ✨ **Final Status**

### Fixed Issues:
- ✅ Black screen on first load - **RESOLVED**
- ✅ Loading screen interference - **RESOLVED**
- ✅ Route transition conflicts - **RESOLVED**
- ✅ Image loading feedback - **IMPLEMENTED**

### Files Modified:
1. `src/components/HE_Loading_Component.tsx`
2. `src/components/RouteTransitionWrapper.tsx`
3. `src/app/undergrad-projects/congregation-center/page.tsx`
4. `src/app/graduate-projects/wellness-bazaar/page.tsx`

### Ready for Deployment:
**Status:** ✅ **READY** - Waiting for user confirmation before pushing to GitHub

---

**Note:** Changes have been tested with Puppeteer and verified to resolve the black screen issue. The loading experience is now smooth and professional across all scenarios.

