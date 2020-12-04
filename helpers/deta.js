const { Deta } = require("deta")

// add your Project Key
const deta = Deta(process.env.DETA_PROJECT_KEY)
// name your DB
const db = deta.Base("users")

// use it!
db.put({
  name: "Geordi",
  title: "Chief Engineer",
  has_visor: true,
})

// call inside an async function ;)
const { value: geordi } = await db
  .fetch({
    has_visor: true,
  })
  .next()

db.delete(geordi.key)
