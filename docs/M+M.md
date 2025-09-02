Minale+Mann Website Documentation
This document deconstructs the design, animations, and interactive elements of the Minale+Mann website (minaleandmann.com) for replication purposes.

1. Global Elements & Styles
These are the foundational components and styles that define the site's overall look and feel.

1.1. Color Palette
The theme is minimalist and monochromatic, creating a sophisticated and professional feel.

Primary Background: A very dark, near-black charcoal.

#121212

Primary Text & UI Elements: An off-white, light gray.

#C8C8C8

Hover/Active State: Pure white.

#FFFFFF

Loading Screen Background: Pure white.

#FFFFFF

Loading Screen Logo: A mid-gray.

#B4B4B4

1.2. Typography
A modern, clean, sans-serif font is used throughout the site for a contemporary and readable experience.

Font Family: Neue Haas Grotesk Display Pro (with fallbacks to standard sans-serif fonts).

Headings (e.g., "Design Matters", "Core Values"): Light weight, large size, significant letter-spacing.

Body Text (e.g., project descriptions): Light weight, comfortable reading size, generous line height (~1.5em).

Navigation/UI Text: Medium weight, all-caps for some labels, with distinct letter-spacing.

1.3. Loading Animation
This animation sequence is used for the initial site load and for transitions between pages. It provides a smooth, branded entry/exit point for content.

Initial State: A completely white screen (#FFFFFF).

Logo Fade-in: The "MM" monogram logo fades in slowly in the center of the screen (color #B4B4B4).

Text Fade-in: The full "MINALE + MANN" name fades in below the monogram.

Full Fade-out: The entire logo and text combination fades out smoothly.

Content Fade-in: The page content (whether it's the homepage or a project page) fades in from black.

The entire sequence is fluid and lasts approximately 2-3 seconds.

1.4. Custom Mouse Cursor
The site replaces the default system cursor with a custom one, which is a key part of the interactive experience.

Default State: A small, solid white circle (~10px in diameter). It follows the mouse position with a slight, smooth delay (easing or interpolation), making it feel fluid.

Link Hover State: When hovering over any clickable link (navigation, text links), the cursor morphs into a larger, hollow white circle (~30px in diameter) with a thick stroke.

Image/Project Hover State: When hovering over a main project image on the homepage or portfolio page, the cursor expands into the large hollow circle, but with the word "VIEW" appearing inside it.

Drag State (Homepage): When on the main homepage scroll container, the cursor expands to the large hollow circle and contains either left/right arrows or the word "DRAG" to indicate the horizontal scrolling interaction.

1.5. Header & Navigation
The header is minimal, containing only the company name/logo and the menu trigger.

Logo: The "MINALE + MANN" text is in the top-left corner. It serves as a link to the homepage.

Menu Trigger: A three-line "hamburger" icon is in the top-right corner.

Animation: On click, the three lines elegantly animate into an "X" shape to signify "close." The animation is smooth, with the top and bottom lines rotating to form the 'X' while the middle line fades out.

Behavior: The header is sticky and remains fixed at the top of the viewport during vertical scrolling on interior pages.

2. Main Navigation Overlay
Clicking the menu icon triggers a full-screen overlay.

Background: A semi-transparent black overlay covers the entire page, dimming the content behind it.

Animation: The overlay and the menu links don't just appear; they fade and slide in from the left, creating a graceful entrance.

Layout:

The primary navigation links (Services, Portfolio, About, Contact) are listed vertically on the left.

Hovering over a primary link that has sub-pages (like Services or Portfolio) triggers a secondary menu to appear to its right.

A thin vertical line animates in, drawing itself from top to bottom, to separate the primary and secondary menu items.

Hover Effects:

Menu items transition from the default off-white (#C8C8C8) to pure white (#FFFFFF) on hover.

The sub-menu items for the hovered category fade and slide in from the left with a subtle stagger effect (they appear one after the other very quickly).

3. Homepage / Portfolio Grid
The homepage is a highly interactive, horizontally-scrolling showcase of projects.

Scrolling Mechanic:

The page scrolls horizontally, not vertically.

This can be controlled by the mouse wheel (scroll down = scroll right, scroll up = scroll left) or by clicking and dragging.

A custom, thin white scrollbar is visible at the very bottom of the page to indicate progress.

Image Cards:

Projects are presented as large, nearly full-height image cards.

Scroll Animation: As you scroll, the images have two distinct effects:

Parallax: The images move at a slightly slower rate than the scroll speed, creating a sense of depth.

Skew Transformation: The images apply a transform: skewX() CSS property that is dynamically tied to the velocity of the scroll. When scrolling quickly, the images skew more, and they settle back to a neutral state when the scrolling stops. This adds a dramatic, fluid feel to the interaction.

Text Overlay:

The project title and category (e.g., "Cannon Place", "Residential") are displayed over the bottom-left of each image.

This text fades in as the image card becomes more centered in the viewport.

Interaction: Clicking on any project card (when the "VIEW" cursor is visible) transitions the user to that specific project's detail page, triggering the global loading animation.

4. Project Detail Pages
These pages feature a traditional vertical scroll but are rich with micro-interactions and high-quality media.

Layout: A long-form page combining full-width images, text blocks, image galleries (e.g., two images side-by-side), and technical drawings.

"Reveal on Scroll" Animations: As the user scrolls down, elements animate into view.

Images and text blocks fade in and slightly slide up from the bottom as they enter the viewport. This is a common and elegant way to guide the user's focus.

Image Behavior: Images are crisp and high-resolution. Some may have a very subtle "Ken Burns" effect (slow zoom) or a slight parallax effect as you scroll past them.

Architectural Plan Viewer:

Some projects display floor plans.

There is a simple UI, often in a corner (e.g., top left), with buttons like "VIEW 1", "VIEW 2" etc., allowing the user to switch between the images of different floor plans.

Navigation: At the bottom of a project page, there's typically a "Next Project" section with a background image of the upcoming project, encouraging continuous browsing.

5. Other Pages (About, Contact)
About Page:

Follows the vertical scroll and "reveal on scroll" animation pattern.

Features text blocks describing the studio's philosophy, core values, and team.

Includes a section with logos of publications they've been featured in (Grand Designs, Home & Decor, etc.). These logos are subtly animated, fading in on scroll.

Contact Page:

A clean and simple layout.

Includes contact details (address, email) and a contact form.

The form fields are minimalist, with placeholder text that moves up to become the label when a field is focused (a common, effective UX pattern).

The submit button has a simple hover effect, likely changing from an outline to a solid fill or vice-versa.

6. Sound Design
There is no audible feedback on the website. The entire experience is silent. This is a deliberate design choice that complements the calm, sophisticated, and minimalist aesthetic, allowing the visuals and interactions to take center stage.