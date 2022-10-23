import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import rive from "@rive-app/canvas";

export default function Home() {
  const [drink, setDrink] = useState("")
  const [requestSent, setRequestSent] = useState(false)

  function getDrink() {
    if (requestSent) {
      console.log('bad')
      return
    }
    setRequestSent(true)
    
    fetch('/api/get_drink')
      .then(response => response.json())
      .then(data => {
        const d = data.result[0].completion
        const html_d = d.replace(/(?:\r\n|\r|\n)/g, "<br>");
        setDrink(data.result[0].completion);
        setRequestSent(false);
    });

  }

  function loadingScreen() {
    new rive.Rive({
      src: "https://cdn.rive.app/animations/vehicles.riv",
      // Or the path to a local Rive asset
      // src: './example.riv',
      canvas: document.getElementById("canvas"),
      autoplay: true
    });


    return (
      <div id="loader">
      <p>Loading, please have patience ...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Bart Ender</title>
        <meta name="description" content="Creative cocktails from out of this world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          Bart Ender makes you drinks
        </h1>

        {/* <input type="text" placeholder="Drink Name" />
        <button type="submit">Create Drink</button>
        <p>Or...</p> */}
        <button type="submit" onClick={getDrink}>Random Drink, on the House</button>
          
        {drink && <p>Drink Name:{drink}</p>}
        {requestSent && 
        <canvas id="canvas" width="500" height="500"></canvas>
        // <p>Loading, please have patience ...</p>
        }

      </main>

      
    </div>
  )
}
