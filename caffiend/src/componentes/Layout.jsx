
export default function Layout(props){
    const {children} = props;

    const header = (
        <header>
          <div>
            <h1 className="text-gradient">CAFFIEND</h1>
            <p>For coffee Insatiates</p>
          </div>
          <button>
            <p>Sign up Free</p>
            <i className="fa-solid fa-mug-hot"></i>
          </button>
        </header>
    )

    const footer = (
        <footer>
           <p><span className="text-gradient">Caffiend</span> was made by <a href="https://github.com/Umaro14" target="_blanck">BAldeAj</a><br/>check out the project <a href="https://github.com/umaro14/REAC-WITH-JAMES" target="blanck">GitHub</a> using the
           <a href="https://www.fantacss.smoljames.com" target="_blanck"> FantaCSS</a> design library.</p>
        </footer>
    )

    return (
        <>
           {header}
           <main>
            {children}
           </main>
           {footer}
        </>
    )
}