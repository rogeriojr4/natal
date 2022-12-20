import Nullstack from 'nullstack'

import '../tailwind.css'
import GetPrize from './pages/GetPrize'
import Home from './pages/Home'
import Password from './pages/Password'

const christmas = {
  delay: null,
  delete() {
    document.body.querySelectorAll('.christmas-lights').forEach(function (ul) {
      ul.remove()
    })
  },
  create() {
    let v = window.innerHeight / 60 + 2,
      h = window.innerWidth / 60 + 2,
      data = {
        top: h,
        right: v,
        bottom: h,
        left: v,
      },
      ul = null
    for (const position in data) {
      const c = data[position]
      ul = document.createElement('ul')
      ul.className = 'christmas-lights'
      ul.dataset.position = position
      for (let i = 0; i <= c; i++) {
        ul.append(document.createElement('li'))
      }
      document.body.append(ul)
    }
  },
}

class Application extends Nullstack {

  prepare({ page }) {
    page.locale = 'en-US'
  }

  hydrate() {
    christmas.create()

    window.addEventListener('resize', function (e) {
      clearTimeout(christmas.delay)
      christmas.delay = setTimeout(function () {
        christmas.delete()
        christmas.create()
      }, 100)
    })
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap" rel="stylesheet" />
      </head>
    )
  }

  render() {
    return (
      <body>
        <Head />
        <Password route="/login" />
        <GetPrize route="/getPrize" />
        <Home route="*" />
      </body>
    )
  }

}

export default Application
