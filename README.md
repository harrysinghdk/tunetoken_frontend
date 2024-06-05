This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Ganache & Truffle

Make sure to run ganache and deploy the [TuneToken smart contract](https://github.com/harrysinghdk/tunetoken) using truffle.

When smart contract is migrated, update the file `contractAddress.ts` and the variable `contractAddress` with the address of the migrated smart contract.

### Run the frontend

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Thanks

This project builds on the [repo](https://github.com/mansour-qaderi/dapp-start), which provides code for necessary wallet connections.