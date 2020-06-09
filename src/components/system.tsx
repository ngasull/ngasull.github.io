/** @jsx jsx */

import { ClassNames } from "@emotion/core"
import { useField } from "formik"
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { createPortal } from "react-dom"
import { css, jsx, theme } from "~/theme"

type DisplayElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
type Spacing = 0 | "extraTight" | "tight" | "loose" | "base" | "extraLoose"

export const Card: React.FC<{
  className?: string
  title?: React.ReactNode
  sectioned?: boolean
}> = ({ children, className, sectioned = true, title }) => {
  return (
    <div
      css={css`
        background: #fff;
      `}
      className={className}
    >
      {title && (
        <h2
          css={css`
            ${theme.text.heading};
            padding: ${theme.space.loose};
            padding-bottom: ${theme.space.loose};
          `}
        >
          {title}
        </h2>
      )}
      {sectioned ? (
        <div
          css={css`
            padding: ${theme.space.loose};
          `}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

// Titles and Text //

export const Caption: React.FC<React.HTMLProps<HTMLSpanElement>> = props => {
  return <span css={theme.text.caption} {...props} />
}

export const DisplayText: React.FC<React.HTMLProps<HTMLDivElement> & {
  as?: DisplayElement
  variant: "ds" | "dm" | "dl" | "dxl"
}> = ({ as: As = "p", variant, ...other }) => {
  return <As css={theme.text[variant]} {...other} />
}

export const Heading: React.FC<React.HTMLProps<HTMLDivElement> & {
  as?: DisplayElement
}> = ({ as: As = "p", ...other }) => {
  return <As css={theme.text.heading} {...other} />
}

export const SubHeading: React.FC<React.HTMLProps<HTMLDivElement> & {
  as?: DisplayElement
}> = ({ as: As = "p", ...other }) => {
  return <As css={theme.text.subheading} {...other} />
}

export const TextContainer: React.FC<React.HTMLProps<HTMLDivElement> & {
  p?: "tight" | "loose"
}> = ({ p = "tight", ...other }) => {
  return (
    <div
      css={css`
        padding: ${theme.space[p]};
      `}
      {...other}
    />
  )
}

export const VisuallyHidden: React.FC<React.HTMLProps<
  HTMLDivElement
>> = props => {
  return (
    <div
      css={css`
        visibility: hidden;
      `}
      {...props}
    />
  )
}

// Overlays //

const SimplePortal: React.FC = ({ children }) => {
  const portalEl = useMemo(() => document.createElement("div"), [])
  useEffect(() => {
    document.body.appendChild(portalEl)
    return () => {
      document.body.removeChild(portalEl)
    }
  }, [portalEl])
  return createPortal(children, portalEl)
}

type ModalAction = {
  content: string
  destructive?: true
  onAction: () => void
  plain?: true
  primary?: true
}

export const Modal: React.FC<{
  open: boolean
  onClose: () => void
  title: string
  actions: ModalAction[]
}> = ({ children, open, onClose, title, actions }) => {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeydown)
      return () => {
        window.removeEventListener("keydown", handleKeydown)
      }
    }
    function handleKeydown(e: KeyboardEvent): void {
      if (e.key === "Escape" || e.key === "Esc") {
        handleClose()
      }
    }
  }, [open])

  return (
    <SimplePortal>
      <div
        css={css`
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: ${theme.colors.overlay};
          opacity: 1;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform: translateY(0);

          ${!open &&
            css`
              opacity: 0;
              transform: translateY(${theme.space.loose});
              pointer-events: none;
            `}
        `}
      >
        <div
          css={css`
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 62rem;
            box-sizing: border-box;
            background: ${theme.colors.tone};
            border-radius: 6px;
            max-height: calc(100vh - 60px);
            box-shadow: ${theme.shadows.high};
          `}
        >
          <ModalSection
            css={css`
              display: flex;
              align-items: center;
              padding: ${theme.space.base} ${theme.space.loose};
            `}
          >
            <div
              css={css`
                flex: 1;
                font-size: ${theme.fontSizes.ds};
              `}
            >
              {title}
            </div>
            <button
              css={css`
                display: flex;
                align-items: center;
                padding: ${theme.space.tight};
                margin-left: ${theme.space.loose};
                margin-right: -${theme.space.tight};
                background: 0;
                border: 0;
                line-height: inherit;
                appearance: none;
                cursor: pointer;

                &:focus {
                  border-radius: 6px;
                  background: ${theme.colors.sky.base};
                }
              `}
              onClick={handleClose}
            >
              <svg
                css={css`
                  height: ${theme.space.loose};
                  fill: ${theme.colors.ink.light};
                `}
                viewBox="0 0 20 20"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  d="M11.414 10l6.293-6.293a.999.999 0 1 0-1.414-1.414L10 8.586 3.707 2.293a.999.999 0 1 0-1.414 1.414L8.586 10l-6.293 6.293a.999.999 0 1 0 1.414 1.414L10 11.414l6.293 6.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </ModalSection>

          <ModalSection
            css={css`
              overflow-y: auto;
              padding: ${theme.space.loose};
            `}
          >
            {children}
          </ModalSection>

          <ModalSection
            css={css`
              display: flex;
              align-items: center;
              justify-content: flex-end;
              padding: ${theme.space.base} ${theme.space.loose};
            `}
          >
            {actions.map(
              ({ content, destructive, onAction, plain, primary }, i) =>
                plain ? (
                  <div
                    key={i}
                    css={css`
                      flex: 1;
                    `}
                  >
                    <Button onClick={onAction} plain>
                      {content}
                    </Button>
                  </div>
                ) : (
                  <Button
                    key={i}
                    destructive={destructive}
                    onClick={onAction}
                    plain={plain}
                    primary={primary}
                    css={css`
                      margin-left: ${theme.space.tight};
                    `}
                  >
                    {content}
                  </Button>
                )
            )}
          </ModalSection>
        </div>
      </div>
    </SimplePortal>
  )
}

const ModalSection: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <ClassNames>
      {({ css }) => (
        <div
          className={[
            css`
              & + & {
                border-top: 1px solid ${theme.colors.sky.base};
              }
            `,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      )}
    </ClassNames>
  )
}

// Forms //

export const Button: React.FC<DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  destructive?: true
  outline?: true
  plain?: true
  primary?: true
  submit?: true
}> = ({ destructive, disabled, outline, plain, primary, submit, ...other }) => {
  const color = destructive
    ? theme.colors.red
    : primary
    ? theme.colors.primary
    : null
  return (
    <button
      css={css`
        border: 0;
        border-radius: 4px;
        padding: ${theme.space.tight} ${theme.space.loose};
        font-size: ${theme.fontSizes.base};
        white-space: nowrap;

        &:active {
          transform: scale(0.99);
        }

        ${disabled
          ? css`
              background: ${theme.colors.sky.dark};
              color: ${theme.colors.sky.base};
            `
          : plain
          ? css`
              ${theme.link}
              padding: 0;
              background: 0;
            `
          : color
          ? css`
              background: ${color.dark};
              color: ${theme.colors.sky.lighter};
              font-weight: ${theme.fontWeights.medium};

              &:hover {
                background: ${color.darker};
              }
            `
          : css`
              border: 1px solid ${theme.colors.sky.base};

              &:hover {
                background: ${theme.colors.sky.lighter};
              }

              ${!outline &&
                css`
                  background: #fff;
                `}
            `}

        ${!disabled &&
          css`
            &:hover {
              cursor: pointer;
            }
          `}
      `}
      disabled={disabled}
      type={submit && "submit"}
      {...other}
    />
  )
}

export const Label: React.FC<React.HTMLProps<HTMLLabelElement>> = ({
  className,
  ...other
}) => {
  return (
    <ClassNames>
      {({ css }) => (
        <label
          className={[
            css`
              display: block;

              & + & {
                margin-top: ${theme.space.base};
              }
            `,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...other}
        />
      )}
    </ClassNames>
  )
}

export const LabelCaption: React.FC<React.ComponentProps<
  typeof Caption
>> = props => {
  return (
    <Caption
      css={css`
        margin-right: ${theme.space.tight};
      `}
      {...props}
    />
  )
}

export const TextInput: React.FC<{ className?: string; name: string }> = ({
  className,
  name,
}) => {
  const [inputProps, meta] = useField(name)
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    ref.current?.setCustomValidity(meta.error || "")
  }, [ref, meta])

  return <input {...inputProps} type="text" className={className} ref={ref} />
}

export const TextArea: React.FC<{ className?: string; name: string }> = ({
  className,
  name,
}) => {
  const [inputProps, meta] = useField(name)
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    ref.current?.setCustomValidity(meta.error || "")
  }, [ref, meta])

  return <textarea {...inputProps} className={className} ref={ref} />
}
