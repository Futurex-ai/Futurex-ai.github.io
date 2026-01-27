---
task_categories:
- question-answering
tags:
- future
- prediction
- LLM
- Agents
size_categories:
- n<1K
dataset_info:
  features:
  - name: id
    dtype: string
  - name: prompt
    dtype: string
  - name: slug
    dtype: string
  - name: end_time
    dtype: string
  - name: level
    dtype: int64
  - name: title
    dtype: string
  - name: en_title
    dtype: string
  splits:
  - name: train
    num_bytes: 119963
    num_examples: 96
  download_size: 39739
  dataset_size: 119963
configs:
- config_name: default
  data_files:
  - split: train
    path: data/train-*
---

# Submission Guidelines — Weekly Prediction Challenge

📄 Technical Report: [https://arxiv.org/pdf/2508.11987](https://arxiv.org/pdf/2508.11987)
🌐 LeaderBoard: [https://futurex-ai.github.io/](https://futurex-ai.github.io/)

We run a weekly real-time prediction challenge. This repo **always** contains latest events.


## 1. Weekly Rules

* A new set of tasks is released every week.
* **This week's tasks cover events with an end time between `2026-01-28, 24:00 (UTC+8)` and `2026-02-03, 24:00 (UTC+8)`.**
* **Option A:** If you submit your API, we will automatically test your model.
* **Option B:** If you run locally, you must download the tasks, make predictions, and email us your results **before Wednesday 24:00 (UTC+8)** each week.
* Late submissions will **not** be counted.
* The leaderboard for this round will be updated by **`2026-02-05 24:00 (UTC+8, Beijing Time)`**.


**⚠️ Next submission deadline: <span style="color:red">2026-01-28, 24:00 (UTC+8, Beijing Time)</span>**

---

## 2. How to Participate?
Two ways:

### 2.1 Option A — Submit Your API

Send an email to **[FutureX-ai@outlook.com](mailto:FutureX-ai@outlook.com)** with your model's API (OpenAI-compatible endpoint + key).

**Email subject format:**

```
FutureX Challenge Entry — [Your Model Name]
```

**Email body should include:**

* Model details (base model, parameters, safety settings)
* Any required headers or rate limits

---

### 2.2 Option B — Run Locally & Submit Predictions

1. Download the latest tasks from our dataset:
   [https://huggingface.co/datasets/futurex-ai/Futurex-Online](https://huggingface.co/datasets/futurex-ai/Futurex-Online)

2. Run your model on the tasks.

3. Email your predictions to **[FutureX-ai@outlook.com](mailto:FutureX-ai@outlook.com)** before the deadline.

**Email subject format:**

```
FutureX Challenge Submission — [Your Model Name][Date]
```

**Submission requirements:**

* File format: **JSON** (or JSONL)
* Include dataset commit/hash you used
* Required fields: `id`, `prediction`

**Example (table view):**

| id         | prediction |
| ---------- | ---------- |
| event\_001 | Yes        |
| event\_002 | No         |
| event\_003 | Maybe      |

**Example (JSONL format):**

```json
{"id": "event_001", "prediction": "Yes"}
{"id": "event_002", "prediction": "No"}
{"id": "event_003", "prediction": "Maybe"}
```

---

## 3. Leaderboard and Privacy

* Once your model has been tested on **200+ events**, it will appear on the **overall leaderboard**.
* Weekly results will be ranked and shown on a dynamic leaderboard.
* If your model is **not** in the top 10, you may choose to keep it private or make it public.

We will keep your API keys and submission files confidential, and only use them for evaluation.