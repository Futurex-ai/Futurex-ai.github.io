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
* **This week's tasks cover events with an end time between `2026-04-22, 24:00 (UTC+8)` and `2026-04-28, 24:00 (UTC+8)`.**
* **Option A:** If you submit your API, we will automatically test your model.
* **Option B:** If you run locally, you must download the tasks, make predictions, and email us your results **before Wednesday 24:00 (UTC+8)** each week.
* Late submissions will **not** be counted.
* The leaderboard for this round will be updated by **`2026-04-30 24:00 (UTC+8, Beijing Time)`**.


**⚠️ Next submission deadline: <span style="color:red">2026-04-22, 24:00 (UTC+8, Beijing Time)</span>**

---

## 2. How to Participate?

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

**Note:** Predictions can be in various formats including single letters (A, B, C), letter combinations (A, C, D), text in any language, numbers, or empty strings. The prediction should exactly match the format expected by the specific event question.

**Example (table view):**

| id         | prediction |
| ---------- | ---------- |
| 69b2b593782d0900685d5fcb | A |
| 69b160921ebfe30068c2cde1 | I |
| 69be8f979ade34005c7c742c | H |
| 69b2b593782d0900685d5fc6 | B, C, D, E, F, G, H, J, L, Q, T, V, W, ` |
| 69ce6197dcd4cd005c5bf071 | A, C, D, E, F, G |
| 685141eca047fd005f77ef02 | Timea Babos, Nicole Melichar-Martinez, Storm Hunter |
| 6851736259f71f006037a1e2 | 112.52 点 |
| 685e494b6e8dbd006cdc6f7c | 平安曲靖, 山东长安网, 中国长安网 |
| 69b7f816d596fb005d43a31f | Western Conference |
| 69bfe1118038fb005cb27720 | "" |

**Example (JSONL format):**

```json
{"id": "69b2b593782d0900685d5fcb", "prediction": "A"}
{"id": "69b160921ebfe30068c2cde1", "prediction": "I"}
{"id": "69be8f979ade34005c7c742c", "prediction": "H"}
{"id": "69b2b593782d0900685d5fc6", "prediction": "B, C, D, E, F, G, H, J, L, Q, T, V, W, `"}
{"id": "69ce6197dcd4cd005c5bf071", "prediction": "A, C, D, E, F, G"}
{"id": "685141eca047fd005f77ef02", "prediction": "Timea Babos, Nicole Melichar-Martinez, Storm Hunter"}
{"id": "6851736259f71f006037a1e2", "prediction": "112.52 点"}
{"id": "685e494b6e8dbd006cdc6f7c", "prediction": "平安曲靖, 山东长安网, 中国长安网"}
{"id": "69b7f816d596fb005d43a31f", "prediction": "Western Conference"}
{"id": "69bfe1118038fb005cb27720", "prediction": ""}
```

---

## 3. Leaderboard and Privacy

* Weekly results will be ranked and shown on a dynamic leaderboard by default.
* You can choose to keep it private or make it public.

