type Props = {
  className: string
}

const GoogleMap: React.FC<Props> = ({ className }) => {
  return (
    <iframe
      frameBorder="0" style={{ border: 0 }}
      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d968.0898349796303!2d100.62970862929042!3d13.937197001012214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d7d71743b337f%3A0x7d1268cd7319a713!2sTHE%20PRO%20TUTOR!5e0!3m2!1sen!2sth!4v1649255643410!5m2!1sen!2sth'
      className={className}
    />
  )
}

export default GoogleMap