# Project RHU: Casino Card Game - React Native Development Plan

## 1. Project Overview

**Project:** Casino Card Game Mobile App
**Platform:** React Native with Expo
**Objective:** Create a fully functional, real-time multiplayer Casino card game for mobile devices

### Game Specifications
- **Game Type:** Casino (2-player card game)
- **Objective:** Score points by capturing cards through strategic plays
- **Rounds:** 2 rounds per game
- **Scoring:** Cards captured, Spades, Big/Little Casino, Aces

### Game Modes
1. **Play vs CPU:** Single-player mode against AI opponent
2. **2 Person Multiplayer:** Local multiplayer for 2 players on same device
3. **Player Invite:** Online multiplayer with friend invitations

### Unified Game Layout
All game modes share the same core interface components:
- **GameBoard:** Central playing area with table cards and staging stack
- **PlayerHand:** Current player's card display (top/bottom positioning)
- **OpponentArea:** Opponent's captured cards and hand indicator
- **ControlPanel:** Confirm/Cancel buttons and game status
- **ScoreDisplay:** Real-time scoring for both players

**Mode-Specific Adaptations:**
- **CPU Mode:** Opponent area shows AI difficulty and thinking indicator
- **Local Multiplayer:** Turn-based handoff with device swap prompts
- **Online Mode:** Real-time opponent moves with connection status

### Core Features
- **Unified Layout:** Same game interface across all modes
- **Drag & Drop Interface:** Intuitive card manipulation system
- **Staging Stack:** Temporary card assembly for complex moves
- **Building System:** Create and modify card builds on the table
- **Real-time Multiplayer:** Socket.IO integration for online gameplay
- **AI Opponent:** Intelligent CPU player for single-player mode
- **Local Multiplayer:** Pass-and-play for 2 players on one device
- **Invitation System:** Send and receive game invites from friends
- **Cross-platform:** iOS and Android support via Expo

## 2. React Native Architecture

### Technology Stack
- **Framework:** React Native 0.79.6
- **Build Tool:** Expo SDK 53
- **Navigation:** Expo Router (file-based routing)
- **State Management:** React Context + useReducer
- **Real-time:** Socket.IO client
- **Animations:** React Native Reanimated
- **Drag & Drop:** React Native Gesture Handler + Reanimated
- **Styling:** StyleSheet with theme support

### Architectural Principles
- **Modular Game Logic:** Pure functions in dedicated modules
- **Immutable State:** All state updates create new objects
- **Component Composition:** Reusable, focused components
- **Separation of Concerns:** Game logic separate from UI logic

## 3. File Structure

```
casino-game/
├── app/                          # Expo Router pages
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Home screen / Game mode selection
│   ├── (tabs)/                  # Tab navigation
│   │   ├── _layout.tsx
│   │   ├── game.tsx            # Main game screen (unified)
│   │   ├── lobby.tsx           # Online game lobby
│   │   ├── friends.tsx         # Friends list for invites
│   │   └── profile.tsx         # Player profile
│   ├── game/                   # Game-specific screens
│   │   ├── [gameId].tsx       # Dynamic online game room
│   │   ├── cpu.tsx            # CPU opponent game
│   │   ├── local.tsx          # Local multiplayer game
│   │   ├── create.tsx         # Create new online game
│   │   └── invite.tsx         # Game invitation screen
│   └── settings.tsx           # App settings
├── components/                 # Reusable components
│   ├── ui/                    # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Toast.tsx
│   ├── game/                  # Game-specific components
│   │   ├── GameBoard.tsx
│   │   ├── PlayerHand.tsx
│   │   ├── TableArea.tsx
│   │   ├── CardStack.tsx
│   │   ├── BuildZone.tsx
│   │   └── StagingArea.tsx
│   └── layout/                # Layout components
│       ├── Header.tsx
│       ├── TabBar.tsx
│       └── SafeAreaView.tsx
├── hooks/                     # Custom hooks
│   ├── useGameState.ts       # Game state management
│   ├── useGameActions.ts     # Game action handlers
│   ├── useSocket.ts          # Socket.IO integration
│   ├── useDragDrop.ts        # Drag & drop logic
│   ├── useNotifications.ts   # Toast notifications
│   ├── useAI.ts              # CPU opponent logic
│   ├── useLocalGame.ts       # Local multiplayer state
│   ├── useInvitations.ts     # Game invitation management
│   └── useGameMode.ts        # Game mode switching logic
├── contexts/                 # React contexts
│   ├── GameContext.tsx       # Game state context
│   ├── AuthContext.tsx       # User authentication
│   ├── ThemeContext.tsx      # App theming
│   └── GameModeContext.tsx   # Game mode management (CPU/Local/Online)
├── services/                 # External services
│   ├── socketService.ts      # Socket.IO client
│   ├── gameService.ts        # Game API calls
│   ├── storageService.ts     # Local storage
│   ├── aiService.ts          # CPU opponent AI logic
│   └── invitationService.ts  # Game invitation system
├── utils/                    # Utility functions
│   ├── gameLogic/           # Game logic modules
│   │   ├── index.ts
│   │   ├── gameState.ts
│   │   ├── cardOperations.ts
│   │   ├── validation.ts
│   │   ├── algorithms.ts
│   │   ├── scoring.ts
│   │   └── ai.ts            # AI decision algorithms
│   ├── gameModes/           # Game mode utilities
│   │   ├── cpuGame.ts       # CPU opponent logic
│   │   ├── localGame.ts     # Local multiplayer logic
│   │   └── onlineGame.ts    # Online game logic
│   ├── constants.ts          # App constants
│   ├── types.ts              # TypeScript types
│   └── helpers.ts            # Helper functions
├── assets/                   # Static assets
│   ├── images/
│   │   ├── cards/           # Card images
│   │   └── icons/
│   └── fonts/
├── constants/                # App constants
│   ├── Colors.ts
│   ├── Layout.ts
│   └── GameRules.ts
└── types/                    # TypeScript definitions
    ├── game.ts              # Game-related types
    ├── api.ts               # API types
    └── ui.ts                # UI component types
```

## 4. Development Tips & Tricks

### React Native Optimization
- **Use FlatList for large lists:** More performant than ScrollView for card lists
- **Memoize expensive calculations:** Use useMemo for game logic computations
- **Optimize images:** Use appropriate sizes and compress card images
- **Minimize bridge communication:** Batch state updates

### Performance Best Practices
- **Component memoization:** Use React.memo for components with stable props
- **Avoid unnecessary renders:** Use useCallback for event handlers
- **Image optimization:** Use Expo Image component with proper sizing
- **Bundle splitting:** Use dynamic imports for heavy components

### Development Workflow
- **Hot Reload:** Use Expo's fast refresh for instant updates
- **Debugging:** Use Flipper or React Native Debugger
- **Testing on device:** Use Expo Go for quick testing
- **Build variants:** Use different bundle IDs for dev/staging/prod

### Drag & Drop Implementation
- **Gesture Handler:** Use PanGestureHandler for smooth dragging
- **Reanimated:** Use shared values for 60fps animations
- **Collision detection:** Implement efficient hit testing for card drops
- **Feedback:** Provide haptic feedback and visual cues

## 5. Best Practices

### Code Quality
- **TypeScript:** Use strict typing for all game state and props
- **ESLint:** Configure rules for React Native best practices
- **Prettier:** Consistent code formatting
- **Component naming:** Use PascalCase for components, camelCase for files

### State Management
- **Single source of truth:** Keep game state in one place
- **Immutable updates:** Always create new state objects
- **Pure functions:** Game logic should be side-effect free
- **Context boundaries:** Split contexts by domain (auth, game, theme)

### Component Design
- **Single responsibility:** Each component should do one thing
- **Props interface:** Define clear prop types
- **Default props:** Provide sensible defaults
- **Accessibility:** Add accessibility labels and hints

### Game Logic
- **Pure functions:** All game rules as pure, testable functions
- **Validation:** Comprehensive move validation
- **Error handling:** Graceful handling of invalid states
- **Logging:** Debug-friendly state logging

### Testing Strategy
- **Unit tests:** Test game logic functions
- **Component tests:** Test UI components with React Testing Library
- **Integration tests:** Test complete game flows
- **E2E tests:** Use Detox for critical user journeys

## 6. Implementation Plan

### Phase 1: Foundation (Week 1-2)
1. **Project Setup**
   - Configure Expo with TypeScript
   - Set up navigation structure
   - Create basic component library
   - Implement theme system

2. **Core Game Logic**
   - Implement card data structures
   - Create game state management
   - Build basic game rules (deal, shuffle)
   - Add scoring system

3. **Basic UI Components**
   - Card component with animations
   - Player hand display
   - Table area layout
   - Basic game board

### Phase 2: Core Gameplay (Week 3-4)
1. **Drag & Drop System**
   - Implement PanGestureHandler
   - Create draggable cards
   - Add drop zones
   - Collision detection

2. **Game Actions**
   - Basic capturing mechanics
   - Trailing cards
   - Turn management
   - Move validation

3. **Staging Stack**
   - Temporary card assembly
   - Confirm/cancel actions
   - Visual feedback
   - Stack manipulation

### Phase 3: Advanced Features (Week 5-6)
1. **Building System**
   - Create builds from staging stack
   - Build ownership
   - Build modification
   - Auto-grouping logic

2. **Complex Moves**
   - Multi-card captures
   - Opponent card usage
   - Build stealing
   - Advanced validation

3. **UI Polish**
   - Smooth animations
   - Visual feedback
   - Error states
   - Loading states

### Phase 4: Game Modes Implementation (Week 7-8)
1. **CPU Opponent Mode**
   - AI decision algorithms
   - Difficulty levels (Easy, Medium, Hard)
   - Move delay simulation
   - CPU strategy patterns

2. **Local Multiplayer Mode**
   - Pass-and-play mechanics
   - Turn-based local gameplay
   - Device handoff logic
   - Local game state persistence

3. **Online Multiplayer Foundation**
   - Socket.IO integration
   - Real-time game state sync
   - Player connection management
   - Basic game room creation

### Phase 5: Advanced Multiplayer (Week 9-10)
1. **Invitation System**
   - Friend list management
   - Game invitation sending/receiving
   - Invitation status tracking
   - Push notifications for invites

2. **Online Game Features**
   - Player matchmaking
   - Online player presence
   - Game history and statistics
   - Real-time move broadcasting

3. **Cross-Mode Features**
   - Unified game board component
   - Mode-specific UI adaptations
   - Shared game logic validation
   - Consistent user experience

### Phase 5: Polish & Testing (Week 9-10)
1. **Performance Optimization**
   - Bundle size optimization
   - Animation performance
   - Memory management
   - Offline support

2. **Testing**
   - Unit test coverage
   - Integration tests
   - UI testing
   - Performance testing

3. **Final Polish**
   - Error boundaries
   - Crash reporting
   - Analytics
   - App store preparation

## 7. Timeline & Milestones

### Week 1: Foundation
- [ ] Expo project setup with TypeScript
- [ ] Navigation structure implemented
- [ ] Basic component library created
- [ ] Theme system configured

### Week 2: Core Logic
- [ ] Card data structures implemented
- [ ] Game state management working
- [ ] Basic game rules functional
- [ ] Scoring system operational

### Week 3: Basic Gameplay
- [ ] Drag & drop system working
- [ ] Card components animated
- [ ] Basic capturing implemented
- [ ] Turn management functional

### Week 4: Advanced Gameplay
- [ ] Staging stack system complete
- [ ] Complex move validation
- [ ] Visual feedback system
- [ ] Error handling robust

### Week 5: Building System
- [ ] Build creation from staging
- [ ] Build ownership tracking
- [ ] Build modification logic
- [ ] Auto-grouping implemented

### Week 6: UI/UX Polish
- [ ] Smooth animations throughout
- [ ] Comprehensive visual feedback
- [ ] Error states handled gracefully
- [ ] Loading states optimized

### Week 7: Game Modes - CPU & Local
- [ ] CPU AI algorithms implemented
- [ ] Difficulty levels configured
- [ ] Local multiplayer pass-and-play
- [ ] Game mode switching logic
- [ ] Unified game board component

### Week 8: Online Multiplayer Foundation
- [ ] Socket.IO integration complete
- [ ] Real-time synchronization
- [ ] Basic online game rooms
- [ ] Player connection handling
- [ ] Cross-mode compatibility

### Week 9: Advanced Features
- [ ] Invitation system implemented
- [ ] Friend list management
- [ ] Push notifications
- [ ] Game statistics tracking
- [ ] Performance optimizations

### Week 10: Polish & Testing
- [ ] All game modes fully tested
- [ ] UI consistency across modes
- [ ] End-to-end testing complete
- [ ] App store preparation
- [ ] Beta testing ready

## 8. Risk Mitigation

### Technical Risks
- **Performance:** Regular profiling and optimization reviews
- **Compatibility:** Test on multiple device sizes and OS versions
- **Real-time sync:** Robust error handling for network issues

### Development Risks
- **Scope creep:** Strict adherence to phase deliverables
- **Technical debt:** Regular code reviews and refactoring
- **Testing gaps:** Comprehensive test coverage requirements

### Success Metrics
- **Performance:** 60fps animations, <50MB bundle size
- **Reliability:** <1% crash rate, <5% network error rate
- **User Experience:** Intuitive drag & drop, clear visual feedback
- **Code Quality:** >80% test coverage, zero critical linting errors

## 9. Resources & Tools

### Development Tools
- **VS Code:** Primary IDE with React Native extensions
- **Expo CLI:** Development and build tool
- **Flipper:** Debugging and performance monitoring
- **React Native Debugger:** Advanced debugging

### Testing Tools
- **Jest:** Unit testing framework
- **React Testing Library:** Component testing
- **Detox:** End-to-end testing
- **TestFlight:** iOS beta testing

### Monitoring & Analytics
- **Sentry:** Error tracking and crash reporting
- **Firebase Analytics:** User behavior tracking
- **Performance monitoring:** Custom metrics

This comprehensive plan provides a structured approach to building a high-quality Casino card game for React Native. The modular architecture and phased implementation ensure maintainable code and iterative progress toward a polished final product.