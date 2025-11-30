# RAGNA Studio - WebSocket Server

A TypeScript WebSocket server built with Socket.IO and Express, featuring JWT authentication and room-based messaging.

## Features

- JWT-based authentication for both HTTP and WebSocket connections
- Room-based message broadcasting
- RESTful API for message emission
- Docker support
- TypeScript implementation

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

```bash
WEBSOCKET_PORT=3030
WEBSOCKET_ORIGIN=*
AUTH_APP_ID=your-app-id
JWT_SECRET=your-jwt-secret
```

## Docker

```bash
# Development
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.production.yml up
```

## 📝 License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ and Appreciation by Sven Stadhouders</p>
</div>
