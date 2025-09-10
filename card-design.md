import React, { useState } from 'react';

const CrystalCard = ({ suit, value, style, onPress, isSelected = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSuitSymbol = (suit) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  const getSuitGradient = (suit) => {
    switch (suit) {
      case 'hearts': 
        return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 50%, #dc2626 100%)';
      case 'diamonds': 
        return 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)';
      case 'clubs': 
        return 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)';
      case 'spades': 
        return 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #000000 100%)';
      default: return '#ffffff';
    }
  };

  const getCardGradient = () => {
    return `linear-gradient(135deg, 
      rgba(255,255,255,0.95) 0%, 
      rgba(240,248,255,0.9) 25%,
      rgba(219,234,254,0.85) 50%,
      rgba(191,219,254,0.9) 75%,
      rgba(255,255,255,0.95) 100%)`;
  };

  const getDisplayValue = (value) => {
    switch (value) {
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return value.toString();
    }
  };

  const cardStyle = {
    width: '80px',
    height: '112px',
    background: getCardGradient(),
    backdropFilter: 'blur(20px)',
    border: '3px solid rgba(255,255,255,0.8)',
    borderRadius: '12px',
    boxShadow: isHovered || isSelected
      ? `0 25px 50px rgba(0,0,0,0.5), 
         0 15px 35px rgba(0,0,0,0.3),
         inset 0 4px 8px rgba(255,255,255,0.9),
         inset 0 -2px 4px rgba(0,0,0,0.1),
         0 0 30px rgba(255,255,255,0.4)`
      : `0 15px 30px rgba(0,0,0,0.4), 
         0 8px 20px rgba(0,0,0,0.2),
         inset 0 2px 4px rgba(255,255,255,0.8),
         inset 0 -1px 2px rgba(0,0,0,0.05)`,
    transform: isHovered 
      ? 'translateY(-8px) scale(1.05) rotateX(5deg)' 
      : isSelected 
        ? 'translateY(-4px) scale(1.02)' 
        : 'translateY(0px)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    position: 'absolute',
    overflow: 'hidden',
    ...style
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPress}
    >
      {/* Crystalline shine effect */}
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `linear-gradient(45deg, 
            transparent 30%, 
            rgba(255,255,255,0.3) 50%, 
            transparent 70%)`,
          transform: isHovered ? 'translateX(100%) translateY(100%)' : 'translateX(-100%) translateY(-100%)',
          transition: 'transform 0.8s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Holographic border effect */}
      <div 
        style={{
          position: 'absolute',
          inset: '1px',
          borderRadius: '10px',
          background: `linear-gradient(135deg, 
            rgba(255,255,255,0.1) 0%, 
            rgba(59,130,246,0.1) 25%,
            rgba(147,51,234,0.1) 50%,
            rgba(236,72,153,0.1) 75%,
            rgba(255,255,255,0.1) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Top left corner */}
      <div 
        style={{
          position: 'absolute',
          top: '6px',
          left: '6px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 3,
        }}
      >
        <span 
          style={{
            background: getSuitGradient(suit),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '14px',
            fontWeight: '900',
            fontFamily: 'system-ui',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            lineHeight: '1',
          }}
        >
          {getDisplayValue(value)}
        </span>
        <span 
          style={{
            background: getSuitGradient(suit),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '18px',
            fontWeight: '900',
            lineHeight: '1',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
          }}
        >
          {getSuitSymbol(suit)}
        </span>
      </div>

      {/* Center symbol with 3D effect */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
      >
        <span 
          style={{
            background: getSuitGradient(suit),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: value === 1 || value >= 11 ? '32px' : '28px',
            fontWeight: '900',
            filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.4)) 
                     drop-shadow(0 0 10px rgba(59,130,246,0.3))`,
            transform: isHovered ? 'scale(1.1) rotateY(10deg)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          {value === 1 || value >= 11 ? getSuitSymbol(suit) : getSuitSymbol(suit)}
        </span>
      </div>

      {/* Bottom right corner (rotated) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '6px',
          right: '6px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          transform: 'rotate(180deg)',
          zIndex: 3,
        }}
      >
        <span 
          style={{
            background: getSuitGradient(suit),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '14px',
            fontWeight: '900',
            fontFamily: 'system-ui',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            lineHeight: '1',
          }}
        >
          {getDisplayValue(value)}
        </span>
        <span 
          style={{
            background: getSuitGradient(suit),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '18px',
            fontWeight: '900',
            lineHeight: '1',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
          }}
        >
          {getSuitSymbol(suit)}
        </span>
      </div>

      {/* Prismatic edge lighting */}
      <div 
        style={{
          position: 'absolute',
          inset: '0',
          borderRadius: '12px',
          background: `conic-gradient(from 0deg, 
            transparent, 
            rgba(59,130,246,0.1), 
            rgba(147,51,234,0.1), 
            rgba(236,72,153,0.1), 
            rgba(59,130,246,0.1), 
            transparent)`,
          opacity: isHovered ? 0.6 : 0.2,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const CrystalizedCardDeck = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const premiumCards = [
    { suit: 'diamonds', value: 2 },
    { suit: 'diamonds', value: 6 },
    { suit: 'hearts', value: 10 },
    { suit: 'diamonds', value: 1 }, // Ace
    { suit: 'clubs', value: 6 },
    { suit: 'clubs', value: 9 },
    { suit: 'clubs', value: 1 }, // Ace
    { suit: 'hearts', value: 8 },
    { suit: 'hearts', value: 13 }, // King
    { suit: 'clubs', value: 3 },
    { suit: 'clubs', value: 4 },
    { suit: 'clubs', value: 9 },
    { suit: 'spades', value: 11 }, // Jack
  ];

  const handleCardPress = (card, index) => {
    setSelectedCard(selectedCard === index ? null : index);
    console.log(`Premium card selected: ${card.value} of ${card.suit}`);
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 20%, rgba(59,130,246,0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(147,51,234,0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(236,72,153,0.2) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Premium Game Board */}
      <div 
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(16,185,129,0.95) 0%, 
              rgba(5,150,105,0.9) 25%,
              rgba(4,120,87,0.85) 50%,
              rgba(6,95,70,0.9) 75%,
              rgba(16,185,129,0.95) 100%)
          `,
          backdropFilter: 'blur(30px)',
          borderRadius: '24px',
          padding: '2rem',
          width: '900px',
          height: '560px',
          boxShadow: `
            0 25px 50px rgba(0,0,0,0.5),
            0 15px 35px rgba(0,0,0,0.3),
            inset 0 2px 4px rgba(255,255,255,0.2),
            0 0 60px rgba(16,185,129,0.3)
          `,
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background pattern */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)
            `,
            animation: 'float 6s ease-in-out infinite',
          }}
        />

        {/* Top Status Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                fontWeight: '900',
                boxShadow: '0 8px 20px rgba(59,130,246,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              0
            </div>
            <div 
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                fontWeight: '900',
                boxShadow: '0 8px 20px rgba(220,38,38,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              0
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>2</span>
            <div 
              style={{
                width: '2rem',
                height: '2rem',
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(220,38,38,0.3)',
              }}
            />
            <span style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>200</span>
          </div>
        </div>

        {/* Center Card */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <CrystalCard suit="clubs" value={2} style={{ position: 'relative' }} />
        </div>

        {/* Premium Rules Display */}
        <div 
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(20px)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            textAlign: 'center',
            marginBottom: '2rem',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <p style={{ fontWeight: '900', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            Rules: Reach 500 to WIN. -200 to lose.
          </p>
          <p style={{ fontWeight: '600' }}>NIL: 100 pts</p>
        </div>
      </div>

      {/* Premium Card Hand */}
      <div style={{ marginTop: '2rem', position: 'relative', width: '900px', height: '140px' }}>
        <div style={{ position: 'relative', height: '100%' }}>
          {premiumCards.map((card, index) => {
            const overlap = 35; // Slightly more overlap for premium effect
            const leftPosition = index * overlap;
            
            return (
              <CrystalCard
                key={`${card.suit}-${card.value}-${index}`}
                suit={card.suit}
                value={card.value}
                isSelected={selectedCard === index}
                onPress={() => handleCardPress(card, index)}
                style={{
                  left: `${leftPosition}px`,
                  zIndex: selectedCard === index ? 1000 : index,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Premium Instructions */}
      <div 
        style={{
          marginTop: '2rem',
          textAlign: 'center',
          color: 'white',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <p style={{ fontWeight: '900', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
          ✨ Crystallized HD Card Collection ✨
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          Premium glassmorphic design with holographic effects
        </p>
        <p>Hover and click cards to experience the luxury interactions</p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default CrystalizedCardDeck;