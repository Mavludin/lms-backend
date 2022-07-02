const sum = (body) => {
  return new Function('a', 'b', body)
}

module.exports = sum