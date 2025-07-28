/**
 * Markdown 渲染组件
 * 负责渲染传入的 markdown 内容
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import defaultMarkdownContent1 from '../../data/content.md';

// console.log(defaultMarkdownContent1);
const defaultMarkdownContent = `# LiveCodeBench: Holistic and Contamination Free Evaluation of Large Language Models for Code

## Introduction

LiveCodeBench is a comprehensive benchmark for evaluating large language models on code-related tasks. Our benchmark is designed to be:

- **Contamination-free**: All problems are sourced from recent programming contests
- **Holistic**: Covers multiple aspects of coding ability
- **Dynamic**: Regularly updated with new problems
- **Challenging**: Tests models across different difficulty levels

## Methodology

We evaluate models across four difficulty levels:

### Level 1: Basic Programming
- Simple algorithmic problems
- Basic data structure operations
- String and array manipulations

### Level 2: Intermediate Programming
- Advanced data structures
- Graph algorithms
- Dynamic programming basics

### Level 3: Advanced Programming
- Complex algorithmic challenges
- Optimization problems
- Advanced dynamic programming

### Level 4: Expert Programming
- Competitive programming level
- Mathematical algorithms
- Complex system design

## Evaluation Metrics

- **Overall Score**: Weighted average across all levels
- **Number of Events**: Total test cases attempted
- **Level-specific Scores**: Performance at each difficulty level

## Agent Frameworks

We evaluate models using various agent frameworks:

- **AutoGPT**: Autonomous task execution
- **LangChain**: Modular AI application framework
- **CrewAI**: Multi-agent collaboration platform

Each framework brings different strengths and approaches to problem-solving, allowing us to assess model performance across diverse execution environments.`;

export const MarkdownView: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  };

  const contentStyle: React.CSSProperties = {
    background: 'transparent',
    padding: '3rem',
    lineHeight: '1.6'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <ReactMarkdown>{defaultMarkdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};