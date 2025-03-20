import CoffeeForm from "./componentes/CoffeForm";
import Hero from "./componentes/Hero";
import Layout from "./componentes/Layout";
import Stats from "./componentes/Stats";
import History from "./componentes/History";

function App() {
  
  const isAuthenticated = true;

  //info for signed up user only
  const authenticatedContent = (
    <>
     <Stats />
     <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm />
      {isAuthenticated && (authenticatedContent)}
    </Layout>
  )
}

export default App
