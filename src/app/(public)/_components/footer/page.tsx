export function Footer(){
  return(
    <footer className="text-center bg-secondary py-6 md:text-base"> 
      <p>Todos direitos reservados © {new Date().getFullYear()}
        - GM CodeWorks
      </p>
    </footer>
  )
}