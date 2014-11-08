/**
 * Executes the main algorithm to optmize the delivery schedule.
 * This is the entry point from the UI.
 * If there is an error, the return is an object like: {error: "Error Message"}
 * @param mapCsv {String}
 * @param deliveryRequestJson {Object}
 * @return schedule {Object}
 */
function optimizeDelivery(mapCsv, deliveryRequestJson) {
    try {
        if (typeof mapCsv !== 'string') {
            throw 'mapCsv not a string';
        }
        if (typeof deliveryRequestJson !== 'object') {
            throw 'deliveryRequestJson not an object';
        }
        
        // Create a copy of the delivery request, so we can add extra data.
        var deliveryRequestJson = $.extend({}, deliveryRequestJson);
        
        // Parse the map csv file.
        var mapArray = parseMapCsv(mapCsv);

        // Start with a single car for now.
        $.each(deliveryRequestJson.requests, function (index, request) {
            request.actions = shortestPath(mapArray, request.pickup, request.dropoff);
        });
        return optimizeDeliveryWithNCars(mapArray, deliveryRequestJson, 1);
    } catch (e) {
        return {error: '' + e};
    }
}

/**
 * Converts a map csv file to a 2d array. The first dimension is the y coordinate.
 * The second dimension is the x coordinate.
 */
function parseMapCsv(mapCsv) {
    return mapCsv.replace('H', ' ').split('\n');
}

/**
 * Perform breadth first seach on the map to find the shortest path between two points.
 * @param mapArray {[String]}
 * @param startNode {{x, y}}
 * @param endNode {{x, y}}
 */
function shortestPath(mapArray, startNode, endNode) {
    var queue = [];
    var visited = {};

    queue.push({action: 'drive', x: endNode.x, y: endNode.y, parent: null});
    
    while (queue.length > 0) {
        var top = queue.shift();
        
        // skip visited nodes
        if (visited[top.x + ',' + top.y]) {
            continue;
        }
        visited[top.x + ',' + top.y] = true;
        
        // goal node
        if (top.x === startNode.x && top.y === startNode.y) {
            var path = [];
            while (top !== null) {
                var parent = top.parent;
                delete top.parent;
                path.push(top);
                top = parent;
            }
            return path;
        }
        
        if (mapArray[top.y][top.x-1] === ' ') {
            queue.push({action: 'drive', x: top.x-1, y: top.y, parent: top});
        }
        if (mapArray[top.y][top.x+1] === ' ') {
            queue.push({action: 'drive', x: top.x+1, y: top.y, parent: top});
        }
        if (mapArray[top.y-1][top.x] === ' ') {
            queue.push({action: 'drive', x: top.x, y: top.y-1, parent: top});
        }
        if (mapArray[top.y+1][top.x] === ' ') {
            queue.push({action: 'drive', x: top.x, y: top.y+1, parent: top});
        }
    }
    
    throw 'Cannot find path from pickup to dropoff!';
}

/**
 * Executes the algorithm to optmize the delivery schedule for N cars
 * @param mapCsv {[String]}
 * @param deliveryRequestJson {Object}
 * @param nCars {Number}
 * @return schedule {Object}
 */
function optimizeDeliveryWithNCars(mapArray, deliveryRequestJson, nCars) {
    // The carrier starts at the headquarters.
    var carrierNode = {
        x: deliveryRequestJson.deliveryHeadquarter.x,
        y: deliveryRequestJson.deliveryHeadquarter.y
    };
    
    var schedule = [{carrierId: 'car1', actions: []}];
    
    $.each(deliveryRequestJson.requests, function (index, request) {
        // Drive from the previous pickkup to the current pickup.
        schedule[0].actions = schedule[0].actions.concat(shortestPath(mapArray, carrierNode, request.pickup));
        schedule[0].actions = schedule[0].actions.concat(request.actions);
        schedule[0].actions.push({action: 'dropoff', id: index + 1});
    });
    
    // The first node must be called 'start'.
    schedule[0].actions[0].action = 'start';
    
    return schedule;
}