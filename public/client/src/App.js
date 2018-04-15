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

              <Route exact path="/:categoryId/:postId" render={({match, history}) => (
                <PostDetail
                  categoryId={match.params.categoryId} postId={match.params.postId}
                  handleDeletePost={() => {
                    history.push('/')
                  }}
                />
              )} />

              <Route exact path="/:categoryId/:postId/edit" render={({match, history}) => (
                <PostEdit
                postId={match.params.postId}
                categoryId={match.params.categoryId}
                onEditPost={() => {
                    history.push(`/${match.params.categoryId}/${match.params.postId}`)
                  }}
                />
              )} />

              <Route exact path="/new-post" render={({ history }) => (
                <PostNew
                  onCreatePost={() => {
                    history.push('/')
                  }}
                />
              )} />

              <Route path="/:categoryPath" render={({match}) => (
                <ByCategory categoryPath={match.params.categoryPath} />
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
