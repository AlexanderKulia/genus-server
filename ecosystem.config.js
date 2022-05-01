module.exports = {
  apps: [
    {
      name: "genus",
      script:
        "npm install && npm run db:migrate:prod && npm run build && npm run start:prod",
    },
  ],
};
