import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import './index.css'
const AddVideo = () => {
  const [form, setForm] = useState({
    user:localStorage.getItem('user'),
    title: '',
    description: '',
    tags: '',
    videoUrl: '',
  })
  const history = useHistory()

  const handleChange = e => {
    const {name, value} = e.target
    setForm(prevForm => ({...prevForm, [name]: value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await axios.post('https://video-mangement.onrender.com/video', form)
    history.push('/')
    setForm({title: '', description: '', tags: '', videoUrl: ' '}) // Reset form
  }

  return (
    <div className="add-page">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags"
          value={form.tags}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="videoUrl"
          placeholder="Video Url Youtube"
          value={form.videoUrl}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Item</button>
      </form>
    </div>
  )
}

export default AddVideo
