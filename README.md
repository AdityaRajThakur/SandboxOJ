# RuntimeX 🚀

A scalable and secure online coding platform built with distributed workers, Docker sandboxing, Redis queues, and PostgreSQL.

JudgeStack is designed to execute untrusted user code securely inside isolated Docker containers while supporting asynchronous job processing, scalable workers, and real-time submission handling.

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

* Java
  
# 🔥 Future Improvements

* WebSocket live verdict updates
* Contest support
* Code editor integration
* Custom testcases
* Multi-language workers
* Rate limiting and abuse protection

