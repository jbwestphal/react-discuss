import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'materialize-css/dist/css/materialize.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import ByCategory from './components/ByCategory'
import PostNew from './components/PostNew'
import PostEdit from './components/PostEdit'
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

              <Route exact path="/posts/:postId" render={({match}) => (
                <PostDetail postId={match.params.postId} />
              )} />

              <Route path="/posts/:postId/edit" render={({match, history}) => (
                <PostEdit
                postId={match.params.postId}
                onEditPost={() => {
                    history.push(`/posts/${match.params.postId}`)
                  }}
                />
              )} />

              <Route path="/:categoryPath/posts" render={({match}) => (
                <ByCategory categoryPath={match.params.categoryPath} />
              )} />

              <Route path="/new-post" render={({ history }) => (
                <PostNew
                  onCreatePost={() => {
                    history.push('/')
                  }}
                />
              )} />

            </Switch>
          </Page>
        </TransitionGroup>
      </main>
      <Footer />
    </section>
  )
}

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={MainApp} />
      </BrowserRouter>
    )
  }
}

export default App
