export const getUrls = (data) => {
  if(!data) {
    return fetch('http://localhost:3001/api/v1/urls')
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong!')
        }
      })
  } else {
    return fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': "application/json"
      }
    })
  }
}