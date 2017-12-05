import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'materialize-css/dist/css/materialize.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import ByCategory from './components/ByCategory'
import NewPost from './components/NewPost'
import PostDetail from './components/PostDetail'

const Page = (props) => (
  <CSSTransition
    {...props}
    classNames="fade"
    timeout={300}
  />
)

const MainApp = (props) => {
  const locationKey = props.location.pathname
  return (
    <section className="App row">
      <Header />
      <main>
        <TransitionGroup>
          <Page key={locationKey}>
            <Switch location={props.location}>
              <Route exact path="/" component={Home} />
              <Route path="/posts/:postId" render={({match}) => (
                <div>
                  <PostDetail postId={match.params.postId} />
                </div>
              )} />

              <Route path="/:categoryPath/posts" render={({match}) => (
                <ByCategory categoryPath={match.params.categoryPath} />
              )} />

              <Route exact path="/new-post" component={NewPost} />
            </Switch>
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
