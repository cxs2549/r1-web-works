import { useState, useRef } from "react"
import Container from "../styled/Container.styled"
import Hamburger from "hamburger-react"
import styled from "styled-components"
import tw from "twin.macro"
import { Transition } from "react-transition-group"
import useOnClickOutside from "use-onclickoutside"

const StyledHeader = styled.header`
  ${tw`h-[100px]`}
  color: var(--text-1);
`
const Logo = () => {
  const StyledLogo = styled.div`
    ${tw`flex items-center`}
    h1 {
      ${tw`text-5xl  font-logo font-extrabold tracking-[-0.1em]`}
    }
    div {
      ${tw`flex flex-col uppercase ml-2 mt-1`}
    }
    p {
      ${tw`text-base font-extrabold font-logo tracking-wider`}
      &:last-child {
        ${tw`-mt-2`}
      }
    }
  `
  return (
    <StyledLogo>
      <h1>R1</h1>
      <div>
        <p>Web</p>
        <p>Works</p>
      </div>
    </StyledLogo>
  )
}
const Burger = () => {
  const [open, setOpen] = useState(false)
  const [openList, setOpenList] = useState(false)
  const handleClick = () => {
    setOpen(!open)
    setOpenList(!openList)
  }
  const handleClose = () => {
    setOpen(false)
    setOpenList(false)
  }
  const duration = 600
  const durationList = 300

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
    pointerEvents: "none",
    height: "calc(100vh - 100px)",
  }

  const transitionStyles = {
    entering: { opacity: 1, pointerEvents: "auto" },
    entered: { opacity: 1, pointerEvents: "auto" },
    exiting: { opacity: 0, pointerEvents: "none" },
    exited: { opacity: 0, pointerEvents: "none" },
  }
  const defaultStyleList = {
    transition: `all ${durationList}ms ease-in-out`,
    opacity: 0,
    transform: "translateY(40px)",
  }
  const transitionStylesList = {
    entering: { opacity: 1, transform: "translateY(0)" },
    entered: { opacity: 1, transform: "translateY(0)" },
    exiting: { opacity: 0, transform: "translateY(40px)" },
    exited: { opacity: 0, transform: "translateY(40px)" },
  }

  const ref = useRef()

  useOnClickOutside(ref, handleClose)

  return (
    <div ref={ref}>
      <div className="translate-x-2">
        <Hamburger toggle={handleClick} toggled={open} />
      </div>
      <Transition in={open} timeout={duration}>
        {(state) => (
          <div
            className="absolute top-[100px] left-0 w-full h-screen flex justify-center items-center"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <Transition in={openList} timeout={duration}>
              {(state) => (
                <ul
                  style={{
                    ...defaultStyleList,
                    ...transitionStylesList[state],
                  }}
                  className="flex flex-col h-1/4 justify-between text-3xl relative"
                >
                  <li>Work</li>
                  <li>About</li>
                  <li>Contact</li>
                </ul>
              )}
            </Transition>
          </div>
        )}
      </Transition>
    </div>
  )
}

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Logo />
        <Burger />
      </Container>
    </StyledHeader>
  )
}
export default Header
