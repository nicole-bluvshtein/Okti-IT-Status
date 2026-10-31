type ServiceLogoProps = {
  domain: string
  name: string
  size?: number
}

function ServiceLogo({ domain, name, size = 48 }: ServiceLogoProps) {
  return (
    <img
      className="service-logo"
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
      alt={`${name} logo`}
      width={size}
      height={size}
    />
  )
}

export default ServiceLogo
