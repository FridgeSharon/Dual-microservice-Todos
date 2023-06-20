function validId(id) {
    // id must match MongoDB's ObjectId format
    return id.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = {validId}