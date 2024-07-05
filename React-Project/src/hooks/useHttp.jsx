import { useState } from "react"

const useHttp = (url) => {
    const [connection, setConnection] = useState(url)

    const GET = async (setStateAction = null) => {
        try {
            const data = await fetch(connection).then((response) => response.json())
            if (setStateAction != null) {
                setStateAction(data)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    } 

    const POST = async (data) => {
        try {
            await fetch(connection, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const PUT = async (data) => {
        try {
            await fetch(connection, {   
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error)  
        }
    }

    const DELETE = async(data) => {
        try {
            await fetch(connection, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        connection, 
        setConnection,
        GET,
        POST,
        PUT,
        DELETE
    }
}

export default useHttp