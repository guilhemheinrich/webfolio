let initialized = false;

export default defineEventHandler((event) => {
    if (!initialized) {
        // Code exécuté une seule fois à chaque requête (mais côté serveur uniquement)
        console.log("Middleware global exécuté côté serveur");
        initialized = true;
    }
});
