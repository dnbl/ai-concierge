# IE Vehicle Concierge - Component Library

## 🎯 **Overview**

This document outlines the comprehensive component library for the IE Vehicle Concierge application, following atomic design principles and accessibility best practices.

## 🏗️ **Atomic Design Structure**

### **Atoms** - Basic building blocks
- **PersonalizedGreeting** - Time-aware, personalized greeting component
- **QuickActionButton** - Interactive action button with icon and description
- **AccessibleButton** - Enhanced button with full accessibility support
- **AccessibleInput** - Form input with validation and accessibility features
- **LoadingStates** - Various loading indicators (skeleton, spinner, progress)
- **Toast** - Notification system with priority levels
- **ErrorBoundary** - Error catching and recovery component

### **Molecules** - Simple combinations of atoms
- **QuickActionGrid** - Grid layout for action buttons (2-4 columns)
- **WelcomeHero** - Hero section with greeting and quick actions
- **SmartInput** - Enhanced input with voice, attachment, and send capabilities
- **MessageLoading** - Specialized loading state for chat messages
- **SkeletonLoader** - Content placeholder during loading

### **Organisms** - Complex UI components
- **WelcomeScreen** - Complete welcome experience
- **ChatWindow** - Message display and interaction
- **FleetView** - Vehicle fleet management interface
- **ServiceHistoryView** - Service record display
- **VehicleDetailsView** - Detailed vehicle information

## 🎨 **Design Tokens**

### **Colors**
```css
/* Primary Colors */
--color-primary: #06b6d4;        /* Cyan-500 */
--color-primary-hover: #0891b2;  /* Cyan-600 */
--color-primary-light: #67e8f9;  /* Cyan-300 */
--color-primary-dark: #0e7490;   /* Cyan-700 */

/* Secondary Colors */
--color-secondary: #374151;      /* Gray-700 */
--color-secondary-hover: #4b5563; /* Gray-600 */

/* Status Colors */
--color-success: #10b981;        /* Emerald-500 */
--color-warning: #f59e0b;        /* Amber-500 */
--color-error: #ef4444;          /* Red-500 */
--color-info: #3b82f6;           /* Blue-500 */
```

### **Typography**
```css
/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### **Spacing**
```css
/* Spacing Scale */
--space-px: 1px;
--space-0: 0;
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
```

## 🧩 **Component Specifications**

### **PersonalizedGreeting**
```typescript
interface PersonalizedGreetingProps {
  className?: string;
  showTimeBased?: boolean;
  showLastVisit?: boolean;
}
```

**Features:**
- Time-aware greetings (morning/afternoon/evening)
- Personalized with user name
- Optional last visit information
- Responsive typography

**Usage:**
```tsx
<PersonalizedGreeting 
  showTimeBased={true}
  showLastVisit={true}
  className="mb-8"
/>
```

### **QuickActionButton**
```typescript
interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}
```

**Features:**
- Icon and text combination
- Multiple size variants
- Hover and focus states
- Full accessibility support
- Loading states

**Usage:**
```tsx
<QuickActionButton
  icon={<CarIcon />}
  label="Fleet"
  description="View your vehicles"
  onClick={() => handleFleetClick()}
  variant="secondary"
  size="md"
/>
```

### **QuickActionGrid**
```typescript
interface QuickActionGridProps {
  actions: QuickAction[];
  columns?: 2 | 3 | 4;
  variant?: 'grid' | 'list' | 'carousel';
  className?: string;
}
```

**Features:**
- Responsive grid layout
- Multiple display variants
- Accessibility support
- Mobile-optimized

**Usage:**
```tsx
<QuickActionGrid
  actions={quickActions}
  columns={3}
  variant="grid"
  className="max-w-2xl mx-auto"
/>
```

### **WelcomeHero**
```typescript
interface WelcomeHeroProps {
  className?: string;
  showQuickActions?: boolean;
  quickActions?: QuickAction[];
  onActionClick?: (actionId: string) => void;
  variant?: 'default' | 'minimal' | 'featured';
}
```

**Features:**
- Personalized greeting integration
- Quick action grid
- Multiple visual variants
- Responsive design
- Accessibility compliance

**Usage:**
```tsx
<WelcomeHero
  showQuickActions={true}
  onActionClick={handleActionClick}
  variant="featured"
  className="mb-12"
/>
```

### **SmartInput**
```typescript
interface SmartInputProps {
  placeholder?: string;
  onSend: (message: string) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  onAttachmentClick?: () => void;
  showAttachments?: boolean;
  showVoice?: boolean;
  disabled?: boolean;
  className?: string;
}
```

**Features:**
- Text input with send functionality
- Voice recording capability
- File attachment support
- Keyboard navigation
- Loading states
- Accessibility features

**Usage:**
```tsx
<SmartInput
  placeholder="Ask anything"
  onSend={handleSendMessage}
  onVoiceStart={handleVoiceStart}
  onVoiceEnd={handleVoiceEnd}
  onAttachmentClick={handleAttachmentClick}
  showAttachments={true}
  showVoice={true}
/>
```

### **WelcomeScreen**
```typescript
interface WelcomeScreenProps {
  onActionClick: (action: string) => void;
  onSendMessage: (message: string) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  onAttachmentClick?: () => void;
  className?: string;
}
```

**Features:**
- Complete welcome experience
- Hero section with quick actions
- Smart input integration
- Responsive layout
- Accessibility compliance

**Usage:**
```tsx
<WelcomeScreen
  onActionClick={handleActionClick}
  onSendMessage={handleSendMessage}
  onVoiceStart={handleVoiceStart}
  onVoiceEnd={handleVoiceEnd}
  onAttachmentClick={handleAttachmentClick}
  className="flex-1"
/>
```

## ♿ **Accessibility Features**

### **Keyboard Navigation**
- Full keyboard support for all interactive elements
- Tab order management
- Focus indicators
- Keyboard shortcuts

### **Screen Reader Support**
- ARIA labels and descriptions
- Live regions for dynamic content
- Semantic HTML structure
- Screen reader announcements

### **Visual Accessibility**
- High contrast mode support
- Reduced motion preferences
- Focus management
- Color contrast compliance

## 📱 **Responsive Design**

### **Breakpoints**
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### **Responsive Patterns**
- Mobile-first design approach
- Flexible grid systems
- Adaptive typography
- Touch-friendly interactions

## 🎨 **Visual Design Principles**

### **Consistency**
- Unified visual language
- Consistent spacing and typography
- Standardized color usage
- Cohesive interaction patterns

### **Hierarchy**
- Clear information architecture
- Visual weight distribution
- Content prioritization
- Progressive disclosure

### **Feedback**
- Loading states
- Success/error notifications
- Hover and focus states
- Progress indicators

## 🚀 **Performance Considerations**

### **Optimization Strategies**
- Lazy loading for components
- Memoization for expensive operations
- Virtual scrolling for large lists
- Image optimization

### **Bundle Size**
- Tree shaking support
- Code splitting
- Minimal dependencies
- Efficient imports

## 🧪 **Testing Strategy**

### **Unit Testing**
- Component behavior testing
- Props validation
- Event handling
- State management

### **Integration Testing**
- Component interaction testing
- User flow testing
- API integration
- Error handling

### **Accessibility Testing**
- Screen reader testing
- Keyboard navigation testing
- Color contrast validation
- WCAG compliance

## 📚 **Usage Guidelines**

### **Best Practices**
1. **Consistency** - Use components as intended
2. **Accessibility** - Always provide proper labels
3. **Performance** - Optimize for speed and efficiency
4. **Responsiveness** - Test across all device sizes
5. **Documentation** - Document custom implementations

### **Common Patterns**
- Always wrap interactive elements in accessible containers
- Use semantic HTML elements
- Provide fallbacks for loading states
- Implement proper error boundaries
- Follow the established design tokens

### **Anti-Patterns**
- Don't override component styles without good reason
- Avoid hardcoded values - use design tokens
- Don't skip accessibility features
- Avoid complex nested component structures
- Don't ignore responsive design requirements

---

This component library provides a solid foundation for building consistent, accessible, and performant user interfaces while maintaining the flexibility to adapt to future requirements.



