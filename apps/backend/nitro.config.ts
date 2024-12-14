//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  compatibilityDate: "2024-12-14",
  routeRules: {
    '/api/**': { // Modifica questo percorso in base alle tue API
      cors: true, // Abilita CORS
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },
  },
});