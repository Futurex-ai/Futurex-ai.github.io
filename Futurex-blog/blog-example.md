# Can AI Predict Future? Introducing FutureX: An Advanced Live Benchmark for LLM Agents in Future Prediction

In the past few years, Large Language Models (LLMs) have made astonishing progress. They are no longer mere text generators but are gradually evolving into autonomous "agents" capable of planning, using tools, and interacting with the real world. However, a sharp question lies before us: How can we truly evaluate the core intelligence of these agents?

Existing benchmarks, such as GAIA and Browsercamp, while valuable, are mostly static. This means their questions and answers are fixed and can easily be included in a model's vast training data, leading to distorted evaluation results. More importantly, they   are asking AI to solve the problem that is known. Therefore, we introduce Futurex, a **live** benchmark designed for **predicting unknown future**.

Predicting the future requires an agent, much like a human expert, to gather information, analyze trends, and make decisions in a dynamic environment full of uncertainty. This is precisely the ultimate capability we hope AI will possess. However, establishing a fair, uncontaminated evaluation standard for this purpose is fraught with methodological and technical challenges.



### What is FutureX?

FutureX is a dynamic, real-time benchmark for LLM agents, built on these core features:

- **Immune to Data Contamination:** By requiring predictions of future events, it ensures answers cannot exist in any model's training data. There are **684 new events per week**.
- **Real-World Challenge:** Agents analyze live, real-world information to make predictions, not operate in a simulation.
- **Unprecedented Scale:** Utilizes **195 high-quality sources** (selected from over **2,000 websites**) covering **11 major domains**.
- **Fully Automated Pipeline:** A closed-loop system automatically collects questions, runs **28 agents** daily, and scores the results.



![image-20250805150617761](./image-20250805150617761.png)

### The Four Difficulty Levels of FutureX

To evaluate agent capabilities with greater granularity, we have meticulously designed the prediction tasks into four ascending levels of difficulty:

![image-20250805153538154](./image-20250805153538154.png)

### How do we build Futurex?

To meet the challenge of real-time updates, we built a completely closed-loop, automated evaluation system. The system automatically collects new questions daily, runs 28 agents to make predictions, and automatically retrieves and scores the results after the event concludes. This level of technical complexity far exceeds that of traditional static evaluation frameworks.

![image-20250805150459250](./image-20250805150459250.png)



### Our Findings: How Do Current AI Agents Perform in Future Prediction?

1. **The Difficulty Tiers Are Valid and Effective**:

   The performance of all models consistently declines as task difficulty increases from Level 1 to Level 4. Models score particularly low on Level 4 tasks (open-ended, high-volatility), which strongly validates that the benchmark's difficulty stratification is accurate and can effectively measure a range of capabilities from basic recall to complex reasoning.

2. **Base LLMs Perform Well on Simple Tasks**:

   On Level 1 (single-choice) tasks, base LLMs without tool usage perform exceptionally well. Notably, DouBao-Seed1.6-Thinking even outperforms some agents equipped with search tools. This suggests that Level 1 tasks primarily test a model's internal knowledge and have limited ability to differentiate the capabilities of more advanced models.

3. **Tool Use is Crucial for Harder Tasks**:

   As tasks become more complex (especially Levels 2 and 3), agents that can use external tools like web search significantly outperform models that rely solely on static internal knowledge. This highlights the critical role of real-time information access and tool-augmented reasoning for solving complex, dynamic problems.

4. **Top Models Show Diverging Capabilities:**

   - In knowledge retrieval tasks (Levels 1 & 2), `DouBao-Seed1.6-Thinking` is the top performer.
   - In the most challenging open-ended tasks (Levels 3 & 4), `Grok-4` and `GPT-o4-mini` stand out. They achieve an excellent balance of accuracy and efficiency (fewer searches, faster inference), even surpassing more expensive deep research models.

5. **AI Agents Still Lag Behind Humans**:

   Currently, the overall predictive capabilities of LLM agents remain behind those of human experts.

![image-20250805150803688](./image-20250805150803688.png)

Furthermore, to systematically analyze the influence of each factors (e.g., different LLMs, agent frameworks, domain of events, difficulty levels), we conduct a linear analysis.

![image-20250805153707628](./image-20250805153707628.png)



### Our Vision

We firmly believe that FutureX has the potential to become a key driving force in the development of LLM agents. By providing a fair, dynamic, and highly challenging evaluation platform, we hope to inspire researchers in academia and industry to jointly develop the next generation of AI agents that can match, or even surpass, the level of professional human analysts in complex, high-stakes, real-world domains.

Our work has just begun. We welcome you to read our technical report for more details and to explore the future of AI with us.