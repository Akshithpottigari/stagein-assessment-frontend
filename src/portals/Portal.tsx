import { useContext } from "react"
import ReactDOM from "react-dom"
import { AppContextInterface } from "../types"
import { AppContext } from "../contexts/AppContext"

interface PortalProps {
  children: JSX.Element
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const portalContainer = document.getElementById("portal") as HTMLDivElement
  const { modal } = useContext(AppContext) as AppContextInterface

  if(modal.status) return ReactDOM.createPortal(children, portalContainer)
  
  return null
}

export { Portal }