"use client"

import React from 'react';
import styled from 'styled-components';

const AnimatedImage = ({ src }: any) => {
  return (
    <StyledWrapper>
      <div className="coin">
        <div className="side heads">
          <img src={src} />
        </div>
        <div className="side tails">
          <img src={src} />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .coin {
    font-size: 400px;
    width: 0.1em;
    height: 1em;
    background: linear-gradient(#faa504, #141001);
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: rotate_4001510 20s infinite linear;
    transform-style: preserve-3d;
  }

  .coin .side, .coin:before, .coin:after {
    content: "";
    position: absolute;
    width: 1em;
    height: 1em;
    overflow: hidden;
    border-radius: 50%;
    right: -0.4em;
    text-align: center;
    line-height: 1;
    transform: rotateY(-90deg);
    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .coin .tails, .coin:after {
    left: -0.4em;
    transform: rotateY(90deg);
  }

  .coin:before, .coin:after {
    background: linear-gradient(#faa504, #141001);
    backface-visibility: hidden;
    transform: rotateY(90deg);
  }

  .coin:after {
    transform: rotateY(-90deg);
  }

  @keyframes rotate_4001510 {
    100% {
      transform: rotateY(360deg);
    }
  }

  .svg_back {
    transform: scaleX(-1);
  }`
  ;



export default AnimatedImage;
