
const extractMapRooms = (map) => {
    const iter = map.entries();
    let result = iter.next();
    var rooms = [];
    while (!result.done) {
        const [key, val] = result.value;
        rooms.push([key, val]);
        result = iter.next();
    }
    return rooms;
}

module.exports = extractMapRooms ;