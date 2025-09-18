const range = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() {
    for (let current = this.from; current <= this.to; current++) {
      yield current
    }
  },
}

function* generateSequence() {
  yield 1
  yield 2

  return 3
}

let generator = generateSequence()

const run = () => {
  for (const item of range) {
    console.log('item', item)
  }
}
run()
