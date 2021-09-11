import siteMetadata from '@/data/siteMetadata'

const formatDate = (date) => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    
    
  }
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options)

  return now
}

export default formatDate
