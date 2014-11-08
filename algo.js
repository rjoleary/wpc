/**
 * Executes the main algorithm to optmize the delivery schedule.
 * This is the entry point from the UI.
 * @param mapCsv {string}
 * @param deliveryRequestJson {object}
 * @return schedule {object}
 */
function optimizeDelivery(mapCsv, deliveryRequestJson) {
    if (typeof mapCsv !== 'string') {
        throw 'mapCsv not a string';
    }
    if (typeof deliveryRequestJson !== 'object') {
        throw 'deliveryRequestJson not an object';
    }
    
    // Create a copy of the delivery request, so we can add extra data.
    deliveryRequestJson = $.extend({}, deliveryRequestJson);
    
    // 
    
    // Start with a single car for now.
    optimizeDeliveryWithNCars(nCars, mapCsv, deliveryRequestJson);

    return {};
}

function dijkstra(mapCsv, deliveryRequestJson) {
    var queue = new PriorityQueue();
    queue.queue(deliveryRequestJson.deliveryHeadquarter);
}

/**
 * Executes the algorithm to optmize the delivery schedule for N cars
 * @param mapCsv {string}
 * @param deliveryRequestJson {object}
 * @param nCars {number}
 * @return schedule {object}
 */
function optimizeDeliveryWithNCars(mapCsv, deliveryRequestJson, nCars) {
    
}