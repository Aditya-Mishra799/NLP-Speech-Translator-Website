// Valid End Points
const endPoints = {
    langOption: '/languages',
    translate: '/translate',
    textToSpeech: '/text-to-speech'
}
// Function to get valid service api endpoint http address
const getApiEndpoints = (service) =>{
    return process.env.NEXT_PUBLIC_TRANSLATOR_API_URL + service
}

export  {getApiEndpoints, endPoints}