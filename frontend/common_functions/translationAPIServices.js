import { getApiEndpoints, endPoints } from "./apiEndPoints"

const getOptions = async () => {
    try {
        const url = getApiEndpoints(endPoints.langOption)
        const response = await fetch(url)
        if(!response.ok){
            throw new Error('Error while fetching Language Options !!!')
        }
        const options = await response.json()
        return options
    } catch (error) {
        console.error(error)
    }
}

const translateText = async (text, sourceLanguage, destinationLanguage) => {
    const requestBody = {
        text: text,
        source_lang: sourceLanguage,
        dest_lang: destinationLanguage,
     }
    const url = getApiEndpoints(endPoints.translate)
    try {
        console.log('Request', requestBody)
        const response = await fetch(url, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(requestBody)
        })
        if(!response.ok){
            throw new Error('Error while fetching text translation !!!')
        }
        const responseData = await response.json()
        console.log(responseData?.translated_text ?? '')
        return responseData?.translated_text ?? ''

    } catch (error) {
        console.error(error)
    }
}

const getVoiceForText = async (text, language) => {
    const requestBody = {
        text: text,
        lang: language,
     }
     console.log(requestBody)
    const url = getApiEndpoints(endPoints.textToSpeech)
    try {
        const response = await fetch(url, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(requestBody)
        })
        if(!response.ok){
            throw new Error('Error while fetching Speech for text !!!')
        }
        const audioBlob = await response.blob();
        console.log(audioBlob)
        const audioURL =  URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL)
        return audio

    } catch (error) {
        console.error(error)
    }
}

export {translateText, getOptions, getVoiceForText}