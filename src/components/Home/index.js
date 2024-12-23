// components/Home.js
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'
import './index.css'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      email: localStorage.getItem('user'),
      search :""
    }
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://video-mangement.onrender.com/video/${this.state.email}`,
      )
      const data = await response.json()
      console.log(data)
      this.setState({videos: data})
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
  }
    searched =(e)=>{
    this.setState({search : e.target.value})
  }
  render() {
    const {videos,search} = this.state
    const filteredItems = videos.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) );
    return (
      <div className="home-container">
        <div className="header">
          <div className="logo">VideoApp</div>
          <Link to="/add-video">
            <button className="add-video-button">+Add Video</button>
          </Link>
          <br/>
          <input type="search" placeholder="Search videos" onChange={this.searched}/>
          <div className="videos-list">
            {filteredItems.map(video => (
              <div key={video.id} className="video-item">
                <>
                  <ReactPlayer
                    url={video.videoUrl}
                    height="280px"
                    width="380px"
                  />
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <h2>{video.tags}</h2>
                </>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
