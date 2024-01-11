<p align="center">
<a href="https://github.com/open-roleplay-ai/openroleplay.ai">
<img src="https://github.com/Open-Roleplay-AI/.github/blob/main/github-banner.png?raw=true" alt="Logo">
</a>

  <h3 align="center">openroleplay.ai</h3>

  <p align="center">
    The open-source character.ai alternative.
    <br />
    <br />
    <a href="https://discord.gg/bM5zzMEtdW">Discord</a>
    ·
    <a href="https://openroleplay.ai">Website</a>
    ·
    <a href="https://github.com/open-roleplay-ai/openroleplay.ai/issues">Issues</a>
  </p>
</p>

<p align="center">
   <a href="https://github.com/open-roleplay-ai/openroleplay.ai/stargazers"><img src="https://img.shields.io/github/stars/open-roleplay-ai/openroleplay.ai" alt="Github Stars"></a>
   <a href="https://github.com/open-roleplay-ai/openroleplay.ai/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-purple" alt="License"></a>
   <a href="https://github.com/open-roleplay-ai/openroleplay.ai/pulse"><img src="https://img.shields.io/github/commit-activity/m/open-roleplay-ai/openroleplay.ai" alt="Commits-per-month"></a>
   <a href="https://openroleplay.ai/pricing"><img src="https://img.shields.io/badge/Pricing-Free-brightgreen" alt="Pricing"></a>
   <a href="https://github.com/open-roleplay-ai/openroleplay.ai/issues?q=is:issue+is:open+label:%22%F0%9F%99%8B%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8Fhelp+wanted%22"><img src="https://img.shields.io/badge/Help%20Wanted-Contribute-blue"></a>
</p>

<br/>

# AI characters and roleplay for everyone

Open Roleplay is an open-source alternative to Character.ai.
You have full control over your data, model, and visual presentation.

Platforms like Character.ai and other AI agent platforms are fantastic. However, these platforms often lack flexibility, transparency and customization options.

This is where Open Roleplay steps in. Whether self-hosted or hosted by us, it's ready to be deployed on your own domain with your personalized model and data.

## Features

- **Bring your own model or choose from wide variety of models:** Choose from a variety of AI models, making it easy to interact with your favorite AI characters.
- **Highly Customizable:** Make your characters, personas and UI unique, for a one-of-a-kind roleplaying experience.
- **Roleplay-Focused:** Designed with roleplaying and storytelling in mind, it ensures an immersive and engaging experience.
- **Group Chat (Coming soon):** Invite your favorite characters to one chat room and chat together.
- **Extended Memory (Coming soon):** The character instructions and previous conversations are reminded to characters when the context window reaches its limit.
- **Image Generation (Coming soon):** Allow your character to generate their own selfies, drawings, and photos for a more immersive experience.
- **Voice (Coming soon):** Create characters that can talk to users with a realistic voice.

## Supported Models

Check out [here](https://openroleplay.ai/models) for supported models.

### Built With

- [Next.js](https://nextjs.org/?ref=cal.com)
- [React.js](https://reactjs.org/?ref=cal.com)
- [Tailwind CSS](https://tailwindcss.com/?ref=cal.com)
- [Vercel](https://vercel.com/)
- [Convex](https://convex.dev/)
- [Clerk](https://clerk.com/)

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app for the service
- `docs`: a [Next.js](https://nextjs.org/) app for developer and user documentation
- `@repo/ui`: a stub React component library
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

### Run Locally

To develop all apps and packages, run the following command:

```bash
# Run frontend server
pnpm install
pnpm dev

# Run backend server
cd apps/web
npx convex dev
```

## Deployment

### Convex and Vercel

We use convex for backend as a service and vercel for frontend cloud to ship features faster.

Check out [Using Convex with Vercel](https://docs.convex.dev/production/hosting/vercel) for detailed guide.

### Clerk

Clerk is an authentication platform providing login via passwords, social identity providers, one-time email or SMS access codes, and multi-factor authentication and basic user management.

We use Clerk for simplified and secure user authentication.

Check out [Convex Clerk](https://docs.convex.dev/auth/clerk) for detailed guide.

## Roadmap and Feedback

Let's shape our roadmap [together](https://github.com/open-roleplay-ai/openroleplay.ai/issues).

## Support This Project

This project is entirely bootstrapped and was initiated out of personal passion and effort. Your contributions are invaluable and will ensure the continued vitality of this project.

## License

Distributed under the AGPLv3 License. See LICENSE for more information.
