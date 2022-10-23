## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Environment Variables and calling the Backend

Create the file `.env.local` and copy the content of `.env.local.example` (change the backend URL if needed)

### There are two ways of calling the backend API
 - For Next.js server code use: `${process.env.BACKEND}/`
 - For frontend code use: `/backend/` -> this will be a proxy to the backend URL


## How to collaborate on GitHub
https://github.com/Eloi-Perez/guide-collaborating

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

