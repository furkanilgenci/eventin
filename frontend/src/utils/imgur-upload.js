import axios from 'axios'

export default function uploadImage(image, clientId) {
  const bodyFormData = new FormData()
  bodyFormData.append('image', image)

  return axios.post('https://api.imgur.com/3/image', bodyFormData, {
    headers: {
      Authorization: `Client-ID ${clientId}`,
    },
  })
}
