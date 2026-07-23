# RuntimeX 🚀

A scalable and secure online coding platform built with distributed workers, Docker sandboxing, Redis queues, and PostgreSQL.

JudgeStack is designed to execute untrusted user code securely inside isolated Docker containers while supporting asynchronous job processing, scalable workers, and real-time submission handling.

---

# ✨ Features

* 🔒 Secure code execution using Docker sandboxing
* ⚡ Distributed worker architecture using Redis queues
* 🧠 Multi-language execution support
* 📦 Containerized infrastructure
* 🗂 PostgreSQL + Prisma ORM integration
* ⏱ Execution timeout and memory limits
* 🚫 Network-isolated execution environment
* 🔄 Asynchronous submission processing
* 📊 Submission verdict tracking
* 🧵 Worker-based scalable execution engine
* 🛡 Resource constrained runtime environment

---

# 🏗 Architecture

```text
                ┌──────────────┐
                │   Frontend   │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │   API Server │
                └──────┬───────┘
                       │
          Store Submission in DB
                       │
                       ▼
                ┌──────────────┐
                │ PostgreSQL   │
                └──────┬───────┘
                       │
             Push submissionId
                       │
                       ▼
                ┌──────────────┐
                │ Redis Queue  │
                └──────┬───────┘
                       │
                 Worker Pulls Job
                       │
                       ▼
                ┌──────────────┐
                │ Worker       │
                └──────┬───────┘
                       │
             Spawn Sandbox Container
                       │
                       ▼
                ┌──────────────┐
                │ Docker Judge │
                └──────────────┘
```

---

# 🔐 Sandbox Security



### Security Features

* No internet access
* Limited CPU usage
* Limited memory usage
* Limited processes/threads
* Read-only filesystem
* No root privileges
* Ephemeral containers
* Automatic cleanup after execution

---

# 🛠 Tech Stack

## Backend

* Node.js
* TypeScript
* Express.js
* Prisma ORM
* PostgreSQL
* Redis

## Infrastructure

* Docker
* Docker Compose

## Execution Engine

* Isolated Judge Containers
* Worker Queue System
* Resource-Constrained Runtime


# ⚙️ Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/judgestack"
REDIS_URL="redis://localhost:6379"
PORT=3000
```

---


# 📜 Supported Languages

* C
* C++
* Java

---

# 📊 Verdicts

| Verdict      | Meaning               |
| ------------ | --------------------- |
| AC           | Accepted              |
| WA           | Wrong Answer          |
| TLE          | Time Limit Exceeded   |
| MLE          | Memory Limit Exceeded |
| RE           | Runtime Error         |
| CE           | Compilation Error     |
| SYSTEM_ERROR | Internal Judge Error  |

---


# 🔥 Future Improvements

* WebSocket live verdict updates
* Contest support
* Code editor integration
* Custom testcases
* Plagiarism detection
* Kubernetes autoscaling
* Multi-language workers
* Firecracker microVM isolation
* Leaderboards and rankings
* Rate limiting and abuse protection

