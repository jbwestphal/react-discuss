import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'materialize-css/dist/css/materialize.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import ByCategories from './components/ByCategories'

const Page = (props) => (
  <CSSTransition
    {...props}
    classNames="fade"
    timeout={300}
    mountOnEnter={true}
    unmountOnExit={true}
  />
)

const MainApp = (props) => {
  const locationKey = props.location.pathname
  return (
    <section className="App">
      <Header />
      <main>
        <TransitionGroup>
          <Page key={locationKey}>
            <div className="page-container">
              <Switch location={props.location}>
                <Route exact path="/" component={Home} />
                <Route exact path="/categories" component={ByCategories} />
              </Switch>
            </div>
          </Page>
        </TransitionGroup>
      </main>
      <Footer />
    </section>
  )
}

const App = () => (
  <BrowserRouter>
    <Route path="/" component={MainApp} />
  </BrowserRouter>
)

export default App
