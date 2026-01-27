---
license: apache-2.0
task_categories:
- question-answering
- text-generation
language:
- zh
- en
tags:
- future-prediction
- benchmark
- llm-agents
- real-world-events
size_categories:
- n<1K
pretty_name: FutureX-Past
---

# FutureX-Past

## 📜 Overview
This repository contains a dataset of past questions from the FutureX benchmark.

FutureX is a live, dynamic benchmark designed to evaluate the future prediction capabilities of Large Language Model (LLM) agents. It features a fully automated pipeline that generates new questions about upcoming real-world events, deploys agents to predict their outcomes, and scores the results automatically. For more information on the live benchmark, please refer to our [technical report](https://arxiv.org/abs/2508.11987).

The events corresponding to the questions in this dataset have already occurred. This historical data, while not suitable for evaluating live prediction, serves as a valuable resource for a variety of other research and development purposes.

## 🔄 Dataset Updates
**This dataset is updated weekly**, synchronized with the [FutureX-Online](https://huggingface.co/datasets/futurex-ai/Futurex-Online) benchmark. However, **not all questions from FutureX-Online appear in FutureX-Past**. Some questions are excluded because:
- The ground truth answers could not be successfully retrieved through our automated crawling system
- The event outcomes remain uncertain or unverifiable

**Community Feedback Welcome**: If you identify any incorrect answers in this dataset, we encourage you to provide feedback through [GitHub Issues](https://github.com/Futurex-ai/Futurex-ai.github.io/issues) or by contacting us directly. Your contributions help improve the dataset quality for the entire research community.

## ✨ Why Use This Dataset?
This dataset provides a rich collection of complex, real-world questions that required timely information retrieval and reasoning to solve. It is a valuable asset for:

- **Model Behavior Analysis**: Study how different LLM agents attempt to solve these problems. Analyze their tool usage, search queries, and reasoning paths when faced with uncertainty.
- **Reinforcement Learning**: Use the dataset to train RL agents to predict the future by controlling the date of search engine queries.
- **Search and Information Retrieval Evaluation**: Since the ground truth answers are known, this dataset serves as a high-quality testbed for evaluating an agent's ability to find specific, time-sensitive information from the web.
- **Static QA Benchmark**: The dataset can be used as a challenging static question-answering benchmark that requires models to integrate knowledge and reason about events, even if the "future" aspect is removed.

## ⚠️ Important Note on Usage
This dataset is comprised of historical data. The outcomes of all events are known and may be part of the training data of more recent models. Therefore, it **should not be used to evaluate the live future prediction capabilities of LLMs**, as this would lead to contaminated and invalid results. For live evaluation, please refer to the ongoing weekly challenge at [https://futurex-ai.github.io/](https://futurex-ai.github.io/).

## 💾 Dataset Schema
The dataset is provided in a structured format (e.g., Parquet, CSV). Each entry corresponds to a single prediction task and contains the following fields:

- **id** (string): A unique identifier for the question.
  - Example: `620165c0-1c39-442a-9ac9-93e179e8c33e`

- **prompt** (string): The full prompt that was provided to the LLM agent for the task, including the prediction question.
  - Example: `"北京时间2024年8月1日晚上8点，美联储的联邦基金利率目标范围是多少？"`

- **ground_truth** (string): The ground truth answer, recorded after the event occurred.
  - Example: `"5.25%"`

- **end_time** (timestamp): The date and time when the event occurred or the prediction window closed.
  - Example: `2024-08-01`

- **level** (integer): The difficulty level of the question, from 1 to 4, as defined by the FutureX benchmark:
  1. **Basic** (Few choices)
  2. **Wide Search** (Many Choices)
  3. **Deep Search** (Open-ended, Low Volatility)
  4. **Super Agent** (Open-ended, High Volatility)

## 🤝 Citation
If you use this dataset in your research, please cite the original FutureX paper:

```bibtex
@misc{zeng2025futurexadvancedlivebenchmark,
      title={FutureX: An Advanced Live Benchmark for LLM Agents in Future Prediction},
      author={Zhiyuan Zeng and Jiashuo Liu and Siyuan Chen and Tianci He and Yali Liao and Jinpeng Wang and Zaiyuan Wang and Yang Yang and Lingyue Yin and Mingren Yin and Zhenwei Zhu and Tianle Cai and Zehui Chen and Jiecao Chen and Yantao Du and Xiang Gao and Jiacheng Guo and Liang Hu and Jianpeng Jiao and Xiangsheng Li and Jingkai Liu and Shuang Ni and Zhoufutu Wen and Ge Zhang and Kaiyuan Zhang and Xin Zhou and Jose Blanchet and Xipeng Qiu and Mengdi Wang and Wenhao Huang},
      year={2025},
      eprint={2508.11987},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2508.11987},
}
```

## 📞 Contact
For questions, feedback, or contributions, please visit our [website](https://futurex-ai.github.io/) or open an issue on our [GitHub repository](https://github.com/Futurex-ai/Futurex-ai.github.io).
