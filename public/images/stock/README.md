# Stock Images Directory

This directory contains stock images for the Lesotho eGov Portal website.

## Directory Structure

```
public/images/stock/
├── hero/          # Hero section background images
├── ministries/    # Ministry and agency related images
├── services/      # Government services illustrations
├── news/          # News and updates images
├── cultural/      # Lesotho cultural and heritage images
└── general/       # General purpose images
```

## Usage in Code

To use these images in your components:

```jsx
// For Next.js Image component
import Image from 'next/image'

<Image 
  src="/images/stock/hero/lesotho-mountains.jpg" 
  alt="Description" 
  width={800} 
  height={400}
/>

// For regular img tags
<img src="/images/stock/cultural/basotho-blanket.jpg" alt="Traditional Basotho blanket" />
```

## Recommended Image Types

- **Hero**: Lesotho landscapes, government buildings, mountains
- **Ministries**: Government office buildings, service centers
- **Services**: People using digital services, documents, ID cards
- **News**: Government events, officials, announcements
- **Cultural**: Traditional Basotho culture, heritage sites, crafts
- **General**: Citizens, families, modern Lesotho life

## File Naming Convention

Use descriptive, lowercase names with hyphens:
- `lesotho-mountains-sunrise.jpg`
- `government-building-maseru.jpg`
- `traditional-basotho-hat.jpg`