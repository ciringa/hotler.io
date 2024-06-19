export function ReturnDistanceByProvidedData(lat1:number, lon1:number, lat2:number, lon2:number) {
    const R = 6371; // Raio da Terra em km

    // Converter graus para radianos
    const rad = (graus) => graus * (Math.PI / 180);

    const dLat = rad(lat2 - lat1);
    const dLon = rad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = R * c; // Distância em km

    return distancia;
}