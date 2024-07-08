import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
    background-color: #0a0a1a;
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AppContainer = styled.div`
  color: white;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  animation: ${gradientAnimation} 15s ease infinite;
  background-size: 400% 400%;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ff6b6b, #feca57, #48dbfb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 5s ease infinite;
  background-size: 200% auto;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #a0a0a0;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const BrainEmoji = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProgressBar = styled.div`
  width: 80%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  margin: 0 auto 2rem;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 20px;
  background: linear-gradient(to right, #ff6b6b, #feca57, #48dbfb);
  transition: width 0.5s ease-out;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: #fff;
  mix-blend-mode: difference;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const MemeSection = styled.section`
  margin-bottom: 4rem;
  background-color: ${props => props.bgColor || '#1f1f2e'};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(50px);
`;

const MemeContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MemeImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const MemeText = styled.div`
  flex: 1;
`;

const MemeTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #feca57;
`;

const MemeParagraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #d0d0d0;
`;

const Button = styled.button`
  background: linear-gradient(to right, #ff6b6b, #feca57);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 2rem auto 0;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
`;

const RandomThought = styled.div`
  position: absolute;
  font-size: ${props => props.size || '1rem'};
  color: ${props => props.color || 'rgba(255, 255, 255, 0.7)'};
  white-space: nowrap;
  pointer-events: none;
  font-weight: ${props => props.weight || 400};
  opacity: 0;
  transform: scale(0.5);
`;

const App = () => {
  const [brainLoad, setBrainLoad] = useState(0);
  const thoughts = [
    { text: "Why did I say that?", color: "#ff6b6b", size: "1.2rem", weight: 600 },
    { text: "Did I lock the door?", color: "#feca57", size: "1rem", weight: 400 },
    { text: "What's the meaning of life?", color: "#48dbfb", size: "1.4rem", weight: 700 },
    { text: "Is it Friday yet?", color: "#ff9ff3", size: "1.1rem", weight: 500 },
    { text: "Do fish get thirsty?", color: "#54a0ff", size: "1.3rem", weight: 600 },
    { text: "Did I turn off the stove?", color: "#5f27cd", size: "1.2rem", weight: 500 },
    { text: "What if plants have feelings?", color: "#ff6b6b", size: "1.1rem", weight: 400 },
    { text: "Is cereal a soup?", color: "#ff9ff3", size: "1.3rem", weight: 700 },
    { text: "Why is it called a building if it's already built?", color: "#48dbfb", size: "1rem", weight: 500 }
  ];

  const increaseBrainLoad = () => {
    setBrainLoad(prev => Math.min(prev + 10, 100));
  };

  useEffect(() => {
    thoughts.forEach((_, index) => {
      gsap.to(`#thought-${index}`, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: index * 0.2,
      });

      gsap.to(`#thought-${index}`, {
        x: `random(-50, 50)`,
        y: `random(-50, 50)`,
        rotation: `random(-15, 15)`,
        duration: gsap.utils.random(20, 30),
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    });

    gsap.utils.toArray('.meme-section').forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          });
        },
      });
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          {thoughts.map((thought, index) => (
            <RandomThought 
              key={index} 
              id={`thought-${index}`} 
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
              }}
              color={thought.color}
              size={thought.size}
              weight={thought.weight}
            >
              {thought.text}
            </RandomThought>
          ))}
          <Title>I got a TON on my mind</Title>
          <Subtitle>Comrades, who else got a TON on their mind...</Subtitle>
          <BrainEmoji onClick={increaseBrainLoad}>🧠</BrainEmoji>
          <ProgressBar>
            <ProgressFill style={{ width: `${brainLoad}%` }} />
            <ProgressText>{brainLoad}% Brain Capacity</ProgressText>
          </ProgressBar>
        </Header>

        <Content>
          <MemeSection bgColor="#1a2639" className="meme-section">
            <MemeContainer>
              <MemeImage src="/main.jpg" alt="Stressed out person" className="meme-image" />
              <MemeText>
                <MemeTitle>The Stress Spiral</MemeTitle>
                <MemeParagraph>
                 Bills coming in and you still waiting on that life chainging 100x coin. Maybe its this one idk
                </MemeParagraph>
              </MemeText>
            </MemeContainer>
          </MemeSection>

          <MemeSection bgColor="#2c3e50" className="meme-section">
            <MemeContainer reverse>
              <MemeImage src="/tonOnmymind.jpg" alt="Brain overload" className="meme-image" />
              <MemeText>
                <MemeTitle>Average Male Day</MemeTitle>
                <MemeParagraph>
                  To-do list:<br/>
                  1) Breathe<br/>
                  2) Survive<br/>
                  3) Dont become homeless
                </MemeParagraph>
              </MemeText>
            </MemeContainer>
          </MemeSection>

          <MemeSection bgColor="#34495e" className="meme-section">
            <MemeContainer>
              <MemeImage src="/tononmymind3.jpeg" alt="Mental explosion" className="meme-image" />
              <MemeText>
                <MemeTitle>We gone be aight</MemeTitle>
                <MemeParagraph>
                  I sure hope so<br/>
                  Light up a blunt or pour up a drank<br/>
                  
                </MemeParagraph>
              </MemeText>
            </MemeContainer>
          </MemeSection>

          <Button onClick={increaseBrainLoad}>
            Add more to my mind!
          </Button>
        </Content>
      </AppContainer>
    </>
  );
};

export default App;