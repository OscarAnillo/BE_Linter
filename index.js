import express from 'express'
const app = express()

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]

app.use(express.json())

//All notes
app.get('/', (req, res) => {
  res.json(notes)
})

//One note from all notes
app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const findNote = notes.find((note) => note.id === id)
  if (findNote) {
    return res.json(findNote)
  } else {
    return res
      .status(404)
      .json({ message: `Note under the id ${id} was not found!` })
  }
})

//Create a note
app.post('/', (req, res) => {
  const newNote = {
    id: notes.length + 1,
    content: req.body.content,
    important: Math.random() > 0.5,
  }
  notes.push(newNote)
  res.status(200).json(newNote)
})

//Delete a note
app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

//Updating a note
app.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const note = notes.find((n) => n.id === id)
  if (note) {
    note.content = req.body.content
    return res.json(note)
  } else {
    return res.status(404).json({ message: 'Note not found!' })
  }
})

const PORT = 3005
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
