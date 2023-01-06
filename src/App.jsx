import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loginData, setloginData] = useState(null)

  function getParameters() {
    try {
      let urlString = window.location.href;
      console.log(urlString)

      let paramString = urlString.split('?')[1];
      const token = paramString.split('=')[1];

      console.log(token)

      localStorage.setItem('token', token);

      fetch('http://localhost:5000/decode', {
        method: "POST",
        body: JSON.stringify({
          userToken: token
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(data => data.json())
        .then(data => {
          console.log(data);
          setloginData(data?.decodeData)
        })
        .catch(err => console.log(err))
    } catch (error) {
      return
    }
  };

  useEffect(() => {
    getParameters()
  }, [])




  return (
    <div className="App" style={{ color: "white" }}>
      hello
      {
        !loginData
          ?
          <button><a href='http://localhost:5000/auth/google'>google log in</a></button>
          :
          <div>
            <h1>Dashboard</h1>
            <div>
              <div>email:</div>
              <div>{loginData.email}</div>
              <div>user id:</div>
              <div>{loginData.userId}</div>
              <div>access token:</div>
              <div>{loginData.accessToken}</div>
            </div>
          </div>
      }
    </div>
  )
}

export default App
